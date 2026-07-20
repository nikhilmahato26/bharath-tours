'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2000",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000",
  "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2000"
]

export default function HeroSlider() {
  const [search, setSearch] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide(p => (p + 1) % SLIDES.length)
  const prevSlide = () => setCurrentSlide(p => (p - 1 + SLIDES.length) % SLIDES.length)

  const handleSearch = (e) => {
    e.preventDefault()
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center pt-16 mt-[-64px] overflow-hidden">
      {/* Background Images */}
      {SLIDES.map((src, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={src}
            alt={`Slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30"></div>
        </div>
      ))}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center mt-20">
        <h1 className="text-white font-display font-extrabold text-5xl md:text-7xl mb-8 text-center drop-shadow-lg tracking-tight">
          Unleash Your Wanderlust
        </h1>

        {/* Search Bar Container */}
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-3xl bg-white/95 backdrop-blur-sm p-2 pl-6 rounded-full flex items-center shadow-2xl mb-16"
        >
          <div className="text-gray-400 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Your destinations here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 text-lg placeholder-gray-400 font-medium"
          />
          <button 
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg px-10 py-3 rounded-full transition-colors ml-2 shadow-lg"
          >
            Find All
          </button>
        </form>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-bold text-3xl md:text-4xl mb-1 font-display drop-shadow-md">650+</span>
            <span className="text-white font-medium text-sm md:text-base tracking-wide uppercase text-white/90 drop-shadow-md">Destinations</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-bold text-3xl md:text-4xl mb-1 font-display drop-shadow-md">850+</span>
            <span className="text-white font-medium text-sm md:text-base tracking-wide uppercase text-white/90 drop-shadow-md">Tours / Packages</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-bold text-3xl md:text-4xl mb-1 font-display drop-shadow-md">500+</span>
            <span className="text-white font-medium text-sm md:text-base tracking-wide uppercase text-white/90 drop-shadow-md">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-bold text-3xl md:text-4xl mb-1 font-display drop-shadow-md">16+</span>
            <span className="text-white font-medium text-sm md:text-base tracking-wide uppercase text-white/90 drop-shadow-md">Years Experience</span>
          </div>
        </div>

        {/* Floating Arrows */}
        <div 
          onClick={prevSlide}
          className="absolute top-1/2 left-4 md:-left-12 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-all backdrop-blur-sm z-20"
        >
           <ChevronLeft size={24} />
        </div>
        <div 
          onClick={nextSlide}
          className="absolute top-1/2 right-4 md:-right-12 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white cursor-pointer hover:bg-white/20 transition-all backdrop-blur-sm z-20"
        >
           <ChevronRight size={24} />
        </div>
      </div>
      
      {/* Bottom slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-300 rounded-full ${currentSlide === idx ? 'w-8 h-2 bg-amber-500' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
