import { ArrowRight, Clock3, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApprovalPage = () => {
  const navigate = useNavigate();
  const approval = false;
  const statusLabel = approval ? "Approved" : "Waiting for approval";
  const statusColor = approval ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-800";

  return (
    <div className="min-h-screen bg-[#EEEDF9] flex items-center justify-center px-4 py-10 font-Poppins">
      <div className="max-w-5xl w-full rounded-md border border-[#F0F1F7] bg-white overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-8 sm:p-10 lg:pr-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8EAFA] bg-[#F6F7FF] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#3D4EE6]">
              <Clock3 className="h-4 w-4" />
              Pending review
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#1A2144] sm:text-4xl">
              Your school registration is under review
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#5C607F] sm:text-base">
              We received your onboarding request. The approval team is checking your details and will activate your account as soon as the review completes.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#ECECF5] bg-[#F7F7FF] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#6F71A0]">Current status</p>
                <div className={`mt-3 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${statusColor}`}>
                  {statusLabel}
                </div>
              </div>

              <div className="rounded-3xl border border-[#ECECF5] bg-[#F7F7FF] p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#6F71A0]">Review estimate</p>
                <p className="mt-3 text-sm font-semibold text-[#1A2144]">Up to 24 hours</p>
                <p className="mt-2 text-sm leading-6 text-[#5C607F]">
                  Our team normally finishes approval within one business day. You can keep this window open and check back soon.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-[28px] border border-[#EEF0FF] bg-[#F8F9FF] p-6 sm:p-8">
              <div className="flex items-center gap-4 text-[#1A2144]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF3FF] text-[#3447BF]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Approval process</p>
                  <p className="mt-1 text-sm leading-6 text-[#5C607F]">
                    We check your school details, verify documents and confirm that everything is ready for a secure launch.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#E5E7FF] bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#8B8FBF]">Step 1</p>
                  <p className="mt-2 text-sm font-semibold text-[#1A2144]">Verify registration details</p>
                </div>
                <div className="rounded-3xl border border-[#E5E7FF] bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#8B8FBF]">Step 2</p>
                  <p className="mt-2 text-sm font-semibold text-[#1A2144]">Approve your school profile</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#292382] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f1f70]"
              >
                Return to dashboard
                <ArrowRight className="h-6 w-6" />
              </button>
              <div className="rounded-2xl border border-[#E8EAF8] bg-white px-5 py-3 text-sm text-[#5C607F]">
                You can also revisit your onboarding page if you want to update the details.
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-[#EEF4FF] to-white p-8 sm:p-10">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#D6E5FF]/70 blur-3xl" />
            <div className="relative flex h-full flex-col justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#4F61E8]">Approval timeline</p>
                <div className="mt-5 space-y-4">
                  <div className="rounded-3xl border border-[#E2E8FF] bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#8B8FBF]">Step 1</p>
                    <p className="mt-2 text-sm font-semibold text-[#1A2144]">Submit school registration</p>
                    <p className="mt-1 text-sm text-[#5C607F]">All details collected and sent to review.</p>
                  </div>
                  <div className="rounded-3xl border border-[#C7D2FE] bg-[#EEF2FF] p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#7886D7]">Step 2</p>
                    <p className="mt-2 text-sm font-semibold text-[#1A2144]">Await approval</p>
                    <p className="mt-1 text-sm text-[#5C607F]">Your application is visible to the approval team.</p>
                  </div>
                  <div className="rounded-3xl border border-[#E2E8FF] bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#8B8FBF]">Step 3</p>
                    <p className="mt-2 text-sm font-semibold text-[#1A2144]">Activation</p>
                    <p className="mt-1 text-sm text-[#5C607F]">Once approved, your school account is ready to use.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[#E8EAFF] bg-white p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-[#8B8FBF]">Need help?</p>
                <p className="mt-3 text-sm leading-6 text-[#5C607F]">
                  Reach out to the approval team at <span className="font-semibold text-[#1A2144]">support@bluetthub.com</span> if the review takes longer than expected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalPage;
