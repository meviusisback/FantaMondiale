// FantaMondiale - App Logic (app.js)

// --- SEED PLAYERS DATA ---
const SEED_PLAYERS = [
  // Goalkeepers (POR)
  { id: 's-1', name: 'Emiliano Martínez', role: 'POR', country: 'Argentina', initialValue: 15, ownerId: null, purchaseCost: null },
  { id: 's-2', name: 'Alisson Becker', role: 'POR', country: 'Brasile', initialValue: 16, ownerId: null, purchaseCost: null },
  { id: 's-3', name: 'Thibaut Courtois', role: 'POR', country: 'Belgio', initialValue: 18, ownerId: null, purchaseCost: null },
  { id: 's-4', name: 'Mike Maignan', role: 'POR', country: 'Francia', initialValue: 17, ownerId: null, purchaseCost: null },
  { id: 's-5', name: 'Gianluigi Donnarumma', role: 'POR', country: 'Italia', initialValue: 15, ownerId: null, purchaseCost: null },
  { id: 's-6', name: 'Yassine Bounou', role: 'POR', country: 'Marocco', initialValue: 12, ownerId: null, purchaseCost: null },
  { id: 's-7', name: 'Marc-André ter Stegen', role: 'POR', country: 'Spagna', initialValue: 14, ownerId: null, purchaseCost: null },
  { id: 's-8', name: 'Jordan Pickford', role: 'POR', country: 'Inghilterra', initialValue: 11, ownerId: null, purchaseCost: null },

  // Defenders (DIF)
  { id: 's-10', name: 'Virgil van Dijk', role: 'DIF', country: 'Paesi Bassi', initialValue: 18, ownerId: null, purchaseCost: null },
  { id: 's-11', name: 'Marquinhos', role: 'DIF', country: 'Brasile', initialValue: 16, ownerId: null, purchaseCost: null },
  { id: 's-12', name: 'Achraf Hakimi', role: 'DIF', country: 'Marocco', initialValue: 20, ownerId: null, purchaseCost: null },
  { id: 's-13', name: 'Theo Hernández', role: 'DIF', country: 'Francia', initialValue: 19, ownerId: null, purchaseCost: null },
  { id: 's-14', name: 'Joško Gvardiol', role: 'DIF', country: 'Croazia', initialValue: 15, ownerId: null, purchaseCost: null },
  { id: 's-15', name: 'Antonio Rüdiger', role: 'DIF', country: 'Germania', initialValue: 16, ownerId: null, purchaseCost: null },
  { id: 's-16', name: 'John Stones', role: 'DIF', country: 'Inghilterra', initialValue: 14, ownerId: null, purchaseCost: null },
  { id: 's-17', name: 'Ronald Araujo', role: 'DIF', country: 'Uruguay', initialValue: 15, ownerId: null, purchaseCost: null },
  { id: 's-18', name: 'Alphonso Davies', role: 'DIF', country: 'Canada', initialValue: 17, ownerId: null, purchaseCost: null },
  { id: 's-19', name: 'Alessandro Bastoni', role: 'DIF', country: 'Italia', initialValue: 15, ownerId: null, purchaseCost: null },
  { id: 's-20', name: 'Ruben Dias', role: 'DIF', country: 'Portogallo', initialValue: 18, ownerId: null, purchaseCost: null },
  { id: 's-21', name: 'William Saliba', role: 'DIF', country: 'Francia', initialValue: 17, ownerId: null, purchaseCost: null },

  // Midfielders (CEN)
  { id: 's-30', name: 'Kevin De Bruyne', role: 'CEN', country: 'Belgio', initialValue: 28, ownerId: null, purchaseCost: null },
  { id: 's-31', name: 'Jude Bellingham', role: 'CEN', country: 'Inghilterra', initialValue: 30, ownerId: null, purchaseCost: null },
  { id: 's-32', name: 'Bruno Fernandes', role: 'CEN', country: 'Portogallo', initialValue: 24, ownerId: null, purchaseCost: null },
  { id: 's-33', name: 'Luka Modrić', role: 'CEN', country: 'Croazia', initialValue: 15, ownerId: null, purchaseCost: null },
  { id: 's-34', name: 'Federico Valverde', role: 'CEN', country: 'Uruguay', initialValue: 22, ownerId: null, purchaseCost: null },
  { id: 's-35', name: 'Pedri González', role: 'CEN', country: 'Spagna', initialValue: 20, ownerId: null, purchaseCost: null },
  { id: 's-36', name: 'Jamal Musiala', role: 'CEN', country: 'Germania', initialValue: 26, ownerId: null, purchaseCost: null },
  { id: 's-37', name: 'Declan Rice', role: 'CEN', country: 'Inghilterra', initialValue: 18, ownerId: null, purchaseCost: null },
  { id: 's-38', name: 'Rodri Hernández', role: 'CEN', country: 'Spagna', initialValue: 22, ownerId: null, purchaseCost: null },
  { id: 's-39', name: 'Bernardo Silva', role: 'CEN', country: 'Portogallo', initialValue: 22, ownerId: null, purchaseCost: null },
  { id: 's-40', name: 'Florian Wirtz', role: 'CEN', country: 'Germania', initialValue: 26, ownerId: null, purchaseCost: null },
  { id: 's-41', name: 'Nicolò Barella', role: 'CEN', country: 'Italia', initialValue: 21, ownerId: null, purchaseCost: null },
  { id: 's-42', name: 'Hakan Çalhanoğlu', role: 'CEN', country: 'Turchia', initialValue: 20, ownerId: null, purchaseCost: null },
  { id: 's-43', name: 'Alexis Mac Allister', role: 'CEN', country: 'Argentina', initialValue: 18, ownerId: null, purchaseCost: null },

  // Attackers (ATT)
  { id: 's-50', name: 'Lionel Messi', role: 'ATT', country: 'Argentina', initialValue: 35, ownerId: null, purchaseCost: null },
  { id: 's-51', name: 'Kylian Mbappé', role: 'ATT', country: 'Francia', initialValue: 45, ownerId: null, purchaseCost: null },
  { id: 's-52', name: 'Erling Haaland', role: 'ATT', country: 'Norvegia', initialValue: 42, ownerId: null, purchaseCost: null },
  { id: 's-53', name: 'Harry Kane', role: 'ATT', country: 'Inghilterra', initialValue: 38, ownerId: null, purchaseCost: null },
  { id: 's-54', name: 'Vinícius Júnior', role: 'ATT', country: 'Brasile', initialValue: 38, ownerId: null, purchaseCost: null },
  { id: 's-55', name: 'Bukayo Saka', role: 'ATT', country: 'Inghilterra', initialValue: 30, ownerId: null, purchaseCost: null },
  { id: 's-56', name: 'Lautaro Martínez', role: 'ATT', country: 'Argentina', initialValue: 32, ownerId: null, purchaseCost: null },
  { id: 's-57', name: 'Robert Lewandowski', role: 'ATT', country: 'Polonia', initialValue: 26, ownerId: null, purchaseCost: null },
  { id: 's-58', name: 'Antoine Griezmann', role: 'ATT', country: 'Francia', initialValue: 25, ownerId: null, purchaseCost: null },
  { id: 's-59', name: 'Rafael Leão', role: 'ATT', country: 'Portogallo', initialValue: 28, ownerId: null, purchaseCost: null },
  { id: 's-60', name: 'Neymar Júnior', role: 'ATT', country: 'Brasile', initialValue: 22, ownerId: null, purchaseCost: null },
  { id: 's-61', name: 'Mohamed Salah', role: 'ATT', country: 'Egitto', initialValue: 32, ownerId: null, purchaseCost: null },
  { id: 's-62', name: 'Phil Foden', role: 'ATT', country: 'Inghilterra', initialValue: 32, ownerId: null, purchaseCost: null },
  { id: 's-63', name: 'Heung-min Son', role: 'ATT', country: 'Corea del Sud', initialValue: 24, ownerId: null, purchaseCost: null },
  { id: 's-64', name: 'Victor Osimhen', role: 'ATT', country: 'Nigeria', initialValue: 34, ownerId: null, purchaseCost: null },
  { id: 's-65', name: 'Julián Álvarez', role: 'ATT', country: 'Argentina', initialValue: 25, ownerId: null, purchaseCost: null }
];

