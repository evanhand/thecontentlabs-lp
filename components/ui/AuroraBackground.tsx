'use client';

import { useIsMobile } from '@/hooks/useIsMobile';

export function AuroraBackground({ variant = 'hero' }: { variant?: 'hero' | 'cta' }) {
  const isMobile = useIsMobile();

  // Skip blur blobs on mobile — blur-[120px] on large elements freezes phone GPUs
  if (isMobile) return null;

  const positions = variant === 'hero'
    ? { blob1: 'top-[-10%] left-[10%]', blob2: 'top-[10%] right-[5%]', blob3: 'top-[30%] left-[30%]' }
    : { blob1: 'bottom-[10%] left-[15%]', blob2: 'bottom-[-5%] right-[10%]', blob3: 'bottom-[20%] left-[40%]' };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className={`absolute ${positions.blob1} w-[500px] h-[500px] rounded-full bg-[#f4632a] opacity-[0.06] blur-[120px] animate-aurora-1`} />
      <div className={`absolute ${positions.blob2} w-[400px] h-[400px] rounded-full bg-[#f89673] opacity-[0.05] blur-[120px] animate-aurora-2`} />
      <div className={`absolute ${positions.blob3} w-[450px] h-[450px] rounded-full bg-[#ff6b4a] opacity-[0.04] blur-[120px] animate-aurora-3`} />
    </div>
  );
}
