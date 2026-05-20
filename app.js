* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }

:root {
  --primary: #4f46e5;
  --primary-dark: #4338ca;
  --bg: #f5f7fb;
  --card: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --shadow: 0 4px 16px rgba(0,0,0,0.06);
}

body { background: var(--bg); color: var(--text); min-height: 100vh; }

#app { padding: 24px; max-width: 1200px; margin: 0 auto; }

/* ===== HERO ===== */
.hero {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 40px 32px;
  border-radius: 24px;
  margin-bottom: 28px;
  box-shadow: 0 10px 30px rgba(79,70,229,0.25);
}
.hero h1 { font-size: 32px; margin-bottom: 10px; font-weight: 700; }
.hero p { font-size: 16px; opacity: 0.95; margin-bottom: 20px; }

.stats-bar {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.stat {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  padding: 14px 20px;
  border-radius: 14px;
  min-width: 110px;
}
.stat-num { font-size: 26px; font-weight: 700; }
.stat-lbl { font-size: 13px; opacity: 0.9; }

/* ===== GRID & TILES ===== */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.card-tile {
  background: var(--card);
  border-radius: 18px;
  padding: 22px;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform .2s, box-shadow .2s;
  border-left: 4px solid var(--primary);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.card-tile:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(79,70,229,0.18);
}

.tile-icon { font-size: 36px; margin-bottom: 6px; }
.tile-title { font-size: 18px; font-weight: 700; color: var(--text); }
.tile-desc { font-size: 13px; color: var(--muted); line-height: 1.4; }
.tile-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--muted);
  margin-top: 8px;
}

.progress-bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 6px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--success));
  transition: width .4s;
}

/* ===== BACK BUTTON ===== */
.back-btn {
  background: var(--card);
  border: none;
  padding: 10px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 16px;
  box-shadow: var(--shadow);
  transition: all .2s;
}
.back-btn:hover { background: var(--primary); color: white; transform: translateX(-2px); }

/* ===== FLASHCARD ===== */
.card-header {
  text-align: center;
  margin-bottom: 20px;
}
.card-header h2 { font-size: 22px; margin-bottom: 6px; }
.card-counter { color: var(--muted); font-size: 14px; }

.flashcard {
  perspective: 1500px;
  width: 100%;
  max-width: 640px;
  margin: 0 auto 24px;
  height: 360px;
  cursor: pointer;
}

.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform .6s;
  transform-style: preserve-3d;
}

.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-side {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 22px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.flashcard-front {
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
}

.flashcard-back {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  transform: rotateY(180deg);
}

.side-label {
  position: absolute;
  top: 18px;
  left: 24px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  opacity: 0.85;
  font-weight: 600;
}

.side-content {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.4;
  max-width: 100%;
  word-wrap: break-word;
}

.side-hint {
  position: absolute;
  bottom: 18px;
  font-size: 12px;
  opacity: 0.85;
}

.theory {
  margin-top: 18px;
  background: rgba(255,255,255,0.18);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
}

/* ===== CARD CONTROLS ===== */
.card-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 640px;
  margin: 0 auto;
}

.nav-btn {
  background: var(--card);
  border: none;
  padding: 12px 22px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  box-shadow: var(--shadow);
  transition: all .2s;
}
.nav-btn:hover:not(:disabled) {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}
.nav-btn:disabled { opacity: 0.4; cursor: not-allowed; }

.learned-btn {
  background: var(--card);
  border: 2px solid var(--success);
  padding: 12px 22px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--success);
  transition: all .2s;
}
.learned-btn:hover { background: var(--success); color: white; }
.learned-btn.is-learned {
  background: var(--success);
  color: white;
}

/* ===== MOBILE ===== */
@media (max-width: 640px) {
  #app { padding: 14px; }
  .hero { padding: 28px 20px; }
  .hero h1 { font-size: 24px; }
  .hero p { font-size: 14px; }
  .flashcard { height: 320px; }
  .flashcard-side { padding: 24px; }
  .side-content { font-size: 18px; }
  .card-tile { padding: 18px; }
  .tile-icon { font-size: 30px; }
  .tile-title { font-size: 16px; }
  .nav-btn, .learned-btn { padding: 10px 16px; font-size: 13px; }
  .card-controls { flex-direction: column; }
  .card-controls button { width: 100%; }
}