// --- APP STATE ---
let state = {
  settings: {
    budget: 500,
    slots: {
      POR: 3,
      DIF: 8,
      CEN: 8,
      ATT: 6
    }
  },
  teams: [
    { id: 't-1', name: 'Dream Team', budget: 500, players: [], module: '4-3-3' },
    { id: 't-2', name: 'F.C. Fantasmi', budget: 500, players: [], module: '4-3-3' },
    { id: 't-3', name: 'Galacticos', budget: 500, players: [], module: '4-3-3' },
    { id: 't-4', name: 'Real Madrink', budget: 500, players: [], module: '4-3-3' }
  ],
  players: JSON.parse(JSON.stringify(SEED_PLAYERS)), // Clone seed data
  activeTab: 'giocatori', // default tab is players list
  activeTeamId: 't-1', // Selected team for quick assignments
  activePitchTeamId: null, // Stores ID of the team visualized on the pitch
  draggedPlayerId: null, // Stores ID of the player being dragged
  filters: {
    search: '',
    role: 'all',
    status: 'free' // 'all', 'free', 'taken'
  }
};

// --- DOM ELEMENTS CACHE & SELECTORS ---
const dom = {
  // Configuration Inputs
  configBudget: null,
  configSlotPOR: null,
  configSlotDIF: null,
  configSlotCEN: null,
  configSlotATT: null,
  teamListInput: null,
  btnSaveConfig: null,

  // File Controls
  fileDatabaseInput: null,
  fileSessionInput: null,
  btnExportSession: null,
  btnResetAll: null,

  // Tabs buttons and contents
  tabButtons: [],
  tabContents: [],

  // Active Team Cockpit Elements
  activeTeamSelector: null,
  consoleTeamCredits: null,
  consoleTeamMaxBid: null,
  consoleSlotPOR: null,
  consoleSlotDIF: null,
  consoleSlotCEN: null,
  consoleSlotATT: null,
  consoleRosterTitle: null,
  consoleTeamRoster: null,

  // Player Database list
  searchInput: null,
  roleFilterSelect: null,
  statusFilterSelect: null,
  playersTableBody: null,
  playersCount: null,

  // Team summary Dashboard
  teamsDashboard: null,

  // Pitch preview visualizer dialog controls
  pitchModuleSelect: null,
  pitchVisualizerContainer: null,
  pitchBenchContainer: null,

  // Notifications
  toast: null
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  loadAutoSave(); // Attempt to load previous state from localStorage
  setupEventListeners();
  renderAll();
});

function initDOM() {
  dom.configBudget = document.getElementById('config-budget');
  dom.configSlotPOR = document.getElementById('config-slot-por');
  dom.configSlotDIF = document.getElementById('config-slot-dif');
  dom.configSlotCEN = document.getElementById('config-slot-cen');
  dom.configSlotATT = document.getElementById('config-slot-att');
  dom.teamListInput = document.getElementById('config-team-names');
  dom.btnSaveConfig = document.getElementById('btn-save-config');

  dom.fileDatabaseInput = document.getElementById('file-import-players');
  dom.fileSessionInput = document.getElementById('file-import-session');
  dom.btnExportSession = document.getElementById('btn-export-session');
  dom.btnResetAll = document.getElementById('btn-reset-all');

  dom.tabButtons = Array.from(document.querySelectorAll('.tab-btn'));
  dom.tabContents = Array.from(document.querySelectorAll('.tab-content'));

  dom.activeTeamSelector = document.getElementById('active-team-selector');
  dom.consoleTeamCredits = document.getElementById('console-team-credits');
  dom.consoleTeamMaxBid = document.getElementById('console-team-max-bid');
  dom.consoleSlotPOR = document.getElementById('console-slot-por');
  dom.consoleSlotDIF = document.getElementById('console-slot-dif');
  dom.consoleSlotCEN = document.getElementById('console-slot-cen');
  dom.consoleSlotATT = document.getElementById('console-slot-att');
  dom.consoleRosterTitle = document.getElementById('console-roster-title');
  dom.consoleTeamRoster = document.getElementById('console-team-roster');

  dom.searchInput = document.getElementById('search-player');
  dom.roleFilterSelect = document.getElementById('filter-role');
  dom.statusFilterSelect = document.getElementById('filter-status');
  dom.playersTableBody = document.getElementById('players-table-body');
  dom.playersCount = document.getElementById('players-count');

  dom.teamsDashboard = document.getElementById('teams-dashboard-grid');

  dom.pitchModuleSelect = document.getElementById('pitch-module-select');
  dom.pitchVisualizerContainer = document.getElementById('pitch-visualizer-container');
  dom.pitchBenchContainer = document.getElementById('pitch-bench-container');
  
  dom.toast = document.getElementById('toast-notification');

  // Fill config elements from state
  dom.configBudget.value = state.settings.budget;
  dom.configSlotPOR.value = state.settings.slots.POR;
  dom.configSlotDIF.value = state.settings.slots.DIF;
  dom.configSlotCEN.value = state.settings.slots.CEN;
  dom.configSlotATT.value = state.settings.slots.ATT;
  dom.teamListInput.value = state.teams.map(t => t.name).join('\n');
}

