# 🐍 PyDuo Exam Quest - Class XII Computer Science (COMS)

A gamified, Duolingo & Mimi-inspired interactive learning platform designed specifically for the **Class XII Computer Science (COMS) Semester - III (35 Marks)** syllabus:
- **Unit 1: Python Programming (25 Marks, 80 Hours)**
- **Unit 2: Electronic Commerce & Systems (10 Marks, 20 Hours)**

---

## 🌟 Key Highlights & Features

1. **📖 Chapter Topic Explanations First**:
   - Each lesson begins in the **Concept Classroom** with high-level conceptual breakdowns, real-world mental models, annotated code recipes, and **WBCHSE Board Exam Pitfalls & Traps**.
   - Students absorb the concepts before proceeding to the interactive practice quiz!

2. **🇮🇳 Studio-Grade Indian AI Voice (Neural TTS)**:
   - Native-feeling Indian English AI voice tutors:
     - **🇮🇳 Neerja Neural**: Warm, clear Indian female teacher.
     - **🇮🇳 Prabhat Neural**: Articulate Indian male scholar.
   - Live speaking mouth animation synced with the PyMimi serpent mascot.
   - Browser speech fallback for offline & GitHub Pages.

3. **🚀 100% GitHub Pages Ready**:
   - Seamlessly runs as a static web app on **GitHub Pages**!
   - Built-in **Pyodide WebAssembly** executes Python code directly inside the browser (no server needed!).
   - Saves all streaks, XP, hearts, and stars to `localStorage`.

4. **📱 Mobile Web & PWA**:
   - Designed for smartphones (Android & iOS).
   - Bottom navigation bar matching the official Duolingo mobile app.
   - Built-in **QR Code modal** for instant connection from your phone.
   - Supports **"Add to Home Screen"** full-screen standalone mode.

5. **🎮 Gamification & Board Exam Simulation**:
   - Stepping-stone roadmap with 16 quest stages.
   - Heart energy system, XP points, streaks, and tactile 3D buttons.
   - Full **35-Mark Timed Board Mock Exam** with automated grading and detailed solutions!
   - High-level Revision Vault with cheat sheets for all 17 topics.

---

## 🌐 Deploy to GitHub Pages in 3 Steps

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "Launch PyDuo Exam Quest"
   ```

2. **Push to your GitHub repository**:
   ```bash
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your GitHub repository, go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
   - Your web app will be live at: `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`!

---

## 💻 Run Locally on Desktop & Mobile (Wi-Fi)

To run with the local FastAPI backend and offline Neural Voice generation:

```bash
# 1. Install dependencies
pip install fastapi uvicorn edge-tts qrcode

# 2. Run the server
python app.py
```

- **Desktop Access**: Open `http://localhost:8000`
- **Mobile Access**: Connect your phone to the same Wi-Fi and open `http://<YOUR-LOCAL-IP>:8000` (or click the **📱 Phone** button in the app to scan the QR code).
