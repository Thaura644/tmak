'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      username: email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      // Fetch session to check role and redirect
      const response = await fetch('/api/auth/session')
      const session = await response.json()

      if (session?.user?.role === 'MEMBER') {
        router.push('/dashboard')
      } else {
        router.push('/admin')
      }
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {registered && (
        <div className="p-3 bg-green-50 border border-green-100 text-green-600 text-sm rounded-lg mb-4">
          Registration successful! Please log in.
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-tmak-green focus:border-transparent outline-none transition"
          placeholder="email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-tmak-green focus:border-transparent outline-none transition"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-tmak-green text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition disabled:opacity-50 mt-4"
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  )
}
