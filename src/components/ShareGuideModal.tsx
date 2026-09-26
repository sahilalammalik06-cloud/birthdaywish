import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Send, Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface ShareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareGuideModal: React.FC<ShareGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const sampleMessage = `Hey Swastika, happy birthday! 🎂✨ I made a tiny something for you today instead of a normal text: ${currentUrl}`;

  const copyToClipboard = (text: string, isLink: boolean) => {
    navigator.clipboard.writeText(text);
    sound.playClick();
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } else {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  const openWhatsApp = () => {
    sound.playClick();
    const encoded = encodeURIComponent(sampleMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141419] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sending & Hosting Guide</span>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          How to Send This to Swastika ✨
        </h2>
        <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
          Everything you need to deliver this personal birthday surprise on September 28.
        </p>

        {/* Steps */}
        <div className="space-y-4 text-xs">
          {/* Step 1 */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="font-semibold text-white flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center text-[11px]">
                1
              </span>
              <span>Adding Swastika's 6 Photos & Memories</span>
            </div>
            <p className="text-neutral-400 text-[12px] leading-relaxed pl-7">
              You can simply click the <strong className="text-pink-300">"Photos"</strong> button at
              the top right to upload her 6 photos right now in your browser. Or copy them into{' '}
              <code className="text-pink-300 bg-pink-500/10 px-1 py-0.5 rounded">
                public/assets/photo1.jpg
              </code>{' '}
              through{' '}
              <code className="text-pink-300 bg-pink-500/10 px-1 py-0.5 rounded">
                photo6.jpg
              </code>
              .
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="font-semibold text-white flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center text-[11px]">
                2
              </span>
              <span>Original Birthday Song</span>
            </div>
            <p className="text-neutral-400 text-[12px] leading-relaxed pl-7">
              The site has an original synthesized music box jingle with custom lyrics already built-in!
              If you have an audio recording, you can also place it at{' '}
              <code className="text-pink-300 bg-pink-500/10 px-1 py-0.5 rounded">
                public/assets/birthday-song.mp3
              </code>
              .
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="font-semibold text-white flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center text-[11px]">
                3
              </span>
              <span>Deploying to Vercel / GitHub Pages</span>
            </div>
            <p className="text-neutral-400 text-[12px] leading-relaxed pl-7 mb-2">
              To host it on Vercel for free with your own custom link:
            </p>
            <ol className="list-decimal list-inside pl-7 space-y-1 text-neutral-300 text-[11px]">
              <li>Push this repository to GitHub or run <code className="text-pink-300">npm run build</code></li>
              <li>Import the repository into <span className="text-white font-medium">Vercel.com</span> (or Netlify / GitHub Pages)</li>
              <li>Hit Deploy — you’ll get an instant live HTTPS link!</li>
            </ol>
          </div>

          {/* Step 4 - WhatsApp Message */}
          <div className="p-3.5 rounded-xl bg-pink-500/[0.05] border border-pink-500/20">
            <div className="font-semibold text-pink-300 flex items-center gap-2 mb-2">
              <Send className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-[12px] italic mb-3">
              "{sampleMessage}"
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(sampleMessage, false)}
                className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied Text' : 'Copy Message'}</span>
              </button>
              <button
                onClick={openWhatsApp}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
