import { Atom, Send, User, Zap } from 'lucide-react';

const USER_Q = "What were my top performing videos? Why did they perform well?";

const AI_RESPONSE = `Your top 3 videos all share the same pattern:

1. "Stop posting every day" (312K) — Contrarian hook + data-backed claim
2. "How I grew to 100K" (284K) — Proof drop + specific number
3. "Why your hooks are failing" (221K) — Bold accusation + curiosity gap

All 3 lead with contrarian or bold hooks and deliver value through storytelling.`;

const QUICK_ACTIONS = [
  { label: 'Generate hooks', sub: 'Create scroll-stopping hooks' },
  { label: 'Write a script', sub: 'Viral short-form video script' },
  { label: 'Analyze content', sub: 'Find performance patterns' },
];

export function ChemistDemo() {
  return (
    <div className="chm-app">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chemist header */}
        <div className="bg-content-navy px-3.5 py-2 flex items-center gap-2.5 flex-shrink-0">
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

        {/* Chat area — static conversation */}
        <div className="flex-1 bg-gradient-to-b from-slate-50 to-white p-3 flex flex-col gap-2.5 overflow-y-auto">
          {/* Day divider */}
          <div className="text-center">
            <span className="text-[8px] text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-100">Today</span>
          </div>

          {/* AI welcome message */}
          <div className="flex justify-start">
            <div className="flex items-start max-w-[90%] gap-1.5">
              <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-content-coral to-content-coral-dark text-white">
                <Atom size={10} />
              </div>
              <div>
                <div className="rounded-2xl rounded-tl-sm px-2.5 py-2 bg-white border border-slate-200 text-slate-700 shadow-sm">
                  <p className="text-[10px] leading-relaxed">Hi there! I&apos;m <span className="font-semibold text-content-coral">The Chemist</span>, your content creation assistant. How can I help you today?</p>
                  <span className="text-[8px] text-slate-400 mt-0.5 block">just now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick action cards */}
          <div className="flex gap-1.5 pl-7.5">
            {QUICK_ACTIONS.map((action, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200/80 shadow-sm px-2 py-1.5 flex-1">
                <div className="flex items-center gap-1 mb-0.5">
                  <Zap size={8} className="text-content-coral" />
                  <span className="text-[9px] font-semibold text-slate-700">{action.label}</span>
                </div>
                <p className="text-[8px] text-slate-400 leading-relaxed">{action.sub}</p>
              </div>
            ))}
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div className="flex items-start max-w-[85%] flex-row-reverse gap-1.5">
              <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-content-navy text-white">
                <User size={10} />
              </div>
              <div className="rounded-2xl rounded-tr-sm px-2.5 py-2 bg-content-coral/[0.08] text-slate-700 border border-content-coral/10">
                <p className="text-[10px] leading-relaxed">{USER_Q}</p>
                <span className="text-[8px] text-slate-400 mt-0.5 block">just now</span>
              </div>
            </div>
          </div>

          {/* AI response */}
          <div className="flex justify-start">
            <div className="flex items-start max-w-[90%] gap-1.5">
              <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-content-coral to-content-coral-dark text-white">
                <Atom size={10} />
              </div>
              <div>
                <div className="rounded-2xl rounded-tl-sm px-2.5 py-2 bg-white border border-slate-200 text-slate-700 shadow-sm">
                  <div className="text-[10px] leading-relaxed whitespace-pre-wrap">{AI_RESPONSE}</div>
                </div>
                {/* Sources pills */}
                <div className="flex items-center gap-1 mt-1.5">
                  <span className="text-[7px] text-slate-400">Sources:</span>
                  <span className="text-[7px] bg-content-coral/10 text-content-coral px-1.5 py-0.5 rounded-full border border-content-coral/15">Analytics</span>
                  <span className="text-[7px] bg-content-coral/10 text-content-coral px-1.5 py-0.5 rounded-full border border-content-coral/15">Performance Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="px-3 py-2 border-t border-slate-100 bg-white">
          <div className="relative">
            <div className="w-full border border-slate-200 rounded-2xl pl-3 pr-8 py-1.5 text-[10px] bg-white text-slate-400">
              Ask The Chemist anything...
            </div>
            <div className="w-5 h-5 bg-slate-200 rounded-lg flex items-center justify-center shadow-sm absolute right-1.5 top-1/2 -translate-y-1/2">
              <Send size={8} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[7px] text-slate-400">
            <Zap size={7} className="text-content-coral" />
            <span>2,495 credits remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
}
