// ============================================================================
// PyDuo Speech Engine: Human-like Text-to-Speech & Voice Recognition
// ============================================================================

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voices = [];
    this.selectedVoice = null;
    this.rate = 1.0;
    this.pitch = 1.05;
    this.volume = 1.0;
    this.isSpeaking = false;
    this.autoRead = true;

    // Speech Recognition (STT)
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    this.recognition = SpeechRec ? new SpeechRec() : null;
    this.isListening = false;
    this.onSpeechResult = null;
    this.onListeningChange = null;

    this.initVoices();
    this.initRecognition();
  }

  initVoices() {
    if (!this.synth) return;

    const load = () => {
      this.voices = this.synth.getVoices();
      // Look for natural human-like English voices
      const preferred = [
        "Google US English",
        "Microsoft Jenny Online (Natural)",
        "Microsoft Guy Online (Natural)",
        "Google UK English Female",
        "Samantha",
        "Daniel",
        "Karen",
        "Moira",
        "en-US",
        "en-GB"
      ];

      for (const pref of preferred) {
        const found = this.voices.find(v => v.name.includes(pref) || v.lang.startsWith(pref));
        if (found) {
          this.selectedVoice = found;
          break;
        }
      }

      if (!this.selectedVoice && this.voices.length > 0) {
        this.selectedVoice = this.voices.find(v => v.lang.startsWith("en")) || this.voices[0];
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
    this.recognition.lang = "en-US";

    this.recognition.onstart = () => {
      this.isListening = true;
      if (this.onListeningChange) this.onListeningChange(true);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onListeningChange) this.onListeningChange(false);
    };

    this.recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
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

  // Speak text with human-like prosody and optional callback
  speak(text, onStartCallback = null, onEndCallback = null) {
    if (!this.synth) return;

    this.stop(); // Stop any pending speech

    // Clean markdown symbols for natural narration
    const cleanText = text
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/#+\s+/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[\n\r]+/g, ". ");

    const utter = new SpeechSynthesisUtterance(cleanText);
    if (this.selectedVoice) {
      utter.voice = this.selectedVoice;
    }
    utter.rate = this.rate;
    utter.pitch = this.pitch;
    utter.volume = this.volume;

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
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      if (window.mascot) window.mascot.setSpeaking(false);
    }
  }

  startListening(callback, onListeningChange = null) {
    if (!this.recognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
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
