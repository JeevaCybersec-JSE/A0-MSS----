// ============================================================
// MSS KPI Dashboard — Frontend
// Security Operations Console & Executive Reporting Engine
// ============================================================

const API = '';

// ---------- Icons (inline SVG, 20x20, stroke-based) ----------
const ICONS = {
  monitor: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="3.5" width="15" height="10" rx="1.2"/><path d="M7 17h6M10 13.5V17" stroke-linecap="round"/></svg>',
  'shield-check': '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2.3l6 2.2v4.4c0 4-2.6 6.9-6 8.1-3.4-1.2-6-4.1-6-8.1V4.5z" stroke-linejoin="round"/><path d="M7.3 10l1.9 1.9 3.6-4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  shield: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2.3l6 2.2v4.4c0 4-2.6 6.9-6 8.1-3.4-1.2-6-4.1-6-8.1V4.5z" stroke-linejoin="round"/></svg>',
  radar: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="7"/><circle cx="10" cy="10" r="3.2"/><path d="M10 10L15.5 5.2" stroke-linecap="round"/></svg>',
  bug: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6.5" y="7" width="7" height="8.5" rx="3.3"/><path d="M10 7V4.5M7.2 8.5L4.5 6.5M12.8 8.5l2.7-2M4.3 11h2.2M13.5 11h2.2M7.2 14.5L4.7 16.5M12.8 14.5l2.5 2" stroke-linecap="round"/></svg>',
  key: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6.2" cy="13.8" r="3.2"/><path d="M8.4 11.6L15.5 4.5M13 7l2 2M15 5l2 2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  mail: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="4.5" width="15" height="11" rx="1.3"/><path d="M3 5.5l7 5.5 7-5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  headset: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11v-1a6 6 0 0112 0v1" stroke-linecap="round"/><rect x="2.5" y="11" width="3.2" height="4.5" rx="1"/><rect x="14.3" y="11" width="3.2" height="4.5" rx="1"/><path d="M15.5 15.5v.5a2 2 0 01-2 2h-2.3" stroke-linecap="round"/></svg>',
  clipboard: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4.5" y="3.5" width="11" height="14" rx="1.3"/><rect x="7.3" y="2" width="5.4" height="3" rx="0.8"/><path d="M7 9.5h6M7 12.5h6M7 15.5h3.5" stroke-linecap="round"/></svg>',
  grid: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2.5" y="2.5" width="6" height="6" rx="1"/><rect x="11.5" y="2.5" width="6" height="6" rx="1"/><rect x="2.5" y="11.5" width="6" height="6" rx="1"/><rect x="11.5" y="11.5" width="6" height="6" rx="1"/></svg>',
  trend: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 15l4.5-5 3 3L17 5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 5H17v4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  file: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5.5 2.5h6l3 3v12h-9z" stroke-linejoin="round"/><path d="M7.5 10h5M7.5 13h5M7.5 16h3" stroke-linecap="round"/></svg>',
  logout: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 17H4.5a1 1 0 01-1-1V4a1 1 0 011-1H8" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 13.5l4-3.5-4-3.5M17 10H8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  calendar: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="14" height="13" rx="1.3"/><path d="M3 8h14M7 2.3v3M13 2.3v3" stroke-linecap="round"/></svg>',
  history: '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2.5 10a7.5 7.5 0 101.5-4.5M2.5 4.5v4h4" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 6v4.5l3 1.8" stroke-linecap="round"/></svg>',
  reset: '<svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4l12 12M16 4L4 16" stroke-linecap="round"/></svg>'
};

// ---------- App state ----------
const state = {
  token: localStorage.getItem('mss_token') || null,
  username: localStorage.getItem('mss_username') || '',
  sections: [],
  metrics: [],
  month: currentMonthStr(),
  monthData: { metrics: {}, narrative: {}, overallRAG: null, prevMonth: null, prevData: {}, history: {} },
  monthsHistory: [],
  view: 'overview',
  activeHistoryCard: null,
};

function currentMonthStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

// ---------- API helper ----------
async function api(path, opts = {}) {
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  if (state.token) headers['Authorization'] = 'Bearer ' + state.token;
  const res = await fetch(API + path, Object.assign({}, opts, { headers }));
  if (res.status === 401) { doLogout(true); throw new Error('Not authenticated'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ---------- Boot ----------
document.getElementById('login-form').addEventListener('submit', onLoginSubmit);
document.getElementById('logout-btn').addEventListener('click', () => doLogout(false));
document.getElementById('topbar-logout-btn').addEventListener('click', () => doLogout(false));
document.getElementById('month-input').addEventListener('change', onMonthChange);
document.getElementById('prev-month-btn').addEventListener('click', () => shiftMonth(-1));
document.getElementById('next-month-btn').addEventListener('click', () => shiftMonth(1));

document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
  btn.addEventListener('click', () => setView(btn.dataset.view));
});

boot();

async function boot() {
  document.getElementById('month-input').value = state.month;
  initTheme();
  initLoginCanvas();
  initCursorFollower();
  initLoginTilt();
  initSidebarToggle();
  initLoginControls();

  if (state.token) {
    try { await initApp(); return; } catch (e) { /* fall through to login */ }
  }
  showLogin();
}

// ---------- Theme Management (White & Black Light Theme Default) ----------
function initTheme() {
  const saved = localStorage.getItem('mss_theme') || 'light';
  applyTheme(saved);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      const next = cur === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('mss_theme', theme);
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    const icon = themeBtn.querySelector('.theme-icon');
    const label = themeBtn.querySelector('.theme-mode-text');
    if (theme === 'dark') {
      if (icon) icon.textContent = '🌙';
      if (label) label.textContent = 'Dark';
      themeBtn.title = 'Switch to Light theme (White & Black)';
    } else {
      if (icon) icon.textContent = '☀️';
      if (label) label.textContent = 'Light';
      themeBtn.title = 'Switch to Dark theme';
    }
  }
  if (typeof createParticles === 'function') createParticles();
  if (typeof createTelemetry === 'function') createTelemetry();
}

// ---------- Sidebar Toggle ("A0" Brand Button) ----------
window.toggleSidebar = function(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  const app = document.getElementById('app');
  if (app) {
    app.classList.toggle('sidebar-active');
  }
};

window.closeSidebar = function(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  const app = document.getElementById('app');
  if (app) {
    app.classList.remove('sidebar-active');
  }
};

function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebar-toggle-a0');
  const closeBtn = document.getElementById('sidebar-close-btn');
  const overlay = document.getElementById('sidebar-overlay');
  const app = document.getElementById('app');

  if (toggleBtn) {
    toggleBtn.onclick = window.toggleSidebar;
  }

  if (closeBtn) {
    closeBtn.onclick = window.closeSidebar;
  }

  if (overlay) {
    overlay.onclick = window.closeSidebar;
  }

  // Close sidebar on nav-item click
  document.addEventListener('click', (e) => {
    const isNavClick = e.target.closest('.nav-item');
    if (isNavClick && app) {
      app.classList.remove('sidebar-active');
    }
  });

  // ESC key dismisses sidebar drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && app && app.classList.contains('sidebar-active')) {
      app.classList.remove('sidebar-active');
    }
  });
}

// ---------- Login Page Controls & Enhancements ----------
function initLoginControls() {
  const togglePassBtn = document.getElementById('toggle-password-btn');
  const passInput = document.getElementById('login-password');
  if (togglePassBtn && passInput) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.innerHTML = isPass
        ? `<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M3 3l14 14M10 4C5 4 1.7 8.3 1.7 10c.8 1 2.3 3 5 4.5M10 16c5 0 8.3-4.3 8.3-6-.7-.9-2-2.6-4.3-4.1" stroke-linecap="round"/>
            <circle cx="10" cy="10" r="2.5"/>
          </svg>`
        : `<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M10 4C5 4 1.7 8.3 1.7 10s3.3 6 8.3 6 8.3-4.3 8.3-6-3.3-6-8.3-6z" />
            <circle cx="10" cy="10" r="2.5" />
          </svg>`;
    });
  }

  const quickLoginBtn = document.getElementById('quick-demo-login');
  if (quickLoginBtn) {
    quickLoginBtn.addEventListener('click', () => {
      const userInp = document.getElementById('login-username');
      const passInp = document.getElementById('login-password');
      if (userInp) userInp.value = 'Jeeva';
      if (passInp) passInp.value = '0123';
      showToast('Operator credentials autofilled (Jeeva)', 'green');
      const submitBtn = document.getElementById('login-btn-submit');
      if (submitBtn) {
        submitBtn.focus();
        submitBtn.classList.add('pulse-glow');
        setTimeout(() => submitBtn.classList.remove('pulse-glow'), 1200);
      }
    });
  }
}

