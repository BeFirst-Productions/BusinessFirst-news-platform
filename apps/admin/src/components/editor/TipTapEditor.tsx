'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  useEditor, EditorContent, Node, mergeAttributes,
  NodeViewWrapper, ReactNodeViewRenderer,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import { common, createLowlight } from 'lowlight';

import { EditorToolbar } from './EditorToolbar';
import { ImageInsertDialog } from './ImageInsertDialog';

const lowlight = createLowlight(common);

// ══════════════════════════════════════════════════════════════════════════════
// ImageDuo — side-by-side 2-image layout
//
// WHY flat string attrs instead of JSON:
//   • JSON stored in HTML data-attributes gets corrupted by HTML parsers,
//     quote-escaping (&quot;), and Next.js sanitization → images lost on reload.
//   • Simple string attrs (src1, alt1, src2, alt2) serialize to plain
//     data-src1="..." which survives every HTML round-trip perfectly.
//   • DOMOutputSpec spread (...figures) is unreliable in ProseMirror serializer
//     so we build fixed figure children explicitly — no dynamic spreading.
// ══════════════════════════════════════════════════════════════════════════════

const ImageDuoView = ({ node }: any) => {
  const { src1, alt1, src2, alt2 } = node.attrs as {
    src1: string; alt1: string; src2: string; alt2: string;
  };

  if (!src1 && !src2) return <NodeViewWrapper className="image-block image-block--duo my-4" />;

  return (
    <NodeViewWrapper className="image-block image-block--duo my-4" data-drag-handle>
      <div className="image-block__duo">
        {src1 && (
          <figure className="image-block__figure">
            <img src={src1} alt={alt1 || ''} className="image-block__img" />
            {alt1 && <figcaption className="image-block__caption">{alt1}</figcaption>}
          </figure>
        )}
        {src2 && (
          <figure className="image-block__figure">
            <img src={src2} alt={alt2 || ''} className="image-block__img" />
            {alt2 && <figcaption className="image-block__caption">{alt2}</figcaption>}
          </figure>
        )}
      </div>
    </NodeViewWrapper>
  );
};

const ImageDuo = Node.create({
  name: 'imageDuo',
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src1: {
        default: '',
        // Read plain data-src1 attribute — no JSON, no corruption
        parseHTML: (el) => el.getAttribute('data-src1') || '',
        renderHTML: (attrs) => ({ 'data-src1': attrs.src1 || '' }),
      },
      alt1: {
        default: '',
        parseHTML: (el) => el.getAttribute('data-alt1') || '',
        renderHTML: (attrs) => ({ 'data-alt1': attrs.alt1 || '' }),
      },
      src2: {
        default: '',
        parseHTML: (el) => el.getAttribute('data-src2') || '',
        renderHTML: (attrs) => ({ 'data-src2': attrs.src2 || '' }),
      },
      alt2: {
        default: '',
        parseHTML: (el) => el.getAttribute('data-alt2') || '',
        renderHTML: (attrs) => ({ 'data-alt2': attrs.alt2 || '' }),
      },
    };
  },

  parseHTML() {
    // Match the outer div we produce in renderHTML
    return [{ tag: 'div[data-image-duo]' }];
  },

  renderHTML({ HTMLAttributes }) {
    // HTMLAttributes already has data-src1, data-alt1, data-src2, data-alt2
    // merged in from addAttributes.renderHTML above.
    const src1 = HTMLAttributes['data-src1'] || '';
    const alt1 = HTMLAttributes['data-alt1'] || '';
    const src2 = HTMLAttributes['data-src2'] || '';
    const alt2 = HTMLAttributes['data-alt2'] || '';

    // Build figure specs explicitly — NO spread operator (unreliable in ProseMirror serializer)
    const fig1: any = alt1
      ? ['figure', { class: 'image-block__figure' },
          ['img', { src: src1, alt: alt1, class: 'image-block__img' }],
          ['figcaption', { class: 'image-block__caption' }, alt1],
        ]
      : ['figure', { class: 'image-block__figure' },
          ['img', { src: src1, alt: '', class: 'image-block__img' }],
        ];

    const fig2: any = alt2
      ? ['figure', { class: 'image-block__figure' },
          ['img', { src: src2, alt: alt2, class: 'image-block__img' }],
          ['figcaption', { class: 'image-block__caption' }, alt2],
        ]
      : ['figure', { class: 'image-block__figure' },
          ['img', { src: src2, alt: '', class: 'image-block__img' }],
        ];

    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-image-duo': '',
        class: 'image-block image-block--duo',
      }),
      ['div', { class: 'image-block__duo' }, fig1, fig2],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageDuoView);
  },
});

// ─────────────────────────────────────────────────────────────────────────────

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function TipTapEditor({
  content,
  onChange,
  placeholder = 'Start writing your article...',
  minHeight = '520px',
}: TipTapEditorProps) {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'tiptap-link', rel: 'noopener noreferrer' },
      }),
      // Built-in Image → standard <img src="..."> tag, works everywhere
      Image.configure({
        inline: false,
        HTMLAttributes: { class: 'tiptap-img' },
      }),
      // Custom duo node — simple flat string attrs, no JSON
      ImageDuo,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Youtube.configure({
        width: 640,
        height: 480,
        HTMLAttributes: { class: 'tiptap-youtube' },
      }),
      Placeholder.configure({ placeholder, emptyEditorClass: 'is-editor-empty' }),
      CodeBlockLowlight.configure({ lowlight, HTMLAttributes: { class: 'tiptap-code-block' } }),
      Superscript,
      Subscript,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content',
        spellcheck: 'true',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync content from outside — needed when initialData loads on edit page
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const handleInsertImages = useCallback(
    (images: { src: string; alt: string }[], layout: 'single' | 'duo') => {
      if (!editor) return;

      if (layout === 'single' && images[0]) {
        // Standard Image extension — produces <img src="..." alt="..." class="tiptap-img">
        // This is the most reliable format: standard HTML, no custom parsing needed
        editor.chain().focus().setImage({
          src: images[0].src,
          alt: images[0].alt || '',
        }).run();

      } else if (layout === 'duo') {
        // ImageDuo node — flat string attrs survive every HTML round-trip
        editor.chain().focus().insertContent({
          type: 'imageDuo',
          attrs: {
            src1: images[0]?.src || '',
            alt1: images[0]?.alt || '',
            src2: images[1]?.src || '',
            alt2: images[1]?.alt || '',
          },
        }).run();
      }

      setImageDialogOpen(false);
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <div className="tiptap-wrapper">
      <EditorToolbar
        editor={editor}
        onInsertImage={() => setImageDialogOpen(true)}
      />

      <div className="tiptap-body" style={{ minHeight }}>
        <EditorContent editor={editor} />
      </div>

      <ImageInsertDialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        onInsert={handleInsertImages}
      />
    </div>
  );
}
