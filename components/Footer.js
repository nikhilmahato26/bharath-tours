'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'
import { usePhone, useWhatsapp, useEmail } from '@/hooks/useSettings'
import Image from 'next/image'

function IgIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
function FbIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const QUICK_LINKS = [
  ['Home',         '/'],
  ['About Us',     '/#about'],
  ['Destinations', '/#destinations'],
  ['Packages',     '/#packages'],
  ['Deals',        '/#deals'],
  ['Contact',      '/#contact'],
]

const FALLBACK_DESTS = [
  { id: 1, name: 'Goa' },
  { id: 2, name: 'Dubai' },
  { id: 3, name: 'Singapore' },
  { id: 4, name: 'Manali' },
  { id: 5, name: 'Andaman' },
  { id: 6, name: 'Thailand' },
]

export default function Footer() {
  const phone    = usePhone()
  const whatsapp = useWhatsapp()
  const email    = useEmail()
  const [footerDests, setFooterDests] = useState([])

  useEffect(() => {
    fetch('/api/destinations')
      .then(r => r.ok ? r.json() : [])
      .then(dests => setFooterDests(dests.filter(d => d.featured !== false).slice(0, 6)))
      .catch(() => {})
  }, [])

  const displayDests = footerDests.length > 0 ? footerDests : FALLBACK_DESTS

  return (
    <footer id="contact" className="bg-[#0f172a] text-white pt-20 mt-16">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <p className="text-amber-500 font-bold text-sm tracking-widest uppercase mb-3">Get in Touch</p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.1] mb-6">
              Plan Your Dream<br/>Journey Today
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-[15px] max-w-md">
              Whether you're looking for the perfect honeymoon package, a family adventure, or seamless visa processing, our team is ready to assist you.
            </p>
            
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Near Opposite to Shivaliyam,<br />Ananthampalli, Redipalli,<br />Pullempeta Mandal, Annamayya District,<br />Andhra Pradesh – 516107
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <a href={`tel:+${phone}`} className="text-gray-300 hover:text-amber-400 transition-colors">+{phone}</a>
              </div>
              {email && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 text-amber-400 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <a href={`mailto:${email}`} className="text-gray-300 hover:text-amber-400 transition-colors">{email}</a>
                </div>
              )}
            </div>

            <a href={`https://wa.me/${whatsapp}?text=Hi! I want to book a tour or get visa assistance!`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-green-500/30 transition-all inline-flex items-center gap-2">
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 rounded-3xl p-8 md:p-10 border border-white/10">
            <h3 className="font-display font-bold text-2xl mb-8">Send Us a Message</h3>
            <form className="flex flex-col gap-5">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Name</label>
                   <input type="text" placeholder="John Doe" className="bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors" />
                 </div>
                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Email</label>
                   <input type="email" placeholder="john@example.com" className="bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors" />
                 </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone Number</label>
                   <input type="text" placeholder="+91 xxxxx xxxxx" className="bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors" />
                 </div>
                 <div className="flex flex-col gap-2">
                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Destination</label>
                   <input type="text" placeholder="Where do you want to go?" className="bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors" />
                 </div>
               </div>
               <div className="flex flex-col gap-2">
                 <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Message</label>
                 <textarea rows="4" placeholder="Tell us about your requirements..." className="bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"></textarea>
               </div>
               <button type="button" className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-lg py-4 rounded-xl mt-2 transition-colors">
                 Send Message
               </button>
            </form>
          </div>
        </div>

        {/* Footer Links Area */}
        <div className="border-t border-white/10 pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="relative w-[70px] h-[70px] mb-6">
              <Image src="/logo.jpeg" alt="Bharath Tours Logo" fill className="object-contain object-left" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for memorable travel experiences and hassle-free visa processing.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://instagram.com/', icon: <IgIcon />, label: 'Instagram' },
                { href: 'https://facebook.com/',  icon: <FbIcon />, label: 'Facebook' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-amber-500 hover:text-white transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-bold text-lg mb-6">Top Destinations</h4>
            <ul className="flex flex-col gap-3">
              {displayDests.map(d => (
                <li key={d.id}>
                  <Link href="/#packages" className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
             <h4 className="font-bold text-lg mb-6">Contact Info</h4>
             <ul className="flex flex-col gap-4">
                <li>
                  <a href={`tel:+${phone}`} className="flex items-start gap-3 text-gray-400 hover:text-amber-400 transition-colors text-sm">
                    <Phone size={16} className="mt-0.5 shrink-0" /> +{phone}
                  </a>
                </li>
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="flex items-start gap-3 text-gray-400 hover:text-amber-400 transition-colors text-sm">
                      <Mail size={16} className="mt-0.5 shrink-0" /> {email}
                    </a>
                  </li>
                )}
                <li>
                   <div className="flex items-start gap-3 text-gray-400 text-sm">
                      <MapPin size={16} className="mt-0.5 shrink-0" />
                      <span>Annamayya District, AP – 516107</span>
                   </div>
                </li>
             </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6">
         <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Bharath Tours and Consultancy. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Made with <span className="text-red-500">❤️</span> for travellers
            </p>
         </div>
      </div>
    </footer>
  )
}
