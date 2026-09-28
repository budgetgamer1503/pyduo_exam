// ============================================================================
// PyDuo Speech Engine: Human-like Indian AI Voice (Neural TTS) & STT
// Uses high-quality Neural Indian AI Voice (Neerja & Prabhat) with browser fallback
// ============================================================================

class SpeechEngine {
  constructor() {
    this.currentAudio = null;
    this.isSpeaking = false;
    this.autoRead = true;
    this.selectedAiVoice = "en-IN-NeerjaNeural"; // Default Indian Female AI Voice
    this.availableAiVoices = [
      { id: "en-IN-NeerjaNeural", name: "🇮🇳 Neerja (Indian AI Female - Teacher)", lang: "en-IN" },
      { id: "en-IN-PrabhatNeural", name: "🇮🇳 Prabhat (Indian AI Male - Scholar)", lang: "en-IN" }
    ];

    // Fallback browser synthesis
    this.synth = window.speechSynthesis || null;
    this.browserVoices = [];
    this.selectedBrowserVoice = null;
    this.rate = 0.95;
    this.pitch = 1.0;

    // Speech Recognition (Voice-to-Text STT)
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    this.recognition = SpeechRec ? new SpeechRec() : null;
    this.isListening = false;
    this.onSpeechResult = null;
    this.onListeningChange = null;

    this.initBrowserVoices();
    this.initRecognition();
  }

  initBrowserVoices() {
    if (!this.synth) return;

    const load = () => {
      this.browserVoices = this.synth.getVoices();
      // Prioritize Indian English voices
      const indianPref = ["en-IN", "India", "Neerja", "Heera", "Prabhat", "Rishi", "Veena", "Google English (India)"];
      for (const pref of indianPref) {
        const found = this.browserVoices.find(v => v.lang.includes("en-IN") || v.name.includes(pref));
        if (found) {
          this.selectedBrowserVoice = found;
          break;
        }
      }
      if (!this.selectedBrowserVoice && this.browserVoices.length > 0) {
        this.selectedBrowserVoice = this.browserVoices.find(v => v.lang.startsWith("en")) || this.browserVoices[0];
      }
    };

    load();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = load;
    }
  }

  initRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-IN"; // Indian English accent recognition

    this.recognition.onstart = () => {
      this.isListening = true;
      if (this.onListeningChange) this.onListeningChange(true);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onListeningChange) this.onListeningChange(false);
    };

    this.recognition.onerror = (event) => {
      console.warn("Speech recognition notice:", event.error);
      this.isListening = false;
      if (this.onListeningChange) this.onListeningChange(false);
    };

    this.recognition.onresult = (event) => {
      let interim = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const text = (finalTranscript || interim).trim();
      if (this.onSpeechResult && text) {
        this.onSpeechResult(text, Boolean(finalTranscript));
      }
    };
  }

  setAiVoice(voiceId) {
    this.selectedAiVoice = voiceId;
  }

  isLocalServer() {
    const host = window.location.hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0" || host.startsWith("192.168.") || host.startsWith("10.");
  }

  // Speak text using realistic Indian AI voice with animated mascot sync
  async speak(text, onStartCallback = null, onEndCallback = null) {
    this.stop(); // Stop any currently playing audio

    const cleanText = text
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/#+\s+/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[\n\r]+/g, " ");

    if (!cleanText.trim()) return;

    // On GitHub Pages or static hosting: directly use browser synthesis to preserve user gesture
    if (!this.isLocalServer()) {
      this.speakBrowserFallback(cleanText, onStartCallback, onEndCallback);
      return;
    }

    try {
      // 1. Try server-side Indian Neural Voice (studio-grade quality on local server)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: cleanText,
          voice: this.selectedAiVoice
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("Backend TTS returned non-200");

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      this.currentAudio = new Audio(audioUrl);

      this.currentAudio.onplay = () => {
        this.isSpeaking = true;
        if (window.mascot) window.mascot.setSpeaking(true);
        if (onStartCallback) onStartCallback();
      };

      this.currentAudio.onended = () => {
        this.isSpeaking = false;
        if (window.mascot) window.mascot.setSpeaking(false);
        if (onEndCallback) onEndCallback();
      };

      this.currentAudio.onerror = () => {
        this.speakBrowserFallback(cleanText, onStartCallback, onEndCallback);
      };

      await this.currentAudio.play();
    } catch (e) {
      console.warn("Using browser synthesis fallback:", e);
      this.speakBrowserFallback(cleanText, onStartCallback, onEndCallback);
    }
  }

  // Fallback to browser SpeechSynthesis with Indian accent prioritization
  speakBrowserFallback(cleanText, onStartCallback, onEndCallback) {
    if (!this.synth) return;

    const utter = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedBrowserVoice) {
      utter.voice = this.selectedBrowserVoice;
    }
    utter.rate = this.rate;
    utter.pitch = this.pitch;

    utter.onstart = () => {
      this.isSpeaking = true;
      if (window.mascot) window.mascot.setSpeaking(true);
      if (onStartCallback) onStartCallback();
    };

    utter.onend = () => {
      this.isSpeaking = false;
      if (window.mascot) window.mascot.setSpeaking(false);
      if (onEndCallback) onEndCallback();
    };

    utter.onerror = () => {
      this.isSpeaking = false;
      if (window.mascot) window.mascot.setSpeaking(false);
      if (onEndCallback) onEndCallback();
    };

    this.synth.speak(utter);
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    if (window.mascot) window.mascot.setSpeaking(false);
  }

  startListening(callback, onListeningChange = null) {
    if (!this.recognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Android Chrome.");
      return;
    }
    this.onSpeechResult = callback;
    this.onListeningChange = onListeningChange;
    try {
      this.recognition.start();
    } catch (e) {
      console.warn("Recognition already active", e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}

// Global instance
window.speechEngine = new SpeechEngine();

