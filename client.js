window.__ModuleLoader__.load({
  id: '@iggylove/dsh-docs',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useEffect, useRef, useMemo } = React

    const NS = 'dsh-docs'
    const API = '/dsh-docs/api'
    const PAGE_DPI = 96
    const ZOOM_STEPS = [50, 75, 90, 100, 110, 125, 150, 175, 200]

    // ---------------------------------------------------------------------
    // Locale
    // ---------------------------------------------------------------------

    const en = {
      title: 'Docs',
      subtitle: 'Write and style together.',
      panelLabel: 'Docs',
      newDocument: 'New document',
      untitled: 'Untitled document',
      noDocuments: 'No documents yet',
      noDocumentsHint: 'Start a blank page or ask the agent to draft one. Agent edits appear here live.',
      createFirst: 'New document',
      searchDocuments: 'Search documents',
      allDocuments: 'All documents',
      starred: 'Starred',
      recent: 'Recent',
      nameAsc: 'Name A–Z',
      documents: 'Documents',
      document: 'Document',
      loading: 'Loading…',
      saving: 'Saving…',
      saved: 'Saved',
      unsaved: 'Unsaved changes',
      saveFailed: 'Could not save that change.',
      openFailed: 'Could not open that document.',
      created: 'Document created.',
      deleted: 'Document deleted.',
      duplicated: 'Document duplicated.',
      imported: 'Imported {name}.',
      exported: 'Exported {name}.',
      rename: 'Rename',
      duplicate: 'Make a copy',
      delete: 'Delete',
      deleteConfirm: 'Delete this document?',
      close: 'Close',
      cancel: 'Cancel',
      apply: 'Apply',
      insert: 'Insert',
      save: 'Save',
      copy: 'Copy',
      copied: 'Copied.',
      open: 'Open',
      more: 'More',
      file: 'File',
      edit: 'Edit',
      view: 'View',
      format: 'Format',
      tools: 'Tools',
      help: 'Help',
      undo: 'Undo',
      redo: 'Redo',
      cut: 'Cut',
      paste: 'Paste',
      selectAll: 'Select all',
      findAndReplace: 'Find and replace',
      find: 'Find',
      replace: 'Replace',
      replaceAll: 'Replace all',
      findNext: 'Find next',
      noMatches: 'No matches',
      matchCount: '{n} matches',
      caseSensitive: 'Match case',
      print: 'Print',
      pageSetup: 'Page setup',
      download: 'Download',
      downloadHtml: 'HTML (.html)',
      downloadMarkdown: 'Markdown (.md)',
      downloadText: 'Plain text (.txt)',
      importFile: 'Import file',
      makeCopy: 'Make a copy',
      wordCount: 'Word count',
      words: 'Words',
      characters: 'Characters',
      charactersNoSpaces: 'Characters excluding spaces',
      paragraphs: 'Paragraphs',
      pages: 'Pages',
      page: 'Page',
      ruler: 'Ruler',
      showRuler: 'Show ruler',
      outline: 'Outline',
      showOutline: 'Show outline',
      documentList: 'Document list',
      showDocumentList: 'Show document list',
      folders: 'Folders',
      newFolder: 'New folder',
      newSubfolder: 'New subfolder',
      folderName: 'Folder name',
      renameFolder: 'Rename folder',
      deleteFolder: 'Delete folder',
      deleteFolderConfirm: 'Delete this folder?',
      deleteFolderBody: 'Documents in this folder and its subfolders move to Unfiled. They are not deleted.',
      unfiled: 'Unfiled',
      folderEmpty: 'No documents in this folder.',
      moveToFolder: 'Move to folder',
      folderCreated: 'Folder created.',
      folderRenamed: 'Folder renamed.',
      folderDeleted: 'Folder deleted. Its documents were moved to Unfiled.',
      documentMoved: 'Document moved.',
      noFolders: 'No folders yet',
      expand: 'Expand',
      collapse: 'Collapse',
      zoom: 'Zoom',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      style: 'Style',
      normalText: 'Normal text',
      titleStyle: 'Title',
      subtitleStyle: 'Subtitle',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      heading4: 'Heading 4',
      heading5: 'Heading 5',
      heading6: 'Heading 6',
      quote: 'Quote',
      codeBlock: 'Code block',
      font: 'Font',
      fontSize: 'Font size',
      increaseFont: 'Increase font size',
      decreaseFont: 'Decrease font size',
      bold: 'Bold',
      italic: 'Italic',
      underline: 'Underline',
      strikethrough: 'Strikethrough',
      superscript: 'Superscript',
      subscript: 'Subscript',
      textColor: 'Text color',
      highlightColor: 'Highlight color',
      none: 'None',
      customColor: 'Custom color',
      alignLeft: 'Align left',
      alignCenter: 'Align center',
      alignRight: 'Align right',
      justify: 'Justify',
      lineSpacing: 'Line spacing',
      single: 'Single',
      oneAndHalf: '1.15',
      double: 'Double',
      customSpacing: 'Custom',
      paragraphSpacing: 'Paragraph spacing',
      spaceBefore: 'Space before',
      spaceAfter: 'Space after',
      increaseIndent: 'Increase indent',
      decreaseIndent: 'Decrease indent',
      bulletedList: 'Bulleted list',
      numberedList: 'Numbered list',
      checklist: 'Checklist',
      clearFormatting: 'Clear formatting',
      insertLink: 'Insert link',
      editLink: 'Edit link',
      removeLink: 'Remove link',
      linkUrl: 'Link URL',
      linkText: 'Text to display',
      linkHint: 'Paste a URL. Leave the text blank to use the URL.',
      insertImage: 'Insert image',
      imageUrl: 'Image URL',
      imageAlt: 'Alt text',
      uploadImage: 'Upload image',
      imageHint: 'PNG, JPEG, WebP, or GIF up to 8 MB.',
      table: 'Table',
      insertTable: 'Insert table',
      rows: 'Rows',
      columns: 'Columns',
      headerRow: 'Header row',
      addRow: 'Add row below',
      addColumn: 'Add column right',
      deleteRow: 'Delete row',
      deleteColumn: 'Delete column',
      deleteTable: 'Delete table',
      horizontalLine: 'Horizontal line',
      pageBreak: 'Page break',
      specialCharacter: 'Special character',
      header: 'Header',
      footer: 'Footer',
      showHeader: 'Show header',
      showFooter: 'Show footer',
      headerPlaceholder: 'Document header',
      footerPlaceholder: 'Document footer',
      paper: 'Paper size',
      orientation: 'Orientation',
      portrait: 'Portrait',
      landscape: 'Landscape',
      margins: 'Margins',
      marginTop: 'Top',
      marginRight: 'Right',
      marginBottom: 'Bottom',
      marginLeft: 'Left',
      inches: 'in',
      background: 'Page color',
      formatting: 'Formatting',
      editing: 'Editing',
      keyboardShortcuts: 'Keyboard shortcuts',
      shortcutsIntro: 'Formatting shortcuts that work while the page is focused.',
      shortcutBold: 'Bold',
      shortcutItalic: 'Italic',
      shortcutUnderline: 'Underline',
      shortcutSave: 'Save now',
      shortcutPrint: 'Print',
      shortcutFind: 'Find and replace',
      shortcutLink: 'Insert link',
      shortcutWordCount: 'Word count',
      outlineEmpty: 'Headings you add will appear here.',
      documentStats: '{words} words · {pages} pages',
      updatedJustNow: 'just now',
      updatedMinutes: '{n}m ago',
      updatedHours: '{n}h ago',
      updatedDays: '{n}d ago',
      footerHint: 'Autosaved in Harness',
      dropImage: 'Drop an image to insert it',
      unsupportedFile: 'Choose a .html, .md, or .txt file.',
      reading: 'Reading file…',
      importFailed: 'Could not import that file.',
      uploadFailed: 'Could not upload that image.',
      nameRequired: 'Give the document a name.',
      errorTitle: 'Docs hit an error',
      errorBody: 'Close this panel and open it again. Your document is saved on the host.',
      emptyDocument: 'Start writing…',
      untitledShort: 'Untitled',
      pageOf: 'Page {n}',
      allChangesSaved: 'All changes saved',
      offlineHint: 'Changes are kept on this host.',
      about: 'About Docs',
      aboutBody:
        'Docs is an internal word processor for Harness. Format text, lay out pages, insert tables and images, print, export, and let the agent edit the same document.',
      ok: 'OK',
      done: 'Done',
    }

    const pl = {
      title: 'Dokumenty',
      subtitle: 'Pisz i formatuj razem.',
      panelLabel: 'Dokumenty',
      newDocument: 'Nowy dokument',
      untitled: 'Dokument bez tytułu',
      noDocuments: 'Nie ma jeszcze dokumentów',
      noDocumentsHint: 'Zacznij od pustej strony albo poproś agenta o szkic. Zmiany agenta pojawiają się tutaj na żywo.',
      createFirst: 'Nowy dokument',
      searchDocuments: 'Szukaj dokumentów',
      allDocuments: 'Wszystkie dokumenty',
      starred: 'Ulubione',
      recent: 'Najnowsze',
      nameAsc: 'Nazwa A–Z',
      documents: 'Dokumenty',
      document: 'Dokument',
      loading: 'Ładowanie…',
      saving: 'Zapisywanie…',
      saved: 'Zapisano',
      unsaved: 'Niezapisane zmiany',
      saveFailed: 'Nie udało się zapisać tej zmiany.',
      openFailed: 'Nie udało się otworzyć tego dokumentu.',
      created: 'Utworzono dokument.',
      deleted: 'Usunięto dokument.',
      duplicated: 'Zduplikowano dokument.',
      imported: 'Zaimportowano {name}.',
      exported: 'Wyeksportowano {name}.',
      rename: 'Zmień nazwę',
      duplicate: 'Zrób kopię',
      delete: 'Usuń',
      deleteConfirm: 'Usunąć ten dokument?',
      close: 'Zamknij',
      cancel: 'Anuluj',
      apply: 'Zastosuj',
      insert: 'Wstaw',
      save: 'Zapisz',
      copy: 'Kopiuj',
      copied: 'Skopiowano.',
      open: 'Otwórz',
      more: 'Więcej',
      file: 'Plik',
      edit: 'Edycja',
      view: 'Widok',
      format: 'Format',
      tools: 'Narzędzia',
      help: 'Pomoc',
      undo: 'Cofnij',
      redo: 'Ponów',
      cut: 'Wytnij',
      paste: 'Wklej',
      selectAll: 'Zaznacz wszystko',
      findAndReplace: 'Znajdź i zamień',
      find: 'Znajdź',
      replace: 'Zamień',
      replaceAll: 'Zamień wszystko',
      findNext: 'Znajdź następne',
      noMatches: 'Brak dopasowań',
      matchCount: 'Dopasowania: {n}',
      caseSensitive: 'Uwzględnij wielkość liter',
      print: 'Drukuj',
      pageSetup: 'Ustawienia strony',
      download: 'Pobierz',
      downloadHtml: 'HTML (.html)',
      downloadMarkdown: 'Markdown (.md)',
      downloadText: 'Zwykły tekst (.txt)',
      importFile: 'Importuj plik',
      makeCopy: 'Zrób kopię',
      wordCount: 'Liczba słów',
      words: 'Słowa',
      characters: 'Znaki',
      charactersNoSpaces: 'Znaki bez spacji',
      paragraphs: 'Akapity',
      pages: 'Strony',
      page: 'Strona',
      ruler: 'Linijka',
      showRuler: 'Pokaż linijkę',
      outline: 'Konspekt',
      showOutline: 'Pokaż konspekt',
      documentList: 'Lista dokumentów',
      showDocumentList: 'Pokaż listę dokumentów',
      folders: 'Foldery',
      newFolder: 'Nowy folder',
      newSubfolder: 'Nowy podfolder',
      folderName: 'Nazwa folderu',
      renameFolder: 'Zmień nazwę folderu',
      deleteFolder: 'Usuń folder',
      deleteFolderConfirm: 'Usunąć ten folder?',
      deleteFolderBody: 'Dokumenty z tego folderu i podfolderów zostaną przeniesione do „Bez folderu”. Nie zostaną usunięte.',
      unfiled: 'Bez folderu',
      folderEmpty: 'Brak dokumentów w tym folderze.',
      moveToFolder: 'Przenieś do folderu',
      folderCreated: 'Utworzono folder.',
      folderRenamed: 'Zmieniono nazwę folderu.',
      folderDeleted: 'Usunięto folder. Dokumenty przeniesiono do „Bez folderu”.',
      documentMoved: 'Przeniesiono dokument.',
      noFolders: 'Nie ma jeszcze folderów',
      expand: 'Rozwiń',
      collapse: 'Zwiń',
      zoom: 'Powiększenie',
      zoomIn: 'Powiększ',
      zoomOut: 'Pomniejsz',
      style: 'Styl',
      normalText: 'Zwykły tekst',
      titleStyle: 'Tytuł',
      subtitleStyle: 'Podtytuł',
      heading1: 'Nagłówek 1',
      heading2: 'Nagłówek 2',
      heading3: 'Nagłówek 3',
      heading4: 'Nagłówek 4',
      heading5: 'Nagłówek 5',
      heading6: 'Nagłówek 6',
      quote: 'Cytat',
      codeBlock: 'Blok kodu',
      font: 'Czcionka',
      fontSize: 'Rozmiar czcionki',
      increaseFont: 'Zwiększ czcionkę',
      decreaseFont: 'Zmniejsz czcionkę',
      bold: 'Pogrubienie',
      italic: 'Kursywa',
      underline: 'Podkreślenie',
      strikethrough: 'Przekreślenie',
      superscript: 'Indeks górny',
      subscript: 'Indeks dolny',
      textColor: 'Kolor tekstu',
      highlightColor: 'Kolor wyróżnienia',
      none: 'Brak',
      customColor: 'Kolor niestandardowy',
      alignLeft: 'Do lewej',
      alignCenter: 'Do środka',
      alignRight: 'Do prawej',
      justify: 'Wyjustuj',
      lineSpacing: 'Odstępy między wierszami',
      single: 'Pojedyncze',
      oneAndHalf: '1,15',
      double: 'Podwójne',
      customSpacing: 'Niestandardowe',
      paragraphSpacing: 'Odstępy akapitu',
      spaceBefore: 'Przed akapitem',
      spaceAfter: 'Po akapicie',
      increaseIndent: 'Zwiększ wcięcie',
      decreaseIndent: 'Zmniejsz wcięcie',
      bulletedList: 'Lista punktowana',
      numberedList: 'Lista numerowana',
      checklist: 'Lista zadań',
      clearFormatting: 'Wyczyść formatowanie',
      insertLink: 'Wstaw link',
      editLink: 'Edytuj link',
      removeLink: 'Usuń link',
      linkUrl: 'Adres linku',
      linkText: 'Tekst do wyświetlenia',
      linkHint: 'Wklej adres URL. Zostaw tekst pusty, aby użyć adresu.',
      insertImage: 'Wstaw obraz',
      imageUrl: 'Adres obrazu',
      imageAlt: 'Tekst alternatywny',
      uploadImage: 'Wgraj obraz',
      imageHint: 'PNG, JPEG, WebP lub GIF do 8 MB.',
      table: 'Tabela',
      insertTable: 'Wstaw tabelę',
      rows: 'Wiersze',
      columns: 'Kolumny',
      headerRow: 'Wiersz nagłówka',
      addRow: 'Dodaj wiersz poniżej',
      addColumn: 'Dodaj kolumnę po prawej',
      deleteRow: 'Usuń wiersz',
      deleteColumn: 'Usuń kolumnę',
      deleteTable: 'Usuń tabelę',
      horizontalLine: 'Linia pozioma',
      pageBreak: 'Podział strony',
      specialCharacter: 'Znak specjalny',
      header: 'Nagłówek strony',
      footer: 'Stopka strony',
      showHeader: 'Pokaż nagłówek',
      showFooter: 'Pokaż stopkę',
      headerPlaceholder: 'Nagłówek dokumentu',
      footerPlaceholder: 'Stopka dokumentu',
      paper: 'Rozmiar papieru',
      orientation: 'Orientacja',
      portrait: 'Pionowa',
      landscape: 'Pozioma',
      margins: 'Marginesy',
      marginTop: 'Góra',
      marginRight: 'Prawo',
      marginBottom: 'Dół',
      marginLeft: 'Lewo',
      inches: 'cal',
      background: 'Kolor strony',
      formatting: 'Formatowanie',
      editing: 'Edycja',
      keyboardShortcuts: 'Skróty klawiszowe',
      shortcutsIntro: 'Skróty formatowania działają, gdy strona jest aktywna.',
      shortcutBold: 'Pogrubienie',
      shortcutItalic: 'Kursywa',
      shortcutUnderline: 'Podkreślenie',
      shortcutSave: 'Zapisz teraz',
      shortcutPrint: 'Drukuj',
      shortcutFind: 'Znajdź i zamień',
      shortcutLink: 'Wstaw link',
      shortcutWordCount: 'Liczba słów',
      outlineEmpty: 'Dodane nagłówki pojawią się tutaj.',
      documentStats: '{words} słów · {pages} str.',
      updatedJustNow: 'przed chwilą',
      updatedMinutes: '{n} min temu',
      updatedHours: '{n} godz. temu',
      updatedDays: '{n} dni temu',
      footerHint: 'Autozapis w Harness',
      dropImage: 'Upuść obraz, aby go wstawić',
      unsupportedFile: 'Wybierz plik .html, .md lub .txt.',
      reading: 'Czytanie pliku…',
      importFailed: 'Nie udało się zaimportować pliku.',
      uploadFailed: 'Nie udało się wgrać obrazu.',
      nameRequired: 'Podaj nazwę dokumentu.',
      errorTitle: 'Dokumenty napotkały błąd',
      errorBody: 'Zamknij ten panel i otwórz go ponownie. Dokument jest zapisany na hoście.',
      emptyDocument: 'Zacznij pisać…',
      untitledShort: 'Bez tytułu',
      pageOf: 'Strona {n}',
      allChangesSaved: 'Wszystkie zmiany zapisane',
      offlineHint: 'Zmiany są przechowywane na tym hoście.',
      about: 'O Dokumentach',
      aboutBody:
        'Dokumenty to wewnętrzny edytor tekstu dla Harness. Formatuj tekst, układaj strony, wstawiaj tabele i obrazy, drukuj, eksportuj i pozwól agentowi edytować ten sam dokument.',
      ok: 'OK',
      done: 'Gotowe',
    }

    // ---------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------

    const PAPER = {
      a4: { w: 8.27, h: 11.69, label: 'A4' },
      letter: { w: 8.5, h: 11, label: 'Letter' },
      legal: { w: 8.5, h: 14, label: 'Legal' },
    }

    const FONTS = [
      'Arial',
      'Google Sans Flex',
      'Inter',
      'Roboto',
      'Helvetica',
      'Georgia',
      'Times New Roman',
      'Garamond',
      'Baskerville',
      'Palatino',
      'Calibri',
      'Cambria',
      'Verdana',
      'Trebuchet MS',
      'Lato',
      'Montserrat',
      'Open Sans',
      'Merriweather',
      'Source Sans 3',
      'Playfair Display',
      'Courier New',
      'JetBrains Mono',
    ]

    const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 60, 72, 96, 120, 144]

    const TEXT_COLORS = [
      '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#d9d9d9', '#ffffff',
      '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8',
      '#0000ff', '#9900ff', '#ff00ff', '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc',
      '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
    ]

    const HIGHLIGHTS = [
      'transparent', '#ffffff', '#fce8b2', '#f9cb9c', '#f4cccc', '#d9ead3',
      '#d0e0e3', '#c9daf8', '#d9d2e9', '#ead1dc', '#ffd966', '#a4c2f4',
      '#b6d7a8', '#f6b26b', '#e06666', '#8e7cc3', '#6fa8dc', '#93c47d',
    ]

    const BLOCK_SELECTOR = 'p,h1,h2,h3,h4,h5,h6,div,li,blockquote,pre'
    const ALLOWED_PASTE_TAGS = new Set([
      'p', 'br', 'div', 'span', 'strong', 'b', 'em', 'i', 'u', 's', 'strike', 'del', 'ins',
      'sup', 'sub', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote',
      'pre', 'code', 'a', 'img', 'mark', 'small', 'big', 'font', 'hr', 'table', 'thead',
      'tbody', 'tfoot', 'tr', 'th', 'td', 'figure', 'figcaption', 'section', 'article',
    ])

    function isImageFile(file) {
      return file && /^image\/(png|jpeg|webp|gif)$/i.test(file.type)
    }

    function readFileAsDataUrl(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result ?? ''))
        reader.onerror = () => reject(reader.error ?? new Error('Could not read that file'))
        reader.readAsDataURL(file)
      })
    }

    function formatRelative(iso, t) {
      const then = Date.parse(iso)
      if (!Number.isFinite(then)) return ''
      const seconds = Math.max(0, Math.round((Date.now() - then) / 1000))
      if (seconds < 45) return t('updatedJustNow')
      const minutes = Math.round(seconds / 60)
      if (minutes < 60) return t('updatedMinutes', { n: minutes })
      const hours = Math.round(minutes / 60)
      if (hours < 24) return t('updatedHours', { n: hours })
      return t('updatedDays', { n: Math.round(hours / 24) })
    }

    function countWords(text) {
      const trimmed = String(text ?? '').trim()
      if (trimmed === '') return 0
      const latin = trimmed.replace(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/g, ' ')
      const words = latin.split(/\s+/).filter(Boolean).length
      const cjk = (trimmed.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af]/g) ?? []).length
      return words + cjk
    }

    function pagePixels(page) {
      const base = PAPER[page?.paper] ?? PAPER.a4
      const landscape = page?.orientation === 'landscape'
      return {
        width: (landscape ? base.h : base.w) * PAGE_DPI,
        height: (landscape ? base.w : base.h) * PAGE_DPI,
      }
    }

    function sanitizeStyleText(css) {
      return String(css ?? '')
        .replace(/expression\s*\([^)]*\)/gi, '')
        .replace(/javascript\s*:/gi, '')
        .replace(/url\s*\([^)]*\)/gi, '')
        .replace(/@import[^;]*;?/gi, '')
    }

    function normalizeHref(value) {
      const url = String(value ?? '').trim()
      if (url === '' || /^(https?:\/\/|mailto:|tel:|#|\/|\.\/|\.\.\/)/i.test(url)) return url
      return `https://${url}`
    }

    function normalizeSrc(value) {
      const url = String(value ?? '').trim()
      if (url === '' || /^(https?:\/\/|\/|\.\/|\.\.\/|data:image\/(png|jpe?g|gif|webp);base64,)/i.test(url)) return url
      return `https://${url}`
    }

    function safeHref(value) {
      const url = String(value ?? '').trim()
      return url === '' || /^(https?:\/\/|mailto:|tel:|#|\/|\.\/|\.\.\/)/i.test(url)
    }

    function safeSrc(value) {
      const url = String(value ?? '').trim()
      return /^(https?:\/\/|\/|\.\/|\.\.\/|data:image\/(png|jpe?g|gif|webp);base64,)/i.test(url)
    }

    function sanitizePasted(html) {
      const parsed = new DOMParser().parseFromString(String(html ?? ''), 'text/html')
      parsed.body.querySelectorAll('script,style,iframe,object,embed,link,meta,base,form,input,textarea,select,button,svg,math,template,video,audio,source,canvas,dialog').forEach((node) => node.remove())
      const elements = Array.from(parsed.body.querySelectorAll('*'))
      for (const element of elements) {
        const tag = element.tagName.toLowerCase()
        if (!ALLOWED_PASTE_TAGS.has(tag)) {
          const parent = element.parentNode
          if (!parent) continue
          while (element.firstChild) parent.insertBefore(element.firstChild, element)
          parent.removeChild(element)
          continue
        }
        for (const attribute of Array.from(element.attributes)) {
          const name = attribute.name.toLowerCase()
          const value = attribute.value
          if (name.startsWith('on') || name === 'contenteditable' || name === 'spellcheck' || name === 'id') {
            element.removeAttribute(attribute.name)
            continue
          }
          if (name === 'href' && !safeHref(value)) element.removeAttribute(attribute.name)
          if (name === 'src' && !safeSrc(value)) element.removeAttribute(attribute.name)
          if (name === 'srcset' || name === 'formaction' || name === 'srcdoc' || name === 'xlink:href') {
            element.removeAttribute(attribute.name)
            continue
          }
          if (name === 'class') {
            const keep = value.split(/\s+/).filter((klass) => klass.startsWith('doc-'))
            if (keep.length === 0) element.removeAttribute(attribute.name)
            else element.setAttribute('class', keep.join(' '))
            continue
          }
          if (name === 'style') {
            const clean = sanitizeStyleText(value)
            if (clean.trim() === '') element.removeAttribute(attribute.name)
            else element.setAttribute('style', clean)
          }
        }
      }
      return parsed.body.innerHTML
    }

    function escapeHtml(value) {
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    }

    function downloadBlob(filename, blob) {
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = filename
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 2000)
    }

    function safeFilename(name) {
      return String(name ?? 'document')
        .replace(/[\\/:*?"<>|]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 90) || 'document'
    }

    function closestBlock(node) {
      const editor = node?.nodeType === Node.ELEMENT_NODE ? node : node?.parentElement
      return editor?.closest?.(BLOCK_SELECTOR) ?? null
    }

    function blockKind(element) {
      if (!element) return 'normal'
      const tag = element.tagName?.toLowerCase()
      if (tag === 'h1' && element.classList.contains('doc-title')) return 'title'
      if ((tag === 'h1' || tag === 'h2') && element.classList.contains('doc-subtitle')) return 'subtitle'
      if (tag === 'blockquote') return 'quote'
      if (tag === 'pre') return 'code'
      if (/^h[1-6]$/.test(tag)) return tag
      return 'normal'
    }

    function readFormatState(editor) {
      const state = {
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        superscript: false,
        subscript: false,
        unordered: false,
        ordered: false,
        align: 'left',
        style: 'normal',
        fontFamily: '',
        fontSize: 12,
        textColor: '#000000',
        highlight: 'transparent',
      }
      if (!editor) return state
      try {
        state.bold = document.queryCommandState('bold')
        state.italic = document.queryCommandState('italic')
        state.underline = document.queryCommandState('underline')
        state.strikethrough = document.queryCommandState('strikeThrough')
        state.superscript = document.queryCommandState('superscript')
        state.subscript = document.queryCommandState('subscript')
        state.unordered = document.queryCommandState('insertUnorderedList')
        state.ordered = document.queryCommandState('insertOrderedList')
        state.align = document.queryCommandState('justifyCenter')
          ? 'center'
          : document.queryCommandState('justifyRight')
            ? 'right'
            : document.queryCommandState('justifyFull')
              ? 'justify'
              : 'left'
      } catch {
        // queryCommandState can throw before the editor has a selection.
      }
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0 && editor.contains(selection.anchorNode)) {
        const block = closestBlock(selection.anchorNode)
        state.style = blockKind(block)
        const anchor = selection.anchorNode?.nodeType === Node.ELEMENT_NODE
          ? selection.anchorNode
          : selection.anchorNode?.parentElement
        if (anchor && editor.contains(anchor)) {
          const computed = window.getComputedStyle(anchor)
          state.fontFamily = computed.fontFamily.split(',')[0].replace(/["']/g, '').trim()
          state.fontSize = Math.round(parseFloat(computed.fontSize) || 12)
          state.textColor = computed.color || '#000000'
          state.highlight = computed.backgroundColor || 'transparent'
        }
      }
      return state
    }

    function textStats(editor, pageHeight, margins) {
      if (!editor) return { words: 0, chars: 0, charsNoSpaces: 0, paragraphs: 0, pages: 1 }
      const text = editor.innerText ?? ''
      const words = countWords(text)
      const chars = text.length
      const charsNoSpaces = text.replace(/\s/g, '').length
      const paragraphs = Array.from(editor.querySelectorAll('p,h1,h2,h3,h4,h5,h6,li,blockquote,pre'))
        .filter((element) => (element.textContent ?? '').trim() !== '').length
      const contentHeight = Math.max(200, pageHeight - (margins.top + margins.bottom) * PAGE_DPI)
      const pages = Math.max(1, Math.ceil((editor.scrollHeight || 1) / contentHeight))
      return { words, chars, charsNoSpaces, paragraphs, pages }
    }

    function documentOutline(editor) {
      if (!editor) return []
      return Array.from(editor.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((element, index) => ({
        index,
        tag: element.tagName.toLowerCase(),
        kind: blockKind(element),
        text: (element.textContent ?? '').trim() || 'Untitled heading',
      }))
    }

    function findTextMatches(root, query, caseSensitive) {
      const needle = String(query ?? '')
      if (needle === '' || !root) return []
      const matches = []
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue) return NodeFilter.FILTER_REJECT
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT
          if (parent.closest('.docs-page-break,script,style')) return NodeFilter.FILTER_REJECT
          return needle.length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        },
      })
      const haystackNeedle = caseSensitive ? needle : needle.toLowerCase()
      let node = walker.nextNode()
      while (node) {
        const value = node.nodeValue ?? ''
        const haystack = caseSensitive ? value : value.toLowerCase()
        let offset = haystack.indexOf(haystackNeedle)
        while (offset !== -1) {
          matches.push({ node, start: offset, end: offset + needle.length })
          offset = haystack.indexOf(haystackNeedle, offset + Math.max(1, needle.length))
        }
        node = walker.nextNode()
      }
      return matches
    }

    function selectTextMatch(match) {
      if (!match) return
      const range = document.createRange()
      range.setStart(match.node, match.start)
      range.setEnd(match.node, match.end)
      const selection = window.getSelection()
      if (!selection) return
      selection.removeAllRanges()
      selection.addRange(range)
      const parent = match.node.parentElement
      parent?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }

    function nearestSize(value) {
      const number = Math.round(Number(value) || 12)
      let best = FONT_SIZES[0]
      for (const size of FONT_SIZES) {
        if (Math.abs(size - number) < Math.abs(best - number)) best = size
      }
      return best
    }

    function htmlToMarkdown(root) {
      if (!root) return ''
      const lines = []
      const blockSep = () => {
        if (lines.length > 0 && lines[lines.length - 1] !== '') lines.push('')
      }
      const inline = (node) => {
        if (node.nodeType === Node.TEXT_NODE) return node.nodeValue.replace(/\s+/g, ' ')
        if (node.nodeType !== Node.ELEMENT_NODE) return ''
        const tag = node.tagName.toLowerCase()
        const inner = Array.from(node.childNodes).map(inline).join('')
        if (tag === 'br') return '\n'
        if (tag === 'strong' || tag === 'b') return `**${inner.trim()}**`
        if (tag === 'em' || tag === 'i') return `*${inner.trim()}*`
        if (tag === 'u') return `<u>${inner}</u>`
        if (tag === 's' || tag === 'strike' || tag === 'del') return `~~${inner.trim()}~~`
        if (tag === 'code') return `\`${inner}\``
        if (tag === 'a') return `[${inner}](${node.getAttribute('href') ?? ''})`
        if (tag === 'img') return `![${node.getAttribute('alt') ?? ''}](${node.getAttribute('src') ?? ''})`
        if (tag === 'sup') return `<sup>${inner}</sup>`
        if (tag === 'sub') return `<sub>${inner}</sub>`
        return inner
      }
      const walk = (element) => {
        for (const child of Array.from(element.children)) {
          const tag = child.tagName.toLowerCase()
          if (/^h[1-6]$/.test(tag)) {
            blockSep()
            lines.push(`${'#'.repeat(Number(tag[1]))} ${inline(child).trim()}`)
            blockSep()
          } else if (tag === 'p' || tag === 'div') {
            const text = inline(child).trim()
            if (text !== '') {
              lines.push(text)
              blockSep()
            }
          } else if (tag === 'blockquote') {
            blockSep()
            lines.push(...inline(child).trim().split('\n').map((line) => `> ${line}`))
            blockSep()
          } else if (tag === 'pre') {
            blockSep()
            lines.push('```', child.textContent ?? '', '```')
            blockSep()
          } else if (tag === 'ul' || tag === 'ol') {
            blockSep()
            const ordered = tag === 'ol'
            Array.from(child.children).forEach((item, index) => {
              const text = inline(item).trim()
              if (text !== '') lines.push(`${ordered ? `${index + 1}.` : '-'} ${text}`)
            })
            blockSep()
          } else if (tag === 'hr') {
            blockSep()
            lines.push('---')
            blockSep()
          } else if (tag === 'table') {
            blockSep()
            const rows = Array.from(child.querySelectorAll('tr'))
            rows.forEach((row, rowIndex) => {
              const cells = Array.from(row.querySelectorAll('th,td')).map((cell) => inline(cell).trim())
              lines.push(`| ${cells.join(' | ')} |`)
              if (rowIndex === 0) lines.push(`| ${cells.map(() => '---').join(' | ')} |`)
            })
            blockSep()
          } else if (tag === 'img') {
            lines.push(inline(child))
            blockSep()
          } else if (tag !== 'style' && tag !== 'script') {
            const text = inline(child).trim()
            if (text !== '') {
              lines.push(text)
              blockSep()
            }
          }
        }
      }
      walk(root)
      return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n'
    }

    function buildStandaloneHtml({ title, body, header, footer, showHeader, showFooter, page }) {
      const dimensions = pagePixels(page)
      const margins = page.margins
      const base = PAPER[page.paper] ?? PAPER.a4
      const printWidth = page.orientation === 'landscape' ? base.h : base.w
      const printHeight = page.orientation === 'landscape' ? base.w : base.h
      return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title || 'Document')}</title>
<style>
  @page { size: ${printWidth}in ${printHeight}in; margin: 0; }
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f1f3f4; font-family: Arial, Helvetica, sans-serif; color: #202124; }
  .page { width: ${dimensions.width}px; min-height: ${dimensions.height}px; margin: 24px auto; background: ${page.background}; padding: ${margins.top * PAGE_DPI}px ${margins.right * PAGE_DPI}px ${margins.bottom * PAGE_DPI}px ${margins.left * PAGE_DPI}px; position: relative; box-shadow: 0 1px 3px rgba(0,0,0,.18); }
  .page-header, .page-footer { position: absolute; left: ${margins.left * PAGE_DPI}px; right: ${margins.right * PAGE_DPI}px; font-size: 11px; color: #5f6368; }
  .page-header { top: ${Math.max(14, margins.top * PAGE_DPI * 0.35)}px; }
  .page-footer { bottom: ${Math.max(14, margins.bottom * PAGE_DPI * 0.35)}px; }
  .content { font-size: 16px; line-height: 1.5; }
  .content p { margin: 0 0 10px; }
  .content h1 { font-size: 28px; margin: 18px 0 8px; } .content h2 { font-size: 22px; margin: 16px 0 7px; }
  .content h3 { font-size: 18px; margin: 14px 0 6px; } .content h4 { font-size: 16px; margin: 12px 0 5px; }
  .content .doc-title { font-size: 36px; font-weight: 400; margin: 0 0 14px; }
  .content .doc-subtitle { font-size: 24px; color: #5f6368; font-weight: 400; margin: 0 0 14px; }
  .content blockquote { border-left: 4px solid #dadce0; margin: 8px 0 12px; padding-left: 14px; color: #3c4043; }
  .content pre { background: #f1f3f4; padding: 10px; border-radius: 4px; white-space: pre-wrap; font-family: "Courier New", monospace; }
  .content a { color: #1a73e8; }
  .content img { max-width: 100%; height: auto; }
  .content table { border-collapse: collapse; width: 100%; margin: 10px 0 14px; }
  .content td, .content th { border: 1px solid #bdc1c6; padding: 6px 8px; vertical-align: top; }
  .content th { background: #f1f3f4; font-weight: 600; }
  .content hr { border: 0; border-top: 1px solid #dadce0; margin: 14px 0; }
  .content hr.doc-page-break { border-top: 1px dashed #9aa0a6; page-break-after: always; }
  .content ul.doc-checklist { list-style: none; padding-left: 0; }
  .content ul.doc-checklist li { position: relative; padding-left: 26px; margin: 4px 0; }
  .content .doc-check { position: absolute; left: 0; top: 4px; width: 14px; height: 14px; border: 2px solid #5f6368; border-radius: 3px; }
  .content li.checked .doc-check { background: #1a73e8; border-color: #1a73e8; }
  .content li.checked .doc-check::after { content: ""; position: absolute; left: 3px; top: 0; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
  .content li.checked .doc-check-text { text-decoration: line-through; color: #80868b; }
  @media print { body { background: #fff; } .page { margin: 0; box-shadow: none; } }
</style></head><body><div class="page">${showHeader && header ? `<div class="page-header">${escapeHtml(header)}</div>` : ''}<div class="content">${body}</div>${showFooter && footer ? `<div class="page-footer">${escapeHtml(footer)}</div>` : ''}</div></body></html>`
    }

    // ---------------------------------------------------------------------
    // Icons
    // ---------------------------------------------------------------------

    const ICON_PATHS = {
      document: ['M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z', 'M14 2v5h5', 'M9 13h6', 'M9 17h6'],
      folder: ['M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
      folderPlus: ['M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M12 11v6', 'M9 14h6'],
      edit: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
      plus: ['M12 5v14', 'M5 12h14'],
      search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'],
      chevronDown: ['m6 9 6 6 6-6'],
      chevronRight: ['m9 6 6 6-6 6'],
      undo: ['M9 14 4 9l5-5', 'M4 9h10a5 5 0 0 1 0 10h-3'],
      redo: ['m15 14 5-5-5-5', 'M20 9H10a5 5 0 0 0 0 10h3'],
      printer: ['M6 9V3h12v6', 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2', 'M6 14h12v7H6z'],
      paint: ['M19 11 11 3 3 11l8 8 8-8z', 'M11 3v8h8'],
      link: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
      image: ['M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M8.5 8.5h.01', 'M21 15l-5-5L5 21'],
      alignLeft: ['M3 6h18', 'M3 12h12', 'M3 18h15'],
      alignCenter: ['M3 6h18', 'M6 12h12', 'M4 18h16'],
      alignRight: ['M3 6h18', 'M9 12h12', 'M6 18h15'],
      justify: ['M3 6h18', 'M3 12h18', 'M3 18h18'],
      listBullet: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
      listNumber: ['M10 6h11', 'M10 12h11', 'M10 18h11', 'M4 6h1v4', 'M4 10h2', 'M4 16h2v4', 'M4 20h2'],
      checklist: ['M10 6h11', 'M10 12h11', 'M10 18h11', 'm3 6 1 1 2-2', 'm3 12 1 1 2-2', 'm3 18 1 1 2-2'],
      indent: ['M3 8h18', 'M3 16h18', 'M11 12h10', 'm3 10 3 2-3 2'],
      outdent: ['M3 8h18', 'M3 16h18', 'M11 12h10', 'm8 10-3 2 3 2'],
      clear: ['M4 4l16 16', 'M9 4h9l3 3v9', 'M4 7v13h13', 'M8 12h6'],
      table: ['M3 4h18v16H3z', 'M3 10h18', 'M3 16h18', 'M9 4v16', 'M15 4v16'],
      minus: ['M4 12h16'],
      pageBreak: ['M4 7h16', 'M4 17h16', 'm9 12 3 3 3-3'],
      special: ['M12 3v18', 'M3 12h18', 'm5.6 5.6 12.8 12.8', 'm18.4 5.6-12.8 12.8'],
      find: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35', 'M8 11h6'],
      settings: ['M4 21v-7', 'M4 10V3', 'M12 21v-9', 'M12 8V3', 'M20 21v-5', 'M20 12V3', 'M1 14h6', 'M9 8h6', 'M17 16h6'],
      trash: ['M3 6h18', 'M8 6V4h8v2', 'M19 6l-1 14H6L5 6', 'M10 11v5', 'M14 11v5'],
      copy: ['M9 9h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'],
      star: ['m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z'],
      close: ['M18 6 6 18', 'M6 6l12 12'],
      check: ['M20 6 9 17l-5-5'],
      download: ['M12 3v12', 'm7 10 5 5 5-5', 'M5 21h14'],
      upload: ['M12 21V9', 'm7 14 5-5 5 5', 'M5 3h14'],
      wordCount: ['M4 6h16', 'M4 12h10', 'M4 18h7', 'M17 14v7', 'M14 17h6'],
      outline: ['M4 6h3', 'M4 12h3', 'M4 18h3', 'M10 6h10', 'M10 12h10', 'M10 18h10'],
      panelLeft: ['M3 4h18v16H3z', 'M9 4v16'],
      panelRight: ['M3 4h18v16H3z', 'M15 4v16'],
      more: ['M5 12h.01', 'M12 12h.01', 'M19 12h.01'],
      help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4', 'M12 17h.01'],
      clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
      type: ['M4 7V4h16v3', 'M9 20h6', 'M12 4v16'],
      palette: ['M12 22a10 10 0 1 0 0-20c-5 0-9 3.6-9 8.5 0 3 2.4 5.5 5.5 5.5H10a2 2 0 0 0 0 4c0 1 .9 2 2 2z', 'M7 9h.01', 'M10 6h.01', 'M15 7h.01', 'M18 11h.01'],
      zoomOut: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35', 'M8 11h6'],
      zoomIn: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35', 'M8 11h6', 'M11 8v6'],
      fileDown: ['M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z', 'M14 2v5h5', 'M12 11v6', 'm9 14 3 3 3-3'],
      menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
      heading: ['M6 4v16', 'M18 4v16', 'M6 12h12'],
      quote: ['M7 7h4v4c0 3-2 4-4 5', 'M15 7h4v4c0 3-2 4-4 5'],
      code: ['m8 8-4 4 4 4', 'm16 8 4 4-4 4', 'm14 4-4 16'],
      lineSpacing: ['M3 6h18', 'M3 12h18', 'M3 18h18', 'M21 3v18'],
      header: ['M4 5h16', 'M4 9h10', 'M4 13h16', 'M4 17h8'],
      footer: ['M4 7h16', 'M4 11h8', 'M4 15h16', 'M4 19h10'],
      arrowUp: ['M12 19V5', 'm5 12 7-7 7 7'],
      arrowDown: ['M12 5v14', 'm19 12-7 7-7-7'],
      external: ['M15 3h6v6', 'M10 14 21 3', 'M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5'],
      warning: ['M12 9v4', 'M12 17h.01', 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'],
      checkCircle: ['M22 11.1V12a10 10 0 1 1-5.9-9.1', 'M22 4 12 14l-3-3'],
      sparkle: ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z', 'M19 3v4', 'M21 5h-4'],
    }

    function Icon({ name, size = 16, className = '', style }) {
      const paths = ICON_PATHS[name] ?? ICON_PATHS.document
      return h(
        'svg',
        {
          className: `dd-icon ${className}`.trim(),
          style,
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': 'true',
          focusable: 'false',
        },
        paths.map((path, index) => h('path', { key: index, d: path })),
      )
    }

    function DocsGlyph({ size = 20, active = false }) {
      return h(
        'span',
        {
          className: `dd-glyph${active ? ' dd-glyph-active' : ''}`,
          style: { width: size, height: size },
          'aria-hidden': 'true',
        },
        h(Icon, { name: 'document', size }),
        active ? h('span', { className: 'dd-glyph-spark' }) : null,
      )
    }

    // ---------------------------------------------------------------------
    // API
    // ---------------------------------------------------------------------

    async function api(path, options = {}) {
      const response = await fetch(`${API}${path}`, {
        ...options,
        headers: {
          'content-type': 'application/json',
          ...(options.headers ?? {}),
        },
        cache: 'no-store',
      })
      let payload = null
      try {
        payload = await response.json()
      } catch {
        payload = null
      }
      if (!response.ok || payload?.ok === false) {
        throw new Error(payload?.error?.message ?? `Docs request failed (${response.status})`)
      }
      return payload ?? {}
    }

    // ---------------------------------------------------------------------
    // Small UI pieces
    // ---------------------------------------------------------------------

    function ToolButton({ label, icon, letter, active, disabled, onClick, className = '', showCaret = false, children }) {
      return h(
        'button',
        {
          type: 'button',
          className: `dd-tool${active ? ' dd-tool-active' : ''}${disabled ? ' dd-tool-disabled' : ''} ${className}`.trim(),
          title: label,
          'aria-label': label,
          'aria-pressed': active ? 'true' : 'false',
          disabled,
          onMouseDown: (event) => event.preventDefault(),
          onClick,
        },
        letter
          ? h('span', { className: 'dd-tool-letter', style: letter.style ?? null }, letter.text)
          : icon
            ? h(Icon, { name: icon, size: 17 })
            : null,
        children ? h('span', { className: 'dd-tool-sub' }, children) : null,
        showCaret ? h(Icon, { name: 'chevronDown', size: 11, className: 'dd-caret' }) : null,
      )
    }

    function Separator() {
      return h('span', { className: 'dd-sep', 'aria-hidden': 'true' })
    }

    function MenuItem({ label, shortcut, checked, danger, disabled, onClick, icon, children }) {
      return h(
        'button',
        {
          type: 'button',
          className: `dd-menu-item${danger ? ' dd-menu-danger' : ''}${disabled ? ' dd-menu-disabled' : ''}`.trim(),
          disabled,
          onMouseDown: (event) => event.preventDefault(),
          onClick,
          role: 'menuitem',
        },
        h('span', { className: 'dd-menu-check' }, checked ? h(Icon, { name: 'check', size: 14 }) : null),
        icon ? h(Icon, { name: icon, size: 15 }) : null,
        h('span', { className: 'dd-menu-label' }, children ?? label),
        shortcut ? h('span', { className: 'dd-menu-shortcut' }, shortcut) : null,
      )
    }

    function MenuDropdown({ id, label, open, onToggle, onClose, children }) {
      return h(
        'div',
        { className: 'dd-menu-wrap' },
        h(
          'button',
          {
            type: 'button',
            className: `dd-menu-trigger${open ? ' dd-open' : ''}`,
            'aria-haspopup': 'menu',
            'aria-expanded': open ? 'true' : 'false',
            onMouseDown: (event) => event.preventDefault(),
            onClick: () => (open ? onClose() : onToggle(id)),
          },
          label,
        ),
        open
          ? h(
              'div',
              { className: 'dd-menu', role: 'menu', onMouseDown: (event) => event.preventDefault() },
              children,
            )
          : null,
      )
    }

    function Modal({ title, subtitle, onClose, children, width = 420, footer }) {
      useEffect(() => {
        const onKey = (event) => {
          if (event.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', onKey)
        const timer = window.setTimeout(() => {
          const first = document.querySelector('.dd-modal input, .dd-modal select, .dd-modal textarea, .dd-modal button')
          first?.focus?.()
        }, 20)
        return () => {
          document.removeEventListener('keydown', onKey)
          window.clearTimeout(timer)
        }
      }, [onClose])
      return h(
        'div',
        {
          className: 'dd-modal-backdrop',
          onMouseDown: (event) => {
            if (event.target === event.currentTarget) onClose()
          },
        },
        h(
          'div',
          { className: 'dd-modal', style: { width }, role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
          h(
            'div',
            { className: 'dd-modal-head' },
            h('div', null, h('h2', null, title), subtitle ? h('p', null, subtitle) : null),
            h(
              'button',
              { type: 'button', className: 'dd-icon-btn', onClick: onClose, 'aria-label': 'Close' },
              h(Icon, { name: 'close', size: 17 }),
            ),
          ),
          h('div', { className: 'dd-modal-body' }, children),
          footer ? h('div', { className: 'dd-modal-foot' }, footer) : null,
        ),
      )
    }

    function Field({ label, hint, children }) {
      return h(
        'label',
        { className: 'dd-field' },
        h('span', { className: 'dd-field-label' }, label),
        children,
        hint ? h('span', { className: 'dd-field-hint' }, hint) : null,
      )
    }

    function ColorPopover({ t, title, colors, onPick, allowNone }) {
      return h(
        'div',
        { className: 'dd-color-popover', role: 'dialog', 'aria-label': title, onMouseDown: (event) => event.stopPropagation() },
        h('div', { className: 'dd-color-title' }, title),
        h(
          'div',
          { className: 'dd-swatch-grid' },
          colors.map((color) =>
            h('button', {
              key: color,
              type: 'button',
              className: `dd-swatch${color === 'transparent' ? ' dd-swatch-none' : ''}`,
              style: color === 'transparent' ? null : { background: color },
              title: color === 'transparent' ? t('none') : color,
              'aria-label': color === 'transparent' ? t('none') : color,
              onMouseDown: (event) => event.preventDefault(),
              onClick: () => onPick(color),
            }),
          ),
        ),
        allowNone
          ? h(
              'button',
              {
                type: 'button',
                className: 'dd-color-none',
                onMouseDown: (event) => event.preventDefault(),
                onClick: () => onPick('transparent'),
              },
              h(Icon, { name: 'close', size: 13 }),
              t('none'),
            )
          : null,
        h(
          'label',
          { className: 'dd-color-custom' },
          h('input', {
            type: 'color',
            onChange: (event) => onPick(event.target.value),
            'aria-label': t('customColor'),
          }),
          h('span', null, t('customColor')),
        ),
      )
    }

    function Toast({ toast, onClose }) {
      if (!toast) return null
      return h(
        'div',
        { className: `dd-toast dd-toast-${toast.kind ?? 'info'}`, role: 'status', 'aria-live': 'polite' },
        h(Icon, { name: toast.kind === 'error' ? 'warning' : 'checkCircle', size: 16 }),
        h('span', null, toast.message),
        h(
          'button',
          { type: 'button', className: 'dd-toast-close', onClick: onClose, 'aria-label': 'Dismiss' },
          h(Icon, { name: 'close', size: 13 }),
        ),
      )
    }

    // ---------------------------------------------------------------------
    // Styles
    // ---------------------------------------------------------------------

    const CSS = `
      .dd-root {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 0;
        overflow: hidden;
        background: var(--dsw-alias-bg-base);
        color: var(--dsw-alias-label-primary);
        font-size: 13px;
        --dd-page-bg: #ffffff;
        --dd-ink: #202124;
        --dd-muted: #5f6368;
        --dd-hairline: rgba(0,0,0,.10);
      }
      .dd-root *, .dd-root *::before, .dd-root *::after { box-sizing: border-box; }
      .dd-icon { display: block; flex: none; }
      .dd-top {
        flex: none;
        display: flex;
        align-items: center;
        gap: 10px;
        min-height: 54px;
        padding: max(14px, calc(var(--dsh-frame-top-clearance, 0px) + 6px)) 18px 10px;
        border-bottom: 1px solid var(--dsw-alias-border-l1);
      }
      .dd-brand { display: flex; align-items: center; gap: 8px; flex: none; color: var(--dsw-alias-label-primary); }
      .dd-glyph { display: inline-flex; align-items: center; justify-content: center; flex: none; color: inherit; background: transparent; position: relative; line-height: 0; vertical-align: middle; }
      .dd-glyph-spark { position: absolute; right: 4px; bottom: 3px; width: 5px; height: 5px; border-radius: 50%; background: #f9ab00; }
      .dd-brand-name { font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
      .dd-title-wrap { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center; }
      .dd-title-input {
        width: min(460px, 100%);
        height: 32px;
        padding: 0 8px;
        border: 1px solid transparent;
        border-radius: 7px;
        background: transparent;
        color: var(--dsw-alias-label-primary);
        font: inherit;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        outline: none;
      }
      .dd-title-input:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 4%, transparent); }
      .dd-title-input:focus { border-color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-bg-layer-1); }
      .dd-top-actions { display: flex; align-items: center; gap: 5px; flex: none; }
      .dd-save-state { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 8px; border-radius: 999px; color: var(--dsw-alias-label-secondary); font-size: 11.5px; white-space: nowrap; }
      .dd-save-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--dsw-alias-state-success-primary); }
      .dd-save-state[data-state="dirty"] .dd-save-dot { background: var(--dsw-alias-state-warn-primary); }
      .dd-save-state[data-state="saving"] .dd-save-dot { background: var(--dsw-alias-brand-primary); animation: dd-pulse 1.1s ease-in-out infinite; }
      .dd-save-state[data-state="error"] .dd-save-dot { background: var(--dsw-alias-state-error-primary); }
      @keyframes dd-pulse { 0%,100% { opacity: .35; transform: scale(.8); } 50% { opacity: 1; transform: scale(1.1); } }
      .dd-btn {
        appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
        height: 30px; padding: 0 10px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px;
        background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary);
        font: inherit; font-size: 12.5px; line-height: 1; cursor: pointer; white-space: nowrap;
      }
      .dd-btn:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, var(--dsw-alias-bg-layer-1)); }
      .dd-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .dd-btn-primary { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); color: #fff; }
      .dd-btn-primary:hover { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 86%, #000); }
      .dd-btn-danger { color: var(--dsw-alias-state-error-primary); }
      .dd-icon-btn {
        appearance: none; display: inline-flex; align-items: center; justify-content: center;
        width: 28px; height: 28px; padding: 0; border: 0; border-radius: 7px; background: transparent;
        color: var(--dsw-alias-label-secondary); cursor: pointer;
      }
      .dd-icon-btn:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); color: var(--dsw-alias-label-primary); }
      .dd-icon-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .dd-menubar { flex: none; display: flex; align-items: center; gap: 1px; height: 30px; padding: 0 12px; border-bottom: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base); position: relative; z-index: 8; }
      .dd-menu-wrap { position: relative; }
      .dd-menu-trigger { appearance: none; height: 24px; padding: 0 8px; border: 0; border-radius: 5px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 12px; cursor: pointer; }
      .dd-menu-trigger:hover, .dd-menu-trigger.dd-open { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); color: var(--dsw-alias-label-primary); }
      .dd-menu { position: absolute; top: 27px; left: 0; min-width: 230px; max-height: min(72vh, 620px); overflow-y: auto; padding: 5px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; background: var(--dsw-alias-bg-overlay); box-shadow: 0 14px 38px rgba(0,0,0,.20); z-index: 60; }
      .dd-menu-item { appearance: none; display: flex; align-items: center; gap: 7px; width: 100%; height: 29px; padding: 0 7px; border: 0; border-radius: 6px; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 12.5px; text-align: left; cursor: pointer; }
      .dd-menu-item:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); }
      .dd-menu-item:disabled { opacity: .45; cursor: default; }
      .dd-menu-check { display: inline-flex; align-items: center; justify-content: center; width: 15px; flex: none; color: var(--dsw-alias-brand-primary); }
      .dd-menu-label { flex: 1; white-space: nowrap; }
      .dd-menu-shortcut { color: var(--dsw-alias-label-secondary); font-size: 11px; white-space: nowrap; }
      .dd-menu-danger { color: var(--dsw-alias-state-error-primary); }
      .dd-menu-divider { height: 1px; margin: 4px 6px; background: var(--dsw-alias-border-l1); }
      .dd-menu-section { padding: 5px 8px 3px; color: var(--dsw-alias-label-secondary); font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
      .dd-toolbar { flex: none; display: flex; align-items: center; gap: 2px; min-height: 43px; padding: 5px 10px; border-bottom: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base); overflow-x: auto; overflow-y: hidden; scrollbar-width: thin; position: relative; z-index: 7; }
      .dd-toolbar.dd-toolbar-overflow { overflow: visible; }
      .dd-toolbar::-webkit-scrollbar { height: 5px; }
      .dd-toolbar::-webkit-scrollbar-thumb { background: var(--dsw-alias-border-l2); border-radius: 99px; }
      .dd-tool {
        appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 2px;
        min-width: 28px; height: 28px; padding: 0 4px; border: 0; border-radius: 5px;
        background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; cursor: pointer; flex: none;
      }
      .dd-tool:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent); color: var(--dsw-alias-label-primary); }
      .dd-tool-active { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 13%, transparent); color: var(--dsw-alias-brand-primary); }
      .dd-tool-disabled { opacity: .4; cursor: default; }
      .dd-tool:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
      .dd-tool-letter { font-size: 14px; line-height: 1; font-family: Arial, sans-serif; }
      .dd-tool-sub { font-size: 10px; }
      .dd-caret { margin-left: 1px; opacity: .7; }
      .dd-sep { width: 1px; height: 20px; margin: 0 4px; background: var(--dsw-alias-border-l1); flex: none; }
      .dd-select {
        appearance: none; height: 28px; padding: 0 22px 0 7px; border: 1px solid transparent; border-radius: 5px;
        background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 6px center;
        color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; cursor: pointer; flex: none;
      }
      .dd-select:hover { background-color: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent); }
      .dd-select:focus { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 0; }
      .dd-select-style { width: 112px; }
      .dd-select-font { width: 128px; }
      .dd-select-size { width: 58px; }
      .dd-select-zoom { width: 66px; }
      .dd-color-tool { position: relative; display: inline-flex; }
      .dd-color-btn { appearance: none; display: inline-flex; flex-direction: column; align-items: center; justify-content: center; width: 30px; height: 28px; padding: 2px 3px; border: 0; border-radius: 5px; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; }
      .dd-color-btn:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent); }
      .dd-color-letter { font-family: Arial, sans-serif; font-size: 13px; line-height: 15px; font-weight: 600; color: var(--dsw-alias-label-primary); }
      .dd-color-bar { width: 16px; height: 4px; border-radius: 2px; margin-top: 1px; box-shadow: inset 0 0 0 1px rgba(0,0,0,.12); }
      .dd-color-bar-highlight { width: 17px; height: 5px; border-radius: 2px; margin-top: 0; }
      .dd-color-popover { position: absolute; top: 32px; left: 0; width: 238px; padding: 9px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; background: var(--dsw-alias-bg-overlay); box-shadow: 0 14px 38px rgba(0,0,0,.22); z-index: 70; }
      .dd-color-title { margin: 0 2px 7px; font-size: 11px; color: var(--dsw-alias-label-secondary); }
      .dd-swatch-grid { display: grid; grid-template-columns: repeat(9, 1fr); gap: 4px; }
      .dd-swatch { width: 20px; height: 20px; border: 1px solid rgba(0,0,0,.16); border-radius: 4px; cursor: pointer; padding: 0; }
      .dd-swatch:hover { transform: scale(1.1); }
      .dd-swatch-none { background: repeating-linear-gradient(135deg, #fff 0 4px, #eee 4px 8px); position: relative; }
      .dd-swatch-none::after { content: ""; position: absolute; left: 8px; top: -1px; width: 2px; height: 21px; background: #d93025; transform: rotate(45deg); }
      .dd-color-none { appearance: none; display: flex; align-items: center; gap: 5px; width: 100%; margin-top: 6px; padding: 4px 5px; border: 0; border-radius: 5px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11.5px; cursor: pointer; }
      .dd-color-none:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); }
      .dd-color-custom { display: flex; align-items: center; gap: 7px; margin-top: 5px; padding: 4px 5px; color: var(--dsw-alias-label-secondary); font-size: 11.5px; cursor: pointer; }
      .dd-color-custom input { width: 22px; height: 22px; padding: 0; border: 0; background: transparent; cursor: pointer; }
      .dd-body { flex: 1; display: flex; min-height: 0; position: relative; }
      .dd-rail { width: 246px; flex: none; display: flex; flex-direction: column; min-height: 0; border-right: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base); }
      .dd-rail-head { display: flex; align-items: center; gap: 6px; padding: 12px 12px 8px; }
      .dd-rail-title { flex: 1; display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; letter-spacing: .055em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); white-space: nowrap; }
      .dd-rail-title svg { color: var(--dsw-alias-label-secondary); }
      .dd-select-sort { width: 88px; height: 24px; font-size: 10.5px; border-color: var(--dsw-alias-border-l1); background-color: var(--dsw-alias-bg-layer-1); }
      .dd-rail-new { flex: none; }
      .dd-search-wrap { position: relative; padding: 0 12px 8px; }
      .dd-search-wrap svg { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: var(--dsw-alias-label-secondary); pointer-events: none; }
      .dd-search { width: 100%; height: 30px; padding: 0 9px 0 29px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 7px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; outline: none; }
      .dd-search:focus { border-color: var(--dsw-alias-brand-primary); }
      .dd-rail-filters { display: flex; align-items: center; gap: 4px; padding: 0 12px 8px; flex-wrap: nowrap; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; }
      .dd-rail-filters::-webkit-scrollbar { display: none; }
      .dd-chip { appearance: none; display: inline-flex; align-items: center; justify-content: center; gap: 3px; flex: none; height: 24px; padding: 0 6px; border: 1px solid transparent; border-radius: 999px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; font-size: 11px; white-space: nowrap; cursor: pointer; }
      .dd-chip:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent); }
      .dd-chip-active { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 11%, transparent); color: var(--dsw-alias-brand-primary); border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent); }
      .dd-doc-list { flex: 1; min-height: 0; overflow: auto; padding: 0 8px 10px; display: flex; flex-direction: column; gap: 2px; }
      .dd-doc-row { position: relative; display: flex; align-items: flex-start; gap: 8px; width: 100%; padding: 8px 7px; border: 1px solid transparent; border-radius: 8px; background: transparent; color: inherit; text-align: left; cursor: pointer; }
      .dd-doc-row:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent); }
      .dd-doc-row-active { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent); border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, transparent); }
      .dd-doc-row-icon { flex: none; width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 7%, transparent); margin-top: 1px; }
      .dd-doc-row-main { min-width: 0; flex: 1; }
      .dd-doc-row-title { display: flex; align-items: center; gap: 4px; font-size: 12.5px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dd-doc-row-meta { display: flex; align-items: center; gap: 4px; min-width: 0; margin-top: 2px; color: var(--dsw-alias-label-secondary); font-size: 10.5px; white-space: nowrap; overflow: hidden; }
      .dd-doc-row-meta span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dd-doc-row-actions { position: absolute; right: 4px; top: 5px; display: none; align-items: center; gap: 0; padding: 1px; border-radius: 6px; background: var(--dsw-alias-bg-layer-1); box-shadow: 0 1px 4px rgba(0,0,0,.12); }
      .dd-doc-row:hover .dd-doc-row-actions, .dd-doc-row:focus-within .dd-doc-row-actions { display: flex; }
      .dd-doc-row-actions .dd-icon-btn { width: 22px; height: 22px; }
      .dd-rail-foot { flex: none; padding: 8px 12px 11px; border-top: 1px solid var(--dsw-alias-border-l1); color: var(--dsw-alias-label-secondary); font-size: 10.5px; display: flex; align-items: center; gap: 5px; }
      .dd-folders { flex: none; max-height: 38%; min-height: 0; display: flex; flex-direction: column; padding: 0 8px 7px; border-bottom: 1px solid var(--dsw-alias-border-l1); }
      .dd-folders-head { flex: none; display: flex; align-items: center; gap: 6px; padding: 1px 4px 4px; }
      .dd-folders-title { flex: 1; font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); }
      .dd-folder-new { width: 24px; height: 24px; }
      .dd-folder-tree { flex: 1; min-height: 0; overflow: auto; display: flex; flex-direction: column; gap: 1px; }
      .dd-folder-row { position: relative; appearance: none; display: flex; align-items: center; gap: 5px; width: 100%; min-height: 27px; padding: 4px 5px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; text-align: left; cursor: pointer; }
      .dd-folder-row:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 5%, transparent); color: var(--dsw-alias-label-primary); }
      .dd-folder-row-active { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent); border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, transparent); color: var(--dsw-alias-label-primary); }
      .dd-folder-row-drop { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 16%, transparent); border-color: var(--dsw-alias-brand-primary); }
      .dd-folder-caret { appearance: none; flex: none; width: 14px; height: 18px; padding: 0; border: 0; background: transparent; color: var(--dsw-alias-label-secondary); display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
      .dd-folder-caret-spacer { width: 14px; flex: none; }
      .dd-folder-icon { flex: none; color: #d5a13b; }
      .dd-folder-row-active .dd-folder-icon { color: var(--dsw-alias-brand-primary); }
      .dd-folder-name { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; }
      .dd-folder-count { flex: none; min-width: 14px; color: var(--dsw-alias-label-secondary); font-size: 9.5px; text-align: right; }
      .dd-folder-menu-button { appearance: none; flex: none; width: 19px; height: 19px; padding: 0; border: 0; border-radius: 4px; background: transparent; color: var(--dsw-alias-label-secondary); display: none; align-items: center; justify-content: center; cursor: pointer; }
      .dd-folder-row:hover .dd-folder-menu-button, .dd-folder-row:focus-within .dd-folder-menu-button, .dd-folder-menu-button[aria-expanded="true"] { display: inline-flex; }
      .dd-folder-menu-button:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent); color: var(--dsw-alias-label-primary); }
      .dd-folder-menu { position: absolute; z-index: 80; right: 3px; top: 25px; min-width: 160px; padding: 4px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; background: var(--dsw-alias-bg-overlay); box-shadow: 0 10px 28px rgba(0,0,0,.22); }
      .dd-folder-menu button { appearance: none; display: flex; align-items: center; gap: 7px; width: 100%; padding: 6px 8px; border: 0; border-radius: 5px; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 11.5px; text-align: left; cursor: pointer; }
      .dd-folder-menu button:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); }
      .dd-folder-menu .dd-menu-danger { color: var(--dsw-alias-label-danger, #d93025); }
      .dd-folder-empty { padding: 5px 7px 7px; color: var(--dsw-alias-label-secondary); font-size: 10.5px; }
      .dd-list-caption { flex: none; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 7px 13px 3px; color: var(--dsw-alias-label-secondary); font-size: 10px; font-weight: 600; letter-spacing: .045em; text-transform: uppercase; }
      .dd-list-caption span:last-child { font-weight: 500; letter-spacing: 0; text-transform: none; }
      .dd-doc-row[draggable="true"] { cursor: grab; }
      .dd-doc-row[draggable="true"]:active { cursor: grabbing; }
      .dd-move-list { display: flex; flex-direction: column; gap: 2px; max-height: 330px; overflow: auto; }
      .dd-move-row { appearance: none; display: flex; align-items: center; gap: 8px; width: 100%; padding: 7px 8px; border: 1px solid transparent; border-radius: 7px; background: transparent; color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; text-align: left; cursor: pointer; }
      .dd-move-row:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent); }
      .dd-move-row-active { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 10%, transparent); border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent); }
      .dd-move-row svg { flex: none; color: #d5a13b; }
      .dd-move-row span { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .dd-main { flex: 1; min-width: 0; display: flex; flex-direction: column; min-height: 0; position: relative; }
      .dd-ruler-bar { flex: none; display: flex; align-items: flex-end; justify-content: center; min-height: 28px; padding: 3px 16px 0; background: var(--dsw-alias-bg-base); border-bottom: 1px solid var(--dsw-alias-border-l1); overflow: hidden; }
      .dd-ruler { position: relative; height: 25px; flex: none; color: var(--dsw-alias-label-secondary); }
      .dd-ruler-track { position: absolute; left: 0; top: 15px; right: 0; height: 7px; border: 1px solid var(--dsw-alias-border-l2); border-radius: 2px; background: var(--dsw-alias-bg-layer-2); overflow: hidden; }
      .dd-ruler-margin { position: absolute; top: 0; bottom: 0; background: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent); }
      .dd-ruler-content { position: absolute; top: 0; bottom: 0; border-left: 1px solid var(--dsw-alias-border-l2); border-right: 1px solid var(--dsw-alias-border-l2); }
      .dd-ruler-tick { position: absolute; top: 12px; bottom: 3px; width: 1px; background: var(--dsw-alias-border-l2); }
      .dd-ruler-tick-major { top: 8px; background: var(--dsw-alias-label-secondary); }
      .dd-ruler-label { position: absolute; top: 0; transform: translateX(-50%); font-size: 8px; color: var(--dsw-alias-label-secondary); }
      .dd-ruler-handle { position: absolute; top: 1px; width: 9px; height: 10px; margin-left: -4px; padding: 0; border: 0; background: var(--dsw-alias-brand-primary); clip-path: polygon(0 0, 100% 0, 50% 100%); cursor: ew-resize; z-index: 2; }
      .dd-canvas { flex: 1; min-height: 0; overflow: auto; padding: 22px 24px 70px; background: color-mix(in srgb, var(--dsw-alias-label-primary) 5.5%, var(--dsw-alias-bg-base)); scrollbar-gutter: stable; }
      .dd-page-holder { display: flex; justify-content: center; min-width: min-content; padding-bottom: 24px; }
      .dd-page { position: relative; flex: none; color: var(--dd-ink); background: var(--dd-page-bg); box-shadow: 0 1px 2px rgba(0,0,0,.12), 0 4px 14px rgba(0,0,0,.10); transform-origin: top center; }
      .dd-page-header, .dd-page-footer { position: absolute; color: var(--dd-muted); font-size: 10.5px; line-height: 16px; z-index: 1; }
      .dd-page-header input, .dd-page-footer input { width: 100%; padding: 2px 4px; border: 1px solid transparent; border-radius: 3px; background: transparent; color: inherit; font: inherit; text-align: left; outline: none; }
      .dd-page-header input:hover, .dd-page-footer input:hover { border-color: rgba(0,0,0,.12); }
      .dd-page-header input:focus, .dd-page-footer input:focus { border-color: #1a73e8; background: rgba(26,115,232,.04); }
      .dd-page-header input::placeholder, .dd-page-footer input::placeholder { color: #9aa0a6; }
      .dd-editor { outline: none; min-height: 100%; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.55; color: var(--dd-ink); overflow-wrap: break-word; }
      .dd-editor:focus { outline: none; }
      .dd-editor p { margin: 0 0 10px; }
      .dd-editor h1 { margin: 20px 0 8px; font-size: 28px; line-height: 1.25; font-weight: 600; }
      .dd-editor h2 { margin: 18px 0 7px; font-size: 22px; line-height: 1.3; font-weight: 600; }
      .dd-editor h3 { margin: 16px 0 6px; font-size: 18px; line-height: 1.35; font-weight: 600; }
      .dd-editor h4 { margin: 14px 0 5px; font-size: 16px; line-height: 1.4; font-weight: 600; }
      .dd-editor h5 { margin: 12px 0 4px; font-size: 14px; line-height: 1.4; font-weight: 600; }
      .dd-editor h6 { margin: 12px 0 4px; font-size: 12px; line-height: 1.4; font-weight: 600; }
      .dd-editor .doc-title { margin: 0 0 16px; font-size: 38px; line-height: 1.12; font-weight: 400; letter-spacing: -.02em; }
      .dd-editor .doc-subtitle { margin: 0 0 18px; font-size: 24px; line-height: 1.25; font-weight: 400; color: #5f6368; }
      .dd-editor blockquote { margin: 10px 0 14px; padding: 2px 0 2px 15px; border-left: 4px solid #dadce0; color: #3c4043; }
      .dd-editor pre { margin: 10px 0 14px; padding: 10px 12px; border-radius: 5px; background: #f1f3f4; font-family: "Courier New", monospace; font-size: 13px; line-height: 1.45; white-space: pre-wrap; }
      .dd-editor code { font-family: "Courier New", monospace; font-size: .92em; background: #f1f3f4; padding: 1px 3px; border-radius: 3px; }
      .dd-editor a { color: #1a73e8; text-decoration: underline; }
      .dd-editor img { max-width: 100%; height: auto; vertical-align: middle; }
      .dd-editor hr { border: 0; border-top: 1px solid #dadce0; margin: 16px 0; }
      .dd-editor hr.doc-page-break { border-top: 1px dashed #9aa0a6; margin: 20px 0; page-break-after: always; }
      .dd-editor table.doc-table { width: 100%; margin: 10px 0 16px; border-collapse: collapse; table-layout: fixed; }
      .dd-editor table.doc-table td, .dd-editor table.doc-table th { min-width: 36px; padding: 6px 8px; border: 1px solid #bdc1c6; vertical-align: top; }
      .dd-editor table.doc-table th { background: #f1f3f4; font-weight: 600; text-align: left; }
      .dd-editor table.doc-table tr:first-child td { background: #f8f9fa; }
      .dd-editor ul, .dd-editor ol { margin: 6px 0 12px; padding-left: 28px; }
      .dd-editor li { margin: 2px 0; }
      .dd-editor ul.doc-checklist { list-style: none; padding-left: 0; }
      .dd-editor ul.doc-checklist li { position: relative; padding-left: 26px; margin: 4px 0; }
      .dd-editor .doc-check { position: absolute; left: 0; top: 5px; width: 14px; height: 14px; border: 2px solid #5f6368; border-radius: 3px; cursor: pointer; background: #fff; }
      .dd-editor li.checked .doc-check { background: #1a73e8; border-color: #1a73e8; }
      .dd-editor li.checked .doc-check::after { content: ""; position: absolute; left: 3px; top: 0; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
      .dd-editor li.checked .doc-check-text { text-decoration: line-through; color: #80868b; }
      .dd-editor ::selection { background: rgba(26,115,232,.22); }
      .dd-editor mark.dd-find-hit { background: #fdd663; color: inherit; }
      .dd-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 28px; text-align: center; }
      .dd-empty-icon { display: inline-flex; align-items: center; justify-content: center; width: 62px; height: 62px; border-radius: 18px; color: var(--dsw-alias-brand-primary); background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, transparent); }
      .dd-empty h2 { margin: 0; font-size: 17px; }
      .dd-empty p { margin: 0 0 8px; max-width: 420px; color: var(--dsw-alias-label-secondary); font-size: 12.5px; line-height: 1.5; }
      .dd-outline { width: 196px; flex: none; display: flex; flex-direction: column; min-height: 0; border-left: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base); }
      .dd-outline-head { display: flex; align-items: center; gap: 6px; padding: 12px 14px 6px; }
      .dd-outline-title { flex: 1; font-size: 10.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--dsw-alias-label-secondary); }
      .dd-outline-list { flex: 1; min-height: 0; overflow: auto; padding: 2px 8px 10px; }
      .dd-outline-item { appearance: none; display: block; width: 100%; padding: 5px 7px; border: 0; border-radius: 5px; background: transparent; color: var(--dsw-alias-label-secondary); font: inherit; text-align: left; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .dd-outline-item:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent); color: var(--dsw-alias-label-primary); }
      .dd-outline-h1 { font-size: 12px; font-weight: 600; color: var(--dsw-alias-label-primary); }
      .dd-outline-h2 { padding-left: 17px; font-size: 11.5px; }
      .dd-outline-h3, .dd-outline-h4, .dd-outline-h5, .dd-outline-h6 { padding-left: 28px; font-size: 11px; }
      .dd-outline-empty { padding: 4px 7px; color: var(--dsw-alias-label-secondary); font-size: 11px; line-height: 1.5; }
      .dd-outline-stats { flex: none; margin: 8px; padding: 10px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); }
      .dd-outline-stats strong { display: block; font-size: 12px; font-weight: 600; margin-bottom: 3px; }
      .dd-outline-stats span { color: var(--dsw-alias-label-secondary); font-size: 10.5px; line-height: 1.5; }
      .dd-status { flex: none; display: flex; align-items: center; gap: 12px; min-height: 27px; padding: 0 14px; border-top: 1px solid var(--dsw-alias-border-l1); background: var(--dsw-alias-bg-base); color: var(--dsw-alias-label-secondary); font-size: 10.5px; }
      .dd-status-spacer { flex: 1; }
      .dd-status-group { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
      .dd-status button { appearance: none; width: 20px; height: 20px; display: inline-flex; align-items: center; justify-content: center; padding: 0; border: 0; border-radius: 4px; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; }
      .dd-status button:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, transparent); color: var(--dsw-alias-label-primary); }
      .dd-table-bar { position: absolute; left: 50%; bottom: 46px; transform: translateX(-50%); display: flex; align-items: center; gap: 3px; padding: 4px 6px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 9px; background: var(--dsw-alias-bg-overlay); box-shadow: 0 8px 24px rgba(0,0,0,.16); z-index: 20; }
      .dd-table-bar .dd-tool { width: 27px; min-width: 27px; height: 27px; }
      .dd-table-bar-label { padding: 0 5px; color: var(--dsw-alias-label-secondary); font-size: 10.5px; white-space: nowrap; }
      .dd-find { position: absolute; top: 10px; right: 16px; width: 320px; padding: 9px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 10px; background: var(--dsw-alias-bg-overlay); box-shadow: 0 12px 34px rgba(0,0,0,.18); z-index: 40; }
      .dd-find-row { display: flex; align-items: center; gap: 5px; }
      .dd-find input { flex: 1; min-width: 0; height: 28px; padding: 0 8px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; outline: none; }
      .dd-find input:focus { border-color: var(--dsw-alias-brand-primary); }
      .dd-find-count { min-width: 54px; padding: 0 3px; color: var(--dsw-alias-label-secondary); font-size: 10.5px; text-align: right; white-space: nowrap; }
      .dd-find-actions { display: flex; align-items: center; justify-content: space-between; gap: 7px; margin-top: 6px; }
      .dd-find-toggle { display: inline-flex; align-items: center; gap: 5px; color: var(--dsw-alias-label-secondary); font-size: 10.5px; }
      .dd-modal-backdrop { position: fixed; inset: 0; z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(18,20,24,.42); backdrop-filter: blur(2px); }
      .dd-modal { max-width: 100%; max-height: calc(100vh - 48px); display: flex; flex-direction: column; border: 1px solid var(--dsw-alias-border-l1); border-radius: 13px; background: var(--dsw-alias-bg-overlay); box-shadow: 0 24px 70px rgba(0,0,0,.32); }
      .dd-modal-head { display: flex; align-items: flex-start; gap: 12px; padding: 15px 16px 8px; }
      .dd-modal-head h2 { margin: 0; font-size: 15px; font-weight: 600; }
      .dd-modal-head p { margin: 3px 0 0; color: var(--dsw-alias-label-secondary); font-size: 11.5px; line-height: 1.45; }
      .dd-modal-head .dd-icon-btn { margin-left: auto; }
      .dd-modal-body { padding: 6px 16px 14px; overflow: auto; }
      .dd-modal-foot { display: flex; align-items: center; justify-content: flex-end; gap: 7px; padding: 10px 16px 14px; border-top: 1px solid var(--dsw-alias-border-l1); }
      .dd-field { display: flex; flex-direction: column; gap: 5px; margin: 8px 0; font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
      .dd-field-label { font-weight: 500; color: var(--dsw-alias-label-primary); }
      .dd-field input[type="text"], .dd-field input[type="url"], .dd-field input[type="number"], .dd-field select { width: 100%; height: 30px; padding: 0 8px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 6px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 12px; outline: none; }
      .dd-field input:focus, .dd-field select:focus { border-color: var(--dsw-alias-brand-primary); }
      .dd-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .dd-field-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
      .dd-field-hint { font-size: 10.5px; line-height: 1.4; }
      .dd-inline-check { display: flex; align-items: center; gap: 7px; margin: 8px 0; color: var(--dsw-alias-label-primary); font-size: 12px; }
      .dd-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 6px 0 2px; }
      .dd-stat { padding: 10px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 8px; background: var(--dsw-alias-bg-layer-1); }
      .dd-stat strong { display: block; font-size: 20px; font-weight: 600; line-height: 1.15; }
      .dd-stat span { color: var(--dsw-alias-label-secondary); font-size: 10.5px; }
      .dd-special-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px; margin-top: 6px; }
      .dd-special { appearance: none; height: 30px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 5px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font-size: 14px; cursor: pointer; }
      .dd-special:hover { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, var(--dsw-alias-bg-layer-1)); border-color: var(--dsw-alias-brand-primary); }
      .dd-shortcut-list { display: flex; flex-direction: column; gap: 2px; }
      .dd-shortcut { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 6px 0; border-bottom: 1px solid var(--dsw-alias-border-l1); font-size: 12px; }
      .dd-shortcut:last-child { border-bottom: 0; }
      .dd-shortcut kbd { padding: 2px 6px; border: 1px solid var(--dsw-alias-border-l1); border-bottom-width: 2px; border-radius: 5px; background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-secondary); font-family: inherit; font-size: 10.5px; }
      .dd-about { font-size: 12px; line-height: 1.55; color: var(--dsw-alias-label-secondary); }
      .dd-toast { position: absolute; left: 50%; bottom: 42px; transform: translateX(-50%); display: flex; align-items: center; gap: 8px; max-width: min(520px, 86%); padding: 8px 9px 8px 11px; border: 1px solid var(--dsw-alias-border-l1); border-radius: 9px; background: var(--dsw-alias-bg-overlay); box-shadow: 0 10px 30px rgba(0,0,0,.18); font-size: 12px; z-index: 90; }
      .dd-toast-error { border-color: color-mix(in srgb, var(--dsw-alias-state-error-primary) 35%, var(--dsw-alias-border-l1)); }
      .dd-toast svg { color: var(--dsw-alias-state-success-primary); flex: none; }
      .dd-toast-error svg { color: var(--dsw-alias-state-error-primary); }
      .dd-toast-close { margin-left: auto; display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; padding: 0; border: 0; border-radius: 4px; background: transparent; color: var(--dsw-alias-label-secondary); cursor: pointer; }
      .dd-toast-close:hover { background: color-mix(in srgb, var(--dsw-alias-label-primary) 8%, transparent); }
      .dd-spinner { width: 18px; height: 18px; border: 2px solid var(--dsw-alias-border-l2); border-top-color: var(--dsw-alias-brand-primary); border-radius: 50%; animation: dd-spin .8s linear infinite; }
      @keyframes dd-spin { to { transform: rotate(360deg); } }
      .dd-loading { flex: 1; display: flex; align-items: center; justify-content: center; gap: 9px; color: var(--dsw-alias-label-secondary); font-size: 12px; }
      .dd-fatal { align-items: center; justify-content: center; gap: 12px; padding: 30px; text-align: center; }
      .dd-fatal h2 { margin: 0; font-size: 16px; }
      .dd-fatal p { margin: 0; max-width: 420px; color: var(--dsw-alias-label-secondary); font-size: 12px; line-height: 1.5; }
      .dd-mobile-scrim { display: none; }
      @media (max-width: 1120px) { .dd-outline { display: none; } }
      @media (max-width: 860px) {
        .dd-rail { position: absolute; top: 0; left: 0; bottom: 0; z-index: 30; width: 280px; box-shadow: 12px 0 34px rgba(0,0,0,.18); }
        .dd-rail-closed { display: none; }
        .dd-mobile-scrim { display: block; position: absolute; inset: 0; z-index: 25; background: rgba(0,0,0,.20); border: 0; }
        .dd-brand-name { display: none; }
        .dd-save-state span { display: none; }
        .dd-canvas { padding: 14px 10px 60px; }
      }
      @media (max-width: 620px) {
        .dd-top { padding-left: 10px; padding-right: 10px; gap: 5px; }
        .dd-title-input { font-size: 13px; }
        .dd-menubar { padding: 0 6px; overflow-x: auto; }
        .dd-toolbar { padding: 4px 6px; }
        .dd-find { left: 8px; right: 8px; width: auto; }
        .dd-status { padding: 0 8px; gap: 7px; }
        .dd-status .dd-status-hide-mobile { display: none; }
      }
      @media print {
        body * { visibility: hidden !important; }
        .dd-root, .dd-root * { visibility: visible !important; }
        .dd-top, .dd-menubar, .dd-toolbar, .dd-rail, .dd-ruler-bar, .dd-status, .dd-outline, .dd-find, .dd-table-bar, .dd-toast, .dd-mobile-scrim { display: none !important; }
        .dd-root, .dd-body, .dd-main, .dd-canvas { display: block !important; height: auto !important; overflow: visible !important; background: #fff !important; padding: 0 !important; margin: 0 !important; }
        .dd-page-holder { display: block !important; padding: 0 !important; }
        .dd-page { box-shadow: none !important; margin: 0 !important; width: 100% !important; min-height: 0 !important; zoom: 1 !important; }
        .dd-page-header, .dd-page-footer { display: block !important; }
        .dd-page-header input, .dd-page-footer input { border: 0 !important; padding: 0 !important; }
        .dd-editor { min-height: 0 !important; font-size: 11pt !important; }
      }
    `

    // ---------------------------------------------------------------------
    // Dialogs
    // ---------------------------------------------------------------------

    function PageSetupDialog({ t, page, onApply, onClose }) {
      const [draft, setDraft] = useState(() => JSON.parse(JSON.stringify(page)))
      const setMargin = (key, value) => {
        const next = Math.max(0.25, Math.min(2.5, Number(value) || 0.25))
        setDraft((previous) => ({ ...previous, margins: { ...previous.margins, [key]: next } }))
      }
      const footer = [
        h('button', { key: 'cancel', type: 'button', className: 'dd-btn', onClick: onClose }, t('cancel')),
        h(
          'button',
          { key: 'apply', type: 'button', className: 'dd-btn dd-btn-primary', onClick: () => onApply(draft) },
          t('apply'),
        ),
      ]
      return h(
        Modal,
        { title: t('pageSetup'), onClose, width: 440, footer },
        h(
          'div',
          { className: 'dd-field-row' },
          h(
            Field,
            { label: t('paper') },
            h(
              'select',
              {
                value: draft.paper,
                onChange: (event) => setDraft((previous) => ({ ...previous, paper: event.target.value })),
              },
              Object.entries(PAPER).map(([key, value]) => h('option', { key, value: key }, value.label)),
            ),
          ),
          h(
            Field,
            { label: t('orientation') },
            h(
              'select',
              {
                value: draft.orientation,
                onChange: (event) => setDraft((previous) => ({ ...previous, orientation: event.target.value })),
              },
              h('option', { value: 'portrait' }, t('portrait')),
              h('option', { value: 'landscape' }, t('landscape')),
            ),
          ),
        ),
        h(
          'div',
          { className: 'dd-field-label', style: { marginTop: 10 } },
          t('margins') + ' (' + t('inches') + ')',
        ),
        h(
          'div',
          { className: 'dd-field-grid' },
          [
            ['top', t('marginTop')],
            ['right', t('marginRight')],
            ['bottom', t('marginBottom')],
            ['left', t('marginLeft')],
          ].map(([key, label]) =>
            h(
              Field,
              { key, label },
              h('input', {
                type: 'number',
                min: 0.25,
                max: 2.5,
                step: 0.1,
                value: draft.margins[key],
                onChange: (event) => setMargin(key, Number(event.target.value) || 0.25),
              }),
            ),
          ),
        ),
        h(
          'div',
          { className: 'dd-field-row' },
          h(
            Field,
            { label: t('background') },
            h('input', {
              type: 'color',
              value: /^#[0-9a-f]{6}$/i.test(draft.background) ? draft.background : '#ffffff',
              onChange: (event) => setDraft((previous) => ({ ...previous, background: event.target.value })),
              style: { width: '100%', height: 30, padding: 2, border: '1px solid var(--dsw-alias-border-l1)', borderRadius: 6, background: 'var(--dsw-alias-bg-layer-1)' },
            }),
          ),
          h('div', { className: 'dd-field-hint', style: { alignSelf: 'end', paddingBottom: 8 } }, t('offlineHint')),
        ),
      )
    }

    function FolderNameDialog({ t, mode, initialName, onApply, onClose }) {
      const [name, setName] = useState(initialName ?? '')
      const trimmed = name.trim()
      const submit = () => {
        if (trimmed === '') return
        onApply(trimmed)
      }
      const footer = [
        h('button', { key: 'cancel', type: 'button', className: 'dd-btn', onClick: onClose }, t('cancel')),
        h(
          'button',
          { key: 'save', type: 'button', className: 'dd-btn dd-btn-primary', disabled: trimmed === '', onClick: submit },
          mode === 'rename' ? t('rename') : t('save'),
        ),
      ]
      return h(
        Modal,
        {
          title: mode === 'rename' ? t('renameFolder') : t('newFolder'),
          onClose,
          width: 360,
          footer,
        },
        h(
          Field,
          { label: t('folderName') },
          h('input', {
            value: name,
            maxLength: 80,
            autoComplete: 'off',
            placeholder: t('folderName'),
            onChange: (event) => setName(event.target.value),
            onKeyDown: (event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                submit()
              }
            },
          }),
        ),
      )
    }

    function MoveToFolderDialog({ t, folders, doc, onMove, onClose }) {
      const byId = new Map(folders.map((folder) => [folder.id, folder]))
      const pathFor = (folder) => {
        const parts = []
        let cursor = folder
        const seen = new Set()
        while (cursor && !seen.has(cursor.id)) {
          seen.add(cursor.id)
          parts.unshift(cursor.name)
          cursor = cursor.parentId ? byId.get(cursor.parentId) : null
        }
        return parts.join(' / ')
      }
      const ordered = folders
        .slice()
        .sort((a, b) => pathFor(a).localeCompare(pathFor(b)))
      const footer = [
        h('button', { key: 'cancel', type: 'button', className: 'dd-btn', onClick: onClose }, t('cancel')),
      ]
      return h(
        Modal,
        { title: t('moveToFolder'), subtitle: doc?.title ?? '', onClose, width: 400, footer },
        h(
          'div',
          { className: 'dd-move-list' },
          h(
            'button',
            {
              type: 'button',
              className: `dd-move-row${!doc?.folderId ? ' dd-move-row-active' : ''}`,
              onClick: () => onMove(null),
            },
            h(Icon, { name: 'folder', size: 15 }),
            h('span', null, t('unfiled')),
          ),
          ordered.map((folder) =>
            h(
              'button',
              {
                key: folder.id,
                type: 'button',
                className: `dd-move-row${doc?.folderId === folder.id ? ' dd-move-row-active' : ''}`,
                onClick: () => onMove(folder.id),
              },
              h(Icon, { name: 'folder', size: 15 }),
              h('span', null, pathFor(folder)),
            ),
          ),
        ),
      )
    }

    function InsertTableDialog({ t, onInsert, onClose }) {
      const [rows, setRows] = useState(3)
      const [cols, setCols] = useState(3)
      const [header, setHeader] = useState(true)
      const footer = [
        h('button', { key: 'cancel', type: 'button', className: 'dd-btn', onClick: onClose }, t('cancel')),
        h(
          'button',
          {
            key: 'insert',
            type: 'button',
            className: 'dd-btn dd-btn-primary',
            onClick: () => onInsert({ rows: Math.max(1, Math.min(20, Number(rows) || 1)), cols: Math.max(1, Math.min(12, Number(cols) || 1)), header }),
          },
          t('insert'),
        ),
      ]
      return h(
        Modal,
        { title: t('insertTable'), onClose, width: 360, footer },
        h(
          'div',
          { className: 'dd-field-row' },
          h(
            Field,
            { label: t('rows') },
            h('input', { type: 'number', min: 1, max: 20, value: rows, onChange: (event) => setRows(event.target.value) }),
          ),
          h(
            Field,
            { label: t('columns') },
            h('input', { type: 'number', min: 1, max: 12, value: cols, onChange: (event) => setCols(event.target.value) }),
          ),
        ),
        h(
          'label',
          { className: 'dd-inline-check' },
          h('input', { type: 'checkbox', checked: header, onChange: (event) => setHeader(event.target.checked) }),
          t('headerRow'),
        ),
      )
    }

    function InsertImageDialog({ t, onInsert, onUpload, onClose }) {
      const [url, setUrl] = useState('')
      const [alt, setAlt] = useState('')
      const [busy, setBusy] = useState(false)
      const [error, setError] = useState('')
      const inputRef = useRef(null)
      const footer = [
        h('button', { key: 'cancel', type: 'button', className: 'dd-btn', onClick: onClose }, t('cancel')),
        h(
          'button',
          {
            key: 'insert',
            type: 'button',
            className: 'dd-btn dd-btn-primary',
            disabled: busy || url.trim() === '',
            onClick: () => onInsert({ url: url.trim(), alt: alt.trim() }),
          },
          t('insert'),
        ),
      ]
      async function chooseFile(event) {
        const file = event.target.files?.[0]
        event.target.value = ''
        if (!file) return
        setBusy(true)
        setError('')
        try {
          const uploaded = await onUpload(file)
          setUrl(uploaded)
        } catch (err) {
          setError(err?.message ?? t('uploadFailed'))
        } finally {
          setBusy(false)
        }
      }
      return h(
        Modal,
        { title: t('insertImage'), onClose, width: 460, footer },
        h(
          'div',
          { style: { display: 'flex', gap: 8, margin: '6px 0 2px' } },
          h(
            'button',
            { type: 'button', className: 'dd-btn', onClick: () => inputRef.current?.click(), disabled: busy },
            h(Icon, { name: 'upload', size: 15 }),
            busy ? t('reading') : t('uploadImage'),
          ),
          h('input', { ref: inputRef, type: 'file', accept: 'image/png,image/jpeg,image/webp,image/gif', onChange: chooseFile, style: { display: 'none' } }),
          h('span', { className: 'dd-field-hint', style: { alignSelf: 'center' } }, t('imageHint')),
        ),
        h(
          Field,
          { label: t('imageUrl') },
          h('input', { type: 'url', value: url, placeholder: 'https://…', onChange: (event) => setUrl(event.target.value) }),
        ),
        h(
          Field,
          { label: t('imageAlt') },
          h('input', { type: 'text', value: alt, onChange: (event) => setAlt(event.target.value) }),
        ),
        error ? h('div', { className: 'dd-field-hint', style: { color: 'var(--dsw-alias-state-error-primary)' } }, error) : null,
      )
    }

    function InsertLinkDialog({ t, initialText, onInsert, onClose }) {
      const [url, setUrl] = useState('')
      const [text, setText] = useState(initialText ?? '')
      const footer = [
        h('button', { key: 'cancel', type: 'button', className: 'dd-btn', onClick: onClose }, t('cancel')),
        h(
          'button',
          {
            key: 'insert',
            type: 'button',
            className: 'dd-btn dd-btn-primary',
            disabled: url.trim() === '',
            onClick: () => onInsert({ url: url.trim(), text: text.trim() }),
          },
          t('insert'),
        ),
      ]
      return h(
        Modal,
        { title: t('insertLink'), onClose, width: 430, footer },
        h(
          Field,
          { label: t('linkUrl'), hint: t('linkHint') },
          h('input', { type: 'url', value: url, placeholder: 'https://…', onChange: (event) => setUrl(event.target.value) }),
        ),
        h(
          Field,
          { label: t('linkText') },
          h('input', { type: 'text', value: text, onChange: (event) => setText(event.target.value) }),
        ),
      )
    }

    function SpecialCharacterDialog({ t, onPick, onClose }) {
      const chars = ['©', '®', '™', '§', '¶', '†', '‡', '•', '…', '—', '–', '€', '£', '¥', '¢', '°', '±', '×', '÷', '≈', '≠', '≤', '≥', '∞', 'µ', 'Ω', 'π', '√', '∑', '∆', '←', '→', '↑', '↓', '↔', '★', '☆', '✓', '✗', '❤', '☺', '☐', '☑', '©', '“', '”', '‘', '’', '«', '»', '‹', '›', '¡', '¿', 'ç', 'ñ', 'æ', 'œ', 'ß', 'å', 'ø']
      return h(
        Modal,
        { title: t('specialCharacter'), onClose, width: 460 },
        h(
          'div',
          { className: 'dd-special-grid' },
          chars.map((character, index) =>
            h(
              'button',
              {
                key: `${character}-${index}`,
                type: 'button',
                className: 'dd-special',
                onClick: () => onPick(character),
                title: character,
                'aria-label': character,
              },
              character,
            ),
          ),
        ),
      )
    }

    function WordCountDialog({ t, stats, onClose }) {
      return h(
        Modal,
        { title: t('wordCount'), onClose, width: 400 },
        h(
          'div',
          { className: 'dd-stat-grid' },
          h('div', { className: 'dd-stat' }, h('strong', null, stats.words), h('span', null, t('words'))),
          h('div', { className: 'dd-stat' }, h('strong', null, stats.pages), h('span', null, t('pages'))),
          h('div', { className: 'dd-stat' }, h('strong', null, stats.chars), h('span', null, t('characters'))),
          h('div', { className: 'dd-stat' }, h('strong', null, stats.charsNoSpaces), h('span', null, t('charactersNoSpaces'))),
        ),
        h('div', { className: 'dd-field-hint', style: { marginTop: 10 } }, `${stats.paragraphs} ${t('paragraphs').toLowerCase()}`),
      )
    }

    function ShortcutsDialog({ t, onClose }) {
      const shortcuts = [
        ['⌘B / Ctrl+B', t('shortcutBold')],
        ['⌘I / Ctrl+I', t('shortcutItalic')],
        ['⌘U / Ctrl+U', t('shortcutUnderline')],
        ['⌘S / Ctrl+S', t('shortcutSave')],
        ['⌘P / Ctrl+P', t('shortcutPrint')],
        ['⌘F / Ctrl+F', t('shortcutFind')],
        ['⌘K / Ctrl+K', t('shortcutLink')],
        ['⌘⇧C / Ctrl+Shift+C', t('shortcutWordCount')],
        ['⌘⇧7 / Ctrl+Shift+7', t('numberedList')],
        ['⌘⇧8 / Ctrl+Shift+8', t('bulletedList')],
        ['⌘⇧9 / Ctrl+Shift+9', t('checklist')],
      ]
      return h(
        Modal,
        { title: t('keyboardShortcuts'), subtitle: t('shortcutsIntro'), onClose, width: 430 },
        h(
          'div',
          { className: 'dd-shortcut-list' },
          shortcuts.map(([keys, label], index) =>
            h('div', { key: index, className: 'dd-shortcut' }, h('span', null, label), h('kbd', null, keys)),
          ),
        ),
      )
    }

    // ---------------------------------------------------------------------
    // App
    // ---------------------------------------------------------------------

    function DocsApp({ t, locale }) {
      const [documents, setDocuments] = useState([])
      const [folders, setFolders] = useState([])
      const [folderFilter, setFolderFilter] = useState('all')
      const [collapsedFolders, setCollapsedFolders] = useState(() => new Set())
      const [folderMenu, setFolderMenu] = useState(null)
      const [folderDropTarget, setFolderDropTarget] = useState(null)
      const [active, setActive] = useState(null)
      const [title, setTitle] = useState('')
      const [page, setPage] = useState({
        paper: 'a4',
        orientation: 'portrait',
        margins: { top: 1, right: 1, bottom: 1, left: 1 },
        background: '#ffffff',
      })
      const [header, setHeader] = useState('')
      const [footer, setFooter] = useState('')
      const [showHeader, setShowHeader] = useState(false)
      const [showFooter, setShowFooter] = useState(false)
      const [query, setQuery] = useState('')
      const [docFilter, setDocFilter] = useState('all')
      const [sort, setSort] = useState('recent')
      const [loading, setLoading] = useState(true)
      const [opening, setOpening] = useState(false)
      const [saveState, setSaveState] = useState('saved')
      const [lastSaved, setLastSaved] = useState(null)
      const [stats, setStats] = useState({ words: 0, chars: 0, charsNoSpaces: 0, paragraphs: 0, pages: 1 })
      const [outline, setOutline] = useState([])
      const [format, setFormat] = useState(readFormatState(null))
      const [inTable, setInTable] = useState(false)
      const [toast, setToast] = useState(null)
      const [menu, setMenu] = useState(null)
      const [colorMenu, setColorMenu] = useState(null)
      const [paintMode, setPaintMode] = useState(false)
      const [dialog, setDialog] = useState(null)
      const [sidebarOpen, setSidebarOpen] = useState(true)
      const [outlineOpen, setOutlineOpen] = useState(false)
      const [showRuler, setShowRuler] = useState(true)
      const [zoom, setZoom] = useState(() => {
        try {
          return Math.max(50, Math.min(200, Number(window.localStorage.getItem('dsh-docs:zoom')) || 90))
        } catch {
          return 90
        }
      })
      const [findOpen, setFindOpen] = useState(false)
      const [findQuery, setFindQuery] = useState('')
      const [findReplacement, setFindReplacement] = useState('')
      const [findCase, setFindCase] = useState(false)
      const [findIndex, setFindIndex] = useState(0)
      const [findCount, setFindCount] = useState(0)
      const [draggingMargin, setDraggingMargin] = useState(null)
      const [importing, setImporting] = useState(false)

      const rootRef = useRef(null)
      const editorRef = useRef(null)
      const activeRef = useRef(null)
      const metaRef = useRef({})
      const pageRef = useRef(page)
      const dirtyRef = useRef(false)
      const saveTimerRef = useRef(null)
      const saveInFlightRef = useRef(null)
      const pendingSaveRef = useRef(false)
      const savedRangeRef = useRef(null)
      const paintStylesRef = useRef(null)
      const toastTimerRef = useRef(null)
      const pollBusyRef = useRef(false)
      const importInputRef = useRef(null)
      const findInputRef = useRef(null)
      const openingSeqRef = useRef(0)
      const renderSeqRef = useRef(0)

      activeRef.current = active
      pageRef.current = page
      metaRef.current = { title, page, header, footer, showHeader, showFooter }

      const dims = pagePixels(page)
      const inches = dims.width / PAGE_DPI
      const editorMinHeight = Math.max(200, dims.height - (page.margins.top + page.margins.bottom) * PAGE_DPI)
      const pageIsDark = (() => {
        const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(page.background)
        if (!match) return false
        const hex = match[1].length === 3
          ? match[1].split('').map((character) => character + character).join('')
          : match[1]
        const value = parseInt(hex, 16)
        const r = (value >> 16) & 255
        const g = (value >> 8) & 255
        const b = value & 255
        return (r * 0.299 + g * 0.587 + b * 0.114) < 120
      })()
      const pageInk = pageIsDark ? '#f1f3f4' : '#202124'
      const pageMuted = pageIsDark ? '#bdc1c6' : '#5f6368'

      const filteredDocuments = useMemo(() => {
        const needle = query.trim().toLowerCase()
        let next = documents.slice()
        if (folderFilter === 'unfiled') next = next.filter((doc) => !doc.folderId)
        else if (folderFilter !== 'all') next = next.filter((doc) => doc.folderId === folderFilter)
        if (docFilter === 'starred') next = next.filter((doc) => doc.favorite)
        if (needle !== '') {
          next = next.filter((doc) => `${doc.title} ${doc.preview ?? ''}`.toLowerCase().includes(needle))
        }
        next.sort((a, b) => {
          if (sort === 'name') return String(a.title).localeCompare(String(b.title))
          return String(b.updatedAt).localeCompare(String(a.updatedAt))
        })
        return next
      }, [documents, folders, query, docFilter, folderFilter, sort])

      const selectedFolder = folderFilter !== 'all' && folderFilter !== 'unfiled'
        ? folders.find((folder) => folder.id === folderFilter) ?? null
        : null
      const libraryLabel = selectedFolder?.name ?? (folderFilter === 'unfiled'
        ? t('unfiled')
        : docFilter === 'starred' ? t('starred') : t('allDocuments'))

      const saveLabel = saveState === 'saving'
        ? t('saving')
        : saveState === 'dirty'
          ? t('unsaved')
          : saveState === 'error'
            ? t('saveFailed')
            : t('saved')

      function notify(kind, message) {
        setToast({ kind, message })
        if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current)
        toastTimerRef.current = window.setTimeout(() => {
          toastTimerRef.current = null
          setToast(null)
        }, 4200)
      }

      function mergeSummary(summary) {
        if (!summary) return
        setDocuments((previous) => {
          const next = previous.filter((entry) => entry.id !== summary.id)
          next.push(summary)
          next.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
          return next
        })
      }

      function setFolderList(next) {
        if (Array.isArray(next)) setFolders(next)
      }

      function folderChildren(parentId) {
        return folders
          .filter((folder) => (folder.parentId ?? null) === (parentId ?? null))
          .sort((a, b) => {
            const order = Number(a.order ?? 0) - Number(b.order ?? 0)
            return order !== 0 ? order : String(a.name).localeCompare(String(b.name))
          })
      }

      function folderDocumentCount(folderId) {
        return documents.filter((doc) => doc.folderId === folderId).length
      }

      function folderDescendantIds(folderId) {
        const found = new Set()
        const queue = [folderId]
        while (queue.length > 0) {
          const current = queue.shift()
          for (const folder of folders) {
            if (folder.parentId === current && !found.has(folder.id)) {
              found.add(folder.id)
              queue.push(folder.id)
            }
          }
        }
        return found
      }

      function toggleFolder(folderId) {
        setCollapsedFolders((previous) => {
          const next = new Set(previous)
          if (next.has(folderId)) next.delete(folderId)
          else next.add(folderId)
          return next
        })
      }

      function chooseLibrary(nextFilter, nextDocFilter = 'all') {
        setFolderFilter(nextFilter)
        setDocFilter(nextDocFilter)
        setFolderMenu(null)
      }

      function openCreateFolder(parentId = null) {
        setFolderMenu(null)
        setDialog({ kind: 'folderName', mode: 'create', parentId, name: '' })
      }

      function openRenameFolder(folder) {
        setFolderMenu(null)
        setDialog({ kind: 'folderName', mode: 'rename', id: folder.id, parentId: folder.parentId ?? null, name: folder.name })
      }

      function openDeleteFolder(folder) {
        setFolderMenu(null)
        setDialog({ kind: 'folderDelete', folder })
      }

      async function createFolder(name, parentId) {
        try {
          const data = await api('/folder/create', {
            method: 'POST',
            body: JSON.stringify({ name, parentId }),
          })
          setFolderList(data.folders)
          if (parentId) {
            setCollapsedFolders((previous) => {
              const next = new Set(previous)
              next.delete(parentId)
              return next
            })
          }
          setDialog(null)
          notify('success', t('folderCreated'))
          return data.folder
        } catch (error) {
          notify('error', error?.message ?? t('saveFailed'))
          return null
        }
      }

      async function renameFolder(id, name) {
        try {
          const data = await api('/folder/rename', {
            method: 'POST',
            body: JSON.stringify({ id, name }),
          })
          setFolderList(data.folders)
          setDialog(null)
          notify('success', t('folderRenamed'))
        } catch (error) {
          notify('error', error?.message ?? t('saveFailed'))
        }
      }

      async function deleteFolder(folder) {
        const removed = new Set([folder.id, ...folderDescendantIds(folder.id)])
        try {
          const data = await api('/folder/delete', {
            method: 'POST',
            body: JSON.stringify({ id: folder.id }),
          })
          setFolderList(data.folders)
          if (Array.isArray(data.documents)) setDocuments(data.documents)
          if (removed.has(folderFilter)) setFolderFilter('all')
          if (activeRef.current?.folderId && removed.has(activeRef.current.folderId)) {
            setActive((previous) => previous ? { ...previous, folderId: null } : previous)
            activeRef.current = { ...activeRef.current, folderId: null }
          }
          setDialog(null)
          notify('success', t('folderDeleted'))
        } catch (error) {
          notify('error', error?.message ?? t('saveFailed'))
        }
      }

      async function moveDocument(doc, folderId) {
        if (!doc) return
        if ((doc.folderId ?? null) === (folderId ?? null)) {
          setDialog(null)
          return
        }
        try {
          const data = await api('/save', {
            method: 'POST',
            body: JSON.stringify({ id: doc.id, document: { folderId } }),
          })
          mergeSummary(data.summary)
          setFolderList(data.folders)
          if (activeRef.current?.id === doc.id) {
            setActive((previous) => previous ? { ...previous, folderId: folderId ?? null } : previous)
            activeRef.current = { ...activeRef.current, folderId: folderId ?? null }
          }
          setFolderDropTarget(null)
          setDialog(null)
          notify('success', t('documentMoved'))
        } catch (error) {
          notify('error', error?.message ?? t('saveFailed'))
        }
      }

      function startDocumentDrag(event, doc) {
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', doc.id)
        event.dataTransfer.setData('application/x-dsh-doc', doc.id)
      }

      function dropDocumentOnFolder(event, folderId) {
        event.preventDefault()
        event.stopPropagation()
        const id = event.dataTransfer.getData('application/x-dsh-doc') || event.dataTransfer.getData('text/plain')
        const doc = documents.find((entry) => entry.id === id)
        setFolderDropTarget(null)
        if (doc) void moveDocument(doc, folderId)
      }

      function isFolderDropTarget(event, targetId) {
        event.preventDefault()
        event.stopPropagation()
        if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
        if (folderDropTarget !== targetId) setFolderDropTarget(targetId)
      }

      function leaveFolderDrop(event, targetId) {
        const related = event.relatedTarget
        if (related instanceof Node && event.currentTarget.contains(related)) return
        if (folderDropTarget === targetId) setFolderDropTarget(null)
      }

      function renderFolderNodes(parentId = null, depth = 0) {
        const nodes = []
        for (const folder of folderChildren(parentId)) {
          const children = folderChildren(folder.id)
          const collapsed = collapsedFolders.has(folder.id)
          const activeFolder = folderFilter === folder.id
          const dropTarget = folderDropTarget === folder.id
          nodes.push(
            h(
              'div',
              {
                key: folder.id,
                className: `dd-folder-row${activeFolder ? ' dd-folder-row-active' : ''}${dropTarget ? ' dd-folder-row-drop' : ''}`,
                style: { paddingLeft: `${5 + depth * 14}px` },
                role: 'button',
                tabIndex: 0,
                'aria-current': activeFolder ? 'true' : undefined,
                'aria-expanded': children.length > 0 ? String(!collapsed) : undefined,
                onClick: () => chooseLibrary(folder.id),
                onKeyDown: (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    chooseLibrary(folder.id)
                  }
                },
                onDragOver: (event) => isFolderDropTarget(event, folder.id),
                onDragLeave: (event) => leaveFolderDrop(event, folder.id),
                onDrop: (event) => dropDocumentOnFolder(event, folder.id),
              },
              children.length > 0
                ? h(
                    'button',
                    {
                      type: 'button',
                      className: 'dd-folder-caret',
                      title: collapsed ? t('expand') : t('collapse'),
                      'aria-label': collapsed ? t('expand') : t('collapse'),
                      onClick: (event) => {
                        event.stopPropagation()
                        toggleFolder(folder.id)
                      },
                    },
                    h(Icon, { name: collapsed ? 'chevronRight' : 'chevronDown', size: 12 }),
                  )
                : h('span', { className: 'dd-folder-caret-spacer' }),
              h(Icon, { name: 'folder', size: 13, className: 'dd-folder-icon' }),
              h('span', { className: 'dd-folder-name' }, folder.name),
              h('span', { className: 'dd-folder-count' }, String(folderDocumentCount(folder.id) || '')),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dd-folder-menu-button',
                  title: t('more'),
                  'aria-label': t('more'),
                  'aria-expanded': folderMenu === folder.id ? 'true' : 'false',
                  'data-folder-menu-button': 'true',
                  onClick: (event) => {
                    event.stopPropagation()
                    setFolderMenu((current) => current === folder.id ? null : folder.id)
                  },
                },
                h(Icon, { name: 'more', size: 13 }),
              ),
              folderMenu === folder.id
                ? h(
                    'div',
                    { className: 'dd-folder-menu', 'data-folder-menu': 'true', role: 'menu' },
                    h(
                      'button',
                      {
                        type: 'button',
                        role: 'menuitem',
                        onClick: (event) => {
                          event.stopPropagation()
                          openCreateFolder(folder.id)
                        },
                      },
                      h(Icon, { name: 'folderPlus', size: 13 }),
                      t('newSubfolder'),
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        role: 'menuitem',
                        onClick: (event) => {
                          event.stopPropagation()
                          openRenameFolder(folder)
                        },
                      },
                      h(Icon, { name: 'edit', size: 13 }),
                      t('renameFolder'),
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        role: 'menuitem',
                        className: 'dd-menu-danger',
                        onClick: (event) => {
                          event.stopPropagation()
                          openDeleteFolder(folder)
                        },
                      },
                      h(Icon, { name: 'trash', size: 13 }),
                      t('deleteFolder'),
                    ),
                  )
                : null,
            ),
          )
          if (!collapsed) nodes.push(...renderFolderNodes(folder.id, depth + 1))
        }
        return nodes
      }

      function updatePage(next) {
        setPage(next)
        pageRef.current = next
        metaRef.current = { ...metaRef.current, page: next }
      }

      function refreshDerived() {
        const editor = editorRef.current
        if (!editor) return
        const currentPage = pageRef.current
        setStats(textStats(editor, pagePixels(currentPage).height, currentPage.margins))
        setOutline(documentOutline(editor))
        if (document.activeElement === editor) setFormat(readFormatState(editor))
      }

      function rememberSelection() {
        const editor = editorRef.current
        const selection = window.getSelection()
        if (!editor || !selection || selection.rangeCount === 0) return
        if (editor === selection.anchorNode || editor.contains(selection.anchorNode)) {
          savedRangeRef.current = selection.getRangeAt(0).cloneRange()
        }
      }

      function restoreSelection() {
        const editor = editorRef.current
        if (!editor) return false
        editor.focus({ preventScroll: true })
        const selection = window.getSelection()
        if (!selection) return false
        const range = savedRangeRef.current
        if (range && editor.contains(range.startContainer) && editor.contains(range.endContainer)) {
          selection.removeAllRanges()
          selection.addRange(range)
          return true
        }
        if (selection.rangeCount === 0) {
          const next = document.createRange()
          next.selectNodeContents(editor)
          next.collapse(false)
          selection.addRange(next)
        }
        return true
      }

      function placeCaretIn(element) {
        const editor = editorRef.current
        if (!editor || !element) return
        editor.focus({ preventScroll: true })
        const range = document.createRange()
        range.selectNodeContents(element)
        range.collapse(true)
        const selection = window.getSelection()
        if (!selection) return
        selection.removeAllRanges()
        selection.addRange(range)
        savedRangeRef.current = range.cloneRange()
      }

      function placeCaretAtEnd(element) {
        const editor = editorRef.current
        if (!editor || !element) return
        editor.focus({ preventScroll: true })
        const range = document.createRange()
        range.selectNodeContents(element)
        range.collapse(false)
        const selection = window.getSelection()
        if (!selection) return
        selection.removeAllRanges()
        selection.addRange(range)
        savedRangeRef.current = range.cloneRange()
      }

      function selectionBlocks() {
        const editor = editorRef.current
        const selection = window.getSelection()
        if (!editor || !selection || selection.rangeCount === 0) return []
        const range = selection.getRangeAt(0)
        const blocks = []
        for (const element of Array.from(editor.querySelectorAll(BLOCK_SELECTOR))) {
          try {
            if (range.intersectsNode(element)) blocks.push(element)
          } catch {
            // A detached range is possible while a command is mid-flight.
          }
        }
        if (blocks.length === 0) {
          const block = closestBlock(selection.anchorNode)
          if (block && editor.contains(block)) blocks.push(block)
        }
        return blocks.filter((element) => !blocks.some((other) => other !== element && other.contains(element)))
      }

      function afterEdit() {
        rememberSelection()
        refreshDerived()
        scheduleSave()
        setFormat(readFormatState(editorRef.current))
      }

      function copyFormat() {
        rememberSelection()
        const editor = editorRef.current
        const selection = window.getSelection()
        if (!editor || !selection || selection.rangeCount === 0) return
        const anchor = selection.anchorNode?.nodeType === Node.ELEMENT_NODE
          ? selection.anchorNode
          : selection.anchorNode?.parentElement
        if (!anchor || !editor.contains(anchor)) return
        const computed = window.getComputedStyle(anchor)
        const block = closestBlock(selection.anchorNode)
        const blockStyle = block ? window.getComputedStyle(block) : null
        const decoration = `${computed.textDecorationLine ?? ''} ${computed.textDecoration ?? ''}`
        paintStylesRef.current = {
          bold: Number(computed.fontWeight) >= 600 || computed.fontWeight === 'bold',
          italic: computed.fontStyle === 'italic',
          underline: decoration.includes('underline'),
          strike: decoration.includes('line-through'),
          fontFamily: computed.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
          fontSize: Math.round(parseFloat(computed.fontSize) || 12),
          color: computed.color,
          highlight: computed.backgroundColor,
          lineHeight: blockStyle?.lineHeight,
          textAlign: blockStyle?.textAlign,
          marginTop: blockStyle?.marginTop,
          marginBottom: blockStyle?.marginBottom,
        }
        setPaintMode(true)
        notify('info', t('paintHint'))
      }

      function applyPaintFormat() {
        const styles = paintStylesRef.current
        const selection = window.getSelection()
        if (!styles || !selection || selection.isCollapsed) return
        restoreSelection()
        try {
          document.execCommand('styleWithCSS', false, true)
          if (styles.bold !== document.queryCommandState('bold')) document.execCommand('bold')
          if (styles.italic !== document.queryCommandState('italic')) document.execCommand('italic')
          if (styles.underline !== document.queryCommandState('underline')) document.execCommand('underline')
          if (styles.strike !== document.queryCommandState('strikeThrough')) document.execCommand('strikeThrough')
          if (styles.fontFamily) document.execCommand('fontName', false, styles.fontFamily)
          if (styles.color) document.execCommand('foreColor', false, styles.color)
          if (styles.highlight && styles.highlight !== 'transparent') document.execCommand('hiliteColor', false, styles.highlight)
        } catch {
          // A collapsed or detached selection is not an error for paint format.
        }
        if (styles.fontSize) applyFontSize(styles.fontSize)
        for (const block of selectionBlocks()) {
          if (styles.lineHeight) block.style.lineHeight = styles.lineHeight
          if (styles.textAlign) block.style.textAlign = styles.textAlign
          if (styles.marginTop) block.style.marginTop = styles.marginTop
          if (styles.marginBottom) block.style.marginBottom = styles.marginBottom
        }
        paintStylesRef.current = null
        setPaintMode(false)
        afterEdit()
        notify('success', t('paintApplied'))
      }

      function exec(command, value) {
        restoreSelection()
        try {
          document.execCommand('styleWithCSS', false, true)
          document.execCommand(command, false, value === undefined ? null : value)
        } catch (error) {
          console.warn('[dsh-docs] command failed', command, error)
        }
        afterEdit()
      }

      function setBlockStyle(kind) {
        restoreSelection()
        const tag = kind === 'normal'
          ? 'p'
          : kind === 'quote'
            ? 'blockquote'
            : kind === 'code'
              ? 'pre'
              : kind === 'title' || kind === 'subtitle'
                ? 'h1'
                : kind
        try {
          document.execCommand('formatBlock', false, `<${tag}>`)
        } catch {
          document.execCommand('formatBlock', false, 'p')
        }
        const selection = window.getSelection()
        const block = closestBlock(selection?.anchorNode ?? null)
        if (block && editorRef.current?.contains(block)) {
          block.classList.remove('doc-title', 'doc-subtitle')
          if (kind === 'title') block.classList.add('doc-title')
          if (kind === 'subtitle') block.classList.add('doc-subtitle')
        }
        afterEdit()
      }

      function applyFontFamily(family) {
        restoreSelection()
        try {
          document.execCommand('styleWithCSS', false, true)
          document.execCommand('fontName', false, family)
        } catch (error) {
          console.warn('[dsh-docs] fontName failed', error)
        }
        afterEdit()
      }

      function applyFontSize(pixels) {
        const editor = editorRef.current
        if (!editor) return
        restoreSelection()
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return
        const range = selection.getRangeAt(0)
        if (range.collapsed) {
          const span = document.createElement('span')
          span.style.fontSize = `${pixels}px`
          span.appendChild(document.createTextNode('\u200b'))
          range.insertNode(span)
          const next = document.createRange()
          next.setStart(span.firstChild, 1)
          next.collapse(true)
          selection.removeAllRanges()
          selection.addRange(next)
          savedRangeRef.current = next.cloneRange()
          afterEdit()
          return
        }
        try {
          document.execCommand('styleWithCSS', false, false)
          document.execCommand('fontSize', false, '7')
          for (const font of Array.from(editor.querySelectorAll('font[size="7"]'))) {
            const span = document.createElement('span')
            span.style.fontSize = `${pixels}px`
            while (font.firstChild) span.appendChild(font.firstChild)
            font.replaceWith(span)
          }
          document.execCommand('styleWithCSS', false, true)
        } catch (error) {
          console.warn('[dsh-docs] fontSize failed', error)
        }
        afterEdit()
      }

      function applyColor(kind, color) {
        restoreSelection()
        try {
          document.execCommand('styleWithCSS', false, true)
          if (kind === 'highlight') {
            if (!document.execCommand('hiliteColor', false, color)) {
              document.execCommand('backColor', false, color)
            }
          } else {
            document.execCommand('foreColor', false, color)
          }
        } catch (error) {
          console.warn('[dsh-docs] color failed', error)
        }
        setColorMenu(null)
        afterEdit()
      }

      function applyBlockStyle(property, value) {
        restoreSelection()
        for (const block of selectionBlocks()) {
          if (property === 'lineHeight') block.style.lineHeight = value
          if (property === 'marginTop') block.style.marginTop = value
          if (property === 'marginBottom') block.style.marginBottom = value
        }
        afterEdit()
      }

      function clearFormatting() {
        restoreSelection()
        try {
          document.execCommand('removeFormat')
          const selection = window.getSelection()
          const block = closestBlock(selection?.anchorNode ?? null)
          if (block && !/^(li|td|th|pre|blockquote)$/i.test(block.tagName)) {
            document.execCommand('formatBlock', false, '<p>')
          }
        } catch {
          // ignore
        }
        afterEdit()
      }

      function transformSelection(kind) {
        restoreSelection()
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return
        const text = selection.toString()
        if (text === '') return
        const next = kind === 'upper'
          ? text.toLocaleUpperCase()
          : kind === 'lower'
            ? text.toLocaleLowerCase()
            : text.toLowerCase().replace(/(^|\s)\S/g, (character) => character.toLocaleUpperCase())
        try {
          document.execCommand('insertText', false, next)
        } catch {
          insertInlineHtml(escapeHtml(next))
        }
        afterEdit()
      }

      function insertBlockHtml(html) {
        const editor = editorRef.current
        if (!editor) return null
        restoreSelection()
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return null
        const range = selection.getRangeAt(0)
        let anchor = closestBlock(range.startContainer)
        while (anchor && anchor.parentElement && anchor.parentElement !== editor && editor.contains(anchor.parentElement)) {
          anchor = anchor.parentElement
        }
        const template = document.createElement('template')
        template.innerHTML = sanitizePasted(html)
        const nodes = Array.from(template.content.childNodes)
        if (nodes.length === 0) return null
        if (anchor && anchor.parentElement === editor) {
          editor.insertBefore(template.content, anchor.nextSibling)
        } else {
          editor.appendChild(template.content)
        }
        const last = nodes[nodes.length - 1]
        if (!last || !last.parentNode) return null
        const spacer = document.createElement('p')
        spacer.innerHTML = '<br>'
        last.parentNode.insertBefore(spacer, last.nextSibling)
        const next = document.createRange()
        next.setStart(spacer, 0)
        next.collapse(true)
        selection.removeAllRanges()
        selection.addRange(next)
        savedRangeRef.current = next.cloneRange()
        return last
      }

      function insertInlineHtml(html) {
        const editor = editorRef.current
        if (!editor) return
        restoreSelection()
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return
        const range = selection.getRangeAt(0)
        range.deleteContents()
        const template = document.createElement('template')
        template.innerHTML = sanitizePasted(html)
        const nodes = Array.from(template.content.childNodes)
        if (nodes.length === 0) return
        const last = nodes[nodes.length - 1]
        range.insertNode(template.content)
        const next = document.createRange()
        next.setStartAfter(last)
        next.collapse(true)
        selection.removeAllRanges()
        selection.addRange(next)
        savedRangeRef.current = next.cloneRange()
      }

      function insertText(text) {
        restoreSelection()
        try {
          document.execCommand('insertText', false, text)
        } catch {
          insertInlineHtml(escapeHtml(text))
        }
        afterEdit()
      }

      function insertTable({ rows, cols, header: withHeader }) {
        const safeRows = Math.max(1, Math.min(20, rows))
        const safeCols = Math.max(1, Math.min(12, cols))
        const headerRow = withHeader
          ? `<thead><tr>${Array.from({ length: safeCols }, () => '<th><br></th>').join('')}</tr></thead>`
          : ''
        const bodyRows = Array.from({ length: safeRows }, () => `<tr>${Array.from({ length: safeCols }, () => '<td><br></td>').join('')}</tr>`).join('')
        const last = insertBlockHtml(`<table class="doc-table">${headerRow}<tbody>${bodyRows}</tbody></table>`)
        const cell = last?.querySelector?.('td,th')
        if (cell) placeCaretIn(cell)
        afterEdit()
      }

      function insertImage({ url, alt }) {
        const nextUrl = normalizeSrc(url)
        if (!safeSrc(nextUrl)) {
          notify('error', t('imageHint'))
          return
        }
        insertInlineHtml(`<img src="${escapeHtml(nextUrl)}" alt="${escapeHtml(alt ?? '')}" style="max-width:100%;height:auto">`)
        afterEdit()
      }

      function insertLink({ url, text }) {
        const nextUrl = normalizeHref(url)
        if (!safeHref(nextUrl)) {
          notify('error', t('linkHint'))
          return
        }
        restoreSelection()
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return
        const range = selection.getRangeAt(0)
        const selected = range.toString()
        if (!range.collapsed && (text === '' || text === selected)) {
          try {
            document.execCommand('createLink', false, nextUrl)
          } catch {
            insertInlineHtml(`<a href="${escapeHtml(nextUrl)}">${escapeHtml(selected)}</a>`)
          }
        } else {
          range.deleteContents()
          const anchor = document.createElement('a')
          anchor.href = nextUrl
          anchor.textContent = text || url
          range.insertNode(anchor)
          const next = document.createRange()
          next.setStartAfter(anchor)
          next.collapse(true)
          selection.removeAllRanges()
          selection.addRange(next)
          savedRangeRef.current = next.cloneRange()
        }
        afterEdit()
      }

      function insertHorizontalLine() {
        insertBlockHtml('<hr>')
        afterEdit()
      }

      function insertPageBreak() {
        insertBlockHtml('<hr class="doc-page-break" contenteditable="false">')
        afterEdit()
      }

      function toggleChecklist() {
        restoreSelection()
        const selection = window.getSelection()
        const item = getClosest(selection?.anchorNode ?? null, 'li')
        const checklist = item?.closest('ul.doc-checklist')
        if (checklist) {
          const parent = checklist.parentNode
          const paragraphs = []
          for (const entry of Array.from(checklist.querySelectorAll('li'))) {
            const paragraph = document.createElement('p')
            const text = entry.querySelector('.doc-check-text')
            paragraph.innerHTML = (text ? text.innerHTML : escapeHtml(entry.textContent ?? '')) || '<br>'
            parent.insertBefore(paragraph, checklist)
            paragraphs.push(paragraph)
          }
          checklist.remove()
          if (paragraphs.length > 0) placeCaretAtEnd(paragraphs[paragraphs.length - 1])
        } else {
          const last = insertBlockHtml('<ul class="doc-checklist"><li><span class="doc-check" contenteditable="false"></span><span class="doc-check-text">' + escapeHtml(t('listItem')) + '</span></li></ul>')
          const text = last?.querySelector?.('.doc-check-text')
          if (text) placeCaretIn(text)
        }
        afterEdit()
      }

      function getClosest(node, selector) {
        if (!node) return null
        const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement
        return element?.closest?.(selector) ?? null
      }

      function deleteTableAction(action) {
        restoreSelection()
        const selection = window.getSelection()
        const cell = getClosest(selection?.anchorNode ?? null, 'td,th')
        const table = cell?.closest('table')
        if (!table) return
        if (action === 'deleteTable') {
          const paragraph = document.createElement('p')
          paragraph.innerHTML = '<br>'
          table.replaceWith(paragraph)
          placeCaretIn(paragraph)
        } else if (action === 'addRow') {
          const row = cell.parentElement
          const clone = row.cloneNode(true)
          clone.querySelectorAll('td,th').forEach((entry) => {
            entry.innerHTML = '<br>'
          })
          row.parentNode.insertBefore(clone, row.nextSibling)
          placeCaretIn(clone.querySelector('td,th') ?? clone)
        } else if (action === 'addColumn') {
          const row = cell.parentElement
          const index = Array.from(row.children).indexOf(cell)
          for (const current of Array.from(table.querySelectorAll('tr'))) {
            const reference = current.children[index]
            const next = document.createElement(reference?.tagName === 'TH' ? 'th' : 'td')
            next.innerHTML = '<br>'
            if (reference) current.insertBefore(next, reference.nextSibling)
            else current.appendChild(next)
          }
          placeCaretIn(cell)
        } else if (action === 'deleteRow') {
          const row = cell.parentElement
          row.remove()
          if (!table.querySelector('tr')) table.remove()
          else placeCaretIn(table.querySelector('td,th') ?? table)
        } else if (action === 'deleteColumn') {
          const row = cell.parentElement
          const index = Array.from(row.children).indexOf(cell)
          for (const current of Array.from(table.querySelectorAll('tr'))) {
            current.children[index]?.remove()
          }
          if (!table.querySelector('td,th')) table.remove()
          else placeCaretIn(table.querySelector('td,th'))
        }
        afterEdit()
        setInTable(Boolean(getClosest(window.getSelection()?.anchorNode ?? null, 'table')))
      }

      function scheduleSave() {
        dirtyRef.current = true
        setSaveState('dirty')
        if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current)
        saveTimerRef.current = window.setTimeout(() => {
          saveTimerRef.current = null
          void persistNow()
        }, 700)
      }

      async function persistNow(force = false) {
        const current = activeRef.current
        const editor = editorRef.current
        if (!current || !editor) return
        if (saveInFlightRef.current) {
          pendingSaveRef.current = true
          return saveInFlightRef.current
        }
        if (!dirtyRef.current && !force) return
        dirtyRef.current = false
        setSaveState('saving')
        const meta = metaRef.current
        const body = {
          id: current.id,
          document: {
            title: (meta.title ?? '').trim() || t('untitled'),
            html: editor.innerHTML,
            text: editor.innerText ?? '',
            page: meta.page,
            header: meta.header ?? '',
            footer: meta.footer ?? '',
            showHeader: meta.showHeader === true,
            showFooter: meta.showFooter === true,
          },
        }
        const task = (async () => {
          try {
            const data = await api('/save', { method: 'POST', body: JSON.stringify(body) })
            const saved = data.document
            setActive((previous) => previous && previous.id === saved.id
              ? {
                  ...previous,
                  title: saved.title,
                  page: saved.page,
                  header: saved.header,
                  footer: saved.footer,
                  showHeader: saved.showHeader,
                  showFooter: saved.showFooter,
                  favorite: saved.favorite,
                  updatedAt: saved.updatedAt,
                  rev: saved.rev,
                }
              : previous)
            activeRef.current = {
              ...(activeRef.current ?? saved),
              title: saved.title,
              page: saved.page,
              header: saved.header,
              footer: saved.footer,
              showHeader: saved.showHeader,
              showFooter: saved.showFooter,
              favorite: saved.favorite,
              updatedAt: saved.updatedAt,
              rev: saved.rev,
            }
            mergeSummary(data.summary)
            setFolderList(data.folders)
            setLastSaved(saved.updatedAt)
            setSaveState('saved')
          } catch (error) {
            dirtyRef.current = true
            setSaveState('error')
            notify('error', error?.message ?? t('saveFailed'))
          } finally {
            saveInFlightRef.current = null
            if (pendingSaveRef.current) {
              pendingSaveRef.current = false
              if (dirtyRef.current) {
                if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current)
                saveTimerRef.current = window.setTimeout(() => {
                  saveTimerRef.current = null
                  void persistNow()
                }, 120)
              }
            }
          }
        })()
        saveInFlightRef.current = task
        return task
      }

      async function flushSave() {
        if (saveTimerRef.current !== null) {
          window.clearTimeout(saveTimerRef.current)
          saveTimerRef.current = null
        }
        if (saveInFlightRef.current) await saveInFlightRef.current
        if (dirtyRef.current) await persistNow(true)
      }

      function loadDocument(doc) {
        const renderSequence = renderSeqRef.current + 1
        renderSeqRef.current = renderSequence
        activeRef.current = doc
        setActive(doc)
        setTitle(doc.title)
        setPage(doc.page)
        pageRef.current = doc.page
        setHeader(doc.header ?? '')
        setFooter(doc.footer ?? '')
        setShowHeader(doc.showHeader === true)
        setShowFooter(doc.showFooter === true)
        metaRef.current = {
          title: doc.title,
          page: doc.page,
          header: doc.header ?? '',
          footer: doc.footer ?? '',
          showHeader: doc.showHeader === true,
          showFooter: doc.showFooter === true,
        }
        dirtyRef.current = false
        setSaveState('saved')
        setLastSaved(doc.updatedAt)
        setDialog(null)
        setMenu(null)
        setColorMenu(null)
        setFindOpen(false)
        setPaintMode(false)
        paintStylesRef.current = null
        setInTable(false)
        requestAnimationFrame(() => {
          if (renderSeqRef.current !== renderSequence) return
          const editor = editorRef.current
          if (!editor) return
          editor.innerHTML = doc.html || '<p><br></p>'
          if (editor.innerHTML.trim() === '') editor.innerHTML = '<p><br></p>'
          refreshDerived()
          setFormat(readFormatState(editor))
        })
      }

      async function openDocument(id, options = {}) {
        if (!id) return
        if (activeRef.current?.id === id && !options.force) return
        if (!options.skipFlush) await flushSave()
        const sequence = openingSeqRef.current + 1
        openingSeqRef.current = sequence
        setOpening(true)
        try {
          const data = await api(`/get?id=${encodeURIComponent(id)}`)
          if (sequence !== openingSeqRef.current) return
          loadDocument(data.document)
          try {
            window.localStorage.setItem('dsh-docs:last', data.document.id)
          } catch {
            // localStorage may be unavailable in restricted embeds
          }
        } catch (error) {
          notify('error', error?.message ?? t('openFailed'))
        } finally {
          if (sequence === openingSeqRef.current) setOpening(false)
        }
      }

      async function newDocument() {
        try {
          await flushSave()
          const data = await api('/create', {
            method: 'POST',
            body: JSON.stringify({
              title: t('untitled'),
              folderId: selectedFolder?.id ?? null,
              html: '<p><br></p>',
              page: {
                paper: 'a4',
                orientation: 'portrait',
                margins: { top: 1, right: 1, bottom: 1, left: 1 },
                background: '#ffffff',
              },
            }),
          })
          mergeSummary(data.summary)
          setFolderList(data.folders)
          await openDocument(data.document.id, { force: true, skipFlush: true })
          notify('success', t('created'))
        } catch (error) {
          notify('error', error?.message ?? t('saveFailed'))
        }
      }

      async function duplicateDocument(doc) {
        try {
          await flushSave()
          const data = await api('/duplicate', { method: 'POST', body: JSON.stringify({ id: doc.id }) })
          mergeSummary(data.summary)
          setFolderList(data.folders)
          await openDocument(data.document.id, { force: true, skipFlush: true })
          notify('success', t('duplicated'))
        } catch (error) {
          notify('error', error?.message ?? t('saveFailed'))
        }
      }

      async function deleteDocument(doc) {
        try {
          const data = await api('/delete', { method: 'POST', body: JSON.stringify({ id: doc.id }) })
          const remaining = Array.isArray(data.documents)
            ? data.documents
            : documents.filter((entry) => entry.id !== doc.id)
          setDocuments(remaining)
          setFolderList(data.folders)
          setDialog(null)
          if (activeRef.current?.id === doc.id) {
            if (remaining[0]) await openDocument(remaining[0].id, { force: true, skipFlush: true })
            else {
              activeRef.current = null
              setActive(null)
              setTitle('')
              if (editorRef.current) editorRef.current.innerHTML = ''
            }
          }
          notify('success', t('deleted'))
        } catch (error) {
          notify('error', error?.message ?? t('saveFailed'))
        }
      }

      async function toggleFavorite(doc) {
        try {
          const data = await api('/save', {
            method: 'POST',
            body: JSON.stringify({ id: doc.id, document: { favorite: !doc.favorite } }),
          })
          mergeSummary(data.summary)
          setFolderList(data.folders)
          if (activeRef.current?.id === doc.id) {
            setActive((previous) => previous ? { ...previous, favorite: !doc.favorite } : previous)
            activeRef.current = { ...activeRef.current, favorite: !doc.favorite }
          }
        } catch (error) {
          notify('error', error?.message ?? t('saveFailed'))
        }
      }

      async function importFile(file) {
        if (!file) return
        const ext = (file.name.split('.').pop() ?? '').toLowerCase()
        if (!['html', 'htm', 'md', 'markdown', 'txt'].includes(ext)) {
          notify('error', t('unsupportedFile'))
          return
        }
        setImporting(true)
        try {
          const text = await file.text()
          const format = ext === 'html' || ext === 'htm' ? 'html' : ext === 'txt' ? 'text' : 'markdown'
          const data = await api('/create', {
            method: 'POST',
            body: JSON.stringify({
              title: file.name.replace(/\.[^.]+$/, ''),
              content: text,
              format,
              page: pageRef.current,
            }),
          })
          if (data.summary) mergeSummary(data.summary)
          await openDocument(data.document.id, { force: true, skipFlush: true })
          notify('success', t('imported', { name: file.name }))
        } catch (error) {
          notify('error', error?.message ?? t('importFailed'))
        } finally {
          setImporting(false)
        }
      }

      async function uploadImage(file) {
        if (!isImageFile(file)) throw new Error(t('imageHint'))
        if (file.size > 8 * 1024 * 1024) throw new Error(t('imageHint'))
        const dataUrl = await readFileAsDataUrl(file)
        const data = await api('/asset', {
          method: 'POST',
          body: JSON.stringify({ dataUrl, name: file.name }),
        })
        return data.asset.url
      }

      async function embedAssetImages(html) {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = html
        for (const image of Array.from(wrapper.querySelectorAll('img'))) {
          const source = image.getAttribute('src') ?? ''
          if (!source.startsWith('/dsh-docs/api/asset')) continue
          try {
            const response = await fetch(source)
            if (!response.ok) continue
            const blob = await response.blob()
            const dataUrl = await new Promise((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => resolve(String(reader.result ?? ''))
              reader.onerror = () => reject(reader.error)
              reader.readAsDataURL(blob)
            })
            image.setAttribute('src', dataUrl)
          } catch {
            // Keep the original URL if the asset cannot be read.
          }
        }
        return wrapper.innerHTML
      }

      async function exportHtml() {
        const editor = editorRef.current
        if (!editor) return
        const body = await embedAssetImages(editor.innerHTML)
        const html = buildStandaloneHtml({
          title: title || t('untitled'),
          body,
          header,
          footer,
          showHeader,
          showFooter,
          page,
        })
        downloadBlob(`${safeFilename(title || t('untitled'))}.html`, new Blob([html], { type: 'text/html;charset=utf-8' }))
        notify('success', t('exported', { name: 'HTML' }))
      }

      function exportMarkdown() {
        const editor = editorRef.current
        if (!editor) return
        downloadBlob(`${safeFilename(title || t('untitled'))}.md`, new Blob([htmlToMarkdown(editor)], { type: 'text/markdown;charset=utf-8' }))
        notify('success', t('exported', { name: 'Markdown' }))
      }

      async function exportWord() {
        const editor = editorRef.current
        if (!editor) return
        const body = await embedAssetImages(editor.innerHTML)
        const html = buildStandaloneHtml({
          title: title || t('untitled'),
          body,
          header,
          footer,
          showHeader,
          showFooter,
          page,
        })
        downloadBlob(`${safeFilename(title || t('untitled'))}.doc`, new Blob([html], { type: 'application/msword;charset=utf-8' }))
        notify('success', t('exported', { name: 'Word' }))
      }

      function exportText() {
        const editor = editorRef.current
        if (!editor) return
        downloadBlob(`${safeFilename(title || t('untitled'))}.txt`, new Blob([editor.innerText ?? ''], { type: 'text/plain;charset=utf-8' }))
        notify('success', t('exported', { name: 'TXT' }))
      }

      async function printDocument() {
        const editor = editorRef.current
        if (!editor) return
        try {
          const body = await embedAssetImages(editor.innerHTML)
          const html = buildStandaloneHtml({
            title: title || t('untitled'),
            body,
            header,
            footer,
            showHeader,
            showFooter,
            page,
          })
          const frame = document.createElement('iframe')
          frame.setAttribute('aria-hidden', 'true')
          frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden'
          document.body.appendChild(frame)
          const frameWindow = frame.contentWindow
          const frameDocument = frame.contentDocument
          if (!frameWindow || !frameDocument) throw new Error('Print frame unavailable')
          frameDocument.open()
          frameDocument.write(html)
          frameDocument.close()
          await new Promise((resolve) => window.setTimeout(resolve, 350))
          const cleanup = () => {
            window.setTimeout(() => frame.remove(), 250)
          }
          frameWindow.addEventListener('afterprint', cleanup, { once: true })
          frameWindow.focus()
          frameWindow.print()
          window.setTimeout(cleanup, 60000)
        } catch {
          window.print()
        }
      }

      function setZoomSafe(value) {
        const next = Math.max(50, Math.min(200, Number(value) || 100))
        setZoom(next)
        try {
          window.localStorage.setItem('dsh-docs:zoom', String(next))
        } catch {
          // ignore
        }
      }

      function openFind() {
        rememberSelection()
        setFindOpen(true)
        setFindIndex(0)
        window.setTimeout(() => findInputRef.current?.focus(), 30)
      }

      function refreshFind() {
        const matches = findTextMatches(editorRef.current, findQuery, findCase)
        setFindCount(matches.length)
        return matches
      }

      function findStep(direction) {
        const matches = refreshFind()
        if (matches.length === 0) return
        const next = ((findIndex + direction) % matches.length + matches.length) % matches.length
        setFindIndex(next)
        selectTextMatch(matches[next])
      }

      function replaceCurrent() {
        const matches = refreshFind()
        if (matches.length === 0) return
        const target = matches[Math.min(findIndex, matches.length - 1)]
        const range = document.createRange()
        range.setStart(target.node, target.start)
        range.setEnd(target.node, target.end)
        range.deleteContents()
        range.insertNode(document.createTextNode(findReplacement))
        scheduleSave()
        refreshDerived()
        refreshFind()
      }

      function replaceAll() {
        const needle = findQuery
        if (needle === '') return
        const pattern = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), findCase ? 'g' : 'gi')
        const editor = editorRef.current
        if (!editor) return
        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, {
          acceptNode(node) {
            if (!node.nodeValue) return NodeFilter.FILTER_REJECT
            if (node.parentElement?.closest('.docs-page-break,script,style')) return NodeFilter.FILTER_REJECT
            return NodeFilter.FILTER_ACCEPT
          },
        })
        const nodes = []
        let node = walker.nextNode()
        while (node) {
          nodes.push(node)
          node = walker.nextNode()
        }
        let count = 0
        for (const text of nodes) {
          text.nodeValue = text.nodeValue.replace(pattern, () => {
            count += 1
            return findReplacement
          })
        }
        if (count > 0) {
          scheduleSave()
          refreshDerived()
          refreshFind()
          notify('success', t('matchCount', { n: count }))
        } else {
          notify('info', t('noMatches'))
        }
      }

      function toggleHeader() {
        const next = !showHeader
        setShowHeader(next)
        metaRef.current = { ...metaRef.current, showHeader: next }
        scheduleSave()
        window.setTimeout(() => {
          const input = rootRef.current?.querySelector('.dd-page-header input')
          input?.focus?.()
        }, 30)
      }

      function toggleFooter() {
        const next = !showFooter
        setShowFooter(next)
        metaRef.current = { ...metaRef.current, showFooter: next }
        scheduleSave()
        window.setTimeout(() => {
          const input = rootRef.current?.querySelector('.dd-page-footer input')
          input?.focus?.()
        }, 30)
      }

      function handleTitleChange(value) {
        setTitle(value)
        metaRef.current = { ...metaRef.current, title: value }
        scheduleSave()
      }

      function handleHeaderChange(value) {
        setHeader(value)
        metaRef.current = { ...metaRef.current, header: value }
        scheduleSave()
      }

      function handleFooterChange(value) {
        setFooter(value)
        metaRef.current = { ...metaRef.current, footer: value }
        scheduleSave()
      }

      function applyPageSetup(nextPage) {
        updatePage(nextPage)
        setDialog(null)
        scheduleSave()
      }

      function handleEditorInput() {
        dirtyRef.current = true
        setSaveState('dirty')
        scheduleSave()
        refreshDerived()
        setFindIndex(0)
      }

      function handleEditorMouseUp() {
        rememberSelection()
        if (!paintMode) return
        const selection = window.getSelection()
        if (selection && !selection.isCollapsed) applyPaintFormat()
      }

      function handleEditorClick(event) {
        const check = event.target.closest?.('.doc-check')
        if (check) {
          const item = check.closest('li')
          if (item) {
            item.classList.toggle('checked')
            scheduleSave()
            refreshDerived()
          }
          event.preventDefault()
          return
        }
        const link = event.target.closest?.('a')
        if (link && (event.metaKey || event.ctrlKey)) {
          event.preventDefault()
          window.open(link.href, '_blank', 'noopener,noreferrer')
        }
      }

      function handleEditorPaste(event) {
        const clipboard = event.clipboardData
        if (!clipboard) return
        const html = clipboard.getData('text/html')
        if (!html) return
        event.preventDefault()
        const clean = sanitizePasted(html)
        restoreSelection()
        try {
          document.execCommand('insertHTML', false, clean)
        } catch {
          insertInlineHtml(clean)
        }
        afterEdit()
      }

      async function handleEditorDrop(event) {
        const file = event.dataTransfer?.files?.[0]
        if (!file || !isImageFile(file)) return
        event.preventDefault()
        try {
          const url = await uploadImage(file)
          insertImage({ url, alt: file.name })
          notify('success', t('dropImage'))
        } catch (error) {
          notify('error', error?.message ?? t('uploadFailed'))
        }
      }

      function handleEditorDragOver(event) {
        if (event.dataTransfer?.types?.includes('Files')) event.preventDefault()
      }

      function handleEditorKeyDown(event) {
        const mod = event.metaKey || event.ctrlKey
        if (mod && event.key.toLowerCase() === 's') {
          event.preventDefault()
          void persistNow(true)
          return
        }
        if (mod && event.key.toLowerCase() === 'p') {
          event.preventDefault()
          printDocument()
          return
        }
        if (mod && event.key.toLowerCase() === 'f') {
          event.preventDefault()
          openFind()
          return
        }
        if (mod && event.key.toLowerCase() === 'k') {
          event.preventDefault()
          rememberSelection()
          setDialog({ kind: 'link', text: window.getSelection()?.toString() ?? '' })
          return
        }
        if (mod && event.shiftKey && event.key.toLowerCase() === 'c') {
          event.preventDefault()
          setDialog({ kind: 'wordCount' })
          return
        }
        if (mod && event.shiftKey && (event.key === '7' || event.key === '8' || event.key === '9')) {
          event.preventDefault()
          if (event.key === '7') exec('insertOrderedList')
          if (event.key === '8') exec('insertUnorderedList')
          if (event.key === '9') toggleChecklist()
          return
        }
        if (event.key === 'Tab') {
          const selection = window.getSelection()
          const item = getClosest(selection?.anchorNode ?? null, 'li')
          if (item?.closest('ul,ol')) {
            event.preventDefault()
            exec(event.shiftKey ? 'outdent' : 'indent')
          }
        }
        if (event.key === 'Escape') {
          setMenu(null)
          setColorMenu(null)
          setFolderMenu(null)
          setDialog(null)
          setFindOpen(false)
          setPaintMode(false)
          paintStylesRef.current = null
        }
      }

      // -------------------------------------------------------------------
      // Effects
      // -------------------------------------------------------------------

      useEffect(() => {
        let alive = true
        ;(async () => {
          try {
            const data = await api('/list')
            if (!alive) return
            setDocuments(data.documents)
            setFolderList(data.folders)
            let remembered = null
            try {
              remembered = window.localStorage.getItem('dsh-docs:last')
            } catch {
              remembered = null
            }
            const target = data.documents.find((entry) => entry.id === remembered) ?? data.documents[0]
            if (target) await openDocument(target.id, { force: true, skipFlush: true })
          } catch (error) {
            if (alive) notify('error', error?.message ?? t('openFailed'))
          } finally {
            if (alive) setLoading(false)
          }
        })()
        return () => {
          alive = false
        }
      }, [])

      useEffect(() => {
        let alive = true
        const timer = window.setInterval(async () => {
          if (pollBusyRef.current) return
          pollBusyRef.current = true
          try {
            const data = await api('/list')
            if (!alive) return
            setFolderList(data.folders)
            setDocuments((previous) => {
              const next = data.documents.slice()
              if (next.length === previous.length && next.every((entry, index) => entry.id === previous[index]?.id && entry.rev === previous[index]?.rev && entry.title === previous[index]?.title && entry.folderId === previous[index]?.folderId)) {
                return previous
              }
              return next
            })
            const current = activeRef.current
            if (!current) return
            const summary = data.documents.find((entry) => entry.id === current.id)
            if (!summary) return
            const focused = document.activeElement === editorRef.current
            if (summary.rev !== current.rev && !dirtyRef.current && !saveInFlightRef.current && !focused) {
              const response = await api(`/get?id=${encodeURIComponent(current.id)}`)
              if (!alive || activeRef.current?.id !== response.document.id) return
              if (dirtyRef.current) return
              loadDocument(response.document)
            }
          } catch {
            // Polling is best-effort; the next tick retries.
          } finally {
            pollBusyRef.current = false
          }
        }, 2500)
        return () => {
          alive = false
          window.clearInterval(timer)
        }
      }, [])

      useEffect(() => {
        if (!folderMenu) return
        const close = (event) => {
          const target = event.target
          if (target instanceof Element && (target.closest('[data-folder-menu]') || target.closest('[data-folder-menu-button]'))) return
          setFolderMenu(null)
        }
        document.addEventListener('mousedown', close)
        return () => document.removeEventListener('mousedown', close)
      }, [folderMenu])

      useEffect(() => {
        if (folderFilter === 'all' || folderFilter === 'unfiled') return
        if (!folders.some((folder) => folder.id === folderFilter)) setFolderFilter('all')
      }, [folders, folderFilter])

      useEffect(() => {
        const onSelectionChange = () => {
          const editor = editorRef.current
          const selection = window.getSelection()
          if (!editor || !selection || selection.rangeCount === 0) return
          if (document.activeElement !== editor && !editor.contains(document.activeElement)) return
          if (editor === selection.anchorNode || editor.contains(selection.anchorNode)) {
            savedRangeRef.current = selection.getRangeAt(0).cloneRange()
            setFormat(readFormatState(editor))
            setInTable(Boolean(getClosest(selection.anchorNode, 'table')))
          }
        }
        document.addEventListener('selectionchange', onSelectionChange)
        return () => document.removeEventListener('selectionchange', onSelectionChange)
      }, [])

      useEffect(() => {
        if (!locale || typeof locale.subscribe !== 'function') return
        return locale.subscribe(() => setDocuments((previous) => previous.slice()))
      }, [locale])

      useEffect(() => {
        if (!menu && !colorMenu) return
        const onDown = (event) => {
          if (event.target instanceof Element && event.target.closest('.dd-menu-wrap')) return
          setMenu(null)
          setColorMenu(null)
        }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
      }, [menu, colorMenu])

      useEffect(() => {
        if (!findOpen) return
        const matches = findTextMatches(editorRef.current, findQuery, findCase)
        setFindCount(matches.length)
        setFindIndex((previous) => Math.min(previous, Math.max(0, matches.length - 1)))
      }, [findQuery, findCase, findOpen, active?.id, stats.words])

      useEffect(() => {
        if (!findOpen) return
        window.setTimeout(() => findInputRef.current?.focus(), 20)
      }, [findOpen])

      useEffect(() => {
        const onVisibility = () => {
          if (document.visibilityState === 'hidden' && dirtyRef.current) void persistNow()
        }
        document.addEventListener('visibilitychange', onVisibility)
        return () => document.removeEventListener('visibilitychange', onVisibility)
      }, [])

      useEffect(() => {
        return () => {
          if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current)
          if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current)
        }
      }, [])

      useEffect(() => {
        if (!draggingMargin) return
        const onMove = (event) => {
          const delta = (event.clientX - draggingMargin.startX) / (PAGE_DPI * (zoom / 100))
          const nextMargin = Math.max(0.25, Math.min(2.5, draggingMargin.startValue + (draggingMargin.side === 'left' ? delta : -delta)))
          const nextPage = {
            ...draggingMargin.page,
            margins: { ...draggingMargin.page.margins, [draggingMargin.side]: Math.round(nextMargin * 100) / 100 },
          }
          updatePage(nextPage)
        }
        const onUp = () => {
          setDraggingMargin(null)
          scheduleSave()
        }
        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp, { once: true })
        return () => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerup', onUp)
        }
      }, [draggingMargin, zoom])

      // -------------------------------------------------------------------
      // Render
      // -------------------------------------------------------------------

      const rulerWidth = dims.width * (zoom / 100)
      const rulerTicks = []
      const quarterInches = Math.ceil(inches * 4)
      for (let index = 0; index <= quarterInches; index += 1) {
        const x = index * 24 * (zoom / 100)
        const major = index % 4 === 0
        rulerTicks.push({ key: `tick-${index}`, x, major, label: major ? String(index / 4) : '' })
      }

      const styleValue = ['normal', 'title', 'subtitle', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'quote', 'code'].includes(format.style)
        ? format.style
        : 'normal'
      const fontValue = FONTS.includes(format.fontFamily) ? format.fontFamily : 'Arial'
      const sizeValue = nearestSize(format.fontSize)
      const zoomIndex = ZOOM_STEPS.findIndex((step) => step >= zoom)
      const zoomOut = () => setZoomSafe(ZOOM_STEPS[Math.max(0, (zoomIndex === -1 ? ZOOM_STEPS.length - 1 : zoomIndex) - 1)])
      const zoomIn = () => setZoomSafe(ZOOM_STEPS[Math.min(ZOOM_STEPS.length - 1, (zoomIndex === -1 ? 0 : zoomIndex) + 1)])

      const menuItems = (items) =>
        items.map((item, index) =>
          item === 'sep'
            ? h('div', { key: `sep-${index}`, className: 'dd-menu-divider', role: 'separator' })
            : item.section
              ? h('div', { key: `section-${index}`, className: 'dd-menu-section' }, item.section)
              : h(MenuItem, {
                  key: `${item.label}-${index}`,
                  ...item,
                  onClick: () => {
                    setMenu(null)
                    item.action?.()
                  },
                }),
        )

      const fileItems = [
        { label: t('newDocument'), icon: 'plus', action: () => void newDocument() },
        { label: t('makeCopy'), icon: 'copy', disabled: !active, action: () => active && void duplicateDocument(active) },
        { label: t('importFile'), icon: 'upload', disabled: importing, action: () => importInputRef.current?.click() },
        'sep',
        { label: t('downloadHtml'), icon: 'fileDown', action: () => void exportHtml() },
        { label: t('downloadWord'), action: () => void exportWord() },
        { label: t('downloadMarkdown'), action: exportMarkdown },
        { label: t('downloadText'), action: exportText },
        { label: t('print'), shortcut: '⌘P', icon: 'printer', action: printDocument },
        { label: t('pageSetup'), icon: 'settings', action: () => setDialog({ kind: 'page' }) },
        'sep',
        {
          label: t('delete'),
          icon: 'trash',
          danger: true,
          disabled: !active,
          action: () => active && setDialog({ kind: 'delete', doc: active }),
        },
      ]

      const editItems = [
        { label: t('undo'), shortcut: '⌘Z', icon: 'undo', action: () => exec('undo') },
        { label: t('redo'), shortcut: '⇧⌘Z', icon: 'redo', action: () => exec('redo') },
        'sep',
        { label: t('cut'), shortcut: '⌘X', action: () => exec('cut') },
        { label: t('copy'), shortcut: '⌘C', action: () => exec('copy') },
        {
          label: t('selectAll'),
          shortcut: '⌘A',
          action: () => {
            const editor = editorRef.current
            if (!editor) return
            editor.focus()
            const range = document.createRange()
            range.selectNodeContents(editor)
            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            rememberSelection()
          },
        },
        'sep',
        { label: t('findAndReplace'), shortcut: '⌘F', icon: 'find', action: openFind },
        { label: t('clearFormatting'), icon: 'clear', action: clearFormatting },
      ]

      const viewItems = [
        { label: t('showRuler'), checked: showRuler, action: () => setShowRuler((value) => !value) },
        { label: t('showOutline'), checked: outlineOpen, action: () => setOutlineOpen((value) => !value) },
        { label: t('showDocumentList'), checked: sidebarOpen, action: () => setSidebarOpen((value) => !value) },
        'sep',
        { section: t('zoom') },
        ...[50, 75, 100, 125, 150, 200].map((value) => ({
          label: `${value}%`,
          checked: zoom === value,
          action: () => setZoomSafe(value),
        })),
        'sep',
        { label: t('pageSetup'), icon: 'settings', action: () => setDialog({ kind: 'page' }) },
      ]

      const insertItems = [
        { label: t('insertImage'), icon: 'image', action: () => { rememberSelection(); setDialog({ kind: 'image' }) } },
        { label: t('insertLink'), shortcut: '⌘K', icon: 'link', action: () => { rememberSelection(); setDialog({ kind: 'link', text: window.getSelection()?.toString() ?? '' }) } },
        { label: t('insertTable'), icon: 'table', action: () => { rememberSelection(); setDialog({ kind: 'table' }) } },
        'sep',
        { label: t('horizontalLine'), icon: 'minus', action: insertHorizontalLine },
        { label: t('pageBreak'), icon: 'pageBreak', action: insertPageBreak },
        { label: t('specialCharacter'), icon: 'special', action: () => { rememberSelection(); setDialog({ kind: 'special' }) } },
        'sep',
        { label: t('showHeader'), checked: showHeader, icon: 'header', action: toggleHeader },
        { label: t('showFooter'), checked: showFooter, icon: 'footer', action: toggleFooter },
      ]

      const formatItems = [
        { section: t('style') },
        { label: t('normalText'), checked: styleValue === 'normal', action: () => setBlockStyle('normal') },
        { label: t('titleStyle'), checked: styleValue === 'title', action: () => setBlockStyle('title') },
        { label: t('subtitleStyle'), checked: styleValue === 'subtitle', action: () => setBlockStyle('subtitle') },
        { label: t('heading1'), checked: styleValue === 'h1', action: () => setBlockStyle('h1') },
        { label: t('heading2'), checked: styleValue === 'h2', action: () => setBlockStyle('h2') },
        { label: t('heading3'), checked: styleValue === 'h3', action: () => setBlockStyle('h3') },
        'sep',
        { label: t('bold'), shortcut: '⌘B', checked: format.bold, action: () => exec('bold') },
        { label: t('italic'), shortcut: '⌘I', checked: format.italic, action: () => exec('italic') },
        { label: t('underline'), shortcut: '⌘U', checked: format.underline, action: () => exec('underline') },
        { label: t('strikethrough'), checked: format.strikethrough, action: () => exec('strikeThrough') },
        { label: t('superscript'), checked: format.superscript, action: () => exec('superscript') },
        { label: t('subscript'), checked: format.subscript, action: () => exec('subscript') },
        'sep',
        { label: t('alignLeft'), checked: format.align === 'left', action: () => exec('justifyLeft') },
        { label: t('alignCenter'), checked: format.align === 'center', action: () => exec('justifyCenter') },
        { label: t('alignRight'), checked: format.align === 'right', action: () => exec('justifyRight') },
        { label: t('justify'), checked: format.align === 'justify', action: () => exec('justifyFull') },
        'sep',
        { label: t('lineSpacing') + ': ' + t('single'), action: () => applyBlockStyle('lineHeight', '1') },
        { label: t('lineSpacing') + ': ' + t('oneAndHalf'), action: () => applyBlockStyle('lineHeight', '1.5') },
        { label: t('lineSpacing') + ': ' + t('double'), action: () => applyBlockStyle('lineHeight', '2') },
        'sep',
        { section: t('paragraphSpacing') },
        ...[0, 5, 10, 15, 20].map((value) => ({
          label: `${t('spaceBefore')} ${value}`,
          action: () => applyBlockStyle('marginTop', `${value}px`),
        })),
        ...[0, 5, 10, 15, 20].map((value) => ({
          label: `${t('spaceAfter')} ${value}`,
          action: () => applyBlockStyle('marginBottom', `${value}px`),
        })),
        'sep',
        { section: t('capitalization') },
        { label: t('lowercase'), action: () => transformSelection('lower') },
        { label: t('uppercase'), action: () => transformSelection('upper') },
        { label: t('titleCase'), action: () => transformSelection('title') },
        'sep',
        { label: t('clearFormatting'), action: clearFormatting },
      ]

      const toolItems = [
        { label: t('wordCount'), shortcut: '⌘⇧C', icon: 'wordCount', action: () => setDialog({ kind: 'wordCount' }) },
        { label: t('findAndReplace'), shortcut: '⌘F', icon: 'find', action: openFind },
        'sep',
        { label: t('keyboardShortcuts'), icon: 'help', action: () => setDialog({ kind: 'shortcuts' }) },
        { label: t('about'), icon: 'sparkle', action: () => setDialog({ kind: 'about' }) },
      ]

      const helpItems = [
        { label: t('keyboardShortcuts'), icon: 'help', action: () => setDialog({ kind: 'shortcuts' }) },
        { label: t('about'), icon: 'sparkle', action: () => setDialog({ kind: 'about' }) },
      ]

      const menus = [
        { id: 'file', label: t('file'), items: fileItems },
        { id: 'edit', label: t('edit'), items: editItems },
        { id: 'view', label: t('view'), items: viewItems },
        { id: 'insert', label: t('insert'), items: insertItems },
        { id: 'format', label: t('format'), items: formatItems },
        { id: 'tools', label: t('tools'), items: toolItems },
        { id: 'help', label: t('help'), items: helpItems },
      ]

      const pageStyle = {
        width: dims.width,
        minHeight: dims.height,
        paddingTop: page.margins.top * PAGE_DPI,
        paddingRight: page.margins.right * PAGE_DPI,
        paddingBottom: page.margins.bottom * PAGE_DPI,
        paddingLeft: page.margins.left * PAGE_DPI,
        background: page.background,
        color: pageInk,
        zoom: zoom / 100,
      }

      const printCss = `
        @page { size: ${PAPER[page.paper].label} ${page.orientation}; margin: 0; }
        @media print {
          .dd-page {
            width: 100% !important;
            min-height: 0 !important;
            padding: ${page.margins.top}in ${page.margins.right}in ${page.margins.bottom}in ${page.margins.left}in !important;
            background: ${page.background} !important;
          }
          .dd-page-header {
            display: block !important;
            left: ${page.margins.left}in !important;
            right: ${page.margins.right}in !important;
            top: 0.34in !important;
          }
          .dd-page-footer {
            display: block !important;
            left: ${page.margins.left}in !important;
            right: ${page.margins.right}in !important;
            bottom: 0.34in !important;
          }
        }
      `

      return h(
        'div',
        { className: 'dd-root', ref: rootRef },
        h('style', { dangerouslySetInnerHTML: { __html: CSS } }),
        h('style', { dangerouslySetInnerHTML: { __html: printCss } }),
        h('input', {
          ref: importInputRef,
          type: 'file',
          accept: '.html,.htm,.md,.markdown,.txt,text/html,text/markdown,text/plain',
          style: { display: 'none' },
          onChange: (event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (file) void importFile(file)
          },
        }),

        h(
          'div',
          { className: 'dd-top' },
          h(
            'div',
            { className: 'dd-brand' },
            h(DocsGlyph, { size: 18, active: true }),
            h('span', { className: 'dd-brand-name' }, t('title')),
          ),
          h(
            'div',
            { className: 'dd-title-wrap' },
            h('input', {
              className: 'dd-title-input',
              value: title,
              placeholder: t('untitled'),
              'aria-label': t('document'),
              onChange: (event) => handleTitleChange(event.target.value),
              onKeyDown: (event) => {
                if (event.key === 'Enter') event.currentTarget.blur()
              },
              onBlur: () => {
                if (title.trim() === '') handleTitleChange(t('untitled'))
                void persistNow()
              },
            }),
          ),
          h(
            'div',
            { className: 'dd-top-actions' },
            h(
              'span',
              { className: 'dd-save-state', 'data-state': saveState, title: saveLabel },
              h('span', { className: 'dd-save-dot' }),
              h('span', null, saveLabel),
            ),
            h(
              'button',
              { type: 'button', className: 'dd-icon-btn', title: t('newDocument'), 'aria-label': t('newDocument'), onClick: () => void newDocument() },
              h(Icon, { name: 'plus', size: 17 }),
            ),
            h(
              'button',
              { type: 'button', className: 'dd-icon-btn', title: t('print'), 'aria-label': t('print'), onClick: printDocument },
              h(Icon, { name: 'printer', size: 16 }),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dd-icon-btn',
                title: t('showDocumentList'),
                'aria-label': t('showDocumentList'),
                'aria-pressed': sidebarOpen ? 'true' : 'false',
                onClick: () => setSidebarOpen((value) => !value),
              },
              h(Icon, { name: sidebarOpen ? 'panelRight' : 'panelLeft', size: 16 }),
            ),
            h(
              'button',
              {
                type: 'button',
                className: 'dd-icon-btn',
                title: t('showOutline'),
                'aria-label': t('showOutline'),
                'aria-pressed': outlineOpen ? 'true' : 'false',
                onClick: () => setOutlineOpen((value) => !value),
              },
              h(Icon, { name: 'outline', size: 16 }),
            ),
          ),
        ),

        h(
          'div',
          { className: 'dd-menubar' },
          menus.map((entry) =>
            h(
              MenuDropdown,
              {
                key: entry.id,
                id: entry.id,
                label: entry.label,
                open: menu === entry.id,
                onToggle: setMenu,
                onClose: () => setMenu(null),
              },
              menuItems(entry.items),
            ),
          ),
        ),

        h(
          'div',
          { className: `dd-toolbar${colorMenu ? ' dd-toolbar-overflow' : ''}`, role: 'toolbar', 'aria-label': t('formatting') },
          h(ToolButton, { label: t('undo'), icon: 'undo', onClick: () => exec('undo') }),
          h(ToolButton, { label: t('redo'), icon: 'redo', onClick: () => exec('redo') }),
          h(ToolButton, { label: t('paintFormat'), icon: 'paint', active: paintMode, onClick: copyFormat }),
          h(Separator),
          h(
            'select',
            {
              className: 'dd-select dd-select-zoom',
              value: zoom,
              title: t('zoom'),
              'aria-label': t('zoom'),
              onMouseDown: rememberSelection,
              onChange: (event) => setZoomSafe(event.target.value),
            },
            ZOOM_STEPS.map((value) => h('option', { key: value, value }, `${value}%`)),
          ),
          h(Separator),
          h(
            'select',
            {
              className: 'dd-select dd-select-style',
              value: styleValue,
              title: t('style'),
              'aria-label': t('style'),
              onMouseDown: rememberSelection,
              onChange: (event) => setBlockStyle(event.target.value),
            },
            h('option', { value: 'normal' }, t('normalText')),
            h('option', { value: 'title' }, t('titleStyle')),
            h('option', { value: 'subtitle' }, t('subtitleStyle')),
            h('option', { value: 'h1' }, t('heading1')),
            h('option', { value: 'h2' }, t('heading2')),
            h('option', { value: 'h3' }, t('heading3')),
            h('option', { value: 'h4' }, t('heading4')),
            h('option', { value: 'h5' }, t('heading5')),
            h('option', { value: 'h6' }, t('heading6')),
            h('option', { value: 'quote' }, t('quote')),
            h('option', { value: 'code' }, t('codeBlock')),
          ),
          h(
            'select',
            {
              className: 'dd-select dd-select-font',
              value: fontValue,
              title: t('font'),
              'aria-label': t('font'),
              onMouseDown: rememberSelection,
              onChange: (event) => applyFontFamily(event.target.value),
            },
            FONTS.map((font) => h('option', { key: font, value: font }, font)),
          ),
          h(
            'select',
            {
              className: 'dd-select dd-select-size',
              value: sizeValue,
              title: t('fontSize'),
              'aria-label': t('fontSize'),
              onMouseDown: rememberSelection,
              onChange: (event) => applyFontSize(Number(event.target.value)),
            },
            FONT_SIZES.map((size) => h('option', { key: size, value: size }, String(size))),
          ),
          h(ToolButton, {
            label: t('increaseFont'),
            letter: { text: 'A', style: { fontSize: 15 } },
            onClick: () => applyFontSize(Math.min(96, nearestSize(format.fontSize) + 2)),
          }),
          h(ToolButton, {
            label: t('decreaseFont'),
            letter: { text: 'A', style: { fontSize: 11 } },
            onClick: () => applyFontSize(Math.max(8, nearestSize(format.fontSize) - 2)),
          }),
          h(Separator),
          h(ToolButton, { label: t('bold'), letter: { text: 'B', style: { fontWeight: 700 } }, active: format.bold, onClick: () => exec('bold') }),
          h(ToolButton, { label: t('italic'), letter: { text: 'I', style: { fontStyle: 'italic', fontFamily: 'Georgia, serif' } }, active: format.italic, onClick: () => exec('italic') }),
          h(ToolButton, { label: t('underline'), letter: { text: 'U', style: { textDecoration: 'underline' } }, active: format.underline, onClick: () => exec('underline') }),
          h(ToolButton, { label: t('strikethrough'), letter: { text: 'S', style: { textDecoration: 'line-through' } }, active: format.strikethrough, onClick: () => exec('strikeThrough') }),
          h(ToolButton, { label: t('superscript'), letter: { text: 'x²', style: { fontSize: 11 } }, active: format.superscript, onClick: () => exec('superscript') }),
          h(ToolButton, { label: t('subscript'), letter: { text: 'x₂', style: { fontSize: 11 } }, active: format.subscript, onClick: () => exec('subscript') }),
          h(
            'span',
            { className: 'dd-color-tool' },
            h(
              'button',
              {
                type: 'button',
                className: 'dd-color-btn',
                title: t('textColor'),
                'aria-label': t('textColor'),
                onMouseDown: (event) => {
                  event.preventDefault()
                  rememberSelection()
                },
                onClick: () => {
                  rememberSelection()
                  setColorMenu((value) => (value === 'text' ? null : 'text'))
                },
              },
              h('span', { className: 'dd-color-letter' }, 'A'),
              h('span', { className: 'dd-color-bar', style: { background: format.textColor } }),
            ),
            colorMenu === 'text'
              ? h(ColorPopover, {
                  t,
                  title: t('textColor'),
                  colors: TEXT_COLORS,
                  onPick: (color) => applyColor('text', color),
                })
              : null,
          ),
          h(
            'span',
            { className: 'dd-color-tool' },
            h(
              'button',
              {
                type: 'button',
                className: 'dd-color-btn',
                title: t('highlightColor'),
                'aria-label': t('highlightColor'),
                onMouseDown: (event) => {
                  event.preventDefault()
                  rememberSelection()
                },
                onClick: () => {
                  rememberSelection()
                  setColorMenu((value) => (value === 'highlight' ? null : 'highlight'))
                },
              },
              h(Icon, { name: 'palette', size: 15 }),
              h('span', { className: 'dd-color-bar dd-color-bar-highlight', style: { background: format.highlight } }),
            ),
            colorMenu === 'highlight'
              ? h(ColorPopover, {
                  t,
                  title: t('highlightColor'),
                  colors: HIGHLIGHTS,
                  allowNone: true,
                  onPick: (color) => applyColor('highlight', color),
                })
              : null,
          ),
          h(ToolButton, {
            label: t('insertLink'),
            icon: 'link',
            onClick: () => {
              rememberSelection()
              setDialog({ kind: 'link', text: window.getSelection()?.toString() ?? '' })
            },
          }),
          h(ToolButton, {
            label: t('insertImage'),
            icon: 'image',
            onClick: () => {
              rememberSelection()
              setDialog({ kind: 'image' })
            },
          }),
          h(Separator),
          h(ToolButton, { label: t('alignLeft'), icon: 'alignLeft', active: format.align === 'left', onClick: () => exec('justifyLeft') }),
          h(ToolButton, { label: t('alignCenter'), icon: 'alignCenter', active: format.align === 'center', onClick: () => exec('justifyCenter') }),
          h(ToolButton, { label: t('alignRight'), icon: 'alignRight', active: format.align === 'right', onClick: () => exec('justifyRight') }),
          h(ToolButton, { label: t('justify'), icon: 'justify', active: format.align === 'justify', onClick: () => exec('justifyFull') }),
          h(
            'select',
            {
              className: 'dd-select',
              value: '',
              title: t('lineSpacing'),
              'aria-label': t('lineSpacing'),
              onMouseDown: rememberSelection,
              onChange: (event) => {
                if (event.target.value) applyBlockStyle('lineHeight', event.target.value)
                event.target.value = ''
              },
              style: { width: 92 },
            },
            h('option', { value: '' }, t('lineSpacing')),
            h('option', { value: '1' }, t('single')),
            h('option', { value: '1.15' }, t('oneAndHalf')),
            h('option', { value: '1.5' }, '1.5'),
            h('option', { value: '2' }, t('double')),
          ),
          h(ToolButton, { label: t('bulletedList'), icon: 'listBullet', active: format.unordered, onClick: () => exec('insertUnorderedList') }),
          h(ToolButton, { label: t('numberedList'), icon: 'listNumber', active: format.ordered, onClick: () => exec('insertOrderedList') }),
          h(ToolButton, { label: t('checklist'), icon: 'checklist', onClick: toggleChecklist }),
          h(ToolButton, { label: t('decreaseIndent'), icon: 'outdent', onClick: () => exec('outdent') }),
          h(ToolButton, { label: t('increaseIndent'), icon: 'indent', onClick: () => exec('indent') }),
          h(Separator),
          h(ToolButton, { label: t('clearFormatting'), icon: 'clear', onClick: clearFormatting }),
        ),

        h(
          'div',
          { className: 'dd-body' },
          sidebarOpen
            ? h('button', {
                type: 'button',
                className: 'dd-mobile-scrim',
                'aria-label': t('close'),
                onClick: () => setSidebarOpen(false),
              })
            : null,
          sidebarOpen
            ? h(
                'aside',
                { className: 'dd-rail' },
                h(
                  'div',
                  { className: 'dd-rail-head' },
                  h(
                    'span',
                    { className: 'dd-rail-title' },
                    h(Icon, { name: 'document', size: 13 }),
                    t('documents'),
                  ),
                  h(
                    'select',
                    {
                      className: 'dd-select dd-select-sort',
                      value: sort,
                      title: sort === 'recent' ? t('recent') : t('nameAsc'),
                      'aria-label': sort === 'recent' ? t('recent') : t('nameAsc'),
                      onChange: (event) => setSort(event.target.value),
                    },
                    h('option', { value: 'recent' }, t('recent')),
                    h('option', { value: 'name' }, t('nameAsc')),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dd-icon-btn dd-folder-new',
                      title: t('newFolder'),
                      'aria-label': t('newFolder'),
                      onClick: () => openCreateFolder(null),
                    },
                    h(Icon, { name: 'folderPlus', size: 15 }),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dd-icon-btn dd-rail-new',
                      title: t('newDocument'),
                      'aria-label': t('newDocument'),
                      onClick: () => void newDocument(),
                    },
                    h(Icon, { name: 'plus', size: 16 }),
                  ),
                ),
                h(
                  'div',
                  { className: 'dd-search-wrap' },
                  h(Icon, { name: 'search', size: 14 }),
                  h('input', {
                    className: 'dd-search',
                    value: query,
                    placeholder: t('searchDocuments'),
                    'aria-label': t('searchDocuments'),
                    onChange: (event) => setQuery(event.target.value),
                  }),
                ),
                h(
                  'div',
                  { className: 'dd-rail-filters' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: `dd-chip${folderFilter === 'all' && docFilter === 'all' ? ' dd-chip-active' : ''}`,
                      'aria-pressed': folderFilter === 'all' && docFilter === 'all' ? 'true' : 'false',
                      onClick: () => chooseLibrary('all', 'all'),
                    },
                    h(Icon, { name: 'document', size: 12 }),
                    t('allDocuments'),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: `dd-chip${docFilter === 'starred' ? ' dd-chip-active' : ''}`,
                      'aria-pressed': docFilter === 'starred' ? 'true' : 'false',
                      onClick: () => chooseLibrary('all', 'starred'),
                    },
                    h(Icon, { name: 'star', size: 12 }),
                    t('starred'),
                  ),
                ),
                h(
                  'div',
                  { className: 'dd-folders' },
                  h(
                    'div',
                    { className: 'dd-folders-head' },
                    h('span', { className: 'dd-folders-title' }, t('folders')),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'dd-icon-btn dd-folder-new',
                        title: t('newFolder'),
                        'aria-label': t('newFolder'),
                        onClick: () => openCreateFolder(null),
                      },
                      h(Icon, { name: 'folderPlus', size: 14 }),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'dd-folder-tree' },
                    folders.length === 0
                      ? h('div', { className: 'dd-folder-empty' }, t('noFolders'))
                      : renderFolderNodes(null, 0),
                    h(
                      'div',
                      {
                        className: `dd-folder-row dd-unfiled-row${folderFilter === 'unfiled' ? ' dd-folder-row-active' : ''}${folderDropTarget === 'unfiled' ? ' dd-folder-row-drop' : ''}`,
                        role: 'button',
                        tabIndex: 0,
                        'aria-current': folderFilter === 'unfiled' ? 'true' : undefined,
                        onClick: () => chooseLibrary('unfiled'),
                        onKeyDown: (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            chooseLibrary('unfiled')
                          }
                        },
                        onDragOver: (event) => isFolderDropTarget(event, 'unfiled'),
                        onDragLeave: (event) => leaveFolderDrop(event, 'unfiled'),
                        onDrop: (event) => dropDocumentOnFolder(event, null),
                      },
                      h('span', { className: 'dd-folder-caret-spacer' }),
                      h(Icon, { name: 'folder', size: 13, className: 'dd-folder-icon' }),
                      h('span', { className: 'dd-folder-name' }, t('unfiled')),
                      h('span', { className: 'dd-folder-count' }, String(documents.filter((doc) => !doc.folderId).length || '')),
                    ),
                  ),
                ),
                h(
                  'div',
                  { className: 'dd-list-caption' },
                  h('span', null, libraryLabel),
                  h('span', null, String(filteredDocuments.length)),
                ),
                h(
                  'div',
                  { className: 'dd-doc-list' },
                  filteredDocuments.length === 0
                    ? h(
                        'div',
                        { className: 'dd-outline-empty' },
                        query.trim() !== ''
                          ? t('noMatches')
                          : folderFilter !== 'all' ? t('folderEmpty') : t('noDocuments'),
                      )
                    : filteredDocuments.map((doc) =>
                        h(
                          'div',
                          {
                            key: doc.id,
                            className: `dd-doc-row${active?.id === doc.id ? ' dd-doc-row-active' : ''}`,
                            role: 'button',
                            tabIndex: 0,
                            draggable: true,
                            'aria-current': active?.id === doc.id ? 'true' : undefined,
                            onDragStart: (event) => startDocumentDrag(event, doc),
                            onDragEnd: () => setFolderDropTarget(null),
                            onClick: () => void openDocument(doc.id),
                            onKeyDown: (event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                void openDocument(doc.id)
                              }
                            },
                          },
                          h('span', { className: 'dd-doc-row-icon' }, h(Icon, { name: 'document', size: 14 })),
                          h(
                            'div',
                            { className: 'dd-doc-row-main' },
                            h('div', { className: 'dd-doc-row-title' }, doc.title || t('untitled')),
                            h(
                              'div',
                              { className: 'dd-doc-row-meta' },
                              h(Icon, { name: 'clock', size: 10 }),
                              h('span', null, `${formatRelative(doc.updatedAt, t)} · ${doc.words ?? 0} ${t('words').toLowerCase()}`),
                            ),
                          ),
                          h(
                            'div',
                            { className: 'dd-doc-row-actions' },
                            h(
                              'button',
                              {
                                type: 'button',
                                className: 'dd-icon-btn',
                                title: doc.favorite ? t('starred') : t('starred'),
                                'aria-label': t('starred'),
                                onClick: (event) => {
                                  event.stopPropagation()
                                  void toggleFavorite(doc)
                                },
                              },
                              h(Icon, { name: 'star', size: 12, style: doc.favorite ? { color: '#f9ab00' } : null }),
                            ),
                            h(
                              'button',
                              {
                                type: 'button',
                                className: 'dd-icon-btn',
                                title: t('moveToFolder'),
                                'aria-label': t('moveToFolder'),
                                onClick: (event) => {
                                  event.stopPropagation()
                                  setDialog({ kind: 'move', doc })
                                },
                              },
                              h(Icon, { name: 'folder', size: 12 }),
                            ),
                            h(
                              'button',
                              {
                                type: 'button',
                                className: 'dd-icon-btn',
                                title: t('duplicate'),
                                'aria-label': t('duplicate'),
                                onClick: (event) => {
                                  event.stopPropagation()
                                  void duplicateDocument(doc)
                                },
                              },
                              h(Icon, { name: 'copy', size: 12 }),
                            ),
                            h(
                              'button',
                              {
                                type: 'button',
                                className: 'dd-icon-btn',
                                title: t('delete'),
                                'aria-label': t('delete'),
                                onClick: (event) => {
                                  event.stopPropagation()
                                  setDialog({ kind: 'delete', doc })
                                },
                              },
                              h(Icon, { name: 'trash', size: 12 }),
                            ),
                          ),
                        ),
                      ),
                ),
                h(
                  'div',
                  { className: 'dd-rail-foot' },
                  h(Icon, { name: 'clock', size: 13 }),
                  h('span', null, lastSaved ? `${t('saved')} · ${formatRelative(lastSaved, t)}` : t('footerHint')),
                ),
              )
            : null,

          h(
            'main',
            { className: 'dd-main' },
            showRuler && active
              ? h(
                  'div',
                  { className: 'dd-ruler-bar' },
                  h(
                    'div',
                    { className: 'dd-ruler', style: { width: rulerWidth } },
                    h('div', { className: 'dd-ruler-track' }),
                    h('div', {
                      className: 'dd-ruler-margin',
                      style: { left: 0, width: page.margins.left * PAGE_DPI * (zoom / 100) },
                    }),
                    h('div', {
                      className: 'dd-ruler-margin',
                      style: { right: 0, width: page.margins.right * PAGE_DPI * (zoom / 100) },
                    }),
                    h('div', {
                      className: 'dd-ruler-content',
                      style: {
                        left: page.margins.left * PAGE_DPI * (zoom / 100),
                        right: page.margins.right * PAGE_DPI * (zoom / 100),
                      },
                    }),
                    rulerTicks.map((tick) =>
                      h(
                        'span',
                        { key: tick.key },
                        h('span', {
                          className: `dd-ruler-tick${tick.major ? ' dd-ruler-tick-major' : ''}`,
                          style: { left: tick.x },
                        }),
                        tick.major ? h('span', { className: 'dd-ruler-label', style: { left: tick.x } }, tick.label) : null,
                      ),
                    ),
                    h('button', {
                      type: 'button',
                      className: 'dd-ruler-handle',
                      style: { left: page.margins.left * PAGE_DPI * (zoom / 100) },
                      title: t('marginLeft'),
                      'aria-label': t('marginLeft'),
                      onPointerDown: (event) => {
                        event.preventDefault()
                        setDraggingMargin({ side: 'left', startX: event.clientX, startValue: page.margins.left, page })
                      },
                    }),
                    h('button', {
                      type: 'button',
                      className: 'dd-ruler-handle',
                      style: { left: rulerWidth - page.margins.right * PAGE_DPI * (zoom / 100) },
                      title: t('marginRight'),
                      'aria-label': t('marginRight'),
                      onPointerDown: (event) => {
                        event.preventDefault()
                        setDraggingMargin({ side: 'right', startX: event.clientX, startValue: page.margins.right, page })
                      },
                    }),
                  ),
                )
              : null,

            h(
              'div',
              { className: 'dd-canvas' },
              opening
                ? h('div', { className: 'dd-loading' }, h('span', { className: 'dd-spinner' }), t('loading'))
                : active
                  ? h(
                      'div',
                      { className: 'dd-page-holder' },
                      h(
                        'div',
                        {
                          className: 'dd-page',
                          style: pageStyle,
                          onMouseDown: (event) => {
                            if (event.target === event.currentTarget) {
                              placeCaretAtEnd(editorRef.current)
                            }
                          },
                        },
                        showHeader
                          ? h(
                              'div',
                              {
                                className: 'dd-page-header',
                                style: {
                                  left: page.margins.left * PAGE_DPI,
                                  right: page.margins.right * PAGE_DPI,
                                  top: Math.max(10, page.margins.top * PAGE_DPI * 0.32),
                                  color: pageMuted,
                                },
                              },
                              h('input', {
                                value: header,
                                placeholder: t('headerPlaceholder'),
                                'aria-label': t('header'),
                                onChange: (event) => handleHeaderChange(event.target.value),
                              }),
                            )
                          : null,
                        h('div', {
                          ref: editorRef,
                          className: 'dd-editor',
                          contentEditable: true,
                          suppressContentEditableWarning: true,
                          spellCheck: true,
                          role: 'textbox',
                          'aria-multiline': 'true',
                          'aria-label': t('document'),
                          style: { minHeight: editorMinHeight, color: pageInk },
                          onInput: handleEditorInput,
                          onClick: handleEditorClick,
                          onPaste: handleEditorPaste,
                          onKeyDown: handleEditorKeyDown,
                          onDrop: (event) => void handleEditorDrop(event),
                          onDragOver: handleEditorDragOver,
                          onMouseUp: handleEditorMouseUp,
                          onKeyUp: rememberSelection,
                        }),
                        showFooter
                          ? h(
                              'div',
                              {
                                className: 'dd-page-footer',
                                style: {
                                  left: page.margins.left * PAGE_DPI,
                                  right: page.margins.right * PAGE_DPI,
                                  bottom: Math.max(10, page.margins.bottom * PAGE_DPI * 0.32),
                                  color: pageMuted,
                                },
                              },
                              h('input', {
                                value: footer,
                                placeholder: t('footerPlaceholder'),
                                'aria-label': t('footer'),
                                onChange: (event) => handleFooterChange(event.target.value),
                              }),
                            )
                          : null,
                      ),
                    )
                  : loading
                    ? h('div', { className: 'dd-loading' }, h('span', { className: 'dd-spinner' }), t('loading'))
                    : h(
                        'div',
                        { className: 'dd-empty' },
                        h('div', { className: 'dd-empty-icon' }, h(Icon, { name: 'document', size: 28 })),
                        h('h2', null, t('noDocuments')),
                        h('p', null, t('noDocumentsHint')),
                        h(
                          'button',
                          { type: 'button', className: 'dd-btn dd-btn-primary', onClick: () => void newDocument() },
                          h(Icon, { name: 'plus', size: 14 }),
                          t('createFirst'),
                        ),
                      ),
            ),

            active
              ? h(
                  'div',
                  { className: 'dd-status' },
                  h(
                    'span',
                    { className: 'dd-status-group' },
                    h(Icon, { name: 'wordCount', size: 12 }),
                    `${stats.words} ${t('words').toLowerCase()}`,
                  ),
                  h(
                    'span',
                    { className: 'dd-status-group dd-status-hide-mobile' },
                    `${stats.pages} ${t('pages').toLowerCase()}`,
                  ),
                  h('span', { className: 'dd-status-spacer' }),
                  h(
                    'span',
                    { className: 'dd-status-group dd-status-hide-mobile' },
                    saveState === 'saved' ? h(Icon, { name: 'checkCircle', size: 12 }) : null,
                    t('footerHint'),
                  ),
                  h(
                    'span',
                    { className: 'dd-status-group' },
                    h('button', { type: 'button', title: t('zoomOut'), 'aria-label': t('zoomOut'), onClick: zoomOut }, h(Icon, { name: 'zoomOut', size: 12 })),
                    `${zoom}%`,
                    h('button', { type: 'button', title: t('zoomIn'), 'aria-label': t('zoomIn'), onClick: zoomIn }, h(Icon, { name: 'zoomIn', size: 12 })),
                  ),
                )
              : null,

            active && inTable
              ? h(
                  'div',
                  { className: 'dd-table-bar', role: 'toolbar', 'aria-label': t('table') },
                  h('span', { className: 'dd-table-bar-label' }, t('table')),
                  h(ToolButton, { label: t('addRow'), icon: 'arrowDown', onClick: () => deleteTableAction('addRow') }),
                  h(ToolButton, { label: t('addColumn'), icon: 'chevronRight', onClick: () => deleteTableAction('addColumn') }),
                  h(ToolButton, { label: t('deleteRow'), icon: 'minus', onClick: () => deleteTableAction('deleteRow') }),
                  h(ToolButton, { label: t('deleteColumn'), icon: 'minus', onClick: () => deleteTableAction('deleteColumn') }),
                  h(ToolButton, { label: t('deleteTable'), icon: 'trash', onClick: () => deleteTableAction('deleteTable') }),
                )
              : null,

            findOpen
              ? h(
                  'div',
                  { className: 'dd-find', role: 'dialog', 'aria-label': t('findAndReplace') },
                  h(
                    'div',
                    { className: 'dd-find-row' },
                    h('input', {
                      ref: findInputRef,
                      value: findQuery,
                      placeholder: t('find'),
                      'aria-label': t('find'),
                      onChange: (event) => {
                        setFindQuery(event.target.value)
                        setFindIndex(0)
                      },
                      onKeyDown: (event) => {
                        if (event.key === 'Enter') {
                          event.preventDefault()
                          findStep(event.shiftKey ? -1 : 1)
                        }
                      },
                    }),
                    h('span', { className: 'dd-find-count' }, findCount === 0 ? t('noMatches') : t('matchCount', { n: findCount })),
                    h(
                      'button',
                      { type: 'button', className: 'dd-icon-btn', title: t('close'), 'aria-label': t('close'), onClick: () => setFindOpen(false) },
                      h(Icon, { name: 'close', size: 14 }),
                    ),
                  ),
                  h(
                    'div',
                    { className: 'dd-find-row', style: { marginTop: 6 } },
                    h('input', {
                      value: findReplacement,
                      placeholder: t('replace'),
                      'aria-label': t('replace'),
                      onChange: (event) => setFindReplacement(event.target.value),
                    }),
                    h('button', { type: 'button', className: 'dd-btn', onClick: replaceCurrent }, t('replace')),
                    h('button', { type: 'button', className: 'dd-btn', onClick: replaceAll }, t('replaceAll')),
                  ),
                  h(
                    'div',
                    { className: 'dd-find-actions' },
                    h(
                      'label',
                      { className: 'dd-find-toggle' },
                      h('input', { type: 'checkbox', checked: findCase, onChange: (event) => setFindCase(event.target.checked) }),
                      t('caseSensitive'),
                    ),
                    h(
                      'div',
                      { style: { display: 'flex', gap: 2 } },
                      h(
                        'button',
                        { type: 'button', className: 'dd-icon-btn', title: t('findNext'), 'aria-label': t('findNext'), onClick: () => findStep(-1) },
                        h(Icon, { name: 'arrowUp', size: 14 }),
                      ),
                      h(
                        'button',
                        { type: 'button', className: 'dd-icon-btn', title: t('findNext'), 'aria-label': t('findNext'), onClick: () => findStep(1) },
                        h(Icon, { name: 'arrowDown', size: 14 }),
                      ),
                    ),
                  ),
                )
              : null,

            h(Toast, { toast, onClose: () => setToast(null) }),
          ),

          outlineOpen && active
            ? h(
                'aside',
                { className: 'dd-outline' },
                h(
                  'div',
                  { className: 'dd-outline-head' },
                  h('span', { className: 'dd-outline-title' }, t('outline')),
                  h(
                    'button',
                    { type: 'button', className: 'dd-icon-btn', title: t('close'), 'aria-label': t('close'), onClick: () => setOutlineOpen(false) },
                    h(Icon, { name: 'close', size: 13 }),
                  ),
                ),
                h(
                  'div',
                  { className: 'dd-outline-list' },
                  outline.length === 0
                    ? h('div', { className: 'dd-outline-empty' }, t('outlineEmpty'))
                    : outline.map((item) =>
                        h(
                          'button',
                          {
                            key: `${item.index}-${item.tag}-${item.text.slice(0, 12)}`,
                            type: 'button',
                            className: `dd-outline-item dd-outline-${item.tag}`,
                            title: item.text,
                            onClick: () => {
                              const headings = editorRef.current?.querySelectorAll('h1,h2,h3,h4,h5,h6')
                              const heading = headings?.[item.index]
                              heading?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                            },
                          },
                          item.text,
                        ),
                      ),
                ),
                h(
                  'div',
                  { className: 'dd-outline-stats' },
                  h('strong', null, `${stats.words} ${t('words').toLowerCase()}`),
                  h('span', null, `${stats.pages} ${t('pages').toLowerCase()} · ${stats.chars} ${t('characters').toLowerCase()}`),
                ),
              )
            : null,
        ),

        dialog?.kind === 'page'
          ? h(PageSetupDialog, { t, page, onApply: applyPageSetup, onClose: () => setDialog(null) })
          : null,
        dialog?.kind === 'table'
          ? h(InsertTableDialog, {
              t,
              onClose: () => setDialog(null),
              onInsert: (options) => {
                setDialog(null)
                insertTable(options)
              },
            })
          : null,
        dialog?.kind === 'image'
          ? h(InsertImageDialog, {
              t,
              onClose: () => setDialog(null),
              onUpload: uploadImage,
              onInsert: (options) => {
                setDialog(null)
                insertImage(options)
              },
            })
          : null,
        dialog?.kind === 'link'
          ? h(InsertLinkDialog, {
              t,
              initialText: dialog.text ?? '',
              onClose: () => setDialog(null),
              onInsert: (options) => {
                setDialog(null)
                insertLink(options)
              },
            })
          : null,
        dialog?.kind === 'special'
          ? h(SpecialCharacterDialog, {
              t,
              onClose: () => setDialog(null),
              onPick: (character) => {
                setDialog(null)
                insertText(character)
              },
            })
          : null,
        dialog?.kind === 'wordCount' ? h(WordCountDialog, { t, stats, onClose: () => setDialog(null) }) : null,
        dialog?.kind === 'shortcuts' ? h(ShortcutsDialog, { t, onClose: () => setDialog(null) }) : null,
        dialog?.kind === 'about'
          ? h(
              Modal,
              {
                title: t('about'),
                onClose: () => setDialog(null),
                width: 430,
                footer: h('button', { type: 'button', className: 'dd-btn dd-btn-primary', onClick: () => setDialog(null) }, t('ok')),
              },
              h('p', { className: 'dd-about' }, t('aboutBody')),
            )
          : null,
        dialog?.kind === 'folderName'
          ? h(FolderNameDialog, {
              t,
              mode: dialog.mode,
              initialName: dialog.name,
              onClose: () => setDialog(null),
              onApply: (name) => {
                if (dialog.mode === 'rename') void renameFolder(dialog.id, name)
                else void createFolder(name, dialog.parentId)
              },
            })
          : null,
        dialog?.kind === 'folderDelete'
          ? (() => {
              const folder = dialog.folder
              const descendants = folderDescendantIds(folder.id)
              const documentCount = documents.filter((doc) => doc.folderId && (doc.folderId === folder.id || descendants.has(doc.folderId))).length
              return h(
                Modal,
                {
                  title: t('deleteFolder'),
                  onClose: () => setDialog(null),
                  width: 400,
                  footer: [
                    h('button', { key: 'cancel', type: 'button', className: 'dd-btn', onClick: () => setDialog(null) }, t('cancel')),
                    h(
                      'button',
                      {
                        key: 'delete',
                        type: 'button',
                        className: 'dd-btn dd-btn-danger',
                        onClick: () => void deleteFolder(folder),
                      },
                      t('deleteFolder'),
                    ),
                  ],
                },
                h('p', { className: 'dd-about' }, `${t('deleteFolderConfirm')} “${folder.name}”`),
                h('p', { className: 'dd-about', style: { marginTop: 8 } }, t('deleteFolderBody')),
                h(
                  'p',
                  { className: 'dd-field-hint', style: { marginTop: 10 } },
                  `${documentCount} ${t('documents').toLowerCase()} · ${descendants.size} ${t('folders').toLowerCase()}`,
                ),
              )
            })()
          : null,
        dialog?.kind === 'move'
          ? h(MoveToFolderDialog, {
              t,
              folders,
              doc: dialog.doc,
              onClose: () => setDialog(null),
              onMove: (folderId) => void moveDocument(dialog.doc, folderId),
            })
          : null,
        dialog?.kind === 'delete'
          ? h(
              Modal,
              {
                title: t('delete'),
                onClose: () => setDialog(null),
                width: 380,
                footer: [
                  h('button', { key: 'cancel', type: 'button', className: 'dd-btn', onClick: () => setDialog(null) }, t('cancel')),
                  h(
                    'button',
                    {
                      key: 'delete',
                      type: 'button',
                      className: 'dd-btn dd-btn-danger',
                      onClick: () => {
                        if (dialog.doc) void deleteDocument(dialog.doc)
                      },
                    },
                    t('delete'),
                  ),
                ],
              },
              h('p', { className: 'dd-about' }, `${t('deleteConfirm')} “${dialog.doc?.title ?? t('untitled')}”`),
            )
          : null,
      )
    }

    function ErrorBoundary({ t, children }) {
      return h(DocsErrorBoundary, { t }, children)
    }

    class DocsErrorBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { failed: false }
      }
      static getDerivedStateFromError() {
        return { failed: true }
      }
      componentDidCatch(error) {
        console.error('[dsh-docs] panel crashed', error)
      }
      render() {
        if (this.state.failed) {
          return h(
            'div',
            { className: 'dd-root dd-fatal' },
            h(DocsGlyph, { size: 26 }),
            h('h2', null, this.props.t('errorTitle')),
            h('p', null, this.props.t('errorBody')),
          )
        }
        return this.props.children
      }
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { en, pl }), `${NS}: dictionaries`)
      const t = (key, values) => ctx.locale.bind(NS)(key, values)
      ctx.slots.inject('sidebar.panellist', () =>
        ctx.slots.register(
          {
            name: 'sidebar.panellist',
            id: 'dsh-docs',
            order: 31,
            label: () => t('panelLabel'),
            locale: NS,
          },
          DocsGlyph,
        ),
      )
      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: 'dsh-docs',
            label: () => t('title'),
            locale: NS,
          },
          () => h(ErrorBoundary, { t }, h(DocsApp, { t, locale: ctx.locale })),
        ),
      )
    }

    return { inject: ['slots', 'locale'], apply }
  },
})
