import { HexMolecule } from '@/components/ui/HexMolecule';
import { LOGO_DARK } from '@/lib/logos';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }} />
      <HexMolecule size={80} className="absolute bottom-4 right-8 opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <img
              src={LOGO_DARK}
              alt="The Content Labs"
              loading="lazy"
              decoding="async"
              width={501}
              height={151}
              className="h-16 w-auto mb-4"
            />
            <p className="font-mono text-sm tracking-wide text-slate-500 max-w-md">
              Your shortcut to content that actually grows. Strategy, scripts, and tools built for creators.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="/features/video-audit" className="text-slate-400 hover:text-white transition-colors">Video Audit</a></li>
              <li><a href="/features/competitor-analysis" className="text-slate-400 hover:text-white transition-colors">Competitor Analysis</a></li>
              <li><a href="/features/content-strategy" className="text-slate-400 hover:text-white transition-colors">Content Strategy</a></li>
              <li><a href="/features/content-calendar" className="text-slate-400 hover:text-white transition-colors">Content Calendar</a></li>
              <li><a href="/features/ai-chatbot" className="text-slate-400 hover:text-white transition-colors">The Chemist</a></li>
              <li><a href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="/compare" className="text-slate-400 hover:text-white transition-colors">Compare</a></li>
              <li><a href="/blog/what-is-ai-content-strategy" className="text-slate-400 hover:text-white transition-colors">What Is AI Content Strategy?</a></li>
              <li><a href="/blog/tiktok-content-strategy-guide" className="text-slate-400 hover:text-white transition-colors">TikTok Strategy Guide</a></li>
              <li><a href="/blog/content-labs-vs-chatgpt" className="text-slate-400 hover:text-white transition-colors">Content Labs vs ChatGPT</a></li>
              <li><a href="/blog" className="text-content-coral hover:text-content-coral-400 transition-colors font-medium">All Resources &rarr;</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              <li><a href="/for/ugc-creators" className="text-slate-400 hover:text-white transition-colors">UGC Creators</a></li>
              <li><a href="/for/coaches" className="text-slate-400 hover:text-white transition-colors">Coaches</a></li>
              <li><a href="/for/ecommerce" className="text-slate-400 hover:text-white transition-colors">E-commerce</a></li>
              <li><a href="/for/social-media-managers" className="text-slate-400 hover:text-white transition-colors">Social Media Managers</a></li>
              <li><a href="/for/small-businesses" className="text-slate-400 hover:text-white transition-colors">Small Businesses</a></li>
              <li><a href="/for/personal-brands" className="text-slate-400 hover:text-white transition-colors">Personal Brands</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="mailto:business@thecontentlabs.io" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms</a></li>
              <li><a href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="/refund-policy" className="text-slate-400 hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
            <h3 className="text-white font-semibold mb-4 mt-8">Ask AI About Us</h3>
            <ul className="space-y-3">
              <li><a href="https://chatgpt.com/?q=What+is+The+Content+Labs+and+how+does+it+help+content+creators" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">ChatGPT</a></li>
              <li><a href="https://www.perplexity.ai/search?q=What+is+The+Content+Labs+thecontentlabs.app" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Perplexity</a></li>
              <li><a href="https://claude.ai/new?q=What+is+The+Content+Labs+and+how+does+it+help+content+creators" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Claude</a></li>
              <li><a href="https://www.google.com/search?q=The+Content+Labs+AI+content+strategy+tool" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Google</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm text-center">
            &copy; 2026 The Content Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
