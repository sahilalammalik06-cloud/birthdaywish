import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Image as ImageIcon, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface SoundBarProps {
  currentStep: number;
  totalSteps: number;
  isJinglePlaying: boolean;
  onToggleJingle: () => void;
  onOpenPhotoManager: () => void;
  onOpenGuide: () => void;
}

export const SoundBar: React.FC<SoundBarProps> = ({
  currentStep,
  totalSteps,
  isJinglePlaying,
  onToggleJingle,
  onOpenPhotoManager,
  onOpenGuide,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    sound.playClick();
  };

  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 pointer-events-none transition-all duration-300">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {/* Progress Tracker (Subtle & Clean) */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-lg text-xs text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
          <span className="font-medium tracking-wide">For Swastika</span>
          <span className="text-neutral-500 font-normal">·</span>
          <span className="text-neutral-400 tabular-nums">
            {currentStep}/{totalSteps}
          </span>
        </div>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Music Play/Pause */}
          <button
            onClick={onToggleJingle}
            className={`p-2 rounded-full backdrop-blur-md border transition-all duration-200 active:scale-95 flex items-center justify-center ${
              isJinglePlaying
                ? 'bg-pink-500/20 border-pink-400/50 text-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.3)]'
                : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-neutral-200'
            }`}
            title={isJinglePlaying ? 'Pause birthday song' : 'Play birthday song'}
            aria-label="Toggle birthday song"
          >
            <Music className={`w-4 h-4 ${isJinglePlaying ? 'animate-bounce' : ''}`} />
          </button>

          {/* Sound FX Mute */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-full backdrop-blur-md border transition-all duration-200 active:scale-95 flex items-center justify-center ${
              isMuted
                ? 'bg-neutral-900/80 border-neutral-700 text-neutral-500'
                : 'bg-neutral-900/80 border-white/10 text-neutral-300 hover:text-white'
            }`}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Photo Customizer Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenPhotoManager();
            }}
            className="px-2.5 py-1.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 text-xs text-neutral-300 hover:text-white hover:border-pink-500/40 transition-all active:scale-95 flex items-center gap-1.5"
            title="Replace or upload photos"
          >
            <ImageIcon className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline font-medium">Photos</span>
          </button>

          {/* Share & Deployment Guide */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenGuide();
            }}
            className="p-2 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 text-neutral-400 hover:text-neutral-200 transition-all active:scale-95 flex items-center justify-center"
            title="How to send to Swastika & deploy"
            aria-label="Help guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thin Subtle Progress Line */}
      <div className="max-w-xl mx-auto mt-2 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
