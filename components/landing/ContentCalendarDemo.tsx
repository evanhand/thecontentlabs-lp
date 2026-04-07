'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Calendar, ChevronLeft } from 'lucide-react';

interface ContentCalendarDemoProps {
  isVisible: boolean;
}

const PLAN_POSTS: { day: number; title: string; badge: 'tof' | 'mof' | 'bof' }[] = [
  { day: 1,  title: "Why I track 'Conversation Rate' instead of Engagement Rate", badge: 'tof' },
  { day: 2,  title: "The 'Silent Launch' strategy that built my first 10K", badge: 'mof' },
  { day: 3,  title: "You don't need more followers, you need better hooks", badge: 'tof' },
  { day: 4,  title: "How to clone your best content into 5 new formats", badge: 'bof' },
  { day: 5,  title: "Analyzing the 'Proof Drop' hook archetype", badge: 'tof' },
  { day: 6,  title: "The 'Infinite Repurpose' system for busy founders", badge: 'bof' },
  { day: 7,  title: "Most founders get content completely wrong", badge: 'tof' },
  { day: 8,  title: "Deconstructing viral hooks frame by frame", badge: 'mof' },
  { day: 9,  title: "Why 'Consistency' is the worst content advice", badge: 'tof' },
  { day: 10, title: "The 4 layers of authority content that converts", badge: 'mof' },
  { day: 11, title: "How to automate your entire content pipeline", badge: 'bof' },
  { day: 12, title: "The 'Founder-Led' content play nobody talks about", badge: 'tof' },
  { day: 13, title: "A breakdown of 3 videos that hit 1M views", badge: 'mof' },
  { day: 14, title: "Stop trying to go viral and do this instead", badge: 'mof' },
  { day: 15, title: "The 'Content Operating System' I use every week", badge: 'bof' },
  { day: 16, title: "Why I fired my social media manager", badge: 'tof' },
  { day: 17, title: "The 'Specific Knowledge' edge in content", badge: 'mof' },
  { day: 18, title: "How to turn a single comment into $10K", badge: 'bof' },
  { day: 19, title: "The death of 'Edutainment' and what replaces it", badge: 'tof' },
  { day: 20, title: "Case Study: 0 to 50K followers in 90 days", badge: 'mof' },
  { day: 21, title: "The 'Minimum Viable Hook' framework", badge: 'tof' },
  { day: 22, title: "How to build a 'Content Moat' competitors can't copy", badge: 'bof' },
  { day: 23, title: "The 80/20 of Content Creation for founders", badge: 'mof' },
  { day: 24, title: "Why I'm betting everything on long-form video", badge: 'tof' },
];

const BADGE_COLORS = {
  tof: { bg: '#f4632a', light: '#fef2ee' },
  mof: { bg: '#fb923c', light: '#fff7ed' },
  bof: { bg: '#64748b', light: '#f1f5f9' },
};

const HOOKS = [
  "\"If you're still tracking engagement rate in 2026, you are optimizing for being broke.\"",
  "\"I stopped checking my view count six months ago. Here is the only metric that actually pays the bills.\"",
  "\"Your viral video is useless if it doesn't start a conversation.\"",
];

const OUTLINE = [
  "Hook: Challenge the obsession with likes and views.",
  "The Problem: High engagement = broad appeal = low intent.",
  "The Solution: Introduce 'Conversation Rate' (DMs per 1k views).",
  "The Logic: Why conversation is the highest-leverage asset.",
  "The Shift: From 'entertaining' to 'provoking inquiry'.",
  "CTA: Soft opt-in to learn the system.",
];

const postMap = new Map(PLAN_POSTS.map(p => [p.day, p]));

