# ✨ Swastika's Birthday Surprise Website — Setup & Deployment Guide

This website is a personal, warm, playful, and subtly romantic birthday surprise created specifically for **Swastika** (Birthday: September 28).

---

## 📸 1. Where to Put Swastika's Three Photos

You have two very easy ways to use her real photos:

### Method A — Right in the Browser Preview (Instant & Zero Coding)
1. Open the running website.
2. In the top-right corner, click the **"📷 Photos"** button.
3. Tap **"Select Photo"** for:
   - **Photo 1** (Playful / Birthday Girl Spotted)
   - **Photo 2** (Cute & Friendly / Main Character Mode)
   - **Photo 3** (Cinematic / Deserved Its Own Moment)
4. Your browser will instantly display them with polaroid and spotlight frames. It saves automatically in your browser storage!

### Method B — Save Image Files in `/public/assets/`
Put your 3 photos into the `public/assets/` folder with these exact names:
- `/public/assets/photo1.jpg`
- `/public/assets/photo2.jpg`
- `/public/assets/photo3.jpg`

*(In `src/config/photos.ts`, you will find the lines clearly marked with `// REPLACE WITH SWASTIKA PHOTO 1`, `// REPLACE WITH SWASTIKA PHOTO 2`, and `// REPLACE WITH SWASTIKA PHOTO 3` if you want to change filenames or use online URLs).*

---

## 🎵 2. Where to Put the Original Song

1. **Built-in synthesized jingle**: The website already includes an original custom music-box chime jingle created specifically for Swastika, playing the melody and synced with the on-screen karaoke lyrics. It requires zero external files and works immediately!
2. **Custom audio file (Optional)**: If you have your own recorded song or audio file, save it as:
   - `/public/assets/birthday-song.mp3`

---

## 💻 3. How to Preview the Website

The website is already running in your development environment.
- Tap **"Okay, show me →"** to begin the story.
- Tap **"Open it 🎁"** to pop the gift box with sparkles & confetti.
- Enjoy each photo frame and playful classmate caption.
- Tap **"Play Birthday Jingle"** to listen to the custom tune with glowing lyrics.
- Select answer **D** on the birthday quiz to see the surprise reaction.
- Tap **"Blow the candles ✨"** on the birthday cake to make a wish and extinguish the candles!
- Tap **"Wait… one last note 👀"** to reveal the secret note.

---

## 🚀 4. How to Deploy on Vercel or GitHub Pages (Free)

### Deploying to Vercel (Recommended — takes 1 minute):
1. Create a free account at [vercel.com](https://vercel.com).
2. Push your project code to a GitHub repository or connect via the Vercel CLI.
3. In Vercel, click **"Add New Project"** and select your repository.
4. Framework Preset will be detected automatically as **Vite**.
5. Click **Deploy**.
6. You will receive an instant, free live link (e.g. `https://swastika-birthday.vercel.app`) that works smoothly on iPhone, Android, and WhatsApp!

### Building Static Files Manually:
Run:
```bash
npm run build
```
This generates a static `dist/` folder containing the compiled `index.html`, CSS, and JavaScript. You can drop this `dist` folder directly onto **Netlify Drop**, **Cloudflare Pages**, or **GitHub Pages**.

---

## 📱 5. How to Send the Link to Swastika on WhatsApp

Copy and send this warm, natural message along with your live link:

> *"Hey Swastika, happy birthday! 🎂✨ I could have just texted you a normal wish, but you deserved something a little nicer. Made a tiny universe for you today: [YOUR_LINK_HERE] 😌"*

Happy Birthday to Swastika! 🎂✨
