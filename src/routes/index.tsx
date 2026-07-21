import { createBrowserRouter, Navigate } from "react-router-dom"
import SuperAdminDashboard from "../page/school/dashboard/super-admin-dashboard"
import Onboarding from "../page/school/onboarding"
import ApprovalPage from "../page/school/approval"
import NotFound from "@/components/NotFound"
// import AwaitingApproval from "@/page/school/AwaitingApproval"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/register-school" replace />,
    },
    {
        path: "/register-school",
        element: <Onboarding />,
    },
    {
        path: "/dashboard",
        element: <SuperAdminDashboard />,
    },
    {
        path: "/approval",
        element: <ApprovalPage />,
    },

    {
        path: "*",
        element: <NotFound />
    }
])


export default router
