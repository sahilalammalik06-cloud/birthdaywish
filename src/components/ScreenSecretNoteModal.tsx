import React from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';

interface ScreenSecretNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScreenSecretNoteModal: React.FC<ScreenSecretNoteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#16151b] border border-pink-500/30 rounded-3xl p-7 sm:p-8 shadow-[0_0_60px_rgba(244,114,182,0.25)] text-center space-y-6">
        {/* Close Button */}
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

        {/* Small header icon */}
        <div className="mx-auto w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 flex items-center justify-center">
          <Heart className="w-4 h-4 fill-pink-300" />
        </div>

        {/* Secret Note Content */}
        <div className="space-y-4 text-left">
          <p className="text-base sm:text-lg font-light text-neutral-200 leading-relaxed">
            Honestly…
          </p>

          <p className="text-sm sm:text-base font-light text-neutral-300 leading-relaxed">
            I could have made a normal birthday wish.
          </p>

          <p className="text-sm sm:text-base font-light text-neutral-200 leading-relaxed">
            But you deserved something a little more memorable.
          </p>

          <p className="text-sm sm:text-base font-light text-neutral-300 leading-relaxed">
            So here’s to another year of you being you.
          </p>

          <p className="font-serif-title text-xl sm:text-2xl text-pink-200 font-semibold pt-2">
            Happy Birthday, Swastika. 🤍
          </p>

          <p className="text-sm text-neutral-400 italic pt-2">
            And… maybe I’ll tell you the rest tomorrow.
          </p>
        </div>

        {/* Sign-off */}
        <div className="pt-4 border-t border-white/10 text-center">
          <p className="font-handwriting text-2xl text-amber-200">
            Goodnight, birthday girl. ✨
          </p>
        </div>

        <div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs uppercase tracking-wider hover:bg-neutral-100 transition-colors shadow-lg active:scale-95"
          >
            Close Note 🤍
          </button>
        </div>
      </div>
    </div>
  );
};
