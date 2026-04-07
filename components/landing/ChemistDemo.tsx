'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Atom, Send, User, Zap, History, Brain } from 'lucide-react';

interface ChemistDemoProps {
  isVisible: boolean;
}

const USER_Q = "What were my top performing videos? Why did they perform well?";

const AI_RESPONSE = `Your top 3 videos all share the same pattern:

1. "Stop posting every day" (312K) — Contrarian hook + data-backed claim
2. "How I grew to 100K" (284K) — Proof drop + specific number
3. "Why your hooks are failing" (221K) — Bold accusation + curiosity gap

All 3 lead with contrarian or bold hooks and deliver value through storytelling.`;

const HISTORY_ITEMS = [
  { date: 'Feb 20', text: 'Analyze video performance patterns...' },
  { date: 'Feb 19', text: 'Write a script for viral short-form...' },
  { date: 'Feb 18', text: 'Give me hooks for value-based content' },
];

const MEMORY_ITEMS = [
  { text: 'Prefers contrarian-style hooks over question-based', date: 'Learned Feb 24' },
  { text: 'Best posting: TikTok 7-9am, Instagram 12-2pm', date: 'Learned Feb 20' },
  { text: 'Niche is creator/entrepreneur education', date: 'Learned Feb 18' },
];

const CONTEXT_SECTIONS = [
  { icon: User, label: 'Profile Info', fields: [{ key: 'Name', val: 'Your Name' }, { key: 'Niche', val: 'Creator Education' }] },
  { icon: Zap, label: 'Content Strategy', fields: [{ key: 'Style', val: 'Contrarian hooks' }, { key: 'Frequency', val: '5x per week' }] },
  { icon: Atom, label: 'Platforms', fields: [{ key: 'Primary', val: 'TikTok, Instagram' }] },
];

const QUICK_ACTIONS = [
  { label: 'Generate hooks', sub: 'Create scroll-stopping hooks' },
  { label: 'Write a script', sub: 'Viral short-form video script' },
  { label: 'Analyze content', sub: 'Find performance patterns' },
];

type TabKey = 'history' | 'memory' | 'context';

