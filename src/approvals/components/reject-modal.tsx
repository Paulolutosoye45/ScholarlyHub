import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface RejectModalProps {
  schoolName: string;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}

export function RejectModal({ schoolName, onConfirm, onClose }: RejectModalProps) {
  const [reason, setReason] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-[14px] text-gray-900">Reject application</h3>
              <p className="text-[11.5px] text-gray-400 mt-0.5">{schoolName}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-[12px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Reason for rejection <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Explain why the application is being rejected. This message will be sent to the school..."
              rows={4}
              className="w-full text-[13px] border border-gray-200 rounded-xl px-3.5 py-3 resize-none outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all placeholder:text-gray-300"
            />
            <p className="text-[11px] text-gray-400 mt-1">This reason will be emailed to the applicant.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2.5 px-6 py-4 border-t border-gray-100 bg-gray-50/60">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { if (reason.trim()) onConfirm(reason.trim()); }}
            disabled={!reason.trim()}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-[13px] font-semibold hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm rejection
          </button>
        </div>
      </div>
    </div>
  );
}
