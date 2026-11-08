/**
 * Host half of the Docs bundle.
 *
 * Owns the durable document store, the browser bridge used by the Docs panel,
 * uploaded images, and the agent tools that create and edit documents.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import crypto from 'node:crypto'

const WEB_PREFIX = '/dsh-docs/api'
const MAX_DOCUMENTS = 1000
const MAX_TITLE = 200
const MAX_HTML = 4 * 1024 * 1024
const MAX_IMPORT = 8 * 1024 * 1024
const MAX_BODY_BYTES = 24 * 1024 * 1024
const MAX_ASSET_BYTES = 8 * 1024 * 1024
const MAX_FOLDERS = 2000
const MAX_FOLDER_NAME = 80
const MAX_FOLDER_DEPTH = 8
const PAPERS = new Set(['a4', 'letter', 'legal'])

export const inject = ['tools', 'webServer']

function nowIso() {
  return new Date().toISOString()
}

function newId(prefix) {
  return `${prefix}_${crypto.randomUUID()}`
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function clamp(value, min, max, fallback) {
  const number = Number(value)
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback
}

function cleanTitle(value, fallback = 'Untitled document') {
  const raw = typeof value === 'string' ? value.trim().replace(/[\r\n\t]+/g, ' ') : ''
  return (raw || fallback).slice(0, MAX_TITLE)
}

function cleanFolderName(value, fallback = 'Untitled folder') {
  const raw = typeof value === 'string'
    ? value.trim().replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ')
    : ''
  return (raw || fallback).slice(0, MAX_FOLDER_NAME)
}

function normalizeFolderId(value) {
  if (value === null || value === undefined || value === '') return null
  const text = String(value).trim()
  return /^folder_[0-9a-f-]{8,}$/i.test(text) ? text : null
}

function normalizeFolder(input, existing) {
  const base = existing ?? {}
  const source = input && typeof input === 'object' ? input : {}
  const has = (key) => Object.prototype.hasOwnProperty.call(source, key)
  const rawParent = has('parentId') ? source.parentId : base.parentId
  const parentId = rawParent === null || rawParent === undefined || rawParent === ''
    ? null
    : normalizeFolderId(rawParent)
  return {
    id: base.id ?? normalizeFolderId(source.id) ?? newId('folder'),
    name: cleanFolderName(has('name') ? source.name : base.name),
    parentId,
    order: Number.isFinite(Number(has('order') ? source.order : base.order))
      ? Math.max(0, Math.floor(Number(has('order') ? source.order : base.order)))
      : 0,
    createdAt: base.createdAt ?? (typeof source.createdAt === 'string' ? source.createdAt : nowIso()),
    updatedAt: nowIso(),
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, '&#96;')
}

function decodeEntities(value) {
  return String(value ?? '')
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => {
      try {
        return String.fromCodePoint(parseInt(hex, 16))
      } catch {
        return ''
      }
    })
    .replace(/&#(\d+);/g, (_m, dec) => {
      try {
        return String.fromCodePoint(Number(dec))
      } catch {
        return ''
      }
    })
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
}

function htmlToText(html) {
  return decodeEntities(
    String(html ?? '')
      .replace(/<\s*br\s*\/?>/gi, '\n')
      .replace(/<\/(td|th)>/gi, '\t')
      .replace(/<\/(tr|p|div|h[1-6]|li|blockquote|pre|figure|figcaption)>/gi, '\n')
      .replace(/<li\b[^>]*>/gi, '• ')
      .replace(/<hr\b[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ''),
  )
    .replace(/\u200b/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function plainText(value, limit = 2000) {
  return htmlToText(String(value ?? '')).replace(/\s+/g, ' ').trim().slice(0, limit)
}

function wordCount(text) {
  const trimmed = String(text ?? '').trim()
  if (trimmed === '') return 0
  const latin = trimmed.replace(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/g, ' ')
  const words = latin.split(/\s+/).filter(Boolean).length
  const cjk = (trimmed.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/g) ?? []).length
  return words + cjk
}

function isSafeUrl(value, kind) {
  const url = String(value ?? '').trim()
  if (url === '') return true
  if (url.startsWith('#') || url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) return true
  if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url) || /^tel:/i.test(url)) return true
  if (kind === 'src' && /^data:image\/(png|jpe?g|gif|webp);base64,/i.test(url)) return true
  return false
}

function sanitizeCss(value) {
  return String(value ?? '')
    .replace(/expression\s*\([^)]*\)/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/url\s*\([^)]*\)/gi, '')
    .replace(/@import[^;]*;?/gi, '')
    .slice(0, 6000)
}

/**
 * Sanitizes stored and agent-authored HTML. The document body is rendered with
 * innerHTML in the editor, so this is a real security boundary, not a cleanup
 * pass.
 */