function setupEventListeners() {
  // Tabs Toggle
  dom.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Settings Save
  dom.btnSaveConfig.addEventListener('click', saveConfig);

  // Active Team Selector Change
  if (dom.activeTeamSelector) {
    dom.activeTeamSelector.addEventListener('change', (e) => {
      state.activeTeamId = e.target.value;
      renderActiveTeamConsole();
      renderPlayerList();
    });
  }

  // File Imports / Exports
  dom.fileDatabaseInput.addEventListener('change', handlePlayerDatabaseImport);
  dom.fileSessionInput.addEventListener('change', handleSessionImport);
  dom.btnExportSession.addEventListener('click', exportSession);
  dom.btnResetAll.addEventListener('click', resetSession);

  // Filters & Search
  dom.searchInput.addEventListener('input', (e) => {
    state.filters.search = e.target.value.toLowerCase();
    renderPlayerList();
  });
  dom.roleFilterSelect.addEventListener('change', (e) => {
    state.filters.role = e.target.value;
    renderPlayerList();
  });
  dom.statusFilterSelect.addEventListener('change', (e) => {
    state.filters.status = e.target.value;
    renderPlayerList();
  });

  // Pitch formation module change listener
  dom.pitchModuleSelect.addEventListener('change', handlePitchModuleChange);

  // Light dismiss fallback for modal dialogs (custom dialogs in HTML)
  document.querySelectorAll('dialog[closedby="any"]').forEach(dialog => {
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (isDialogContent) return;
        dialog.close();
      });
    }
  });
}

// --- STATE ACTIONS ---

function switchTab(tabId) {
  state.activeTab = tabId;
  dom.tabButtons.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  dom.tabContents.forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabId}`);
  });
}

function saveConfig() {
  const newBudget = parseInt(dom.configBudget.value) || 500;
  const newSlotPOR = parseInt(dom.configSlotPOR.value) || 3;
  const newSlotDIF = parseInt(dom.configSlotDIF.value) || 8;
  const newSlotCEN = parseInt(dom.configSlotCEN.value) || 8;
  const newSlotATT = parseInt(dom.configSlotATT.value) || 6;

  const rawTeamNames = dom.teamListInput.value.split('\n').map(name => name.trim()).filter(Boolean);

  if (rawTeamNames.length === 0) {
    showToast('Inserisci almeno il nome di una squadra!', 'danger');
    return;
  }

  // Update Settings
  state.settings.budget = newBudget;
  state.settings.slots.POR = newSlotPOR;
  state.settings.slots.DIF = newSlotDIF;
  state.settings.slots.CEN = newSlotCEN;
  state.settings.slots.ATT = newSlotATT;

  // Process Teams
  const newTeams = [];
  rawTeamNames.forEach((name, index) => {
    const existing = state.teams.find(t => t.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.budget = newBudget - existing.players.reduce((sum, p) => sum + (p.purchaseCost || 0), 0);
      newTeams.push(existing);
    } else {
      newTeams.push({
        id: `t-${Date.now()}-${index}`,
        name: name,
        budget: newBudget,
        players: [],
        module: '4-3-3' // default module
      });
    }
  });

  state.teams = newTeams;

  // Update activeTeamId
  if (state.teams.length > 0) {
    const exists = state.teams.some(t => t.id === state.activeTeamId);
    if (!exists) {
      state.activeTeamId = state.teams[0].id;
    }
  } else {
    state.activeTeamId = null;
  }

  autoSave();
  renderAll();
  showToast('Impostazioni e rose salvate con successo!', 'success');
}

// --- CSV PARSING & DATA HANDLING ---

function handlePlayerDatabaseImport(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    const content = evt.target.result;
    try {
      const parsedPlayers = parseCSV(content);
      if (parsedPlayers.length === 0) {
        showToast('Nessun giocatore valido trovato nel file CSV.', 'danger');
        return;
      }
      state.players = parsedPlayers;
      autoSave();
      renderAll();
      showToast(`Caricati con successo ${parsedPlayers.length} giocatori!`, 'success');
      switchTab('giocatori');
    } catch (err) {
      console.error(err);
      showToast('Errore durante la decodifica del CSV. Verifica la formattazione.', 'danger');
    }
  };
  reader.readAsText(file);
}

function parseCSV(text) {
  let delimiter = ',';
  const commaCount = (text.match(/,/g) || []).length;
  const semicolonCount = (text.match(/;/g) || []).length;
  const tabCount = (text.match(/\t/g) || []).length;

  if (semicolonCount > commaCount) delimiter = ';';
  if (tabCount > semicolonCount && tabCount > commaCount) delimiter = '\t';

  const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const parseRow = (rowText) => {
    const cells = [];
    let insideQuote = false;
    let currentCell = '';
    
    for (let i = 0; i < rowText.length; i++) {
      const char = rowText[i];
      if (char === '"' || char === "'") {
        insideQuote = !insideQuote;
      } else if (char === delimiter && !insideQuote) {
        cells.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }
    cells.push(currentCell.trim());
    return cells;
  };

  const headers = parseRow(lines[0]).map(h => h.toLowerCase().replace(/['"“”]/g, ''));
  
  let nameIdx = headers.findIndex(h => h.includes('nome') || h.includes('player') || h.includes('giocatore') || h === 'name');
  let roleIdx = headers.findIndex(h => h.includes('ruolo') || h.includes('pos') || h === 'role');
  let countryIdx = headers.findIndex(h => h.includes('squadra') || h.includes('club') || h.includes('nazionale') || h.includes('nazione') || h === 'country');
  let valueIdx = headers.findIndex(h => h.includes('quotazione') || h.includes('valore') || h.includes('costo') || h.includes('prezzo') || h === 'value');

  if (nameIdx === -1) nameIdx = 0;
  if (roleIdx === -1) roleIdx = 1;
  if (countryIdx === -1) countryIdx = 2;
  if (valueIdx === -1) valueIdx = 3;

  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = parseRow(lines[i]);
    if (cells.length <= Math.max(nameIdx, roleIdx)) continue;

    const rawRole = (cells[roleIdx] || '').trim().toLowerCase();
    const mappedRole = mapRole(rawRole);
    const initialValue = parseInt(cells[valueIdx]) || 1;

    result.push({
      id: `c-${Date.now()}-${i}`,
      name: cells[nameIdx] || 'Sconosciuto',
      role: mappedRole,
      country: cells[countryIdx] || 'N/A',
      initialValue: initialValue,
      ownerId: null,
      purchaseCost: null
    });
  }

  return result;
}

function mapRole(raw) {
  if (!raw) return 'CEN';
  if (raw.includes('p') || raw.includes('gk') || raw.includes('port')) return 'POR';
  if (raw.includes('d') || raw.includes('df') || raw.includes('dif')) return 'DIF';
  if (raw.includes('c') || raw.includes('mf') || raw.includes('cen') || raw.includes('mid')) return 'CEN';
  if (raw.includes('a') || raw.includes('fw') || raw.includes('att') || raw.includes('st') || raw.includes('pun')) return 'ATT';
  return 'CEN';
}

// --- FILE I/O AND SESSIONS ---

function handleSessionImport(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const imported = JSON.parse(evt.target.result);
      if (!imported.players || !imported.teams || !imported.settings) {
        showToast('Il file caricato non sembra un salvataggio di FantaMondiale.', 'danger');
        return;
      }
      state.settings = imported.settings;
      state.teams = imported.teams;
      state.teams.forEach(t => {
        if (!t.module) t.module = '4-3-3';
      });
      state.players = imported.players;
      
      dom.configBudget.value = state.settings.budget;
      dom.configSlotPOR.value = state.settings.slots.POR;
      dom.configSlotDIF.value = state.settings.slots.DIF;
      dom.configSlotCEN.value = state.settings.slots.CEN;
      dom.configSlotATT.value = state.settings.slots.ATT;
      dom.teamListInput.value = state.teams.map(t => t.name).join('\n');

      if (state.teams.length > 0) {
        state.activeTeamId = state.teams[0].id;
      } else {
        state.activeTeamId = null;
      }

      autoSave();
      renderAll();
      showToast('Sessione ripristinata con successo!', 'success');
      switchTab('giocatori');
    } catch (err) {
      console.error(err);
      showToast('Impossibile decodificare il file di sessione.', 'danger');
    }
  };
  reader.readAsText(file);
}

function exportSession() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  
  const date = new Date().toISOString().slice(0, 10);
  downloadAnchor.setAttribute("download", `fantamondiale_session_${date}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Sessione salvata e scaricata sul computer!', 'success');
}

