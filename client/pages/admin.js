"use client"

import React from "react"
import { DashboardLayout } from "../src/layouts"
import { AdminPage } from "../src/pages/AdminPage"
import { useAuth } from "../src/hooks/useAuth"
import { useRouter } from "next/router"

const Admin = () => {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()

  // Redirect if not admin
  React.useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/unauthorized")
    }
  }, [user, isAdmin, loading, router])

  if (loading) return <div>Loading...</div>
  if (!user || !isAdmin) return null

  return <AdminPage />
}

Admin.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default Admin

