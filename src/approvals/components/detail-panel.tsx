import { useState } from 'react';
import { Mail, CheckCircle2, XCircle, ChevronLeft, Loader2 } from 'lucide-react';
import type { SchoolApplication } from '../types';
import { SchoolAvatar } from './school-avatar';
import { StatusBadge } from './status-badge';
// import { DocumentRow } from './document-row';
import { RejectModal } from './reject-modal';
import { getAvatarColor } from './avatar-color';

interface DetailPanelProps {
  school: SchoolApplication;
  approvingSch: boolean;
  rejectSch: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onBack?: () => void; // for mobile
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-[14px] font-medium text-gray-900">{value}</p>
    </div>
  );
}

export function DetailPanel({ school, onApprove, approvingSch, rejectSch, onReject, onBack }: DetailPanelProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const initials = school.schoolName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  const isPending = school.status.toLowerCase() === 'pending';
  const isApproved = school.status.toLowerCase() === 'approved';
  const isRejected = school.status.toLowerCase() === 'rejected';

  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto bg-white">
        {/* Mobile back button */}
        {onBack && (
          <div className="lg:hidden px-4 pt-4">
            <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors">
              <ChevronLeft className="w-4 h-4" />
              All applications
            </button>
          </div>
        )}

        <div className="flex-1 px-5 sm:px-8 py-6 space-y-7 max-w-4xl">

          {/* ── School header ── */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <SchoolAvatar initials={initials} color={getAvatarColor(school.id)} size="lg" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h1 className="font-bold text-[20px] text-gray-900 leading-tight">{school.schoolName}</h1>
                <StatusBadge status={school.status} size="md" />
              </div>
              <p className="text-[12.5px] text-gray-400 mb-2.5">Submitted {school.createdAt}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                <a href={`mailto:${school.adminEmail}`} className="flex items-center gap-1.5 text-[12.5px] text-gray-500 hover:text-blue-600 transition-colors no-underline">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {school.adminEmail}
                </a>
                {/* <a href={`tel:${school.phone}`} className="flex items-center gap-1.5 text-[12.5px] text-gray-500 hover:text-blue-600 transition-colors no-underline">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  {school.phone}
                </a> */}
              </div>
            </div>
          </div>

          {/* ── School information ── */}
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">School Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 pb-7 border-b border-gray-100">
              {/* <InfoField label="Country" value={school.country} /> */}
              {/* <InfoField label="State / Province" value={school.state} /> */}
              <InfoField label="School address" value={school.address} />
              {school.hasBranch && <InfoField label="School branch" value="Yes" />}
            </div>
          </section>

          {/* ── Uploaded requirements ── */}
          {/* <section>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">Uploaded Requirements</h2>
            <div className="space-y-2.5 pb-7 border-b border-gray-100">
              {school.documents.map(doc => (
                <DocumentRow key={doc.id} doc={doc} />
              ))}
            </div>
          </section> */}

          {/* ── Status block (approved / rejected) ── */}
          {isApproved && (
            <div className="flex items-start gap-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[14px] text-emerald-700">Application approved</p>
                <p className="text-[12.5px] text-emerald-600 mt-0.5">
                  Approved on {school.createdAt}. The school can now log in and set up their account.
                </p>
              </div>
            </div>
          )}

          {isRejected && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[14px] text-red-700">Application rejected</p>
                  <p className="text-[12.5px] text-red-500 mt-0.5">
                    Rejected on {school.respondedAt}. Reason sent to the applicant:
                  </p>
                </div>
              </div>
              {school.rejectionReason && (
                <div className="bg-white border border-red-100 rounded-xl px-4 py-3 ml-[52px]">
                  <p className="text-[13px] text-gray-700 leading-relaxed">{school.rejectionReason}</p>
                </div>
              )}
            </div>
          )}

          {/* ── Actions (pending only) ── */}
          {isPending && (
            <div className="flex flex-col sm:flex-row gap-3 pt-1 pb-4">
    <button
        disabled={approvingSch || rejectSch}
        onClick={() => onApprove(school.id)}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[14px] font-semibold transition-colors shadow-sm shadow-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed"
    >
        {approvingSch ? (
            <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Approving...</span>
            </>
        ) : (
            <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve school</span>
            </>
        )}
    </button>

    <button
        disabled={rejectSch || approvingSch}
        onClick={() => setShowRejectModal(true)}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-red-300 text-red-600 hover:bg-red-50 text-[14px] font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
        {rejectSch ? (
            <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Rejecting...</span>
            </>
        ) : (
            <>
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
            </>
        )}
    </button>
</div>
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <RejectModal
          schoolName={school.schoolCode}
          onConfirm={reason => { onReject(school.id, reason); setShowRejectModal(false); }}
          onClose={() => setShowRejectModal(false)}
        />
      )}
    </>
  );
}
