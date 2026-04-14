import { Calendar } from 'lucide-react';

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

const postMap = new Map(PLAN_POSTS.map(p => [p.day, p]));

export function ContentCalendarDemo() {
  const cells = [];
  for (let i = 0; i < 28; i++) {
    const day = i + 1;
    const post = postMap.get(day);
    const colors = post ? BADGE_COLORS[post.badge] : null;

    cells.push(
      <div key={i} className={`bg-white flex flex-col p-[5px]${day === 1 ? ' bg-content-coral/[0.03]' : ''}`}>
        <div className={`text-[9px] font-medium leading-none mb-[4px] ${day === 1 ? 'text-content-coral font-bold' : 'text-slate-400'}`}>{day}</div>
        {post && colors && (
          <div
            className="rounded px-[5px] py-[4px] flex flex-col gap-[3px] flex-1"
            style={{ background: colors.light, borderLeft: `2px solid ${colors.bg}` }}
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
      <div className="ccl-screen on">
        {/* Top bar */}
        <div className="bg-white border-b border-slate-100 px-3 py-2 flex items-center gap-2 flex-shrink-0">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-content-coral to-content-coral-dark flex items-center justify-center">
            <Calendar size={10} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-slate-800 leading-tight">Content Calendar</div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-green-500" />
              <span className="text-[7px] text-green-600">24 posts planned</span>
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
          <span className="text-[7px] text-slate-400 font-medium">24/24 posts planned</span>
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
    </div>
  );
}
