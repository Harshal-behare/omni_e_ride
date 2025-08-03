"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          setStatus("error")
          setMessage("Authentication failed. Please try again.")
          return
        }

        if (data.session) {
          // Get user profile to determine redirect
          const { data: userProfile } = await supabase
            .from("user_profiles")
            .select("user_type")
            .eq("id", data.session.user.id)
            .single()

          setStatus("success")
          setMessage("Authentication successful! Redirecting...")

          // Redirect based on user role
          setTimeout(() => {
            switch (userProfile?.user_type) {
              case "admin":
                router.push("/admin/dashboard")
                break
              case "dealer":
                router.push("/dealer/dashboard")
                break
              case "customer":
                router.push("/customer/dashboard")
                break
              default:
                router.push("/")
            }
          }, 2000)
        } else {
          setStatus("error")
          setMessage("No session found. Please try logging in again.")
        }
      } catch (error) {
        setStatus("error")
        setMessage("An unexpected error occurred.")
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#3CB043]" />
              <h2 className="text-xl font-semibold mb-2">Processing Authentication</h2>
              <p className="text-gray-600">Please wait while we verify your credentials...</p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <h2 className="text-xl font-semibold mb-2 text-green-700">Success!</h2>
              <p className="text-gray-600">{message}</p>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-xl font-semibold mb-2 text-red-700">Authentication Failed</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <button
                onClick={() => router.push("/login")}
                className="bg-[#3CB043] text-white px-4 py-2 rounded-md hover:bg-[#2d8a33] transition-colors"
              >
                Back to Login
              </button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#3CB043]" />
            <h2 className="text-xl font-semibold mb-2">Loading...</h2>
            <p className="text-gray-600">Please wait...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
} 