import { createRequire } from 'node:module'
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputRoot = path.join(root, 'out')
const outputMedia = path.join(outputRoot, 'api/media/file')
const localMedia = path.join(root, 'media')
const mediaUrl = '/api/media/file/'

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name)
    return entry.isDirectory() ? htmlFiles(file) : file.endsWith('.html') ? [file] : []
  })
}

const references = new Set()
for (const file of htmlFiles(outputRoot)) {
  const html = readFileSync(file, 'utf8')
  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    const url = match[1].split(/[?#]/)[0]
    if (!url.startsWith(mediaUrl)) continue
    const key = decodeURIComponent(url.slice(mediaUrl.length))
    if (!key || key.startsWith('/') || key.split('/').includes('..')) continue
    references.add(key)
  }
}

const missing = [...references].filter((key) => !existsSync(path.join(outputMedia, ...key.split('/'))))

const fallbackAssets = new Map([
  // The CMS references a ninth conservation hero upload, but it was never
  // stored in R2. The local numbered variants are byte-identical.
  ['conservation-hero-9.jpg', 'conservation-hero.jpg'],
])
const unresolved = []
const toDownload = []
for (const key of missing) {
  const fallback = fallbackAssets.get(key)
  const localSource = path.join(localMedia, ...key.split('/'))
  const source = existsSync(localSource)
    ? localSource
    : fallback && path.join(localMedia, ...fallback.split('/'))
  if (source && existsSync(source)) {
    const destination = path.join(outputMedia, ...key.split('/'))
    mkdirSync(path.dirname(destination), { recursive: true })
    copyFileSync(source, destination)
  } else {
    toDownload.push(key)
  }
}

if (toDownload.length) {
  const { R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT } = process.env
  if (!R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_ENDPOINT) {
    throw new Error(`R2 credentials are required to stage ${toDownload.length} missing static media asset(s).`)
  }

  const require = createRequire(import.meta.url)
  const storageRequire = createRequire(require.resolve('@payloadcms/storage-s3'))
  const { GetObjectCommand, ListObjectsV2Command, S3Client } = storageRequire('@aws-sdk/client-s3')
  const client = new S3Client({
    endpoint: R2_ENDPOINT,
    region: 'auto',
    forcePathStyle: true,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  })
  const bucket = process.env.R2_BUCKET || 'zebratreksafaris-media'
  const available = new Set()
  let continuationToken
  do {
    const page = await client.send(new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: 'media/',
      ContinuationToken: continuationToken,
    }))
    for (const item of page.Contents ?? []) if (item.Key) available.add(item.Key)
    continuationToken = page.IsTruncated ? page.NextContinuationToken : undefined
  } while (continuationToken)

  const keys = toDownload.map((key) => ({ key, objectKey: `media/${key}` }))
  const notFound = keys.filter(({ objectKey }) => !available.has(objectKey))
  if (notFound.length) {
    await client.destroy()
    throw new Error(`R2 is missing referenced assets: ${notFound.map(({ key }) => key).join(', ')}`)
  }

  let bytes = 0
  for (let index = 0; index < keys.length; index += 8) {
    await Promise.all(keys.slice(index, index + 8).map(async ({ key, objectKey }) => {
      const response = await client.send(new GetObjectCommand({ Bucket: bucket, Key: objectKey }))
      if (!response.Body) throw new Error(`R2 returned an empty media object: ${objectKey}`)
      const data = await response.Body.transformToByteArray()
      const destination = path.resolve(outputMedia, ...key.split('/'))
      if (!destination.startsWith(`${path.resolve(outputMedia)}${path.sep}`)) throw new Error(`Invalid media path: ${key}`)
      mkdirSync(path.dirname(destination), { recursive: true })
      writeFileSync(destination, data)
      bytes += data.byteLength
    }))
  }
  await client.destroy()
  console.log(`Downloaded ${keys.length} referenced R2 media assets (${(bytes / 1024 / 1024).toFixed(1)} MB).`)
}

const unresolvedAfterStage = [...references].filter((key) => !existsSync(path.join(outputMedia, ...key.split('/'))))
if (unresolvedAfterStage.length) throw new Error(`Missing static media after staging: ${unresolvedAfterStage.join(', ')}`)

const referencedFiles = new Set([...references].map((key) => path.resolve(outputMedia, ...key.split('/'))))
let prunedFiles = 0
let prunedBytes = 0
function removeUnreferenced(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      removeUnreferenced(file)
      try { rmdirSync(file) } catch (error) { if (error.code !== 'ENOTEMPTY' && error.code !== 'ENOENT') throw error }
    } else if (!referencedFiles.has(path.resolve(file))) {
      prunedBytes += statSync(file).size
      unlinkSync(file)
      prunedFiles++
    }
  }
}
removeUnreferenced(outputMedia)
console.log(`Static media complete: ${references.size} referenced assets are present; pruned ${prunedFiles} unused files (${(prunedBytes / 1024 / 1024).toFixed(1)} MB).`)
