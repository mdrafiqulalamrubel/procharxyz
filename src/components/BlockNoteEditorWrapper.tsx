'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

interface BlockNoteEditorWrapperProps {
  initialContent?: any;
  onChange?: (content: any) => void;
}

export default function BlockNoteEditorWrapper({
  initialContent,
  onChange,
}: BlockNoteEditorWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const safeContent = useMemo(() => {
    if (Array.isArray(initialContent) && initialContent.length > 0) {
      return initialContent;
    }
    return [{ type: 'paragraph', content: [] }];
  }, [initialContent]);

  const editor = useCreateBlockNote({
    initialContent: safeContent,
  });

  useEffect(() => {
    if (!editor || !onChange) return;

    const unsubscribe = editor.onChange(() => {
      onChange(editor.document);
    });

    return () => unsubscribe();
  }, [editor, onChange]);

  if (!mounted) {
    return <div className="min-h-[400px]" />;
  }

  return (
    <div className="min-h-[400px] rounded-xl bg-white">
      <BlockNoteView
        editor={editor as any}
        theme="light"
        className="min-h-[400px]"
      />
    </div>
  );
}