function resetSession() {
  if (!confirm('Sei sicuro di voler azzerare l\'asta attuale? Perderai tutti i giocatori assegnati e il budget speso.')) {
    return;
  }
  
  state.players.forEach(p => {
    p.ownerId = null;
    p.purchaseCost = null;
  });
  
  state.teams.forEach(t => {
    t.budget = state.settings.budget;
    t.players = [];
  });

  autoSave();
  renderAll();
  showToast('Asta resettata completamente.', 'warning');
}

// --- LOCAL STORAGE AUTOSAVE ---

function autoSave() {
  try {
    localStorage.setItem('fantamondiale_state', JSON.stringify({
      settings: state.settings,
      teams: state.teams,
      players: state.players
    }));
  } catch (e) {
    console.error('Failed to autosave', e);
  }
}

function loadAutoSave() {
  try {
    const saved = localStorage.getItem('fantamondiale_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      state.settings = parsed.settings;
      state.teams = parsed.teams;
      state.teams.forEach(t => {
        if (!t.module) t.module = '4-3-3';
      });
      state.players = parsed.players;
      
      dom.configBudget.value = state.settings.budget;
      dom.configSlotPOR.value = state.settings.slots.POR;
      dom.configSlotDIF.value = state.settings.slots.DIF;
      dom.configSlotCEN.value = state.settings.slots.CEN;
      dom.configSlotATT.value = state.settings.slots.ATT;
      dom.teamListInput.value = state.teams.map(t => t.name).join('\n');
      
      if (state.teams.length > 0) {
        state.activeTeamId = state.teams[0].id;
      } else {
        state.activeTeamId = null;
      }
      
      showToast('Ripristinata ultima sessione dall\'autosave locale.', 'success');
    }
  } catch (e) {
    console.error('Failed to load autosave', e);
  }
}

// --- DIRECT INLINE ASSIGNMENT ENGINE ---

function assignPlayerDirect(playerId) {
  const p = state.players.find(x => x.id === playerId);
  if (!p) return;

  const costEl = document.getElementById(`cost-input-${playerId}`);
  if (!costEl) return;

  const cost = parseInt(costEl.value);
  const teamId = state.activeTeamId;

  if (!teamId) {
    showToast('Seleziona una squadra attiva nel pannello laterale per poter effettuare l\'acquisto!', 'warning');
    return;
  }

  if (isNaN(cost) || cost < 1) {
    showToast('Il costo d\'acquisto deve essere di almeno 1 credito!', 'warning');
    return;
  }

  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;

  const maxBid = calculateMaxBid(team);
  if (cost > maxBid) {
    showToast(`Offerta di ${cost} crediti non consentita per ${team.name}. Budget massimo consentito: ${maxBid} crediti.`, 'danger');
    return;
  }

  if (!hasRoleSlotAvailable(team, p.role)) {
    showToast(`${team.name} non ha più slot liberi per il ruolo ${p.role}!`, 'danger');
    return;
  }

  p.ownerId = team.id;
  p.purchaseCost = cost;

  team.players.push(p);
  team.budget -= cost;

  autoSave();
  renderAll();
  showToast(`${p.name} è stato assegnato a ${team.name} per ${cost} crediti!`, 'success');
}

