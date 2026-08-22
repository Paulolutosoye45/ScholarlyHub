import { useEffect, useState } from 'react';
import {
  Search, Shield, User, Mail, AtSign,
  Calendar, CheckCircle2, XCircle, ChevronUp, ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { platformAdmins } from '@/services/platform';
import styled from 'styled-components';
import { SchoolTopBar } from '@/page/school/dashboard/layout/school-top-bar';

interface PlatformUser {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Username: string;
  Role: string;
  IsActive: boolean;
  CreatedAt: string;
}

const ROLE_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  PlatformSuperAdmin: { label: 'Super Admin', bg: 'bg-violet-50 border border-violet-200', text: 'text-violet-700' },
  PlatformAdmin: { label: ' Admin', bg: 'bg-blue-50   border border-blue-200', text: 'text-blue-700' },
  PlatformUser: { label: 'user', bg: 'bg-amber-50  border border-amber-200', text: 'text-amber-700' },
  Teacher: { label: 'Teacher', bg: 'bg-emerald-50 border border-emerald-200', text: 'text-emerald-700' },
}

function getRoleConfig(role: string) {
  return ROLE_CONFIG[role] ?? { label: role, bg: 'bg-gray-100 border border-gray-200', text: 'text-gray-600' };
}

function getInitials(first: string, last: string) {
  return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();
}

function getAvatarColor(str: string) {
  const colors = ['#7C3AED', '#2563EB', '#059669', '#D84040', '#0891B2', '#EA580C', '#D97706', '#1E2D5A'];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString('en-NG', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  } catch { return dateStr; }
}

type SortKey = 'FirstName' | 'Role' | 'CreatedAt' | 'IsActive';

const StyledWrapper = styled.div`
  .loader {
    width: 48px;
    height: 48px;
    margin: auto;
    position: relative;
  }
  .loader:before {
    content: '';
    width: 48px;
    height: 5px;
    background: #f0808050;
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.5s linear infinite;
  }
  .loader:after {
    content: '';
    width: 100%;
    height: 100%;
    background: #f08080;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: jump7456 0.5s linear infinite;
  }
  @keyframes jump7456 {
    15% { border-bottom-right-radius: 3px; }
    25% { transform: translateY(9px) rotate(22.5deg); }
    50% { transform: translateY(18px) scale(1, .9) rotate(45deg); border-bottom-right-radius: 40px; }
    75% { transform: translateY(9px) rotate(67.5deg); }
    100% { transform: translateY(0) rotate(90deg); }
  }
  @keyframes shadow324 {
    0%, 100% { transform: scale(1, 1); }
    50% { transform: scale(1.2, 1); }
  }
`;

// ── Reusable loader component ──────────────────────────
export function Loader() {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}


export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[200px] gap-4 px-6 text-center">
      {/* Animated error icon */}
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center animate-bounce">
          <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        {/* Shadow pulse */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-red-200/60 rounded-full blur-sm animate-pulse" />
      </div>

      <div className="space-y-1">
        <p className="font-semibold text-[14px] text-gray-800">Something went wrong</p>
        <p className="text-[12.5px] text-gray-400 max-w-xs leading-relaxed">
          {message || "An unexpected error occurred. Please try again."}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 text-[12.5px] font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try again
        </button>
      )}
    </div>
  );
}


export function UsersTable() {
  const [users, setUsers] = useState<PlatformUser[]>([])
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('CreatedAt');
  const [sortAsc, setSortAsc] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null)
  const [isLoading, setIsLoading] = useState(true)


  const handlePlatform = async () => {
    setIsLoading(true)
    setMessage(null)
    try {
      const res = await platformAdmins.platformAdminUser()
      if (res.data.status === 'failed') return setMessage({ text: res.data.responseMessage, ok: false })
      setMessage({ text: res.data.responseMessage, ok: true })
      setUsers(res.data.data as [])
    } catch (err) {
      const msg =
        (err as any)?.response?.data?.message ||
        (err as any)?.message ||
        "Failed to create user"
      setMessage({ text: msg, ok: false })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void handlePlatform();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [])


  const roles = ['all', ...Array.from(new Set(users.map(u => u.Role)))];

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(v => !v);
    else { setSortKey(key); setSortAsc(true); }
  };

  const filtered = users
    .filter(u => {
      const matchQuery = [u.FirstName, u.LastName, u.Email, u.Username]
        .join(' ').toLowerCase().includes(query.toLowerCase());
      const matchRole = roleFilter === 'all' || u.Role === roleFilter;
      return matchQuery && matchRole;
    })
    .sort((a, b) => {
      const av: string | boolean = a[sortKey];
      const bv: string | boolean = b[sortKey];
      if (typeof av === 'boolean') return sortAsc ? (av ? -1 : 1) : (av ? 1 : -1);
      return sortAsc
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
      : <ChevronDown className="w-3 h-3 opacity-30" />;



// ── Usage in your component ────────────────────────────
if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <Loader />
    </div>
  );
}

