// ============================================================================
// PyDuo Exam Quest - Main Application Engine
// Class XII Computer Science (COMS) Semester III Gamified Learning Platform
// ============================================================================

class PyDuoApp {
  constructor() {
    this.state = {
      xp: 120,
      streak: 3,
      hearts: 5,
      max_hearts: 5,
      gems: 250,
      current_stage: 1,
      completed_stages: [1],
      stage_stars: { "1": 3 },
      completed_lessons: ["1-1", "1-2"],
      voice_mode: true,
      sound_enabled: true,
      speech_rate: 1.0,
      speech_pitch: 1.0,
      unlocked_badges: ["first_code", "streak_starter"],
      notes_bookmarked: []
    };

    this.currentView = "journey"; // 'journey' | 'lesson' | 'playground' | 'exam' | 'vault' | 'arena'
    this.lessonMode = "explain"; // 'explain' (teaching first!) | 'quiz' (interactive questions)
    this.activeLesson = null;
    this.activeStage = null;
    this.lessonQuestions = [];
    this.currentQuestionIdx = 0;
    this.lessonXpEarned = 0;
    this.lessonMistakes = 0;
    this.selectedAnswer = null;
    this.isAnswerChecked = false;
    this.examTimer = null;
    this.examSecondsLeft = 45 * 60;
    this.examAnswers = {};
    this.localIp = "10.199.60.246";
    this.networkInfo = null;

    this.init();
  }

  async init() {
    this.initTheme();
    await this.fetchServerProgress();
    await this.fetchNetworkInfo();
    this.bindEvents();
    this.updateStatsBar();
    this.renderCurrentView();

    // Initialize global mascot
    window.mascot = new PyMimiMascot("global-mascot-container");
    window.mascot.setState("idle", "Ready to ace Class XII Computer Science? Let's go!");

    // Start auto-heart refill timer check
    this.startHeartRegenTimer();
  }

  async fetchServerProgress() {
    try {
      const res = await fetch("/api/progress");
      if (res.ok) {
        const data = await res.json();
        this.state = { ...this.state, ...data };
      }
    } catch (e) {
      console.warn("Using local cached progress", e);
    }
  }

