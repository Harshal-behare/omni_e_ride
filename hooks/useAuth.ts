"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, type UserProfile } from "@/lib/supabase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchUserProfile(session.user.id)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

      if (error) {
        console.error("Error fetching user profile:", error)
        return
      }
      setUserProfile(data)
    } catch (error) {
      console.error("Error fetching user profile:", error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signInWithOtp = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  const verifyOtp = async (email: string, token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      })
      return { data, error }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    try {
      // Check if email is pre-approved
      const { data: preApprovedData } = await supabase
        .from("pre_approved_emails")
        .select("role")
        .eq("email", email)
        .eq("used", false)
        .single()

      // Sign up with email confirmation required
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone || "",
            role: preApprovedData?.role || "customer",
          },
        },
      })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signUpWithOtp = async (email: string, fullName: string, phone?: string) => {
    try {
      // Check if email is pre-approved
      const { data: preApprovedData } = await supabase
        .from("pre_approved_emails")
        .select("role")
        .eq("email", email)
        .eq("used", false)
        .single()

      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          data: {
            full_name: fullName,
            phone: phone || "",
            role: preApprovedData?.role || "customer",
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    setUser(null)
    setUserProfile(null)
    return { error }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: "No user logged in" }

    try {
      const { data, error } = await supabase.from("user_profiles").update(updates).eq("id", user.id).select().single()

      if (error) throw error
      setUserProfile(data)
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const resendConfirmation = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const resendOtp = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })
      return { error }
    } catch (error) {
      return { error }
    }
  }

  return {
    user,
    userProfile,
    loading,
    signIn,
    signInWithOtp,
    verifyOtp,
    signUp,
    signUpWithOtp,
    signOut,
    updateProfile,
    resendConfirmation,
    resendOtp,
    refetchProfile: () => user && fetchUserProfile(user.id),
  }
}
