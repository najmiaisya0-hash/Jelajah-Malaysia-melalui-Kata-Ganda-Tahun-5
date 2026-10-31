/**
 * Audio synthesis & playback helper.
 * Supports real teacher voice recordings and Web Audio API procedural sound effects.
 */

export const AUDIO_FILES = {
  pengenalan: '/assets/aistudio/pengenalan_8a6fc28a.wav',
  kaptenCilik: '/assets/aistudio/kapten_cilik_cd1c55b6.wav',
  setInduksiSabah: '/assets/aistudio/set_induksi_7b7330fd.wav',
  sangKancil: '/assets/aistudio/sang_kancil_f3c467fb.wav',
  pantunMutiara: '/assets/aistudio/pantun_mutiara_2095a2d4.wav',
  borneo: '/assets/aistudio/borneo_ac10ce5c.wav',
};

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch (e) {
    console.warn('AudioContext not available:', e);
    return null;
  }
}

/** Currently playing voice audio instance */
let currentVoiceAudio: HTMLAudioElement | null = null;

/**
 * Play one of the official teacher voice recordings.
 * Automatically stops any previously playing voice.
 */
export function playVoiceClip(src: string, onEnd?: () => void): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;

  try {
    stopVoiceClip();
    playClickSound();

    const audio = new Audio(src);
    currentVoiceAudio = audio;

    const cleanup = () => {
      if (currentVoiceAudio === audio) {
        currentVoiceAudio = null;
      }
      if (onEnd) onEnd();
    };

    audio.onended = cleanup;
    audio.onerror = cleanup;

    audio.play().catch((err) => {
      console.warn('Audio play prevented or interrupted:', err);
      cleanup();
    });

    return audio;
  } catch (err) {
    console.warn('Error playing voice clip:', err);
    if (onEnd) onEnd();
    return null;
  }
}

/** Stop any currently playing voice audio */
export function stopVoiceClip() {
  if (currentVoiceAudio) {
    try {
      currentVoiceAudio.pause();
      currentVoiceAudio.currentTime = 0;
    } catch (e) {
      console.warn(e);
    }
    currentVoiceAudio = null;
  }
}

/** Check if voice is currently playing */
export function isVoicePlaying(): boolean {
  return currentVoiceAudio !== null && !currentVoiceAudio.paused;
}

/** Play a crisp cheerful click / pop sound on every button press */
export function playClickSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (err) {
    console.warn(err);
  }
}

/** Play a celebratory harmonic chime for correct answers */
export function playSuccessSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch (err) {
    console.warn(err);
  }
}

/** Play a celebratory "Pom Pom!" pop sound effect for Kotak Misteri */
export function playPomPomSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    // Two bouncy energetic bubbles: "Pom... Pom!"
    const pops = [
      { time: 0, startFreq: 320, endFreq: 640, duration: 0.12 },
      { time: 0.14, startFreq: 420, endFreq: 880, duration: 0.15 },
    ];

    pops.forEach((p) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime + p.time;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(p.startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(p.endFreq, t + p.duration);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + p.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + p.duration);
    });
  } catch (err) {
    console.warn(err);
  }
}

/** Play a cheerful "Wow!" rising fanfare sparkle */
export function playWowSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.28);
    });
  } catch (err) {
    console.warn(err);
  }
}

/** Play a soft friendly tap for selection */
export function playSelectSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch (err) {
    console.warn(err);
  }
}

/** No-op dummy fallback for any legacy speakMalay calls */
export function speakMalay(_text: string, onEnd?: () => void) {
  if (onEnd) onEnd();
}

export function stopSpeaking() {
  stopVoiceClip();
}
