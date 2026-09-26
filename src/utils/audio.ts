/**
 * Web Audio API synthesizer and sound effects for Swastika's Birthday Experience.
 * Provides custom music-box melody and haptic-like sound effects with zero external audio assets required.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isPlayingBgm: boolean = false;
  private bgmTimeoutId: number | null = null;
  private currentNoteIndex: number = 0;
  private activeOscillators: OscillatorNode[] = [];

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.value = 0.28;
      this.bgmGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.4;
      this.sfxGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgmGain && this.sfxGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.28, now);
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, now);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Play a soft tactile click
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio context handling
    }
  }

  // Sparkly celebration chime for gift opening
  public playChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.001, this.ctx!.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.25, this.ctx!.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.07 + 1.2);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(this.ctx!.currentTime + idx * 0.07);
        osc.stop(this.ctx!.currentTime + idx * 0.07 + 1.25);
      });
    } catch {
      // Audio context handling
    }
  }

  // Candle blow whoosh and extinguish
  public playCandleBlow() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      // Soft wind noise
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.7);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, this.ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + 0.8);
    } catch {
      // Audio context handling
    }
  }

  // Confetti pop sound
  public playConfettiPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio context handling
    }
  }

  // Play a gentle music box bell tone
  private playBellNote(freq: number, startTime: number, duration: number = 0.9) {
    if (!this.ctx || !this.bgmGain) return;

    // Fundamental Sine wave
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Harmonic overtone for shimmering music box kalimba warmth
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, startTime);

    gain1.gain.setValueAtTime(0.2, startTime);
    gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    gain2.gain.setValueAtTime(0.08, startTime);
    gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.6);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(this.bgmGain);
    gain2.connect(this.bgmGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);

    this.activeOscillators.push(osc1, osc2);
  }

  /**
   * Original birthday jingle melody specifically crafted for Swastika
   * Note frequencies (Hz):
   * C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88
   * C5=523.25, D5=587.33, E5=659.25, F5=698.46, G5=783.99, A5=880.00
   */
  public startBirthdayJingle(onNoteProgress?: (lineIdx: number, progressRatio: number) => void) {
    this.initContext();
    this.stopBirthdayJingle();
    this.isPlayingBgm = true;

    // Melody sequence: [frequency, durationInBeats, lyricLineIndex]
    // 1 beat = 0.36 seconds (~83 BPM)
    const beatSec = 0.38;
    const melody: [number, number, number][] = [
      // Line 0: "Hey Swastika, today's your day" (G4 - A4 - C5 - A4 - G4 - E4 - G4)
      [392.00, 1, 0],
      [440.00, 1, 0],
      [523.25, 1.5, 0],
      [440.00, 1, 0],
      [392.00, 1, 0],
      [329.63, 1, 0],
      [392.00, 2, 0],

      // Line 1: "Another year, another way" (A4 - C5 - D5 - C5 - A4 - G4)
      [440.00, 1, 1],
      [523.25, 1, 1],
      [587.33, 1.5, 1],
      [523.25, 1, 1],
      [440.00, 1.5, 1],
      [392.00, 2, 1],

      // Line 2: "Keep that smile, keep shining bright" (C5 - D5 - E5 - D5 - C5 - A4 - C5)
      [523.25, 1, 2],
      [587.33, 1, 2],
      [659.25, 1.5, 2],
      [587.33, 1, 2],
      [523.25, 1, 2],
      [440.00, 1, 2],
      [523.25, 2, 2],

      // Line 3: "Hope your whole year feels just right" (E5 - D5 - C5 - A4 - G4 - C5)
      [659.25, 1, 3],
      [587.33, 1, 3],
      [523.25, 1, 3],
      [440.00, 1, 3],
      [392.00, 1.5, 3],
      [523.25, 2.5, 3],

      // Line 4: "Through every class and every test" (G4 - A4 - C5 - A4 - G4 - E4)
      [392.00, 1, 4],
      [440.00, 1, 4],
      [523.25, 1.5, 4],
      [440.00, 1, 4],
      [392.00, 1, 4],
      [329.63, 2, 4],

      // Line 5: "Here's wishing you the absolute best" (A4 - C5 - D5 - E5 - D5 - C5)
      [440.00, 1, 5],
      [523.25, 1, 5],
      [587.33, 1.2, 5],
      [659.25, 1.2, 5],
      [587.33, 1, 5],
      [523.25, 2.5, 5],

      // Line 6: "A little joy, a little grace" (E5 - G5 - E5 - D5 - C5 - A4)
      [659.25, 1, 6],
      [783.99, 1.5, 6],
      [659.25, 1, 6],
      [587.33, 1, 6],
      [523.25, 1, 6],
      [440.00, 2, 6],

      // Line 7: "Happy Birthday, Swastika... ✨" (C5 - D5 - E5 - G5 - C6)
      [523.25, 1, 7],
      [587.33, 1, 7],
      [659.25, 1.5, 7],
      [783.99, 1.5, 7],
      [1046.50, 3.5, 7],
    ];

    const playLoop = () => {
      if (!this.isPlayingBgm || !this.ctx) return;
      const startCtxTime = this.ctx.currentTime + 0.05;
      let accumulatedTime = 0;

      melody.forEach(([freq, durationBeats, lineIdx]) => {
        const noteDuration = durationBeats * beatSec;
        const noteTime = startCtxTime + accumulatedTime;

        this.playBellNote(freq, noteTime, noteDuration * 1.35);

        // Schedule visual sync callback
        if (onNoteProgress) {
          const timeoutDelay = Math.max(0, (noteTime - this.ctx!.currentTime) * 1000);
          setTimeout(() => {
            if (this.isPlayingBgm) {
              onNoteProgress(lineIdx, accumulatedTime / (melody.length * beatSec));
            }
          }, timeoutDelay);
        }

        accumulatedTime += noteDuration;
      });

      // Schedule next loop with gentle pause
      const totalLoopTimeMs = (accumulatedTime + 2.5) * 1000;
      this.bgmTimeoutId = window.setTimeout(() => {
        if (this.isPlayingBgm) {
          playLoop();
        }
      }, totalLoopTimeMs);
    };

    playLoop();
  }

  public stopBirthdayJingle() {
    this.isPlayingBgm = false;
    if (this.bgmTimeoutId) {
      clearTimeout(this.bgmTimeoutId);
      this.bgmTimeoutId = null;
    }
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Already stopped
      }
    });
    this.activeOscillators = [];
  }

  public isJinglePlaying(): boolean {
    return this.isPlayingBgm;
  }
}

export const sound = new SoundEngine();