function releasePlayer(playerId) {
  const player = state.players.find(p => p.id === playerId);
  if (!player || !player.ownerId) return;

  const team = state.teams.find(t => t.id === player.ownerId);
  if (!team) return;

  if (!confirm(`Vuoi davvero svincolare ${player.name} da ${team.name}? I crediti spesi (${player.purchaseCost}) verranno restituiti.`)) {
    return;
  }

  team.budget += player.purchaseCost;
  team.players = team.players.filter(p => p.id !== playerId);

  player.ownerId = null;
  player.purchaseCost = null;

  autoSave();
  renderAll();
  showToast(`${player.name} svincolato da ${team.name}. Crediti rimborsati!`, 'warning');
}

// --- FORMULAS & MATHS (REAL-WORLD ROSTER RULES) ---

function calculateMaxBid(team) {
  const emptySlots = countEmptySlots(team);
  if (emptySlots <= 0) return 0;
  return team.budget - (emptySlots - 1);
}

function countEmptySlots(team) {
  let count = 0;
  const porSlots = state.settings.slots.POR - team.players.filter(p => p.role === 'POR').length;
  const difSlots = state.settings.slots.DIF - team.players.filter(p => p.role === 'DIF').length;
  const cenSlots = state.settings.slots.CEN - team.players.filter(p => p.role === 'CEN').length;
  const attSlots = state.settings.slots.ATT - team.players.filter(p => p.role === 'ATT').length;
  
  count += Math.max(0, porSlots);
  count += Math.max(0, difSlots);
  count += Math.max(0, cenSlots);
  count += Math.max(0, attSlots);
  
  return count;
}

function hasRoleSlotAvailable(team, role) {
  const filled = team.players.filter(p => p.role === role).length;
  const allowed = state.settings.slots[role] || 0;
  return filled < allowed;
}

// --- UI RENDERING WORKFLOW ---

function renderAll() {
  renderActiveTeamConsole();
  renderPlayerList();
  renderTeamDashboard();
}

function renderActiveTeamConsole() {
  if (!dom.activeTeamSelector) return;

  // Build options
  if (state.teams.length > 0) {
    const exists = state.teams.some(t => t.id === state.activeTeamId);
    if (!exists) {
      state.activeTeamId = state.teams[0].id;
    }
    
    dom.activeTeamSelector.innerHTML = state.teams.map(t => 
      `<option value="${t.id}" ${t.id === state.activeTeamId ? 'selected' : ''}>${t.name}</option>`
    ).join('');
  } else {
    state.activeTeamId = null;
    dom.activeTeamSelector.innerHTML = '<option value="">-- Nessuna Squadra --</option>';
  }

  const team = state.teams.find(t => t.id === state.activeTeamId);

  if (!team) {
    if (dom.consoleTeamCredits) dom.consoleTeamCredits.textContent = '0';
    if (dom.consoleTeamMaxBid) dom.consoleTeamMaxBid.textContent = '0';
    if (dom.consoleSlotPOR) dom.consoleSlotPOR.textContent = '0';
    if (dom.consoleSlotDIF) dom.consoleSlotDIF.textContent = '0';
    if (dom.consoleSlotCEN) dom.consoleSlotCEN.textContent = '0';
    if (dom.consoleSlotATT) dom.consoleSlotATT.textContent = '0';
    if (dom.consoleRosterTitle) dom.consoleRosterTitle.textContent = 'Rosa Attuale (0 giocatori)';
    if (dom.consoleTeamRoster) {
      dom.consoleTeamRoster.innerHTML = '<div style="color: var(--color-text-muted); font-style: italic; padding: 0.5rem 0; font-size: 0.75rem;">Nessuna squadra attiva</div>';
    }
    return;
  }

  // Display financial stats
  const maxBid = calculateMaxBid(team);
  if (dom.consoleTeamCredits) dom.consoleTeamCredits.textContent = team.budget;
  if (dom.consoleTeamMaxBid) dom.consoleTeamMaxBid.textContent = `${maxBid} cr`;

  // Display remaining role slots limits
  const filledPOR = team.players.filter(p => p.role === 'POR').length;
  const filledDIF = team.players.filter(p => p.role === 'DIF').length;
  const filledCEN = team.players.filter(p => p.role === 'CEN').length;
  const filledATT = team.players.filter(p => p.role === 'ATT').length;

  const leftPOR = Math.max(0, state.settings.slots.POR - filledPOR);
  const leftDIF = Math.max(0, state.settings.slots.DIF - filledDIF);
  const leftCEN = Math.max(0, state.settings.slots.CEN - filledCEN);
  const leftATT = Math.max(0, state.settings.slots.ATT - filledATT);

  if (dom.consoleSlotPOR) dom.consoleSlotPOR.textContent = leftPOR;
  if (dom.consoleSlotDIF) dom.consoleSlotDIF.textContent = leftDIF;
  if (dom.consoleSlotCEN) dom.consoleSlotCEN.textContent = leftCEN;
  if (dom.consoleSlotATT) dom.consoleSlotATT.textContent = leftATT;

  // Color background based on slot availability
  const colorBox = (boxEl, slotsLeft) => {
    if (!boxEl) return;
    if (slotsLeft === 0) {
      boxEl.style.background = 'rgba(239, 68, 68, 0.1)';
      boxEl.style.borderColor = 'rgba(239, 68, 68, 0.35)';
    } else {
      boxEl.style.background = 'rgba(255, 255, 255, 0.02)';
      boxEl.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    }
  };

  colorBox(document.getElementById('console-slot-por')?.parentElement, leftPOR);
  colorBox(document.getElementById('console-slot-dif')?.parentElement, leftDIF);
  colorBox(document.getElementById('console-slot-cen')?.parentElement, leftCEN);
  colorBox(document.getElementById('console-slot-att')?.parentElement, leftATT);

  // Roster Title
  if (dom.consoleRosterTitle) {
    dom.consoleRosterTitle.textContent = `Rosa Attuale (${team.players.length} giocatori)`;
  }

  // Populate mini roster
  if (dom.consoleTeamRoster) {
    dom.consoleTeamRoster.innerHTML = '';
    if (team.players.length === 0) {
      dom.consoleTeamRoster.innerHTML = '<div style="color: var(--color-text-muted); font-style: italic; padding: 0.5rem 0; font-size: 0.75rem;">Rosa ancora vuota...</div>';
    } else {
      const rolePriority = { POR: 0, DIF: 1, CEN: 2, ATT: 3 };
      const sortedPlayers = [...team.players].sort((a, b) => rolePriority[a.role] - rolePriority[b.role] || a.name.localeCompare(b.name));
      
      sortedPlayers.forEach(p => {
        const item = document.createElement('div');
        item.className = 'mini-player-item';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.style.padding = '0.35rem 0.5rem';
        item.style.background = 'rgba(255, 255, 255, 0.03)';
        item.style.borderRadius = '6px';
        item.style.marginBottom = '0.25rem';

        item.innerHTML = `
          <div class="mini-player-name" style="font-size: 0.75rem; display: flex; align-items: center; gap: 0.35rem;">
            <span style="display:inline-block; width: 6px; height: 6px; border-radius:50%; background: var(--color-${p.role.toLowerCase()})"></span>
            <span style="color: #fff; font-weight: 500;">${p.name} <span style="color: var(--color-text-muted); font-size: 0.65rem;">(${p.country})</span></span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="mini-player-cost" style="font-weight: 700; color: var(--color-primary); font-size: 0.75rem;">${p.purchaseCost} cr</span>
            <button class="btn btn-danger" style="padding: 0.1rem 0.35rem; font-size: 0.65rem; border-radius: 4px; line-height: 1;" onclick="releasePlayer('${p.id}')">
              ✕
            </button>
          </div>
        `;
        dom.consoleTeamRoster.appendChild(item);
      });
    }
  }
}

