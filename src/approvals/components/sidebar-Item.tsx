import type { SchoolApplication } from '../types';
import { getAvatarColor } from './avatar-color';
import { SchoolAvatar } from './school-avatar';
import { StatusBadge } from './status-badge';

interface SidebarItemProps {
  school: SchoolApplication;
  selected: boolean;
  onClick: () => void;
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr.replace(',', ''));
  const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return '1d ago';
  return `${diff}d ago`;
}

export function SidebarItem({ school, selected, onClick }: SidebarItemProps) {
  const initials = school.schoolName
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 flex items-start gap-3 transition-colors relative border-b border-gray-100 last:border-0 ${
        selected ? 'bg-blue-50/70' : 'hover:bg-gray-50'
      }`}
    >
      {/* Active indicator */}
      {selected && (
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 rounded-r-full" />
      )}

      <SchoolAvatar initials={initials} color={getAvatarColor(school.id)} size="sm" />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[13.5px] text-gray-900 truncate">{school.schoolName}</p>
        <p className="text-[11px] text-gray-400 mt-0.5 truncate">{school.location}</p>
        <div className="flex items-center justify-between mt-1.5">
          <StatusBadge status={school.status} />
          <span className="text-[10px] text-gray-400">{timeAgo(school.createdAt)}</span>
        </div>
      </div>
    </button>
  );
}
