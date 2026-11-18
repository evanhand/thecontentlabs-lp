'use client';

import { Reveal, Section, SectionHeading } from '@/components/landing/Section';

const STEPS = [
  {
    step: '01',
    title: 'Connect your handles',
    description: 'TikTok, Instagram, YouTube. Tell us your niche, your pillars and how you talk. No card.',
  },
  {
    step: '02',
    title: 'We analyze your videos',
    description:
      'Every video gets a beat map and a set of traits. Across all of them we work out what wins for you: hook length, payoff timing, tangents, text, topic.',
  },
  {
    step: '03',
    title: 'Post what wins',
    description:
      'Your numbers arrive every week. The Chemist writes the next video in your voice from what worked. Paid plans add competitors, strategy and a calendar.',
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionHeading
          title="Three steps. The first one takes a minute."
          description="Give us your handles. We pull your videos and read them. You post what wins."
        />
      </Reveal>

      <Reveal>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
          {STEPS.map((s) => (
            <li key={s.step} className="border-t border-line/[0.14] pt-6">
              <span className={`block font-heading text-6xl font-semibold leading-none tracking-[-0.04em] tabular-nums mb-5 ${s.step === '01' ? 'text-content-coral' : 'text-ink/15'}`}>{s.step}</span>
              <h3 className="font-heading text-xl font-semibold tracking-[-0.01em] text-ink mb-2">{s.title}</h3>
              <p className="text-body text-ink-2">{s.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