function renderPlayerList() {
  const tbody = dom.playersTableBody;
  if (!tbody) return;
  tbody.innerHTML = '';

  const q = state.filters.search;
  const role = state.filters.role;
  const status = state.filters.status;

  const filtered = state.players.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q);
    const matchesRole = role === 'all' || p.role === role;
    const isTaken = p.ownerId !== null;
    const matchesStatus = 
      status === 'all' ||
      (status === 'free' && !isTaken) ||
      (status === 'taken' && isTaken);

    return matchesSearch && matchesRole && matchesStatus;
  });

  if (dom.playersCount) {
    dom.playersCount.textContent = `${filtered.length} giocatori trovati`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center" style="padding: 2.5rem; color: var(--color-text-muted);">
          Nessun giocatore corrisponde ai filtri impostati.
        </td>
      </tr>
    `;
    return;
  }

  const activeTeam = state.teams.find(t => t.id === state.activeTeamId);

  filtered.forEach(p => {
    const tr = document.createElement('tr');
    if (p.ownerId) tr.classList.add('taken');

    let costCellHtml = '';
    let actionCellHtml = '';

    if (p.ownerId) {
      const ownerTeam = state.teams.find(t => t.id === p.ownerId);
      const teamName = ownerTeam ? ownerTeam.name : 'N/A';
      
      costCellHtml = `<span style="font-weight: 700; color: #fff;">${p.purchaseCost} cr</span>`;
      actionCellHtml = `
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem;">
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">Acquistato da</span>
          <span style="font-weight: 700; color: var(--color-primary);">${teamName}</span>
          <button class="btn btn-danger" style="padding: 0.35rem 0.65rem; font-size: 0.75rem;" onclick="releasePlayer('${p.id}')">
            Svincola
          </button>
        </div>
      `;
    } else {
      costCellHtml = `
        <input type="number" id="cost-input-${p.id}" class="table-input" min="1" value="${p.initialValue}" style="text-align: center;">
      `;

      let isEligible = false;
      let buttonLabel = 'Acquista';
      let disableAttr = '';

      if (activeTeam) {
        const maxBid = calculateMaxBid(activeTeam);
        const hasSlots = countEmptySlots(activeTeam) > 0;
        const hasRoleOpen = hasRoleSlotAvailable(activeTeam, p.role);
        isEligible = hasSlots && hasRoleOpen && maxBid >= 1;
        
        buttonLabel = `Acquista per ${activeTeam.name}`;
        if (!isEligible) {
          disableAttr = 'disabled';
          if (!hasSlots) buttonLabel = 'Rosa Completa';
          else if (!hasRoleOpen) buttonLabel = `No slot ${p.role}`;
          else if (maxBid < 1) buttonLabel = 'Crediti Insufficienti';
        }
      } else {
        disableAttr = 'disabled';
        buttonLabel = 'Seleziona Squadra';
      }

      actionCellHtml = `
        <button class="btn btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.75rem; background: var(--color-success);" ${disableAttr} onclick="assignPlayerDirect('${p.id}')">
          ${buttonLabel}
        </button>
      `;
    }

    tr.innerHTML = `
      <td style="font-weight: 700;">${p.name}</td>
      <td><span class="badge badge-${p.role.toLowerCase()}">${p.role}</span></td>
      <td>${p.country}</td>
      <td style="font-weight: 600; text-align: center;">${p.initialValue} cr</td>
      <td style="text-align: center;">${costCellHtml}</td>
      <td style="text-align: right;">${actionCellHtml}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderTeamDashboard() {
  const container = dom.teamsDashboard;
  container.innerHTML = '';

  if (state.teams.length === 0) {
    container.innerHTML = `
      <div class="panel text-center" style="grid-column: 1 / -1; padding: 3rem;">
        <h3>Nessuna squadra configurata</h3>
        <p class="mt-4" style="color: var(--color-text-muted);">Configura le squadre e il budget nella barra laterale sinistra.</p>
      </div>
    `;
    return;
  }

  state.teams.forEach(t => {
    const card = document.createElement('div');
    card.className = 'panel team-card';

    const por = t.players.filter(p => p.role === 'POR').length;
    const dif = t.players.filter(p => p.role === 'DIF').length;
    const cen = t.players.filter(p => p.role === 'CEN').length;
    const att = t.players.filter(p => p.role === 'ATT').length;
    const totalCount = t.players.length;

    const maxBid = calculateMaxBid(t);
    const emptySlots = countEmptySlots(t);
    const isRosterFull = emptySlots === 0;

    let rosterHtml = '';
    if (t.players.length === 0) {
      rosterHtml = '<div style="color: var(--color-text-muted); font-style: italic; padding: 0.5rem 0;">Rosa ancora vuota...</div>';
    } else {
      const rolePriority = { POR: 0, DIF: 1, CEN: 2, ATT: 3 };
      const sortedPlayers = [...t.players].sort((a, b) => rolePriority[a.role] - rolePriority[b.role] || a.name.localeCompare(b.name));
      
      sortedPlayers.forEach(p => {
        rosterHtml += `
          <div class="mini-player-item">
            <span class="mini-player-name">
              <span style="display:inline-block; width: 6px; height: 6px; border-radius:50%; background: var(--color-${p.role.toLowerCase()}); margin-right: 0.35rem;"></span>
              ${p.name} <span style="color: var(--color-text-muted); font-size: 0.7rem;">(${p.country})</span>
            </span>
            <span class="mini-player-cost" style="font-weight: 700; color: #fff;">${p.purchaseCost} cr</span>
          </div>
        `;
      });
    }

    card.innerHTML = `
      <div class="team-card-header">
        <h3 class="team-name">${t.name}</h3>
        <div class="team-credits">${t.budget} <span>cr</span></div>
      </div>
      
      <div class="team-max-bid-banner" style="background: ${isRosterFull ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.12)'}; border-color: ${isRosterFull ? 'rgba(239, 68, 68, 0.25)' : 'rgba(99, 102, 241, 0.25)'};">
        ${isRosterFull ? '<span style="color: var(--color-danger)">ROSA COMPLETA</span>' : `Offerta Massima: <span>${maxBid} cr</span>`}
      </div>

      <div class="team-roles-progress">
        <div class="role-bar-container">
          <div class="role-bar-label">POR</div>
          <div class="role-bar-value" style="color: var(--color-por)">${por}/${state.settings.slots.POR}</div>
        </div>
        <div class="role-bar-container">
          <div class="role-bar-label">DIF</div>
          <div class="role-bar-value" style="color: var(--color-dif)">${dif}/${state.settings.slots.DIF}</div>
        </div>
        <div class="role-bar-container">
          <div class="role-bar-label">CEN</div>
          <div class="role-bar-value" style="color: var(--color-cen)">${cen}/${state.settings.slots.CEN}</div>
        </div>
        <div class="role-bar-container">
          <div class="role-bar-label">ATT</div>
          <div class="role-bar-value" style="color: var(--color-att)">${att}/${state.settings.slots.ATT}</div>
        </div>
      </div>

      <div class="team-players-mini">
        <div style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 0.25rem;">Roster (${totalCount} giocatori)</div>
        ${rosterHtml}
      </div>
      <button class="btn btn-accent" style="width: 100%; margin-top: 0.75rem; font-size: 0.75rem; padding: 0.4rem 0.8rem;" onclick="showTeamPitch('${t.id}')">Visualizza Campo ⚽</button>
    `;

    container.appendChild(card);
  });
}

// --- DRAG AND DROP TACTICAL SWAP ENGINE ---

function handleDragStart(e) {
  const playerId = e.currentTarget.getAttribute('data-player-id');
  state.draggedPlayerId = playerId;
  e.dataTransfer.setData('text/plain', playerId);
  e.dataTransfer.effectAllowed = 'move';
  e.currentTarget.classList.add('dragging');
}

function handleDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  state.draggedPlayerId = null;
  
  // Clean all drag-over classes
  document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');

  const draggedId = e.dataTransfer.getData('text/plain') || state.draggedPlayerId;
  const targetId = e.currentTarget.getAttribute('data-player-id');

  if (!draggedId || !targetId || draggedId === targetId) return;

  const team = state.teams.find(t => t.id === state.activePitchTeamId);
  if (!team) return;

  const p1 = team.players.find(p => p.id === draggedId);
  const p2 = team.players.find(p => p.id === targetId);

  if (!p1 || !p2) return;

  // Validation: Roles must match perfectly
  if (p1.role !== p2.role) {
    showToast(`Errore: puoi scambiare solo calciatori dello stesso ruolo (${p1.role}) per rispettare il modulo!`, 'danger');
    return;
  }

  // Swap indices in the team's player roster array
  const idx1 = team.players.indexOf(p1);
  const idx2 = team.players.indexOf(p2);

  if (idx1 !== -1 && idx2 !== -1) {
    team.players[idx1] = p2;
    team.players[idx2] = p1;
    
    showToast(`Scambio completato: ${p1.name} ⇆ ${p2.name}!`, 'success');
    
    autoSave();
    renderPitch();
    renderTeamDashboard();
  }
}

function handlePlaceholderDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');

  const draggedId = e.dataTransfer.getData('text/plain') || state.draggedPlayerId;
  const targetRole = e.currentTarget.getAttribute('data-role');

  if (!draggedId || !targetRole) return;

  const team = state.teams.find(t => t.id === state.activePitchTeamId);
  if (!team) return;

  const player = team.players.find(p => p.id === draggedId);
  if (!player) return;

  // Validation: Roles must match perfectly
  if (player.role !== targetRole) {
    showToast(`Errore: puoi inserire solo un calciatore del ruolo ${targetRole}!`, 'danger');
    return;
  }

  // Move the player to the front of this role's players to make them starter
  team.players = team.players.filter(x => x.id !== player.id);
  
  const firstRoleIdx = team.players.findIndex(x => x.role === player.role);
  if (firstRoleIdx !== -1) {
    team.players.splice(firstRoleIdx, 0, player);
  } else {
    team.players.push(player);
  }

  showToast(`${player.name} inserito nei titolari!`, 'success');
  
  autoSave();
  renderPitch();
  renderTeamDashboard();
}

// --- PITCH PREVIEW VISUALIZER WITH DYNAMIC MODULE FLEX ROWS ---

function renderPitch() {
  const teamId = state.activePitchTeamId;
  const team = state.teams.find(t => t.id === teamId);
  const pitchContainer = dom.pitchVisualizerContainer;
  const benchContainer = dom.pitchBenchContainer;
  
  if (!team || !pitchContainer || !benchContainer) return;

  const module = team.module || '4-3-3';
  const parts = module.split('-').map(x => parseInt(x));
  
  const defNeeded = parts[0] || 4;
  const cenNeeded = parts[1] || 3;
  const attNeeded = parts[2] || 3;
  const porNeeded = 1;

  // Separate all team players by role
  const porPlayers = team.players.filter(p => p.role === 'POR');
  const difPlayers = team.players.filter(p => p.role === 'DIF');
  const cenPlayers = team.players.filter(p => p.role === 'CEN');
  const attPlayers = team.players.filter(p => p.role === 'ATT');

  // Slices: Starters (Titolari) and Bench (Panchina)
  const porStarters = porPlayers.slice(0, porNeeded);
  const porBench = porPlayers.slice(porNeeded);

  const difStarters = difPlayers.slice(0, defNeeded);
  const difBench = difPlayers.slice(defNeeded);

  const cenStarters = cenPlayers.slice(0, cenNeeded);
  const cenBench = cenPlayers.slice(cenNeeded);

  const attStarters = attPlayers.slice(0, attNeeded);
  const attBench = attPlayers.slice(attNeeded);

  const benchList = [...porBench, ...difBench, ...cenBench, ...attBench];

  // Draw Football field lines vertically
  pitchContainer.innerHTML = `
    <div class="pitch-container" style="position: relative; width: 100%; height: 380px;">
      <div class="pitch-line pitch-midline"></div>
      <div class="pitch-line pitch-penalty-bottom"></div>
      <div class="pitch-line pitch-penalty-top"></div>
      <div class="pitch-line pitch-goal-bottom"></div>
      <div class="pitch-line pitch-goal-top"></div>
      <div class="pitch-center-circle"></div>
      
      <!-- Flex layout grid overlay to dynamic rows sizing -->
      <div class="pitch-grid-overlay">
        <!-- Row 4: Attackers -->
        <div id="row-att" class="pitch-grid-row"></div>
        <!-- Row 3: Midfielders -->
        <div id="row-cen" class="pitch-grid-row"></div>
        <!-- Row 2: Defenders -->
        <div id="row-dif" class="pitch-grid-row"></div>
        <!-- Row 1: Goalkeeper -->
        <div id="row-por" class="pitch-grid-row"></div>
      </div>
    </div>
  `;

  // Draw starting row elements programmatically
  const populateRow = (starters, neededCount, roleName, rowId) => {
    const rowElement = document.getElementById(rowId);
    if (!rowElement) return;

    for (let i = 0; i < neededCount; i++) {
      if (i < starters.length) {
        // Render Active Draggable Player card
        const player = starters[i];
        const node = document.createElement('div');
        node.className = 'pitch-player-node';
        node.setAttribute('draggable', 'true');
        node.setAttribute('data-player-id', player.id);
        node.setAttribute('data-tooltip', `${player.name} (${player.purchaseCost} cr)`);

        node.innerHTML = `
          <div class="pitch-player-shirt" style="background: var(--color-${player.role.toLowerCase()})">
            ${player.purchaseCost}
          </div>
          <div class="pitch-player-name">${player.name.split(' ').pop()}</div>
        `;

        // Wire drag and drop events
        node.addEventListener('dragstart', handleDragStart);
        node.addEventListener('dragend', handleDragEnd);
        node.addEventListener('dragover', handleDragOver);
        node.addEventListener('dragleave', handleDragLeave);
        node.addEventListener('drop', handleDrop);

        rowElement.appendChild(node);
      } else {
        // Render dotted placeholder drop target slot
        const node = document.createElement('div');
        node.className = 'pitch-placeholder-node';
        node.setAttribute('data-role', roleName);
        node.innerHTML = `+ ${roleName}`;

        // Wire drop target drag events
        node.addEventListener('dragover', handleDragOver);
        node.addEventListener('dragleave', handleDragLeave);
        node.addEventListener('drop', handlePlaceholderDrop);

        rowElement.appendChild(node);
      }
    }
  };

  // Populate Flex Rows
  populateRow(porStarters, porNeeded, 'POR', 'row-por');
  populateRow(difStarters, defNeeded, 'DIF', 'row-dif');
  populateRow(cenStarters, cenNeeded, 'CEN', 'row-cen');
  populateRow(attStarters, attNeeded, 'ATT', 'row-att');

  // 3. Render Bench listing programmatically with Drag events
  benchContainer.innerHTML = '';
  if (benchList.length === 0) {
    benchContainer.innerHTML = `<span style="color: var(--color-text-muted); font-size: 0.75rem; font-style: italic;">Panchina vuota... Tutti i giocatori rientrano nei titolari.</span>`;
  } else {
    benchList.forEach(p => {
      const el = document.createElement('div');
      el.className = 'bench-player-node';
      el.setAttribute('draggable', 'true');
      el.setAttribute('data-player-id', p.id);
      el.innerHTML = `
        <span class="dot" style="background: var(--color-${p.role.toLowerCase()})"></span>
        <span>${p.name} (${p.role}) - <strong>${p.purchaseCost} cr</strong></span>
      `;

      el.addEventListener('dragstart', handleDragStart);
      el.addEventListener('dragend', handleDragEnd);
      el.addEventListener('dragover', handleDragOver);
      el.addEventListener('dragleave', handleDragLeave);
      el.addEventListener('drop', handleDrop);

      benchContainer.appendChild(el);
    });
  }
}

