'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import { cn } from '@/lib/utils';
import {
  Bold, Italic, Underline, Strikethrough, Code, Code2,
  List, ListOrdered, Quote, Undo, Redo,
  Image as ImageIcon, Link as LinkIcon, Table as TableIcon,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Minus, Superscript, Subscript,
  Youtube as YoutubeIcon, ChevronDown, Type, Palette,
  Unlink, CornerUpLeft,
} from 'lucide-react';
import { TooltipWrapper } from '@/components/ui/Tooltip';

// ── Types ─────────────────────────────────────────────────────────────────────
interface EditorToolbarProps {
  editor: Editor;
  onInsertImage: () => void;
}

// ── Toolbar Button ────────────────────────────────────────────────────────────
const ToolbarBtn = ({
  onClick, isActive = false, disabled = false, title, children, className,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <TooltipWrapper content={title}>
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center h-8 w-8 rounded-md text-sm transition-all duration-100',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-40',
        isActive && 'bg-primary/10 text-primary font-semibold shadow-inner',
        className
      )}
    >
      {children}
    </button>
  </TooltipWrapper>
);

// ── Separator ─────────────────────────────────────────────────────────────────
const Sep = () => <div className="w-px h-5 bg-border mx-0.5 flex-shrink-0" />;

// ── Heading / Block type Dropdown ─────────────────────────────────────────────
const BlockTypeDropdown = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getLabel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1';
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2';
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3';
    if (editor.isActive('heading', { level: 4 })) return 'Heading 4';
    if (editor.isActive('codeBlock')) return 'Code Block';
    if (editor.isActive('blockquote')) return 'Blockquote';
    return 'Paragraph';
  };

  const options = [
    { label: 'Paragraph', fn: () => editor.chain().focus().setParagraph().run(), class: 'text-base' },
    { label: 'Heading 1', fn: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), class: 'text-2xl font-bold' },
    { label: 'Heading 2', fn: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), class: 'text-xl font-bold' },
    { label: 'Heading 3', fn: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), class: 'text-lg font-semibold' },
    { label: 'Heading 4', fn: () => editor.chain().focus().toggleHeading({ level: 4 }).run(), class: 'text-base font-semibold' },
    { label: 'Code Block', fn: () => editor.chain().focus().toggleCodeBlock().run(), class: 'font-mono text-sm text-orange-600' },
    { label: 'Blockquote', fn: () => editor.chain().focus().toggleBlockquote().run(), class: 'italic text-muted-foreground' },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); setOpen(o => !o); }}
        className={cn(
          'inline-flex items-center gap-1.5 h-8 px-2 rounded-md text-sm font-medium transition-all',
          'hover:bg-accent hover:text-accent-foreground border border-border/60',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-w-[110px]'
        )}
      >
        <Type className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
        <span className="flex-1 text-left truncate">{getLabel()}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 flex-shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-popover border border-border rounded-lg shadow-xl overflow-hidden min-w-[160px] py-1">
          {options.map(opt => (
            <button
              key={opt.label}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); opt.fn(); setOpen(false); }}
              className={cn(
                'w-full text-left px-3 py-2 hover:bg-accent transition-colors',
                opt.class
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Text Color Picker ─────────────────────────────────────────────────────────
const PRESET_COLORS = [
  '#000000', '#374151', '#6B7280', '#9CA3AF',
  '#EF4444', '#F97316', '#EAB308', '#22C55E',
  '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6',
];

const ColorPicker = ({
  editor, mode,
}: {
  editor: Editor;
  mode: 'text' | 'highlight';
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const apply = (color: string) => {
    if (mode === 'text') {
      editor.chain().focus().setColor(color).run();
    } else {
      editor.chain().focus().setHighlight({ color }).run();
    }
    setOpen(false);
  };

  const current = mode === 'text'
    ? (editor.getAttributes('textStyle').color || '#000000')
    : (editor.getAttributes('highlight').color || '#FEF08A');

  return (
    <div className="relative" ref={ref}>
      <TooltipWrapper content={mode === 'text' ? 'Text Color' : 'Highlight Color'}>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); setOpen(o => !o); }}
          className="inline-flex flex-col items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-all"
        >
          {mode === 'text' ? (
            <Palette className="h-4 w-4" />
          ) : (
            <Highlighter className="h-4 w-4" />
          )}
          <div
            className="w-5 h-1 rounded-full mt-0.5"
            style={{ backgroundColor: current }}
          />
        </button>
      </TooltipWrapper>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-popover border border-border rounded-lg shadow-xl p-2.5 min-w-[140px]">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            {mode === 'text' ? 'Text color' : 'Highlight'}
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {PRESET_COLORS.map(color => (
              <button
                key={color}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); apply(color); }}
                className="w-6 h-6 rounded-full border-2 border-transparent hover:border-ring transition-all hover:scale-110"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          {mode === 'text' && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().unsetColor().run(); setOpen(false); }}
              className="mt-2 w-full text-xs text-center text-muted-foreground hover:text-foreground py-1 rounded hover:bg-accent transition-colors"
            >
              Reset color
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ── Link dialog ───────────────────────────────────────────────────────────────
const LinkButton = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openDialog = () => {
    const existing = editor.getAttributes('link').href || '';
    setUrl(existing);
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const apply = () => {
    if (url) {
      editor.chain().focus().setLink({ href: url.startsWith('http') ? url : `https://${url}` }).run();
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <ToolbarBtn
        title="Insert Link"
        onClick={openDialog}
        isActive={editor.isActive('link')}
      >
        <LinkIcon className="h-4 w-4" />
      </ToolbarBtn>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-popover border border-border rounded-lg shadow-xl p-3 min-w-[280px]">
          <p className="text-xs font-medium text-muted-foreground mb-2">Insert / Edit Link</p>
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') apply(); if (e.key === 'Escape') setOpen(false); }}
            placeholder="https://example.com"
            className="w-full px-2.5 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); apply(); }}
              className="flex-1 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Apply
            </button>
            {editor.isActive('link') && (
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().unsetLink().run(); setOpen(false); }}
                className="px-2 py-1.5 text-xs text-destructive border border-destructive/30 rounded-md hover:bg-destructive/10 transition-colors"
                title="Remove link"
              >
                <Unlink className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── YouTube dialog ────────────────────────────────────────────────────────────
const YoutubeButton = ({ editor }: { editor: Editor }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const apply = () => {
    if (url) {
      editor.commands.setYoutubeVideo({ src: url, width: 640, height: 480 });
    }
    setUrl('');
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <ToolbarBtn title="Embed YouTube Video" onClick={() => { setOpen(o => !o); setTimeout(() => inputRef.current?.focus(), 50); }}>
        <YoutubeIcon className="h-4 w-4" />
      </ToolbarBtn>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-popover border border-border rounded-lg shadow-xl p-3 min-w-[280px]">
          <p className="text-xs font-medium text-muted-foreground mb-2">Embed YouTube Video</p>
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') apply(); if (e.key === 'Escape') setOpen(false); }}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-2.5 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); apply(); }}
            className="mt-2 w-full py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Embed Video
          </button>
        </div>
      )}
    </div>
  );
};

// ── Main Toolbar ──────────────────────────────────────────────────────────────
export function EditorToolbar({ editor, onInsertImage }: EditorToolbarProps) {
  return (
    <div className="tiptap-toolbar">
      {/* Row 1 */}
      <div className="tiptap-toolbar__row">
        {/* Undo/Redo */}
        <ToolbarBtn title="Undo (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Redo (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo className="h-4 w-4" />
        </ToolbarBtn>

        <Sep />

        {/* Block type */}
        <BlockTypeDropdown editor={editor} />

        <Sep />

        {/* Inline formatting */}
        <ToolbarBtn title="Bold (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
          <Bold className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Italic (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
          <Italic className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Underline (Ctrl+U)" onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
          <Underline className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
          <Strikethrough className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Inline Code" onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')}>
          <Code className="h-4 w-4" />
        </ToolbarBtn>

        <Sep />

        {/* Colors */}
        <ColorPicker editor={editor} mode="text" />
        <ColorPicker editor={editor} mode="highlight" />

        <Sep />

        {/* Superscript / Subscript */}
        <ToolbarBtn title="Superscript" onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={editor.isActive('superscript')}>
          <Superscript className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Subscript" onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={editor.isActive('subscript')}>
          <Subscript className="h-4 w-4" />
        </ToolbarBtn>
      </div>

      {/* Row 2 */}
      <div className="tiptap-toolbar__row tiptap-toolbar__row--border">
        {/* Alignment */}
        <ToolbarBtn title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })}>
          <AlignLeft className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Align Center" onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })}>
          <AlignCenter className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })}>
          <AlignRight className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Justify" onClick={() => editor.chain().focus().setTextAlign('justify').run()} isActive={editor.isActive({ textAlign: 'justify' })}>
          <AlignJustify className="h-4 w-4" />
        </ToolbarBtn>

        <Sep />

        {/* Lists */}
        <ToolbarBtn title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
          <List className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Numbered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
          <ListOrdered className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
          <Quote className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')}>
          <Code2 className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Horizontal Rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn title="Hard Break (Shift+Enter)" onClick={() => editor.chain().focus().setHardBreak().run()}>
          <CornerUpLeft className="h-4 w-4" />
        </ToolbarBtn>

        <Sep />

        {/* Insert */}
        <LinkButton editor={editor} />

        <ToolbarBtn title="Insert Image" onClick={onInsertImage}>
          <ImageIcon className="h-4 w-4" />
        </ToolbarBtn>

        {/* <ToolbarBtn title="Insert Table (3×3)" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} isActive={editor.isActive('table')}>
          <TableIcon className="h-4 w-4" />
        </ToolbarBtn> */}

        {/* <YoutubeButton editor={editor} /> */}

        <Sep />

        {/* Table controls (only shown when inside table) */}
        {editor.isActive('table') && (
          <>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().addColumnBefore().run(); }}
              className="text-xs px-2 h-8 rounded hover:bg-accent transition-colors border border-border/60"
              title="Add column before"
            >
              +Col ←
            </button>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().addColumnAfter().run(); }}
              className="text-xs px-2 h-8 rounded hover:bg-accent transition-colors border border-border/60"
              title="Add column after"
            >
              +Col →
            </button>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().addRowBefore().run(); }}
              className="text-xs px-2 h-8 rounded hover:bg-accent transition-colors border border-border/60"
              title="Add row above"
            >
              +Row ↑
            </button>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().addRowAfter().run(); }}
              className="text-xs px-2 h-8 rounded hover:bg-accent transition-colors border border-border/60"
              title="Add row below"
            >
              +Row ↓
            </button>
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().deleteTable().run(); }}
              className="text-xs px-2 h-8 rounded hover:bg-destructive/10 text-destructive transition-colors border border-destructive/30"
              title="Delete table"
            >
              Del Table
            </button>
          </>
        )}
      </div>
    </div>
  );
}