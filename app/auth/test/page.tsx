"use client"

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function AuthTestPage() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.from('user_profiles').select('count').limit(1)
      
      if (error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult('Connection successful!')
      }
    } catch (err) {
      setResult(`Unexpected error: ${err}`)
    }
    setLoading(false)
  }

  const testSignup = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'testpassword123',
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      })
      
      if (error) {
        setResult(`Signup Error: ${error.message}`)
      } else {
        setResult(`Signup successful! Check email for confirmation.`)
      }
    } catch (err) {
      setResult(`Unexpected signup error: ${err}`)
    }
    setLoading(false)
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Test</h1>
      <div className="space-y-4">
        <button 
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          Test DB Connection
        </button>
        <button 
          onClick={testSignup}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Test Signup
        </button>
        {loading && <p>Loading...</p>}
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <pre>{result}</pre>
          </div>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Environment Check:</h2>
        <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set'}</p>
        <p>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
      </div>
    </div>
  )
}
