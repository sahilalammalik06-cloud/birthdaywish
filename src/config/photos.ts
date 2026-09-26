/**
 * ============================================================================
 * SWASTIKA'S BIRTHDAY PHOTOS CONFIGURATION
 * ============================================================================
 * 
 * Instructions to replace with Swastika's real photos:
 * 
 * Option A (Easiest - Directly in Browser):
 *   Click the small "📷 Photos" button in the top corner of the app to upload/select
 *   Swastika's photos right in your browser!
 * 
 * Option B (Files in project):
 *   Save your 3 photographs into the /public/assets/ folder named:
 *   - photo1.jpg
 *   - photo2.jpg
 *   - photo3.jpg
 * 
 * Option C (Code edit):
 *   Replace the file paths or paste base64/image URLs directly below:
 */

export interface BirthdayPhoto {
  id: string;
  defaultSrc: string;
  storageKey: string;
  tag: string;
  mood: string;
  title: string;
  leadCaption: string;
  subCaption: string;
  asideNote?: string;
  frameStyle: 'polaroid' | 'cinematic' | 'spotlight' | 'scrapbook' | 'filmstrip' | 'vintage';
  rotationDeg: number;
}

export const BIRTHDAY_PHOTOS: BirthdayPhoto[] = [
  {
    id: 'photo-1',
    // REPLACE WITH SWASTIKA PHOTO 1
    defaultSrc: '/assets/photo1.jpg',
    storageKey: 'swastika_photo_1',
    tag: 'Sept 28 · Birthday Girl ✨',
    mood: 'Playful',
    title: 'The Unofficial Main Character',
    leadCaption: 'Okay, let’s start with the obvious…',
    subCaption: 'Birthday girl spotted. 👀✨ And yes, you’re officially allowed to be this photogenic today.',
    asideNote: 'No complaints. 😂',
    frameStyle: 'polaroid',
    rotationDeg: -2,
  },
  {
    id: 'photo-2',
    // REPLACE WITH SWASTIKA PHOTO 2
    defaultSrc: '/assets/photo2.jpg',
    storageKey: 'swastika_photo_2',
    tag: 'A Certain Vibe ✨',
    mood: 'Cute & Friendly',
    title: 'Effortless Charm',
    leadCaption: 'Some pictures just have a certain vibe…',
    subCaption: 'This one definitely does. ✨ Maybe it’s the smile. Maybe it’s you. I’ll let you decide. 😌',
    asideNote: 'Effortlessly iconic.',
    frameStyle: 'cinematic',
    rotationDeg: 1.5,
  },
  {
    id: 'photo-3',
    // REPLACE WITH SWASTIKA PHOTO 3
    defaultSrc: '/assets/photo3.jpg',
    storageKey: 'swastika_photo_3',
    tag: 'Main Character Mode 🎬',
    mood: 'Funny',
    title: 'Public Service Announcement',
    leadCaption: 'Important announcement:',
    subCaption: 'Swastika has officially entered Main Character Mode™. 🎬✨ Please remain calm.',
    asideNote: 'And please don’t let this information make you even more confident. 😂',
    frameStyle: 'scrapbook',
    rotationDeg: -1.5,
  },
  {
    id: 'photo-4',
    // REPLACE WITH SWASTIKA PHOTO 4
    defaultSrc: '/assets/photo4.jpg',
    storageKey: 'swastika_photo_4',
    tag: 'Quiet Moments 🤍',
    mood: 'More Personal',
    title: 'Something Genuinely True',
    leadCaption: 'Okay… jokes aside for a second.',
    subCaption: 'There are some people who somehow make ordinary moments feel a little nicer.',
    asideNote: 'You’re one of those people. 🤍',
    frameStyle: 'vintage',
    rotationDeg: 1.2,
  },
  {
    id: 'photo-5',
    // REPLACE WITH SWASTIKA PHOTO 5
    defaultSrc: '/assets/photo5.jpg',
    storageKey: 'swastika_photo_5',
    tag: 'Subtle Hint 👀',
    mood: 'Subtle Romantic Hint',
    title: 'Saved For Tomorrow',
    leadCaption: 'And then there’s this one…',
    subCaption: 'I was going to write something clever here. But honestly, I think I’ll save it for tomorrow. 👀',
    asideNote: 'For now… just keep smiling, birthday girl. 🤍✨',
    frameStyle: 'spotlight',
    rotationDeg: -1,
  },
  {
    id: 'photo-6',
    // REPLACE WITH SWASTIKA PHOTO 6
    defaultSrc: '/assets/photo6.jpg',
    storageKey: 'swastika_photo_6',
    tag: 'The Golden Chapter ✨',
    mood: 'Archival Favorite',
    title: 'Deserved Its Own Moment',
    leadCaption: 'Okay… I’ll admit it.',
    subCaption: 'This one deserved its own moment. Some people just make ordinary days feel a little less ordinary.',
    asideNote: 'A permanent favorite for the archives. 😌✨',
    frameStyle: 'filmstrip',
    rotationDeg: 0,
  },
];

/**
 * Placeholder SVG data URL generator for elegant photo frame previews
 * before user files are inserted, clearly labeling Photo 1, Photo 2, Photo 3.
 */
export function getPlaceholderImage(photoNumber: number, label: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#241a24" />
          <stop offset="60%" stop-color="#15121a" />
          <stop offset="100%" stop-color="#0d0c11" />
        </radialGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f472b6" />
          <stop offset="50%" stop-color="#fbbf24" />
          <stop offset="100%" stop-color="#ec4899" />
        </linearGradient>
      </defs>
      <rect width="600" height="750" fill="url(#bg)" />
      <rect x="24" y="24" width="552" height="702" rx="16" fill="none" stroke="rgba(244, 114, 182, 0.25)" stroke-width="2" stroke-dasharray="8 8" />
      
      <!-- Camera/Portrait Silhouette -->
      <g transform="translate(300, 310)" text-anchor="middle">
        <circle cx="0" cy="-40" r="54" fill="none" stroke="url(#gold)" stroke-width="3" opacity="0.8" />
        <path d="M-60,70 C-50,0 50,0 60,70" fill="none" stroke="url(#gold)" stroke-width="3" opacity="0.8" />
        <circle cx="0" cy="-40" r="38" fill="rgba(244,114,182,0.12)" />
        <text y="-32" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="bold" fill="#ffffff" opacity="0.9">#${photoNumber}</text>
      </g>
      
      <!-- Text details -->
      <text x="300" y="460" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="600" fill="#fbcfe8" text-anchor="middle" letter-spacing="1">
        SWASTIKA'S PHOTO ${photoNumber}
      </text>
      <text x="300" y="495" font-family="'Caveat', cursive" font-size="24" fill="#fbbf24" text-anchor="middle">
        ${label}
      </text>
      <text x="300" y="550" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#a1a1aa" text-anchor="middle">
        Tap "Customize Photos" above or place /assets/photo${photoNumber}.jpg
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
