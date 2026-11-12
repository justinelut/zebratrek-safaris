import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const appRoot = path.join(root, 'src/app')
const backupRoot = mkdtempSync(path.join(path.dirname(appRoot), '.zebratrek-static-build-'))
// There are no non-reserved Payload page slugs at present; Next's static
// export rejects a dynamic route that generates zero paths. Keep the runtime
// CMS route in source, but omit it while producing this fixed static snapshot.
const excluded = ['(payload)', 'api', 'my-route', '(frontend)/[slug]']
const moved = []

try {
  for (const route of excluded) {
    const source = path.join(appRoot, route)
    const backup = path.join(backupRoot, route.replaceAll('/', '_'))
    try {
      cpSync(source, backup, { recursive: true })
      moved.push([backup, source])
      rmSync(source, { recursive: true, force: true })
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }
  }

  const result = spawnSync('pnpm', ['exec', 'next', 'build', '--webpack'], {
    cwd: root,
    env: {
      ...process.env,
      BUILD_STATIC_SITE: '1',
      NODE_ENV: 'production',
      SEED_ON_INIT: 'false',
      NEXT_PUBLIC_SERVER_URL: 'https://zebratreksafaris.com',
    },
    stdio: 'inherit',
  })

  if (result.error) throw result.error
  if (result.status !== 0) process.exitCode = result.status ?? 1
  else {
    const mediaResult = spawnSync(process.execPath, ['scripts/stage-static-media.mjs'], {
      cwd: root,
      env: process.env,
      stdio: 'inherit',
    })
    if (mediaResult.error) throw mediaResult.error
    if (mediaResult.status !== 0) process.exitCode = mediaResult.status ?? 1
  }
} finally {
  for (const [backup, source] of moved.reverse()) {
    rmSync(source, { recursive: true, force: true })
    cpSync(backup, source, { recursive: true })
  }
  rmSync(backupRoot, { recursive: true, force: true })
}
