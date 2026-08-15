import { useState } from 'react';
import { Mail, CheckCircle2, XCircle, ChevronLeft, Loader2, Calendar, MapPin, Building2, Hash, User } from 'lucide-react';
import { normaliseStatus, type SchoolApplication } from '../types';
import { SchoolAvatar } from './school-avatar';
import { StatusBadge } from './status-badge';
// import { DocumentRow } from './document-row';
import { RejectModal } from './reject-modal';
import { formatDate, getAvatarColor } from './avatar-color';

interface DetailPanelProps {
  school: SchoolApplication;
  approvingSch: boolean;
  rejectSch: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onBack?: () => void; // for mobile
}

// function InfoField({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
//       <p className="text-[14px] font-medium text-gray-900">{value}</p>
//     </div>
//   );
// }

interface DetailPanelProps {
  school: SchoolApplication;
  approvingSch: boolean;
  rejectSch: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onBack?: () => void; // for mobile
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 text-gray-400">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-[13.5px] font-medium text-gray-900 mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

export function DetailPanel({ school, onApprove, approvingSch, rejectSch, onReject, onBack }: DetailPanelProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);

  const status     = normaliseStatus(school.status);
  const isPending  = status === 'pending';
  const isApproved = status === 'approved';
  const isRejected = status === 'rejected';



  return (
    <>
      <div className="flex flex-col h-full overflow-y-auto bg-white">
        {/* Mobile back */}
        {onBack && (
          <div className="lg:hidden px-5 pt-4 pb-2">
            <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-gray-800 transition-colors">
              <ChevronLeft className="w-4 h-4" /> All applications
            </button>
          </div>
        )}

        <div className="flex-1 px-5 sm:px-8 py-6 space-y-6 max-w-3xl">

          {/* ── School header ── */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-gray-100">
            <SchoolAvatar
              initials={getInitials(school.schoolName)}
              color={getAvatarColor(school.id)}
              size="lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-1">
                <h1 className="font-bold text-[20px] text-gray-900 leading-tight">{school.schoolName}</h1>
                <StatusBadge status={school.status} size="md" />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                <span className="flex items-center gap-1.5 text-[12.5px] text-gray-400">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  Submitted {formatDate(school.createdAt)}
                </span>
                <a href={`mailto:${school.adminEmail}`} className="flex items-center gap-1.5 text-[12.5px] text-gray-400 hover:text-[#292382] transition-colors no-underline">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  {school.adminEmail}
                </a>
              </div>
            </div>
          </div>

          {/* ── School info grid ── */}
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">School Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard icon={<MapPin className="w-4 h-4" />}    label="Location"   value={school.location ?? school.address} />
              <InfoCard icon={<Building2 className="w-4 h-4" />} label="Address"    value={school.address} />
              <InfoCard icon={<Hash className="w-4 h-4" />}      label="School Code" value={school.schoolCode} />
              <InfoCard icon={<Hash className="w-4 h-4" />}      label="Identifier" value={school.tenantIdentifier} />
              {school.hasBranch !== undefined && (
                <InfoCard icon={<Building2 className="w-4 h-4" />} label="Has Branch" value={school.hasBranch ? 'Yes' : 'No'} />
              )}
            </div>
          </section>

          {/* ── Admin info ── */}
          <section>
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Administrator</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoCard icon={<User className="w-4 h-4" />}      label="Full Name" value={`${school.adminFirstName} ${school.adminLastName}`} />
              <InfoCard icon={<Mail className="w-4 h-4" />}      label="Email"     value={school.adminEmail} />
              <InfoCard icon={<User className="w-4 h-4" />}      label="Username"  value={school.adminUsername} />
            </div>
          </section>

          {/* ── Documents (if any) ── */}
          {/* {school.documents && school.documents.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Uploaded Requirements</h2>
              <div className="space-y-2.5">
                {school.documents.map(doc => <DocumentRow key={doc.id} doc={doc} />)}
              </div>
            </section>
          )} */}

          {/* ── Approved banner ── */}
          {isApproved && (
            <div className="flex items-start gap-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-[14px] text-emerald-700">Application approved</p>
                <p className="text-[12.5px] text-emerald-600 mt-0.5">
                  Approved on {formatDate(school.respondedAt)}. The school can now log in and set up their account.
                </p>
              </div>
            </div>
          )}

          {/* ── Rejected banner ── */}
          {isRejected && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-[14px] text-red-700">Application rejected</p>
                  <p className="text-[12.5px] text-red-500 mt-0.5">
                    Rejected on {formatDate(school.respondedAt)}. Reason sent to the applicant:
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

          {/* ── Actions ── */}
          {isPending && (
            <div className="flex flex-col sm:flex-row gap-3 pb-4">
              <button
                disabled={approvingSch || rejectSch}
                onClick={() => onApprove(school.id)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[14px] font-semibold transition-colors shadow-sm shadow-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {approvingSch ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Approving...</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" /> Approve school</>
                )}
              </button>
              <button
                disabled={rejectSch || approvingSch}
                onClick={() => setShowRejectModal(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-red-300 text-red-600 hover:bg-red-50 text-[14px] font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {rejectSch ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Rejecting...</>
                ) : (
                  <><XCircle className="w-4 h-4" /> Reject</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {showRejectModal && (
        <RejectModal
          schoolName={school.schoolName}
          onConfirm={reason => { onReject(school.id, reason); setShowRejectModal(false); }}
          onClose={() => setShowRejectModal(false)}
        />
      )}
    </>
  );
}