function showLogin() {
  const loginScreen = document.getElementById('login-screen');
  const app = document.getElementById('app');
  loginScreen.hidden = false;
  loginScreen.style.display = 'flex';
  app.hidden = true;
  app.style.display = 'none';

  const userInp = document.getElementById('login-username');
  const passInp = document.getElementById('login-password');
  if (userInp) userInp.value = '';
  if (passInp) passInp.value = '';
  const errBox = document.getElementById('login-error');
  if (errBox) { errBox.textContent = ''; errBox.hidden = true; }

  startLoginCanvasAnimation();
}

async function onLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;
  const errBox = document.getElementById('login-error');
  errBox.hidden = true;
  try {
    const res = await fetch(API + '/api/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid credentials');
    state.token = data.token;
    state.username = data.username;
    localStorage.setItem('mss_token', state.token);
    localStorage.setItem('mss_username', state.username);
    stopLoginCanvasAnimation();
    await initApp();
    showToast('Signed in as ' + state.username, 'green');
  } catch (err) {
    errBox.textContent = err.message || 'Could not sign in';
    errBox.hidden = false;
  }
}

function doLogout(silent) {
  if (!silent && state.token) api('/api/logout', { method: 'POST' }).catch(() => {});
  state.token = null;
  localStorage.removeItem('mss_token');
  localStorage.removeItem('mss_username');

  const userInp = document.getElementById('login-username');
  const passInp = document.getElementById('login-password');
  if (userInp) userInp.value = '';
  if (passInp) passInp.value = '';

  showToast('Signed out successfully', 'green');
  showLogin();
}

async function initApp() {
  const meta = await api('/api/metrics');
  state.sections = meta.sections;
  state.metrics = meta.metrics;

  const loginScreen = document.getElementById('login-screen');
  const app = document.getElementById('app');
  loginScreen.hidden = true;
  loginScreen.style.display = 'none';
  app.hidden = false;
  app.style.display = 'flex';
  document.getElementById('user-name').textContent = state.username || 'Jeeva';

  buildSectionNav();
  await loadMonthsHistory();
  await loadMonthData();
  setView('overview');
}

function buildSectionNav() {
  const nav = document.getElementById('nav-sections');
  nav.querySelectorAll('.nav-item').forEach(n => n.remove());
  state.sections.forEach(sec => {
    const btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.dataset.view = 'section:' + sec.id;
    btn.innerHTML = `<span class="nav-icon">${ICONS[sec.icon] || ICONS.grid}</span><span>${sec.name}</span><span class="nav-item-dot" id="dot-${sec.id}"></span>`;
    btn.addEventListener('click', () => setView('section:' + sec.id));
    nav.appendChild(btn);
  });
}

async function loadMonthsHistory() {
  const data = await api('/api/months');
  state.monthsHistory = data.months || [];
}

async function loadMonthData() {
  const data = await api('/api/data?month=' + encodeURIComponent(state.month));
  state.monthData = data;
  updateTopbarRAG();
  updateSectionDots();
}

async function onMonthChange(e) {
  state.month = e.target.value || currentMonthStr();
  await loadMonthData();
  renderView();
}

async function shiftMonth(delta) {
  const parts = state.month.split('-');
  let y = parseInt(parts[0], 10);
  let m = parseInt(parts[1], 10) + delta;
  if (m < 1) { m = 12; y--; }
  else if (m > 12) { m = 1; y++; }
  state.month = `${y}-${String(m).padStart(2, '0')}`;
  document.getElementById('month-input').value = state.month;
  await loadMonthData();
  renderView();
}

function updateTopbarRAG() {
  const pill = document.getElementById('overall-pill');
  const text = document.getElementById('overall-pill-text');
  const rag = state.monthData.overallRAG;
  pill.className = 'rag-pill rag-' + (rag || 'none');
  text.textContent = rag ? rag.toUpperCase() : 'No data';
}

function metricsBySection(sectionId) {
  return state.metrics.filter(m => m.section === sectionId);
}

function sectionWorstRAG(sectionId) {
  const ids = metricsBySection(sectionId).map(m => m.id);
  let worst = null;
  ids.forEach(id => {
    const entry = state.monthData.metrics[id];
    if (!entry || !entry.rag) return;
    if (entry.rag === 'red') worst = 'red';
    else if (entry.rag === 'amber' && worst !== 'red') worst = 'amber';
    else if (entry.rag === 'green' && !worst) worst = 'green';
  });
  return worst;
}

function updateSectionDots() {
  state.sections.forEach(sec => {
    const dot = document.getElementById('dot-' + sec.id);
    if (!dot) return;
    dot.className = 'nav-item-dot' + (sectionWorstRAG(sec.id) ? ' ' + sectionWorstRAG(sec.id) : '');
  });
}

// ---------- Navigation ----------
function setView(view) {
  state.view = view;
  state.activeHistoryCard = null;
  document.querySelectorAll('.nav-item[data-view]').forEach(n => {
    n.classList.toggle('active', n.dataset.view === view);
  });
  if (typeof window.closeSidebar === 'function') window.closeSidebar();
  renderView();
}

function renderView() {
  const root = document.getElementById('view-root');
  const titleEl = document.getElementById('view-title');
  const subEl = document.getElementById('view-subtitle');
  root.innerHTML = '';

  if (state.view === 'overview') {
    titleEl.textContent = 'Overview';
    subEl.textContent = 'Reporting period: ' + state.month;
    root.appendChild(renderOverview());
  } else if (state.view === 'trends') {
    titleEl.textContent = 'Trends';
    subEl.textContent = 'Overall status across reporting periods';
    root.appendChild(renderTrends());
  } else if (state.view === 'exec') {
    titleEl.textContent = 'Executive Summary';
    subEl.textContent = 'Roll-up for ' + state.month;
    root.appendChild(renderExecSummary());
  } else if (state.view.startsWith('section:')) {
    const sectionId = state.view.split(':')[1];
    const sec = state.sections.find(s => s.id === sectionId);
    titleEl.textContent = sec ? sec.name : 'Section';
    subEl.textContent = state.month;
    root.appendChild(renderSection(sectionId));
  }
}

