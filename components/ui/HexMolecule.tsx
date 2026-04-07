import React from 'react';

export function HexMolecule({ size = 70, className = '', style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style}>
      <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill="none" stroke="rgba(244, 99, 42, 0.5)" strokeWidth="1.5" />
      <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(244, 99, 42, 0.3)" strokeWidth="1" />
      <line x1="7" y1="27.5" x2="93" y2="72.5" stroke="rgba(244, 99, 42, 0.3)" strokeWidth="1" />
      <line x1="93" y1="27.5" x2="7" y2="72.5" stroke="rgba(244, 99, 42, 0.3)" strokeWidth="1" />
      <circle cx="50" cy="5" r="3" fill="rgba(244, 99, 42, 0.5)" />
      <circle cx="93" cy="27.5" r="3" fill="rgba(244, 99, 42, 0.5)" />
      <circle cx="93" cy="72.5" r="3" fill="rgba(244, 99, 42, 0.5)" />
      <circle cx="50" cy="95" r="3" fill="rgba(244, 99, 42, 0.5)" />
      <circle cx="7" cy="72.5" r="3" fill="rgba(244, 99, 42, 0.5)" />
      <circle cx="7" cy="27.5" r="3" fill="rgba(244, 99, 42, 0.5)" />
      <circle cx="50" cy="50" r="4" fill="rgba(244, 99, 42, 0.4)" />
    </svg>
  );
}