export function ChemistDemo({ isVisible }: ChemistDemoProps) {
  const [activeTab, setActiveTab] = useState<TabKey | null>(null);
  const timersRef = useRef<number[]>([]);

  const messagesRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);
  const userMsgRef = useRef<HTMLDivElement>(null);
  const userBubbleRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const responseBubbleRef = useRef<HTMLDivElement>(null);
  const sourcesRef = useRef<HTMLDivElement>(null);
  const inputTextRef = useRef<HTMLSpanElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const sendBtnRef = useRef<HTMLDivElement>(null);

  const kill = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const wait = useCallback((ms: number, fn: () => void) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const typeText = useCallback((el: HTMLElement, text: string, speed: number, done?: () => void, onTick?: () => void) => {
    let i = 0;
    el.textContent = '';
    function tick() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        if (i % 5 === 0) onTick?.();
        const id = window.setTimeout(tick, speed);
        timersRef.current.push(id);
      } else {
        onTick?.();
        done?.();
      }
    }
    tick();
  }, []);

  const scrollDown = useCallback(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = 9999;
  }, []);

  const show = (el: HTMLElement | null, display = 'flex') => {
    if (!el) return;
    el.style.display = display;
    el.style.transition = 'opacity 0.3s';
    el.style.opacity = '1';
  };

  const hide = (el: HTMLElement | null) => {
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => { el.style.display = 'none'; }, 300);
  };

  const runAnim = useCallback(() => {
    kill();
    setActiveTab(null);

    // Reset all elements
    [welcomeRef, quickRef, userMsgRef, typingRef, responseRef, sourcesRef].forEach(ref => {
      if (ref.current) { ref.current.style.opacity = '0'; ref.current.style.display = 'none'; }
    });
    if (inputTextRef.current) inputTextRef.current.textContent = '';
    if (placeholderRef.current) placeholderRef.current.style.display = 'inline';
    if (cursorRef.current) cursorRef.current.style.display = 'none';
    if (sendBtnRef.current) sendBtnRef.current.className = 'w-5 h-5 bg-slate-200 rounded-lg flex items-center justify-center shadow-sm transition-colors';
    if (messagesRef.current) messagesRef.current.scrollTop = 0;

    // 1 — Welcome fades in
    wait(400, () => {
      show(welcomeRef.current);
    });

    // 2 — Quick actions
    wait(800, () => {
      show(quickRef.current);
    });

    // 3 — User types in input
    wait(1200, () => {
      if (placeholderRef.current) placeholderRef.current.style.display = 'none';
      if (cursorRef.current) cursorRef.current.style.display = 'inline';

      typeText(inputTextRef.current!, USER_Q, 35, () => {
        if (sendBtnRef.current) sendBtnRef.current.className = 'w-5 h-5 bg-content-coral rounded-lg flex items-center justify-center shadow-sm transition-colors';

        // 4 — Send
        wait(400, () => {
          if (inputTextRef.current) inputTextRef.current.textContent = '';
          if (cursorRef.current) cursorRef.current.style.display = 'none';
          if (placeholderRef.current) placeholderRef.current.style.display = 'inline';
          if (sendBtnRef.current) sendBtnRef.current.className = 'w-5 h-5 bg-slate-200 rounded-lg flex items-center justify-center shadow-sm transition-colors';

          // Hide quick actions, show user msg
          hide(quickRef.current);
          if (userBubbleRef.current) userBubbleRef.current.textContent = USER_Q;
          show(userMsgRef.current);
          scrollDown();

          // 5 — Typing indicator
          wait(600, () => {
            show(typingRef.current);
            scrollDown();

            // 6 — AI response types out
            wait(1800, () => {
              hide(typingRef.current);
              wait(300, () => {
                if (responseBubbleRef.current) responseBubbleRef.current.textContent = '';
                show(responseRef.current);
                scrollDown();

                typeText(responseBubbleRef.current!, AI_RESPONSE, 15, () => {
                  scrollDown();

                  // Show sources pills
                  wait(300, () => {
                    show(sourcesRef.current);
                    scrollDown();

                    // 7 — Cycle tabs
                    wait(1000, () => {
                      setActiveTab('history');
                      wait(1500, () => {
                        setActiveTab('memory');
                        wait(1500, () => {
                          setActiveTab('context');
                          wait(1500, () => {
                            setActiveTab(null);
                            // Loop
                            wait(1500, () => runAnim());
                          });
                        });
                      });
                    });
                  });
                }, scrollDown);
              });
            });
          });
        });
      });
    });
  }, [kill, wait, typeText, scrollDown]);

  useEffect(() => {
    if (isVisible) {
      runAnim();
    }
    return () => kill();
  }, [isVisible, runAnim, kill]);

  const TABS: { key: TabKey; icon: typeof History; label: string }[] = [
    { key: 'history', icon: History, label: 'History' },
    { key: 'memory', icon: Brain, label: 'Memory' },
    { key: 'context', icon: User, label: 'Context' },
  ];

  return (
    <div className="chm-app">
      {/* Tab bar */}
      <div className="flex items-center border-b border-slate-100 bg-white px-2 py-1">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <div
              key={tab.key}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-medium transition-colors ${
                isActive ? 'bg-content-navy text-white' : 'text-slate-400'
              }`}
            >
              <Icon size={9} />
              {tab.label}
            </div>
          );
        })}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Side panel */}
        <div className={`chm-panel bg-white border-r border-slate-100 flex flex-col${activeTab ? ' open' : ''}`}>
          {/* History panel */}
          {activeTab === 'history' && (
            <div className="flex flex-col flex-1 overflow-hidden animate-fade-in">
              <div className="bg-content-navy px-3 py-2 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <History size={10} className="text-content-coral" />
                  <span className="text-[10px] font-semibold text-white">Chat History</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                <button className="w-full bg-content-coral text-white rounded-lg py-1.5 text-[9px] font-semibold">+ New Chat</button>
                {HISTORY_ITEMS.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-2">
                    <div className="text-[8px] text-slate-400 mb-0.5">{item.date}</div>
                    <div className="text-[9px] text-slate-600 leading-relaxed">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Memory panel */}
          {activeTab === 'memory' && (
            <div className="flex flex-col flex-1 overflow-hidden animate-fade-in">
              <div className="bg-content-navy px-3 py-2 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <Brain size={10} className="text-content-coral" />
                  <span className="text-[10px] font-semibold text-white">AI Memory</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                <button className="w-full bg-content-coral text-white rounded-lg py-1.5 text-[9px] font-semibold">+ Add Memory</button>
                {MEMORY_ITEMS.map((mem, i) => (
                  <div key={i} className="bg-slate-50 rounded-lg border border-slate-200/80 border-l-2 border-l-content-coral p-2">
                    <div className="text-[9px] text-slate-700 leading-relaxed">{mem.text}</div>
                    <div className="text-[7px] text-slate-400 mt-1">{mem.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Context panel */}
          {activeTab === 'context' && (
            <div className="flex flex-col flex-1 overflow-hidden animate-fade-in">
              <div className="bg-content-navy px-3 py-2 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <User size={10} className="text-content-coral" />
                  <span className="text-[10px] font-semibold text-white">Your Context</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {CONTEXT_SECTIONS.map((section, i) => {
                  const Icon = section.icon;
                  return (
                    <div key={i} className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-2">
                      <div className="flex items-center gap-1 mb-1.5">
                        <Icon size={9} className="text-content-coral" />
                        <span className="text-[9px] font-semibold text-slate-700">{section.label}</span>
                      </div>
                      {section.fields.map((f, j) => (
                        <div key={j} className="mb-1 last:mb-0">
                          <div className="text-[7px] text-slate-400 uppercase tracking-wider">{f.key}</div>
                          <div className="text-[9px] text-slate-700">{f.val}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div className="px-2 py-1.5 border-t border-slate-100">
                <p className="text-[7px] text-slate-400">The Chemist uses this context to personalize advice</p>
              </div>
            </div>
          )}
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chemist header — dark accent bar */}
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

          {/* Chat area */}
          <div className="flex-1 bg-gradient-to-b from-slate-50 to-white p-3 flex flex-col gap-2.5 overflow-y-auto" ref={messagesRef}>
            {/* Day divider */}
            <div className="text-center">
              <span className="text-[8px] text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-100">Today</span>
            </div>

            {/* AI welcome message */}
            <div ref={welcomeRef} style={{ opacity: 0, display: 'none' }} className="flex justify-start">
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
            <div ref={quickRef} style={{ opacity: 0, display: 'none' }} className="flex gap-1.5 pl-7.5">
              {QUICK_ACTIONS.map((action, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200/80 shadow-sm px-2 py-1.5 flex-1 cursor-pointer hover:border-content-coral/30 transition-colors">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Zap size={8} className="text-content-coral" />
                    <span className="text-[9px] font-semibold text-slate-700">{action.label}</span>
                  </div>
                  <p className="text-[8px] text-slate-400 leading-relaxed">{action.sub}</p>
                </div>
              ))}
            </div>

            {/* User message */}
            <div ref={userMsgRef} style={{ opacity: 0, display: 'none' }} className="flex justify-end">
              <div className="flex items-start max-w-[85%] flex-row-reverse gap-1.5">
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-content-navy text-white">
                  <User size={10} />
                </div>
                <div className="rounded-2xl rounded-tr-sm px-2.5 py-2 bg-content-coral/[0.08] text-slate-700 border border-content-coral/10">
                  <p ref={userBubbleRef} className="text-[10px] leading-relaxed" />
                  <span className="text-[8px] text-slate-400 mt-0.5 block">just now</span>
                </div>
              </div>
            </div>

            {/* Typing indicator */}
            <div ref={typingRef} style={{ opacity: 0, display: 'none' }} className="flex justify-start">
              <div className="flex items-start max-w-[90%] gap-1.5">
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-content-coral to-content-coral-dark text-white">
                  <Atom size={10} />
                </div>
                <div className="rounded-2xl rounded-tl-sm px-2.5 py-2 bg-white border border-slate-200 text-slate-700 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 border-[1.5px] border-slate-200 border-t-content-coral rounded-full" style={{ animation: 'chm-spin 0.8s linear infinite' }} />
                    <span className="text-[9px] text-slate-500">Analyzing content patterns...</span>
                    <div className="flex gap-0.5">
                      <div className="w-1 h-1 rounded-full bg-content-coral" style={{ animation: 'chm-dotPulse 1.2s 0.2s infinite' }} />
                      <div className="w-1 h-1 rounded-full bg-content-coral" style={{ animation: 'chm-dotPulse 1.2s 0.4s infinite' }} />
                      <div className="w-1 h-1 rounded-full bg-content-coral" style={{ animation: 'chm-dotPulse 1.2s 0.6s infinite' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI response */}
            <div ref={responseRef} style={{ opacity: 0, display: 'none' }} className="flex justify-start">
              <div className="flex items-start max-w-[90%] gap-1.5">
                <div className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-content-coral to-content-coral-dark text-white">
                  <Atom size={10} />
                </div>
                <div>
                  <div className="rounded-2xl rounded-tl-sm px-2.5 py-2 bg-white border border-slate-200 text-slate-700 shadow-sm">
                    <div ref={responseBubbleRef} className="text-[10px] leading-relaxed whitespace-pre-wrap" />
                  </div>
                  {/* Sources pills */}
                  <div ref={sourcesRef} style={{ opacity: 0, display: 'none' }} className="flex items-center gap-1 mt-1.5">
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
              <div className="w-full border border-slate-200 rounded-2xl pl-3 pr-8 py-1.5 text-[10px] bg-white text-slate-700 flex items-center overflow-hidden whitespace-nowrap">
                <span ref={placeholderRef} className="text-slate-400">Ask The Chemist anything...</span>
                <span ref={inputTextRef} className="text-slate-700" />
                <span ref={cursorRef} className="chm-typing-cursor" style={{ display: 'none' }} />
              </div>
              <div
                ref={sendBtnRef}
                className="w-5 h-5 bg-slate-200 rounded-lg flex items-center justify-center shadow-sm transition-colors absolute right-1.5 top-1/2 -translate-y-1/2"
              >
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
    </div>
  );
}