function sanitizeHtml(input) {
  let html = String(input ?? '').slice(0, MAX_HTML)
  if (html === '') return ''
  html = html.replace(/<!--[\s\S]*?-->/g, '')
  html = html.replace(/\u200b/g, '')
  html = html.replace(
    /<(script|style|iframe|object|embed|link|meta|base|form|input|textarea|select|option|button|svg|math|template|video|audio|source|canvas|dialog|details|summary|applet|frame|frameset)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
    '',
  )
  html = html.replace(
    /<(script|style|iframe|object|embed|link|meta|base|form|input|textarea|select|option|button|svg|math|template|video|audio|source|canvas|dialog|details|summary|applet|frame|frameset)\b[^>]*\/?>/gi,
    '',
  )
  html = html.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  html = html.replace(/\s(srcdoc|formaction|action|xlink:href)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  html = html.replace(/(href|src)\s*=\s*("|')([^"']*)\2/gi, (match, attr, quote, value) => {
    const kind = attr.toLowerCase() === 'src' ? 'src' : 'href'
    return isSafeUrl(decodeEntities(value), kind) ? match : ` ${attr}=${quote}${quote}`
  })
  html = html.replace(/style\s*=\s*("|')([^"']*)\1/gi, (match, quote, css) => {
    const clean = sanitizeCss(css)
    return clean ? `style=${quote}${clean}${quote}` : ''
  })
  html = html.replace(/\scontenteditable\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  html = html.replace(/\sspellcheck\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  return html
}

function normalizeMargins(input) {
  const margins = input && typeof input === 'object' ? input : {}
  return {
    top: clamp(margins.top, 0.25, 2.5, 1),
    right: clamp(margins.right, 0.25, 2.5, 1),
    bottom: clamp(margins.bottom, 0.25, 2.5, 1),
    left: clamp(margins.left, 0.25, 2.5, 1),
  }
}

function normalizePage(input) {
  const page = input && typeof input === 'object' ? input : {}
  const background = typeof page.background === 'string' && /^#[0-9a-f]{3,8}$/i.test(page.background)
    ? page.background
    : '#ffffff'
  return {
    paper: PAPERS.has(page.paper) ? page.paper : 'a4',
    orientation: page.orientation === 'landscape' ? 'landscape' : 'portrait',
    margins: normalizeMargins(page.margins),
    background,
  }
}

function normalizeDoc(input, existing) {
  const base = existing ?? {}
  const source = input && typeof input === 'object' ? input : {}
  const has = (key) => Object.prototype.hasOwnProperty.call(source, key)
  let html = has('html')
    ? sanitizeHtml(source.html)
    : base.html ?? '<p><br></p>'
  if (html.trim() === '') html = '<p><br></p>'
  const text = has('text')
    ? String(source.text ?? '').slice(0, MAX_HTML)
    : htmlToText(html)
  const pageInput = has('page')
    ? {
        ...(base.page ?? {}),
        ...(source.page ?? {}),
        margins: {
          ...(base.page?.margins ?? {}),
          ...(source.page?.margins ?? {}),
        },
      }
    : base.page
  return {
    id: base.id ?? newId('doc'),
    title: cleanTitle(has('title') ? source.title : base.title),
    folderId: has('folderId') ? normalizeFolderId(source.folderId) : normalizeFolderId(base.folderId),
    html,
    text,
    page: normalizePage(pageInput),
    header: plainText(has('header') ? source.header : base.header),
    footer: plainText(has('footer') ? source.footer : base.footer),
    showHeader: has('showHeader') ? source.showHeader === true : base.showHeader === true,
    showFooter: has('showFooter') ? source.showFooter === true : base.showFooter === true,
    favorite: has('favorite') ? source.favorite === true : base.favorite === true,
    createdAt: base.createdAt ?? nowIso(),
    updatedAt: nowIso(),
    rev: Number(base.rev ?? 0) + 1,
  }
}

function docSummary(doc) {
  return {
    id: doc.id,
    title: doc.title,
    folderId: doc.folderId ?? null,
    favorite: doc.favorite,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    rev: doc.rev,
    words: wordCount(doc.text),
    chars: doc.text.length,
    preview: doc.text.replace(/\s+/g, ' ').trim().slice(0, 160),
    page: {
      paper: doc.page.paper,
      orientation: doc.page.orientation,
    },
  }
}

function inlineMarkdown(source) {
  let value = escapeHtml(source)
  const code = []
  value = value.replace(/`([^`]+)`/g, (_match, body) => {
    const token = `\u0000CODE${code.length}\u0000`
    code.push(`<code>${body}</code>`)
    return token
  })
  value = value.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (_match, alt, url) => {
    const safe = isSafeUrl(url, 'src') ? url : ''
    return safe ? `<img src="${escapeAttr(safe)}" alt="${escapeAttr(alt)}">` : alt
  })
  value = value.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label, url) => {
    const safe = isSafeUrl(url, 'href') ? url : '#'
    return `<a href="${escapeAttr(safe)}">${label}</a>`
  })
  value = value.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  value = value.replace(/__([^_]+)__/g, '<strong>$1</strong>')
  value = value.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
  value = value.replace(/(^|[\s(])_([^_\n]+)_/g, '$1<em>$2</em>')
  value = value.replace(/~~([^~]+)~~/g, '<s>$1</s>')
  value = value.replace(/\u0000CODE(\d+)\u0000/g, (_match, index) => code[Number(index)] ?? '')
  return value
}

function splitTableRow(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim())
}

function isTableDivider(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line)
}

function markdownToHtml(input) {
  const lines = String(input ?? '').replace(/\r\n?/g, '\n').split('\n')
  const out = []
  let paragraph = []
  let list = null
  let quote = []
  let code = null

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    out.push(`<p>${paragraph.map(inlineMarkdown).join('<br>')}</p>`)
    paragraph = []
  }
  const flushList = () => {
    if (!list) return
    out.push(`<${list.type}>${list.items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</${list.type}>`)
    list = null
  }
  const flushQuote = () => {
    if (quote.length === 0) return
    out.push(`<blockquote>${quote.map(inlineMarkdown).join('<br>')}</blockquote>`)
    quote = []
  }
  const flushAll = () => {
    flushParagraph()
    flushList()
    flushQuote()
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const fence = /^\s*```\s*([a-z0-9-]*)\s*$/i.exec(line)
    if (code) {
      if (fence) {
        out.push(`<pre><code>${escapeHtml(code.lines.join('\n'))}</code></pre>`)
        code = null
      } else {
        code.lines.push(line)
      }
      continue
    }
    if (fence) {
      flushAll()
      code = { lang: fence[1], lines: [] }
      continue
    }
    if (/^\s*$/.test(line)) {
      flushAll()
      continue
    }
    const heading = /^\s{0,3}(#{1,6})\s+(.*)$/.exec(line)
    if (heading) {
      flushAll()
      const level = heading[1].length
      out.push(`<h${level}>${inlineMarkdown(heading[2].trim())}</h${level}>`)
      continue
    }
    if (/^\s*(?:---+|\*\*\*+|___+)\s*$/.test(line)) {
      flushAll()
      out.push('<hr>')
      continue
    }
    if (/^\s*>\s?/.test(line)) {
      flushParagraph()
      flushList()
      quote.push(line.replace(/^\s*>\s?/, ''))
      continue
    }
    if (quote.length > 0 && !/^\s*>\s?/.test(line)) flushQuote()
    if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      flushAll()
      const header = splitTableRow(line)
      const rows = []
      index += 2
      while (index < lines.length && lines[index].includes('|') && !/^\s*$/.test(lines[index])) {
        rows.push(splitTableRow(lines[index]))
        index += 1
      }
      index -= 1
      out.push(
        `<table class="doc-table"><thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join('')}</tr></thead><tbody>${rows
          .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join('')}</tr>`)
          .join('')}</tbody></table>`,
      )
      continue
    }
    const ordered = /^\s*\d+[.)]\s+(.*)$/.exec(line)
    const unordered = /^\s*[-*+]\s+(.*)$/.exec(line)
    if (ordered || unordered) {
      flushParagraph()
      flushQuote()
      const type = ordered ? 'ol' : 'ul'
      const body = (ordered ?? unordered)[1]
      if (!list || list.type !== type) {
        flushList()
        list = { type, items: [] }
      }
      list.items.push(body)
      continue
    }
    if (list) flushList()
    paragraph.push(line.trim())
  }
  if (code) out.push(`<pre><code>${escapeHtml(code.lines.join('\n'))}</code></pre>`)
  flushAll()
  return out.join('\n')
}

function textToHtml(input) {
  const paragraphs = String(input ?? '').replace(/\r\n?/g, '\n').split(/\n{2,}/)
  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('')
}

function contentToHtml(content, format) {
  const value = String(content ?? '')
  const normalized = String(format ?? '').toLowerCase()
  if (normalized === 'html' || normalized === 'htm') return sanitizeHtml(value)
  if (normalized === 'markdown' || normalized === 'md') return markdownToHtml(value)
  if (normalized === 'text' || normalized === 'txt' || normalized === 'plain') return textToHtml(value)
  if (/^\s*<[a-z!/]/i.test(value)) return sanitizeHtml(value)
  return markdownToHtml(value)
}

async function readJsonBody(req) {
  let size = 0
  const chunks = []
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > MAX_BODY_BYTES) {
      const error = new Error('Request body is too large')
      error.statusCode = 413
      throw error
    }
    chunks.push(buffer)
  }
  if (size === 0) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    const error = new Error('Request body is not valid JSON')
    error.statusCode = 400
    throw error
  }
}

function writeJson(res, status, value) {
  const body = JSON.stringify(value)
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body),
  })
  res.end(body)
}

function resolveDataDirectory() {
  if (typeof process.env.DSH_DOCS_DIR === 'string' && process.env.DSH_DOCS_DIR.trim() !== '') {
    return path.resolve(process.env.DSH_DOCS_DIR.trim())
  }
  const profile = typeof process.env.DSH_PROFILE_DIR === 'string' ? process.env.DSH_PROFILE_DIR.trim() : ''
  return profile
    ? path.join(profile, 'data', 'dsh-docs')
    : path.join(os.homedir(), '.dsh', 'data', 'dsh-docs')
}

class DocumentStore {
  constructor(directory) {
    this.directory = directory
    this.docsDirectory = path.join(directory, 'documents')
    this.assetsDirectory = path.join(directory, 'assets')
    this.foldersFile = path.join(directory, 'folders.json')
    this.docs = new Map()
    this.folders = new Map()
    this.ready = this.load()
    this.queue = Promise.resolve()
  }

  async load() {
    await fs.mkdir(this.docsDirectory, { recursive: true })
    await fs.mkdir(this.assetsDirectory, { recursive: true })
    try {
      const raw = JSON.parse(await fs.readFile(this.foldersFile, 'utf8'))
      const folders = Array.isArray(raw) ? raw : Array.isArray(raw?.folders) ? raw.folders : []
      for (const entry of folders) {
        const folder = normalizeFolder(entry, null)
        this.folders.set(folder.id, folder)
      }
    } catch (error) {
      if (error?.code !== 'ENOENT') {
        console.error(`[dsh-docs] ignoring unreadable folder index: ${error?.message ?? error}`)
      }
    }
    let entries = []
    try {
      entries = await fs.readdir(this.docsDirectory, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.json')) continue
      const file = path.join(this.docsDirectory, entry.name)
      try {
        const parsed = JSON.parse(await fs.readFile(file, 'utf8'))
        const doc = normalizeDoc(parsed, { ...parsed, updatedAt: parsed.updatedAt, createdAt: parsed.createdAt })
        doc.rev = Number(parsed.rev ?? 1)
        doc.updatedAt = typeof parsed.updatedAt === 'string' ? parsed.updatedAt : nowIso()
        doc.createdAt = typeof parsed.createdAt === 'string' ? parsed.createdAt : doc.updatedAt
        if (doc.folderId && !this.folders.has(doc.folderId)) doc.folderId = null
        this.docs.set(doc.id, doc)
      } catch (error) {
        console.error(`[dsh-docs] ignoring unreadable document ${file}: ${error?.message ?? error}`)
      }
    }
    for (const folder of this.folders.values()) {
      if (folder.parentId && !this.folders.has(folder.parentId)) folder.parentId = null
    }
    for (const folder of this.folders.values()) {
      const seen = new Set([folder.id])
      let cursor = folder
      while (cursor.parentId) {
        if (seen.has(cursor.parentId)) {
          cursor.parentId = null
          break
        }
        seen.add(cursor.parentId)
        cursor = this.folders.get(cursor.parentId)
        if (!cursor) break
      }
    }
  }

  async ensureReady() {
    await this.ready
  }

  async serial(task) {
    const run = this.queue.then(task, task)
    this.queue = run.catch(() => {})
    return run
  }

  async all() {
    await this.ensureReady()
    return [...this.docs.values()].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
  }

  async list() {
    return (await this.all()).map(docSummary)
  }

  async allFolders() {
    await this.ensureReady()
    return [...this.folders.values()].sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.name.localeCompare(b.name)
    })
  }

  async listFolders() {
    await this.ensureReady()
    const counts = new Map()
    for (const doc of this.docs.values()) {
      if (doc.folderId) counts.set(doc.folderId, (counts.get(doc.folderId) ?? 0) + 1)
    }
    return (await this.allFolders()).map((folder) => ({
      ...clone(folder),
      documentCount: counts.get(folder.id) ?? 0,
    }))
  }

  async resolveFolder(reference) {
    const raw = String(reference ?? '').trim()
    if (raw === '') return null
    await this.ensureReady()
    const byId = this.folders.get(raw)
    if (byId) return byId
    const lowered = raw.toLowerCase()
    const folders = await this.allFolders()
    return (
      folders.find((folder) => folder.name.toLowerCase() === lowered) ??
      folders.find((folder) => folder.name.toLowerCase().includes(lowered)) ??
      null
    )
  }

  folderDepth(folderId) {
    let depth = 0
    let cursor = folderId ? this.folders.get(folderId) : null
    const seen = new Set()
    while (cursor?.parentId) {
      if (seen.has(cursor.parentId)) break
      seen.add(cursor.parentId)
      depth += 1
      cursor = this.folders.get(cursor.parentId)
    }
    return depth
  }

  descendantFolderIds(folderId) {
    const result = new Set()
    const queue = [folderId]
    while (queue.length > 0) {
      const current = queue.shift()
      for (const folder of this.folders.values()) {
        if (folder.parentId === current && !result.has(folder.id)) {
          result.add(folder.id)
          queue.push(folder.id)
        }
      }
    }
    return result
  }

  async persistFolders() {
    const target = this.foldersFile
    const temp = `${target}.${process.pid}.${Date.now()}.tmp`
    const folders = [...this.folders.values()].sort((a, b) => a.order - b.order)
    await fs.writeFile(temp, JSON.stringify({ folders }, null, 2), 'utf8')
    await fs.rename(temp, target)
  }

  async createFolder(input) {
    return this.serial(async () => {
      await this.ensureReady()
      if (this.folders.size >= MAX_FOLDERS) {
        const error = new Error(`The folder store is limited to ${MAX_FOLDERS} folders`)
        error.statusCode = 409
        throw error
      }
      const source = input && typeof input === 'object' ? input : {}
      const parentId = source.parentId === null || source.parentId === undefined || source.parentId === ''
        ? null
        : normalizeFolderId(source.parentId)
      if (source.parentId && !parentId) {
        const error = new Error('Parent folder is invalid')
        error.statusCode = 400
        throw error
      }
      if (parentId && !this.folders.has(parentId)) {
        const error = new Error('Parent folder was not found')
        error.statusCode = 404
        throw error
      }
      if (parentId && this.folderDepth(parentId) + 1 >= MAX_FOLDER_DEPTH) {
        const error = new Error(`Folders can be nested at most ${MAX_FOLDER_DEPTH} levels`)
        error.statusCode = 400
        throw error
      }
      const siblings = [...this.folders.values()].filter((folder) => folder.parentId === parentId)
      const order = siblings.reduce((max, folder) => Math.max(max, folder.order), -1) + 1
      const folder = normalizeFolder({ ...source, parentId, order }, null)
      this.folders.set(folder.id, folder)
      await this.persistFolders()
      return clone(folder)
    })
  }

  async renameFolder(id, name) {
    return this.serial(async () => {
      await this.ensureReady()
      const folder = this.folders.get(String(id ?? ''))
      if (!folder) {
        const error = new Error('Folder not found')
        error.statusCode = 404
        throw error
      }
      folder.name = cleanFolderName(name)
      folder.updatedAt = nowIso()
      await this.persistFolders()
      return clone(folder)
    })
  }

  async moveFolder(id, parentIdInput) {
    return this.serial(async () => {
      await this.ensureReady()
      const folder = this.folders.get(String(id ?? ''))
      if (!folder) {
        const error = new Error('Folder not found')
        error.statusCode = 404
        throw error
      }
      const parentId = parentIdInput === null || parentIdInput === undefined || parentIdInput === ''
        ? null
        : normalizeFolderId(parentIdInput)
      if (parentIdInput && !parentId) {
        const error = new Error('Parent folder is invalid')
        error.statusCode = 400
        throw error
      }
      if (parentId === folder.id || (parentId && this.descendantFolderIds(folder.id).has(parentId))) {
        const error = new Error('A folder cannot be moved inside itself')
        error.statusCode = 400
        throw error
      }
      if (parentId && !this.folders.has(parentId)) {
        const error = new Error('Parent folder was not found')
        error.statusCode = 404
        throw error
      }
      if (parentId && this.folderDepth(parentId) + 1 >= MAX_FOLDER_DEPTH) {
        const error = new Error(`Folders can be nested at most ${MAX_FOLDER_DEPTH} levels`)
        error.statusCode = 400
        throw error
      }
      folder.parentId = parentId
      folder.updatedAt = nowIso()
      await this.persistFolders()
      return clone(folder)
    })
  }

  async deleteFolder(id) {
    return this.serial(async () => {
      await this.ensureReady()
      const folder = this.folders.get(String(id ?? ''))
      if (!folder) {
        const error = new Error('Folder not found')
        error.statusCode = 404
        throw error
      }
      const removed = this.descendantFolderIds(folder.id)
      removed.add(folder.id)
      let movedDocuments = 0
      for (const doc of this.docs.values()) {
        if (!doc.folderId || !removed.has(doc.folderId)) continue
        doc.folderId = null
        doc.updatedAt = nowIso()
        doc.rev = Number(doc.rev ?? 0) + 1
        await this.persist(doc)
        movedDocuments += 1
      }
      for (const folderId of removed) this.folders.delete(folderId)
      await this.persistFolders()
      return { removedFolders: [...removed], movedDocuments }
    })
  }

  async get(id) {
    await this.ensureReady()
    const doc = this.docs.get(String(id ?? ''))
    return doc ? clone(doc) : null
  }

  async resolve(reference) {
    const docs = await this.all()
    const raw = String(reference ?? '').trim()
    if (raw === '') {
      if (docs.length === 0) throw new Error('No document exists yet. Use docs_create first.')
      return docs[0]
    }
    const byId = docs.find((doc) => doc.id === raw)
    if (byId) return byId
    const lowered = raw.toLowerCase()
    return (
      docs.find((doc) => doc.title.toLowerCase() === lowered) ??
      docs.find((doc) => doc.title.toLowerCase().includes(lowered)) ??
      (() => {
        throw new Error(`Document "${raw}" was not found. Use docs_list to see available documents.`)
      })()
    )
  }

  async persist(doc) {
    const target = path.join(this.docsDirectory, `${doc.id}.json`)
    const temp = `${target}.${process.pid}.${Date.now()}.tmp`
    await fs.writeFile(temp, JSON.stringify(doc, null, 2), 'utf8')
    await fs.rename(temp, target)
  }

  async create(input) {
    return this.serial(async () => {
      await this.ensureReady()
      if (this.docs.size >= MAX_DOCUMENTS) {
        const error = new Error(`The document store is limited to ${MAX_DOCUMENTS} documents`)
        error.statusCode = 409
        throw error
      }
      const source = input && typeof input === 'object' ? input : {}
      let html = source.html
      if (typeof html !== 'string') {
        html = source.content !== undefined
          ? contentToHtml(source.content, source.format)
          : '<p><br></p>'
      }
      const doc = normalizeDoc({ ...source, html }, null)
      if (doc.folderId && !this.folders.has(doc.folderId)) doc.folderId = null
      doc.rev = 1
      await this.persist(doc)
      this.docs.set(doc.id, doc)
      return clone(doc)
    })
  }

  async save(id, input) {
    return this.serial(async () => {
      await this.ensureReady()
      const current = this.docs.get(String(id ?? ''))
      if (!current) {
        const error = new Error('Document not found')
        error.statusCode = 404
        throw error
      }
      const source = input && typeof input === 'object' ? input : {}
      const next = normalizeDoc(source, current)
      next.id = current.id
      next.createdAt = current.createdAt
      if (next.folderId && !this.folders.has(next.folderId)) next.folderId = null
      await this.persist(next)
      this.docs.set(next.id, next)
      return clone(next)
    })
  }

  async rename(id, title) {
    return this.save(id, { title })
  }

  async duplicate(id) {
    const source = await this.get(id)
    if (!source) {
      const error = new Error('Document not found')
      error.statusCode = 404
      throw error
    }
    return this.create({
      title: `${source.title} (copy)`.slice(0, MAX_TITLE),
      html: source.html,
      text: source.text,
      page: source.page,
      header: source.header,
      footer: source.footer,
      showHeader: source.showHeader,
      showFooter: source.showFooter,
      favorite: false,
      folderId: source.folderId ?? null,
    })
  }

  async delete(id) {
    return this.serial(async () => {
      await this.ensureReady()
      const current = this.docs.get(String(id ?? ''))
      if (!current) {
        const error = new Error('Document not found')
        error.statusCode = 404
        throw error
      }
      this.docs.delete(current.id)
      try {
        await fs.unlink(path.join(this.docsDirectory, `${current.id}.json`))
      } catch {
        // The in-memory removal still succeeds if the file was already gone.
      }
    })
  }

  async saveAsset(dataUrl, name) {
    await this.ensureReady()
    const match = /^data:(image\/(png|jpeg|jpg|webp|gif));base64,([a-z0-9+/=\s]+)$/i.exec(String(dataUrl ?? ''))
    if (!match) {
      const error = new Error('Only PNG, JPEG, WebP, or GIF images can be uploaded')
      error.statusCode = 400
      throw error
    }
    const buffer = Buffer.from(match[3].replace(/\s+/g, ''), 'base64')
    if (buffer.length === 0) {
      const error = new Error('The image is empty')
      error.statusCode = 400
      throw error
    }
    if (buffer.length > MAX_ASSET_BYTES) {
      const error = new Error('Images must be 8 MB or smaller')
      error.statusCode = 413
      throw error
    }
    const ext = match[2].toLowerCase() === 'jpeg' ? 'jpg' : match[2].toLowerCase()
    const file = `${crypto.randomUUID()}.${ext}`
    await fs.writeFile(path.join(this.assetsDirectory, file), buffer)
    return {
      url: `${WEB_PREFIX}/asset?id=${encodeURIComponent(file)}`,
      name: cleanTitle(name, file).slice(0, 80),
      bytes: buffer.length,
      contentType: match[1].toLowerCase(),
    }
  }

  async assetPath(id) {
    const file = String(id ?? '')
    if (!/^[0-9a-f-]{8,}\.(png|jpe?g|webp|gif)$/i.test(file)) return null
    const full = path.join(this.assetsDirectory, file)
    try {
      const stat = await fs.stat(full)
      if (!stat.isFile()) return null
      return full
    } catch {
      return null
    }
  }
}

function registerRoutes(ctx, store) {
  const connection = ctx.get('connection')
  const allowed = (req) => {
    if (!connection || typeof connection.requestRejection !== 'function') return true
    try {
      return connection.requestRejection(req) === undefined
    } catch {
      return false
    }
  }

  const handler = async (req, res) => {
    if (!allowed(req)) {
      writeJson(res, 403, { ok: false, error: { code: 'forbidden', message: 'Forbidden' } })
      return
    }
    const url = new URL(req.url ?? '/', 'http://dsh.internal')
    const name = url.pathname.startsWith(`${WEB_PREFIX}/`)
      ? url.pathname.slice(WEB_PREFIX.length + 1)
      : ''
    try {
      if (req.method === 'GET' && name === 'list') {
        writeJson(res, 200, {
          ok: true,
          documents: await store.list(),
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'GET' && name === 'folders') {
        writeJson(res, 200, { ok: true, folders: await store.listFolders() })
        return
      }
      if (req.method === 'GET' && name === 'get') {
        const doc = await store.get(url.searchParams.get('id') ?? '')
        if (!doc) {
          writeJson(res, 404, { ok: false, error: { code: 'not-found', message: 'Document not found' } })
          return
        }
        writeJson(res, 200, { ok: true, document: doc })
        return
      }
      if (req.method === 'GET' && name === 'asset') {
        const file = await store.assetPath(url.searchParams.get('id') ?? '')
        if (!file) {
          writeJson(res, 404, { ok: false, error: { code: 'not-found', message: 'Image not found' } })
          return
        }
        const buffer = await fs.readFile(file)
        const ext = path.extname(file).toLowerCase()
        const type = ext === '.png' ? 'image/png'
          : ext === '.webp' ? 'image/webp'
          : ext === '.gif' ? 'image/gif'
          : 'image/jpeg'
        res.writeHead(200, {
          'content-type': type,
          'cache-control': 'private, max-age=31536000, immutable',
          'content-length': buffer.length,
        })
        res.end(buffer)
        return
      }
      if (req.method === 'POST' && name === 'create') {
        const payload = await readJsonBody(req)
        const doc = await store.create(payload)
        writeJson(res, 200, {
          ok: true,
          document: doc,
          summary: docSummary(doc),
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'POST' && name === 'save') {
        const payload = await readJsonBody(req)
        const doc = await store.save(payload.id, payload.document ?? payload)
        writeJson(res, 200, {
          ok: true,
          document: doc,
          summary: docSummary(doc),
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'POST' && name === 'rename') {
        const payload = await readJsonBody(req)
        const doc = await store.rename(payload.id, payload.title)
        writeJson(res, 200, {
          ok: true,
          document: doc,
          summary: docSummary(doc),
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'POST' && name === 'duplicate') {
        const payload = await readJsonBody(req)
        const doc = await store.duplicate(payload.id)
        writeJson(res, 200, {
          ok: true,
          document: doc,
          summary: docSummary(doc),
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'POST' && name === 'delete') {
        const payload = await readJsonBody(req)
        await store.delete(payload.id)
        writeJson(res, 200, {
          ok: true,
          documents: await store.list(),
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'POST' && name === 'folder/create') {
        const payload = await readJsonBody(req)
        const folder = await store.createFolder(payload)
        writeJson(res, 200, {
          ok: true,
          folder,
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'POST' && name === 'folder/rename') {
        const payload = await readJsonBody(req)
        const folder = await store.renameFolder(payload.id, payload.name)
        writeJson(res, 200, {
          ok: true,
          folder,
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'POST' && name === 'folder/move') {
        const payload = await readJsonBody(req)
        const folder = await store.moveFolder(payload.id, payload.parentId)
        writeJson(res, 200, {
          ok: true,
          folder,
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'POST' && name === 'folder/delete') {
        const payload = await readJsonBody(req)
        const result = await store.deleteFolder(payload.id)
        writeJson(res, 200, {
          ok: true,
          ...result,
          documents: await store.list(),
          folders: await store.listFolders(),
        })
        return
      }
      if (req.method === 'POST' && name === 'asset') {
        const payload = await readJsonBody(req)
        const asset = await store.saveAsset(payload.dataUrl, payload.name)
        writeJson(res, 200, { ok: true, asset })
        return
      }
      writeJson(res, 404, { ok: false, error: { code: 'not-found', message: 'Unknown Docs API method' } })
    } catch (error) {
      const status = Number(error?.statusCode) || 400
      if (status >= 500) console.error('[dsh-docs] request failed', error)
      writeJson(res, status, {
        ok: false,
        error: { code: status === 404 ? 'not-found' : 'invalid-request', message: error?.message ?? String(error) },
      })
    }
  }

  ctx.effect(
    () => ctx.webServer.register({ kind: 'prefix', path: WEB_PREFIX, handler }),
    'dsh-docs: browser API',
  )
}

function toolText(value) {
  return [{ type: 'text', text: typeof value?.text === 'string' ? value.text : JSON.stringify(value, null, 2) }]
}

function callView(title, kind = 'other') {
  return { card: 'generic', title, kind }
}

function makeTools(store) {
  const resolveFolderArg = async (reference) => {
    if (reference === undefined || reference === null || String(reference).trim() === '') return null
    const folder = await store.resolveFolder(reference)
    if (!folder) {
      const error = new Error(`Folder "${reference}" was not found. Use docs_folders action=list to see folders.`)
      error.statusCode = 404
      throw error
    }
    return folder
  }

  const listTool = {
    name: 'docs_list',
    description:
      'List documents in the Harness Docs panel. Each entry includes the document id, title, word count, and last update. Use this before editing a document the user refers to by title.',
    parameters: { type: 'object', properties: {}, additionalProperties: false },
    output: {
      schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => toolText(value),
    },
    isConcurrencySafe: () => true,
    presentCall: () => callView('List documents', 'read'),
    async execute() {
      const [docs, folders] = await Promise.all([store.list(), store.listFolders()])
      const folderNames = new Map(folders.map((folder) => [folder.id, folder.name]))
      const lines = docs.length === 0
        ? ['No documents exist yet.']
        : [`${docs.length} document${docs.length === 1 ? '' : 's'}:`]
      for (const doc of docs) {
        const folder = doc.folderId ? folderNames.get(doc.folderId) : null
        lines.push(`- ${doc.title} — id ${doc.id}; ${folder ? `folder ${folder}` : 'unfiled'}; ${doc.words} words; updated ${doc.updatedAt}`)
      }
      return { text: lines.join('\n'), documents: docs, folders }
    },
  }

  const readTool = {
    name: 'docs_read',
    description:
      'Read a document from the Harness Docs panel. Returns plain text plus the stored HTML when include_html is true. Use it before rewriting a document so you preserve content the user did not ask you to change.',
    parameters: {
      type: 'object',
      properties: {
        document: { type: 'string', description: 'Document id or title. Omit to read the most recently updated document.' },
        include_html: { type: 'boolean', description: 'Include the document HTML. Defaults to false.' },
        max_chars: { type: 'integer', description: 'Maximum characters of text to return, 500–40000. Defaults to 20000.' },
      },
      additionalProperties: false,
    },
    output: {
      schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => toolText(value),
    },
    isConcurrencySafe: () => true,
    presentCall: (args) => callView(`Read document${typeof args?.document === 'string' ? ` ${args.document}` : ''}`, 'read'),
    async execute(args) {
      const doc = await store.resolve(args?.document)
      const limit = Math.max(500, Math.min(40000, Math.floor(Number(args?.max_chars) || 20000)))
      const text = doc.text.length > limit ? `${doc.text.slice(0, limit)}\n\n… (${doc.text.length - limit} more characters)` : doc.text
      const lines = [
        `Document: ${doc.title} (${doc.id})`,
        `${doc.page.paper} ${doc.page.orientation}; ${wordCount(doc.text)} words; updated ${doc.updatedAt}`,
      ]
      if (doc.showHeader && doc.header) lines.push(`Header: ${doc.header}`)
      if (doc.showFooter && doc.footer) lines.push(`Footer: ${doc.footer}`)
      lines.push('', text || '(empty document)')
      if (args?.include_html === true) {
        const html = doc.html.length > limit * 2
          ? `${doc.html.slice(0, limit * 2)}\n<!-- truncated -->`
          : doc.html
        lines.push('', 'HTML:', html)
      }
      return {
        text: lines.join('\n'),
        document: docSummary(doc),
        ...(args?.include_html === true ? { html: doc.html } : {}),
      }
    },
  }

  const createTool = {
    name: 'docs_create',
    description:
      'Create a document in the Harness Docs panel. Content defaults to Markdown; pass format "html" for exact styling (headings, bold, tables, colors, alignment are supported). The new document appears in the Docs panel document list.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Document title.' },
        folder: { type: 'string', description: 'Optional folder id or folder name. Omit to leave the document unfiled.' },
        content: { type: 'string', description: 'Document body. Markdown by default, HTML when format is html.' },
        format: {
          type: 'string',
          enum: ['markdown', 'html', 'text'],
          description: 'How to interpret content. Defaults to markdown, or HTML when content begins with a tag.',
        },
        page: {
          type: 'object',
          description: 'Optional page setup.',
          properties: {
            paper: { type: 'string', enum: ['a4', 'letter', 'legal'] },
            orientation: { type: 'string', enum: ['portrait', 'landscape'] },
            background: { type: 'string', description: 'Page background color such as #ffffff.' },
            margins: {
              type: 'object',
              properties: {
                top: { type: 'number' },
                right: { type: 'number' },
                bottom: { type: 'number' },
                left: { type: 'number' },
              },
              additionalProperties: false,
            },
          },
          additionalProperties: false,
        },
        header: { type: 'string', description: 'Optional header text.' },
        footer: { type: 'string', description: 'Optional footer text.' },
      },
      required: ['title', 'content'],
      additionalProperties: false,
    },
    output: {
      schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => toolText(value),
    },
    presentCall: (args) => callView(`Create document ${typeof args?.title === 'string' ? `“${args.title}”` : ''}`, 'edit'),
    async execute(args) {
      const folder = await resolveFolderArg(args?.folder)
      const doc = await store.create({
        title: cleanTitle(args?.title),
        folderId: folder?.id ?? null,
        content: args?.content,
        format: args?.format,
        page: args?.page,
        header: args?.header,
        footer: args?.footer,
        showHeader: typeof args?.header === 'string' && args.header.trim() !== '',
        showFooter: typeof args?.footer === 'string' && args.footer.trim() !== '',
      })
      return {
        text: `Created document "${doc.title}" (${doc.id}) with ${wordCount(doc.text)} words${folder ? ` in folder "${folder.name}"` : ''}. Open the Docs panel in the sidebar to edit or export it.`,
        document: docSummary(doc),
      }
    },
  }

  const updateTool = {
    name: 'docs_update',
    description:
      'Edit a document in the Harness Docs panel. Use mode replace for a full rewrite, append to add content at the end, or prepend to add content at the start. Content defaults to Markdown; pass format "html" for exact formatting. You can also update the title, page setup, header, and footer.',
    parameters: {
      type: 'object',
      properties: {
        document: { type: 'string', description: 'Document id or title. Omit to use the most recently updated document.' },
        title: { type: 'string', description: 'Optional new title.' },
        folder: { type: 'string', description: 'Optional folder id or name. Pass an empty string to move the document to Unfiled.' },
        content: { type: 'string', description: 'Content to write. Markdown by default, HTML when format is html.' },
        format: {
          type: 'string',
          enum: ['markdown', 'html', 'text'],
          description: 'How to interpret content.',
        },
        mode: {
          type: 'string',
          enum: ['replace', 'append', 'prepend'],
          description: 'Where the content goes. Defaults to replace.',
        },
        page: {
          type: 'object',
          description: 'Optional new page setup.',
          properties: {
            paper: { type: 'string', enum: ['a4', 'letter', 'legal'] },
            orientation: { type: 'string', enum: ['portrait', 'landscape'] },
            background: { type: 'string' },
            margins: {
              type: 'object',
              properties: {
                top: { type: 'number' },
                right: { type: 'number' },
                bottom: { type: 'number' },
                left: { type: 'number' },
              },
              additionalProperties: false,
            },
          },
          additionalProperties: false,
        },
        header: { type: 'string', description: 'Optional header text. Pass an empty string to clear it.' },
        footer: { type: 'string', description: 'Optional footer text. Pass an empty string to clear it.' },
      },
      additionalProperties: false,
    },
    output: {
      schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => toolText(value),
    },
    presentCall: (args) => callView(`Edit document${typeof args?.document === 'string' ? ` ${args.document}` : ''}`, 'edit'),
    async execute(args) {
      const current = await store.resolve(args?.document)
      const patch = {}
      if (typeof args?.title === 'string' && args.title.trim() !== '') patch.title = args.title
      if (args?.folder !== undefined) {
        if (args.folder === null || String(args.folder).trim() === '') patch.folderId = null
        else {
          const folder = await resolveFolderArg(args.folder)
          patch.folderId = folder?.id ?? null
        }
      }
      if (args?.page !== undefined) patch.page = args.page
      if (typeof args?.header === 'string') {
        patch.header = args.header
        patch.showHeader = args.header.trim() !== ''
      }
      if (typeof args?.footer === 'string') {
        patch.footer = args.footer
        patch.showFooter = args.footer.trim() !== ''
      }
      if (typeof args?.content === 'string') {
        const fragment = contentToHtml(args.content, args?.format)
        const mode = args?.mode === 'append' || args?.mode === 'prepend' ? args.mode : 'replace'
        patch.html = mode === 'replace'
          ? fragment
          : mode === 'append'
            ? `${current.html}\n${fragment}`
            : `${fragment}\n${current.html}`
        patch.text = htmlToText(patch.html)
      }
      const doc = await store.save(current.id, patch)
      return {
        text: `Updated "${doc.title}" (${doc.id}); it now has ${wordCount(doc.text)} words and ${Math.max(1, Math.round(doc.text.length / 1800))} page${Math.round(doc.text.length / 1800) === 1 ? '' : 's'} of text. Open the Docs panel to review the layout.`,
        document: docSummary(doc),
      }
    },
  }

  const deleteTool = {
    name: 'docs_delete',
    description:
      'Delete a document from the Harness Docs panel. Use this only when the user explicitly asks to delete that document; it is not reversible. Call docs_list first if you are not certain which document is meant.',
    parameters: {
      type: 'object',
      properties: {
        document: { type: 'string', description: 'Document id or title. Omit to use the most recently updated document.' },
      },
      required: ['document'],
      additionalProperties: false,
    },
    output: {
      schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => toolText(value),
    },
    presentCall: (args) => callView(`Delete document${typeof args?.document === 'string' ? ` ${args.document}` : ''}`, 'edit'),
    async execute(args) {
      const doc = await store.resolve(args?.document)
      await store.delete(doc.id)
      return { text: `Deleted document "${doc.title}" (${doc.id}).` }
    },
  }

  const importTool = {
    name: 'docs_import',    description:
      'Import a local .html, .md, .markdown, or .txt file into a new document in the Harness Docs panel. Use this when the user gives you a path and wants it editable in Docs. Word .docx files are not supported here.',
    parameters: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Absolute file path, or a path starting with ~/.' },
        title: { type: 'string', description: 'Optional document title. Defaults to the file name.' },
        folder: { type: 'string', description: 'Optional folder id or folder name.' },
      },
      required: ['path'],
      additionalProperties: false,
    },
    output: {
      schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => toolText(value),
    },
    presentCall: (args) => callView(`Import document${typeof args?.path === 'string' ? ` “${path.basename(args.path)}”` : ''}`, 'read'),
    async execute(args) {
      if (typeof args?.path !== 'string' || args.path.trim() === '') throw new Error('docs_import needs a file path')
      const raw = args.path.trim()
      const file = raw.startsWith('~/') ? path.join(os.homedir(), raw.slice(2)) : path.resolve(process.cwd(), raw)
      const ext = path.extname(file).toLowerCase()
      if (!['.html', '.htm', '.md', '.markdown', '.txt'].includes(ext)) {
        throw new Error('docs_import supports .html, .md, .markdown, and .txt files')
      }
      const stat = await fs.stat(file)
      if (!stat.isFile()) throw new Error('The import path is not a file')
      if (stat.size > MAX_IMPORT) throw new Error('The import file is larger than 8 MB')
      const contents = await fs.readFile(file, 'utf8')
      const format = ext === '.html' || ext === '.htm' ? 'html' : ext === '.txt' ? 'text' : 'markdown'
      const folder = await resolveFolderArg(args?.folder)
      const doc = await store.create({
        title: cleanTitle(args?.title, path.basename(file, ext)),
        folderId: folder?.id ?? null,
        content: contents,
        format,
      })
      return {
        text: `Imported ${path.basename(file)} as "${doc.title}" (${doc.id}) with ${wordCount(doc.text)} words. Open the Docs panel to edit it.`,
        document: docSummary(doc),
      }
    },
  }

  const foldersTool = {
    name: 'docs_folders',
    description:
      'List, create, rename, or delete folders in the Harness Docs panel. Deleting a folder moves its documents to Unfiled; it never deletes a document. Use folder ids or names in docs_create and docs_update when filing documents.',
    parameters: {
      type: 'object',
      properties: {
        action: { type: 'string', enum: ['list', 'create', 'rename', 'delete'] },
        id: { type: 'string', description: 'Folder id or name for rename and delete.' },
        name: { type: 'string', description: 'Folder name for create or rename.' },
        parent: { type: 'string', description: 'Optional parent folder id or name for create.' },
      },
      required: ['action'],
      additionalProperties: false,
    },
    output: {
      schema: { type: 'object', additionalProperties: true },
      render: (_args, value) => toolText(value),
    },
    isConcurrencySafe: () => false,
    presentCall: (args) => callView(`Folder ${typeof args?.action === 'string' ? args.action : 'operation'}`, 'edit'),
    async execute(args) {
      const action = args?.action
      if (action === 'list') {
        const folders = await store.listFolders()
        const lines = folders.length === 0
          ? ['No folders exist yet.']
          : [`${folders.length} folder${folders.length === 1 ? '' : 's'}:`]
        for (const folder of folders) {
          lines.push(`- ${folder.name} — id ${folder.id}; ${folder.documentCount} document${folder.documentCount === 1 ? '' : 's'}${folder.parentId ? `; parent ${folder.parentId}` : ''}`)
        }
        return { text: lines.join('\n'), folders }
      }
      if (action === 'create') {
        if (typeof args?.name !== 'string' || args.name.trim() === '') throw new Error('docs_folders create needs a folder name')
        const parent = await resolveFolderArg(args?.parent)
        const folder = await store.createFolder({ name: args.name, parentId: parent?.id ?? null })
        return {
          text: `Created folder "${folder.name}" (${folder.id})${parent ? ` inside "${parent.name}"` : ''}.`,
          folder,
          folders: await store.listFolders(),
        }
      }
      if (action === 'rename') {
        const target = args?.id ?? args?.name
        if (typeof target !== 'string' || target.trim() === '') throw new Error('docs_folders rename needs a folder id or name')
        const folder = await resolveFolderArg(target)
        if (!folder) throw new Error(`Folder "${target}" was not found`)
        if (typeof args?.name !== 'string' || args.name.trim() === '') throw new Error('docs_folders rename needs a new name')
        const updated = await store.renameFolder(folder.id, args.name)
        return {
          text: `Renamed folder to "${updated.name}" (${updated.id}).`,
          folder: updated,
          folders: await store.listFolders(),
        }
      }
      if (action === 'delete') {
        const target = args?.id ?? args?.name
        if (typeof target !== 'string' || target.trim() === '') throw new Error('docs_folders delete needs a folder id or name')
        const folder = await resolveFolderArg(target)
        if (!folder) throw new Error(`Folder "${target}" was not found`)
        const result = await store.deleteFolder(folder.id)
        return {
          text: `Deleted folder "${folder.name}" and ${result.removedFolders.length - 1} subfolder(s); moved ${result.movedDocuments} document(s) to Unfiled.`,
          ...result,
          folders: await store.listFolders(),
        }
      }
      throw new Error('Unknown docs_folders action')
    },
  }

  return [listTool, readTool, createTool, updateTool, importTool, foldersTool, deleteTool]
}

function registerTools(ctx, store) {
  for (const tool of makeTools(store)) {
    ctx.effect(() => ctx.tools.register(tool), `dsh-docs: tool ${tool.name}`)
  }
}

function registerPrompt(ctx) {
  ctx.inject(['systemPrompt'], (scope) => {
    scope.effect(
      () =>
        scope.systemPrompt.section({
          name: 'dsh-docs',
          order: 57,
          text: [
            '## Documents',
            'A Docs panel is available in the Harness sidebar. When the user asks for a document, letter, memo, brief, plan, report, or any long-form editable text, create it with the docs tools instead of only printing it in chat. The panel and the agent share one durable store.',
            'Use docs_update page and header/footer parameters when the user asks for landscape, A4/Letter/Legal, different margins, or running headers and footers.',
            'Call docs_list before editing a document the user refers to by title. Use docs_read before a substantial rewrite so existing content is preserved. Prefer docs_update with mode replace only when the user wants a rewrite; append when adding a section.',
            'Use docs_folders to list, create, rename, or delete folders. Use the folder parameter on docs_create and docs_update to file a document. Deleting a folder moves its documents to Unfiled, never deletes them.',
            'Content defaults to Markdown. Pass format "html" when exact styling matters. Supported HTML includes headings h1–h6, p, strong, em, u, s, sup, sub, ul/ol/li, blockquote, pre/code, a, img, hr, and tables (table/thead/tbody/tr/th/td). Inline style attributes survive for color, highlight, font-family, font-size, line-height, margins, text-align, and page breaks. Do not use script, iframe, forms, or event handler attributes.',
            'After writing, state the document title so the user can open the Docs panel, keep editing, print it, or export it as HTML, Markdown, or plain text.',
          ].join('\n\n'),
        }),
      'dsh-docs: system prompt',
    )
  })
}

export function apply(ctx) {
  const store = new DocumentStore(resolveDataDirectory())
  registerRoutes(ctx, store)
  registerTools(ctx, store)
  registerPrompt(ctx)
}


export { DocumentStore, makeTools }
