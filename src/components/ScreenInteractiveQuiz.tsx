import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { confetti } from '../utils/confetti';
import { sound } from '../utils/audio';

interface ScreenInteractiveQuizProps {
  onContinue: () => void;
}

export const ScreenInteractiveQuiz: React.FC<ScreenInteractiveQuizProps> = ({ onContinue }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const options = [
    { id: 'A', text: 'More sleep 😴', hint: "Valid, but you shouldn't have to choose just that! 😉" },
    { id: 'B', text: 'More money 💸', hint: "Definitely, but we can aim higher!" },
    { id: 'C', text: 'More happiness ✨', hint: "100%, but why stop there?" },
    { id: 'D', text: 'All of the above 👑', hint: 'The only acceptable answer.' },
  ];

  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    sound.playClick();

    if (optionId === 'D') {
      setIsCorrect(true);
      setFeedback('Correct answer. 👏 I knew you were smart.');
      sound.playChime();
      confetti.fire(0.5, 0.5, 60, 'burst');
    } else {
      setIsCorrect(false);
      const chosen = options.find((o) => o.id === optionId);
      setFeedback(chosen?.hint || 'Nice try!');
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative z-10 select-none">
      {/* Background glow */}
      <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-pink-500/15 to-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto space-y-6 relative text-center">
        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold">
            Pop Quiz · Classmate Edition
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl text-white font-medium">
            Important birthday question.
          </h2>
          <p className="text-sm text-neutral-300 font-light pt-1">
            What do you deserve this year?
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2 text-left">
          {options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isWinner = option.id === 'D' && isCorrect;

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-between border active:scale-[0.98] ${
                  isWinner
                    ? 'bg-gradient-to-r from-pink-500/20 to-amber-500/20 border-pink-400 text-white shadow-[0_0_20px_rgba(244,114,182,0.3)]'
                    : isSelected
                    ? 'bg-white/10 border-white/30 text-white'
                    : 'bg-[#18181f]/80 hover:bg-white/5 border-white/10 text-neutral-200 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isWinner
                        ? 'bg-pink-500 text-white'
                        : isSelected
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {option.id}
                  </span>
                  <span className="text-sm sm:text-base font-medium">{option.text}</span>
                </div>

                {isWinner && <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        <div className="min-h-[70px] flex flex-col items-center justify-center">
          {feedback && (
            <div
              className={`p-3.5 rounded-xl border text-xs sm:text-sm transition-all duration-500 ${
                isCorrect
                  ? 'bg-pink-500/10 border-pink-500/30 text-pink-200'
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-200'
              }`}
            >
              <p className="font-medium">{feedback}</p>
              {isCorrect && (
                <p className="text-neutral-400 text-[11px] mt-1">
                  Okay, maybe I made this question too easy. 😂
                </p>
              )}
            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onContinue();
            }}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs uppercase tracking-wider shadow-lg hover:bg-neutral-100 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Wait, there’s one more thing…</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
