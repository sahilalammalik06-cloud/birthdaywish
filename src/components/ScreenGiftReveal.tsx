import React, { useState } from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { confetti } from '../utils/confetti';
import { sound } from '../utils/audio';

interface ScreenGiftRevealProps {
  onContinue: () => void;
}

export const ScreenGiftReveal: React.FC<ScreenGiftRevealProps> = ({ onContinue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    setIsOpen(true);
    setHasInteracted(true);
    sound.playChime();
    confetti.fire(0.5, 0.45, 85, 'burst');

    setTimeout(() => {
      confetti.fire(0.4, 0.4, 45, 'burst');
      confetti.fire(0.6, 0.4, 45, 'burst');
    }, 350);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative z-10 text-center select-none">
      {/* Background glow when gift opened */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-pink-500/25 via-amber-400/20 to-purple-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-md w-full mx-auto space-y-8 relative">
        {/* Header Text */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-pink-300/80 font-medium">
            Part 1 of your surprise
          </span>
          <h2 className="text-xl sm:text-2xl font-light text-neutral-200">
            Okay… this part is <span className="text-pink-300 font-serif-title italic font-normal">actually</span> for you.
          </h2>
        </div>

        {/* 3D Gift Box Interactive Component */}
        <div className="relative py-8 flex flex-col items-center justify-center">
          <button
            onClick={handleOpenGift}
            disabled={isOpen}
            className={`group relative cursor-pointer outline-none transition-transform duration-500 active:scale-95 ${
              isOpen ? 'scale-105' : 'hover:scale-105'
            }`}
            aria-label="Open birthday gift box"
          >
            {/* Pulsing halo */}
            <div
              className={`absolute -inset-4 rounded-3xl bg-pink-500/20 blur-xl transition-all duration-700 ${
                isOpen ? 'opacity-0 scale-150' : 'opacity-100 group-hover:bg-pink-500/30 animate-pulse'
              }`}
            />

            {/* Gift Box Container */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
              {/* Box Base */}
              <div
                className={`absolute bottom-0 w-36 h-28 sm:w-40 sm:h-32 rounded-2xl bg-gradient-to-br from-pink-600 via-rose-700 to-pink-900 border border-pink-400/30 shadow-[0_15px_35px_rgba(219,39,119,0.35)] transition-all duration-700 flex items-center justify-center overflow-hidden ${
                  isOpen ? 'translate-y-4' : ''
                }`}
              >
                {/* Vertical Ribbon */}
                <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 shadow-md" />
                {/* Horizontal Ribbon */}
                <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-amber-300 via-amber-200 to-amber-400 shadow-md" />

                {/* Inner Glow when open */}
                {isOpen && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
              </div>

              {/* Box Lid */}
              <div
                className={`absolute top-4 sm:top-2 w-40 h-14 sm:w-44 sm:h-16 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 border border-pink-300/40 shadow-xl transition-all duration-700 z-10 flex items-center justify-center ${
                  isOpen
                    ? '-translate-y-20 -rotate-12 scale-90 opacity-90'
                    : 'group-hover:-translate-y-1'
                }`}
              >
                {/* Lid vertical ribbon */}
                <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400" />
                
                {/* Ribbon Bow on top */}
                <div className="absolute -top-6 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-4 border-amber-300 -rotate-45 shadow-sm" />
                  <div className="w-6 h-6 rounded-full border-4 border-amber-300 rotate-45 shadow-sm -ml-2" />
                  <div className="absolute w-3 h-3 rounded-full bg-amber-200 shadow" />
                </div>
              </div>

              {/* Bursting Hearts & Stars when opened */}
              {isOpen && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-amber-300 animate-ping absolute -top-8" />
                  <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-bounce absolute -right-6 top-0" />
                  <Heart className="w-5 h-5 text-rose-300 fill-rose-300 animate-bounce absolute -left-6 top-4" style={{ animationDelay: '200ms' }} />
                </div>
              )}
            </div>
          </button>

          {!isOpen && (
            <button
              onClick={handleOpenGift}
              className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
            >
              <span>Open it 🎁</span>
            </button>
          )}
        </div>

        {/* Revealed Content */}
        <div
          className={`space-y-4 transition-all duration-1000 ease-out ${
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6 pointer-events-none h-0 overflow-hidden'
          }`}
        >
          <div className="space-y-2">
            <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight bg-gradient-to-r from-pink-200 via-white to-amber-200 bg-clip-text text-transparent">
              HAPPY BIRTHDAY, SWASTIKA! 🎂✨
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-sm mx-auto">
              Welcome to your tiny little birthday universe.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                sound.playClick();
                onContinue();
              }}
              className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-neutral-950 font-semibold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:bg-neutral-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all hover:scale-105 active:scale-95"
            >
              <span>Step Inside</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
