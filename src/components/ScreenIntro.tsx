import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface ScreenIntroProps {
  onContinue: () => void;
}

export const ScreenIntro: React.FC<ScreenIntroProps> = ({ onContinue }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Cinematic timing sequence for introductory build-up
    const t1 = setTimeout(() => setStage(1), 700);   // "Hey, Swastika… 👀"
    const t2 = setTimeout(() => setStage(2), 2200);  // "I could have just texted you..."
    const t3 = setTimeout(() => setStage(3), 3900);  // "But honestly…"
    const t4 = setTimeout(() => setStage(4), 5400);  // "Where’s the fun in that? 😌"
    const t5 = setTimeout(() => setStage(5), 6500);  // Show button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleSkipOrContinue = () => {
    sound.playClick();
    onContinue();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10 text-center select-none">
      {/* Ambient background glow ring */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Subtle Greeting Badge */}
        <div
          className={`transition-all duration-1000 ease-out flex items-center justify-center gap-2 ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-pink-300/80 font-medium">
            September 28 · Just for you
          </span>
        </div>

        {/* Primary Lead In */}
        <h1
          className={`font-serif-title text-4xl sm:text-5xl font-medium tracking-tight text-white transition-all duration-1000 ease-out ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Hey, Swastika… <span className="inline-block hover:scale-110 transition-transform">👀</span>
        </h1>

        {/* Cinematic Staggered Thoughts */}
        <div className="space-y-4 pt-2 min-h-[140px] flex flex-col justify-center items-center">
          <p
            className={`text-lg sm:text-xl text-neutral-300 font-light transition-all duration-1000 ease-out leading-relaxed ${
              stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            I could have just texted you
            <br />
            <span className="italic text-white font-normal">“Happy Birthday”</span>…
          </p>

          <p
            className={`text-base sm:text-lg text-pink-200/90 font-light italic transition-all duration-1000 ease-out ${
              stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            But honestly…
          </p>

          <p
            className={`text-lg sm:text-xl text-neutral-200 font-normal transition-all duration-1000 ease-out ${
              stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Where’s the fun in that? <span className="inline-block animate-pulse">😌</span>
          </p>
        </div>

        {/* Glowing Interactive CTA Button */}
        <div
          className={`pt-6 transition-all duration-1000 ease-out ${
            stage >= 5 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={handleSkipOrContinue}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-white font-semibold text-sm shadow-[0_0_35px_rgba(244,114,182,0.35)] hover:shadow-[0_0_45px_rgba(244,114,182,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span className="tracking-wide">Okay, show me</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
          </button>
        </div>

        {/* Subtle quick skip for fast clicking */}
        {stage < 5 && (
          <button
            onClick={() => setStage(5)}
            className="text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors pt-4 tracking-wider"
          >
            skip intro →
          </button>
        )}
      </div>
    </section>
  );
};
