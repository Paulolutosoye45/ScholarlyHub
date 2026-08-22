import { createBrowserRouter, Navigate } from "react-router-dom"
import SuperAdminDashboard from "../page/school/dashboard/super-admin-dashboard"
import Onboarding from "../page/school/onboarding"
import ApprovalPage from "../page/school/approval"
import NotFound from "@/components/NotFound"
import ApprovalsPage from "@/approvals/approvals-page"
import { LoginForm } from "@/platform-admin/LoginForm"
import { WithAuth, WithoutAuth } from "@/with-auth"
import { CreateUserForm } from "@/platform-admin/CreateUserForm"
// import AwaitingApproval from "@/page/school/AwaitingApproval"
import { SchoolLayout } from "../page/school/dashboard/layout/SchoolLayout"
import { UsersTable } from "@/platform-admin/users-table"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/platform-login" replace />,
    },
    {
        path: "/platform-login",
        element: <WithoutAuth><LoginForm /></WithoutAuth>,
    },
    {
        path: "/register-school",
        element: <Onboarding />,
    },
    {
        path: "/approval",
        element: <ApprovalPage />,
    },

    // ── Protected layout routes ──────────────────────────
    {
        path: "/",
        element: <WithAuth><SchoolLayout /></WithAuth>,
        children: [
            {
                path: "dashboard",
                element: <SuperAdminDashboard />,
            },
            {
                path: "schools",
                element: <ApprovalsPage />,
            },
            {
                path: "add-user",
                element: <CreateUserForm />,
            },
            {
                path: "platform-user",
                element: <UsersTable />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);


export default router
