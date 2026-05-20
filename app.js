// ============================================
// СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ============================================
const state = {
  view: 'classes',        // classes | topics | cards
  currentClassId: null,
  currentTopicId: null,
  cardIndex: 0,
  flipped: false,
  progress: loadProgress()
};

// ============================================
// РАБОТА С ПРОГРЕССОМ (localStorage)
// ============================================
function loadProgress() {
  try {
    const data = localStorage.getItem('mathProgress');
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem('mathProgress', JSON.stringify(state.progress));
  } catch (e) {
    console.warn('Не удалось сохранить прогресс');
  }
}

function markCardLearned(classId, topicId, cardIndex) {
  const key = `${classId}__${topicId}`;
  if (!state.progress[key]) state.progress[key] = [];
  if (!state.progress[key].includes(cardIndex)) {
    state.progress[key].push(cardIndex);
    saveProgress();
  }
}

function isCardLearned(classId, topicId, cardIndex) {
  const key = `${classId}__${topicId}`;
  return state.progress[key]?.includes(cardIndex) || false;
}

function getTopicProgress(classId, topic) {
  const key = `${classId}__${topic.id}`;
  const learned = state.progress[key]?.length || 0;
  return { learned, total: topic.cards.length };
}

function getClassProgress(cls) {
  let learned = 0, total = 0;
  cls.topics.forEach(t => {
    const p = getTopicProgress(cls.id, t);
    learned += p.learned;
    total += p.total;
  });
  return { learned, total };
}

// ============================================
// РЕНДЕР: ЭКРАН КЛАССОВ
// ============================================
function renderClasses() {
  const app = document.getElementById('app');
  const totalCards = COURSE_DATA.reduce((sum, cls) =>
    sum + cls.topics.reduce((s, t) => s + t.cards.length, 0), 0
  );
  const totalLearned = COURSE_DATA.reduce((sum, cls) =>
    sum + getClassProgress(cls).learned, 0
  );

  app.innerHTML = `
    <div class="hero">
      <h1>📐 Математика РШМ</h1>
      <p>Тренируйся с карточками: вопрос → ответ. Выбери класс и тему.</p>
      <div class="stats-bar">
        <div class="stat"><div class="stat-num">${COURSE_DATA.length}</div><div class="stat-lbl">разделов</div></div>
        <div class="stat"><div class="stat-num">${totalCards}</div><div class="stat-lbl">карточек</div></div>
        <div class="stat"><div class="stat-num">${totalLearned}</div><div class="stat-lbl">изучено</div></div>
      </div>
    </div>
    <div class="grid">
      ${COURSE_DATA.map(cls => {
        const p = getClassProgress(cls);
        const percent = p.total ? Math.round(p.learned / p.total * 100) : 0;
        return `
          <div class="card-tile" data-class-id="${cls.id}">
            <div class="tile-icon">${cls.icon}</div>
            <div class="tile-title">${cls.title}</div>
            <div class="tile-desc">${cls.description}</div>
            <div class="tile-meta">
              <span>${cls.topics.length} тем</span>
              <span>${p.learned}/${p.total}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  document.querySelectorAll('.card-tile').forEach(el => {
    el.addEventListener('click', () => {
      state.currentClassId = el.dataset.classId;
      state.view = 'topics';
      render();
    });
  });
}

