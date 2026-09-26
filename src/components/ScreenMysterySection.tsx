import React, { useState, useEffect } from 'react';
import { ArrowRight, Moon, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface ScreenMysterySectionProps {
  onContinue: () => void;
}

export const ScreenMysterySection: React.FC<ScreenMysterySectionProps> = ({ onContinue }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Cinematic timed emotional progression
    const timers = [
      setTimeout(() => setStep(1), 800),   // "Okay... there's actually one more thing."
      setTimeout(() => setStep(2), 2600),  // "I wasn't sure whether I should put this here…"
      setTimeout(() => setStep(3), 4400),  // "Because maybe it's better said in person."
      setTimeout(() => setStep(4), 6200),  // "Maybe tomorrow. 👀"
      setTimeout(() => setStep(5), 7800),  // "Until then... Happy Birthday, Swastika. 🤍"
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative z-10 select-none text-center">
      {/* Deep midnight ambient space */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07070a] to-[#040406] pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-purple-900/15 via-rose-950/10 to-amber-950/5 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto space-y-8 relative">
        {/* Subtle Icon */}
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-pink-300">
          <Moon className="w-4 h-4 text-purple-300" />
        </div>

        {/* Story Dialogue */}
        <div className="space-y-6 min-h-[220px] flex flex-col items-center justify-center">
          <p
            className={`text-lg sm:text-xl font-light text-neutral-300 transition-all duration-1000 ${
              step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Okay… <br />
            there’s actually <span className="text-white font-normal">one more thing</span>.
          </p>

          <p
            className={`text-base sm:text-lg font-light text-neutral-400 italic transition-all duration-1000 ${
              step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            I wasn’t sure whether I should put this here…
          </p>

          <p
            className={`text-base sm:text-lg font-light text-neutral-300 transition-all duration-1000 ${
              step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Because maybe it’s better said in person.
          </p>

          <p
            className={`text-xl sm:text-2xl font-medium text-pink-300 transition-all duration-1000 ${
              step >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Maybe tomorrow. 👀
          </p>

          <div
            className={`pt-2 transition-all duration-1000 ${
              step >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Until then…
            </p>
            <p className="font-serif-title text-2xl sm:text-3xl text-white font-semibold">
              Happy Birthday, Swastika. 🤍
            </p>
          </div>
        </div>

        {/* Transition Button */}
        <div
          className={`pt-4 transition-all duration-700 ${
            step >= 5 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={() => {
              sound.playClick();
              onContinue();
            }}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500/80 to-amber-500/80 hover:from-pink-500 hover:to-amber-500 text-white font-semibold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(244,114,182,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Make a Birthday Wish 🎂</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {step < 5 && (
          <button
            onClick={() => setStep(5)}
            className="text-[11px] text-neutral-600 hover:text-neutral-400 transition-colors pt-2 tracking-wider"
          >
            continue →
          </button>
        )}
      </div>
    </section>
  );
};
