import React from 'react'
import type { SerializedEditorState, SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import Image from 'next/image'
import { getImageProps } from '@/lib/media'

type Props = { content: SerializedEditorState | null | undefined; className?: string }

export function RichText({ content, className = '' }: Props) {
  if (!content?.root?.children?.length) return null
  return <div className={`prose prose-lg max-w-none ${className}`}>{renderNodes(content.root.children)}</div>
}

function renderNodes(nodes: SerializedLexicalNode[]): React.ReactNode[] {
  return nodes.map((node, i) => renderNode(node, i))
}

function renderNode(node: any, key: number): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      if (!node.children?.length) return <br key={key} />
      return <p key={key}>{renderNodes(node.children)}</p>
    case 'heading':
      const Tag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return <Tag key={key}>{renderNodes(node.children)}</Tag>
    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return <ListTag key={key}>{renderNodes(node.children)}</ListTag>
    case 'listitem':
      return <li key={key}>{renderNodes(node.children)}</li>
    case 'quote':
      return <blockquote key={key}>{renderNodes(node.children)}</blockquote>
    case 'link':
    case 'autolink':
      const href = node.fields?.url || node.url || '#'
      const target = node.fields?.newTab ? '_blank' : undefined
      return <a key={key} href={href} target={target} rel={target ? 'noopener noreferrer' : undefined}>{renderNodes(node.children)}</a>
    case 'upload':
      if (node.value) {
        const img = getImageProps(node.value)
        return <Image key={key} {...img} className="rounded-lg" />
      }
      return null
    case 'text':
      let text: React.ReactNode = node.text
      if (node.format & 1) text = <strong key={key}>{text}</strong>
      if (node.format & 2) text = <em key={`${key}-i`}>{text}</em>
      if (node.format & 8) text = <s key={`${key}-s`}>{text}</s>
      if (node.format & 16) text = <code key={`${key}-c`}>{text}</code>
      return text
    case 'linebreak':
      return <br key={key} />
    default:
      if (node.children) return <div key={key}>{renderNodes(node.children)}</div>
      return null
  }
}