// ---------- Overview ----------
function renderOverview() {
  const frag = document.createElement('div');
  const rag = state.monthData.overallRAG;

  let green = 0, amber = 0, red = 0, trend = 0;
  state.metrics.forEach(m => {
    const entry = state.monthData.metrics[m.id];
    if (!entry) { if (m.direction === 'trend') trend++; return; }
    if (entry.rag === 'green') green++;
    else if (entry.rag === 'amber') amber++;
    else if (entry.rag === 'red') red++;
    else trend++;
  });

  // 1. Overview Banner
  const banner = document.createElement('div');
  banner.className = 'overview-banner rag-' + (rag || 'none');
  banner.innerHTML = `
    <div>
      <div class="banner-label">Overall status &middot; ${state.month}</div>
      <div class="banner-status ${rag || 'none'}">${rag ? rag.toUpperCase() : 'NO DATA'}</div>
    </div>
    <div class="banner-counts">
      <div class="banner-count"><div class="n" style="color:var(--green)">${green}</div><div class="l">Green</div></div>
      <div class="banner-count"><div class="n" style="color:var(--amber)">${amber}</div><div class="l">Amber</div></div>
      <div class="banner-count"><div class="n" style="color:var(--red)">${red}</div><div class="l">Red</div></div>
      <div class="banner-count"><div class="n" style="color:var(--text-dim)">${trend}</div><div class="l">Trend-only</div></div>
    </div>
  `;
  frag.appendChild(banner);

  // 2. Sections Grid
  const grid = document.createElement('div');
  grid.className = 'section-grid';
  state.sections.forEach(sec => {
    const secMetrics = metricsBySection(sec.id);
    let g = 0, a = 0, r = 0, t = 0;
    secMetrics.forEach(m => {
      const entry = state.monthData.metrics[m.id];
      if (!entry || entry.computed === null || entry.computed === undefined) return;
      if (entry.rag === 'green') g++; else if (entry.rag === 'amber') a++; else if (entry.rag === 'red') r++; else if (m.direction === 'trend') t++;
    });
    const worst = sectionWorstRAG(sec.id);
    const card = document.createElement('div');
    card.className = 'section-card' + (worst ? ' rag-' + worst : '');
    card.innerHTML = `
      <div class="section-card-head">${ICONS[sec.icon] || ''}<span class="section-card-name">${sec.name}</span></div>
      <div class="section-card-pills">
        ${g ? `<span class="mini-pill green">${g} OK</span>` : ''}
        ${a ? `<span class="mini-pill amber">${a} AMBER</span>` : ''}
        ${r ? `<span class="mini-pill red">${r} RED</span>` : ''}
        ${t ? `<span class="mini-pill trend">${t} trend</span>` : ''}
        ${!g && !a && !r && !t ? `<span class="mini-pill trend" style="opacity:.6">No data</span>` : ''}
      </div>
    `;
    card.addEventListener('click', () => setView('section:' + sec.id));
    grid.appendChild(card);
  });
  frag.appendChild(grid);

  // 3. RAG Distribution & Status History row
  const row = document.createElement('div');
  row.className = 'chart-row';
  row.innerHTML = `
    <div class="panel">
      <div class="panel-title">RAG distribution</div>
      ${donutSVG(green, amber, red, trend)}
    </div>
    <div class="panel">
      <div class="panel-title" style="display:flex; justify-content:space-between;">
        <span>Status history</span>
        <span style="font-size:11px; text-transform:none; color:var(--text-faint);">Click bar to switch month</span>
      </div>
      ${monthsStripSVG()}
    </div>
  `;
  frag.appendChild(row);

  // 4. Executive Summary Highlights on Overview (Direct solution for viewing saved summary)
  const nar = state.monthData.narrative || {};
  const hasNar = Boolean((nar.topRisks && nar.topRisks.trim()) || (nar.improvements && nar.improvements.trim()) || (nar.plannedActions && nar.plannedActions.trim()));

  const execRow = document.createElement('div');
  execRow.className = 'panel overview-exec-panel';
  execRow.style.marginTop = '22px';
  execRow.innerHTML = `
    <div class="overview-exec-head">
      <div style="display:flex; align-items:center; gap:10px;">
        <span class="overview-exec-badge">EXECUTIVE BRIEFING</span>
        <span style="font-size:14px; font-weight:700; color:var(--text);">Summary for ${state.month}</span>
        ${hasNar ? '<span class="mini-pill green">SAVED & ACTIVE</span>' : '<span class="mini-pill trend">NOT RECORDED YET</span>'}
      </div>
      <button id="btn-view-exec-overview" class="btn btn-sm btn-primary">
        <span>${hasNar ? 'Open Executive Report →' : 'Create Executive Summary +'}</span>
      </button>
    </div>
    <div class="overview-exec-content" style="margin-top:14px;">
      ${hasNar ? `
        <div class="overview-exec-grid">
          ${nar.topRisks && nar.topRisks.trim() ? `
            <div class="overview-exec-snippet risk">
              <div class="snip-label">⚠️ Top Risks (Client Note)</div>
              <div class="snip-text">${escapeHTML(nar.topRisks)}</div>
            </div>
          ` : ''}
          ${nar.improvements && nar.improvements.trim() ? `
            <div class="overview-exec-snippet improvement">
              <div class="snip-label">🚀 Delivered Improvements</div>
              <div class="snip-text">${escapeHTML(nar.improvements)}</div>
            </div>
          ` : ''}
          ${nar.plannedActions && nar.plannedActions.trim() ? `
            <div class="overview-exec-snippet action">
              <div class="snip-label">🎯 Planned Next Actions</div>
              <div class="snip-text">${escapeHTML(nar.plannedActions)}</div>
            </div>
          ` : ''}
        </div>
      ` : `
        <div class="empty-note" style="padding:4px 0;">
          No executive briefing notes saved for ${state.month} yet. Click above to write summary notes for client review.
        </div>
      `}
    </div>
  `;

  execRow.querySelector('#btn-view-exec-overview').addEventListener('click', () => setView('exec'));
  frag.appendChild(execRow);

  // Hook up month bar click jumps
  frag.querySelectorAll('[data-month-jump]').forEach(el => {
    el.addEventListener('click', async () => {
      const targetMonth = el.dataset.monthJump;
      if (!targetMonth || targetMonth === state.month) return;
      state.month = targetMonth;
      document.getElementById('month-input').value = state.month;
      await loadMonthData();
      renderView();
    });
  });

  return frag;
}

function donutSVG(g, a, r, t) {
  const total = g + a + r + t;
  if (total === 0) return `<div class="empty-note">No metrics recorded for this month yet.</div>`;
  const segs = [
    { v: g, color: 'var(--green)' },
    { v: a, color: 'var(--amber)' },
    { v: r, color: 'var(--red)' },
    { v: t, color: 'var(--none)' },
  ];
  const R = 60, C = 2 * Math.PI * R, cx = 80, cy = 80;
  let offset = 0;
  let circles = '';
  segs.forEach(s => {
    if (s.v === 0) return;
    const len = (s.v / total) * C;
    circles += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${s.color}" stroke-width="16" stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset += len;
  });
  return `<svg viewBox="0 0 160 160" width="160" height="160" style="display:block;margin:0 auto;">
    ${circles}
    <text x="80" y="76" text-anchor="middle" font-family="var(--mono)" font-size="22" fill="var(--text)" font-weight="700">${total}</text>
    <text x="80" y="94" text-anchor="middle" font-family="var(--sans)" font-size="10" fill="var(--text-faint)">metrics</text>
  </svg>`;
}

function monthsStripSVG() {
  const months = state.monthsHistory;
  if (!months.length) return `<div class="empty-note">Save data for a month to start building history.</div>`;
  const last = months.slice(-12);
  let bars = '<div class="trend-bars">';
  last.forEach(m => {
    const isCur = m.month === state.month;
    const color = m.overallRAG || 'none';
    const heightPct = m.overallRAG === 'red' ? 50 : m.overallRAG === 'amber' ? 75 : m.overallRAG === 'green' ? 100 : 25;
    const title = `${m.month} · Overall: ${(m.overallRAG || 'No data').toUpperCase()}`;
    bars += `
      <div class="trend-bar-wrap ${isCur ? 'active-month' : ''}" data-month-jump="${m.month}" title="${title}">
        <div class="trend-bar-tooltip">${m.month}: ${(m.overallRAG || 'NO DATA').toUpperCase()}</div>
        <div class="trend-bar ${color}" style="height:${heightPct}%"></div>
        <div class="trend-bar-label">${m.month.slice(2)}</div>
        ${isCur ? '<div class="trend-active-dot" title="Active Month"></div>' : ''}
      </div>
    `;
  });
  bars += '</div>';
  return bars;
}

