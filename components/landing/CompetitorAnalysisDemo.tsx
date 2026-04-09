'use client';

import { useState, useEffect, useRef } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Target, Film, Zap, Lightbulb } from 'lucide-react';

interface CompetitorAnalysisDemoProps {
  isVisible: boolean;
}

const SECTIONS = [
  { icon: BarChart3, label: 'Audit Summary' },
  { icon: TrendingUp, label: "What's Working" },
  { icon: AlertTriangle, label: "What's Not Working" },
  { icon: Target, label: 'What This Means' },
  { icon: Film, label: 'Competitor Videos' },
];

// Video metadata stored without hardcoded URLs so Next.js can't statically
// preload the images in the <head>. URLs are constructed at runtime inside
// the component via buildThumbUrl().
const VIDEO_CARDS = [
  { id: '3794850253648800310', platform: 'instagram' as const, overlay: 'Chiefs Stadium Heist', views: '1.62M', platformLabel: 'Instagram', platformColor: '#e1306c' },
  { id: '7606012853878869278', platform: 'tiktok' as const, overlay: 'Olympics Average Joe', views: '2.4M', platformLabel: 'TikTok', platformColor: '#ff0050' },
  { id: '3796935683559215123', platform: 'instagram' as const, overlay: 'NCAA Ruined This Kid', views: '1.56M', platformLabel: 'Instagram', platformColor: '#e1306c' },
  { id: '7497999929667849494', platform: 'tiktok' as const, overlay: 'FanDuel Got COOKED', views: '3.34M', platformLabel: 'TikTok', platformColor: '#ff0050' },
  { id: '3677190931440484746', platform: 'instagram' as const, overlay: 'NFL in Spain', views: '1.4M', platformLabel: 'Instagram', platformColor: '#e1306c' },
  { id: '7495467321801051423', platform: 'tiktok' as const, overlay: 'Lane Kiffin to LSU', views: '1.2M', platformLabel: 'TikTok', platformColor: '#ff0050' },
  { id: '3655143419764988026', platform: 'instagram' as const, overlay: 'Best Names in Basketball', views: '1.99M', platformLabel: 'Instagram', platformColor: '#e1306c' },
  { id: '7509979016523173163', platform: 'tiktok' as const, overlay: 'Alabama Ball Rule', views: '1.2M', platformLabel: 'TikTok', platformColor: '#ff0050' },
];

