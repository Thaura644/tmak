export const dynamic = "force-dynamic"
import React, { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h1 className="text-3xl font-bold text-tmak-green mb-2">Member Login</h1>
        <p className="text-slate-500 mb-8">Access your T-MAK member dashboard.</p>

        <Suspense fallback={<div className="text-slate-500">Loading form...</div>}>
          <LoginForm />
        </Suspense>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account? <a href="/register" className="text-tmak-green font-bold hover:underline">Register here</a>
        </p>
      </div>
    </div>
  )
}
