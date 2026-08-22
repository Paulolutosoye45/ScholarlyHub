import { useNavigate } from "react-router-dom";
import AwaitingApproval from "../AwaitingApproval";
import CompleteSchoolProfile from "../component/complete-school-profile";
import { SchoolTopBar } from "./layout/school-top-bar";
import { SchoolHeroBanner } from "./sections/school-hero-banner";
import { SchoolLiveActivity } from "./sections/school-live-activity";
import { SchoolQuickActions } from "./sections/school-quick-actions";
import { SchoolRecentSchools } from "./sections/school-recent-schools";
import { SchoolStatsCards } from "./sections/school-stats-cards";
import { SchoolSubscriptionMix } from "./sections/school-subscription-mix";



export default function SuperAdminDashboard() {
  const approval = true; // ← flip to true when approved
  const profileComplete = true;
  const navigate = useNavigate()
  return (
    <div className="flex h-screen bg-[#EEEDF9] font-Poppins">

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {approval && profileComplete && (<SchoolTopBar title={approval ? "Dashboard" : "Awaiting Approval"} />)}

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {approval ? (
            profileComplete ? (
              // ── Approved — full dashboard ──────────────────────
              <div className="space-y-4 lg:space-y-5">
                <SchoolHeroBanner onRegisterSchool={() => navigate('/register-school')} />
                <SchoolStatsCards />
                <SchoolQuickActions />
                <div className="flex flex-col xl:flex-row gap-4 lg:gap-5 items-start">
                  <div className="flex-1 min-w-0 w-full">
                    <SchoolRecentSchools />
                  </div>
                  <div className="w-full xl:w-72 xl:flex-shrink-0 flex flex-col gap-4">
                    <SchoolLiveActivity />
                    <SchoolSubscriptionMix />
                  </div>
                </div>
              </div>
            ) : (
              // ── Complete school profile ────────────────────
              <CompleteSchoolProfile />
            )
          ) : (
            // ── Pending — awaiting approval page ──────────────
            <AwaitingApproval />
          )}
        </main>
      </div>
    </div>
  );
}