import React, { useState, useEffect } from 'react';
import { Play, Pause, Music, Disc3, Sparkles, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface ScreenMusicSectionProps {
  onContinue: () => void;
  isJinglePlaying: boolean;
  onToggleJingle: () => void;
}

export const ScreenMusicSection: React.FC<ScreenMusicSectionProps> = ({
  onContinue,
  isJinglePlaying,
  onToggleJingle,
}) => {
  const [activeLine, setActiveLine] = useState<number>(0);

  const lyrics = [
    "Hey Swastika, today's your day,",
    "Another year, another way,",
    "Keep that smile, keep shining bright,",
    "Hope your whole year feels just right.",
    "Through every class and every test,",
    "Here's wishing you the absolute best.",
    "A little joy, a little grace,",
    "And that warm smile upon your face. ✨",
  ];

  // Sync active lyric highlight when jingle is playing
  useEffect(() => {
    let interval: number | null = null;
    if (isJinglePlaying) {
      interval = window.setInterval(() => {
        setActiveLine((prev) => (prev + 1) % lyrics.length);
      }, 3100);
    } else {
      setActiveLine(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isJinglePlaying, lyrics.length]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative z-10 select-none">
      {/* Background glow */}
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-pink-500/15 via-rose-500/10 to-amber-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto space-y-6 text-center relative">
        {/* Section Heading */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-medium">
            <Music className="w-3.5 h-3.5" />
            <span>Track 01 · Original Jingle</span>
          </div>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-white font-medium">
            A tiny song made for your birthday
          </h2>
          <p className="text-xs text-neutral-400">
            A custom melody box jingle written just for Swastika
          </p>
        </div>

        {/* Music Player Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle audio visualizer bar glow */}
          <div className="flex items-center justify-center gap-1 h-6 mb-6">
            {[40, 70, 95, 60, 85, 45, 100, 65, 80, 50, 90, 35].map((height, i) => (
              <span
                key={i}
                className={`w-1 rounded-full bg-gradient-to-t from-pink-500 to-amber-300 transition-all duration-300 ${
                  isJinglePlaying ? 'opacity-100' : 'opacity-25'
                }`}
                style={{
                  height: isJinglePlaying ? `${Math.max(15, (height * ((i % 3) + 1)) % 100)}%` : '15%',
                  transitionDelay: `${i * 35}ms`,
                }}
              />
            ))}
          </div>

          {/* Cassette / Vinyl Graphic */}
          <div className="relative mx-auto w-32 h-32 mb-6 flex items-center justify-center">
            {/* Spinning Vinyl Record */}
            <div
              className={`w-full h-full rounded-full bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-800 border-2 border-neutral-700 shadow-2xl flex items-center justify-center ${
                isJinglePlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '8s' }}
            >
              {/* Vinyl grooves */}
              <div className="w-24 h-24 rounded-full border border-neutral-800 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-neutral-800 flex items-center justify-center">
                  {/* Center Label */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-inner">
                    <Disc3 className="w-5 h-5 text-white/90" />
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing needle/arm */}
            <div
              className={`absolute -top-2 right-2 w-8 h-12 border-r-2 border-amber-300/80 transition-transform origin-top duration-500 pointer-events-none ${
                isJinglePlaying ? 'rotate-12' : '-rotate-12 opacity-60'
              }`}
            />
          </div>

          {/* Interactive Play / Pause Button */}
          <div className="flex flex-col items-center justify-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onToggleJingle();
              }}
              className={`group px-8 py-3.5 rounded-full flex items-center gap-3 font-semibold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-xl ${
                isJinglePlaying
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-[0_0_30px_rgba(244,114,182,0.4)]'
                  : 'bg-white text-neutral-950 hover:bg-neutral-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]'
              }`}
            >
              {isJinglePlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Melody</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-neutral-950" />
                  <span>Play Birthday Jingle</span>
                </>
              )}
            </button>
            <span className="text-[11px] text-neutral-500">
              {isJinglePlaying ? 'Playing chime box melody…' : 'Tap to hear the tune'}
            </span>
          </div>

          {/* Karaoke Lyrics Display */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-2.5 text-left">
            <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-2">
              <span className="uppercase tracking-widest text-pink-400 font-medium">Lyrics</span>
              <span>Sing along 🎤</span>
            </div>

            <div className="space-y-1.5 text-sm sm:text-base font-light">
              {lyrics.map((line, idx) => {
                const isCurrent = isJinglePlaying && activeLine === idx;
                return (
                  <p
                    key={idx}
                    className={`transition-all duration-500 rounded px-2 py-0.5 ${
                      isCurrent
                        ? 'text-pink-300 font-medium bg-pink-500/15 translate-x-1 shadow-[0_0_12px_rgba(244,114,182,0.2)]'
                        : 'text-neutral-400 opacity-70'
                    }`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onContinue();
            }}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:border-pink-500/40 active:scale-95"
          >
            <span>Read Special Message</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-pink-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
