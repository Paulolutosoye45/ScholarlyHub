'use client'; // remove if not Next.js

import { useEffect, useState } from 'react';
import { TopBar } from './components/top-bar';
import { ApprovalsSidebar } from './components/approvals-sidebar';
import { DetailPanel } from './components/detail-panel';
import { EmptyState } from './components/empty-state';
import type { SchoolApplication } from './types';

import { schoolService } from '@/services/school';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

function ErrorState({ errMsg, onRetry }: { errMsg: string; onRetry?: () => void }) {
  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <div className="relative overflow-hidden bg-[#12122a] border border-white/10 rounded-2xl px-8 py-10">
        {/* subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="relative flex flex-col items-center text-center gap-4">
          {/* status pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-400/10 border border-red-400/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
            </span>
            <span className="font-mono text-[11px] tracking-wider text-red-300/80 uppercase">
              Request blocked
            </span>
          </div>

          {/* hero code */}
          <div className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-white/90">
            <span className="text-white/20">[</span>
            405
            <span className="text-white/20">]</span>
          </div>

          {/* message */}
          <p className="text-white/40 text-sm max-w-sm">{errMsg}</p>

          {/* action */}
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#6d28d9]/10 border border-[#6d28d9]/30 text-[#a78bfa] font-mono text-xs tracking-wide hover:bg-[#6d28d9]/20 hover:border-[#6d28d9]/50 transition-colors"
            >
              $ retry_request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApprovalsPage() {
  const [schoolList, setSchoolList] = useState<SchoolApplication[]>([]);
  const [applications, setApplications] = useState<SchoolApplication[]>();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [approvingSch, setApprovingSch] = useState(false);
  const [rejectSch, setRejectSch] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchRegistrationRequests = async () => {
      setLoading(true);

      try {
        const res = await schoolService.RegistrationStatus();

        if (!isMounted) return;

        if (res.data.status === 'failed') {
          setErrMsg(res.data.responseMessage);
          return;
        }

        setSchoolList(res.data.data as []);
        setApplications(res.data.data as []);
      } catch (error) {
        const msg =
          error instanceof AxiosError
            ? error.response?.data?.responseMessage ??
            error.response?.data?.message ??
            error.message
            : (error as Error).message;

        if (isMounted) {
          setErrMsg(msg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchRegistrationRequests();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // set initial selected id when schoolList loads; avoid overwriting user selection
    if (schoolList.length && !selectedId) {
   setSelectedId(schoolList[0].id ?? null);
    }
  }, [schoolList, selectedId]);

  const selectedSchool = applications?.find(a => a.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileView('detail'); // on mobile, switch to detail view
  };

  const handleApprove = async (id: string) => {
    setApprovingSch(true)
    try {
      const res = await schoolService.approveSchool(id)
      if (res.data.status === 'failed') return toast.error(res.data.responseMessage)

      setApplications(prev =>
        prev?.map(a =>
          a.id === id
            ? { ...a, status: 'approved', respondedAt : new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) }
            : a
        )
      );
      toast.success(res.data.responseMessage)
    } catch (error) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.responseMessage ??
          error.response?.data?.message ??
          error.message
          : (error as Error).message;
      toast.error(msg || "Failed to approve school");
    } finally {
      setApprovingSch(false)
    }
  };

  const handleReject = async (id: string, reason: string) => {
    setRejectSch(true)
    try {
      const res = await schoolService.rejectSchool(id, reason)
      if (res.data.status === 'failed') return toast.error(res.data.responseMessage)
      setApplications(prev =>
        prev?.map(a =>
          a.id === id
            ? {
              ...a,
              status: 'rejected',
              rejectedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }),
              rejectionReason: reason,
            }
            : a
        )
      );
      toast.success(res.data.responseMessage)
    } catch (error) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.responseMessage ??
          error.response?.data?.message ??
          error.message
          : (error as Error).message;
      toast.error(msg || "Failed to reject school");
    } finally {
      setRejectSch(false)
    }
  };


  return (
    <div className="flex h-screen bg-[#EEEDF9] font-Poppins">
      <div className="flex-1 flex flex-col h-screen bg-gray-50 overflow-hidden">
        <TopBar />
        {/* ── Main content ── */}
        {loading ? (<div className='flex items-center justify-center min-h-[70vh]'><span className="loaderReqList"></span></div>) : errMsg ? (
          <ErrorState errMsg={errMsg} />
        ) : (<div className="flex flex-1 overflow-hidden">
          {/* ── Sidebar ──
            - On desktop: always visible (w-[340px])
            - On mobile:  shown when mobileView === 'list', hidden otherwise
        */}

          <div className={`
          w-full lg:w-[340px] lg:flex-shrink-0 lg:flex flex-col overflow-hidden
          ${mobileView === 'list' ? 'flex' : 'hidden lg:flex'}
        `}>
            <ApprovalsSidebar
              applications={schoolList}
              selectedId={selectedId}
              onSelect={handleSelect}
            />
          </div>

          <main className={`
          flex-1 overflow-hidden
          ${mobileView === 'detail' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'}
        `}>
            {selectedSchool ? (
              <DetailPanel
                approvingSch={approvingSch}
                rejectSch={rejectSch}
                school={selectedSchool}
                onApprove={handleApprove}
                onReject={handleReject}
                onBack={mobileView === 'detail' ? () => setMobileView('list') : undefined}
              />
            ) : (
              <EmptyState />
            )}
          </main>
        </div>
        )}
      </div>
    </div>
  );
}
