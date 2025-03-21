"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../src/components/layout/Layout"
import { useSession } from "next-auth/react"
import HomePage from "../src/pages/HomePage"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Optional: Redirect authenticated users to dashboard
    if (session) {
      router.push("/dashboard")
    }
  }, [session, router])

  return (
    <Layout>
      <HomePage />
    </Layout>
  )
}

