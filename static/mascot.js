// ============================================================================
// PyMimi Mascot: Cheerful, Expressive Vector Mascot (Duolingo & Mimi Style)
// Pure SVG with live facial animations, talking lip-sync & emotional states
// ============================================================================

class PyMimiMascot {
  constructor(containerId = "mascot-container") {
    this.container = document.getElementById(containerId);
    this.state = "idle"; // 'idle' | 'happy' | 'sad' | 'thinking' | 'celebrating'
    this.isSpeaking = false;
    this.speechInterval = null;
    this.blinkInterval = null;
    this.render();
    this.startBlinking();
  }

  setContainer(element) {
    this.container = element;
    this.render();
  }

  setState(newState, speechBubbleText = null) {
    this.state = newState;
    this.render();
    if (speechBubbleText) {
      this.say(speechBubbleText);
    }
  }

  setSpeaking(speaking) {
    this.isSpeaking = speaking;
    const mouth = document.getElementById("pymimi-mouth");
    if (!mouth) return;

    if (speaking) {
      if (!this.speechInterval) {
        let frame = 0;
        this.speechInterval = setInterval(() => {
          frame++;
          if (frame % 2 === 0) {
            // Mouth open (talking)
            mouth.setAttribute("d", "M 70 82 Q 80 96 90 82 Z");
            mouth.setAttribute("fill", "#ff4b4b");
          } else {
            // Mouth half-open
            mouth.setAttribute("d", "M 70 82 Q 80 89 90 82");
            mouth.setAttribute("fill", "none");
          }
        }, 160);
      }
    } else {
      if (this.speechInterval) {
        clearInterval(this.speechInterval);
        this.speechInterval = null;
      }
      // Reset mouth to gentle smile
      mouth.setAttribute("d", "M 70 80 Q 80 90 90 80");
      mouth.setAttribute("fill", "none");
    }
  }

  startBlinking() {
    this.blinkInterval = setInterval(() => {
      if (this.state === "celebrating" || this.state === "happy") return;
      const leftEye = document.getElementById("pymimi-left-eye");
      const rightEye = document.getElementById("pymimi-right-eye");
      if (leftEye && rightEye) {
        leftEye.setAttribute("ry", "1");
        rightEye.setAttribute("ry", "1");
        setTimeout(() => {
          leftEye.setAttribute("ry", "6");
          rightEye.setAttribute("ry", "6");
        }, 180);
      }
    }, 3800);
  }

  say(text) {
    const bubble = document.getElementById("pymimi-bubble");
    const textEl = document.getElementById("pymimi-bubble-text");
    if (bubble && textEl) {
      textEl.innerText = text;
      bubble.classList.remove("hidden");
      bubble.classList.add("pop-in");
    }
  }

  hideSpeech() {
    const bubble = document.getElementById("pymimi-bubble");
    if (bubble) bubble.classList.add("hidden");
  }