  async saveProgress() {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state)
      });
    } catch (e) {
      console.warn("Failed to sync progress with backend", e);
    }
  }

  async fetchNetworkInfo() {
    try {
      const res = await fetch("/api/network-info");
      if (res.ok) {
        this.networkInfo = await res.json();
        this.localIp = this.networkInfo.local_ip;
      }
    } catch (e) {
      console.warn("Could not fetch network info:", e);
    }
  }

  bindEvents() {
    // Navigation items (Desktop Sidebar)
    document.querySelectorAll(".nav-item").forEach(item => {
      item.addEventListener("click", () => {
        const view = item.dataset.view;
        if (view) {
          window.soundEngine.playClick();
          this.switchView(view);
        }
      });
    });

    // Navigation items (Mobile Bottom Bar)
    document.querySelectorAll(".mobile-nav-item").forEach(item => {
      item.addEventListener("click", () => {
        const view = item.dataset.view;
        if (view) {
          window.soundEngine.playClick();
          this.switchView(view);
        }
      });
    });

    // Mobile Phone Connect Button
    const mobileBtn = document.getElementById("mobile-connect-btn");
    if (mobileBtn) {
      mobileBtn.addEventListener("click", () => {
        this.openMobileConnectModal();
      });
    }

    // Sound toggle
    const soundBtn = document.getElementById("toggle-sound");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        this.state.sound_enabled = !this.state.sound_enabled;
        window.soundEngine.toggle(this.state.sound_enabled);
        soundBtn.innerHTML = this.state.sound_enabled ? "🔊" : "🔇";
        soundBtn.classList.toggle("muted", !this.state.sound_enabled);
        this.saveProgress();
      });
    }

    // Voice mode toggle
    const voiceBtn = document.getElementById("toggle-voice");
    if (voiceBtn) {
      voiceBtn.addEventListener("click", () => {
        this.state.voice_mode = !this.state.voice_mode;
        voiceBtn.innerHTML = this.state.voice_mode ? "🎙️ Voice: ON" : "🎙️ Voice: OFF";
        voiceBtn.classList.toggle("active-btn", this.state.voice_mode);
        if (!this.state.voice_mode) {
          window.speechEngine.stop();
        }
        this.saveProgress();
      });
    }

    // Refill Hearts modal trigger
    const heartCounter = document.getElementById("heart-counter-btn");
    if (heartCounter) {
      heartCounter.addEventListener("click", () => {
        this.openHeartRefillModal();
      });
    }

    // Dark/Light theme toggle (Sidebar and Header)
    const sidebarThemeBtn = document.getElementById("toggle-theme");
    if (sidebarThemeBtn) {
      sidebarThemeBtn.addEventListener("click", () => this.toggleTheme());
    }

    const headerThemeBtn = document.getElementById("header-theme-toggle");
    if (headerThemeBtn) {
      headerThemeBtn.addEventListener("click", () => this.toggleTheme());
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem("pyduo_theme") || "dark";
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    this.updateThemeButtons();
  }

  toggleTheme() {
    window.soundEngine.playClick();
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("pyduo_theme", isDark ? "dark" : "light");
    this.updateThemeButtons();
  }

  updateThemeButtons() {
    const isDark = document.body.classList.contains("dark-mode");
    const sidebarBtn = document.getElementById("toggle-theme");
    const iconEl = document.getElementById("theme-toggle-icon");
    const labelEl = document.getElementById("theme-toggle-label");

    if (sidebarBtn) {
      sidebarBtn.innerHTML = isDark ? "☀️" : "🌙";
      sidebarBtn.title = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    }
    if (iconEl) iconEl.innerText = isDark ? "☀️" : "🌙";
    if (labelEl) labelEl.innerText = isDark ? "Light" : "Dark";
  }

  updateStatsBar() {
    const streakEl = document.getElementById("stat-streak");
    const gemEl = document.getElementById("stat-gems");
    const heartEl = document.getElementById("stat-hearts");
    const xpEl = document.getElementById("stat-xp");

    if (streakEl) streakEl.innerText = this.state.streak;
    if (gemEl) gemEl.innerText = this.state.gems;
    if (heartEl) heartEl.innerText = `${this.state.hearts}/${this.state.max_hearts}`;
    if (xpEl) xpEl.innerText = `${this.state.xp} XP`;
  }

  switchView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.view === viewName);
    });
    document.querySelectorAll(".mobile-nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.view === viewName);
    });

    // Stop speaking if switching views
    window.speechEngine.stop();

    this.renderCurrentView();
  }

  renderCurrentView() {
    const mainContainer = document.getElementById("main-view-container");
    if (!mainContainer) return;

    mainContainer.innerHTML = "";

    switch (this.currentView) {
      case "journey":
        this.renderJourneyMap(mainContainer);
        break;
      case "lesson":
        this.renderLessonScreen(mainContainer);
        break;
      case "playground":
        this.renderPlayground(mainContainer);
        break;
      case "exam":
        this.renderBoardExam(mainContainer);
        break;
      case "vault":
        this.renderRevisionVault(mainContainer);
        break;
      case "arena":
        this.renderPracticeArena(mainContainer);
        break;
      default:
        this.renderJourneyMap(mainContainer);
    }
  }

  // ==========================================================================
  // VIEW: LEARNING JOURNEY MAP (DUOLINGO PATH)
  // ==========================================================================
  renderJourneyMap(container) {
    const wrapper = document.createElement("div");
    wrapper.className = "journey-map-wrapper";

    let html = `
      <div class="journey-header">
        <div class="journey-banner">
          <div class="banner-badge">CLASS XII COMPUTER SCIENCE • SEMESTER III</div>
          <h2>Interactive Exam Quest Roadmap</h2>
          <p>Master all 35 Marks: Python Programming (25M) & E-Commerce (10M) with PyMimi!</p>
        </div>
      </div>
    `;

    CURRICULUM.units.forEach(unit => {
      html += `
        <div class="unit-section" style="--unit-color: ${unit.color}; --unit-accent: ${unit.accent};">
          <div class="unit-banner">
            <div class="unit-info">
              <span class="unit-tag">${unit.badge}</span>
              <h3>${unit.title}</h3>
              <p>${unit.subtitle}</p>
            </div>
            <div class="unit-trophy">🏆</div>
          </div>

          <div class="path-container">
      `;

      unit.stages.forEach((stage, idx) => {
        const isCompleted = this.state.completed_stages.includes(stage.id);
        const isCurrent = this.state.current_stage === stage.id;
        const isLocked = !isCompleted && !isCurrent && stage.id > (Math.max(...this.state.completed_stages, 0) + 1);
        const stars = this.state.stage_stars[stage.id.toString()] || 0;

        // Alternating zigzag pattern
        const offsets = [0, 45, 90, 45, 0, -45, -90, -45];
        const offsetLeft = offsets[idx % offsets.length];

        html += `
          <div class="stage-node-container" style="transform: translateX(${offsetLeft}px);">
            <div class="stage-node ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''} ${isLocked ? 'locked' : ''}"
                 data-stage-id="${stage.id}">
              <div class="stage-icon">${isLocked ? '🔒' : stage.icon}</div>
              ${isCurrent ? '<div class="pulse-ring"></div>' : ''}
              ${stars > 0 ? `
                <div class="stars-crown">
                  ${'⭐'.repeat(stars)}
                </div>
              ` : ''}
            </div>
            <div class="stage-label">
              <div class="stage-code">${stage.code}</div>
              <div class="stage-title">${stage.title}</div>
            </div>
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    // Add Capstone Exam Node
    html += `
      <div class="capstone-exam-node" id="trigger-board-exam">
        <div class="capstone-card">
          <div class="capstone-icon">🎓</div>
          <div class="capstone-details">
            <h3>Final Boss: Board Exam Mock (35 Marks)</h3>
            <p>Timed 45-minute simulation matching official WBCHSE Class XII Semester III pattern!</p>
          </div>
          <button class="duo-btn duo-btn-primary">Enter Exam Hall ⚡</button>
        </div>
      </div>
    `;

    wrapper.innerHTML = html;
    container.appendChild(wrapper);

    // Bind clicks to stage nodes
    wrapper.querySelectorAll(".stage-node").forEach(node => {
      node.addEventListener("click", () => {
        if (node.classList.contains("locked")) {
          window.soundEngine.playWrong();
          alert("Complete earlier topics first to unlock this quest!");
          return;
        }
        const stageId = parseInt(node.dataset.stageId);
        this.openStageIntroModal(stageId);
      });
    });

    const examBtn = wrapper.querySelector("#trigger-board-exam");
    if (examBtn) {
      examBtn.addEventListener("click", () => {
        window.soundEngine.playClick();
        this.switchView("exam");
      });
    }
  }

  // Stage Pre-Lesson Modal
  openStageIntroModal(stageId) {
    let targetStage = null;
    let targetUnit = null;

    for (const unit of CURRICULUM.units) {
      const found = unit.stages.find(s => s.id === stageId);
      if (found) {
        targetStage = found;
        targetUnit = unit;
        break;
      }
    }

    if (!targetStage) return;

    window.soundEngine.playClick();

    const modal = document.createElement("div");
    modal.className = "duo-modal-overlay";
    modal.innerHTML = `
      <div class="duo-modal-card bounce-in">
        <div class="modal-header" style="background: ${targetUnit.color};">
          <span class="modal-stage-code">${targetStage.code}</span>
          <h2>${targetStage.title}</h2>
          <button class="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="modal-mascot-row">
            <div id="modal-mascot"></div>
            <div class="modal-intro-text">
              <p><strong>Overview:</strong> ${targetStage.desc}</p>
              <div class="summary-box">${targetStage.summary}</div>
            </div>
          </div>

          <div class="lesson-list">
            <h4>Lessons in this Stage:</h4>
            ${targetStage.lessons.map((lesson, lIdx) => {
              const isDone = this.state.completed_lessons.includes(lesson.id);
              return `
                <div class="lesson-row ${isDone ? 'done' : ''}">
                  <span class="lesson-num">${lIdx + 1}</span>
                  <div class="lesson-info">
                    <div class="lesson-name">${lesson.title}</div>
                    <div class="lesson-xp">+${lesson.xp} XP • ${lesson.questions.length} Challenges</div>
                  </div>
                  <button class="duo-btn duo-btn-sm ${isDone ? 'duo-btn-success' : 'duo-btn-primary'} start-lesson-btn"
                          data-stage-id="${targetStage.id}" data-lesson-id="${lesson.id}">
                    ${isDone ? 'Review ⭐' : 'Start ▶'}
                  </button>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Initialize mini mascot in modal
    const miniMascot = new PyMimiMascot("modal-mascot");
    miniMascot.setState("happy", "Let's master this topic!");

    // Close logic
    const closeBtn = modal.querySelector(".modal-close-btn");
    closeBtn.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });

    // Start lesson buttons
    modal.querySelectorAll(".start-lesson-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const sId = parseInt(btn.dataset.stageId);
        const lId = btn.dataset.lessonId;
        modal.remove();
        this.startLesson(sId, lId);
      });
    });
  }

  // ==========================================================================
  // VIEW: INTERACTIVE LESSON SCREEN (DUOLINGO STYLE)
  // ==========================================================================
  startLesson(stageId, lessonId) {
    let stage = null;
    for (const unit of CURRICULUM.units) {
      stage = unit.stages.find(s => s.id === stageId);
      if (stage) break;
    }
    if (!stage) return;

    const lesson = stage.lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    if (this.state.hearts <= 0) {
      this.openHeartRefillModal();
      return;
    }

    this.activeLesson = lesson;
    this.lessonQuestions = [...lesson.questions];
    this.currentQuestionIdx = 0;
    this.lessonXpEarned = 0;
    this.lessonMistakes = 0;
    this.selectedAnswer = null;
    this.isAnswerChecked = false;

    window.soundEngine.playClick();
    this.switchView("lesson");
  }

  renderLessonScreen(container) {
    if (!this.activeLesson) {
      this.switchView("journey");
      return;
    }

    const currentQ = this.lessonQuestions[this.currentQuestionIdx];
    const progressPercent = Math.round((this.currentQuestionIdx / this.lessonQuestions.length) * 100);

    const lessonWrapper = document.createElement("div");
    lessonWrapper.className = "lesson-view-wrapper";

    lessonWrapper.innerHTML = `
      <!-- Lesson Header Progress Bar -->
      <div class="lesson-topbar">
        <button id="exit-lesson-btn" class="icon-circle-btn" title="Quit Lesson">✕</button>
        <div class="duo-progress-container">
          <div class="duo-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
        <div class="lesson-hearts-badge">
          ❤️ ${this.state.hearts}
        </div>
      </div>

      <!-- Mascot & Dialogue Container -->
      <div class="lesson-mascot-row">
        <div id="lesson-mascot-slot"></div>
        <div class="mascot-speech-bubble-large">
          <p id="mascot-speech-content">${this.activeLesson.mascotDialogue || "You've got this!"}</p>
          <div class="speech-controls">
            <button id="speak-question-btn" class="speech-voice-btn" title="Read Aloud">🔊 Listen</button>
            <span class="speech-indicator hidden" id="speech-indicator">Speaking...</span>
          </div>
        </div>
      </div>

      <!-- Question Card Area -->
      <div class="question-card-container">
        <div class="question-header">
          <span class="question-type-badge">${this.getQuestionTypeLabel(currentQ.type)}</span>
          <h3 class="question-prompt">${currentQ.prompt}</h3>
        </div>

        ${currentQ.code ? `
          <div class="code-preview-box">
            <pre><code>${this.escapeHtml(currentQ.code)}</code></pre>
          </div>
        ` : ''}

        <div id="question-interactive-area" class="interactive-area">
          <!-- Dynamically filled based on question type -->
        </div>
      </div>

      <!-- Bottom Action Drawer (Duolingo Style Footer) -->
      <div id="lesson-bottom-drawer" class="lesson-bottom-drawer">
        <div class="drawer-content">
          <div id="drawer-feedback" class="feedback-message hidden">
            <!-- Correct / Wrong message & Deep Dive -->
          </div>
          <div class="drawer-action-btn-row">
            <button id="check-answer-btn" class="duo-btn duo-btn-primary duo-btn-large">Check Answer</button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(lessonWrapper);

    // Initialize Mascot in lesson
    this.lessonMascot = new PyMimiMascot("lesson-mascot-slot");
    this.lessonMascot.setState("idle");

    // Bind Exit
    document.getElementById("exit-lesson-btn").addEventListener("click", () => {
      if (confirm("Are you sure you want to exit? Your lesson progress will be lost.")) {
        this.switchView("journey");
      }
    });

    // Bind Read Aloud
    const speakBtn = document.getElementById("speak-question-btn");
    speakBtn.addEventListener("click", () => {
      const textToSpeak = `${currentQ.voicePrompt || currentQ.prompt}`;
      window.speechEngine.speak(textToSpeak);
    });

    // Auto-read question if voice mode is on
    if (this.state.voice_mode) {
      setTimeout(() => {
        window.speechEngine.speak(currentQ.voicePrompt || currentQ.prompt);
      }, 300);
    }

    // Render Question Widgets
    this.renderQuestionWidgets(currentQ);

    // Check Answer Button Logic
    const checkBtn = document.getElementById("check-answer-btn");
    checkBtn.addEventListener("click", () => {
      if (!this.isAnswerChecked) {
        this.validateCurrentAnswer(currentQ);
      } else {
        this.advanceToNextQuestion();
      }
    });
  }

  getQuestionTypeLabel(type) {
    switch (type) {
      case "mcq": return "Multiple Choice Challenge";
      case "voice": return "🎙️ Voice-to-Text Challenge";
      case "spot_bug": return "🐞 Bug Hunter";
      case "match": return "🔗 Match the Pairs";
      case "fill_blank": return "✏️ Fill in the Code";
      default: return "Question Challenge";
    }
  }

  renderQuestionWidgets(q) {
    const area = document.getElementById("question-interactive-area");
    if (!area) return;

    area.innerHTML = "";

    if (q.type === "mcq" || q.type === "spot_bug") {
      const optionsGrid = document.createElement("div");
      optionsGrid.className = "mcq-options-grid";

      q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "mcq-option-card";
        btn.innerHTML = `
          <span class="opt-key">${idx + 1}</span>
          <span class="opt-text">${this.escapeHtml(opt)}</span>
        `;
        btn.addEventListener("click", () => {
          if (this.isAnswerChecked) return;
          window.soundEngine.playClick();
          document.querySelectorAll(".mcq-option-card").forEach(c => c.classList.remove("selected"));
          btn.classList.add("selected");
          this.selectedAnswer = idx;
        });
        optionsGrid.appendChild(btn);
      });

      area.appendChild(optionsGrid);
    } else if (q.type === "voice") {
      const voiceArea = document.createElement("div");
      voiceArea.className = "voice-challenge-area";

      voiceArea.innerHTML = `
        <div class="voice-mic-container">
          <button id="mic-trigger-btn" class="mic-pulse-btn">
            <span class="mic-icon">🎙️</span>
            <span class="mic-text">Tap to Speak Answer</span>
          </button>
        </div>
        <div class="voice-transcript-box">
          <div class="transcript-label">Recognized Speech:</div>
          <div id="voice-transcript-output" class="transcript-output">"(Press mic and say your answer clearly...)"</div>
        </div>
        <div class="voice-hint-box">
          💡 Hint: ${q.hint || "Speak your answer into the microphone"}
        </div>
        <div class="manual-fallback-input">
          <span>Or type if mic is unavailable:</span>
          <input type="text" id="manual-voice-input" placeholder="Type answer here..." class="duo-input" />
        </div>
      `;

      area.appendChild(voiceArea);

      const micBtn = voiceArea.querySelector("#mic-trigger-btn");
      const transcriptOutput = voiceArea.querySelector("#voice-transcript-output");
      const manualInput = voiceArea.querySelector("#manual-voice-input");

      manualInput.addEventListener("input", (e) => {
        this.selectedAnswer = e.target.value.trim();
      });

      micBtn.addEventListener("click", () => {
        window.soundEngine.playClick();
        transcriptOutput.innerText = "Listening... Speak now!";
        micBtn.classList.add("recording");

        window.speechEngine.startListening(
          (text, isFinal) => {
            transcriptOutput.innerText = `"${text}"`;
            this.selectedAnswer = text;
            if (isFinal) {
              micBtn.classList.remove("recording");
            }
          },
          (isListening) => {
            if (!isListening) micBtn.classList.remove("recording");
          }
        );
      });
    } else if (q.type === "match") {
      const matchGrid = document.createElement("div");
      matchGrid.className = "match-pairs-container";

      let selectedLeft = null;
      let selectedRight = null;
      let solvedCount = 0;
      this.selectedAnswer = false;

      // Scramble right side
      const leftItems = q.pairs.map(p => p.left);
      const rightItems = [...q.pairs.map(p => p.right)].sort(() => Math.random() - 0.5);

      const leftCol = document.createElement("div");
      leftCol.className = "match-col";
      const rightCol = document.createElement("div");
      rightCol.className = "match-col";

      leftItems.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "match-card left-card";
        btn.innerText = item;
        btn.addEventListener("click", () => {
          if (btn.classList.contains("matched")) return;
          window.soundEngine.playClick();
          leftCol.querySelectorAll(".left-card").forEach(c => c.classList.remove("selected"));
          btn.classList.add("selected");
          selectedLeft = item;
          checkPair();
        });
        leftCol.appendChild(btn);
      });

      rightItems.forEach(item => {
        const btn = document.createElement("button");
        btn.className = "match-card right-card";
        btn.innerText = item;
        btn.addEventListener("click", () => {
          if (btn.classList.contains("matched")) return;
          window.soundEngine.playClick();
          rightCol.querySelectorAll(".right-card").forEach(c => c.classList.remove("selected"));
          btn.classList.add("selected");
          selectedRight = item;
          checkPair();
        });
        rightCol.appendChild(btn);
      });

      const checkPair = () => {
        if (selectedLeft && selectedRight) {
          const matchFound = q.pairs.some(p => p.left === selectedLeft && p.right === selectedRight);
          if (matchFound) {
            window.soundEngine.playGem();
            leftCol.querySelector(".left-card.selected").classList.add("matched");
            rightCol.querySelector(".right-card.selected").classList.add("matched");
            leftCol.querySelector(".left-card.selected").classList.remove("selected");
            rightCol.querySelector(".right-card.selected").classList.remove("selected");
            selectedLeft = null;
            selectedRight = null;
            solvedCount++;
            if (solvedCount === q.pairs.length) {
              this.selectedAnswer = true;
            }
          } else {
            window.soundEngine.playWrong();
            leftCol.querySelector(".left-card.selected")?.classList.add("wrong-shake");
            rightCol.querySelector(".right-card.selected")?.classList.add("wrong-shake");
            setTimeout(() => {
              leftCol.querySelectorAll(".left-card").forEach(c => c.classList.remove("wrong-shake", "selected"));
              rightCol.querySelectorAll(".right-card").forEach(c => c.classList.remove("wrong-shake", "selected"));
              selectedLeft = null;
              selectedRight = null;
            }, 500);
          }
        }
      };

      matchGrid.appendChild(leftCol);
      matchGrid.appendChild(rightCol);
      area.appendChild(matchGrid);
    } else if (q.type === "fill_blank") {
      const fillBox = document.createElement("div");
      fillBox.className = "fill-blank-container";

      fillBox.innerHTML = `
        <div class="code-template-box">
          <pre><code>${this.escapeHtml(q.codeTemplate)}</code></pre>
        </div>
        <div class="token-selection-row">
          <p>Choose the token to fill the blank:</p>
          <div class="tokens-list">
            ${q.options.map((opt, i) => `
              <button class="token-btn" data-token-idx="${i}">${this.escapeHtml(opt)}</button>
            `).join("")}
          </div>
        </div>
      `;

      area.appendChild(fillBox);

      fillBox.querySelectorAll(".token-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          if (this.isAnswerChecked) return;
          window.soundEngine.playClick();
          fillBox.querySelectorAll(".token-btn").forEach(b => b.classList.remove("selected"));
          btn.classList.add("selected");
          this.selectedAnswer = parseInt(btn.dataset.tokenIdx);
        });
      });
    }
  }

  validateCurrentAnswer(q) {
    let isCorrect = false;

    if (q.type === "mcq" || q.type === "spot_bug" || q.type === "fill_blank") {
      if (this.selectedAnswer === null) {
        alert("Please select an answer first!");
        return;
      }
      isCorrect = (this.selectedAnswer === q.correctIndex);
    } else if (q.type === "voice") {
      if (!this.selectedAnswer) {
        alert("Please speak or type your answer!");
        return;
      }
      const cleanedInput = this.selectedAnswer.toLowerCase().replace(/[^a-z0-9]/g, "");
      isCorrect = q.acceptableAnswers.some(ans => {
        const cleanedAns = ans.toLowerCase().replace(/[^a-z0-9]/g, "");
        return cleanedInput.includes(cleanedAns) || cleanedAns.includes(cleanedInput);
      });
    } else if (q.type === "match") {
      isCorrect = (this.selectedAnswer === true);
    }

    this.isAnswerChecked = true;
    const drawer = document.getElementById("lesson-bottom-drawer");
    const feedbackBox = document.getElementById("drawer-feedback");
    const checkBtn = document.getElementById("check-answer-btn");

    checkBtn.innerText = "Continue ▶";

    if (isCorrect) {
      window.soundEngine.playCorrect();
      this.lessonXpEarned += 15;
      this.state.xp += 15;
      this.state.gems += 5;
      this.updateStatsBar();

      drawer.className = "lesson-bottom-drawer correct-drawer";
      feedbackBox.className = "feedback-message feedback-correct";
      feedbackBox.innerHTML = `
        <div class="feedback-title">🎉 Excellent Job! +15 XP</div>
        <div class="feedback-expl">${q.explanation}</div>
        <button class="duo-btn duo-btn-sm duo-btn-ghost view-deep-dive-btn">Deep Dive Explanation 📖</button>
      `;

      if (this.lessonMascot) {
        this.lessonMascot.setState("happy", "Spot on! That's Class XII perfection!");
      }
    } else {
      window.soundEngine.playWrong();
      this.lessonMistakes++;
      this.state.hearts = Math.max(0, this.state.hearts - 1);
      this.updateStatsBar();

      drawer.className = "lesson-bottom-drawer wrong-drawer";
      feedbackBox.className = "feedback-message feedback-wrong";

      let correctText = "";
      if (q.options && q.correctIndex !== undefined) {
        correctText = q.options[q.correctIndex];
      } else if (q.acceptableAnswers) {
        correctText = q.acceptableAnswers[0];
      }

      feedbackBox.innerHTML = `
        <div class="feedback-title">💔 Not quite! (-1 Heart)</div>
        <div class="feedback-solution"><strong>Correct Answer:</strong> ${this.escapeHtml(correctText)}</div>
        <div class="feedback-expl">${q.explanation}</div>
        <button class="duo-btn duo-btn-sm duo-btn-ghost view-deep-dive-btn">Why does this happen? 📖</button>
      `;

      if (this.lessonMascot) {
        this.lessonMascot.setState("sad", "Don't worry, every mistake is a chance to learn!");
      }
    }

    feedbackBox.classList.remove("hidden");

    // Deep Dive Drawer modal button
    const deepDiveBtn = feedbackBox.querySelector(".view-deep-dive-btn");
    if (deepDiveBtn) {
      deepDiveBtn.addEventListener("click", () => {
        this.openDeepDiveModal(q);
      });
    }

    // Check if player ran out of hearts
    if (this.state.hearts <= 0) {
      setTimeout(() => {
        this.openHeartRefillModal();
      }, 1200);
    }
  }

  advanceToNextQuestion() {
    this.currentQuestionIdx++;
    this.selectedAnswer = null;
    this.isAnswerChecked = false;

    if (this.currentQuestionIdx < this.lessonQuestions.length) {
      this.renderCurrentView();
    } else {
      this.completeActiveLesson();
    }
  }

  completeActiveLesson() {
    window.soundEngine.playLevelUp();

    // Mark completed
    if (!this.state.completed_lessons.includes(this.activeLesson.id)) {
      this.state.completed_lessons.push(this.activeLesson.id);
    }

    // Advance stage if all lessons completed
    const currentStageObj = CURRICULUM.units
      .flatMap(u => u.stages)
      .find(s => s.lessons.some(l => l.id === this.activeLesson.id));

    if (currentStageObj) {
      const allLessonsDone = currentStageObj.lessons.every(l => this.state.completed_lessons.includes(l.id));
      if (allLessonsDone) {
        if (!this.state.completed_stages.includes(currentStageObj.id)) {
          this.state.completed_stages.push(currentStageObj.id);
        }
        const starsEarned = this.lessonMistakes === 0 ? 3 : (this.lessonMistakes === 1 ? 2 : 1);
        this.state.stage_stars[currentStageObj.id.toString()] = starsEarned;
        this.state.current_stage = Math.max(this.state.current_stage, currentStageObj.id + 1);
      }
    }

    this.saveProgress();

    // Confetti and victory screen
    this.showLessonVictoryScreen();
  }

  showLessonVictoryScreen() {
    const mainContainer = document.getElementById("main-view-container");
    if (!mainContainer) return;

    mainContainer.innerHTML = `
      <div class="victory-screen bounce-in">
        <div class="victory-confetti" id="confetti-holder"></div>
        <div id="victory-mascot"></div>
        <h2>Lesson Completed! 🎉</h2>
        <p class="victory-subtitle">${this.activeLesson.title}</p>

        <div class="victory-stats-grid">
          <div class="stat-card">
            <span class="stat-icon">⭐</span>
            <span class="stat-val">+${this.lessonXpEarned}</span>
            <span class="stat-lbl">Total XP</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">🔥</span>
            <span class="stat-val">${this.state.streak} Days</span>
            <span class="stat-lbl">Streak</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">💎</span>
            <span class="stat-val">+10</span>
            <span class="stat-lbl">Gems Earned</span>
          </div>
        </div>

        <button id="victory-continue-btn" class="duo-btn duo-btn-primary duo-btn-large">Continue Journey ▶</button>
      </div>
    `;

    const victoryMascot = new PyMimiMascot("victory-mascot");
    victoryMascot.setState("celebrating", "You nailed it! Keep building that exam momentum!");

    document.getElementById("victory-continue-btn").addEventListener("click", () => {
      window.soundEngine.playClick();
      this.switchView("journey");
    });
  }

  // ==========================================================================
  // VIEW: LIVE PYTHON CODE PLAYGROUND
  // ==========================================================================
  renderPlayground(container) {
    const wrapper = document.createElement("div");
    wrapper.className = "playground-wrapper";

    wrapper.innerHTML = `
      <div class="playground-header">
        <div>
          <h2>🐍 Python Exam Code Sandbox</h2>
          <p>Write, run, and experiment with syllabus programs directly in the browser!</p>
        </div>
        <div class="playground-sample-picker">
          <label>Load Exam Recipe:</label>
          <select id="code-snippet-select" class="duo-select">
            <option value="sort3">Sort 3 Numbers (Conditionals)</option>
            <option value="list_algo">List Linear Search & Frequency</option>
            <option value="str_methods">All 23 String Methods Demo</option>
            <option value="factorial_series">Factorial & Series Sum</option>
            <option value="pattern">Star & Number Patterns</option>
            <option value="dict_mod">Dictionary & Math/Random Module</option>
            <option value="exceptions">Try-Except-Finally Execution</option>
          </select>
        </div>
      </div>

      <div class="playground-body">
        <div class="editor-pane">
          <div class="editor-bar">
            <span>💻 Python Script Mode</span>
            <button id="run-code-btn" class="duo-btn duo-btn-primary duo-btn-sm">▶ Run Code (Ctrl+Enter)</button>
          </div>
          <textarea id="code-editor" class="code-textarea" spellcheck="false"></textarea>
        </div>

        <div class="terminal-pane">
          <div class="terminal-bar">
            <span>🖥️ Terminal Output</span>
            <button id="clear-term-btn" class="duo-btn duo-btn-ghost duo-btn-sm">Clear</button>
          </div>
          <pre id="terminal-output" class="terminal-screen">Click 'Run Code' to execute your Python script...</pre>
        </div>
      </div>
    `;

    container.appendChild(wrapper);

    const editor = document.getElementById("code-editor");
    const terminal = document.getElementById("terminal-output");
    const runBtn = document.getElementById("run-code-btn");
    const select = document.getElementById("code-snippet-select");
    const clearBtn = document.getElementById("clear-term-btn");

    // Code Recipes from Syllabus
    const recipes = {
      sort3: `# Class XII Syllabus: Sort 3 Numbers without using sort()
a = 45
b = 12
c = 89

print("Original:", a, b, c)

if a > b:
    a, b = b, a
if a > c:
    a, c = c, a
if b > c:
    b, c = c, b

print("Sorted in ascending order:", a, b, c)
`,
      list_algo: `# Class XII Syllabus: Linear Search & Frequency Count
numbers = [14, 25, 60, 25, 90, 25, 42, 100]
target = 25

# 1. Linear Search
found_at = -1
for i in range(len(numbers)):
    if numbers[i] == target:
        found_at = i
        break

print(f"Target {target} first found at index: {found_at}")

# 2. Frequency Count
freq = 0
for x in numbers:
    if x == target:
        freq += 1

print(f"Frequency of {target} is: {freq}")
print("Min:", min(numbers), "Max:", max(numbers), "Mean:", sum(numbers)/len(numbers))
`,
      str_methods: `# Class XII Syllabus: String Operations & Built-ins
text = "wbchse computer science 2026"

print("Original:", text)
print("capitalize():", text.capitalize())
print("title():", text.title())
print("upper():", text.upper())
print("count('e'):", text.count('e'))
print("find('science'):", text.find('science'))
print("isalnum():", text.isalnum())
print("replace('2026', 'Semester-III'):", text.replace('2026', 'Semester-III'))
print("split():", text.split())
print("partition('computer'):", text.partition('computer'))
print("reverse with slicing [::-1]:", text[::-1])
`,
      factorial_series: `# Class XII Syllabus: Factorial & Summation of Series
def factorial(n):
    fact = 1
    for i in range(1, n + 1):
        fact *= i
    return fact

# Sum of series: 1 + 1/2! + 1/3! + ... + 1/n!
n = 5
total = 1.0
for i in range(2, n + 1):
    total += 1.0 / factorial(i)

print(f"Factorial of {n}:", factorial(n))
print(f"Sum of series up to {n} terms:", round(total, 4))
`,
      pattern: `# Class XII Syllabus: Pattern Generation
rows = 5
print("Right-Angled Triangle Pattern:")
for i in range(1, rows + 1):
    print("* " * i)

print("\\nNumber Pyramid:")
for i in range(1, rows + 1):
    for j in range(1, i + 1):
        print(j, end=" ")
    print()
`,
      dict_mod: `# Class XII Syllabus: Dictionary & Math/Random Modules
import math
import random
import statistics

student = {"roll": 101, "name": "Rohan", "COMS": 94}
print("Original Dict:", student)
print("Keys:", list(student.keys()))
print("Safe get():", student.get("English", 85))

# Math & Stats
print("\\nmath.ceil(-3.4):", math.ceil(-3.4))
print("math.sqrt(49):", math.sqrt(49))
print("statistics.mean([90, 94, 98]):", statistics.mean([90, 94, 98]))

# Random
print("random.randint(1, 6) [inclusive]:", random.randint(1, 6))
`,
      exceptions: `# Class XII Syllabus: Exception Handling Flow
try:
    num = 50
    den = 0
    print("Attempting division...")
    res = num / den
except ZeroDivisionError as err:
    print("Caught Exception:", err)
finally:
    print("Finally block ALWAYS executes! Cleanup done.")
`
    };

    // Load initial recipe
    editor.value = recipes.sort3;

    select.addEventListener("change", (e) => {
      editor.value = recipes[e.target.value] || "";
    });

    clearBtn.addEventListener("click", () => {
      terminal.innerText = "";
    });

    // Run Code Handler
    const execute = async () => {
      window.soundEngine.playClick();
      terminal.innerText = "⏳ Executing Python script...";
      runBtn.disabled = true;

      try {
        const res = await fetch("/api/run-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: editor.value })
        });
        const result = await res.json();
        runBtn.disabled = false;

        let output = "";
        if (result.stdout) {
          output += result.stdout;
        }
        if (result.stderr) {
          output += `\n❌ Traceback / Error:\n${result.stderr}`;
        }
        if (!result.stdout && !result.stderr) {
          output = "Program completed with no terminal output.";
        }

        terminal.innerText = output;
        if (result.success) {
          window.soundEngine.playCorrect();
        } else {
          window.soundEngine.playWrong();
        }
      } catch (err) {
        runBtn.disabled = false;
        terminal.innerText = `Network or runner error: ${err.message}`;
      }
    };

    runBtn.addEventListener("click", execute);

    // Keyboard shortcut Ctrl+Enter
    editor.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        execute();
      }
    });
  }

  // ==========================================================================
  // VIEW: BOARD EXAM MOCK SIMULATOR (35 MARKS)
  // ==========================================================================
  renderBoardExam(container) {
    const exam = CURRICULUM.boardExam;
    const wrapper = document.createElement("div");
    wrapper.className = "board-exam-wrapper";

    wrapper.innerHTML = `
      <div class="exam-header-banner">
        <div class="exam-title-box">
          <span class="exam-badge">WBCHSE OFFICIAL PATTERN</span>
          <h2>${exam.title}</h2>
          <p>Total Marks: <strong>${exam.totalMarks}</strong> (Python: 25M • E-Commerce: 10M) • Time: 45 Mins</p>
        </div>
        <div class="exam-timer-box">
          <span class="timer-icon">⏱️</span>
          <span id="exam-timer-display" class="timer-countdown">45:00</span>
        </div>
      </div>

      <div class="exam-sections-container">
        ${exam.sections.map((sec, sIdx) => `
          <div class="exam-section-card">
            <div class="section-header">
              <h3>${sec.sectionName}</h3>
              <span class="section-marks-badge">${sec.marks} Marks</span>
            </div>
            <div class="section-questions-list">
              ${sec.questions.map((q, qIdx) => `
                <div class="exam-question-item" data-q-id="${q.id}">
                  <div class="q-num-row">
                    <span class="q-number">Q${sIdx === 0 ? qIdx + 1 : qIdx + 10}</span>
                    <span class="q-mark">[${q.marks} Mark${q.marks > 1 ? 's' : ''}]</span>
                  </div>
                  <div class="q-text-body">${q.q}</div>
                  <div class="q-options-container">
                    ${q.options.map((opt, oIdx) => `
                      <label class="exam-radio-label">
                        <input type="radio" name="exam_${q.id}" value="${oIdx}">
                        <span class="radio-custom"></span>
                        <span class="radio-text">${this.escapeHtml(opt)}</span>
                      </label>
                    `).join("")}
                  </div>
                  <div id="solution_${q.id}" class="exam-solution-box hidden">
                    <strong>Solution:</strong> ${q.solution}
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>

      <div class="exam-submit-row">
        <button id="submit-exam-btn" class="duo-btn duo-btn-primary duo-btn-large">Submit Board Exam Paper ✍️</button>
      </div>
    `;

    container.appendChild(wrapper);

    // Start Timer
    this.startExamTimer();

    // Bind Radio selection
    wrapper.querySelectorAll("input[type=radio]").forEach(radio => {
      radio.addEventListener("change", (e) => {
        const qId = e.target.name.replace("exam_", "");
        this.examAnswers[qId] = parseInt(e.target.value);
        window.soundEngine.playClick();
      });
    });

    // Bind Submit
    document.getElementById("submit-exam-btn").addEventListener("click", () => {
      this.evaluateBoardExam();
    });
  }

  startExamTimer() {
    if (this.examTimer) clearInterval(this.examTimer);
    this.examSecondsLeft = 45 * 60;

    const display = document.getElementById("exam-timer-display");
    this.examTimer = setInterval(() => {
      this.examSecondsLeft--;
      if (this.examSecondsLeft <= 0) {
        clearInterval(this.examTimer);
        alert("Time is up! Submitting exam automatically...");
        this.evaluateBoardExam();
        return;
      }
      const mins = Math.floor(this.examSecondsLeft / 60);
      const secs = this.examSecondsLeft % 60;
      if (display) {
        display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }

  evaluateBoardExam() {
    if (this.examTimer) clearInterval(this.examTimer);

    let totalEarnedMarks = 0;
    const exam = CURRICULUM.boardExam;

    exam.sections.forEach(sec => {
      sec.questions.forEach(q => {
        const userAns = this.examAnswers[q.id];
        const isRight = (userAns === q.answer);
        const solEl = document.getElementById(`solution_${q.id}`);
        const itemEl = document.querySelector(`[data-q-id="${q.id}"]`);

        if (solEl) solEl.classList.remove("hidden");
        if (itemEl) {
          itemEl.classList.toggle("exam-correct", isRight);
          itemEl.classList.toggle("exam-wrong", !isRight);
        }

        if (isRight) {
          totalEarnedMarks += q.marks;
        }
      });
    });

    const percent = Math.round((totalEarnedMarks / exam.totalMarks) * 100);

    window.soundEngine.playLevelUp();

    // Show Exam Scorecard Modal
    const modal = document.createElement("div");
    modal.className = "duo-modal-overlay";
    modal.innerHTML = `
      <div class="duo-modal-card bounce-in">
        <div class="modal-header" style="background: #58cc02;">
          <h2>🎓 Official Board Exam Scorecard</h2>
          <button class="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body text-center">
          <div class="score-ring-large">
            <span class="score-number">${totalEarnedMarks} / ${exam.totalMarks}</span>
            <span class="score-percentage">${percent}%</span>
          </div>
          <h3>${percent >= 80 ? '🌟 Outstanding! Grade: A+' : (percent >= 60 ? '👍 Good Job! Grade: A' : '📚 Needs Revision! Grade: B')}</h3>
          <p>Review the detailed solutions marked on your exam sheet below!</p>
          <button class="duo-btn duo-btn-primary duo-btn-large" id="close-scorecard-btn">Review Solutions 🔍</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const close = () => modal.remove();
    modal.querySelector(".modal-close-btn").addEventListener("click", close);
    modal.querySelector("#close-scorecard-btn").addEventListener("click", close);

    // Award XP
    this.state.xp += totalEarnedMarks * 5;
    this.updateStatsBar();
    this.saveProgress();
  }

  // ==========================================================================
  // VIEW: HIGH LEVEL REVISION VAULT
  // ==========================================================================
  renderRevisionVault(container) {
    const notes = CURRICULUM.vaultNotes;
    const wrapper = document.createElement("div");
    wrapper.className = "vault-wrapper";

    wrapper.innerHTML = `
      <div class="vault-header">
        <h2>📚 High-Level Revision Vault</h2>
        <p>Exam-oriented cheat sheets, board warnings, mnemonics, and code recipes for all 17 topics.</p>
        <div class="vault-search-row">
          <input type="text" id="vault-search-input" placeholder="Search topic (e.g. Slicing, EDI, Floor division, Math)..." class="duo-input" />
        </div>
      </div>

      <div class="vault-notes-grid" id="vault-grid">
        ${notes.map(note => this.createNoteCardHtml(note)).join("")}
      </div>
    `;

    container.appendChild(wrapper);

    // Search filter
    const searchInput = document.getElementById("vault-search-input");
    const grid = document.getElementById("vault-grid");

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = notes.filter(n =>
        n.topic.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q) ||
        n.keyRule.toLowerCase().includes(q)
      );
      grid.innerHTML = filtered.map(note => this.createNoteCardHtml(note)).join("");
    });
  }

  createNoteCardHtml(note) {
    return `
      <div class="vault-card">
        <div class="vault-card-header">
          <span class="vault-category">${note.category}</span>
          <h3>${note.topic}</h3>
        </div>
        <div class="vault-card-body">
          <p class="vault-rule"><strong>Core Rule:</strong> ${note.keyRule}</p>
          <div class="vault-warning">
            ⚠️ <strong>Board Exam Alert:</strong> ${note.examWarning}
          </div>
          ${note.codeSnippet ? `
            <div class="vault-code">
              <pre><code>${this.escapeHtml(note.codeSnippet)}</code></pre>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW: PRACTICE ARENA
  // ==========================================================================
  renderPracticeArena(container) {
    const wrapper = document.createElement("div");
    wrapper.className = "arena-wrapper";

    wrapper.innerHTML = `
      <div class="arena-header">
        <h2>⚔️ Practice & Skill Arena</h2>
        <p>Refill your hearts, sharpen your voice answering, or tackle rapid-fire flashcards!</p>
      </div>

      <div class="arena-grid">
        <div class="arena-card" id="arena-heart-refill">
          <div class="arena-card-icon">❤️</div>
          <h3>Refill Hearts Practice</h3>
          <p>Solve 3 quick questions correctly to restore 1 full heart!</p>
          <button class="duo-btn duo-btn-success">Practice for Hearts ▶</button>
        </div>

        <div class="arena-card" id="arena-voice-master">
          <div class="arena-card-icon">🎙️</div>
          <h3>Voice Speech Master</h3>
          <p>Train your verbal recall by answering questions exclusively with your voice!</p>
          <button class="duo-btn duo-btn-primary">Start Voice Drill ▶</button>
        </div>

        <div class="arena-card" id="arena-bug-hunter">
          <div class="arena-card-icon">🐞</div>
          <h3>Bug Hunter Blitz</h3>
          <p>Spot the syntax errors, logical bugs, and tricky indentation mistakes!</p>
          <button class="duo-btn duo-btn-secondary">Hunt Bugs ▶</button>
        </div>
      </div>
    `;

    container.appendChild(wrapper);

    wrapper.querySelector("#arena-heart-refill").addEventListener("click", () => {
      this.openHeartRefillModal();
    });

    wrapper.querySelector("#arena-voice-master").addEventListener("click", () => {
      // Find voice questions
      const voiceQuestions = CURRICULUM.units
        .flatMap(u => u.stages)
        .flatMap(s => s.lessons)
        .flatMap(l => l.questions)
        .filter(q => q.type === "voice");

      if (voiceQuestions.length > 0) {
        this.activeLesson = {
          id: "arena-voice",
          title: "Voice Speech Drill",
          xp: 25,
          mascotDialogue: "Speak your answers clearly into the microphone!",
          questions: voiceQuestions
        };
        this.lessonQuestions = [...voiceQuestions];
        this.currentQuestionIdx = 0;
        this.lessonXpEarned = 0;
        this.lessonMistakes = 0;
        this.switchView("lesson");
      }
    });

    wrapper.querySelector("#arena-bug-hunter").addEventListener("click", () => {
      const bugQuestions = CURRICULUM.units
        .flatMap(u => u.stages)
        .flatMap(s => s.lessons)
        .flatMap(l => l.questions)
        .filter(q => q.type === "spot_bug" || q.type === "mcq");

      this.activeLesson = {
        id: "arena-bug",
        title: "Bug Hunter Blitz",
        xp: 25,
        mascotDialogue: "Carefully analyze each line of code before answering!",
        questions: bugQuestions.slice(0, 5)
      };
      this.lessonQuestions = bugQuestions.slice(0, 5);
      this.currentQuestionIdx = 0;
      this.lessonXpEarned = 0;
      this.lessonMistakes = 0;
      this.switchView("lesson");
    });
  }

  // Heart Refill Modal
  openHeartRefillModal() {
    window.soundEngine.playClick();
    const modal = document.createElement("div");
    modal.className = "duo-modal-overlay";
    modal.innerHTML = `
      <div class="duo-modal-card bounce-in">
        <div class="modal-header" style="background: #ff4b4b;">
          <h2>❤️ Hearts & Energy</h2>
          <button class="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body text-center">
          <div class="heart-pulse-icon">❤️</div>
          <h3>Current Hearts: ${this.state.hearts} / ${this.state.max_hearts}</h3>
          <p>Hearts replenish when you practice lessons, or you can restore them using gems!</p>
          <div class="heart-actions-row">
            <button class="duo-btn duo-btn-success" id="refill-with-practice">Practice to Refill (Free)</button>
            <button class="duo-btn duo-btn-primary" id="refill-with-gems">Refill for 50 💎</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".modal-close-btn").addEventListener("click", () => modal.remove());

    modal.querySelector("#refill-with-gems").addEventListener("click", () => {
      if (this.state.gems >= 50) {
        this.state.gems -= 50;
        this.state.hearts = this.state.max_hearts;
        this.updateStatsBar();
        this.saveProgress();
        window.soundEngine.playHeal();
        alert("Hearts fully restored! ❤️❤️❤️❤️❤️");
        modal.remove();
      } else {
        alert("Not enough gems! Practice lessons to earn more.");
      }
    });

    modal.querySelector("#refill-with-practice").addEventListener("click", () => {
      modal.remove();
      this.state.hearts = Math.min(this.state.max_hearts, this.state.hearts + 2);
      this.updateStatsBar();
      this.saveProgress();
      window.soundEngine.playHeal();
      alert("Earned 2 Practice Hearts!");
    });
  }

  openDeepDiveModal(q) {
    window.soundEngine.playClick();
    const modal = document.createElement("div");
    modal.className = "duo-modal-overlay";
    modal.innerHTML = `
      <div class="duo-modal-card bounce-in">
        <div class="modal-header" style="background: #1cb0f6;">
          <h2>📖 High-Level Concept Deep Dive</h2>
          <button class="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div class="deep-dive-prompt"><strong>Question:</strong> ${q.prompt}</div>
          <div class="deep-dive-box">
            <h4>💡 Why this answer is correct:</h4>
            <p>${q.explanation}</p>
          </div>
          ${this.activeLesson?.explanation ? `
            <div class="lesson-theory-snippet">
              <h4>📚 Topic Reference Notes:</h4>
              <div class="markdown-body">${this.renderMarkdown(this.activeLesson.explanation)}</div>
            </div>
          ` : ''}
          <div class="text-right">
            <button class="duo-btn duo-btn-primary modal-close-btn-bottom">Understood 👍</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const close = () => modal.remove();
    modal.querySelector(".modal-close-btn").addEventListener("click", close);
    modal.querySelector(".modal-close-btn-bottom").addEventListener("click", close);
  }

  startHeartRegenTimer() {
    setInterval(() => {
      if (this.state.hearts < this.state.max_hearts) {
        this.state.hearts++;
        this.updateStatsBar();
        this.saveProgress();
      }
    }, 15 * 60 * 1000); // 1 heart every 15 minutes
  }

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  renderMarkdown(text) {
    if (!text) return "";
    return text
      .replace(/###\s+(.*)/g, "<h3>$1</h3>")
      .replace(/##\s+(.*)/g, "<h2>$1</h2>")
      .replace(/#\s+(.*)/g, "<h1>$1</h1>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n\n/g, "<br><br>");
  }
}

// Global bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.app = new PyDuoApp();
});