// ---------- Trends ----------
function renderTrends() {
  const frag = document.createElement('div');

  const totalMonths = state.monthsHistory.length;
  let totalGreen = 0, totalAmber = 0, totalRed = 0;
  state.monthsHistory.forEach(m => {
    if (m.overallRAG === 'green') totalGreen++;
    else if (m.overallRAG === 'amber') totalAmber++;
    else if (m.overallRAG === 'red') totalRed++;
  });

  // Summary Metrics Banner
  const summaryPanel = document.createElement('div');
  summaryPanel.className = 'trends-summary-banner';
  summaryPanel.innerHTML = `
    <div class="trends-stat-item">
      <div class="stat-num">${totalMonths}</div>
      <div class="stat-lbl">Months Logged</div>
    </div>
    <div class="trends-stat-item">
      <div class="stat-num" style="color:var(--green)">${totalGreen}</div>
      <div class="stat-lbl">Green Periods</div>
    </div>
    <div class="trends-stat-item">
      <div class="stat-num" style="color:var(--amber)">${totalAmber}</div>
      <div class="stat-lbl">Amber Periods</div>
    </div>
    <div class="trends-stat-item">
      <div class="stat-num" style="color:var(--red)">${totalRed}</div>
      <div class="stat-lbl">Red Periods</div>
    </div>
    <div class="trends-stat-item">
      <div class="stat-num" style="color:var(--accent);">${state.month}</div>
      <div class="stat-lbl">Active Month</div>
    </div>
  `;
  frag.appendChild(summaryPanel);

  // Overall status by month chart
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.style.marginTop = '20px';
  panel.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
      <div class="panel-title" style="margin:0;">Overall status by month (Click any bar to jump to month)</div>
      <span style="font-size:12px; color:var(--text-faint);">Reporting timeline</span>
    </div>
    ${monthsStripSVG()}
  `;
  frag.appendChild(panel);

  // Reporting History Table with Rich Information
  const tablePanel = document.createElement('div');
  tablePanel.className = 'panel';
  tablePanel.style.marginTop = '20px';
  let rows = '';
  [...state.monthsHistory].reverse().forEach(m => {
    const isCurrent = m.month === state.month;
    const hasNarrative = m.hasNarrative;
    rows += `
      <tr class="${isCurrent ? 'active-row' : ''}" data-month="${m.month}">
        <td style="font-weight:700;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span>${m.month}</span>
            ${isCurrent ? '<span class="mini-pill green" style="font-size:10px; padding:1px 5px;">CURRENT</span>' : ''}
          </div>
        </td>
        <td>
          <span class="rag-pill rag-${m.overallRAG || 'none'}" style="display:inline-flex;">
            <span class="rag-dot"></span>${(m.overallRAG || 'no data').toUpperCase()}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            ${m.green !== undefined ? `<span class="mini-pill green">${m.green} OK</span>` : ''}
            ${m.amber !== undefined && m.amber > 0 ? `<span class="mini-pill amber">${m.amber} WARN</span>` : ''}
            ${m.red !== undefined && m.red > 0 ? `<span class="mini-pill red">${m.red} CRIT</span>` : ''}
            ${!m.green && !m.amber && !m.red ? `<span class="mini-pill trend" style="opacity:.6">No breakdown</span>` : ''}
          </div>
        </td>
        <td>
          ${hasNarrative ? `<span class="mini-pill green" title="Executive Summary is recorded">📄 Saved</span>` : `<span class="mini-pill trend" style="opacity:.6">None</span>`}
        </td>
        <td style="text-align:right;">
          <button class="btn btn-sm btn-open-month" data-open-month="${m.month}">
            <span>Open &middot; ${m.month}</span>
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </td>
      </tr>
    `;
  });

  tablePanel.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
      <div class="panel-title" style="margin:0;">Reporting history (${state.monthsHistory.length} recorded months)</div>
      <span style="font-size:12px; color:var(--text-faint);">Click any row to switch dashboard month</span>
    </div>
    <table class="months-table">
      <thead>
        <tr>
          <th>Reporting Month</th>
          <th>Overall Status</th>
          <th>Metrics Health</th>
          <th>Executive Briefing</th>
          <th style="text-align:right;">Action</th>
        </tr>
      </thead>
      <tbody>${rows || '<tr><td colspan="5" class="empty-note">No months recorded yet. Save metrics to build history.</td></tr>'}</tbody>
    </table>
  `;

  tablePanel.querySelectorAll('tr[data-month]').forEach(tr => {
    tr.addEventListener('click', async () => {
      state.month = tr.dataset.month;
      document.getElementById('month-input').value = state.month;
      await loadMonthData();
      setView('overview');
    });
  });

  frag.querySelectorAll('[data-month-jump]').forEach(el => {
    el.addEventListener('click', async () => {
      const targetMonth = el.dataset.monthJump;
      if (!targetMonth) return;
      state.month = targetMonth;
      document.getElementById('month-input').value = state.month;
      await loadMonthData();
      renderView();
    });
  });

  frag.appendChild(tablePanel);
  return frag;
}

// ---------- Section detail ----------
function renderSection(sectionId) {
  const sec = state.sections.find(s => s.id === sectionId);
  const frag = document.createElement('div');
  const heading = document.createElement('div');
  heading.className = 'section-heading';
  heading.innerHTML = `${ICONS[sec.icon] || ''}<h2>${sec.name}</h2>`;
  frag.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'metrics-list';
  metricsBySection(sectionId).forEach(m => list.appendChild(renderMetricCard(m)));
  frag.appendChild(list);
  return frag;
}

function fmtVal(v, unit) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return s + (unit || '');
}

