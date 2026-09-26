import React, { useState } from 'react';
import { X, Upload, CheckCircle2, RotateCcw, AlertCircle, FileText } from 'lucide-react';
import { BIRTHDAY_PHOTOS } from '../config/photos';
import { sound } from '../utils/audio';

interface PhotoCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotosUpdated: () => void;
}

export const PhotoCustomizerModal: React.FC<PhotoCustomizerModalProps> = ({
  isOpen,
  onClose,
  onPhotosUpdated,
}) => {
  const [photoPreviews, setPhotoPreviews] = useState<{ [key: string]: string }>(() => {
    const initial: { [key: string]: string } = {};
    BIRTHDAY_PHOTOS.forEach((photo) => {
      const stored = localStorage.getItem(photo.storageKey);
      if (stored) initial[photo.id] = stored;
    });
    return initial;
  });

  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (photoId: string, storageKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        localStorage.setItem(storageKey, result);
        setPhotoPreviews((prev) => ({ ...prev, [photoId]: result }));
        sound.playChime();
        setNotification(`Photo ${photoId.replace('photo-', '')} updated!`);
        setTimeout(() => setNotification(null), 3000);
        onPhotosUpdated();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = (photoId: string, storageKey: string) => {
    localStorage.removeItem(storageKey);
    setPhotoPreviews((prev) => {
      const copy = { ...prev };
      delete copy[photoId];
      return copy;
    });
    sound.playClick();
    onPhotosUpdated();
  };

  const handleResetAll = () => {
    BIRTHDAY_PHOTOS.forEach((photo) => localStorage.removeItem(photo.storageKey));
    setPhotoPreviews({});
    sound.playClick();
    onPhotosUpdated();
    setNotification('All photos reset to default paths.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141419] border border-white/10 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
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

        <div className="mb-4">
          <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold">
            Photo Setup
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">
            Swastika's 6 Photographs & Memories
          </h2>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            Upload her photos here to preview them instantly in your browser, or save them in{' '}
            <code className="text-pink-300 font-mono bg-pink-500/10 px-1 py-0.5 rounded">
              /public/assets/
            </code>
          </p>
        </div>

        {notification && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* 3 Photo slots */}
        <div className="space-y-4">
          {BIRTHDAY_PHOTOS.map((photo, index) => {
            const hasUploaded = !!photoPreviews[photo.id];
            const currentImg = photoPreviews[photo.id] || photo.defaultSrc;

            return (
              <div
                key={photo.id}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-center gap-4"
              >
                {/* Thumbnail Preview */}
                <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 shrink-0">
                  <img
                    src={currentImg}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if local file not found yet
                      (e.currentTarget as HTMLImageElement).src =
                        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="80" fill="%23222"><rect width="64" height="80"/><text x="32" y="44" fill="%23888" font-size="12" text-anchor="middle">Photo ' +
                        (index + 1) +
                        '</text></svg>';
                    }}
                  />
                  {hasUploaded && (
                    <div className="absolute top-1 right-1 bg-pink-500 text-white rounded-full p-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Details & Actions */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      Photo {index + 1}: {photo.mood}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 truncate mt-0.5">
                    {photo.tag}
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    Target: /assets/photo{index + 1}.jpg
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-xs font-medium transition-colors border border-pink-500/30">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{hasUploaded ? 'Change Photo' : 'Select Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(photo.id, photo.storageKey, e)}
                      />
                    </label>

                    {hasUploaded && (
                      <button
                        onClick={() => handleReset(photo.id, photo.storageKey)}
                        className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 text-xs hover:bg-white/5 transition-colors"
                        title="Reset to default file"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security / Quality guarantee note */}
        <div className="mt-4 p-3 rounded-lg bg-pink-500/5 border border-pink-500/15 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            <strong className="text-pink-300">Original Integrity:</strong> Swastika’s uploaded
            photos are rendered directly without any AI modifications, retouching, or facial
            alterations. They stay 100% authentic to the original moments.
          </p>
        </div>

        {/* Deployment instructions summary */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleResetAll}
            className="text-xs text-neutral-400 hover:text-rose-300 transition-colors"
          >
            Reset all photos
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
          >
            Done & Return to Site
          </button>
        </div>
      </div>
    </div>
  );
};
