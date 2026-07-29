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
import { X } from 'lucide-react';
import { common, createLowlight } from 'lowlight';

import { EditorToolbar } from './EditorToolbar';
import { ImageInsertDialog } from './ImageInsertDialog';

const lowlight = createLowlight(common);

// ══════════════════════════════════════════════════════════════════════════════
// ImageDuo — side-by-side 2-image layout
// ══════════════════════════════════════════════════════════════════════════════

const ImageDuoView = ({ node, updateAttributes }: any) => {
  const { src1, alt1, src2, alt2 } = node.attrs as {
    src1: string; alt1: string; src2: string; alt2: string;
  };

  if (!src1 && !src2) return <NodeViewWrapper className="image-block image-block--duo my-4" />;

  return (
    <NodeViewWrapper className="image-block image-block--duo my-4 select-none" data-drag-handle>
      <div className="image-block__duo">
        {src1 && (
          <figure className="image-block__figure flex flex-col items-center">
            <img src={src1} alt={alt1 || ''} className="image-block__img" />
            <div className="flex items-center justify-center gap-1.5 w-full mt-2 group/caption">
              <input
                type="text"
                value={alt1 || ''}
                onChange={(e) => updateAttributes({ alt1: e.target.value })}
                placeholder="Image 1 caption (leave blank to remove)..."
                className="w-full text-center text-xs py-1 px-2.5 rounded border border-transparent hover:border-gray-300 focus:border-primary focus:bg-white text-gray-700 font-medium outline-none transition-all bg-gray-50/80"
              />
              {alt1 && (
                <button
                  type="button"
                  onClick={() => updateAttributes({ alt1: '' })}
                  title="Remove heading/caption"
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </figure>
        )}
        {src2 && (
          <figure className="image-block__figure flex flex-col items-center">
            <img src={src2} alt={alt2 || ''} className="image-block__img" />
            <div className="flex items-center justify-center gap-1.5 w-full mt-2 group/caption">
              <input
                type="text"
                value={alt2 || ''}
                onChange={(e) => updateAttributes({ alt2: e.target.value })}
                placeholder="Image 2 caption (leave blank to remove)..."
                className="w-full text-center text-xs py-1 px-2.5 rounded border border-transparent hover:border-gray-300 focus:border-primary focus:bg-white text-gray-700 font-medium outline-none transition-all bg-gray-50/80"
              />
              {alt2 && (
                <button
                  type="button"
                  onClick={() => updateAttributes({ alt2: '' })}
                  title="Remove heading/caption"
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
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
        parseHTML: (el) =>
          el.getAttribute('data-src1') ||
          el.querySelectorAll('img')[0]?.getAttribute('src') ||
          '',
        renderHTML: (attrs) => ({ 'data-src1': attrs.src1 || '' }),
      },
      alt1: {
        default: '',
        parseHTML: (el) =>
          el.getAttribute('data-alt1') ||
          el.querySelectorAll('img')[0]?.getAttribute('alt') ||
          '',
        renderHTML: (attrs) => ({ 'data-alt1': attrs.alt1 || '' }),
      },
      src2: {
        default: '',
        parseHTML: (el) =>
          el.getAttribute('data-src2') ||
          el.querySelectorAll('img')[1]?.getAttribute('src') ||
          '',
        renderHTML: (attrs) => ({ 'data-src2': attrs.src2 || '' }),
      },
      alt2: {
        default: '',
        parseHTML: (el) =>
          el.getAttribute('data-alt2') ||
          el.querySelectorAll('img')[1]?.getAttribute('alt') ||
          '',
        renderHTML: (attrs) => ({ 'data-alt2': attrs.alt2 || '' }),
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'div[data-image-duo]' },
      { tag: 'div.image-block--duo' },
      { tag: 'div.image-block__duo' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const src1 = HTMLAttributes['data-src1'] || '';
    const alt1 = (HTMLAttributes['data-alt1'] || '').trim();
    const src2 = HTMLAttributes['data-src2'] || '';
    const alt2 = (HTMLAttributes['data-alt2'] || '').trim();

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

// Single Image NodeView with interactive caption editing
const SingleImageView = ({ node, updateAttributes }: any) => {
  const { src, alt } = node.attrs as { src: string; alt: string };

  if (!src) return <NodeViewWrapper className="image-block image-block--single my-4" />;

  return (
    <NodeViewWrapper className="image-block image-block--single my-4 flex flex-col items-center select-none" data-drag-handle>
      <div className="relative group max-w-full">
        <img src={src} alt={alt || ''} className="tiptap-img image-block__img max-h-[500px] object-cover rounded-lg" />
      </div>
      <div className="flex items-center justify-center gap-1.5 w-full max-w-md mt-2 group/caption">
        <input
          type="text"
          value={alt || ''}
          onChange={(e) => updateAttributes({ alt: e.target.value })}
          placeholder="Add caption or image title (leave blank to remove)..."
          className="w-full text-center text-xs py-1 px-2.5 rounded border border-transparent hover:border-gray-300 focus:border-primary focus:bg-white text-gray-700 font-medium outline-none transition-all bg-gray-50/80"
        />
        {alt && (
          <button
            type="button"
            onClick={() => updateAttributes({ alt: '' })}
            title="Remove heading/caption"
            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </NodeViewWrapper>
  );
};

const CustomImage = Image.extend({
  addAttributes() {
    return {
      src: {
        default: '',
        parseHTML: (el) => el.getAttribute('src') || '',
        renderHTML: (attrs) => ({ src: attrs.src || '' }),
      },
      alt: {
        default: '',
        parseHTML: (el) => el.getAttribute('alt') || '',
        renderHTML: (attrs) => ({ alt: attrs.alt || '' }),
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'img[src]' },
      { tag: 'figure img[src]' },
      { tag: 'div.image-block--single img[src]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const src = HTMLAttributes.src || '';
    const alt = (HTMLAttributes.alt || '').trim();

    if (alt) {
      return [
        'figure',
        { class: 'image-block__figure image-block--single my-4' },
        ['img', { src, alt, class: 'tiptap-img image-block__img' }],
        ['figcaption', { class: 'image-block__caption' }, alt],
      ];
    }

    return [
      'figure',
      { class: 'image-block__figure image-block--single my-4' },
      ['img', { src, alt: '', class: 'tiptap-img image-block__img' }],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SingleImageView);
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
      // Custom single Image extension with inline/figure parseHTML support
      CustomImage,
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
    if (editor && !editor.isDestroyed && content !== undefined) {
      const currentHTML = editor.getHTML();
      if (currentHTML !== content) {
        editor.commands.setContent(content, false);
      }
    }
  }, [editor, content]);

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
