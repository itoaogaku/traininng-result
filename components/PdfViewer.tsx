"use client";

import { useState } from "react";
import { Download, ExternalLink, Loader2 } from "lucide-react";

interface PdfViewerProps {
  id: string;
  name: string;
}

export default function PdfViewer({ id, name }: PdfViewerProps) {
  const [loaded, setLoaded] = useState(false);
  const src = `/api/dropbox/file?id=${encodeURIComponent(id)}`;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-end gap-3 text-sm">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <ExternalLink className="h-4 w-4" />
          新しいタブで開く
        </a>
        <a
          href={src}
          download={name}
          className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <Download className="h-4 w-4" />
          ダウンロード
        </a>
      </div>

      <div className="relative h-[80vh] w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-zinc-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            PDFを読み込み中...
          </div>
        )}
        <iframe
          src={src}
          title={name}
          className="h-full w-full"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
