# Docs for DeepSeek Harness

A Google Docs–style word processor inside the DeepSeek Harness Web UI. The Docs panel and the agent share one durable document store, so a page can be drafted in chat, styled by hand, printed, and picked up again in the next session.

## Install

Requirements: DeepSeek Harness `>=0.2.2-0 <0.3.0-0` and Node.js 20 or newer.

From the GitHub release (available now):

```sh
dsh plugin --profile <profile> add https://github.com/iggypcnfsky/dsh-docs/releases/download/v1.0.0/iggypcnfsky-dsh-docs-1.0.0.tgz
```

From npm (once published):

```sh
dsh plugin --profile <profile> add @iggypcnfsky/dsh-docs
```

Restart `dsh web` after installing. The **Docs** panel appears in the sidebar.

In an installed Harness build, the same package can be installed from the Plugins page by its npm name, or from this directory with the local bundle installer.

## Features

- Full-panel document list and editor, opened from the sidebar.
- Rich text toolbar: styles, fonts, sizes, bold/italic/underline/strike, super/subscript, text and highlight colours, alignment, line and paragraph spacing, indents, bulleted/numbered/checklist lists, paint format, capitalization.
- Insert links, images (URL or upload), tables with contextual row/column tools, horizontal lines, page breaks, headers and footers, special characters.
- Page setup: A4/Letter/Legal, portrait/landscape, four margins, page colour, ruler, zoom, document outline, live word/page count.
- Undo/redo, keyboard shortcuts, find and replace, autosave.
- Export to standalone HTML, Word-compatible `.doc`, Markdown, or plain text; print to PDF.
- Durable per-document JSON store under the profile data directory, plus uploaded-image assets.
- Agent tools: `docs_list`, `docs_read`, `docs_create`, `docs_update`, `docs_import`, `docs_delete`.

The agent and the panel share the same store. Agent edits are picked up by the open panel between saves.

## Agent tools

| Tool | Purpose |
| --- | --- |
| `docs_list` | List documents with titles, word counts, and timestamps. |
| `docs_read` | Read a document as plain text, optionally with stored HTML. |
| `docs_create` | Create a Markdown, HTML, or plain-text document. |
| `docs_update` | Replace, append, or prepend content; update title, page setup, header, and footer. |
| `docs_import` | Import a local `.html`, `.md`, `.markdown`, or `.txt` file. |
| `docs_delete` | Delete a document by id or title. |

## Data

Documents live under `DSH_PROFILE_DIR/data/dsh-docs` when the profile variable is available, otherwise under `~/.dsh/data/dsh-docs`. Set `DSH_DOCS_DIR` to use a different directory.

## Package

- npm: `@iggypcnfsky/dsh-docs`
- source: [iggypcnfsky/dsh-docs](https://github.com/iggypcnfsky/dsh-docs)
- license: MIT

## Development

The host half is `index.js`; the browser half is `client.js` and is loaded through `window.__ModuleLoader__`. The bundle row is declared in `cordis.patch.yml` and the package manifest `dsh` field.

Before publishing:

```sh
node --check index.js
node --check client.js
npm pack --dry-run
```

## License

MIT © Iggy Love
