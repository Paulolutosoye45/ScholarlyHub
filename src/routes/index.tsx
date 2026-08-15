import { createBrowserRouter, Navigate } from "react-router-dom"
import SuperAdminDashboard from "../page/school/dashboard/super-admin-dashboard"
import Onboarding from "../page/school/onboarding"
import ApprovalPage from "../page/school/approval"
import NotFound from "@/components/NotFound"
import ApprovalsPage from "@/approvals/approvals-page"
import { LoginForm } from "@/platform-admin/LoginForm"
import { WithAuth } from "@/with-auth"
// import AwaitingApproval from "@/page/school/AwaitingApproval"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/register-school",
        element: <Onboarding />,
    },
    {
        path: "/dashboard",
        element: <WithAuth><SuperAdminDashboard /></WithAuth>,
    },
    {
        path: "/school-approval",
        element: <WithAuth><ApprovalsPage /></WithAuth>,
    },
    {
        path: "/approval",
        element: <ApprovalPage />,
    },
    {
        path: "/platform-login",
        element: <WithoutAuth><LoginForm /></WithoutAuth>,
    },

    {
        path: "*",
        element: <NotFound />
    }
])


export default router
