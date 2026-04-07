export function HoverBubbles() {
  return (
    <>
      <span className="absolute bottom-2 left-[20%] w-2 h-2 rounded-full bg-content-coral/30 opacity-0 group-hover:animate-research-bubble pointer-events-none" />
      <span className="absolute bottom-2 left-[50%] w-1.5 h-1.5 rounded-full bg-content-coral-400/40 opacity-0 group-hover:animate-research-bubble pointer-events-none" style={{ animationDelay: '0.4s' }} />
      <span className="absolute bottom-2 left-[75%] w-2.5 h-2.5 rounded-full bg-content-coral/30 opacity-0 group-hover:animate-research-bubble pointer-events-none" style={{ animationDelay: '0.8s' }} />
    </>
  );
}