export function ContentCalendarDemo({ isVisible }: ContentCalendarDemoProps) {
  const [activeScreen, setActiveScreen] = useState<'calendar' | 'detail'>('calendar');
  const [visiblePosts, setVisiblePosts] = useState<Set<number>>(new Set());
  const timersRef = useRef<number[]>([]);
  const detailBodyRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const kill = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const wait = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const openDetail = useCallback(() => {
    setActiveScreen('detail');

    wait(100, () => {
      sectionRefs.current.forEach(el => el?.classList.add('show'));

      const body = detailBodyRef.current;
      if (!body) return;
      body.scrollTop = 0;

      const scrollDuration = 6000;
      let startTime: number | null = null;

      function smoothScroll(ts: number) {
        if (!startTime) startTime = ts;
        const elapsed = ts - startTime;
        const progress = Math.min(elapsed / scrollDuration, 1);
        const eased = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
        const totalScroll = body!.scrollHeight - body!.clientHeight;
        body!.scrollTop = eased * totalScroll;
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(smoothScroll);
        }
      }

      wait(800, () => {
        rafRef.current = requestAnimationFrame(smoothScroll);
      });
    });
  }, [wait]);

  const backToCalendar = useCallback(() => {
    kill();
    sectionRefs.current.forEach(el => el?.classList.remove('show'));
    setActiveScreen('calendar');
    setVisiblePosts(new Set());
  }, [kill]);

  const animateCalendar = useCallback(() => {
    setVisiblePosts(new Set());

    PLAN_POSTS.forEach((post, i) => {
      wait(80 + i * 65, () => {
        setVisiblePosts(prev => new Set(prev).add(post.day));
      });
    });

    // After all cards shown + pause, open detail
    wait(80 + PLAN_POSTS.length * 65 + 1200, () => {
      openDetail();
    });
  }, [wait, openDetail]);

  // When detail scroll finishes, wait then go back to calendar
  useEffect(() => {
    if (activeScreen !== 'detail' || !isVisible) return;

    // Wait for scroll to finish (800ms delay + 6000ms scroll + buffer), then loop
    const loopTimer = window.setTimeout(() => {
      backToCalendar();
      // Small delay then re-animate calendar
      const restartTimer = window.setTimeout(() => {
        animateCalendar();
      }, 200);
      timersRef.current.push(restartTimer);
    }, 8000);
    timersRef.current.push(loopTimer);

    return () => {};
  }, [activeScreen, isVisible, backToCalendar, animateCalendar]);

  useEffect(() => {
    if (isVisible) {
      setActiveScreen('calendar');
      setVisiblePosts(new Set());
      wait(100, () => animateCalendar());
    }
    return () => kill();
  }, [isVisible, animateCalendar, wait, kill]);

  const cells = [];
  for (let i = 0; i < 28; i++) {
    const day = i + 1;
    const post = postMap.get(day);
    const colors = post ? BADGE_COLORS[post.badge] : null;
    const show = visiblePosts.has(day);

    cells.push(
      <div
        key={i}
        className={`bg-white flex flex-col p-[5px] cursor-pointer hover:bg-slate-50${day === 1 ? ' bg-content-coral/[0.03]' : ''}`}
      >
        <div className={`text-[9px] font-medium leading-none mb-[4px] ${day === 1 ? 'text-content-coral font-bold' : 'text-slate-400'}`}>{day}</div>
        {post && colors && (
          <div
            className="rounded px-[5px] py-[4px] flex flex-col gap-[3px] flex-1"
            style={{
              background: colors.light,
              borderLeft: `2px solid ${colors.bg}`,
              opacity: show ? 1 : 0,
              transform: show ? 'scale(1)' : 'scale(0.85)',
              transition: 'all 0.3s',
            }}
          >
            <div className="text-[7.5px] font-semibold text-slate-600 leading-[1.25] line-clamp-2">{post.title}</div>
            <div
              className="text-[6px] font-bold text-white rounded-sm px-[5px] py-[2px] leading-none self-start mt-auto"
              style={{ background: colors.bg }}
            >
              {post.badge.toUpperCase()}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="ccl-app">
      {/* CALENDAR SCREEN */}
      <div className={`ccl-screen${activeScreen === 'calendar' ? ' on' : ''}`}>
        {/* Top bar */}
        <div className="bg-white border-b border-slate-100 px-3 py-2 flex items-center gap-2 flex-shrink-0">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-content-coral to-content-coral-dark flex items-center justify-center">
            <Calendar size={10} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-slate-800 leading-tight">Content Calendar</div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-content-coral animate-pulse" />
              <span className="text-[7px] text-content-coral">Generating your 30-day plan</span>
            </div>
          </div>
          <button className="text-[7px] font-semibold bg-content-coral text-white rounded-md px-2 py-1 whitespace-nowrap shadow-sm">+ New Content</button>
        </div>

        {/* Month nav */}
        <div className="bg-white border-b border-slate-50 px-3 py-1.5 flex items-center gap-1.5 flex-shrink-0">
          <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center text-[8px] text-slate-400">&lsaquo;</div>
          <button className="text-[7px] font-semibold bg-content-coral text-white rounded px-2 py-0.5">Today</button>
          <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center text-[8px] text-slate-400">&rsaquo;</div>
          <div className="ml-auto text-[10px] font-extrabold text-slate-800">March 2026</div>
        </div>

        {/* Calendar grid */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="grid grid-cols-7 bg-white border-b border-slate-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-[7px] font-semibold text-slate-400 py-1">{d}</div>
            ))}
          </div>
          <div className="flex-1 grid grid-cols-7 grid-rows-4 gap-px bg-slate-100 overflow-hidden">
            {cells}
          </div>
        </div>

        {/* Legend bar */}
        <div className="bg-white border-t border-slate-100 px-3 py-1.5 flex items-center gap-3 flex-shrink-0">
          <span className="text-[7px] text-slate-400 font-medium">{Math.min(visiblePosts.size, PLAN_POSTS.length)}/24 posts planned</span>
          <div className="ml-auto flex items-center gap-2">
            {[
              { label: 'TOF', color: BADGE_COLORS.tof.bg },
              { label: 'MOF', color: BADGE_COLORS.mof.bg },
              { label: 'BOF', color: BADGE_COLORS.bof.bg },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
                <span className="text-[6px] text-slate-400 font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DETAIL SCREEN */}
      <div className={`ccl-screen${activeScreen === 'detail' ? ' on' : ''}`}>
        {/* Detail top bar */}
        <div className="bg-white border-b border-slate-100 px-3 py-2 flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-[8px] text-slate-400">
            <ChevronLeft size={10} />
            <span>Calendar</span>
            <span className="text-slate-300">&rsaquo;</span>
            <span className="text-slate-700 font-semibold truncate">Why I track &apos;Conversation Rate&apos;...</span>
          </div>
          <button className="ml-auto text-[7px] font-semibold bg-content-coral text-white rounded-md px-2 py-1 whitespace-nowrap shadow-sm">Edit Content</button>
        </div>

        {/* Detail hero */}
        <div className="bg-content-navy px-3 py-2 flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 rounded-lg bg-content-coral flex items-center justify-center">
            <Calendar size={10} className="text-white" />
          </div>
          <div>
            <div className="text-[9px] font-bold text-white">Awareness</div>
            <div className="text-[7px] text-white/50">Created: February 20, 2026</div>
          </div>
        </div>

        {/* Scrollable detail body */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2" ref={detailBodyRef} style={{ scrollbarWidth: 'none' }}>
          {/* Title + Why This Works */}
          <div className="ccl-detail-section bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" ref={el => { sectionRefs.current[0] = el; }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="bg-content-coral/10 text-content-coral text-[7px] font-bold px-1.5 py-0.5 rounded-full">TOP OF FUNNEL</span>
              <span className="text-[7px] text-slate-400">Saturday, February 28</span>
            </div>
            <div className="text-[11px] font-extrabold text-slate-800 leading-tight mb-2">
              Why I track &apos;Conversation Rate&apos; instead of Engagement Rate.
            </div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[8px] font-bold text-content-coral">WHY THIS WORKS</span>
            </div>
            <p className="text-[8px] text-slate-500 leading-relaxed">
              This concept directly addresses the &apos;unique value&apos; proposition of systems over vanity metrics. It filters the audience immediately: influencers care about likes; founders care about business.
            </p>
          </div>

          {/* Hooks */}
          <div className="ccl-detail-section bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" ref={el => { sectionRefs.current[1] = el; }}>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[8px] font-bold text-slate-700">HOOKS</span>
              <span className="bg-red-50 text-red-500 text-[7px] font-semibold px-1.5 py-0.5 rounded-full">Contrarian</span>
            </div>
            {HOOKS.map((h, i) => (
              <div key={i} className="flex items-start gap-2 py-1.5 border-b border-slate-50 last:border-0">
                <div className="w-4 h-4 rounded-full bg-content-coral/10 border border-content-coral/20 flex items-center justify-center text-[7px] font-bold text-content-coral flex-shrink-0 mt-0.5">{i + 1}</div>
                <p className="text-[8px] text-slate-600 italic leading-relaxed">{h}</p>
              </div>
            ))}
          </div>

          {/* Script Outline + Frameworks */}
          <div className="grid grid-cols-2 gap-2">
            <div className="ccl-detail-section bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" ref={el => { sectionRefs.current[2] = el; }}>
              <div className="text-[8px] font-bold text-slate-700 mb-2">SCRIPT OUTLINE</div>
              {OUTLINE.map((o, i) => (
                <div key={i} className="flex items-start gap-1.5 mb-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-content-coral/10 flex items-center justify-center text-[6px] font-bold text-content-coral flex-shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-[7px] text-slate-500 leading-relaxed">{o}</p>
                </div>
              ))}
            </div>
            <div className="ccl-detail-section bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" ref={el => { sectionRefs.current[3] = el; }}>
              <div className="text-[8px] font-bold text-slate-700 mb-2">FRAMEWORKS</div>
              {['Contrarian Hook', 'The Pivot Framework', 'Outcome-Based Education'].map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-content-coral/10 flex items-center justify-center text-[6px] font-bold text-content-coral flex-shrink-0">{i + 1}</div>
                  <p className="text-[8px] text-slate-600">{f}</p>
                </div>
              ))}

              <div className="text-[8px] font-bold text-slate-700 mt-3 mb-1.5">ENGAGEMENT</div>
              <div className="text-[7px] text-slate-400 mb-0.5">CTA TYPE</div>
              <div className="bg-slate-50 rounded px-2 py-1 text-[7px] font-mono text-slate-600 mb-2">comment_keyword</div>
              <div className="text-[7px] text-slate-400 mb-0.5">PROMPTS</div>
              <p className="text-[7px] text-slate-500 leading-relaxed">
                1. Are you optimizing for views or revenue?<br />
                2. What&apos;s your current conversation rate?<br />
                3. Is engagement a vanity metric?
              </p>
            </div>
          </div>

          {/* Full Script */}
          <div className="ccl-detail-section bg-content-navy rounded-xl p-3" ref={el => { sectionRefs.current[4] = el; }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-bold text-white">FULL SCRIPT</span>
              <span className="text-[7px] text-slate-400">TELEPROMPTER VIEW</span>
            </div>
            <p className="text-[8px] text-slate-300 leading-relaxed">
              If you&apos;re still tracking engagement rate in 2026, you are optimizing for being broke. Most founders look at a video with 50,000 views and 2,000 likes and think they won. I look at that and ask: &apos;Where are the leads?&apos;
              <br /><br />
              The algorithm loves engagement, but your bank account loves conversations. That is why I stopped optimizing for retention and started optimizing for &apos;Conversation Rate.&apos;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
