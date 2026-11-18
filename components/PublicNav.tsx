'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_LIGHT } from '@/lib/logos';

const FEATURE_LINKS = [
  { to: '/features/video-audit', label: 'Video Audit' },
  { to: '/features/competitor-analysis', label: 'Competitor Analysis' },
  { to: '/features/content-strategy', label: 'Content Strategy' },
  { to: '/features/content-calendar', label: 'Content Calendar' },
  { to: '/features/ai-chatbot', label: 'The Chemist' },
];

const RESOURCE_LINKS = [
  { to: '/blog', label: 'Studies & guides', sub: '14 data studies + 31 guides' },
  { to: '/trends', label: 'Live trends', sub: 'Updated monthly · August 2026' },
  { to: '/playbooks', label: 'Niche playbooks', sub: '6 niches, ranked by data' },
];

const EASE = 'ease-[cubic-bezier(0.23,1,0.32,1)]';
const LINK = `px-3 py-2 rounded-[10px] text-sm font-medium text-ink-2 hover:text-ink hover:bg-ink/[0.04] transition-colors duration-150 ${EASE}`;
const MENU = 'rounded-xl bg-surface border border-line/[0.08] shadow-raised p-1.5';
const MENU_ITEM = `block rounded-[10px] px-3 py-2 text-sm text-ink-2 hover:text-ink hover:bg-sunken transition-colors duration-150 ${EASE}`;
const DROPDOWN = `absolute top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity duration-150 ${EASE} z-50`;

export function PublicNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const elevated = isScrolled || isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-canvas border-b transition-colors duration-200 ${EASE} ${
        elevated ? 'border-line/[0.08]' : 'border-transparent'
      }`}
    >
      <nav aria-label="Main" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="/" className="flex-shrink-0">
            <img src={LOGO_LIGHT} alt="The Content Labs" width={501} height={151} className="h-9 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex md:items-center md:gap-1">
            <div className="relative group">
              <button type="button" className={`${LINK} flex items-center gap-1`} aria-haspopup="true">
                Features
                <ChevronDown className="h-4 w-4 text-ink-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className={`${DROPDOWN} left-0`}>
                <div className={`${MENU} w-56`}>
                  {FEATURE_LINKS.map((item) => (
                    <a key={item.to} href={item.to} className={MENU_ITEM}>
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href="/pricing" className={LINK}>
              Pricing
            </a>
            <a href="/compare" className={LINK}>
              Compare
            </a>

            <div className="relative group">
              <button type="button" className={`${LINK} flex items-center gap-1`} aria-haspopup="true">
                Resources
                <ChevronDown className="h-4 w-4 text-ink-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className={`${DROPDOWN} right-0`}>
                <div className={`${MENU} w-64`}>
                  {RESOURCE_LINKS.map((item) => (
                    <a key={item.to} href={item.to} className={`${MENU_ITEM} py-2.5`}>
                      <span className="block font-medium text-ink">{item.label}</span>
                      <span className="block text-xs text-ink-3 mt-0.5">{item.sub}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Auth + CTA */}
          <div className="flex items-center gap-2">
            <a href="/login" className={`hidden md:block ${LINK}`}>
              Log In
            </a>
            <a
              href="/register"
              className={`hidden md:inline-flex items-center h-9 px-4 rounded-[10px] bg-ink text-canvas text-sm font-medium hover:bg-ink/90 active:scale-[0.97] transition-[background-color,transform] duration-150 ${EASE}`}
            >
              Get Your Plan
            </a>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden -mr-2 p-2 rounded-[10px] text-ink-2 hover:text-ink hover:bg-ink/[0.04] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden overflow-hidden border-t border-line/[0.08] bg-canvas"
          >
            <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-3 space-y-0.5">
              <p className="px-3 pt-1 pb-1.5 text-xs font-medium text-ink-3">Features</p>
              {FEATURE_LINKS.map((item) => (
                <a key={item.to} href={item.to} onClick={() => setIsMobileMenuOpen(false)} className={`${MENU_ITEM} py-2.5`}>
                  {item.label}
                </a>
              ))}
              <div className="my-2 border-t border-line/[0.08]" />
              <a href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className={`${MENU_ITEM} py-2.5 font-medium`}>
                Pricing
              </a>
              <a href="/compare" onClick={() => setIsMobileMenuOpen(false)} className={`${MENU_ITEM} py-2.5 font-medium`}>
                Compare
              </a>
              <p className="px-3 pt-3 pb-1.5 text-xs font-medium text-ink-3">Resources</p>
              {RESOURCE_LINKS.map((item) => (
                <a key={item.to} href={item.to} onClick={() => setIsMobileMenuOpen(false)} className={`${MENU_ITEM} py-2.5`}>
                  {item.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-line/[0.08] grid grid-cols-2 gap-2">
                <a
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-[10px] border border-line/[0.14] bg-surface text-sm font-medium text-ink"
                >
                  Log In
                </a>
                <a
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-11 items-center justify-center rounded-[10px] bg-ink text-canvas text-sm font-medium"
                >
                  Get Your Plan
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
