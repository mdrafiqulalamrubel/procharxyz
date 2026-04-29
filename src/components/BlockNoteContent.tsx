'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

interface BlockNoteContentProps {
  content?: any;
}

export default function BlockNoteContent({ content }: BlockNoteContentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const safeContent = useMemo(() => {
    if (Array.isArray(content) && content.length > 0) {
      return content;
    }

    return [{ type: 'paragraph', content: [] }];
  }, [content]);

  const editor = useCreateBlockNote({
    initialContent: safeContent,
  });

  if (!mounted) {
    return <div className="min-h-[200px]" />;
  }

  return (
    <div className="min-h-[200px] rounded-xl bg-white">
      <BlockNoteView
        editor={editor as any}
        editable={false}
        theme="light"
        className="min-h-[200px]"
      />
    </div>
  );
}
