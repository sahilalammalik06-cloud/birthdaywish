import React, { useState } from 'react';
import { Sparkles, Wind, Heart, RotateCcw } from 'lucide-react';
import { confetti } from '../utils/confetti';
import { sound } from '../utils/audio';

interface ScreenCakeCelebrationProps {
  onOpenSecretNote: () => void;
}

export const ScreenCakeCelebration: React.FC<ScreenCakeCelebrationProps> = ({ onOpenSecretNote }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    sound.playCandleBlow();

    setTimeout(() => {
      sound.playChime();
      confetti.fire(0.5, 0.45, 90, 'burst');
      setWishMade(true);
    }, 450);

    setTimeout(() => {
      confetti.fire(0.25, 0.4, 40, 'burst');
      confetti.fire(0.75, 0.4, 40, 'burst');
    }, 900);
  };

  const handleRelight = () => {
    setCandlesBlown(false);
    setWishMade(false);
    sound.playClick();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative z-10 select-none text-center">
      {/* Dynamic Celebration Ambient Glow */}
      <div
        className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${
          candlesBlown
            ? 'bg-gradient-to-t from-pink-950/30 via-amber-950/20 to-transparent'
            : ''
        }`}
      />
      <div
        className={`absolute w-[450px] h-[450px] rounded-full blur-[120px] transition-all duration-1000 pointer-events-none ${
          candlesBlown
            ? 'bg-gradient-to-tr from-pink-500/25 via-amber-400/25 to-purple-600/20 scale-125'
            : 'bg-amber-500/10'
        }`}
      />

      <div className="max-w-md w-full mx-auto space-y-6 relative">
        {/* Intro prompt */}
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
            One Final Moment
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl text-white font-medium">
            Make a wish. 🎂
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light">
            Close your eyes, think of something good, and tap below.
          </p>
        </div>

        {/* ARTISANAL BIRTHDAY CAKE */}
        <div className="relative py-8 flex flex-col items-center justify-center">
          <div className="relative w-64 h-56 flex flex-col items-center justify-end">
            {/* CANDLES */}
            <div className="absolute top-2 w-32 flex justify-between px-3 z-20">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Candle Flame */}
                  {!candlesBlown ? (
                    <div className="relative w-4 h-6 animate-flame">
                      <div className="w-3.5 h-5 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_12px_#f59e0b]" />
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full bg-blue-300/60 blur-[1px]" />
                    </div>
                  ) : (
                    /* Smoke puff after blow */
                    <div className="w-2 h-6 flex flex-col items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400/40 animate-ping" />
                      <span className="w-1 h-3 bg-neutral-600/30 rounded-full mt-1" />
                    </div>
                  )}

                  {/* Candle Wick */}
                  <div className="w-0.5 h-2 bg-neutral-900" />

                  {/* Candle Stick */}
                  <div
                    className={`w-3.5 h-9 rounded-t-sm shadow-md border-x border-white/20 ${
                      i === 1
                        ? 'bg-gradient-to-b from-pink-300 via-pink-400 to-pink-500'
                        : 'bg-gradient-to-b from-amber-200 via-amber-300 to-amber-400'
                    }`}
                  >
                    {/* Spiral stripe */}
                    <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,white_2px,white_4px)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* CAKE TOP TIER */}
            <div className="relative w-40 h-16 rounded-t-2xl bg-gradient-to-b from-pink-100 via-pink-200 to-pink-300 border-t-2 border-white/80 shadow-md flex items-center justify-center overflow-hidden z-10">
              {/* Frosting Drips */}
              <div className="absolute top-0 inset-x-0 h-4 flex justify-between px-1">
                {[...Array(6)].map((_, idx) => (
                  <span
                    key={idx}
                    className="w-5 h-4 bg-white rounded-b-full shadow-sm -mt-0.5"
                  />
                ))}
              </div>
              {/* Gold Sugar Pearls */}
              <div className="absolute bottom-2 inset-x-0 flex justify-around px-4">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx} className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm" />
                ))}
              </div>
            </div>

            {/* CAKE BOTTOM TIER */}
            <div className="relative w-52 h-20 rounded-t-2xl bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 border-t-2 border-white/60 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Bottom tier frosting drips */}
              <div className="absolute top-0 inset-x-0 h-5 flex justify-between px-1">
                {[...Array(8)].map((_, idx) => (
                  <span
                    key={idx}
                    className="w-5 h-5 bg-pink-100 rounded-b-full shadow-sm -mt-0.5"
                  />
                ))}
              </div>
              {/* Decorative Swirls */}
              <div className="font-handwriting text-2xl text-pink-900/60 pt-4">
                Swastika ✨
              </div>
            </div>

            {/* CAKE STAND / PLATTER */}
            <div className="w-60 h-3 rounded-full bg-gradient-to-r from-neutral-400 via-white to-neutral-300 shadow-2xl border border-white/40" />
            <div className="w-24 h-4 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-b-md shadow-md" />
          </div>

          {/* Blow Candles Action */}
          {!candlesBlown ? (
            <button
              onClick={handleBlowCandles}
              className="mt-6 group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-rose-400 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_35px_rgba(251,191,36,0.4)] hover:shadow-[0_0_45px_rgba(251,191,36,0.6)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Wind className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              <span>Blow the candles ✨</span>
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Relight candles</span>
            </button>
          )}
        </div>

        {/* POST-WISH CELEBRATION MESSAGE */}
        {wishMade && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <h1 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-200 via-white to-amber-200 bg-clip-text text-transparent">
                HAPPY BIRTHDAY, SWASTIKA! 🎉
              </h1>
              <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed max-w-sm mx-auto">
                I hope you smiled at least once while going through this.
              </p>
              <p className="text-xs uppercase tracking-widest text-pink-300 font-medium pt-1">
                Mission accomplished. 😌
              </p>
            </div>

            {/* SCREEN 11 TRIGGER BUTTON */}
            <div className="pt-6">
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenSecretNote();
                }}
                className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:border-pink-400/50 shadow-lg hover:scale-105 active:scale-95"
              >
                <span>Wait… one last note</span>
                <span className="group-hover:scale-110 transition-transform">👀</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
