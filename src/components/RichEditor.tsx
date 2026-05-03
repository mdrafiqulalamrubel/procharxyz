'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Youtube from '@tiptap/extension-youtube';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useCallback, useRef, useState } from 'react';

const lowlight = createLowlight(common);

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function RichEditor({ content, onChange, onImageUpload }: RichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl]         = useState('');
  const [showLink, setShowLink]       = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
  const [youtubeUrl, setYoutubeUrl]   = useState('');
  const [uploading, setUploading]     = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Image.configure({ allowBase64: true, inline: false }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: 'Start writing… Paste from Word, Google Docs, or anywhere — formatting is preserved.',
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({ controls: true, nocookie: true }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'focus:outline-none' },
    },
  });

  const compressImage = (file: File, maxWidth = 900, quality = 0.75): Promise<string> =>
    new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        let { width, height } = img;
        if (width > maxWidth) { height = Math.round((height * maxWidth) / width); width = maxWidth; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      };
      img.src = objectUrl;
    });

  const handleImageFile = useCallback(async (file: File) => {
    if (!editor || !file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      let src: string;
      if (onImageUpload) {
        src = await onImageUpload(file);
      } else {
        // Compress before base64 — prevents hanging on large images
        src = await compressImage(file, 900, 0.75);
      }
      editor.chain().focus().setImage({ src, alt: file.name }).run();
    } finally {
      setUploading(false);
    }
  }, [editor, onImageUpload]);

  const insertYoutube = () => {
    if (!youtubeUrl || !editor) return;
    editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
    setYoutubeUrl(''); setShowYoutube(false);
  };

  const applyLink = () => {
    if (!editor) return;
    if (!linkUrl) { editor.chain().focus().unsetLink().run(); }
    else { editor.chain().focus().setLink({ href: linkUrl }).run(); }
    setLinkUrl(''); setShowLink(false);
  };

  if (!editor) return (
    <div className="border border-slate-200 rounded-2xl bg-white h-40 flex items-center justify-center text-slate-400 text-sm">
      Loading editor…
    </div>
  );

  const Btn = ({ onClick, active, title, disabled, children }: {
    onClick: () => void; active?: boolean; title: string; disabled?: boolean; children: React.ReactNode;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-all select-none text-sm ${
        active ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
      } ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {children}
    </button>
  );

  const Sep = () => <div className="w-px h-5 bg-slate-200 mx-0.5 self-center flex-shrink-0" />;

  return (
    <div className="re-wrap border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">

      {/* TOOLBAR */}
      <div className="border-b border-slate-200 bg-slate-50 px-2 py-1.5 flex flex-wrap items-center gap-0.5 sticky top-0 z-20">

        <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo" disabled={!editor.can().undo()}>↩</Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo" disabled={!editor.can().redo()}>↪</Btn>
        <Sep />

        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1"><b>H1</b></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2"><b>H2</b></Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3"><b>H3</b></Btn>
        <Sep />

        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><b>B</b></Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><i>I</i></Btn>
        <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><u>U</u></Btn>
        <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><s>S</s></Btn>
        <Btn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Code">{"`"}</Btn>
        <Sep />

        <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">⬅</Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Center">⬛</Btn>
        <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">➡</Btn>
        <Sep />

        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">• —</Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">1.</Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">❝</Btn>
        <Btn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block">{"</>"}</Btn>
        <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">—</Btn>
        <Sep />

        {/* Link */}
        <div className="relative">
          <Btn onClick={() => setShowLink(v => !v)} active={editor.isActive('link')} title="Link">🔗</Btn>
          {showLink && (
            <div className="absolute top-10 left-0 z-30 bg-white border border-slate-200 rounded-xl shadow-xl p-2 flex gap-1.5 w-72">
              <input autoFocus value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
                placeholder="https://example.com" onKeyDown={e => e.key === 'Enter' && applyLink()}
                className="flex-1 text-sm px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-400"
              />
              <button type="button" onClick={applyLink} className="px-2 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold">OK</button>
              <button type="button" onClick={() => setShowLink(false)} className="px-2 py-1.5 bg-slate-100 rounded-lg text-xs">✕</button>
            </div>
          )}
        </div>

        {/* Image */}
        <Btn onClick={() => fileInputRef.current?.click()} title="Upload Image" disabled={uploading}>
          {uploading ? '⏳' : '🖼'}
        </Btn>
        <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); e.target.value = ''; }}
        />

        {/* YouTube */}
        <div className="relative">
          <Btn onClick={() => setShowYoutube(v => !v)} title="Embed YouTube">▶</Btn>
          {showYoutube && (
            <div className="absolute top-10 left-0 z-30 bg-white border border-slate-200 rounded-xl shadow-xl p-2 flex gap-1.5 w-80">
              <input autoFocus value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)}
                placeholder="Paste YouTube URL…" onKeyDown={e => e.key === 'Enter' && insertYoutube()}
                className="flex-1 text-sm px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-red-400"
              />
              <button type="button" onClick={insertYoutube} className="px-2 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold">Add</button>
              <button type="button" onClick={() => setShowYoutube(false)} className="px-2 py-1.5 bg-slate-100 rounded-lg text-xs">✕</button>
            </div>
          )}
        </div>

        {/* Table */}
        <Btn onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} title="Insert Table">⊞</Btn>

      </div>

      {/* EDITOR BODY */}
      <div
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f?.type.startsWith('image/')) handleImageFile(f); }}
        onDragOver={e => e.preventDefault()}
        onClick={() => editor.commands.focus()}
        className="cursor-text"
      >
        <EditorContent editor={editor} />
      </div>

      <style>{`
        .re-wrap .tiptap {
          font-family: Georgia, 'Times New Roman', serif;
          line-height: 1.85;
          color: #1e293b;
          min-height: 500px;
          padding: 2rem 2.5rem;
        }
        .re-wrap .tiptap:focus { outline: none; }
        .re-wrap .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left; color: #94a3b8; pointer-events: none; height: 0;
        }
        .re-wrap .tiptap h1 { font-size: 2rem; font-weight: 800; margin: 1.5rem 0 0.75rem; line-height: 1.2; font-family: system-ui, sans-serif; }
        .re-wrap .tiptap h2 { font-size: 1.5rem; font-weight: 700; margin: 1.25rem 0 0.6rem; font-family: system-ui, sans-serif; }
        .re-wrap .tiptap h3 { font-size: 1.2rem; font-weight: 700; margin: 1rem 0 0.5rem; font-family: system-ui, sans-serif; }
        .re-wrap .tiptap p  { margin: 0.5rem 0; }
        .re-wrap .tiptap ul { list-style: disc; padding-left: 1.5rem; margin: 0.75rem 0; }
        .re-wrap .tiptap ol { list-style: decimal; padding-left: 1.5rem; margin: 0.75rem 0; }
        .re-wrap .tiptap li { margin: 0.25rem 0; }
        .re-wrap .tiptap blockquote {
          border-left: 4px solid #3b82f6; padding: 0.75rem 1.25rem;
          background: #eff6ff; border-radius: 0 10px 10px 0;
          margin: 1rem 0; font-style: italic; color: #475569;
        }
        .re-wrap .tiptap pre {
          background: #0f172a; color: #e2e8f0; padding: 1rem 1.25rem;
          border-radius: 12px; overflow-x: auto; font-family: monospace;
          font-size: 0.875rem; margin: 1rem 0;
        }
        .re-wrap .tiptap code {
          background: #f1f5f9; color: #0f172a;
          padding: 0.1rem 0.35rem; border-radius: 4px;
          font-size: 0.875em; font-family: monospace;
        }
        .re-wrap .tiptap pre code { background: none; color: inherit; padding: 0; }
        .re-wrap .tiptap img {
          max-width: 100%; border-radius: 12px; margin: 1rem auto;
          display: block; box-shadow: 0 4px 20px rgba(0,0,0,.1);
        }
        .re-wrap .tiptap a { color: #2563eb; text-decoration: underline; cursor: pointer; }
        .re-wrap .tiptap hr { border: none; border-top: 2px solid #e2e8f0; margin: 2rem 0; }
        .re-wrap .tiptap table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
        .re-wrap .tiptap th,
        .re-wrap .tiptap td { border: 1px solid #e2e8f0; padding: 0.5rem 0.85rem; text-align: left; }
        .re-wrap .tiptap th { background: #f8fafc; font-weight: 600; }
        .re-wrap .tiptap [data-youtube-video] { margin: 1rem 0; }
        .re-wrap .tiptap [data-youtube-video] iframe { width: 100%; min-height: 340px; border-radius: 12px; }
      `}</style>
    </div>
  );
}
