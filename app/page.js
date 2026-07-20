'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HeroSlider from '@/components/HeroSlider'
import PackageCard from '@/components/PackageCard'
import Footer from '@/components/Footer'
import { usePackages } from '@/hooks/usePackages'
import { usePhone, useWhatsapp, useEmail } from '@/hooks/useSettings'
import { MapPin, ArrowRight, Play, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  const { packages, loaded: pkgsLoaded } = usePackages()
  const phone = usePhone()
  const whatsapp = useWhatsapp()
  const email = useEmail()

  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    fetch('/api/destinations')
      .then(r => r.ok ? r.json() : [])
      .then(setDestinations)
      .catch(() => {})
  }, [])

  // Take top 8 packages for the grid
  const topPackages = packages.slice(0, 8)

  return (
    <main className="min-h-screen bg-[#fcfcfc] font-sans selection:bg-amber-100 selection:text-amber-900 pb-0">
      <Navbar />
      <HeroSlider />

      {/* ══ POPULAR PACKAGES ══════════════════════════════════════════════ */}
      <section id="packages" className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-red-500 italic font-medium text-lg mb-2 font-serif">Explore The World</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[#08091a] mb-4">
            Awesome Trip With Us
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-6 text-[15px]">
            Handpicked tour packages across India's most breathtaking destinations. Every<br className="hidden sm:block" /> journey crafted with care.
          </p>
          <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {!pkgsLoaded ? (
            <div className="col-span-full py-20 text-center text-gray-500">Loading packages...</div>
          ) : (
            topPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} phone={phone} />)
          )}
        </div>
      </section>

      {/* ══ FEATURED DESTINATION ══════════════════════════════════════════ */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="mb-10">
          <p className="text-red-500 font-bold text-sm tracking-widest uppercase mb-2">Choose Destination</p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight">Featured Destination</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Large Left Image */}
          <div className="lg:col-span-1 rounded-[24px] overflow-hidden relative group cursor-pointer shadow-lg">
            <img src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80" alt="Himachal Pradesh" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-sm font-semibold text-white/80 tracking-widest uppercase mb-1">Explore</div>
              <h3 className="font-display font-bold text-3xl">Himachal Pradesh</h3>
              <div className="flex items-center gap-2 mt-2 text-amber-400 font-medium text-sm">
                4 Tours <ArrowRight size={14} />
              </div>
            </div>
          </div>

          {/* Right Grid (2x2) */}
          <div className="lg:col-span-2 grid grid-cols-2 grid-rows-2 gap-6 h-full">
            <div className="rounded-[24px] overflow-hidden relative group cursor-pointer shadow-md">
              <img src="https://images.unsplash.com/photo-1623150502742-6a849aa94be4?q=80" alt="Uttarakhand" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-display font-bold text-xl">Uttarakhand</h3>
                <div className="text-amber-400 font-medium text-xs mt-1">3 Tours</div>
              </div>
            </div>
            
            <div className="rounded-[24px] overflow-hidden relative group cursor-pointer shadow-md">
              <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80" alt="Rajasthan" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-display font-bold text-xl">Rajasthan</h3>
                <div className="text-amber-400 font-medium text-xs mt-1">5 Tours</div>
              </div>
            </div>

            <div className="rounded-[24px] overflow-hidden relative group cursor-pointer shadow-md">
              <img src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80" alt="Kashmir" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-display font-bold text-xl">Kashmir</h3>
                <div className="text-amber-400 font-medium text-xs mt-1">6 Tours</div>
              </div>
            </div>

            <div className="rounded-[24px] overflow-hidden relative group cursor-pointer shadow-md">
              <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80" alt="Kerala" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="font-display font-bold text-xl">Kerala</h3>
                <div className="text-amber-400 font-medium text-xs mt-1">4 Tours</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LAST-MINUTE DEALS ═════════════════════════════════════════════ */}
      <section id="deals" className="py-16 px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Red Block */}
          <div className="lg:w-1/4 rounded-[24px] bg-red-500 text-white p-10 flex flex-col justify-center items-start shadow-xl shadow-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-5 -mb-5"></div>
            
            <p className="text-white/80 font-bold tracking-widest text-xs uppercase mb-3 relative z-10">Limited Time</p>
            <h2 className="font-display font-extrabold text-4xl leading-tight mb-8 relative z-10">Hurry!<br/>Deals<br/>Live</h2>
            <button className="bg-white text-red-500 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-gray-50 relative z-10">
              Book Now
            </button>
          </div>

          {/* Right Cards */}
          <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((item) => (
              <div key={item} className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-md flex flex-col group hover:-translate-y-1 transition-transform">
                <div className="relative h-48 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-152${item}4413840807-0c3cb6fa808d?w=600&q=80`} alt="Deal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    Save 20%
                  </div>
                  {/* Countdown mock */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-md rounded-xl p-2 text-white">
                     <div className="text-center px-2"><div className="font-bold text-sm">12</div><div className="text-[9px] uppercase text-gray-300">Days</div></div>
                     <div className="text-center px-2"><div className="font-bold text-sm">08</div><div className="text-[9px] uppercase text-gray-300">Hrs</div></div>
                     <div className="text-center px-2"><div className="font-bold text-sm">45</div><div className="text-[9px] uppercase text-gray-300">Min</div></div>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Weekend Gateway to Goa</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4">
                    <MapPin size={12} className="text-gray-400" />
                    <span>Goa, India</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-400 line-through mr-2">₹25,000</span>
                      <span className="text-xl font-extrabold text-gray-900">₹19,999</span>
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PREMIER ADVENTURE ═════════════════════════════════════════════ */}
      <section id="about" className="py-20 px-6 max-w-[1400px] mx-auto border-t border-gray-100 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div>
            <p className="text-red-500 font-bold text-sm tracking-widest uppercase mb-3">About Us</p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-6">
              Premier Adventure<br/>Travel Company
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">
              Bharath Tours and Consultancy is a trusted travel agency based in Annamayya District, Andhra Pradesh. We provide comprehensive travel solutions including domestic and international tour packages, visa consultancy, flight tickets, and hotel bookings.
            </p>
            
            <div className="flex flex-col gap-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Exclusive Trips</h4>
                  <p className="text-gray-500 text-sm">Curated itineraries designed for unforgettable experiences.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg mb-1">Professional Guidance</h4>
                  <p className="text-gray-500 text-sm">Expert visa assistance and dedicated support throughout your journey.</p>
                </div>
              </div>
            </div>

            <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-red-500/30 transition-all flex items-center gap-2">
              Discover More <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Image Masonry */}
          <div className="grid grid-cols-2 gap-4 h-[500px]">
             <div className="col-span-2 h-[240px] rounded-[24px] overflow-hidden shadow-lg relative group">
                <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80" alt="Travel map" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </div>
             <div className="h-[240px] rounded-[24px] overflow-hidden shadow-lg relative group">
                <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80" alt="Landscape" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             </div>
             <div className="h-[240px] rounded-[24px] overflow-hidden shadow-lg relative group">
                <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80" alt="Hiker" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 right-4 bg-[#1e3a8a] text-white w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-lg font-display">
                   <span className="font-bold text-lg leading-none mb-0.5">16</span>
                   <span className="text-[9px] uppercase tracking-wider">Years</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ═════════════════════════════════════════════════ */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Icons Grid */}
          <div>
            <p className="text-red-500 font-bold text-sm tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 leading-[1.1] mb-6">
              Why Bharath Tours
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-[15px]">
              We ensure a seamless travel experience with our comprehensive range of services. From finding the best flights to securing your visa, we've got you covered.
            </p>

            <div className="grid grid-cols-4 gap-4">
               {[
                 { icon: '🏨', label: 'Hotel\nBookings' },
                 { icon: '✈️', label: 'Flight\nTickets' },
                 { icon: '🛂', label: 'Visa\nServices' },
                 { icon: '🛡️', label: 'Travel\nInsurance' },
                 { icon: '🗺️', label: 'Custom\nPackages' },
                 { icon: '🚌', label: 'Local\nTransfers' },
                 { icon: '👥', label: 'Group\nTours' },
                 { icon: '🤝', label: '24/7\nSupport' }
               ].map((item, idx) => (
                 <div key={idx} className="bg-red-500 rounded-2xl aspect-square flex flex-col items-center justify-center p-3 text-center shadow-lg shadow-red-500/20 hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="text-white font-semibold text-[10px] sm:text-xs leading-tight whitespace-pre-line">{item.label}</div>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Side: Image Grid */}
          <div className="grid grid-cols-2 gap-4 h-[600px] pt-8">
             <div className="h-[280px] rounded-[24px] overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80" alt="Travel" className="w-full h-full object-cover" />
             </div>
             <div className="h-[280px] rounded-[24px] overflow-hidden shadow-lg mt-8">
                <img src="https://images.unsplash.com/photo-1528181304800-259b08848526?q=80" alt="Beach" className="w-full h-full object-cover" />
             </div>
             <div className="h-[280px] rounded-[24px] overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80" alt="Passport" className="w-full h-full object-cover" />
             </div>
             <div className="h-[280px] rounded-[24px] overflow-hidden shadow-lg mt-8">
                <img src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80" alt="City" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
