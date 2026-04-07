'use client';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { ParallaxMolecules } from '@/components/ui/ParallaxMolecules';

export function DesktopEffects() {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return (
    <>
      <ScrollProgressBar />
      <NoiseOverlay />
      <ParallaxMolecules />
    </>
  );
}
