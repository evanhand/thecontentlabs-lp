export function NoiseOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]" aria-hidden="true">
      <svg width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
