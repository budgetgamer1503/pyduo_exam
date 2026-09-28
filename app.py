import os
import sys
import json
import subprocess
import tempfile
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

app = FastAPI(title="PyDuo Exam Quest - Class XII COMS")

BASE_DIR = Path(__file__).parent.resolve()
STATIC_DIR = BASE_DIR / "static"
DATA_FILE = BASE_DIR / "user_progress.json"

DEFAULT_PROGRESS = {
    "xp": 120,
    "streak": 3,
    "last_active": "2026-09-28",
    "hearts": 5,
    "max_hearts": 5,
    "gems": 250,
    "current_stage": 1,
    "completed_stages": [1],
    "stage_stars": {"1": 3},
    "completed_lessons": ["1-1", "1-2"],
    "voice_mode": True,
    "sound_enabled": True,
    "speech_rate": 1.0,
    "speech_pitch": 1.0,
    "unlocked_badges": ["first_code", "streak_starter"],
    "notes_bookmarked": []
}

class CodeExecutionRequest(BaseModel):
    code: str
    timeout: int = 4

class UserProgressUpdate(BaseModel):
    xp: int | None = None
    streak: int | None = None
    hearts: int | None = None
    gems: int | None = None
    current_stage: int | None = None
    completed_stages: list[int] | None = None
    stage_stars: dict[str, int] | None = None
    completed_lessons: list[str] | None = None
    voice_mode: bool | None = None
    sound_enabled: bool | None = None
    speech_rate: float | None = None
    speech_pitch: float | None = None
    unlocked_badges: list[str] | None = None
    notes_bookmarked: list[str] | None = None

def load_progress() -> dict:
    if not DATA_FILE.exists():
        save_progress(DEFAULT_PROGRESS)
        return DEFAULT_PROGRESS.copy()
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            # Ensure missing fields get default values
            for k, v in DEFAULT_PROGRESS.items():
                if k not in data:
                    data[k] = v
            return data
    except Exception:
        return DEFAULT_PROGRESS.copy()

def save_progress(data: dict):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

@app.get("/api/progress")
def get_progress():
    return load_progress()

@app.post("/api/progress")
def update_progress(update: UserProgressUpdate):
    current = load_progress()
    update_dict = update.model_dump(exclude_unset=True)
    current.update(update_dict)
    save_progress(current)
    return {"status": "success", "progress": current}

@app.post("/api/run-code")
def run_code(req: CodeExecutionRequest):
    """
    Safely execute user Python code in an isolated subprocess with timeout.
    """
    code = req.code.strip()
    if not code:
        return {"output": "", "error": "No code provided to execute."}

    # Restrict potentially harmful modules in interactive learning playground
    forbidden = ["os.system", "shutil.rmtree", "subprocess", "ctypes"]
    for fb in forbidden:
        if fb in code:
            return {
                "output": "",
                "error": f"Security Note: Command '{fb}' is disabled in the student playground."
            }

    with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False, encoding="utf-8") as tmp:
        tmp.write(code)
        tmp_path = tmp.name

    try:
        result = subprocess.run(
            [sys.executable, tmp_path],
            capture_output=True,
            text=True,
            timeout=req.timeout,
            env={**os.environ, "PYTHONIOENCODING": "utf-8"}
        )
        return {
            "stdout": result.stdout,
            "stderr": result.stderr,
            "returncode": result.returncode,
            "success": result.returncode == 0
        }
    except subprocess.TimeoutExpired:
        return {
            "stdout": "",
            "stderr": f"Execution timed out after {req.timeout} seconds. Check for infinite loops!",
            "returncode": -1,
            "success": False
        }
    except Exception as e:
        return {
            "stdout": "",
            "stderr": f"Execution error: {str(e)}",
            "returncode": -1,
            "success": False
        }
    finally:
        try:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)
        except OSError:
            pass

@app.get("/api/health")
def health():
    return {"status": "ok", "app": "PyDuo Exam Quest Class XII COMS"}

# Mount static folder
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
def index():
    return FileResponse(STATIC_DIR / "index.html")

if __name__ == "__main__":
    import uvicorn
    # Configure stdout to utf-8 if possible
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    print("=" * 60)
    print(" >> Launching PyDuo Exam Quest (Class XII COMS) on http://localhost:8000")
    print("=" * 60)
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