function renderMetricCard(metric) {
  const entry = state.monthData.metrics[metric.id] || {};
  const rag = entry.rag || null;
  const historyList = (state.monthData.history && state.monthData.history[metric.id]) || entry.history || [];

  const wrap = document.createElement('div');
  wrap.className = 'metric-card';

  const cardTop = document.createElement('div');
  cardTop.className = 'metric-card-top';

  const strip = document.createElement('div');
  strip.className = 'metric-rag-strip' + (rag ? ' ' + rag : '');
  cardTop.appendChild(strip);

  const body = document.createElement('div');
  body.className = 'metric-body';

  // Info column
  const info = document.createElement('div');
  info.className = 'metric-info';
  let targetLine = '';
  if (metric.direction === 'trend') targetLine = 'Trend metric &middot; no fixed target';
  else if (metric.target !== null && metric.target !== undefined) targetLine = `Target: ${metric.direction === 'higher' ? '&ge;' : '&le;'} ${metric.target}${metric.unit || ''}`;
  else if (metric.ragRule === 'binary0') targetLine = 'Target: 0' + (metric.amberNotRed ? ' (flagged, not critical)' : '');
  else if (metric.ragRule === 'prevMonth') targetLine = 'Judged against previous month';

  let prevRefHtml = '';
  if (state.monthData.prevData && state.monthData.prevData[metric.id] !== undefined && state.monthData.prevData[metric.id] !== null) {
    prevRefHtml = `<div class="metric-prev-ref">Last month (${state.monthData.prevMonth}): <strong>${fmtVal(state.monthData.prevData[metric.id], metric.unit)}</strong></div>`;
  }

  info.innerHTML = `
    <div class="metric-label">${metric.label}</div>
    <div class="metric-desc">${metric.desc || ''}</div>
    <div class="metric-target">${targetLine}</div>
    ${prevRefHtml}
  `;
  body.appendChild(info);

  // Value column
  const valueBlock = document.createElement('div');
  valueBlock.className = 'metric-value-block';
  const valStr = fmtVal(entry.computed, metric.unit);
  const badge = metric.direction === 'trend' ? 'trend' : (rag || null);
  let mobileBreakdown = '';
  if (metric.mode === 'mobile_device' && entry.inputs) {
    if (entry.inputs.mode === 'vpn_mdm') {
      const v = entry.inputs.vpn !== undefined && entry.inputs.vpn !== null ? entry.inputs.vpn : 0;
      const m = entry.inputs.mdm !== undefined && entry.inputs.mdm !== null ? entry.inputs.mdm : 0;
      mobileBreakdown = `<div class="metric-breakdown-tag" title="Combined VPN + MDM total"><span class="tag-pill">VPN: ${v}</span><span class="tag-sep">+</span><span class="tag-pill">MDM: ${m}</span></div>`;
    } else if (entry.inputs.vpn !== undefined && entry.inputs.vpn !== null && entry.inputs.vpn !== '') {
      mobileBreakdown = `<div class="metric-breakdown-tag" title="VPN only tracking"><span class="tag-pill">VPN Only: ${entry.inputs.vpn}</span></div>`;
    }
  }
  valueBlock.innerHTML = `
    <div class="metric-value ${badge || ''}">${valStr !== null ? valStr : '<span class="metric-value-empty">—</span>'}</div>
    ${badge ? `<div class="metric-badge ${badge}">${badge === 'trend' ? 'TREND' : badge.toUpperCase()}</div>` : ''}
    ${mobileBreakdown}
  `;
  body.appendChild(valueBlock);

  // Inputs column with custom Up/Down Stepper
  const inputsBlock = document.createElement('div');
  inputsBlock.className = 'metric-inputs';

  const hasStoredData = entry.inputs && Object.values(entry.inputs).some(v => v !== null && v !== undefined && v !== '');

  if (metric.mode === 'direct') {
    inputsBlock.appendChild(miniField('value', 'Value', entry.inputs && entry.inputs.value));
  } else if (metric.mode === 'mobile_device') {
    const curMode = (entry.inputs && entry.inputs.mode) || (entry.inputs && entry.inputs.mdm !== undefined && entry.inputs.mdm !== null ? 'vpn_mdm' : 'vpn_only');
    const mobileWrap = document.createElement('div');
    mobileWrap.className = 'mobile-scope-wrap';

    const selectorRow = document.createElement('div');
    selectorRow.className = 'mobile-scope-selector';
    selectorRow.innerHTML = `
      <div class="scope-question-label">Enrollment Scope:</div>
      <div class="scope-btn-group">
        <button type="button" class="btn-scope ${curMode === 'vpn_only' ? 'active' : ''}" data-scope="vpn_only" title="Track VPN enrolled devices only">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6V4a4 4 0 018 0v2M3 6h10v8H3z"/></svg>
          <span>VPN Only</span>
        </button>
        <button type="button" class="btn-scope ${curMode === 'vpn_mdm' ? 'active' : ''}" data-scope="vpn_mdm" title="Track both VPN & MDM enrolled devices">
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 2h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1zM7 11h2"/></svg>
          <span>VPN + MDM</span>
        </button>
      </div>
    `;

    const dynamicFields = document.createElement('div');
    dynamicFields.className = 'mobile-scope-fields';

    function buildFields(mode) {
      dynamicFields.innerHTML = '';
      const vpnVal = entry.inputs ? (entry.inputs.vpn !== undefined ? entry.inputs.vpn : entry.inputs.value) : '';
      const vpnField = miniField('vpn', 'VPN Enrolled', vpnVal);
      dynamicFields.appendChild(vpnField);

      if (mode === 'vpn_mdm') {
        const mdmVal = entry.inputs ? entry.inputs.mdm : '';
        const mdmField = miniField('mdm', 'MDM Enrolled', mdmVal);
        dynamicFields.appendChild(mdmField);

        const sumBadge = document.createElement('div');
        sumBadge.className = 'mobile-sum-badge';
        function recalculate() {
          const v = parseFloat(vpnField.querySelector('input').value) || 0;
          const m = parseFloat(mdmField.querySelector('input').value) || 0;
          sumBadge.innerHTML = `<span class="sum-text">Total:</span> <strong>${v + m}</strong> <span class="sum-details">(${v} VPN + ${m} MDM)</span>`;
        }
        vpnField.querySelector('input').addEventListener('input', recalculate);
        mdmField.querySelector('input').addEventListener('input', recalculate);
        recalculate();
        dynamicFields.appendChild(sumBadge);
      }
    }

    buildFields(curMode);

    selectorRow.querySelectorAll('.btn-scope').forEach(b => {
      b.addEventListener('click', (e) => {
        e.preventDefault();
        selectorRow.querySelectorAll('.btn-scope').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        buildFields(b.dataset.scope);
      });
    });

    mobileWrap.appendChild(selectorRow);
    mobileWrap.appendChild(dynamicFields);
    inputsBlock.appendChild(mobileWrap);
  } else if (metric.mode === 'ratio') {
    inputsBlock.appendChild(miniField('num', metric.numLabel, entry.inputs && entry.inputs.num));
    inputsBlock.appendChild(miniField('den', metric.denLabel, entry.inputs && entry.inputs.den));
  } else if (metric.mode === 'avg') {
    inputsBlock.appendChild(miniField('total', metric.totalLabel, entry.inputs && entry.inputs.total));
    inputsBlock.appendChild(miniField('count', metric.countLabel, entry.inputs && entry.inputs.count));
  } else if (metric.mode === 'derived') {
    const note = document.createElement('div');
    note.className = 'derived-note';
    note.textContent = 'Auto-computed from ' + metric.deriveFrom.map(id => {
      const mm = state.metrics.find(x => x.id === id);
      return mm ? mm.label : id;
    }).join(' & ');
    inputsBlock.appendChild(note);
  }

  if (metric.mode !== 'derived') {
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary metric-save';
    saveBtn.textContent = 'Save';
    saveBtn.title = 'Save or update data for ' + state.month;
    saveBtn.addEventListener('click', () => saveMetric(metric, wrap));
    inputsBlock.appendChild(saveBtn);

    if (hasStoredData) {
      const clearBtn = document.createElement('button');
      clearBtn.className = 'btn btn-clear';
      clearBtn.innerHTML = `${ICONS.reset} <span>Clear</span>`;
      clearBtn.title = 'Clear/reset stored data for this metric in ' + state.month;
      clearBtn.addEventListener('click', () => clearMetric(metric, wrap));
      inputsBlock.appendChild(clearBtn);
    }
  }

  // History button if records exist
  if (historyList && historyList.length > 0) {
    const histBtn = document.createElement('button');
    histBtn.className = 'btn btn-history';
    histBtn.innerHTML = `${ICONS.history} <span>History (${historyList.length})</span>`;
    histBtn.title = 'View, restore, or delete past entries';
    histBtn.addEventListener('click', () => {
      state.activeHistoryCard = state.activeHistoryCard === metric.id ? null : metric.id;
      renderView();
    });
    inputsBlock.appendChild(histBtn);
  }

  body.appendChild(inputsBlock);
  cardTop.appendChild(body);
  wrap.appendChild(cardTop);

  // Render collapsible History Drawer with both RESTORE and DELETE buttons
  if (state.activeHistoryCard === metric.id && historyList.length > 0) {
    const drawer = document.createElement('div');
    drawer.className = 'history-drawer';

    let itemsHtml = '';
    historyList.forEach((h, idx) => {
      const dateStr = new Date(h.timestamp).toLocaleString();
      const valDisplay = h.computed !== undefined && h.computed !== null ? fmtVal(h.computed, metric.unit) : '(Cleared)';
      let inputsStr = '';
      const rawInp = h.inputs || h.previousInputs || {};
      if (metric.mode === 'mobile_device') {
        if (rawInp.mode === 'vpn_mdm') {
          inputsStr = `VPN: ${rawInp.vpn !== undefined ? rawInp.vpn : 0}, MDM: ${rawInp.mdm !== undefined ? rawInp.mdm : 0} [Scope: VPN+MDM]`;
        } else {
          inputsStr = `VPN: ${rawInp.vpn !== undefined ? rawInp.vpn : (rawInp.value !== undefined ? rawInp.value : 0)} [Scope: VPN Only]`;
        }
      } else {
        inputsStr = Object.entries(rawInp).map(([k, v]) => `${k}:${v}`).join(', ');
      }
      const actBadge = h.action === 'clear' ? '<span class="mini-pill red" style="font-size:10px; padding:1px 5px;">CLEAR</span>' : '<span class="mini-pill green" style="font-size:10px; padding:1px 5px;">SAVED</span>';

      itemsHtml += `
        <div class="history-item">
          <div class="hist-info">
            ${actBadge}
            <span class="hist-time">${dateStr}</span> &middot; 
            <span class="hist-val">${valDisplay}</span> 
            ${inputsStr ? `<span class="hist-inputs">(${inputsStr})</span>` : ''}
          </div>
          <div class="hist-btn-group">
            <button type="button" class="btn-restore" data-idx="${idx}" title="Restore this past state">
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.5 8a5.5 5.5 0 101.2-3.4M2.5 3.5v4.5h4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>Restore</span>
            </button>
            <button type="button" class="btn-delete-hist" data-idx="${idx}" title="Permanently delete this entry from history">
              <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4.5h10M6 4.5V3a1 1 0 011-1h2a1 1 0 011 1v1.5M5 4.5v8a1 1 0 001 1h4a1 1 0 001-1v-8" stroke-linecap="round"/></svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      `;
    });

    drawer.innerHTML = `
      <div class="history-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <span>Change History &middot; Past Entries for ${metric.label}</span>
          <span class="mini-pill trend" style="font-size:10.5px;">${historyList.length} records</span>
        </div>
        <button type="button" class="btn-clear-all-hist" title="Remove all history entries for this metric">
          Clear All
        </button>
      </div>
      <div class="history-list">${itemsHtml}</div>
    `;

    drawer.querySelectorAll('.btn-restore').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        restoreMetricHistory(metric, historyList[idx]);
      });
    });

    drawer.querySelectorAll('.btn-delete-hist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        deleteMetricHistory(metric, idx);
      });
    });

    const clearAllBtn = drawer.querySelector('.btn-clear-all-hist');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearAllMetricHistory(metric);
      });
    }

    wrap.appendChild(drawer);
  }

  return wrap;
}

// Custom Stepper Field with Up (▲) & Down (▼) Buttons
function miniField(key, label, value) {
  const f = document.createElement('div');
  f.className = 'mini-field';
  const val = value !== undefined && value !== null ? value : '';
  f.innerHTML = `
    <label title="${label || ''}">${label || key}</label>
    <div class="stepper-wrap">
      <input type="number" step="any" data-key="${key}" value="${val}">
      <div class="stepper-controls">
        <button type="button" class="stepper-btn stepper-up" title="Increase value">
          <svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M2 8L6 4L10 8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button type="button" class="stepper-btn stepper-down" title="Decrease value">
          <svg viewBox="0 0 12 12" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M2 4L6 8L10 4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>
  `;

  const inp = f.querySelector('input');
  const upBtn = f.querySelector('.stepper-up');
  const downBtn = f.querySelector('.stepper-down');

  function adjust(delta) {
    let cur = parseFloat(inp.value);
    if (isNaN(cur)) cur = 0;
    let next = Math.round((cur + delta) * 100) / 100;
    if (next < 0) next = 0;
    inp.value = next;
    inp.dispatchEvent(new Event('input', { bubbles: true }));
    inp.dispatchEvent(new Event('change', { bubbles: true }));
  }

  upBtn.addEventListener('click', (e) => {
    e.preventDefault();
    adjust(1);
  });

  downBtn.addEventListener('click', (e) => {
    e.preventDefault();
    adjust(-1);
  });

  return f;
}