// ============================================
// РЕНДЕР: ЭКРАН ТЕМ
// ============================================
function renderTopics() {
  const app = document.getElementById('app');
  const cls = COURSE_DATA.find(c => c.id === state.currentClassId);
  if (!cls) { state.view = 'classes'; return render(); }

  app.innerHTML = `
    <button class="back-btn" id="backBtn">← К классам</button>
    <div class="hero">
      <h1>${cls.icon} ${cls.title}</h1>
      <p>${cls.description}</p>
    </div>
    <div class="grid">
      ${cls.topics.map(topic => {
        const p = getTopicProgress(cls.id, topic);
        const percent = p.total ? Math.round(p.learned / p.total * 100) : 0;
        return `
          <div class="card-tile" data-topic-id="${topic.id}">
            <div class="tile-title">${topic.title}</div>
            <div class="tile-meta">
              <span>${topic.cards.length} карточек</span>
              <span>${p.learned}/${p.total}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  document.getElementById('backBtn').addEventListener('click', () => {
    state.view = 'classes';
    state.currentClassId = null;
    render();
  });

  document.querySelectorAll('.card-tile').forEach(el => {
    el.addEventListener('click', () => {
      state.currentTopicId = el.dataset.topicId;
      state.cardIndex = 0;
      state.flipped = false;
      state.view = 'cards';
      render();
    });
  });
}

// ============================================
// РЕНДЕР: ЭКРАН КАРТОЧЕК
// ============================================
function renderCards() {
  const app = document.getElementById('app');
  const cls = COURSE_DATA.find(c => c.id === state.currentClassId);
  const topic = cls?.topics.find(t => t.id === state.currentTopicId);
  if (!topic) { state.view = 'topics'; return render(); }

  const card = topic.cards[state.cardIndex];
  const total = topic.cards.length;
  const learned = isCardLearned(cls.id, topic.id, state.cardIndex);

  app.innerHTML = `
    <button class="back-btn" id="backBtn">← К темам</button>
    <div class="card-header">
      <h2>${topic.title}</h2>
      <div class="card-counter">Карточка ${state.cardIndex + 1} из ${total}</div>
    </div>

    <div class="flashcard ${state.flipped ? 'flipped' : ''}" id="flashcard">
      <div class="flashcard-inner">
        <div class="flashcard-side flashcard-front">
          <div class="side-label">Вопрос</div>
          <div class="side-content">${card.q}</div>
          <div class="side-hint">Нажми, чтобы увидеть ответ</div>
        </div>
        <div class="flashcard-side flashcard-back">
          <div class="side-label">Ответ</div>
          <div class="side-content">${card.a}</div>
          ${card.theory ? `<div class="theory">💡 ${card.theory}</div>` : ''}
        </div>
      </div>
    </div>

    <div class="card-controls">
      <button class="nav-btn" id="prevBtn" ${state.cardIndex === 0 ? 'disabled' : ''}>← Назад</button>
      <button class="learned-btn ${learned ? 'is-learned' : ''}" id="learnedBtn">
        ${learned ? '✅ Выучено' : '☐ Отметить выученным'}
      </button>
      <button class="nav-btn" id="nextBtn" ${state.cardIndex === total - 1 ? 'disabled' : ''}>Вперёд →</button>
    </div>
  `;

  document.getElementById('backBtn').addEventListener('click', () => {
    state.view = 'topics';
    state.currentTopicId = null;
    render();
  });

  document.getElementById('flashcard').addEventListener('click', () => {
    state.flipped = !state.flipped;
    render();
  });

  document.getElementById('prevBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.cardIndex > 0) {
      state.cardIndex--;
      state.flipped = false;
      render();
    }
  });

  document.getElementById('nextBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.cardIndex < total - 1) {
      state.cardIndex++;
      state.flipped = false;
      render();
    }
  });

  document.getElementById('learnedBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    markCardLearned(cls.id, topic.id, state.cardIndex);
    render();
  });
}

// ============================================
// ОБЩИЙ РЕНДЕР + КЛАВИАТУРА
// ============================================
function render() {
  if (state.view === 'classes') renderClasses();
  else if (state.view === 'topics') renderTopics();
  else if (state.view === 'cards') renderCards();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('keydown', (e) => {
  if (state.view !== 'cards') return;
  if (e.key === 'ArrowLeft') document.getElementById('prevBtn')?.click();
  if (e.key === 'ArrowRight') document.getElementById('nextBtn')?.click();
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('flashcard')?.click();
  }
});

// СТАРТ
render();