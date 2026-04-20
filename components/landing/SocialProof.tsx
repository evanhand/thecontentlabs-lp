'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { MarqueeRow } from '@/components/ui/MarqueeRow';
import { supabase } from '@/lib/supabase';
import { springSnappy } from '@/lib/motionVariants';

const STORAGE_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/thumbnails`;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function SocialProof() {
  const [thumbnailPaths, setThumbnailPaths] = useState<string[]>([]);

  useEffect(() => {
    async function fetchThumbnails() {
      const fetchAll = async (folder: string) => {
        const all: string[] = [];
        let offset = 0;
        const PAGE = 1000;
        while (true) {
          const { data } = await supabase.storage.from('thumbnails').list(folder, { limit: PAGE, offset });
          if (!data || data.length === 0) break;
          for (const f of data) {
            if (f.name && !f.name.startsWith('.') && (f.metadata?.size ?? 1) > 0) all.push(`${folder}/${f.name}`);
          }
          if (data.length < PAGE) break;
          offset += PAGE;
        }
        return all;
      };
      const [tkPaths, igPaths] = await Promise.all([fetchAll('tiktok'), fetchAll('instagram')]);
      const target = 200;
      const perPlatform = Math.ceil(target / 2);
      const pickRandom = (arr: string[], n: number) => shuffle(arr).slice(0, n);
      const balanced = shuffle([...pickRandom(tkPaths, perPlatform), ...pickRandom(igPaths, perPlatform)]);
      setThumbnailPaths(balanced);
    }
    fetchThumbnails();
  }, []);

  const marqueeRows = useMemo(() => {
    const urls = thumbnailPaths.map(p => `${STORAGE_BASE}/${p}`);
    const chunkSize = Math.ceil(urls.length / 4);
    return [
      urls.slice(0, chunkSize),
      urls.slice(chunkSize, chunkSize * 2),
      urls.slice(chunkSize * 2, chunkSize * 3),
      urls.slice(chunkSize * 3),
    ];
  }, [thumbnailPaths]);

  return (
    <section className="pt-16 pb-16 relative overflow-hidden z-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider mb-8"
        >
          Real results from real creators
        </motion.p>

        {/* Readout panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={springSnappy}
          className="relative gradient-border rounded-2xl bg-white p-8"
        >
          <div className="lab-readout-scan absolute inset-0 rounded-2xl pointer-events-none" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { end: 1500000, suffix: '+', label: 'Followers Gained' },
              { end: 10000, suffix: '+', label: 'Videos Analyzed' },
              { end: 50, suffix: '+', label: 'Niches Covered' },
            ].map((stat, i) => (
              <div key={stat.label} className={`${i < 2 ? 'sm:border-r sm:border-dashed sm:border-slate-200' : ''}`}>
                <p className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-1">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="font-mono text-xs tracking-wider uppercase text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      {marqueeRows[0].length > 0 && (
        <div className="relative">
          <p className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Videos analyzed across 50+ niches</p>
          <div className="space-y-3">
            <MarqueeRow urls={marqueeRows[0]} direction="left" />
            <MarqueeRow urls={marqueeRows[1]} direction="right" />
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      )}
    </section>
  );
}
