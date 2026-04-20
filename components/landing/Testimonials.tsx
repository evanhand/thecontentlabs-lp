'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useApprovedReviews } from '@/hooks/useApprovedReviews';
import { TiltCard } from '@/components/ui/TiltCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import useEmblaCarousel from 'embla-carousel-react';
import { fadeUp, fanIn, staggerContainer, VIEWPORT_ONCE } from '@/lib/motionVariants';

const HARDCODED_TESTIMONIALS = [
  { quote: "Helped me scale my coaching business so fast, I literally had to start saying no to people.", author: "Matt Gehlbach", role: "Full Time Firefighter & Business Owner", rating: 5, image: "/testimonials/matt-gehlbach.jpg" },
  { quote: "It's a detailed, strategic approach. Not just 'post consistently and hope for growth.'", author: "Manny Watkins", role: "Former D1 Basketball Star & Coach", rating: 5, image: "/testimonials/manny-watkins.jpg" },
  { quote: "This Content Strategy Was a Game Changer!", author: "Jen Thompson", role: "11-Time World Champion Powerlifter", rating: 5, image: "/testimonials/jen-thompson.jpg" },
];

export function Testimonials() {
  const approvedReviews = useApprovedReviews();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [slideStyles, setSlideStyles] = useState<Record<number, React.CSSProperties>>({});
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Depth effect: scale/fade non-active slides
  const updateSlideStyles = useCallback(() => {
    if (!emblaApi) return;
    const selected = emblaApi.selectedScrollSnap();
    const styles: Record<number, React.CSSProperties> = {};
    emblaApi.scrollSnapList().forEach((_, i) => {
      const isActive = i === selected;
      styles[i] = {
        transform: isActive ? 'scale(1)' : 'scale(0.95)',
        opacity: isActive ? 1 : 0.7,
        transition: 'transform 0.4s ease, opacity 0.4s ease',
      };
    });
    setSlideStyles(styles);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      updateSlideStyles();
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', updateSlideStyles);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', updateSlideStyles);
    };
  }, [emblaApi, updateSlideStyles]);

  // Auto-play testimonials carousel — pauses on hover
  useEffect(() => {
    if (!emblaApi || isCarouselHovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, isCarouselHovered]);

  const allTestimonials = [
    ...HARDCODED_TESTIMONIALS,
    ...approvedReviews.map(r => ({
      quote: r.body,
      author: r.display_name || 'Content Creator',
      role: r.title || 'Content Creator',
      rating: r.rating,
      image: r.photo_url || '',
    })),
  ];

  return (
    <section id="results" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-10 bg-content-navy">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
            They Stopped Guessing. Look What Happened.
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Real creators who used The Content Labs to build real audiences.
          </p>
        </motion.div>

        <div
          className="overflow-hidden embla-grab pt-4 -mt-4"
          ref={emblaRef}
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          <div className="flex gap-6">
            {allTestimonials.map((item, index) => (
              <div key={index} className="flex-[0_0_100%] md:flex-[0_0_calc(33.333%-16px)] min-w-0" style={slideStyles[index]}>
                <motion.div
                  initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
                  variants={fanIn(index % 3)}
                >
                  <TiltCard className="group relative h-full">
                    <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/70 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-content-coral/10 hover:border-content-coral/40 transition-all duration-300 h-full flex flex-col overflow-visible">
                      {/* Tab */}
                      <div className="absolute -top-3 left-6 bg-slate-800 border border-slate-700 border-b-slate-800 rounded-t-lg px-3 py-1 z-10">
                        <span className="font-mono text-[10px] text-slate-400 tracking-wider">{item.author.split(' ')[0].toUpperCase()}</span>
                      </div>

                      {/* VERIFIED stamp */}
                      <div className="absolute top-3 right-3 opacity-25 pointer-events-none z-10" style={{ transform: 'rotate(-10deg)' }}>
                        <span className="font-mono text-[10px] font-bold tracking-widest text-content-coral-400 border-2 border-content-coral-500/50 rounded px-2 py-0.5">VERIFIED</span>
                      </div>

                      <div className="p-6 pt-7 flex flex-col h-full">
                        <div className="flex gap-0.5 mb-5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                          ))}
                        </div>

                        <blockquote className="flex-1 text-slate-200 text-[15px] leading-relaxed mb-6">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>

                        <div className="flex items-center gap-3 pt-5 border-t border-slate-700/50">
                          <img
                            src={item.image || '/testimonials/placeholder.jpg'}
                            alt={item.author}
                            loading="lazy"
                            decoding="async"
                            width={44}
                            height={44}
                            className="w-11 h-11 rounded-full object-cover border border-slate-600 ring-2 ring-content-coral/20 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-white text-sm truncate">{item.author}</p>
                            <p className="text-slate-400 text-xs truncate">{item.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next arrows */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="w-10 h-10 rounded-full border border-slate-600 hover:border-content-coral/60 bg-slate-800/60 hover:bg-slate-700/80 flex items-center justify-center transition-all text-slate-400 hover:text-white"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-slate-500 text-sm font-mono tabular-nums">
            {selectedIndex + 1} / {scrollSnaps.length}
          </span>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="w-10 h-10 rounded-full border border-slate-600 hover:border-content-coral/60 bg-slate-800/60 hover:bg-slate-700/80 flex items-center justify-center transition-all text-slate-400 hover:text-white"
            aria-label="Next review"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mid-page CTA */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
          variants={fadeUp} transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <MagneticButton className="inline-block">
            <a
              href="/register"
              className="lab-bubbles group inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-semibold text-base text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Join 47,000+ Creators
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
