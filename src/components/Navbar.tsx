'use client'

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-tmak-green rounded-full flex items-center justify-center text-white font-bold">T</div>
              <span className="font-bold text-xl tracking-tight text-tmak-green">
                T-MAK <span className="text-xs block font-normal opacity-75">Mango Association of Kenya</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center text-sm font-semibold uppercase tracking-wider text-slate-600">
            <Link href="/about" className="hover:text-tmak-green transition">About Us</Link>
            <Link href="/#value-chain" className="hover:text-tmak-green transition">Value Chain</Link>
            <Link href="/statistics" className="hover:text-tmak-green transition">Statistics</Link>
            <Link href="/resources" className="hover:text-tmak-green transition">Resources</Link>

            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  href={(session.user as any).role === 'member' ? '/dashboard' : '/admin'}
                  className="text-tmak-green hover:underline"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-slate-100 text-slate-600 px-5 py-2.5 rounded shadow-sm hover:bg-slate-200 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-tmak-green text-white px-5 py-2.5 rounded shadow-sm hover:bg-opacity-90 transition">Member Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