  render() {
    if (!this.container) return;

    let eyeAttrsLeft = `cx="68" cy="65" rx="6" ry="6" fill="#1b2e1b"`;
    let eyeAttrsRight = `cx="92" cy="65" rx="6" ry="6" fill="#1b2e1b"`;
    let mouthD = "M 70 80 Q 80 90 90 80";
    let bodyClass = "pymimi-idle";
    let cheeks = `
      <circle cx="58" cy="74" r="5" fill="#ff7f7f" opacity="0.6" />
      <circle cx="102" cy="74" r="5" fill="#ff7f7f" opacity="0.6" />
    `;

    if (this.state === "happy") {
      bodyClass = "pymimi-happy";
      mouthD = "M 68 78 Q 80 95 92 78 Z";
      cheeks = `
        <circle cx="58" cy="74" r="6" fill="#ff4b4b" opacity="0.8" />
        <circle cx="102" cy="74" r="6" fill="#ff4b4b" opacity="0.8" />
      `;
    } else if (this.state === "sad") {
      bodyClass = "pymimi-sad";
      mouthD = "M 72 86 Q 80 78 88 86";
    } else if (this.state === "thinking") {
      bodyClass = "pymimi-thinking";
      mouthD = "M 72 82 Q 80 82 88 80";
      eyeAttrsLeft = `cx="71" cy="62" rx="6" ry="6" fill="#1b2e1b"`;
      eyeAttrsRight = `cx="95" cy="62" rx="6" ry="6" fill="#1b2e1b"`;
    } else if (this.state === "celebrating") {
      bodyClass = "pymimi-celebrating";
      mouthD = "M 66 76 Q 80 98 94 76 Z";
    }

    this.container.innerHTML = `
      <div class="mascot-wrapper ${bodyClass}">
        <!-- Speech Bubble -->
        <div id="pymimi-bubble" class="pymimi-speech-bubble hidden">
          <p id="pymimi-bubble-text">Let's write some awesome code!</p>
          <div class="bubble-arrow"></div>
        </div>

        <!-- SVG Mascot Body -->
        <svg viewBox="0 0 160 160" width="130" height="130" class="pymimi-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mimiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#58cc02" />
              <stop offset="100%" stop-color="#46a302" />
            </linearGradient>
            <linearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fdf498" />
              <stop offset="100%" stop-color="#ffd900" />
            </linearGradient>
            <filter id="mimiGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#2d6600" flood-opacity="0.25"/>
            </filter>
          </defs>

          <!-- Shadow -->
          <ellipse cx="80" cy="148" rx="42" ry="8" fill="#1e293b" opacity="0.2" />

          <!-- Tail Coils (Cute Snake Mascot) -->
          <path d="M 40 135 C 30 135 25 125 35 115 C 45 105 70 120 70 135 Z" fill="url(#mimiGrad)" />
          <path d="M 120 135 C 130 135 135 125 125 115 C 115 105 90 120 90 135 Z" fill="url(#mimiGrad)" />

          <!-- Main Body -->
          <ellipse cx="80" cy="115" rx="38" ry="32" fill="url(#mimiGrad)" filter="url(#mimiGlow)" />

          <!-- Cute Light Yellow Belly -->
          <ellipse cx="80" cy="120" rx="22" ry="20" fill="url(#bellyGrad)" />
          <!-- Belly Stripes -->
          <path d="M 68 112 Q 80 115 92 112" stroke="#e0b800" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M 66 122 Q 80 125 94 122" stroke="#e0b800" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M 70 130 Q 80 133 90 130" stroke="#e0b800" stroke-width="2" fill="none" stroke-linecap="round"/>

          <!-- Head -->
          <circle cx="80" cy="68" r="34" fill="url(#mimiGrad)" filter="url(#mimiGlow)" />

          <!-- Cheeks -->
          ${cheeks}

          <!-- Smart Graduation Cap or Nerd Specs -->
          <!-- Glasses -->
          <circle cx="68" cy="65" r="11" fill="none" stroke="#2563eb" stroke-width="3" />
          <circle cx="92" cy="65" r="11" fill="none" stroke="#2563eb" stroke-width="3" />
          <path d="M 79 65 L 81 65" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>
          <path d="M 57 65 L 50 63" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M 103 65 L 110 63" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>

          <!-- Eyes -->
          <ellipse id="pymimi-left-eye" ${eyeAttrsLeft} />
          <ellipse id="pymimi-right-eye" ${eyeAttrsRight} />

          <!-- Eye Highlights -->
          <circle cx="66" cy="63" r="2.2" fill="#ffffff" />
          <circle cx="90" cy="63" r="2.2" fill="#ffffff" />

          <!-- Mouth -->
          <path id="pymimi-mouth" d="${mouthD}" stroke="#1b2e1b" stroke-width="3" fill="${this.state === 'happy' || this.state === 'celebrating' ? '#ff4b4b' : 'none'}" stroke-linecap="round" />

          <!-- Graduation Cap (Class XII Scholar!) -->
          <polygon points="80,24 116,34 80,44 44,34" fill="#1e293b" />
          <rect x="62" y="38" width="36" height="10" rx="3" fill="#0f172a" />
          <!-- Tassel -->
          <path d="M 80 34 Q 106 36 108 50" stroke="#fbbf24" stroke-width="2.5" fill="none" />
          <circle cx="108" cy="52" r="3" fill="#fbbf24" />

          <!-- Stars / Sparkles for celebrating -->
          ${this.state === 'celebrating' ? `
            <polygon points="25,40 28,48 36,50 30,56 32,64 25,60 18,64 20,56 14,50 22,48" fill="#fbbf24" />
            <polygon points="135,35 137,41 143,42 139,47 140,53 135,50 130,53 131,47 127,42 133,41" fill="#fbbf24" />
          ` : ''}
        </svg>
      </div>
    `;
  }
}

window.PyMimiMascot = PyMimiMascot;