export function CompetitorAnalysisDemo({ isVisible }: CompetitorAnalysisDemoProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    const delay = currentSection < 4 ? 3200 : 5000;
    timerRef.current = setTimeout(() => {
      setCurrentSection((prev) => (prev < 4 ? prev + 1 : 0));
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible, currentSection]);

  return (
    <div className="cad-app">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-[140px] flex-shrink-0 border-r border-slate-100 bg-white p-2.5 flex flex-col gap-0.5">
          <p className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1.5">Sections</p>
          {SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <div key={i}>
                <div
                  className={`px-2 py-1.5 rounded-lg text-[9px] transition-colors flex items-center gap-1.5 ${
                    i === currentSection
                      ? 'bg-content-coral/8 text-content-coral font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  <span>{section.label}</span>
                </div>
                {i < 4 && (
                  <div
                    className={`w-[2px] h-2.5 ml-[13px] my-0.5 rounded-full transition-colors ${
                      i < currentSection ? 'bg-content-coral' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Content area */}
        <div className="flex-1 relative p-3 overflow-hidden">
          {/* VIEW 0: Audit Summary */}
          <div className={`cad-view${currentSection === 0 ? ' on' : ''}`}>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-3.5 h-3.5 text-content-coral" />
                <span className="text-[11px] font-bold text-slate-700">Audit Summary</span>
              </div>

              <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.1s' }}>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  Competitors like <strong className="text-slate-700">competitor</strong> and <strong className="text-slate-700">competitor</strong> are dominating the creator/entrepreneur niche by positioning themselves as authoritative sources of insider knowledge. They primarily use a <strong className="text-slate-700">&apos;breakdown&apos; format</strong>, deconstructing the success of other creators into digestible, 3-step frameworks. Their content succeeds by combining high-value, data-backed insights with a hyper-dynamic editing style.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <TrendingUp className="w-3.5 h-3.5 text-content-coral" />
                <span className="text-[11px] font-bold text-slate-700">What&apos;s Working</span>
              </div>

              <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[18px] h-[18px] rounded-md bg-content-coral text-white text-[9px] font-bold flex items-center justify-center">1</div>
                  <span className="text-[10px] font-bold text-slate-700">The &apos;Proof Drop&apos; Hook Archetype</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  Top-performing videos consistently lead with a massive, specific number to establish credibility and create intense curiosity.
                </p>
                <div className="mt-2 bg-content-coral/5 border border-content-coral/10 rounded-lg p-2 flex items-start gap-1.5">
                  <Lightbulb className="w-3 h-3 text-content-coral flex-shrink-0 mt-0.5" />
                  <span className="text-[9px] text-content-coral">Begin videos by stating the single most impressive, quantifiable result related to your topic.</span>
                </div>
              </div>
            </div>
          </div>

          {/* VIEW 1: What's Working */}
          <div className={`cad-view${currentSection === 1 ? ' on' : ''}`}>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-content-coral" />
                <span className="text-[11px] font-bold text-slate-700">What&apos;s Working</span>
              </div>

              <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[18px] h-[18px] rounded-md bg-content-coral text-white text-[9px] font-bold flex items-center justify-center">2</div>
                  <span className="text-[10px] font-bold text-slate-700">Creator Case Study / Breakdown Format</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  The most saved and shared format is the &apos;Creator Marketing&apos; breakdown - videos that analyze the strategy of another creator. These have an average save-to-like ratio of over 60%.
                </p>
                <div className="mt-2 bg-content-coral/5 border border-content-coral/10 rounded-lg p-2 flex items-start gap-1.5">
                  <Lightbulb className="w-3 h-3 text-content-coral flex-shrink-0 mt-0.5" />
                  <span className="text-[9px] text-content-coral">Leverage &apos;borrowed authority&apos; by deconstructing the success of well-known figures. Structure these into simple, numbered frameworks.</span>
                </div>
              </div>

              <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[18px] h-[18px] rounded-md bg-content-coral text-white text-[9px] font-bold flex items-center justify-center">3</div>
                  <span className="text-[10px] font-bold text-slate-700">Hyper-Dynamic, Info-Dense Editing</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  High-performing videos average a new visual element or cut every 1.5-2 seconds - a mix of split-screens, B-roll, animated text, and motion graphics.
                </p>
                <div className="mt-2 bg-content-coral/5 border border-content-coral/10 rounded-lg p-2 flex items-start gap-1.5">
                  <Lightbulb className="w-3 h-3 text-content-coral flex-shrink-0 mt-0.5" />
                  <span className="text-[9px] text-content-coral">Increase editing pace significantly. Every verbal point should be supported by a new visual on screen.</span>
                </div>
              </div>
            </div>
          </div>

          {/* VIEW 2: What's Not Working */}
          <div className={`cad-view${currentSection === 2 ? ' on' : ''}`}>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] font-bold text-slate-700">What&apos;s Not Working</span>
              </div>

              <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[18px] h-[18px] rounded-md bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">1</div>
                  <span className="text-[10px] font-bold text-slate-700">Static, Low-Energy Talking Head Videos</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  Lowest performing videos are single-take, unedited talking head clips. A video about email marketing received only 440 views on TikTok, despite a strong hook, due to its static presentation.
                </p>
                <div className="mt-2 bg-amber-50 border border-amber-200/60 rounded-lg p-2 flex items-start gap-1.5">
                  <Target className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[9px] text-amber-700">Avoid publishing unedited, single-take talking head videos. At minimum, use jump cuts and dynamic captions.</span>
                </div>
              </div>

              <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[18px] h-[18px] rounded-md bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">2</div>
                  <span className="text-[10px] font-bold text-slate-700">Weak or Indirect Hooks</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  Content beginning with slow, conversational questions fails. A video asking &apos;what would your advice be?&apos; received only 235 views - the hook must be bold within the first 2 seconds.
                </p>
                <div className="mt-2 bg-amber-50 border border-amber-200/60 rounded-lg p-2 flex items-start gap-1.5">
                  <Target className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[9px] text-amber-700">Never start with a slow question. The hook must be a bold claim or a massive proof point.</span>
                </div>
              </div>
            </div>
          </div>

          {/* VIEW 3: What This Means */}
          <div className={`cad-view${currentSection === 3 ? ' on' : ''}`}>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-3.5 h-3.5 text-content-coral" />
                <span className="text-[11px] font-bold text-slate-700">What This Means</span>
              </div>

              <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3 border-l-[3px] border-l-content-coral" style={{ animationDelay: '0.1s' }}>
                <p className="text-[9px] font-semibold text-content-coral mb-1">Overall Focus</p>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                  Your primary strategic focus should be to become the go-to authority for ambitious creators and marketers by providing hyper-actionable, framework-based case studies. Differentiate by combining the high-value &apos;breakdown&apos; format with a polished, high-energy editing style.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Zap className="w-3 h-3 text-content-coral" />
                    <span className="text-[10px] font-bold text-content-coral">Content Pillars</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div>
                      <p className="text-[9px] font-semibold text-slate-700">1. Creator Breakdowns</p>
                      <p className="text-[8px] text-slate-400 leading-relaxed">Deconstruct successful strategies into 3-step frameworks.</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-slate-700">2. Tactical Tutorials</p>
                      <p className="text-[8px] text-slate-400 leading-relaxed">Teach one specific, high-value skill per video.</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-slate-700">3. Contrarian Takes</p>
                      <p className="text-[8px] text-slate-400 leading-relaxed">Present counter-intuitive opinions to spark debate.</p>
                    </div>
                  </div>
                </div>

                <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm p-3" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Zap className="w-3 h-3 text-content-coral" />
                    <span className="text-[10px] font-bold text-content-coral">Hook Strategy</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div>
                      <p className="text-[9px] font-semibold text-slate-700">1. The Proof Drop Hook</p>
                      <p className="text-[8px] text-slate-400 leading-relaxed">Lead with the most impressive number you have.</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-slate-700">2. The Framework Hook</p>
                      <p className="text-[8px] text-slate-400 leading-relaxed">Promise a specific, numbered system upfront.</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold text-slate-700">3. The Contrarian Hook</p>
                      <p className="text-[8px] text-slate-400 leading-relaxed">Challenge a popular belief to create curiosity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VIEW 4: Competitor Videos */}
          <div className={`cad-view${currentSection === 4 ? ' on' : ''}`}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <Film className="w-3.5 h-3.5 text-content-coral" />
                <span className="text-[11px] font-bold text-slate-700">Competitor Videos</span>
              </div>

              {/* Search bar */}
              <div className="cad-stagger bg-white rounded-xl border border-slate-200/80 shadow-sm px-3 py-2 flex items-center gap-2" style={{ animationDelay: '0.1s' }}>
                <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
                <span className="text-[9px] text-slate-300">Search by caption or content idea...</span>
              </div>

              {/* Filter chips */}
              <div className="flex gap-1.5" style={{ animationDelay: '0.2s' }}>
                <div className="bg-white rounded-lg border border-content-coral/30 px-2 py-1 text-[8px] text-content-coral font-medium">All Platforms</div>
                <div className="bg-white rounded-lg border border-slate-200/80 px-2 py-1 text-[8px] text-slate-400">Date (Newest)</div>
                <div className="bg-white rounded-lg border border-slate-200/80 px-2 py-1 text-[8px] text-slate-400">Views (High to Low)</div>
              </div>

              {/* Video grid */}
              <div className="grid grid-cols-4 gap-1.5 overflow-hidden">
                {VIDEO_CARDS.map((card, i) => {
                  // Build URL at runtime so Next.js doesn't statically preload it
                  const thumbnailUrl = [
                    process.env.NEXT_PUBLIC_SUPABASE_URL,
                    'storage/v1/object/public/thumbnails',
                    card.platform,
                    `${card.id}.jpg`,
                  ].join('/');
                  return (
                    <div key={i} className="cad-stagger bg-white rounded-lg border border-slate-200/80 shadow-sm overflow-hidden" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                      <div className="relative w-full aspect-[9/14] bg-slate-800 overflow-hidden">
                        <img
                          src={thumbnailUrl}
                          alt={card.overlay}
                          loading="lazy"
                          decoding="async"
                          width={90}
                          height={140}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <div className="absolute top-1 right-1 bg-black/60 text-white text-[7px] font-semibold px-1 py-0.5 rounded">
                          {card.views}
                        </div>
                        <div className="absolute bottom-1 left-1 right-1 text-white text-[7px] font-bold leading-tight text-center drop-shadow-lg">
                          {card.overlay}
                        </div>
                      </div>
                      <div className="px-1.5 py-1">
                        <p className="text-[6px] font-semibold" style={{ color: card.platformColor }}>{card.platformLabel}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
