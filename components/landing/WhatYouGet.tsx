'use client';

import { Reveal, SCREEN_FRAME, Section, SectionHeading } from '@/components/landing/Section';

// Three things, each with a real capture of the product above the claim.
const ITEMS = [
  {
    title: 'Weekly numbers on your own videos',
    description:
      'Views, likes, comments, shares and follower change on every video you post, tracked week over week. One page, no spreadsheet.',
    example: 'Which of last week\'s posts actually moved followers, and by how much.',
    image: '/screens/dashboard.png',
    alt: 'The dashboard: followers across handles, the latest lab note, and three next moves',
  },
  {
    title: 'A beat map for every video',
    description:
      'Every video gets timestamped: hook, setup, build, payoff, CTA, and where people are most likely to swipe. Then we compare traits across all of them so you learn what wins for you, not for some average creator.',
    example: 'Payoff at 40 to 60 seconds, no tangents, heavy on-screen text: 3x your median.',
    image: '/screens/beat-map.png',
    alt: 'A beat map: hook, setup, build, payoff and CTA on a timeline, with the two moments viewers are most likely to swipe',
  },
  {
    title: 'The next one, written in your voice',
    description:
      'The Chemist knows your niche, your pillars, your voice and your numbers. Ask it what to post, why a video flopped, or to write the script for the next one.',
    example: '"Write the next version of my best video, same structure, new story."',
    image: '/screens/chemist.png',
    alt: 'The Chemist: write the next script, five hooks, or cook an idea, with today\'s post already suggested',
  },
];

export function WhatYouGet() {
  return (
    <Section id="what-you-get">
      <Reveal>
        <SectionHeading title={<>Research on other people&rsquo;s videos is a start. This is research on yours.</>} />
      </Reveal>

      <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
        {ITEMS.map((item) => (
          <article key={item.title} className="flex flex-col">
            <div className={`${SCREEN_FRAME} aspect-[4/3]`}>
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-left-top"
              />
            </div>
            <h3 className="font-heading text-xl font-semibold tracking-[-0.01em] text-ink mt-6 mb-2">{item.title}</h3>
            <p className="text-body text-ink-2 mb-4">{item.description}</p>
            <p className="mt-auto rounded-xl bg-sunken px-4 py-3 text-meta text-ink-2">{item.example}</p>
          </article>
        ))}
      </Reveal>
    </Section>
  );
}
