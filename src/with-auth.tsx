import { Navigate, useLocation } from "react-router-dom"
import { token } from "@/utils"

export function WithAuth({
  children,
}: {
  children: React.ReactNode
}) {
  const location = useLocation()

  if (!token.isAuthenticated()) {
    return <Navigate to="/platform-login" replace state={{ from: location }} />
  }

  return children
}

export function WithoutAuth({
  children,
}: {
  children: React.ReactNode
}) {
  const location = useLocation()

  if (token.isAuthenticated()) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />
  }

  return children
}