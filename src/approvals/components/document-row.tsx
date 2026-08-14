import { FileText, ExternalLink } from 'lucide-react';
import type { UploadedDocument } from '../types';

interface DocumentRowProps {
  doc: UploadedDocument;
}

export function DocumentRow({ doc }: DocumentRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4 text-blue-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-gray-800 truncate">{doc.name}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{doc.size}</p>
      </div>
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-[12.5px] font-semibold text-blue-600 hover:text-blue-700 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        View <ExternalLink className="w-3 h-3" />
      </a>
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12.5px] font-semibold text-blue-600 hover:text-blue-700 shrink-0 group-hover:hidden"
      >
        View
      </a>
    </div>
  );
}