function showTeamPitch(teamId) {
  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;

  state.activePitchTeamId = teamId;
  dom.pitchModuleSelect.value = team.module || '4-3-3';
  
  renderPitch();
  document.getElementById('pitch-dialog').showModal();
}

function handlePitchModuleChange(e) {
  const teamId = state.activePitchTeamId;
  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;

  team.module = e.target.value;
  autoSave();
  renderPitch();
  renderTeamDashboard();
}

// --- TOAST NOTIFICATIONS ---

function showToast(message, type = 'success') {
  if (!dom.toast) return;

  dom.toast.className = `toast toast-${type} show`;
  
  let iconHtml = '';
  if (type === 'success') {
    iconHtml = '<svg style="width: 20px; height: 20px; stroke: var(--color-success)" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
  } else if (type === 'danger') {
    iconHtml = '<svg style="width: 20px; height: 20px; stroke: var(--color-danger)" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
  } else if (type === 'warning') {
    iconHtml = '<svg style="width: 20px; height: 20px; stroke: var(--color-warning)" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>';
  } else {
    iconHtml = '<svg style="width: 20px; height: 20px; stroke: var(--color-primary)" fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
  }

  dom.toast.innerHTML = `
    ${iconHtml}
    <span>${message}</span>
  `;

  setTimeout(() => {
    dom.toast.classList.remove('show');
  }, 4000);
}

// Window globals to wire up inline HTML onclick actions
window.assignPlayerDirect = assignPlayerDirect;
window.releasePlayer = releasePlayer;
window.showTeamPitch = showTeamPitch;
