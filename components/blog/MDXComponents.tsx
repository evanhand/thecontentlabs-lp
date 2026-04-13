import { ArrowRight, Check, X } from "lucide-react";

/* -- CTA Block -- */
export function CTA({
  text = "Get My 30-Day Content Plan",
  href = "/pricing",
}: {
  text?: string;
  href?: string;
}) {
  return (
    <section className="not-prose bg-gradient-to-br from-content-coral/5 to-content-coral/10 rounded-xl p-8 text-center my-8">
      <a
        href={href}
        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-content-cta-dark to-content-cta rounded-xl font-bold text-white shadow-lg shadow-content-cta/25 hover:shadow-xl hover:shadow-content-cta/40 transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {text}
        <ArrowRight className="ml-3 h-5 w-5" />
      </a>
    </section>
  );
}

/* -- Comparison Table -- */
interface ComparisonFeature {
  name: string;
  us: boolean;
  them: boolean;
}

export function ComparisonTable({
  features,
  usLabel = "Content Labs",
  themLabel = "Competitor",
}: {
  features: ComparisonFeature[];
  usLabel?: string;
  themLabel?: string;
}) {
  return (
    <div className="not-prose overflow-x-auto my-8">
      <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-slate-50">
            <th className="text-left px-4 py-3 font-semibold text-slate-900">
              Feature
            </th>
            <th className="text-center px-4 py-3 font-semibold text-content-coral">
              {usLabel}
            </th>
            <th className="text-center px-4 py-3 font-semibold text-slate-500">
              {themLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.name} className="border-t border-slate-100">
              <td className="px-4 py-3 text-slate-700">{f.name}</td>
              <td className="px-4 py-3 text-center">
                {f.us ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {f.them ? (
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                ) : (
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -- Callout -- */
export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "tip" | "warning";
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    tip: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
  };
  return (
    <div
      className={`not-prose rounded-xl border p-4 my-6 text-sm leading-relaxed ${styles[type]}`}
    >
      {children}
    </div>
  );
}

/* -- Stat Card -- */
export function StatCard({
  stat,
  label,
}: {
  stat: string;
  label: string;
}) {
  return (
    <div className="not-prose bg-slate-50 rounded-xl border border-slate-200 p-5 text-center">
      <p className="text-3xl font-bold text-content-coral">{stat}</p>
      <p className="text-sm text-slate-600 mt-1">{label}</p>
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
      {children}
    </div>
  );
}

/* -- Video Embed (self-hosted) -- */
export function VideoEmbed({
  src,
  caption,
  poster,
}: {
  src: string;
  caption?: string;
  poster?: string;
}) {
  return (
    <figure className="not-prose my-8">
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        poster={poster}
        className="w-full rounded-xl border border-slate-200"
      />
      {caption && (
        <figcaption className="text-sm text-slate-500 text-center mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -- Instagram Reel Embed -- */
export function InstagramEmbed({
  url,
  caption,
}: {
  url: string;
  caption?: string;
}) {
  // Extract the reel/post URL and append /embed
  const cleanUrl = url.replace(/\/+$/, "");
  const embedUrl = `${cleanUrl}/embed/captioned/`;
  return (
    <figure className="not-prose my-8 flex flex-col items-center">
      <iframe
        src={embedUrl}
        width="400"
        height="580"
        frameBorder="0"
        scrolling="no"
        allowTransparency
        allow="encrypted-media"
        className="rounded-xl border border-slate-200 max-w-full"
      />
      {caption && (
        <figcaption className="text-sm text-slate-500 text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -- TikTok Embed -- */
export function TikTokEmbed({
  url,
  caption,
}: {
  url: string;
  caption?: string;
}) {
  // Extract video ID from TikTok URL
  const videoId = url.match(/video\/(\d+)/)?.[1] || "";
  return (
    <figure className="not-prose my-8 flex flex-col items-center">
      <iframe
        src={`https://www.tiktok.com/embed/v2/${videoId}`}
        width="325"
        height="580"
        frameBorder="0"
        scrolling="no"
        allow="encrypted-media"
        className="rounded-xl border border-slate-200"
      />
      {caption && (
        <figcaption className="text-sm text-slate-500 text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* -- Video Card Grid (side by side embeds) -- */
export function VideoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
      {children}
    </div>
  );
}

/* -- Highlight Box -- */
export function Highlight({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="not-prose bg-white rounded-xl border-2 border-content-coral/20 p-6 my-8">
      {title && (
        <p className="text-sm font-bold text-content-coral uppercase tracking-wide mb-3">
          {title}
        </p>
      )}
      <div className="text-slate-700 text-[15px] leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

/* -- Number Block -- */
export function NumberBlock({
  items,
}: {
  items: { number: string; text: string }[];
}) {
  return (
    <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {items.map((item) => (
        <div
          key={item.number}
          className="flex gap-4 items-start bg-slate-50 rounded-xl border border-slate-200 p-5"
        >
          <span className="text-2xl font-bold text-content-coral flex-shrink-0">
            {item.number}
          </span>
          <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