async function saveMetric(metric, cardEl) {
  const inputs = {};
  if (metric.mode === 'mobile_device') {
    const activeScope = cardEl.querySelector('.btn-scope.active');
    const scope = activeScope ? activeScope.dataset.scope : 'vpn_only';
    inputs.mode = scope;
    const vpnInp = cardEl.querySelector('input[data-key="vpn"]');
    inputs.vpn = vpnInp && vpnInp.value !== '' ? Number(vpnInp.value) : null;
    if (scope === 'vpn_mdm') {
      const mdmInp = cardEl.querySelector('input[data-key="mdm"]');
      inputs.mdm = mdmInp && mdmInp.value !== '' ? Number(mdmInp.value) : null;
    }
  } else {
    cardEl.querySelectorAll('.mini-field input').forEach(inp => {
      inputs[inp.dataset.key] = inp.value === '' ? null : Number(inp.value);
    });
  }
  const saveBtn = cardEl.querySelector('.metric-save');
  saveBtn.textContent = 'Saving…';
  saveBtn.disabled = true;
  try {
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, inputs }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    updateTopbarRAG();
    updateSectionDots();
    await loadMonthsHistory();
    showToast('Saved · ' + metric.label, 'green');
    renderView();
  } catch (err) {
    showToast('Could not save: ' + err.message, 'red');
    saveBtn.textContent = 'Save';
    saveBtn.disabled = false;
  }
}

async function clearMetric(metric, cardEl) {
  if (!confirm(`Are you sure you want to clear stored data for "${metric.label}" in ${state.month}? (A backup will remain in History)`)) {
    return;
  }
  try {
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, action: 'clear' }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    updateTopbarRAG();
    updateSectionDots();
    await loadMonthsHistory();
    showToast('Cleared · ' + metric.label, 'green');
    renderView();
  } catch (err) {
    showToast('Could not clear: ' + err.message, 'red');
  }
}

async function restoreMetricHistory(metric, histEntry) {
  try {
    const inputsToRestore = histEntry.inputs || histEntry.previousInputs || {};
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, inputs: inputsToRestore }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    updateTopbarRAG();
    updateSectionDots();
    await loadMonthsHistory();
    showToast('Restored previous value for ' + metric.label, 'green');
    renderView();
  } catch (err) {
    showToast('Could not restore: ' + err.message, 'red');
  }
}

async function deleteMetricHistory(metric, index) {
  if (!confirm(`Delete this history record for "${metric.label}"?`)) return;
  try {
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, action: 'delete_history_item', historyIndex: index }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    showToast('History entry deleted', 'green');
    renderView();
  } catch (err) {
    showToast('Could not delete history: ' + err.message, 'red');
  }
}

async function clearAllMetricHistory(metric) {
  if (!confirm(`Clear ALL history entries for "${metric.label}" in ${state.month}?`)) return;
  try {
    const res = await api('/api/data', {
      method: 'POST',
      body: JSON.stringify({ month: state.month, metricId: metric.id, action: 'clear_all_history' }),
    });
    state.monthData.metrics = res.metrics;
    state.monthData.overallRAG = res.overallRAG;
    if (res.history) state.monthData.history = res.history;
    showToast('All history cleared for ' + metric.label, 'green');
    renderView();
  } catch (err) {
    showToast('Could not clear history: ' + err.message, 'red');
  }
}

// ---------- Executive Summary ----------
function renderExecSummary() {
  const frag = document.createElement('div');

  const reds = [], ambers = [];
  state.metrics.forEach(m => {
    const entry = state.monthData.metrics[m.id];
    if (!entry || !entry.rag) return;
    const targetStr = m.target !== null && m.target !== undefined ? `target ${m.direction === 'higher' ? '≥' : '≤'} ${m.target}${m.unit || ''}` : (m.ragRule === 'binary0' ? 'target 0' : '');
    const row = { label: m.label, value: fmtVal(entry.computed, m.unit), targetStr };
    if (entry.rag === 'red') reds.push(row);
    else if (entry.rag === 'amber') ambers.push(row);
  });

  // 1. Top risks auto-detected
  const heading = document.createElement('div');
  heading.className = 'section-heading';
  heading.innerHTML = `${ICONS.file}<h2>Top Risks &middot; System Identified (${state.month})</h2>`;
  frag.appendChild(heading);

  const list = document.createElement('div');
  list.className = 'risk-list';
  if (!reds.length && !ambers.length) {
    list.innerHTML = `<div class="empty-note">No RED or AMBER metric threshold breaches for ${state.month}. Security posture is within acceptable parameters.</div>`;
  } else {
    reds.forEach(r => {
      list.innerHTML += `<div class="risk-row"><div class="risk-row-label">${r.label}</div><div class="risk-row-value">${r.value} &middot; ${r.targetStr}</div></div>`;
    });
    ambers.forEach(r => {
      list.innerHTML += `<div class="risk-row amber"><div class="risk-row-label">${r.label}</div><div class="risk-row-value">${r.value} &middot; ${r.targetStr}</div></div>`;
    });
  }
  frag.appendChild(list);

  // 2. Published / Active Executive Briefing Card
  const narrative = state.monthData.narrative || {};
  const hasNarrative = Boolean(
    (narrative.topRisks && narrative.topRisks.trim()) ||
    (narrative.improvements && narrative.improvements.trim()) ||
    (narrative.plannedActions && narrative.plannedActions.trim())
  );

  const briefingSection = document.createElement('div');
  briefingSection.className = 'panel exec-briefing-panel';
  briefingSection.style.marginTop = '24px';
  
  briefingSection.innerHTML = `
    <div class="exec-briefing-header">
      <div>
        <div class="panel-title" style="margin-bottom:4px;">Published Executive Briefing &middot; ${state.month}</div>
        <div style="font-size:12px; color:var(--text-faint);">
          ${hasNarrative ? `Status: <span style="color:var(--green); font-weight:700;">SAVED & PUBLISHED</span>` : `Status: <span style="color:var(--amber); font-weight:700;">DRAFT (NO SUMMARY SAVED YET)</span>`}
          ${narrative.updatedAt ? `&middot; Last updated: ${new Date(narrative.updatedAt).toLocaleString()}` : ''}
        </div>
      </div>
      <div class="exec-actions-bar">
        <button id="btn-print-briefing" class="btn btn-sm" title="Print or Export Briefing as PDF">
          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 7V3h10v4M5 15H3a1 1 0 01-1-1V9a1 1 0 011-1h14a1 1 0 011 1v5a1 1 0 01-1 1h-2M5 11h10v6H5v-6z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Print / PDF</span>
        </button>
        <button id="btn-jump-editor" class="btn btn-primary btn-sm" title="Edit and update summary below">
          <span>Edit Summary</span>
        </button>
      </div>
    </div>

    <div class="exec-briefing-body">
      ${hasNarrative ? `
        <div class="briefing-card-grid">
          <div class="briefing-card card-risks">
            <div class="briefing-card-title">
              <span class="briefing-icon">⚠️</span>
              <span>1. Top Operational Risks (Client Notes)</span>
            </div>
            <div class="briefing-card-content">${escapeHTML(narrative.topRisks) || '<em style="color:var(--text-faint)">No specific risk notes provided.</em>'}</div>
          </div>

          <div class="briefing-card card-improvements">
            <div class="briefing-card-title">
              <span class="briefing-icon">🚀</span>
              <span>2. Key Improvements Delivered</span>
            </div>
            <div class="briefing-card-content">${escapeHTML(narrative.improvements) || '<em style="color:var(--text-faint)">No improvement items logged.</em>'}</div>
          </div>

          <div class="briefing-card card-actions">
            <div class="briefing-card-title">
              <span class="briefing-icon">🎯</span>
              <span>3. Planned Actions & Milestones (Next Month)</span>
            </div>
            <div class="briefing-card-content">${escapeHTML(narrative.plannedActions) || '<em style="color:var(--text-faint)">No planned actions specified.</em>'}</div>
          </div>
        </div>
      ` : `
        <div class="empty-briefing-prompt">
          <div style="font-size:26px; margin-bottom:8px;">📋</div>
          <div style="font-weight:700; font-size:14.5px; margin-bottom:6px; color:#ffffff;">No Executive Summary Saved For ${state.month}</div>
          <div style="color:var(--text-dim); font-size:12.5px; max-width:500px; margin:0 auto 16px;">
            Fill in the notes below and click <strong>"Save Summary"</strong>. Once saved, your summary will be published here and displayed on the Overview dashboard.
          </div>
        </div>
      `}
    </div>
  `;

  frag.appendChild(briefingSection);

  // 3. Executive Summary Editor Form
  const editorHeading = document.createElement('div');
  editorHeading.className = 'section-heading';
  editorHeading.style.marginTop = '28px';
  editorHeading.id = 'summary-editor-anchor';
  editorHeading.innerHTML = `<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13.5 3.5l3 3L6 17H3v-3L13.5 3.5z" stroke-linejoin="round"/></svg><h2>Executive Summary Editor &middot; ${state.month}</h2>`;
  frag.appendChild(editorHeading);

  const narrativeWrap = document.createElement('div');
  narrativeWrap.className = 'narrative-grid';
  narrativeWrap.innerHTML = `
    <div class="narrative-field">
      <label>1. Top Risks (Notes for the client & stakeholder review)</label>
      <textarea id="n-topRisks" placeholder="Key risks carried into next month... e.g. 5 devices without latest patch, vendor release delayed...">${narrative.topRisks || ''}</textarea>
    </div>
    <div class="narrative-field">
      <label>2. Key Improvements Delivered This Month</label>
      <textarea id="n-improvements" placeholder="Improvements delivered this month... e.g. 100% MFA rollout completed, critical vulnerabilities patched within SLA...">${narrative.improvements || ''}</textarea>
    </div>
    <div class="narrative-field">
      <label>3. Planned Actions & Objectives — Next Month</label>
      <textarea id="n-plannedActions" placeholder="Committed actions for the next reporting period... e.g. Deploy Sophos EDR to remaining 15 endpoints...">${narrative.plannedActions || ''}</textarea>
    </div>
    <div class="editor-btn-row">
      <button id="save-narrative" class="btn btn-primary" style="padding:10px 24px; font-size:13.5px;">
        <span>Save Summary</span>
      </button>
      <span style="font-size:12px; color:var(--text-faint); margin-left:10px;">Saved summaries instantly publish to the Briefing card above and the Overview screen.</span>
    </div>
  `;
  frag.appendChild(narrativeWrap);

  // Event handlers
  const printBtn = briefingSection.querySelector('#btn-print-briefing');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  const jumpBtn = briefingSection.querySelector('#btn-jump-editor');
  if (jumpBtn) {
    jumpBtn.addEventListener('click', () => {
      document.getElementById('summary-editor-anchor').scrollIntoView({ behavior: 'smooth' });
      document.getElementById('n-topRisks').focus();
    });
  }

  narrativeWrap.querySelector('#save-narrative').addEventListener('click', async (e) => {
    e.target.textContent = 'Saving…';
    e.target.disabled = true;
    try {
      const topRisks = document.getElementById('n-topRisks').value;
      const improvements = document.getElementById('n-improvements').value;
      const plannedActions = document.getElementById('n-plannedActions').value;
      const res = await api('/api/narrative', {
        method: 'POST',
        body: JSON.stringify({
          month: state.month,
          topRisks,
          improvements,
          plannedActions,
        }),
      });
      state.monthData.narrative = res.narrative || { topRisks, improvements, plannedActions, updatedAt: new Date().toISOString() };
      await loadMonthsHistory();
      showToast('Executive summary saved successfully!', 'green');
      renderView();
    } catch (err) {
      showToast('Could not save summary: ' + err.message, 'red');
      e.target.textContent = 'Save Summary';
      e.target.disabled = false;
    }
  });

  return frag;
}

