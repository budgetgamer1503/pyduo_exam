// ============================================================================
// PyDuo Procedural Sound Engine (Web Audio API)
// Instant, zero-latency, cheerful sound effects inspired by Duolingo & Mimi
// ============================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle(enabled) {
    this.enabled = enabled;
  }

  playTone(freq, duration = 0.15, type = "sine", gainVal = 0.15, delay = 0) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Sparkling Duolingo-like correct answer chime (Major Triad + Octave)
  playCorrect() {
    if (!this.enabled) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 0.25, "triangle", 0.18, idx * 0.08);
    });
  }

  // Gentle, friendly 'try again' sound (low soft bounce)
  playWrong() {
    if (!this.enabled) return;
    this.init();
    this.playTone(260, 0.2, "sawtooth", 0.12, 0);
    this.playTone(220, 0.35, "sine", 0.15, 0.12);
  }

  // Tactile button click / pop
  playClick() {
    if (!this.enabled) return;
    this.init();
    this.playTone(600, 0.05, "sine", 0.08, 0);
  }

  // Triumphant Level Complete Fanfare
  playLevelUp() {
    if (!this.enabled) return;
    this.init();
    const melody = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 659.25, d: 0.15, t: 0.15 },
      { f: 783.99, d: 0.18, t: 0.30 },
      { f: 1046.5, d: 0.45, t: 0.48 }
    ];
    melody.forEach(m => {
      this.playTone(m.f, m.d, "triangle", 0.2, m.t);
    });
  }

  // Streak celebration flame sound
  playStreak() {
    if (!this.enabled) return;
    this.init();
    this.playTone(440, 0.1, "sine", 0.1, 0);
    this.playTone(554.37, 0.12, "sine", 0.1, 0.08);
    this.playTone(659.25, 0.25, "triangle", 0.15, 0.16);
  }

  // Gem collecting chime
  playGem() {
    if (!this.enabled) return;
    this.init();
    this.playTone(1318.51, 0.12, "sine", 0.15, 0); // E6
    this.playTone(1760.00, 0.25, "triangle", 0.18, 0.1); // A6
  }

  // Heart healing / refill sound
  playHeal() {
    if (!this.enabled) return;
    this.init();
    const chord = [392.00, 493.88, 587.33, 783.99]; // G4, B4, D5, G5
    chord.forEach((f, i) => {
      this.playTone(f, 0.3, "sine", 0.12, i * 0.09);
    });
  }
}

// Export instance
window.soundEngine = new SoundEngine();
