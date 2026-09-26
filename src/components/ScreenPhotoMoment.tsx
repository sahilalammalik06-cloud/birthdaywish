import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Heart, Camera } from 'lucide-react';
import { BirthdayPhoto, getPlaceholderImage } from '../config/photos';
import { sound } from '../utils/audio';

interface ScreenPhotoMomentProps {
  photo: BirthdayPhoto;
  photoIndex: number;
  totalPhotos: number;
  onContinue: () => void;
  customImageSrc?: string;
}

export const ScreenPhotoMoment: React.FC<ScreenPhotoMomentProps> = ({
  photo,
  photoIndex,
  totalPhotos,
  onContinue,
  customImageSrc,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Resolved source: localStorage upload > custom prop > defaultSrc > SVG placeholder
  const resolvedSrc = customImageSrc || photo.defaultSrc;

  useEffect(() => {
    setImgError(false);
    setIsLoaded(false);
  }, [resolvedSrc]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 relative z-10 select-none">
      {/* Ambient background glow tailored to the photo mood */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {photo.frameStyle === 'spotlight' ? (
          <div className="w-[500px] h-[500px] bg-gradient-to-b from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-[110px]" />
        ) : (
          <div className="w-[420px] h-[420px] bg-gradient-to-tr from-pink-500/15 to-purple-600/10 rounded-full blur-[90px]" />
        )}
      </div>

      <div className="max-w-md w-full mx-auto space-y-6 relative">
        {/* Step Kicker */}
        <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
          <div className="flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-pink-400" />
            <span className="uppercase tracking-widest text-[11px] text-pink-300 font-medium">
              Moment {photoIndex + 1} of {totalPhotos}
            </span>
          </div>
          <span className="text-neutral-500 text-[11px] font-mono">{photo.mood}</span>
        </div>

        {/* PHOTO DISPLAY AREA */}
        {photo.frameStyle === 'polaroid' && (
          /* ================= SCREEN 3: POLAROID STYLE ================= */
          <div className="relative pt-4 flex flex-col items-center">
            {/* Scrapbook Tape on top */}
            <div className="absolute top-1 z-20 w-24 h-6 bg-amber-100/70 backdrop-blur-sm -rotate-2 rounded-sm shadow-sm border border-amber-200/40" />

            <div
              className="polaroid-frame w-full max-w-[340px] sm:max-w-[360px] p-4 pb-6 rounded-sm shadow-2xl relative transition-all duration-700"
              style={{ transform: `rotate(${photo.rotationDeg}deg)` }}
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden shadow-inner">
                <img
                  src={imgError ? getPlaceholderImage(photoIndex + 1, photo.mood) : resolvedSrc}
                  alt={`Swastika - Moment ${photoIndex + 1}`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setImgError(true)}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-80 scale-105'
                  }`}
                />
                {/* Subtle soft vignette */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/10" />
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="mt-3.5 px-1 text-center">
                <p className="font-handwriting text-2xl text-neutral-800 leading-tight">
                  Swastika · Sept 28 ✨
                </p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">
                  Classmate · Birthday Girl
                </p>
              </div>
            </div>
          </div>
        )}

        {photo.frameStyle === 'cinematic' && (
          /* ================= SCREEN 4: CINEMATIC GLASS STYLE ================= */
          <div className="relative flex flex-col items-center">
            <div className="w-full max-w-[340px] sm:max-w-[360px] rounded-2xl p-2 bg-gradient-to-b from-white/15 via-white/5 to-white/10 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative group">
              {/* Floating stars badge */}
              <div className="absolute -top-3 -right-2 px-3 py-1 rounded-full bg-amber-400 text-neutral-950 font-bold text-[11px] shadow-lg flex items-center gap-1 z-20">
                <Sparkles className="w-3 h-3 fill-neutral-950" />
                <span>Main Character Mode</span>
              </div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-950">
                <img
                  src={imgError ? getPlaceholderImage(photoIndex + 1, photo.mood) : resolvedSrc}
                  alt={`Swastika - Moment ${photoIndex + 1}`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                
                {/* Floating caption tag inside frame */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[11px] text-amber-200 font-mono tracking-wider">
                    EXHIBIT B · CERTIFIED VIBE
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {photo.frameStyle === 'scrapbook' && (
          /* ================= SCRAPBOOK / MEMORY TAPE STYLE ================= */
          <div className="relative pt-4 flex flex-col items-center">
            {/* Double washi tape */}
            <div className="absolute -top-1 left-12 z-20 w-20 h-5 bg-pink-200/80 backdrop-blur-sm -rotate-6 rounded-sm shadow-sm border border-pink-300/50" />
            <div className="absolute -top-1 right-12 z-20 w-20 h-5 bg-amber-200/80 backdrop-blur-sm rotate-6 rounded-sm shadow-sm border border-amber-300/50" />

            <div
              className="w-full max-w-[340px] sm:max-w-[360px] p-3.5 pb-5 rounded-xl bg-[#1c1a22] border border-pink-500/25 shadow-2xl relative transition-all duration-700"
              style={{ transform: `rotate(${photo.rotationDeg}deg)` }}
            >
              {/* Photo Area with Vintage corners */}
              <div className="relative aspect-[4/5] bg-neutral-900 rounded-lg overflow-hidden shadow-md">
                <img
                  src={imgError ? getPlaceholderImage(photoIndex + 1, photo.mood) : resolvedSrc}
                  alt={`Swastika - Moment ${photoIndex + 1}`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setImgError(true)}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isLoaded ? 'opacity-100 scale-100' : 'opacity-80 scale-105'
                  }`}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Scrapbook pin badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 text-[10px] text-amber-200 font-medium">
                  ✦ Memory #{photoIndex + 1}
                </div>
              </div>

              {/* Scrapbook Caption Footer */}
              <div className="mt-3 px-1 flex items-center justify-between text-neutral-400">
                <span className="font-handwriting text-xl text-pink-300">
                  {photo.title}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">
                  Sept 28
                </span>
              </div>
            </div>
          </div>
        )}

        {photo.frameStyle === 'vintage' && (
          /* ================= VINTAGE / INTIMATE PORTRAIT STYLE ================= */
          <div className="relative flex flex-col items-center">
            <div
              className="w-full max-w-[340px] sm:max-w-[360px] p-3 rounded-2xl bg-gradient-to-b from-[#251e2a] via-[#1a1622] to-[#121019] border border-rose-300/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md relative"
              style={{ transform: `rotate(${photo.rotationDeg}deg)` }}
            >
              {/* Ornate corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-rose-300/60" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-rose-300/60" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-rose-300/60" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-rose-300/60" />

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-950">
                <img
                  src={imgError ? getPlaceholderImage(photoIndex + 1, photo.mood) : resolvedSrc}
                  alt={`Swastika - Moment ${photoIndex + 1}`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/15" />
                
                {/* Subtle soft heart tag */}
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] text-rose-200">
                  🤍 favorite
                </div>
              </div>
            </div>
          </div>
        )}

        {photo.frameStyle === 'spotlight' && (
          /* ================= SPOTLIGHT & EMOTIONAL MOMENT ================= */
          <div className="relative flex flex-col items-center">
            {/* Glowing aura frame */}
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] p-2.5 rounded-3xl bg-gradient-to-b from-pink-500/20 via-neutral-900 to-amber-500/20 border border-pink-500/30 shadow-[0_0_50px_rgba(244,114,182,0.25)]">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950">
                <img
                  src={imgError ? getPlaceholderImage(photoIndex + 1, photo.mood) : resolvedSrc}
                  alt={`Swastika - Moment ${photoIndex + 1}`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                
                {/* Emotional heart mark */}
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-pink-300">
                  <Heart className="w-3.5 h-3.5 fill-pink-300" />
                </div>
              </div>
            </div>
          </div>
        )}

        {photo.frameStyle === 'filmstrip' && (
          /* ================= FILMSTRIP / GOLDEN ARCHIVE STYLE ================= */
          <div className="relative flex flex-col items-center">
            <div className="w-full max-w-[340px] sm:max-w-[360px] p-3 rounded-2xl bg-[#131218] border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative">
              {/* Film Sprocket Perforations Header */}
              <div className="flex justify-between items-center px-2 py-1 mb-2 border-b border-white/5">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-2.5 h-1.5 rounded-xs bg-amber-400/25" />
                ))}
              </div>

              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-950">
                <img
                  src={imgError ? getPlaceholderImage(photoIndex + 1, photo.mood) : resolvedSrc}
                  alt={`Swastika - Moment ${photoIndex + 1}`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Golden archive badge */}
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-amber-400/90 text-neutral-950 font-bold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-neutral-950" />
                  <span>Golden Chapter · 28.09</span>
                </div>
              </div>

              {/* Film Sprocket Perforations Footer */}
              <div className="flex justify-between items-center px-2 py-1 mt-2 border-t border-white/5">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="w-2.5 h-1.5 rounded-xs bg-amber-400/25" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CAPTIONS SECTION */}
        <div className="space-y-3 pt-2 text-center">
          <p className="text-xs uppercase tracking-widest text-pink-400/90 font-semibold">
            {photo.leadCaption}
          </p>
          <p className="text-base sm:text-lg text-neutral-100 font-light leading-relaxed max-w-sm mx-auto">
            {photo.subCaption}
          </p>
          {photo.asideNote && (
            <p className="text-xs sm:text-sm text-neutral-400 font-handwriting text-lg sm:text-xl text-amber-200/90 pt-1">
              "{photo.asideNote}"
            </p>
          )}
        </div>

        {/* NEXT MOMENT BUTTON */}
        <div className="pt-4 flex justify-center">
          <button
            onClick={() => {
              sound.playClick();
              onContinue();
            }}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/15 text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(244,114,182,0.25)] active:scale-95"
          >
            <span>{photoIndex + 1 < totalPhotos ? 'Next Memory' : 'There’s Something Else…'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-pink-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
