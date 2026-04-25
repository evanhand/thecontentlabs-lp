'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_DARK } from '@/lib/logos';

const FEATURE_LINKS = [
  { to: '/features/video-audit', label: 'Video Audit' },
  { to: '/features/competitor-analysis', label: 'Competitor Analysis' },
  { to: '/features/content-strategy', label: 'Content Strategy' },
  { to: '/features/content-calendar', label: 'Content Calendar' },
  { to: '/features/ai-chatbot', label: 'The Chemist' },
];

const RESOURCE_LINKS = [
  { to: '/blog', label: 'Studies & guides', sub: '6 data studies + 24 guides' },
  { to: '/trends', label: 'Live trends', sub: 'Updated monthly · April 2026' },
  { to: '/playbooks', label: 'Niche playbooks', sub: '6 niches, ranked by data' },
];

export function PublicNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-5">
      <nav
        className={`max-w-6xl mx-auto transition-all duration-500 rounded-2xl bg-[#0f172a]/85 backdrop-blur-xl border border-white/[0.06] ${
          isScrolled
            ? 'shadow-lg shadow-black/20'
            : 'shadow-md shadow-black/10'
        }`}
      >
        <div className="px-5 sm:px-6">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img
                src={LOGO_DARK}
                alt="The Content Labs"
                width={501}
                height={151}
                className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'} w-auto`}
              />
            </a>

            {/* Desktop nav links */}
            <nav className="hidden md:flex md:items-center md:gap-0.5">
              {/* Features dropdown */}
              <div className="relative group">
                <button
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 text-slate-300 hover:text-white"
                >
                  Features
                  <svg className="h-3 w-3 opacity-40 transition-transform group-hover:rotate-180 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="rounded-xl bg-[#0f172a] shadow-xl shadow-black/20 border border-white/[0.06] py-1.5 w-52">
                    {FEATURE_LINKS.map((item) => (
                      <a
                        key={item.to}
                        href={item.to}
                        className="block px-3.5 py-2 text-sm transition-colors text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href="/pricing"
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors text-slate-300 hover:text-white"
              >
                Pricing
              </a>
              <a
                href="/compare"
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors text-slate-300 hover:text-white"
              >
                Compare
              </a>
              {/* Resources dropdown */}
              <div className="relative group">
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 text-slate-300 hover:text-white">
                  Resources
                  <svg className="h-3 w-3 opacity-40 transition-transform group-hover:rotate-180 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="rounded-xl bg-[#0f172a] shadow-xl shadow-black/20 border border-white/[0.06] py-1.5 w-64">
                    {RESOURCE_LINKS.map((item) => (
                      <a
                        key={item.to}
                        href={item.to}
                        className="block px-3.5 py-2.5 transition-colors text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      >
                        <span className="block text-sm font-semibold">{item.label}</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">{item.sub}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Right side: auth + CTA */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/login"
                className="hidden md:block px-3 py-1.5 rounded-lg text-sm transition-colors text-slate-500 hover:text-slate-300"
              >
                Log In
              </a>
              <a
                href="/register"
                className="hidden md:inline-flex bg-gradient-to-r from-content-cta-dark to-content-cta hover:from-content-cta hover:to-content-cta-dark text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm shadow-content-cta/25 hover:shadow-md hover:shadow-content-cta/40 hover:scale-[1.02] active:scale-95"
              >
                Get Your Plan
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors text-slate-400 hover:text-white"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden border-t overflow-hidden border-white/[0.06]"
            >
              <div className="px-4 py-3 space-y-0.5">
                <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Features
                </p>
                {FEATURE_LINKS.map((item) => (
                  <a
                    key={item.to}
                    href={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm transition-colors text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="my-2 border-t border-white/[0.06]" />
                <a
                  href="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-slate-400 hover:text-white hover:bg-white/[0.05]"
                >
                  Pricing
                </a>
                <a
                  href="/compare"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-slate-400 hover:text-white hover:bg-white/[0.05]"
                >
                  Compare
                </a>
                <p className="px-3 py-1.5 mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Resources
                </p>
                {RESOURCE_LINKS.map((item) => (
                  <a
                    key={item.to}
                    href={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm transition-colors text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-3 mt-2 border-t border-white/[0.06] flex flex-col gap-2">
                  <a
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 text-center rounded-lg text-sm transition-colors text-slate-500 hover:text-white"
                  >
                    Log In
                  </a>
                  <a
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 text-center bg-gradient-to-r from-content-cta-dark to-content-cta text-white rounded-xl text-sm font-semibold shadow-sm shadow-content-cta/25"
                  >
                    Get Your Plan
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
