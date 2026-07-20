'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { usePhone } from '@/hooks/useSettings'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const phone = usePhone()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks = [
    { label: 'Home',         href: '/' },
    { label: 'About Us',     href: '/#about' },
    { label: 'Destinations', href: '/#destinations' },
    { label: 'Packages',     href: '/#packages' },
    { label: 'Deals',        href: '/#deals' },
    { label: 'Contact',      href: '/#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md py-2 backdrop-blur-md' : 'bg-white/90 py-4 backdrop-blur-sm shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-12">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10 shrink-0">
             <div className="relative w-[60px] h-[60px]">
               <Image src="/brand-logo.jpeg" alt="Bharath Tours Logo" fill className="object-contain" />
             </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="text-[13px] font-semibold text-gray-800 hover:text-amber-500 transition-colors whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-6 shrink-0 z-10">
            <a href={`tel:+${phone}`} className="flex items-center gap-2 text-[14px] font-bold text-gray-800 hover:text-amber-500 transition-colors">
              <Phone size={16} className="text-amber-500" /> +{phone}
            </a>
            <a href={`https://wa.me/${phone}?text=Hi! I want to book a tour or get visa assistance!`}
              target="_blank" rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-[13px] px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md">
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-800 z-10">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 shadow-lg absolute w-full left-0 top-full">
          <div className="flex flex-col gap-2">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block py-3 text-[15px] font-semibold text-gray-800 border-b border-gray-50">
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <a href={`tel:+${phone}`} className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-amber-400 text-amber-600 font-bold">
                <Phone size={18} /> Call Us
              </a>
              <a href={`https://wa.me/${phone}?text=Hi! I want to book a tour or get visa assistance!`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 text-gray-900 font-bold">
                Book Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