if (!message?.ok) {
  return <ErrorState message={message?.text} onRetry={handlePlatform} />;
}

  return (
    <div className=" flex h-screen bg-[#EEEDF9] font-Poppins">

      <div className="flex-1  flex flex-col min-w-0 overflow-hidden">
      <SchoolTopBar title={"PlatForm Users"} />

       <main className="flex-1  space-y-4 p-4 overflow-y-auto">

      {/* ── Stats strip ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Users', value: users.length, icon: <User className="w-4 h-4 text-violet-500" />, bg: 'bg-violet-50' },
          { label: 'Active', value: users.filter(u => u.IsActive).length, icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, bg: 'bg-emerald-50' },
          { label: 'Inactive', value: users.filter(u => !u.IsActive).length, icon: <XCircle className="w-4 h-4 text-red-400" />, bg: 'bg-red-50' },
          { label: 'Platform Admins', value: users.filter(u => u.Role === 'PlatformAdmin').length, icon: <Shield className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center shrink-0`}>{s.icon}</div>
            <div>
              <p className="text-[10.5px] font-semibold text-gray-400 uppercase tracking-wide">{s.label}</p>
              <p className="text-[20px] font-bold text-gray-900 leading-tight">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, email or username..."
            className="w-full pl-9 pr-4 py-2.5 text-[13px] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#292382]/15 focus:border-[#292382]/40 transition-all"
          />
        </div>

        {/* Role filter */}
        <div className="flex gap-1.5 flex-wrap sm:shrink-0">
          {roles.map(r => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`text-[11.5px] font-semibold px-3 py-2 rounded-xl transition-all ${roleFilter === r
                  ? 'bg-[#292382] text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
            >
              {r === 'all' ? 'All roles' : getRoleConfig(r).label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Add User Button ── */}
      <div className="flex items-center gap-2">
        <Link
          to="/add-user"
          className="flex items-center gap-2 px-4 py-2 text-[12.5px] font-semibold text-violet-600 bg-violet-50 border border-violet-200 rounded-xl hover:bg-violet-100 transition-colors"
        >
          <User className="w-3.5 h-3.5" />
          Add User
        </Link>
      </div>

      {/* ── Table (desktop) ── */}
      <div className="hidden md:block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              {[
                { label: 'User', key: 'FirstName' as SortKey },
                { label: 'Role', key: 'Role' as SortKey },
                { label: 'Status', key: 'IsActive' as SortKey },
                { label: 'Joined', key: 'CreatedAt' as SortKey },
              ].map(col => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="text-left px-5 py-3.5 text-[10.5px] font-bold uppercase tracking-widest text-gray-400 cursor-pointer hover:text-gray-600 select-none"
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}<SortIcon k={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center text-[13px] text-gray-400">
                  No users match your search
                </td>
              </tr>
            ) : filtered.map(u => {
              const role = getRoleConfig(u.Role);
              return (
                <tr key={u.Id} className="hover:bg-gray-50/60 transition-colors">
                  {/* User */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[13px] text-white shrink-0"
                        style={{ backgroundColor: getAvatarColor(u.Id) }}
                      >
                        {getInitials(u.FirstName, u.LastName)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[13.5px] text-gray-900 truncate">
                          {u.FirstName} {u.LastName}
                        </p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <Mail className="w-3 h-3" />{u.Email}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <AtSign className="w-3 h-3" />{u.Username}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${role.bg} ${role.text}`}>
                      <Shield className="w-3 h-3" />{role.label}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    {u.IsActive ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Inactive
                      </span>
                    )}
                  </td>

                  {/* Joined */}
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-[12px] text-gray-500">
                      <Calendar className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                      {formatDate(u.CreatedAt)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/40">
          <p className="text-[11.5px] text-gray-400">
            Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of <span className="font-semibold text-gray-600">{users.length}</span> users
          </p>
        </div>
      </div>

      {/* ── Cards (mobile) ── */}
      <div className="md:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center text-[13px] text-gray-400">
            No users match your search
          </div>
        ) : filtered.map(u => {
          const role = getRoleConfig(u.Role);
          return (
            <div key={u.Id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[14px] text-white shrink-0"
                  style={{ backgroundColor: getAvatarColor(u.Id) }}
                >
                  {getInitials(u.FirstName, u.LastName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[14px] text-gray-900">{u.FirstName} {u.LastName}</p>
                  <p className="text-[11.5px] text-gray-400 truncate">@{u.Username}</p>
                </div>
                {u.IsActive ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Inactive
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-[12px] text-gray-500">
                  <Mail className="w-3.5 h-3.5 text-gray-300 shrink-0" />{u.Email}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${role.bg} ${role.text}`}>
                    <Shield className="w-3 h-3" />{role.label}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11.5px] text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-gray-300" />{formatDate(u.CreatedAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
     </main>
    </div>
    </div>
  );
}