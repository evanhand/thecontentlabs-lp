import { BarChart3, TrendingUp, AlertTriangle, Target, Film, Lightbulb } from 'lucide-react';

const SECTIONS = [
  { icon: BarChart3, label: 'Audit Summary' },
  { icon: TrendingUp, label: "What's Working" },
  { icon: AlertTriangle, label: "What's Not Working" },
  { icon: Target, label: 'What This Means' },
  { icon: Film, label: 'Competitor Videos' },
];

export function CompetitorAnalysisDemo() {
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
                  className={`px-2 py-1.5 rounded-lg text-[9px] flex items-center gap-1.5 ${
                    i === 0
                      ? 'bg-content-coral/8 text-content-coral font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  <Icon className="w-3 h-3 flex-shrink-0" />
                  <span>{section.label}</span>
                </div>
                {i < 4 && (
                  <div className={`w-[2px] h-2.5 ml-[13px] my-0.5 rounded-full ${i < 0 ? 'bg-content-coral' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Content area — static Audit Summary view */}
        <div className="flex-1 p-3 overflow-hidden">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-3.5 h-3.5 text-content-coral" />
              <span className="text-[11px] font-bold text-slate-700">Audit Summary</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-3">
              <p className="text-[9px] text-slate-500 leading-relaxed">
                Competitors like <strong className="text-slate-700">competitor</strong> and <strong className="text-slate-700">competitor</strong> are dominating the creator/entrepreneur niche by positioning themselves as authoritative sources of insider knowledge. They primarily use a <strong className="text-slate-700">&apos;breakdown&apos; format</strong>, deconstructing the success of other creators into digestible, 3-step frameworks.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <TrendingUp className="w-3.5 h-3.5 text-content-coral" />
              <span className="text-[11px] font-bold text-slate-700">What&apos;s Working</span>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-3">
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
      </div>
    </div>
  );
}
