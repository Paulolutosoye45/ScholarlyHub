import { useState } from 'react';
import { Search } from 'lucide-react';
import type { SchoolApplication, ApprovalStatus } from '../types';
import { SidebarItem } from './sidebar-Item';

type FilterTab = 'all' | ApprovalStatus;

interface ApprovalsSidebarProps {
  applications: SchoolApplication[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all',      label: 'All'      },
  { key: 'pending',  label: 'Pending'  },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
];

export function ApprovalsSidebar({ applications, selectedId, onSelect }: ApprovalsSidebarProps) {
  const [query,  setQuery]  = useState('');
  const [filter, setFilter] = useState<FilterTab>('all');


  const counts = {
    all:      applications.length,
    pending:  applications.filter(a => a.status.toLowerCase() === 'pending').length,
    approved: applications.filter(a => a.status.toLowerCase() === 'approved').length,
    rejected: applications.filter(a => a.status.toLowerCase() === 'rejected').length,
  };

  const visible = applications.filter(a => {
    const matchFilter = filter === 'all' || a.status.toLowerCase() === filter;
    const matchQuery  = a.schoolName.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <aside className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-gray-100">
        <h2 className="font-bold text-[15px] text-gray-900">School applications</h2>
        <p className="text-[12px] text-gray-400 mt-0.5">Review submitted forms &amp; requirements</p>

        {/* Search */}
        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by school name"
            className="w-full pl-8 pr-3 py-2 text-[12.5px] bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all ${
                filter === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {tab.label} {counts[tab.key]}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Search className="w-8 h-8 text-gray-200 mb-2" />
            <p className="text-[12.5px] text-gray-400">No schools match your search</p>
          </div>
        ) : (
          visible.map(school => (
            <SidebarItem
              key={school.id}
              school={school}
              selected={selectedId === school.id}
              onClick={() => onSelect(school.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
