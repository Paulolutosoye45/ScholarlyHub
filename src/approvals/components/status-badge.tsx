import type { ApprovalStatus } from '../types';

interface StatusBadgeProps {
  status: ApprovalStatus;
  size?: 'sm' | 'md';
}

const CONFIG: Record<ApprovalStatus, { label: string; dot: string; text: string; bg: string }> = {
  pending:  { label: 'PENDING',  dot: 'bg-amber-400',   text: 'text-amber-700',  bg: 'bg-amber-50  border border-amber-200'  },
  approved: { label: 'APPROVED', dot: 'bg-emerald-500', text: 'text-emerald-700',bg: 'bg-emerald-50 border border-emerald-200'},
  rejected: { label: 'REJECTED', dot: 'bg-red-500',     text: 'text-red-700',   bg: 'bg-red-50    border border-red-200'    },
};


const VALID_STATUSES: ApprovalStatus[] = ['pending', 'approved', 'rejected'];


export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const normalizedStatus = typeof status === 'string' ? status.toLowerCase() : 'pending';
  const safeStatus: ApprovalStatus = VALID_STATUSES.includes(normalizedStatus as ApprovalStatus)
    ? (normalizedStatus as ApprovalStatus)
    : 'pending';

  const c = CONFIG[safeStatus];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide ${c.bg} ${c.text} ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1'}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
      {c.label}
    </span>
  );
}
