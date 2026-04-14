import React from 'react';
import { Eye, TrendingUp, Users, BarChart3, Heart } from 'lucide-react';

const STATS = [
  { icon: Eye, label: 'Total Views', value: '1.2M', change: '+24%' },
  { icon: Heart, label: 'Engagement', value: '8.4%', change: '+12%' },
  { icon: Users, label: 'Followers', value: '48.2K', change: '+18%' },
  { icon: BarChart3, label: 'Avg. Score', value: '82', change: '+5pts' },
];

const BARS = [
  { label: 'Tutorials', value: '42%', width: '84%' },
  { label: 'Storytelling', value: '28%', width: '56%' },
  { label: 'Behind Scenes', value: '18%', width: '36%' },
  { label: 'Trending', value: '12%', width: '24%' },
];

export function AnalyticsDemo() {
  return (
    <div className="aly-app flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-100 px-3.5 py-2 flex items-center justify-between flex-shrink-0">
        <div>
          <div className="text-[11px] font-bold text-slate-800">Analytics Overview</div>
          <div className="text-[8px] text-slate-400">Last 30 days performance</div>
        </div>
        <div className="flex gap-1">
          <div className="px-2 py-0.5 rounded-full text-[8px] font-medium border border-slate-200 text-slate-400">7d</div>
          <div className="px-2 py-0.5 rounded-full text-[8px] font-semibold bg-content-coral text-white">30d</div>
          <div className="px-2 py-0.5 rounded-full text-[8px] font-medium border border-slate-200 text-slate-400">90d</div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-3 flex flex-col gap-3 overflow-hidden">
        {/* Stat cards row */}
        <div className="grid grid-cols-4 gap-2">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-content-coral/10 flex items-center justify-center">
                    <Icon size={12} className="text-content-coral" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] text-slate-400">{stat.label}</p>
                    <p className="text-[13px] font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <span className="text-[9px] font-semibold text-content-coral">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-[2fr_1fr] gap-2 flex-1 min-h-0">
          {/* Line chart */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-3 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-bold text-slate-800">Growth Trend</div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-content-coral" />
                  <span className="text-[8px] text-slate-400">Views</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-content-coral/40" />
                  <span className="text-[8px] text-slate-400">Followers</span>
                </div>
              </div>
            </div>
            <svg className="flex-1 w-full" viewBox="0 0 400 140" preserveAspectRatio="none">
              {[0, 35, 70, 105, 140].map(y => (
                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              <defs>
                <linearGradient id="alyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f4632a" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#f4632a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,120 L40,105 L80,95 L120,100 L160,80 L200,70 L240,55 L280,45 L320,35 L360,20 L400,10 L400,140 L0,140 Z" fill="url(#alyGrad)" />
              <path d="M0,120 L40,105 L80,95 L120,100 L160,80 L200,70 L240,55 L280,45 L320,35 L360,20 L400,10" fill="none" stroke="#f4632a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0,130 L40,125 L80,118 L120,115 L160,108 L200,100 L240,90 L280,82 L320,70 L360,60 L400,50" fill="none" stroke="#fac0aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
            </svg>
          </div>

          {/* Bar breakdown */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-3 flex flex-col">
            <div className="text-[10px] font-bold text-slate-800 mb-2">Top Formats</div>
            <div className="flex flex-col gap-2.5 flex-1 justify-center">
              {BARS.map((bar) => (
                <div key={bar.label} className="flex items-center gap-2">
                  <span className="text-[8px] text-slate-500 w-16 text-right flex-shrink-0">{bar.label}</span>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden flex-1">
                    <div className="h-full rounded-full" style={{ width: bar.width, background: 'linear-gradient(90deg, #f4632a, #f67a4e)' }} />
                  </div>
                  <span className="text-[8px] font-bold text-slate-700 w-7 flex-shrink-0">{bar.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
