'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LineChart, Microscope, Calendar, Atom, Send, User, TrendingUp, Eye, Zap } from 'lucide-react';

const PHASES = [
  { key: 'scan', label: 'Audit', icon: LineChart },
  { key: 'compete', label: 'Research', icon: Microscope },
  { key: 'plan', label: 'Calendar', icon: Calendar },
  { key: 'create', label: 'Chemist', icon: Atom },
] as const;

const PHASE_DURATION = 8000;

type PhaseKey = typeof PHASES[number]['key'];

/* -- Phase 1: Content Audit -- */
function ScanPhase() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 4500),
      setTimeout(() => setStep(4), 6500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const videos = [
    { title: 'How I grew to 100K fast', views: '284K', eng: '8.2%', score: 92 },
    { title: 'Stop posting every day', views: '312K', eng: '9.4%', score: 96 },
    { title: 'The editing trick no one uses', views: '142K', eng: '6.1%', score: 78 },
    { title: 'Why your hooks are failing', views: '221K', eng: '7.3%', score: 85 },
  ];

  return (
    <div className="flex flex-col h-full p-4 gap-3 overflow-y-auto overflow-x-hidden">
      {/* Scanning header */}
      {step >= 1 && (
        <div className="hero-stagger" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-gradient-to-br from-content-coral to-content-coral-dark rounded-lg">
              <LineChart size={13} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-slate-800">Scanning Your Content</p>
              <p className="text-[9px] text-slate-400">{step < 3 ? 'Analyzing performance data...' : '4 videos analyzed'}</p>
            </div>
            {step < 3 && <div className="w-3.5 h-3.5 border-2 border-content-coral border-t-transparent rounded-full animate-spin" />}
            {step >= 3 && <div className="w-5 h-5 rounded-full bg-content-coral flex items-center justify-center text-[9px] text-white font-bold">&#10003;</div>}
          </div>
        </div>
      )}

      {/* Video rows */}
      {step >= 2 && (
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          {videos.map((v, i) => (
            <div
              key={i}
              className="hero-stagger flex items-center gap-3 px-3.5 py-3 border-b border-slate-100 last:border-0"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-slate-700 truncate">{v.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[9px] text-slate-400 flex items-center gap-1"><Eye size={8} />{v.views}</span>
                  <span className="text-[9px] text-content-coral-600 flex items-center gap-1"><TrendingUp size={8} />{v.eng}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className={`text-[11px] font-bold ${v.score >= 90 ? 'text-content-coral' : 'text-slate-500'}`}>{v.score}</span>
                <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full hero-score-fill"
                    style={{
                      '--score-width': `${v.score}%`,
                      background: v.score >= 90
                        ? 'linear-gradient(90deg, #f4632a, #f67a4e)'
                        : 'linear-gradient(90deg, #cbd5e1, #94a3b8)',
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Competitor scan */}
      {step >= 3 && (
        <div className="hero-stagger" style={{ animationDelay: '0s' }}>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-gradient-to-br from-content-coral to-content-coral-dark rounded-lg">
              <Microscope size={13} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-slate-800">Analyzing Competitors</p>
              <p className="text-[9px] text-slate-400">{step < 4 ? 'Scanning 4 accounts...' : '195 videos analyzed'}</p>
            </div>
            {step < 4 && <div className="w-3.5 h-3.5 border-2 border-content-coral border-t-transparent rounded-full animate-spin" />}
            {step >= 4 && <div className="w-5 h-5 rounded-full bg-content-coral flex items-center justify-center text-[9px] text-white font-bold">&#10003;</div>}
          </div>
        </div>
      )}

      {/* Key insights */}
      {step >= 4 && (
        <div className="flex flex-col gap-2.5">
          <div className="hero-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3.5" style={{ animationDelay: '0s', borderLeft: '3px solid #f4632a' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Zap size={10} className="text-content-coral" />
              <span className="text-[9px] font-bold text-content-coral uppercase tracking-wider">Key Insight</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Your <strong className="text-slate-700">contrarian hooks</strong> outperform by 3.2x. Competitors favor <strong className="text-slate-700">breakdowns</strong> — a format gap you can own.
            </p>
          </div>
          <div className="hero-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3.5" style={{ animationDelay: '0.15s', borderLeft: '3px solid #fb923c' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp size={10} className="text-amber-500" />
              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider">Opportunity</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Your <strong className="text-slate-700">first 3 seconds</strong> lose 40% of viewers. Top competitors retain 78% past the hook.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* -- Phase 2: Competitor Research -- */
function CompetePhase() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-[140px] flex-shrink-0 border-r border-slate-100 bg-white p-2.5 flex flex-col gap-0.5">
        <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">Sections</p>
        {[
          { label: 'Audit Summary', active: true },
          { label: "What's Working" },
          { label: "What's Not Working" },
          { label: 'What This Means' },
          { label: 'Competitor Videos' },
        ].map((s) => (
          <div key={s.label} className={`px-2 py-1.5 rounded-lg text-[9px] transition-colors ${s.active ? 'bg-content-coral/8 text-content-coral font-semibold' : 'text-slate-400 hover:text-slate-600'}`}>
            {s.label}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-3.5 overflow-hidden flex flex-col gap-2.5">
        <span className="text-[11px] font-bold text-slate-800">Audit Summary</span>

        <div className="hero-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3 text-[10px] text-slate-500 leading-relaxed" style={{ animationDelay: '0.15s' }}>
          Your top competitors dominate by positioning themselves as authoritative sources. They use a <strong className="text-slate-700">&apos;breakdown&apos; format</strong> with rapid cuts, split screens, and kinetic text overlays.
        </div>

        <span className="text-[11px] font-bold text-slate-800 mt-0.5">What&apos;s Working</span>

        <div className="hero-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.35s' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[18px] h-[18px] rounded-md bg-content-coral text-white text-[9px] font-bold flex items-center justify-center">1</div>
            <span className="text-[10px] font-bold text-slate-700">The &apos;Proof Drop&apos; Hook Archetype</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed">Top videos lead with a massive, specific number for credibility. Hooks like <em className="text-slate-600">&apos;This creator hit 140M views...&apos;</em> have 50% higher engagement.</p>
          <div className="mt-2 bg-content-coral/5 border border-content-coral/10 rounded-lg p-2 text-[9px] text-content-coral-700">
            Begin videos by stating the single most impressive, quantifiable result.
          </div>
        </div>

        <div className="hero-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.55s' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[18px] h-[18px] rounded-md bg-content-coral text-white text-[9px] font-bold flex items-center justify-center">2</div>
            <span className="text-[10px] font-bold text-slate-700">Creator Case Study Format</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-relaxed">The most saved format analyzes other creators&apos; strategies. Average save-to-like ratio over 60%.</p>
          <div className="mt-2 bg-content-coral/5 border border-content-coral/10 rounded-lg p-2 text-[9px] text-content-coral-700">
            Deconstruct well-known figures into simple, numbered frameworks.
          </div>
        </div>
      </div>
    </div>
  );
}

/* -- Phase 3: Content Calendar -- */
const PLAN_POSTS: { day: number; title: string; badge: 'tof' | 'mof' | 'bof' }[] = [
  { day: 1,  title: "Why I track 'Conversation Rate' instead of Engagement Rate",  badge: 'tof' },
  { day: 2,  title: "The 'Silent Launch' strategy that built my first 10K",         badge: 'mof' },
  { day: 3,  title: "You don't need more followers, you need better hooks",         badge: 'tof' },
  { day: 4,  title: "How to clone your best content into 5 new formats",            badge: 'bof' },
  { day: 5,  title: "Analyzing the 'Proof Drop' hook archetype",                    badge: 'tof' },
  { day: 6,  title: "The 'Infinite Repurpose' system for busy founders",            badge: 'bof' },
  { day: 7,  title: "Most founders get content completely wrong",                   badge: 'tof' },
  { day: 8,  title: "Deconstructing viral hooks frame by frame",                    badge: 'mof' },
  { day: 9,  title: "Why 'Consistency' is the worst content advice",                badge: 'tof' },
  { day: 10, title: "The 4 layers of authority content that converts",              badge: 'mof' },
  { day: 11, title: "How to automate your entire content pipeline",                 badge: 'bof' },
  { day: 12, title: "The 'Founder-Led' content play nobody talks about",            badge: 'tof' },
  { day: 13, title: "A breakdown of 3 videos that hit 1M views",                    badge: 'mof' },
  { day: 14, title: "Stop trying to go viral and do this instead",                  badge: 'mof' },
  { day: 15, title: "The 'Content Operating System' I use every week",              badge: 'bof' },
  { day: 16, title: "Why I fired my social media manager",                          badge: 'tof' },
  { day: 17, title: "The 'Specific Knowledge' edge in content",                     badge: 'mof' },
  { day: 18, title: "How to turn a single comment into $10K",                       badge: 'bof' },
  { day: 19, title: "The death of 'Edutainment' and what replaces it",              badge: 'tof' },
  { day: 20, title: "Case Study: 0 to 50K followers in 90 days",                    badge: 'mof' },
  { day: 21, title: "The 'Minimum Viable Hook' framework",                          badge: 'tof' },
  { day: 22, title: "How to build a 'Content Moat' competitors can't copy",         badge: 'bof' },
  { day: 23, title: "The 80/20 of Content Creation for founders",                   badge: 'mof' },
  { day: 24, title: "Why I'm betting everything on long-form video",                badge: 'tof' },
];

const PLAN_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const planPostMap = new Map(PLAN_POSTS.map(p => [p.day, p]));

const BADGE_COLORS = {
  tof: { bg: '#f4632a', light: '#fef2ee', border: '#fdddd0' },
  mof: { bg: '#fb923c', light: '#fff7ed', border: '#fed7aa' },
  bof: { bg: '#64748b', light: '#f1f5f9', border: '#e2e8f0' },
};

function PlanPhase() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = PLAN_POSTS.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), 80 + i * 65)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col h-full">
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
        <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center text-[8px] text-slate-400 cursor-pointer hover:bg-slate-50">&lsaquo;</div>
        <button className="text-[7px] font-semibold bg-content-coral text-white rounded px-2 py-0.5">Today</button>
        <div className="w-4 h-4 rounded border border-slate-200 flex items-center justify-center text-[8px] text-slate-400 cursor-pointer hover:bg-slate-50">&rsaquo;</div>
        <div className="ml-auto text-[10px] font-extrabold text-slate-800">March 2026</div>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="grid grid-cols-7 bg-white border-b border-slate-100">
          {PLAN_DAYS.map(d => (
            <div key={d} className="text-center text-[7px] font-semibold text-slate-400 py-1">{d}</div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7 grid-rows-4 gap-px bg-slate-100 overflow-hidden">
          {Array.from({ length: 28 }, (_, i) => {
            const day = i + 1;
            const post = planPostMap.get(day);
            const postIdx = post ? PLAN_POSTS.indexOf(post) : -1;
            const show = post && postIdx < visibleCount;
            const colors = post ? BADGE_COLORS[post.badge] : null;

            return (
              <div
                key={i}
                className={`bg-white flex flex-col p-[5px] cursor-pointer transition-colors hover:bg-slate-50 ${day === 1 ? 'bg-content-coral/[0.03]' : ''}`}
              >
                <div className={`text-[9px] font-medium leading-none mb-[4px] ${day === 1 ? 'text-content-coral font-bold' : 'text-slate-400'}`}>{day}</div>
                {post && colors && (
                  <div
                    className="rounded px-[5px] py-[4px] transition-all duration-300 flex flex-col gap-[3px] flex-1"
                    style={{
                      opacity: show ? 1 : 0,
                      transform: show ? 'scale(1)' : 'scale(0.85)',
                      background: colors.light,
                      borderLeft: `2px solid ${colors.bg}`,
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
          })}
        </div>
      </div>

      {/* Legend bar */}
      <div className="bg-white border-t border-slate-100 px-3 py-1.5 flex items-center gap-3 flex-shrink-0">
        <span className="text-[7px] text-slate-400 font-medium">{Math.min(visibleCount, PLAN_POSTS.length)}/24 posts planned</span>
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
  );
}

/* -- Phase 4: The Chemist -- */
function CreatePhase() {
  const [typedText, setTypedText] = useState('');
  const [showBot, setShowBot] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const fullText = `Your top 3 videos all share the same pattern:

1. "Stop posting every day" (312K) — Contrarian hook + data-backed claim
2. "How I grew to 100K" (284K) — Proof drop + specific number
3. "Why your hooks are failing" (221K) — Bold accusation + curiosity gap

All 3 lead with contrarian or bold hooks and deliver value through storytelling.`;

  useEffect(() => {
    const botTimer = setTimeout(() => setShowBot(true), 600);
    let idx = 0;
    const typeTimer = setInterval(() => {
      if (idx < fullText.length) {
        idx++;
        setTypedText(fullText.slice(0, idx));
      } else {
        clearInterval(typeTimer);
      }
    }, 14);
    const sourceTimer = setTimeout(() => setShowSources(true), 3500);
    return () => { clearTimeout(botTimer); clearInterval(typeTimer); clearTimeout(sourceTimer); };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Chemist header — dark accent bar */}
      <div className="bg-content-navy px-3.5 py-2 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-content-coral to-content-coral-dark flex items-center justify-center">
          <Atom size={13} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-semibold text-white">The Chemist</p>
          <p className="text-[8px] text-white/40">Your AI Content Strategist</p>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-content-coral/15 border border-content-coral/20">
          <div className="w-1.5 h-1.5 rounded-full bg-content-coral animate-pulse" />
          <span className="text-[7px] text-content-coral-300 font-medium">Online</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-gradient-to-b from-slate-50 to-white p-3 flex flex-col gap-2.5 overflow-hidden">
        {/* User message */}
        <div className="flex justify-end animate-fade-in">
          <div className="flex items-start max-w-[85%] flex-row-reverse gap-1.5">
            <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-content-navy text-white">
              <User size={10} />
            </div>
            <div className="rounded-2xl rounded-tr-sm px-2.5 py-2 bg-content-coral/8 text-slate-700 border border-content-coral/10">
              <p className="text-[10px] leading-relaxed">What were my top performing videos? Why did they perform well?</p>
              <span className="text-[8px] text-slate-400 mt-0.5 block">just now</span>
            </div>
          </div>
        </div>

        {/* Bot message */}
        {showBot && (
          <div className="flex justify-start animate-fade-in">
            <div className="flex items-start max-w-[90%] gap-1.5">
              <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-content-coral to-content-coral-dark text-white">
                <Atom size={10} />
              </div>
              <div className="flex flex-col">
                <div className="rounded-2xl rounded-tl-sm px-2.5 py-2 bg-white border border-slate-200 text-slate-700 shadow-sm">
                  <div className="text-[10px] leading-relaxed whitespace-pre-wrap">
                    {typedText}
                    {typedText.length < fullText.length && <span className="hero-typing-cursor" />}
                  </div>
                  <span className="text-[8px] text-slate-400 mt-0.5 block">just now</span>
                </div>

                {showSources && (
                  <div className="flex flex-wrap items-center gap-1 mt-1.5 hero-stagger" style={{ animationDelay: '0s' }}>
                    <span className="text-[7px] font-semibold text-slate-400 uppercase tracking-wider">Sources:</span>
                    {['Your Videos', 'Analytics', 'Viral Patterns'].map(source => (
                      <span key={source} className="inline-flex items-center px-1.5 py-0.5 text-[7px] font-medium text-content-coral-600 bg-content-coral/5 border border-content-coral/10 rounded-full">
                        {source}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="px-3 py-2 border-t border-slate-100 bg-white">
        <div className="relative">
          <input
            type="text"
            readOnly
            placeholder="Ask The Chemist anything about content creation..."
            className="w-full border border-slate-200 rounded-2xl pl-3 pr-8 py-1.5 text-[10px] bg-white text-slate-400 focus:outline-none cursor-default"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-content-coral rounded-lg flex items-center justify-center shadow-sm">
            <Send size={8} className="text-white" />
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1 text-[7px] text-slate-400">
          <Zap size={7} className="text-content-coral" />
          <span>2,495 credits remaining</span>
        </div>
      </div>
    </div>
  );
}

/* -- Main Demo Component -- */
interface HeroProductDemoProps {
  scrollProgress?: number;
}

export function HeroProductDemo({ scrollProgress }: HeroProductDemoProps) {
  const isScrollLinked = scrollProgress !== undefined;

  const [activePhase, setActivePhase] = useState<PhaseKey>('scan');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [phaseKey, setPhaseKey] = useState(0);

  const prevScrollPhase = useRef(-1);
  useEffect(() => {
    if (!isScrollLinked) return;
    const phaseIndex = Math.min(Math.floor(scrollProgress! * PHASES.length), PHASES.length - 1);
    if (phaseIndex !== prevScrollPhase.current) {
      prevScrollPhase.current = phaseIndex;
      setActivePhase(PHASES[phaseIndex].key);
      setPhaseKey(k => k + 1);
    }
    const phaseProgress = (scrollProgress! * PHASES.length - phaseIndex) * 100;
    setProgress(Math.min(phaseProgress, 100));
  }, [scrollProgress, isScrollLinked]);

  const activeIndex = PHASES.findIndex(p => p.key === activePhase);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const progressRef = useRef(0);

  const goToPhase = useCallback((key: PhaseKey) => {
    setActivePhase(key);
    setProgress(0);
    progressRef.current = 0;
    setPhaseKey(prev => prev + 1);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (isPaused || isScrollLinked) return;
    const increment = 100 / (PHASE_DURATION / 50);
    const interval = setInterval(() => {
      progressRef.current += increment;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        const next = (activeIndexRef.current + 1) % PHASES.length;
        setActivePhase(PHASES[next].key);
        setPhaseKey(k => k + 1);
        setProgress(0);
      } else {
        setProgress(progressRef.current);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused, isScrollLinked]);

  return (
    <div
      className="hero-demo"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Step tabs — clean top bar */}
      <div className="flex items-center gap-1 px-3 py-2 bg-white border-b border-slate-100">
        {PHASES.map((phase, i) => {
          const isActive = activePhase === phase.key;
          const isPast = i < activeIndex;
          return (
            <button
              key={phase.key}
              onClick={() => goToPhase(phase.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all duration-200
                ${isActive
                  ? 'text-content-coral bg-content-coral/8'
                  : isPast
                    ? 'text-slate-500 hover:bg-slate-50'
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
            >
              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-all
                ${isActive
                  ? 'bg-content-coral text-white'
                  : isPast
                    ? 'bg-content-coral/60 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isPast ? '\u2713' : i + 1}
              </div>
              <span className="hidden sm:inline">{phase.label}</span>
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-content-coral to-content-coral-dark transition-[width] duration-300 ease-linear"
          style={{ width: `${((activeIndex * 100) + progress) / PHASES.length}%` }}
        />
      </div>

      {/* Content area */}
      <div className="hero-demo-body">
        <div key={`scan-${phaseKey}`} className={`hero-phase ${activePhase === 'scan' ? 'active' : ''}`}>
          <ScanPhase />
        </div>
        <div key={`compete-${phaseKey}`} className={`hero-phase ${activePhase === 'compete' ? 'active' : ''}`}>
          <CompetePhase />
        </div>
        <div key={`plan-${phaseKey}`} className={`hero-phase ${activePhase === 'plan' ? 'active' : ''}`}>
          <PlanPhase />
        </div>
        <div key={`create-${phaseKey}`} className={`hero-phase ${activePhase === 'create' ? 'active' : ''}`}>
          <CreatePhase />
        </div>
      </div>
    </div>
  );
}
