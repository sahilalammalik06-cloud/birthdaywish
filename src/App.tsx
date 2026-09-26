/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BackgroundStars } from './components/BackgroundStars';
import { SoundBar } from './components/SoundBar';
import { PhotoCustomizerModal } from './components/PhotoCustomizerModal';
import { ShareGuideModal } from './components/ShareGuideModal';
import { ScreenIntro } from './components/ScreenIntro';
import { ScreenGiftReveal } from './components/ScreenGiftReveal';
import { ScreenPhotoMoment } from './components/ScreenPhotoMoment';
import { ScreenMusicSection } from './components/ScreenMusicSection';
import { ScreenHandwrittenLetter } from './components/ScreenHandwrittenLetter';
import { ScreenInteractiveQuiz } from './components/ScreenInteractiveQuiz';
import { ScreenMysterySection } from './components/ScreenMysterySection';
import { ScreenCakeCelebration } from './components/ScreenCakeCelebration';
import { ScreenSecretNoteModal } from './components/ScreenSecretNoteModal';
import { BIRTHDAY_PHOTOS } from './config/photos';
import { sound } from './utils/audio';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 13;

  const [isJinglePlaying, setIsJinglePlaying] = useState<boolean>(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);
  const [isSecretNoteOpen, setIsSecretNoteOpen] = useState<boolean>(false);

  // Photo overrides from localStorage
  const [photoOverrides, setPhotoOverrides] = useState<{ [key: string]: string }>({});

  const reloadPhotos = () => {
    const loaded: { [key: string]: string } = {};
    BIRTHDAY_PHOTOS.forEach((p) => {
      const stored = localStorage.getItem(p.storageKey);
      if (stored) loaded[p.id] = stored;
    });
    setPhotoOverrides(loaded);
  };

  useEffect(() => {
    reloadPhotos();
  }, []);

  const handleToggleJingle = () => {
    if (isJinglePlaying) {
      sound.stopBirthdayJingle();
      setIsJinglePlaying(false);
    } else {
      sound.startBirthdayJingle();
      setIsJinglePlaying(true);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    goToStep(currentStep + 1);
  };

  const prevStep = () => {
    goToStep(currentStep - 1);
  };

  return (
    <main className="relative min-h-screen bg-[#09090c] text-neutral-100 flex flex-col justify-between overflow-x-hidden">
      {/* Background Animated Stardust Canvas with step-aware color transitions */}
      <BackgroundStars currentStep={currentStep} totalSteps={totalSteps} />

      {/* Floating Top Controls Header */}
      <SoundBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        isJinglePlaying={isJinglePlaying}
        onToggleJingle={handleToggleJingle}
        onOpenPhotoManager={() => setIsPhotoModalOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      {/* Main Interactive Screen Carousel */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        {currentStep === 1 && (
          <ScreenIntro onContinue={nextStep} />
        )}

        {currentStep === 2 && (
          <ScreenGiftReveal onContinue={nextStep} />
        )}

        {currentStep === 3 && (
          <ScreenPhotoMoment
            photo={BIRTHDAY_PHOTOS[0]}
            photoIndex={0}
            totalPhotos={6}
            onContinue={nextStep}
            customImageSrc={photoOverrides[BIRTHDAY_PHOTOS[0].id]}
          />
        )}

        {currentStep === 4 && (
          <ScreenPhotoMoment
            photo={BIRTHDAY_PHOTOS[1]}
            photoIndex={1}
            totalPhotos={6}
            onContinue={nextStep}
            customImageSrc={photoOverrides[BIRTHDAY_PHOTOS[1].id]}
          />
        )}

        {currentStep === 5 && (
          <ScreenPhotoMoment
            photo={BIRTHDAY_PHOTOS[2]}
            photoIndex={2}
            totalPhotos={6}
            onContinue={nextStep}
            customImageSrc={photoOverrides[BIRTHDAY_PHOTOS[2].id]}
          />
        )}

        {currentStep === 6 && (
          <ScreenPhotoMoment
            photo={BIRTHDAY_PHOTOS[3]}
            photoIndex={3}
            totalPhotos={6}
            onContinue={nextStep}
            customImageSrc={photoOverrides[BIRTHDAY_PHOTOS[3].id]}
          />
        )}

        {currentStep === 7 && (
          <ScreenPhotoMoment
            photo={BIRTHDAY_PHOTOS[4]}
            photoIndex={4}
            totalPhotos={6}
            onContinue={nextStep}
            customImageSrc={photoOverrides[BIRTHDAY_PHOTOS[4].id]}
          />
        )}

        {currentStep === 8 && (
          <ScreenPhotoMoment
            photo={BIRTHDAY_PHOTOS[5]}
            photoIndex={5}
            totalPhotos={6}
            onContinue={nextStep}
            customImageSrc={photoOverrides[BIRTHDAY_PHOTOS[5].id]}
          />
        )}

        {currentStep === 9 && (
          <ScreenMusicSection
            onContinue={nextStep}
            isJinglePlaying={isJinglePlaying}
            onToggleJingle={handleToggleJingle}
          />
        )}

        {currentStep === 10 && (
          <ScreenHandwrittenLetter onContinue={nextStep} />
        )}

        {currentStep === 11 && (
          <ScreenInteractiveQuiz onContinue={nextStep} />
        )}

        {currentStep === 12 && (
          <ScreenMysterySection onContinue={nextStep} />
        )}

        {currentStep === 13 && (
          <ScreenCakeCelebration onOpenSecretNote={() => setIsSecretNoteOpen(true)} />
        )}
      </div>

      {/* Subtle Bottom Story Progress Dots & Back Navigation */}
      <footer className="relative z-30 pb-6 pt-2 px-4 pointer-events-none select-none">
        <div className="max-w-md mx-auto flex items-center justify-between pointer-events-auto">
          {/* Back button */}
          <button
            onClick={() => {
              sound.playClick();
              prevStep();
            }}
            disabled={currentStep === 1}
            className={`p-2 rounded-full border transition-all ${
              currentStep === 1
                ? 'opacity-0 pointer-events-none'
                : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
            aria-label="Previous screen"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950/60 backdrop-blur-md border border-white/5">
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const stepNumber = idx + 1;
              const isActive = stepNumber === currentStep;
              const isPast = stepNumber < currentStep;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    goToStep(stepNumber);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-6 h-1.5 bg-gradient-to-r from-pink-400 to-amber-300 shadow-[0_0_8px_rgba(244,114,182,0.6)]'
                      : isPast
                      ? 'w-1.5 h-1.5 bg-pink-400/50 hover:bg-pink-400'
                      : 'w-1.5 h-1.5 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to step ${stepNumber}`}
                />
              );
            })}
          </div>

          {/* Forward button */}
          <button
            onClick={() => {
              sound.playClick();
              nextStep();
            }}
            disabled={currentStep === totalSteps}
            className={`p-2 rounded-full border transition-all ${
              currentStep === totalSteps
                ? 'opacity-0 pointer-events-none'
                : 'bg-neutral-900/80 border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
            aria-label="Next screen"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Modals */}
      <PhotoCustomizerModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onPhotosUpdated={reloadPhotos}
      />

      <ShareGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      <ScreenSecretNoteModal
        isOpen={isSecretNoteOpen}
        onClose={() => setIsSecretNoteOpen(false)}
      />
    </main>
  );
}