// ---------- Toast ----------
let toastTimer = null;
function showToast(msg, kind) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show-' + (kind || 'green');
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.hidden = true; }, 2600);
}

// ============================================================
// ANTIGRAVITY RING / DONUT PARTICLE SYSTEM (Canvas 2D Engine)
// Reference: https://antigravity.google
//
// 🔵 Particle Shape:
//  - Ring/donut drawn as arc with stroke (no fill) -> circle with hole in center
//  - Slightly elliptical (aspect ratio 0.25–0.70) so alignment visibly changes as it rotates
//
// 🔄 Rotation:
//  - Independent rotSpeed per ring (±0.007 to ±0.024 rad/frame)
//  - Clockwise and counter-clockwise directions
//  - Nearby rings spin faster (up to 4× normal speed) near cursor
//
// ✨ Properties per ring:
//  - Outer radius: 1.6 px → 20 px across 3 depth layers
//  - Ring wall thickness: 18–53% of radius
//  - Ellipse squish: 25–70% (Y axis compressed)
//  - Spin speed: ±0.007 to ±0.024 rad/frame
//  - Count: 160 desktop / 60 mobile
//  - Colors: black and blue
//
// 🖱️ Mouse Interaction:
//  - Rings repel away from cursor in 130px radius (quadratic falloff)
//  - Proximity spin multiplier up to 4×
//  - Disabled on touch devices
// ============================================================

let _loginCanvas = null;
let _loginCtx = null;
let _loginRaf = null;
let _rings = [];
let _canvasW = 0;
let _canvasH = 0;
let _mouseX = -9999;
let _mouseY = -9999;
let _isTouchDevice = false;
let _spotlightEl = null;
let _canvasRunning = false;

class AntigravityRing {
  constructor(w, h, isDark) {
    this.init(w, h, isDark, true);
  }

  init(w, h, isDark, initial = false) {
    // 3 depth layers: 0=far (tiny, subtle), 1=mid, 2=near (large, prominent)
    const layerRand = Math.random();
    this.layer = layerRand < 0.35 ? 0 : layerRand < 0.72 ? 1 : 2;

    if (this.layer === 0) {
      this.radius = 1.6 + Math.random() * 3.2;      // 1.6 – 4.8 px
      this.speedK = 0.85;
      this.alpha  = 0.45 + Math.random() * 0.20;    // 0.45 – 0.65
    } else if (this.layer === 1) {
      this.radius = 5.0 + Math.random() * 6.5;      // 5.0 – 11.5 px
      this.speedK = 1.0;
      this.alpha  = 0.60 + Math.random() * 0.22;    // 0.60 – 0.82
    } else {
      this.radius = 11.5 + Math.random() * 8.5;     // 11.5 – 20.0 px
      this.speedK = 1.20;
      this.alpha  = 0.72 + Math.random() * 0.24;    // 0.72 – 0.96
    }

    // Ring wall thickness: 18% to 53% of radius
    const wallPct = 0.18 + Math.random() * 0.35;
    this.lineWidth = Math.max(1.2, this.radius * wallPct);

    // Ellipse squish: 25% to 70% (compressed Y axis)
    this.squish = 0.25 + Math.random() * 0.45;

    // Spin speed: ±0.007 to ±0.024 rad/frame
    const baseSpeed = 0.007 + Math.random() * 0.017;
    const direction = Math.random() < 0.5 ? 1 : -1;
    this.rotSpeed = baseSpeed * direction * this.speedK;

    // Rotation angle
    this.angle = initial ? Math.random() * Math.PI * 2 : 0;

    // Assign color: Black and Blue
    this.setColor(isDark);

    // Initial position scattered across viewport
    this.baseX = Math.random() * w;
    this.baseY = Math.random() * h;

    // Ambient floating drift
    this.driftAngle  = Math.random() * Math.PI * 2;
    this.driftSpeed  = 0.004 + Math.random() * 0.007;
    this.driftRadius = 6 + Math.random() * 18;

    // Repulsion offset
    this.offsetX = 0;
    this.offsetY = 0;
    this.drawX   = this.baseX;
    this.drawY   = this.baseY;
  }

