'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal, Section, SectionHeading } from '@/components/landing/Section';

const faqData = [
  { q: "Can't I just use ChatGPT for this?", a: "ChatGPT has never seen your videos or your numbers. We pull every video you post, timestamp it, score its traits and compare them against your own median. The Chemist answers from that, not from the internet's average advice." },
  { q: "Will this work for my niche?", a: "We've built strategies across 50+ niches, from fitness to finance to cooking to real estate. But we don't use templates. Your strategy is built from what's already going viral in your specific niche, with your specific competitors. If people are posting content in your space, we can break down exactly what's working." },
  { q: "Do I need a big following to start?", a: "Not at all. This is built for creators who are starting out or stuck. Manny went from zero to 30,000 followers with the strategy we gave him. You don't need a following to start. You need a plan." },
  { q: "Will the scripts sound like me?", a: "The Chemist writes from your own transcripts, so it has your phrasing, your pacing and the structure of your videos that worked. It's your voice with the tangents cut out." },
  { q: "What if I don't like it?", a: "The free plan is free for good: your numbers every week, three videos analyzed, 20 Chemist messages a month, no card. If you go paid and it's not for you, cancel in two clicks. No contracts." },
  { q: "How much does it cost?", a: "Free is $0 and stays that way. Starter is $19/month ($5 for your first month) and analyzes every video you post, with 4 competitors, a monthly strategy and a 30-day calendar. Pro is $39/month ($5 first month) with daily tracking, 6 competitors and a weekly refresh. Studio is $99/month for agencies. Yearly billing is two months free." },
  { q: "How is this different from other content tools?", a: "Most content tools give you a list of topic ideas and call it a day. We give you full scripts with hooks, CTAs, emotional flow, and pacing, all built from real data on what's actually performing in your niche. We also break down your competitors' best videos so you can see exactly why they went viral. It's the difference between \"post about trending topics\" and \"here's your script, here's the hook, here's why it works.\"" },
];

/** Accordion list inside one card. Shared by the home page and /pricing. */
export function FAQList({ items }: { items: { q: string; a: string }[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="lab-card divide-y divide-line/[0.08] overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openFaq === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left text-[15px] font-medium text-ink hover:bg-sunken/60 transition-colors duration-150 focus-visible:outline-none focus-visible:bg-sunken"
              >
                <span>{item.q}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 flex-shrink-0 text-ink-3 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
              <div>
                <p className="px-5 sm:px-6 pb-5 text-body text-ink-2 max-w-[65ch]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FAQ() {
  return (
    <Section id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
        <Reveal>
          <SectionHeading title="Still have questions?" description="We get it. Here's the straight answer." />
        </Reveal>
        <Reveal>
          <FAQList items={faqData} />
        </Reveal>
      </div>
    </Section>
  );
}
