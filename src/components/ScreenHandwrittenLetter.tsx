import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart, Feather } from 'lucide-react';
import { sound } from '../utils/audio';

interface ScreenHandwrittenLetterProps {
  onContinue: () => void;
}

export const ScreenHandwrittenLetter: React.FC<ScreenHandwrittenLetterProps> = ({ onContinue }) => {
  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(0);

  const paragraphs = [
    "Happy Birthday, Swastika. 🤍",
    "I hope this year gives you a lot of reasons to smile, a lot of moments worth remembering, and maybe a few completely unexpected good ones.",
    "You're genuinely a nice person to have around, and I'm glad I got to know you.",
    "So yeah… today is officially your day.",
    "Enjoy it properly. 😌",
    "P.S. I spent more time making this than I probably should have. 😂",
  ];

  useEffect(() => {
    // Progressive paragraph reveal
    const timers: number[] = [];
    paragraphs.forEach((_, idx) => {
      const timer = window.setTimeout(() => {
        setRevealedParagraphs((prev) => Math.max(prev, idx + 1));
      }, 700 + idx * 1100);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [paragraphs.length]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative z-10 select-none">
      {/* Background soft ambiance */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-transparent blur-[110px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto space-y-6 relative">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-300 font-semibold">
            <Feather className="w-3.5 h-3.5" />
            <span>Personal Note</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-white font-medium">
            A little something I actually mean…
          </h2>
        </div>

        {/* Letter Parchment Container */}
        <div className="relative rounded-2xl bg-[#17161b] border border-amber-200/20 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* Decorative Corner Flairs */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/40" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/40" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/40" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/40" />

          {/* Letter Body */}
          <div className="space-y-4">
            {paragraphs.map((p, idx) => {
              const isRevealed = revealedParagraphs > idx;
              const isPS = idx === paragraphs.length - 1;

              return (
                <div
                  key={idx}
                  className={`transition-all duration-700 ease-out ${
                    isRevealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  {isPS ? (
                    <p className="pt-3 border-t border-white/10 text-xs sm:text-sm text-neutral-400 italic">
                      {p}
                    </p>
                  ) : idx === 0 ? (
                    <p className="font-serif-title text-xl sm:text-2xl text-pink-200 font-semibold tracking-wide">
                      {p}
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                      {p}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Wax Stamp Emblem */}
          <div className="mt-6 flex justify-end">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-600 to-rose-800 border border-pink-400/50 shadow-lg flex items-center justify-center text-white/90">
              <Heart className="w-4 h-4 fill-white/80" />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onContinue();
            }}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs uppercase tracking-wider shadow-lg hover:bg-neutral-100 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Important Question</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
