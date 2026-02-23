import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 border-t-8 border-tmak-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-tmak-green rounded-full flex items-center justify-center text-white font-bold">T</div>
              <span className="font-bold text-xl tracking-tight">T-MAK</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm">
              Empowering Kenyan mango stakeholders through coordination, market intelligence, and advocacy to achieve global excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-tmak-accent hover:text-tmak-green transition">IN</a>
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-tmak-accent hover:text-tmak-green transition">FB</a>
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-full hover:bg-tmak-accent hover:text-tmak-green transition">X</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="/about" className="hover:text-white transition">About the Authority</Link></li>
              <li><Link href="/members" className="hover:text-white transition">Trade Portal</Link></li>
              <li><Link href="/resources" className="hover:text-white transition">Export Guidelines</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Secretariat</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Agricultural House, 4th Floor<br/>
              Harambee Avenue, Nairobi<br/>
              P.O. Box 40010 - 00100<br/>
              <span className="block mt-2">info@t-mak.or.ke</span>
            </p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} The Mango Association of Kenya (T-MAK). All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