  setColor(isDark) {
    if (isDark) {
      const palette = [
        `rgba(56, 189, 248, ${this.alpha.toFixed(2)})`,   // Sky Blue
        `rgba(96, 165, 250, ${this.alpha.toFixed(2)})`,   // Blue 400
        `rgba(37, 99, 235, ${this.alpha.toFixed(2)})`,    // Blue 600
        `rgba(34, 211, 238, ${this.alpha.toFixed(2)})`,   // Cyan 400
        `rgba(226, 232, 240, ${this.alpha.toFixed(2)})`   // Slate Light
      ];
      this.color = palette[Math.floor(Math.random() * palette.length)];
    } else {
      // Light mode: Black and Blue (crisp, high-contrast)
      const isBlack = Math.random() < 0.48; // ~48% black/charcoal, ~52% blues
      if (isBlack) {
        const blacks = [
          `rgba(15, 23, 42, ${this.alpha.toFixed(2)})`,     // Charcoal Slate #0f172a
          `rgba(0, 0, 0, ${(this.alpha * 0.90).toFixed(2)})`, // Pure Black
          `rgba(30, 41, 59, ${this.alpha.toFixed(2)})`,     // Midnight #1e293b
          `rgba(51, 65, 85, ${this.alpha.toFixed(2)})`      // Slate #334155
        ];
        this.color = blacks[Math.floor(Math.random() * blacks.length)];
      } else {
        const blues = [
          `rgba(26, 115, 232, ${this.alpha.toFixed(2)})`,   // Google Blue #1a73e8
          `rgba(37, 99, 235, ${this.alpha.toFixed(2)})`,    // Royal Blue #2563eb
          `rgba(2, 132, 199, ${this.alpha.toFixed(2)})`,    // Ocean Sky #0284c7
          `rgba(29, 78, 216, ${this.alpha.toFixed(2)})`,    // Deep Cobalt #1d4ed8
          `rgba(79, 70, 229, ${this.alpha.toFixed(2)})`     // Indigo #4f46e5
        ];
        this.color = blues[Math.floor(Math.random() * blues.length)];
      }
    }
  }

  update(w, h, mouseX, mouseY, isTouch) {
    // 1. Ambient gentle floating motion
    this.driftAngle += this.driftSpeed;
    const currentBaseX = this.baseX + Math.cos(this.driftAngle) * this.driftRadius;
    const currentBaseY = this.baseY + Math.sin(this.driftAngle * 0.82) * this.driftRadius;

    // 2. Mouse interaction: 130px radius repulsion + spin acceleration
    let targetOffX = 0;
    let targetOffY = 0;
    let spinMult = 1.0;

    const REPEL_RADIUS = 130;
    const MAX_PUSH = 52;

    if (!isTouch && mouseX > -1000) {
      const curX = currentBaseX + this.offsetX;
      const curY = currentBaseY + this.offsetY;
      const dx = curX - mouseX;
      const dy = curY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPEL_RADIUS && dist > 1) {
        // Quadratic falloff: (1 - dist / radius)^2
        const norm = 1 - (dist / REPEL_RADIUS);
        const force = norm * norm * MAX_PUSH;
        targetOffX = (dx / dist) * force;
        targetOffY = (dy / dist) * force;

        // Nearby rings spin faster (up to 4× normal speed)
        spinMult = 1.0 + (3.0 * norm);
      }
    }

    // Smooth lerp toward target repulsion offset (natural spring return)
    this.offsetX += (targetOffX - this.offsetX) * 0.12;
    this.offsetY += (targetOffY - this.offsetY) * 0.12;

    // Advance rotation with spin multiplier
    this.angle += this.rotSpeed * spinMult;

    // Final draw coordinates
    this.drawX = currentBaseX + this.offsetX;
    this.drawY = currentBaseY + this.offsetY;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.drawX, this.drawY);
    ctx.rotate(this.angle);
    ctx.scale(1, this.squish); // Compressed Y axis creates elliptical ring

    // Draw donut ring: arc with stroke (no fill) -> circle with hole in center
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color;
    ctx.stroke();

    ctx.restore();
  }
}

function initLoginCanvas() {
  _loginCanvas = document.getElementById('login-canvas');
  if (!_loginCanvas) return;

  _loginCtx = _loginCanvas.getContext('2d');
  if (!_loginCtx) return;

  _spotlightEl = document.getElementById('login-spotlight');
  _isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  _setupCanvasSize();
  _spawnRings();

  // Mouse event listeners on login-screen
  const loginScreen = document.getElementById('login-screen');
  if (loginScreen && !_isTouchDevice) {
    loginScreen.addEventListener('mousemove', _onCanvasMouseMove, { passive: true });
    loginScreen.addEventListener('mouseleave', _onCanvasMouseLeave, { passive: true });
  }

  // HUD latency ticker
  setInterval(() => {
    const el = document.getElementById('login-hud-latency');
    if (el) el.textContent = Math.floor(10 + Math.random() * 5) + 'ms';
  }, 2400);

  // Resize listener
  let _resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
      _setupCanvasSize();
      _spawnRings();
    }, 180);
  });

  startLoginCanvasAnimation();
}

function _setupCanvasSize() {
  if (!_loginCanvas || !_loginCtx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  _canvasW = window.innerWidth;
  _canvasH = window.innerHeight;

  _loginCanvas.width  = Math.round(_canvasW * dpr);
  _loginCanvas.height = Math.round(_canvasH * dpr);
  _loginCanvas.style.width  = _canvasW + 'px';
  _loginCanvas.style.height = _canvasH + 'px';

  _loginCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function _spawnRings() {
  const isDark = (document.documentElement.getAttribute('data-theme') || 'light') === 'dark';
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 60 : 160;

  _rings = [];
  for (let i = 0; i < count; i++) {
    _rings.push(new AntigravityRing(_canvasW, _canvasH, isDark));
  }
}

function _onCanvasMouseMove(e) {
  _mouseX = e.clientX;
  _mouseY = e.clientY;

  if (_spotlightEl) {
    _spotlightEl.style.background = `radial-gradient(
      circle 360px at ${_mouseX}px ${_mouseY}px,
      rgba(37, 99, 235, 0.04) 0%,
      transparent 70%
    )`;
  }
}

function _onCanvasMouseLeave() {
  _mouseX = -9999;
  _mouseY = -9999;
  if (_spotlightEl) _spotlightEl.style.background = '';
}

function _canvasLoop() {
  if (!_canvasRunning || !_loginCtx || !_loginCanvas) return;

  _loginCtx.clearRect(0, 0, _canvasW, _canvasH);

  for (let i = 0; i < _rings.length; i++) {
    const ring = _rings[i];
    ring.update(_canvasW, _canvasH, _mouseX, _mouseY, _isTouchDevice);
    ring.draw(_loginCtx);
  }

  _loginRaf = requestAnimationFrame(_canvasLoop);
}

function startLoginCanvasAnimation() {
  if (_canvasRunning) return;
  _canvasRunning = true;
  if (_rings.length === 0 && _canvasW > 0) {
    _spawnRings();
  }
  _loginRaf = requestAnimationFrame(_canvasLoop);
}

function stopLoginCanvasAnimation() {
  _canvasRunning = false;
  if (_loginRaf) {
    cancelAnimationFrame(_loginRaf);
    _loginRaf = null;
  }
}

function refreshRingTheme(isDark) {
  for (let i = 0; i < _rings.length; i++) {
    _rings[i].setColor(isDark);
  }
}

// Compatibility no-ops
function createParticles() {
  const isDark = (document.documentElement.getAttribute('data-theme') || 'light') === 'dark';
  refreshRingTheme(isDark);
}
function createTelemetry() {}





// ---------- Dynamic Interactive Cursor Follower ----------
function initCursorFollower() {
  const aura = document.getElementById('cursor-glow');
  const dot = document.getElementById('cursor-dot');
  if (!aura || !dot) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
    document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    const isInteractive = !!e.target.closest('button, input, textarea, a, .section-card, .metric-card, .nav-item, .month-picker, .btn-restore, .btn-delete-hist, .trend-bar-wrap, .user-chip, .btn-a0-toggle');
    if (isInteractive) {
      document.body.classList.add('cursor-hover');
    } else {
      document.body.classList.remove('cursor-hover');
    }
  });

  function animateAura() {
    currentX += (mouseX - currentX) * 0.22;
    currentY += (mouseY - currentY) * 0.22;
    aura.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateAura);
  }
  animateAura();
}

// ---------- 3D Interactive Tilt on Login Card ----------
function initLoginTilt() {
  const screen = document.getElementById('login-screen');
  const card = document.getElementById('login-form');
  if (!screen || !card) return;

  screen.addEventListener('mousemove', (e) => {
    if (screen.hidden) return;
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

    const tiltX = -deltaY * 8;
    const tiltY = deltaX * 8;

    card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
  });

  screen.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}
