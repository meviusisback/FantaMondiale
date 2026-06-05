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
    budget: 300,
    slots: {
      POR: 3,
      DIF: 8,
      CEN: 8,
      ATT: 6
    },
    aiProvider: 'google',
    openRouterModel: 'openai/gpt-oss-120b:free',
    geminiModel: 'gemini-flash-lite-latest'
  },
  teams: [
    { id: 't-1', name: 'Dream Team', budget: 300, players: [], module: '4-3-3', isUserTeam: false },
    { id: 't-2', name: 'F.C. Fantasmi', budget: 300, players: [], module: '4-3-3', isUserTeam: false },
    { id: 't-3', name: 'Galacticos', budget: 300, players: [], module: '4-3-3', isUserTeam: false },
    { id: 't-4', name: 'Real Madrink', budget: 300, players: [], module: '4-3-3', isUserTeam: false }
  ],
  players: JSON.parse(JSON.stringify(SEED_PLAYERS)), // Clone seed data
  activeTab: 'giocatori', // default tab is players list
  activeTeamId: 't-1', // Selected team for quick assignments
  activeCloudSessionId: null, // Track currently loaded cloud session ID
  cloudSessionPassword: null, // Keep active session password in memory
  activePitchTeamId: null, // Stores ID of the team visualized on the pitch
  pitchShowIdeal: false, // Flag to sort starting line-up by AI Form score
  draggedPlayerId: null, // Stores ID of the player being dragged
  filters: {
    search: '',
    role: 'all',
    status: 'free' // 'all', 'free', 'taken'
  },
  aiCache: {},
  teamIdealLineups: {},
  isAdmin: false,
  activeCloudSessionMetadata: null,
  eliminatedCountries: ['Italia', 'Egitto', 'Nigeria'],
  tournament: null,
  tournamentTab: 'gironi',
  activeRound: 'G1'
};

// --- DOM ELEMENTS CACHE & SELECTORS ---
const dom = {
  // Configuration Inputs
  configBudget: null,
  configSlotPOR: null,
  configSlotDIF: null,
  configSlotCEN: null,
  configSlotATT: null,
  configAIProvider: null,
  configOpenRouterModel: null,
  teamListInput: null,
  btnSaveConfig: null,

  // File Controls
  fileDatabaseInput: null,
  fileSessionInput: null,
  btnExportSession: null,
  btnResetAll: null,
  btnAdminLoginToggle: null,

  // Cloud Storage Controls
  btnCloudSave: null,
  btnCloudLoad: null,
  btnCloudLogout: null,
  btnCloudNewSession: null,

  // Cloud Persistence Dialog Elements
  cloudSaveDialog: null,
  cloudSaveMode: null,
  cloudSaveTitle: null,
  cloudSaveAuthor: null,
  cloudSaveDate: null,
  cloudSavePassword: null,
  cloudSavePasswordLabel: null,
  btnCloudSaveConfirm: null,
  btnActionsMenu: null,
  cloudLoadDropdownWrapper: null,
  cloudLoadDropdownList: null,
  btnManageCloudSessions: null,
  cloudLoadDialog: null,
  cloudLoadListContainer: null,
  btnTeamAIAnalysis: null,
  btnTeamIdealPitch: null,

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
  toast: null,
  checkboxUserTeam: null,
  btnSimGroups: null,
  btnSimAll: null,
  btnSimAI: null,
  btnResetTournament: null,
  subtabGroups: null,
  subtabBracket: null
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  loadAutoSave(); // Local storage state loading is disabled as requested by user
  setupEventListeners();

  // Initialize admin state
  if (localStorage.getItem('fantamondiale_is_admin') === 'true') {
    state.isAdmin = true;
    if (dom.btnManageCloudSessions) dom.btnManageCloudSessions.style.display = 'block';
  } else {
    state.isAdmin = false;
    if (dom.btnManageCloudSessions) dom.btnManageCloudSessions.style.display = 'none';
  }

  // Initialize dynamic eliminated countries list from server JSON
  fetch('/api/eliminated-countries.json')
    .then(res => res.json())
    .then(data => {
      if (data && Array.isArray(data.eliminatedCountries)) {
        state.eliminatedCountries = data.eliminatedCountries;
        renderAll();
      }
    })
    .catch(err => console.log('Could not fetch eliminated countries, using defaults.'));

  initializeTournament();
  renderAll();

  // Open the startup onboarding cloud dialog modal
  openStartupDialog();
});

function isCountryEliminated(countryName) {
  if (!countryName || !state.eliminatedCountries) return false;
  
  const clean = countryName.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, '');
  
  const normalizedEliminated = state.eliminatedCountries.map(c => 
    c.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, '')
  );
  
  if (normalizedEliminated.includes(clean)) return true;
  
  const translationMap = {
    'egypt': 'egitto',
    'italy': 'italia',
    'nigeria': 'nigeria',
    'sweden': 'svezia',
    'norway': 'norvegia',
    'belgium': 'belgio',
    'france': 'francia',
    'spain': 'spagna',
    'england': 'inghilterra',
    'germany': 'germania',
    'netherlands': 'paesi bassi',
    'morocco': 'marocco',
    'turkey': 'turchia',
    'poland': 'polonia',
    'croatia': 'croazia',
    'switzerland': 'svizzera',
    'czech republic': 'repubblica ceca'
  };
  
  const mapped = translationMap[clean];
  if (mapped && normalizedEliminated.includes(mapped)) {
    return true;
  }
  
  for (const elim of normalizedEliminated) {
    if (clean.includes(elim) || elim.includes(clean)) {
      return true;
    }
  }
  
  return false;
}

window.isCountryEliminated = isCountryEliminated;

function getPlayerPriorityScore(player) {
  if (!player) return 0;
  
  // 1. Rank Score: 151 - rank (if rank <= 150), else 0
  const rank = findTopPlayerRank(player);
  const rankScore = rank <= 150 ? (151 - rank) : 0;
  
  // 2. Individual player performance rating (6.0 to 9.5)
  const playerRating = getPlayerPerformanceRating(player);
  
  // 3. National team rating (70 to ~100)
  let countryItalian = player.country;
  const translationMap = {
    'egypt': 'Egitto', 'italy': 'Italia', 'nigeria': 'Nigeria', 'sweden': 'Svezia',
    'norway': 'Norvegia', 'belgium': 'Belgio', 'france': 'Francia', 'spain': 'Spagna',
    'england': 'Inghilterra', 'germany': 'Germania', 'netherlands': 'Paesi Bassi',
    'morocco': 'Marocco', 'turkey': 'Turchia', 'poland': 'Polonia', 'croatia': 'Croazia',
    'switzerland': 'Svizzera', 'czech republic': 'Rep. Ceca', 'colombia': 'Colombia',
    'uruguay': 'Uruguay', 'canada': 'Canada', 'austria': 'Austria', 'hungary': 'Ungheria',
    'brazil': 'Brasile', 'portugal': 'Portogallo', 'argentina': 'Argentina',
    'south korea': 'Corea del Sud', 'saudi arabia': 'Arabia Saudita',
    'usa': 'USA', 'united states': 'USA', 'czech': 'Rep. Ceca'
  };
  const cleanLower = (player.country || '').trim().toLowerCase();
  if (translationMap[cleanLower]) {
    countryItalian = translationMap[cleanLower];
  }
  const teamRating = getTeamRating(countryItalian);
  
  // Weighted formula:
  // - Individual Player Performance is very important (6.0 to 9.5) -> scaled to 0-60
  // - National Team Rating is important (70 to 100) -> scaled to 0-40
  // - If the player is in the TOP 150 list, we give a boost: rankScore / 151 * 30 (up to +30 points)
  const normPlayer = ((playerRating - 6.0) / 3.5) * 60; // Up to 60 points
  const normTeam = ((teamRating - 70) / 30) * 40;     // Up to 40 points
  const rankBoost = (rankScore / 151) * 30;           // Up to 30 points boost
  
  return normPlayer + normTeam + rankBoost;
}

window.getPlayerPriorityScore = getPlayerPriorityScore;

function initDOM() {
  dom.configBudget = document.getElementById('config-budget');
  dom.configSlotPOR = document.getElementById('config-slot-por');
  dom.configSlotDIF = document.getElementById('config-slot-dif');
  dom.configSlotCEN = document.getElementById('config-slot-cen');
  dom.configSlotATT = document.getElementById('config-slot-att');
  dom.teamListInput = document.getElementById('config-team-names');
  dom.btnSaveConfig = document.getElementById('btn-save-config');
  dom.configAIProvider = document.getElementById('config-ai-provider');
  dom.configOpenRouterModel = document.getElementById('config-openrouter-model');
  dom.configGeminiModel = document.getElementById('config-gemini-model');

  dom.fileDatabaseInput = document.getElementById('file-import-players');
  dom.fileSessionInput = document.getElementById('file-import-session');
  dom.btnExportSession = document.getElementById('btn-export-session');
  dom.btnResetAll = document.getElementById('btn-reset-all');
  dom.btnAdminLoginToggle = document.getElementById('btn-admin-login-toggle');

  dom.btnCloudSave = document.getElementById('btn-cloud-save');
  dom.btnCloudLoad = document.getElementById('btn-cloud-load');
  dom.btnCloudLogout = document.getElementById('btn-cloud-logout');
  dom.btnCloudNewSession = document.getElementById('btn-cloud-new-session');

  // Cloud Persistence Dialog Cache
  dom.cloudSaveDialog = document.getElementById('cloud-save-dialog');
  dom.cloudSaveMode = document.getElementById('cloud-save-mode');
  dom.cloudSaveTitle = document.getElementById('cloud-save-title');
  dom.cloudSaveAuthor = document.getElementById('cloud-save-author');
  dom.cloudSaveDate = document.getElementById('cloud-save-date');
  dom.cloudSavePassword = document.getElementById('cloud-save-password');
  dom.cloudSavePasswordLabel = document.getElementById('cloud-save-password-label');
  dom.btnCloudSaveConfirm = document.getElementById('btn-cloud-save-confirm');
  dom.btnActionsMenu = document.getElementById('btn-actions-menu');
  dom.cloudLoadDropdownWrapper = document.getElementById('actions-dropdown-wrapper');
  dom.cloudLoadDropdownList = document.getElementById('cloud-load-dropdown-list');
  dom.btnManageCloudSessions = document.getElementById('btn-manage-cloud-sessions');
  dom.cloudLoadDialog = document.getElementById('cloud-load-dialog');
  dom.cloudLoadListContainer = document.getElementById('cloud-load-list-container');
  dom.btnTeamAIAnalysis = document.getElementById('btn-team-ai-analysis');
  dom.btnTeamIdealPitch = document.getElementById('btn-team-ideal-pitch');

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
  dom.checkboxUserTeam = document.getElementById('checkbox-user-team');

  dom.btnSimGroups = document.getElementById('btn-sim-groups');
  dom.btnSimAll = document.getElementById('btn-sim-all');
  dom.btnSimAI = document.getElementById('btn-sim-ai');
  dom.btnResetTournament = document.getElementById('btn-reset-tournament');
  dom.subtabGroups = document.getElementById('subtab-groups');
  dom.subtabBracket = document.getElementById('subtab-bracket');

  // Fill config elements from state
  dom.configBudget.value = state.settings.budget;
  if (dom.configSlotPOR) dom.configSlotPOR.value = state.settings.slots.POR;
  if (dom.configSlotDIF) dom.configSlotDIF.value = state.settings.slots.DIF;
  if (dom.configSlotCEN) dom.configSlotCEN.value = state.settings.slots.CEN;
  if (dom.configSlotATT) dom.configSlotATT.value = state.settings.slots.ATT;
  dom.teamListInput.value = state.teams.map(t => t.name).join('\n');

  // Fill AI settings from state
  if (dom.configAIProvider) dom.configAIProvider.value = state.settings.aiProvider || 'google';
  if (dom.configOpenRouterModel) dom.configOpenRouterModel.value = state.settings.openRouterModel || 'openai/gpt-oss-120b:free';
  if (dom.configGeminiModel) dom.configGeminiModel.value = state.settings.geminiModel || 'gemini-flash-lite-latest';
  
  // Apply dynamic show/hide style
  const isOR = (state.settings.aiProvider || 'google') === 'openrouter';
  const divORModel = document.getElementById('div-openrouter-model');
  if (divORModel) divORModel.style.display = isOR ? 'block' : 'none';
  const divGeminiModel = document.getElementById('div-gemini-model');
  if (divGeminiModel) divGeminiModel.style.display = isOR ? 'none' : 'block';

  // R32 custom pairings editor elements
  dom.r32EditorDialog = document.getElementById('r32-editor-dialog');
  dom.r32EditorGrid = document.getElementById('r32-editor-grid');
  dom.btnR32ResetCalc = document.getElementById('btn-r32-reset-calc');
  dom.btnR32SaveCustom = document.getElementById('btn-r32-save-custom');
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

  // AI Provider Change Listener
  if (dom.configAIProvider) {
    dom.configAIProvider.addEventListener('change', (e) => {
      const isOR = e.target.value === 'openrouter';
      const divORModel = document.getElementById('div-openrouter-model');
      if (divORModel) divORModel.style.display = isOR ? 'block' : 'none';
      const divGeminiModel = document.getElementById('div-gemini-model');
      if (divGeminiModel) divGeminiModel.style.display = isOR ? 'none' : 'block';
    });
  }

  // Active Team Selector Change
  if (dom.activeTeamSelector) {
    dom.activeTeamSelector.addEventListener('change', (e) => {
      state.activeTeamId = e.target.value;
      renderActiveTeamConsole();
      renderPlayerList();
    });
  }

  // Checkbox Mia Squadra Change Listener
  if (dom.checkboxUserTeam) {
    dom.checkboxUserTeam.addEventListener('change', (e) => {
      const activeId = state.activeTeamId;
      if (!activeId) return;

      const isChecked = e.target.checked;
      state.teams.forEach(t => {
        if (t.id === activeId) {
          t.isUserTeam = isChecked;
        } else if (isChecked) {
          t.isUserTeam = false;
        }
      });

      autoSave();
      renderAll();
      showToast(isChecked ? 'Squadra impostata come propria! ⭐' : 'Squadra rimossa dalle proprie squadre.', 'success');
    });
  }

  // File Imports / Exports
  dom.fileDatabaseInput.addEventListener('change', handlePlayerDatabaseImport);
  dom.fileSessionInput.addEventListener('change', handleSessionImport);
  
  dom.btnExportSession.addEventListener('click', (e) => {
    e.preventDefault();
    exportSession();
  });
  
  dom.btnResetAll.addEventListener('click', (e) => {
    e.preventDefault();
    if (dom.cloudLoadDropdownWrapper) dom.cloudLoadDropdownWrapper.classList.remove('open');
    resetSession();
  });

  if (dom.btnAdminLoginToggle) {
    dom.btnAdminLoginToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (dom.cloudLoadDropdownWrapper) dom.cloudLoadDropdownWrapper.classList.remove('open');
      if (state.isAdmin) {
        if (confirm('Sei sicuro di voler uscire dalla modalità amministratore? Le impostazioni AI torneranno in sola lettura.')) {
          state.isAdmin = false;
          localStorage.removeItem('fantamondiale_is_admin');
          if (dom.btnManageCloudSessions) dom.btnManageCloudSessions.style.display = 'none';
          showToast('Modalità amministratore disattivata! 🔒', 'warning');
          renderAll();
        }
      } else {
        loginAsAdmin();
      }
    });
  }

  // Cloud Persistence Sync Event Listeners
  if (dom.btnCloudSave) dom.btnCloudSave.addEventListener('click', (e) => {
    e.preventDefault();
    if (dom.cloudLoadDropdownWrapper) dom.cloudLoadDropdownWrapper.classList.remove('open');
    openCloudSaveModal();
  });

  if (dom.btnCloudNewSession) {
    dom.btnCloudNewSession.addEventListener('click', (e) => {
      e.preventDefault();
      if (dom.cloudLoadDropdownWrapper) dom.cloudLoadDropdownWrapper.classList.remove('open');
      if (confirm('Sei sicuro di voler creare una nuova sessione? Tutti i dati correnti non salvati andranno persi.')) {
        openNewSessionFromStartup();
      }
    });
  }

  if (dom.btnCloudLogout) dom.btnCloudLogout.addEventListener('click', (e) => {
    e.preventDefault();
    if (dom.cloudLoadDropdownWrapper) dom.cloudLoadDropdownWrapper.classList.remove('open');
    logoutCloudSession();
  });
  
  if (dom.btnCloudSaveConfirm) dom.btnCloudSaveConfirm.addEventListener('click', confirmCloudSave);
  
  if (dom.cloudSaveDialog) {
    dom.cloudSaveDialog.addEventListener('close', () => {
      if (!state.activeCloudSessionId) {
        openStartupDialog();
      }
    });
  }
  
  // Toggle Actions Dropdown on Click/Tap (for mobile support and persistent click triggers)
  if (dom.btnActionsMenu) {
    dom.btnActionsMenu.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (dom.cloudLoadDropdownWrapper) {
        const isOpen = dom.cloudLoadDropdownWrapper.classList.toggle('open');
        if (isOpen) {
          handleCloudDropdownHover();
        }
      }
    });
  }

  // Close Actions Dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (dom.cloudLoadDropdownWrapper && !dom.cloudLoadDropdownWrapper.contains(e.target)) {
      dom.cloudLoadDropdownWrapper.classList.remove('open');
    }
  });

  // AI Active Team Analysis click handler
  if (dom.btnTeamAIAnalysis) {
    dom.btnTeamAIAnalysis.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      showTeamAIAnalysis(dom.btnTeamAIAnalysis);
    });
  }

  if (dom.btnTeamIdealPitch) {
    dom.btnTeamIdealPitch.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const team = state.teams.find(t => t.id === state.activeTeamId);
      if (!team) {
        showToast('Seleziona una squadra attiva nel pannello laterale per poter visualizzare la formazione ideale!', 'warning');
        return;
      }
      showTeamPitch(team.id, true);
    });
  }

  // Hover Dropdown Trigger (mouseenter on unified menu triggers real-time load sub-list)
  if (dom.cloudLoadDropdownWrapper) {
    dom.cloudLoadDropdownWrapper.addEventListener('mouseenter', handleCloudDropdownHover);
  }

  // Manage Sessions link
  if (dom.btnManageCloudSessions) {
    dom.btnManageCloudSessions.addEventListener('click', (e) => {
      e.preventDefault();
      if (dom.cloudLoadDropdownWrapper) dom.cloudLoadDropdownWrapper.classList.remove('open');
      openCloudLoadModal();
    });
  }

  // Change listener on save dropdown mode to prefill title/author/date on overwrite selection
  if (dom.cloudSaveMode) {
    dom.cloudSaveMode.addEventListener('change', handleSaveModeChange);
  }

  // Prevent escape key dismissal on the onboarding dialog modal
  const startupDlg = document.getElementById('startup-cloud-dialog');
  if (startupDlg) {
    startupDlg.addEventListener('cancel', (e) => {
      e.preventDefault();
    });
    startupDlg.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
      }
    });
  }

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

  // Tournament simulator event listeners
  if (dom.btnSimGroups) dom.btnSimGroups.addEventListener('click', simulateGroups);
  if (dom.btnSimAll) dom.btnSimAll.addEventListener('click', simulateEntireTournament);
  if (dom.btnSimAI) dom.btnSimAI.addEventListener('click', simulateAiPrediction);
  if (dom.btnResetTournament) dom.btnResetTournament.addEventListener('click', resetTournament);

  if (dom.subtabGroups) {
    dom.subtabGroups.addEventListener('click', () => {
      state.tournamentTab = 'gironi';
      renderTournament();
    });
  }

  if (dom.subtabBracket) {
    dom.subtabBracket.addEventListener('click', () => {
      state.tournamentTab = 'tabellone';
      renderTournament();
    });
  }

  // R32 custom pairings actions
  if (dom.btnR32ResetCalc) dom.btnR32ResetCalc.addEventListener('click', resetR32CustomPairings);
  if (dom.btnR32SaveCustom) dom.btnR32SaveCustom.addEventListener('click', saveR32CustomPairings);

  // Global click listener to close split button menus when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.split-btn-dropdown.open').forEach(el => {
      el.classList.remove('open');
    });
  });

  initWizardEvents();
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

  const gridContainer = document.querySelector('.dashboard-grid');
  if (gridContainer) {
    gridContainer.classList.toggle('hide-sidebar', tabId === 'tabellone' || tabId === 'impostazioni');
  }

  if (tabId === 'tabellone') {
    renderTournament();
  }
}

function saveConfig() {
  const newBudget = parseInt(dom.configBudget.value) || 300;
  const newSlotPOR = dom.configSlotPOR ? (parseInt(dom.configSlotPOR.value) || 3) : 3;
  const newSlotDIF = dom.configSlotDIF ? (parseInt(dom.configSlotDIF.value) || 8) : 8;
  const newSlotCEN = dom.configSlotCEN ? (parseInt(dom.configSlotCEN.value) || 8) : 8;
  const newSlotATT = dom.configSlotATT ? (parseInt(dom.configSlotATT.value) || 6) : 6;
  const newAIProvider = dom.configAIProvider ? dom.configAIProvider.value : 'google';
  const newOpenRouterModel = dom.configOpenRouterModel ? dom.configOpenRouterModel.value.trim() : 'openai/gpt-oss-120b:free';
  const newGeminiModel = dom.configGeminiModel ? dom.configGeminiModel.value.trim() : 'gemini-flash-lite-latest';

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
  state.settings.aiProvider = newAIProvider;
  state.settings.openRouterModel = newOpenRouterModel;
  state.settings.geminiModel = newGeminiModel;

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
      initializeTournament(true);
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
      if (dom.configSlotPOR) dom.configSlotPOR.value = state.settings.slots.POR;
      if (dom.configSlotDIF) dom.configSlotDIF.value = state.settings.slots.DIF;
      if (dom.configSlotCEN) dom.configSlotCEN.value = state.settings.slots.CEN;
      if (dom.configSlotATT) dom.configSlotATT.value = state.settings.slots.ATT;
      dom.teamListInput.value = state.teams.map(t => t.name).join('\n');

      // Restore AI settings
      if (dom.configAIProvider) dom.configAIProvider.value = state.settings.aiProvider || 'google';
      if (dom.configOpenRouterModel) dom.configOpenRouterModel.value = state.settings.openRouterModel || 'openai/gpt-oss-120b:free';
      if (dom.configGeminiModel) dom.configGeminiModel.value = state.settings.geminiModel || 'gemini-flash-lite-latest';
      const isOR = (state.settings.aiProvider || 'google') === 'openrouter';
      const divORModel = document.getElementById('div-openrouter-model');
      if (divORModel) divORModel.style.display = isOR ? 'block' : 'none';
      const divGeminiModel = document.getElementById('div-gemini-model');
      if (divGeminiModel) divGeminiModel.style.display = isOR ? 'none' : 'block';

      if (state.teams.length > 0) {
        state.activeTeamId = state.teams[0].id;
      } else {
        state.activeTeamId = null;
      }

      state.tournament = imported.tournament || null;
      
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
    t.budget = state.settings.budget || 300;
    t.players = [];
    t.module = '4-3-3';
  });

  state.teamIdealLineups = {};
  initializeTournament(true);

  autoSave();
  renderAll();
  showToast('Asta resettata completamente.', 'warning');
}

// --- CLOUD AUTOSAVE ENGINE ---

let cloudSaveTimeout = null;

function autoSave() {
  try {
    if (state.activeCloudSessionId) {
      // Clear any pending cloud autosave timeout
      if (cloudSaveTimeout) {
        clearTimeout(cloudSaveTimeout);
      }

      // Debounce cloud save by 1 second to optimize network usage and avoid race conditions
      cloudSaveTimeout = setTimeout(() => {
        const metadata = state.activeCloudSessionMetadata || {
          id: state.activeCloudSessionId,
          title: "Sessione Attiva",
          author: localStorage.getItem('fantamondiale_last_author') || "FantaIA",
          date: new Date().toISOString().substring(0, 10)
        };

        fetch('/api/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            metadata: metadata,
            password: state.cloudSessionPassword || '',
            state: {
              settings: state.settings,
              teams: state.teams,
              players: state.players,
              teamIdealLineups: state.teamIdealLineups || {},
              tournament: state.tournament || null
            }
          })
        })
        .then(res => {
          if (res.ok) {
            console.log('Background cloud autosave complete.');
          } else {
            console.warn('Background cloud autosave failed with status:', res.status);
          }
        })
        .catch(err => {
          console.error('Background cloud autosave failed:', err);
        });
      }, 1000);

    } else {
      // Local storage offline save disabled as requested by user
    }
  } catch (e) {
    console.error('Failed to autosave', e);
  }
}

function loadAutoSave() {
  // Local storage state loading disabled as requested by user
}

async function autoLoadCloudSession(id) {
  try {
    showToast('Caricamento dell\'ultima sessione cloud... ☁️', 'info');
    const cachedPassword = localStorage.getItem('fantamondiale_last_cloud_session_password') || '';
    
    // 1. Fetch sessions catalog first to retrieve correct metadata
    const catRes = await fetch('/api/load');
    if (catRes.ok) {
      cloudSessionsCatalog = await catRes.json();
      const meta = cloudSessionsCatalog.find(s => s.id === id);
      if (meta) {
        state.activeCloudSessionMetadata = meta;
      }
    }

    // 2. Fetch actual session state
    const response = await fetch(`/api/load?id=${id}&password=${encodeURIComponent(cachedPassword)}`);
    const result = await response.json();

    if (!response.ok) {
      localStorage.removeItem('fantamondiale_last_cloud_session_id');
      localStorage.removeItem('fantamondiale_last_cloud_session_password');
      throw new Error(result.error || 'Errore durante il caricamento automatico.');
    }

    // Load state
    state.settings = result.settings;
    state.teams = result.teams;
    state.teams.forEach(t => {
      if (!t.module) t.module = '4-3-3';
    });
    state.players = result.players;
    state.teamIdealLineups = result.teamIdealLineups || {};
    state.tournament = result.tournament || null;
    state.activeCloudSessionId = id;
    state.cloudSessionPassword = cachedPassword;

    if (!state.activeCloudSessionMetadata) {
      state.activeCloudSessionMetadata = {
        id: id,
        title: "Sessione Autocaricata",
        author: localStorage.getItem('fantamondiale_last_author') || "FantaIA",
        date: new Date().toISOString().substring(0, 10)
      };
    }

    // Fill config inputs in settings tab
    dom.configBudget.value = state.settings.budget;
    if (dom.configSlotPOR) dom.configSlotPOR.value = state.settings.slots.POR;
    if (dom.configSlotDIF) dom.configSlotDIF.value = state.settings.slots.DIF;
    if (dom.configSlotCEN) dom.configSlotCEN.value = state.settings.slots.CEN;
    if (dom.configSlotATT) dom.configSlotATT.value = state.settings.slots.ATT;
    dom.teamListInput.value = state.teams.map(t => t.name).join('\n');

    // Restore AI settings
    if (dom.configAIProvider) dom.configAIProvider.value = state.settings.aiProvider || 'google';
    if (dom.configOpenRouterModel) dom.configOpenRouterModel.value = state.settings.openRouterModel || 'openai/gpt-oss-120b:free';
    if (dom.configGeminiModel) dom.configGeminiModel.value = state.settings.geminiModel || 'gemini-flash-lite-latest';
    const isOR = (state.settings.aiProvider || 'google') === 'openrouter';
    const divORModel = document.getElementById('div-openrouter-model');
    if (divORModel) divORModel.style.display = isOR ? 'block' : 'none';
    const divGeminiModel = document.getElementById('div-gemini-model');
    if (divGeminiModel) divGeminiModel.style.display = isOR ? 'none' : 'block';

    if (state.teams.length > 0) {
      state.activeTeamId = state.teams[0].id;
    } else {
      state.activeTeamId = null;
    }

    renderAll();
    showToast(`Sessione cloud "${state.activeCloudSessionMetadata.title}" caricata automaticamente! ☁️`, 'success');
  } catch (error) {
    console.error('Failed to autoload cloud session:', error);
    showToast('Impossibile caricare la sessione cloud. Verrà avviata una sessione pulita.', 'warning');
  }
}

async function openStartupDialog() {
  const startupDlg = document.getElementById('startup-cloud-dialog');
  const sessionsListContainer = document.getElementById('startup-sessions-list');
  if (!startupDlg) return;

  // Render loading placeholder in list
  if (sessionsListContainer) {
    sessionsListContainer.innerHTML = `
      <div style="text-align: center; padding: 1.5rem; color: var(--color-text-muted); font-size: 0.75rem; font-style: italic;">
        Caricamento elenco sessioni... ☁️
      </div>
    `;
  }

  // Show startup modal
  startupDlg.showModal();

  try {
    const response = await fetch('/api/load');
    if (!response.ok) throw new Error('Failed to load session catalog');

    const sessions = await response.json();
    cloudSessionsCatalog = sessions; // Sync catalog cache

    if (sessionsListContainer) {
      if (!Array.isArray(sessions) || sessions.length === 0) {
        sessionsListContainer.innerHTML = `
          <div style="text-align: center; padding: 1.5rem; color: var(--color-text-muted); font-size: 0.75rem; font-style: italic;">
            Nessuna sessione salvata nel cloud. Creane una nuova!
          </div>
        `;
        return;
      }

      let itemsHtml = '';
      sessions.forEach(s => {
        itemsHtml += `
          <div class="dropdown-item-session" style="padding: 0.65rem; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer;" onclick="loadStartupCloudSession('${s.id}')">
            <div style="font-weight: 700; color: #fff; font-size: 0.78rem; margin-bottom: 0.15rem;">${s.title}</div>
            <div style="display: flex; justify-content: space-between; font-size: 0.68rem; color: var(--color-text-muted);">
              <span>Autore: <strong>${s.author}</strong></span>
              <span>${s.date}</span>
            </div>
          </div>
        `;
      });
      sessionsListContainer.innerHTML = itemsHtml;
    }
  } catch (error) {
    console.error(error);
    if (sessionsListContainer) {
      sessionsListContainer.innerHTML = `
        <div style="text-align: center; padding: 1.5rem; color: var(--color-danger); font-size: 0.75rem; font-style: italic;">
          Errore di connessione al Cloud.
        </div>
      `;
    }
  }
}

function resetSessionClean() {
  // Reset settings to default
  state.settings = {
    budget: 300,
    slots: {
      POR: 3,
      DIF: 8,
      CEN: 8,
      ATT: 6
    },
    aiProvider: 'google',
    openRouterModel: 'openai/gpt-oss-120b:free',
    geminiModel: 'gemini-flash-lite-latest'
  };

  // Reset teams to default
  state.teams = [
    { id: 't-1', name: 'Dream Team', budget: 300, players: [], module: '4-3-3', isUserTeam: true },
    { id: 't-2', name: 'F.C. Fantasmi', budget: 300, players: [], module: '4-3-3', isUserTeam: false },
    { id: 't-3', name: 'Galacticos', budget: 300, players: [], module: '4-3-3', isUserTeam: false },
    { id: 't-4', name: 'Real Madrink', budget: 300, players: [], module: '4-3-3', isUserTeam: false }
  ];

  // Restore players to default cloned from SEED_PLAYERS
  state.players = JSON.parse(JSON.stringify(SEED_PLAYERS));

  // Reset active state variables
  state.activeTab = 'giocatori';
  state.activeTeamId = 't-1';
  state.activeCloudSessionId = null;
  state.cloudSessionPassword = null;
  state.activePitchTeamId = null;
  state.pitchShowIdeal = false;
  state.draggedPlayerId = null;
  state.filters = {
    search: '',
    role: 'all',
    status: 'free'
  };
  state.aiCache = {};
  state.teamIdealLineups = {};
  state.activeCloudSessionMetadata = null;
  state.tournament = null;
  state.tournamentTab = 'gironi';
  state.activeRound = 'G1';

  // Clear last used session and password from localStorage and sessionStorage
  localStorage.removeItem('fantamondiale_last_cloud_session_id');
  localStorage.removeItem('fantamondiale_last_cloud_session_password');
  sessionStorage.clear();

  // Re-initialize tournament to default
  initializeTournament(true);

  // Trigger autosave to sync this clean state to the cloud if active
  autoSave();
}

function openNewSessionFromStartup() {
  const startupDlg = document.getElementById('startup-cloud-dialog');
  if (startupDlg) startupDlg.close();

  // Reset to a completely fresh auction session state
  resetSessionClean();
  renderAll();

  openSetupWizard('cloud');
}

function loadStartupCloudSession(id) {
  const startupDlg = document.getElementById('startup-cloud-dialog');
  if (startupDlg) startupDlg.close();
  loadSpecificCloudSession(id, true);
}

// --- DIRECT INLINE ASSIGNMENT ENGINE ---

function toggleSplitDropdown(event, playerId) {
  event.stopPropagation();
  const arrow = document.getElementById(`arrow-${playerId}`);
  const dropdown = arrow ? arrow.closest('.split-btn-dropdown') : null;
  
  // Close all other open dropdowns first
  document.querySelectorAll('.split-btn-dropdown.open').forEach(el => {
    if (el !== dropdown) {
      el.classList.remove('open');
    }
  });

  if (dropdown) {
    dropdown.classList.toggle('open');
  }
}

function setPlayerRowTargetTeam(playerId, teamId, teamName, isEligible) {
  const btn = document.getElementById(`assign-btn-${playerId}`);
  if (!btn) return;

  btn.setAttribute('data-target-team-id', teamId);
  btn.textContent = `Acquista per ${teamName}`;
  btn.disabled = !isEligible;

  // Close the dropdown menu by removing the open class
  const container = btn.closest('.split-button-container');
  if (container) {
    const dropdown = container.querySelector('.split-btn-dropdown');
    if (dropdown) {
      dropdown.classList.remove('open');
    }
  }
}

function assignPlayerDirect(playerId, targetTeamId = null) {
  const p = state.players.find(x => x.id === playerId);
  if (!p) return;

  const costEl = document.getElementById(`cost-input-${playerId}`);
  if (!costEl) return;

  const cost = parseInt(costEl.value);
  const teamId = targetTeamId || state.activeTeamId;

  if (!teamId) {
    showToast('Seleziona una squadra per poter effettuare l\'acquisto!', 'warning');
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
  showToast(`${p.name} è stato assegnato a ${team.name} per ${cost} crediti! <a href="#" onclick="undoPurchase('${p.id}'); this.closest('.toast').classList.remove('show'); return false;" style="color: #fff; font-weight: 800; margin-left: 0.75rem; text-decoration: underline;">Annulla ↩️</a>`, 'success');
}

function releasePlayer(playerId) {
  const player = state.players.find(p => p.id === playerId);
  const team = state.teams.find(t => t.players.some(p => p.id === playerId));
  
  if (!team) {
    showToast("Impossibile trovare la squadra proprietaria di questo calciatore.", "danger");
    return;
  }

  const teamPlayer = team.players.find(p => p.id === playerId);
  const cost = teamPlayer ? teamPlayer.purchaseCost : (player ? player.purchaseCost : 0);
  const name = teamPlayer ? teamPlayer.name : (player ? player.name : 'Calciatore');

  if (!confirm(`Vuoi davvero svincolare ${name} da ${team.name}? I crediti spesi (${cost}) verranno restituiti.`)) {
    return;
  }

  team.budget += cost;
  team.players = team.players.filter(p => p.id !== playerId);

  if (player) {
    player.ownerId = null;
    player.purchaseCost = null;
  }

  autoSave();
  renderAll();
  showToast(`${name} svincolato da ${team.name}. Crediti rimborsati!`, 'warning');
}

function undoPurchase(playerId) {
  const player = state.players.find(p => p.id === playerId);
  const team = state.teams.find(t => t.players.some(p => p.id === playerId));
  if (!team) return;

  const teamPlayer = team.players.find(p => p.id === playerId);
  const cost = teamPlayer ? teamPlayer.purchaseCost : (player ? player.purchaseCost : 0);
  const name = teamPlayer ? teamPlayer.name : (player ? player.name : 'Calciatore');

  team.budget += cost;
  team.players = team.players.filter(p => p.id !== playerId);

  if (player) {
    player.ownerId = null;
    player.purchaseCost = null;
  }

  const teamName = team.name;

  autoSave();
  renderAll();
  showToast(`Acquisto annullato: ${name} rimosso da ${teamName}.`, 'warning');
}

// --- FORMULAS & MATHS (REAL-WORLD ROSTER RULES) ---

const TOP_150_PLAYERS = [
  { name: "Kylian Mbappe", country: "france" },
  { name: "Erling Haaland", country: "norway" },
  { name: "Vinicius Junior", country: "brazil" },
  { name: "Jude Bellingham", country: "england" },
  { name: "Harry Kane", country: "england" },
  { name: "Lionel Messi", country: "argentina" },
  { name: "Lautaro Martinez", country: "argentina" },
  { name: "Kevin De Bruyne", country: "belgium" },
  { name: "Jamal Musiala", country: "germany" },
  { name: "Florian Wirtz", country: "germany" },
  { name: "Bukayo Saka", country: "england" },
  { name: "Phil Foden", country: "england" },
  { name: "Mohamed Salah", country: "egypt" },
  { name: "Rodrygo Silva", country: "brazil" },
  { name: "Antoine Griezmann", country: "france" },
  { name: "Rafael Leao", country: "portugal" },
  { name: "Cole Palmer", country: "england" },
  { name: "Lamine Yamal", country: "spain" },
  { name: "Victor Osimhen", country: "nigeria" },
  { name: "Emiliano Martinez", country: "argentina" },
  { name: "Alisson Becker", country: "brazil" },
  { name: "Mike Maignan", country: "france" },
  { name: "Thibaut Courtois", country: "belgium" },
  { name: "Virgil van Dijk", country: "netherlands" },
  { name: "Achraf Hakimi", country: "morocco" },
  { name: "Theo Hernandez", country: "france" },
  { name: "Rodri Hernandez", country: "spain" },
  { name: "Federico Valverde", country: "uruguay" },
  { name: "Bruno Fernandes", country: "portugal" },
  { name: "Trent Alexander-Arnold", country: "england" },
  { name: "William Saliba", country: "france" },
  { name: "Antonio Rudiger", country: "germany" },
  { name: "Ruben Dias", country: "portugal" },
  { name: "Nico Williams", country: "spain" },
  { name: "Julian Alvarez", country: "argentina" },
  { name: "Bernardo Silva", country: "portugal" },
  { name: "Alessandro Bastoni", country: "italy" },
  { name: "Josko Gvardiol", country: "croatia" },
  { name: "Gianluigi Donnarumma", country: "italy" },
  { name: "Federico Dimarco", country: "italy" },
  { name: "Pedri Gonzalez", country: "spain" },
  { name: "Nicolo Barella", country: "italy" },
  { name: "Declan Rice", country: "england" },
  { name: "Alexis Mac Allister", country: "argentina" },
  { name: "Ronald Araujo", country: "uruguay" },
  { name: "Marquinhos", country: "brazil" },
  { name: "Gabriel Martinelli", country: "brazil" },
  { name: "Luis Diaz", country: "colombia" },
  { name: "Darwin Nunez", country: "uruguay" },
  { name: "Romelu Lukaku", country: "belgium" },
  { name: "Cristiano Ronaldo", country: "portugal" },
  { name: "Robert Lewandowski", country: "poland" },
  { name: "Heung-min Son", country: "south korea" },
  { name: "Jeremie Frimpong", country: "netherlands" },
  { name: "Jules Kounde", country: "france" },
  { name: "John Stones", country: "england" },
  { name: "Hakan Calhanoglu", country: "turkey" },
  { name: "Dani Carvajal", country: "spain" },
  { name: "Diogo Costa", country: "portugal" },
  { name: "Marc-Andre ter Stegen", country: "spain" },
  { name: "Ederson Moraes", country: "brazil" },
  { name: "Unai Simon", country: "spain" },
  { name: "Jordan Pickford", country: "england" },
  { name: "Bremer Gleison", country: "brazil" },
  { name: "Gabriel Magalhaes", country: "brazil" },
  { name: "Ibrahima Konate", country: "france" },
  { name: "Dayot Upamecano", country: "france" },
  { name: "Benjamin Pavard", country: "france" },
  { name: "Kyle Walker", country: "england" },
  { name: "Kieran Trippier", country: "england" },
  { name: "Luke Shaw", country: "england" },
  { name: "Jack Grealish", country: "england" },
  { name: "Marcus Rashford", country: "england" },
  { name: "James Maddison", country: "england" },
  { name: "Jarrod Bowen", country: "england" },
  { name: "Anthony Gordon", country: "england" },
  { name: "Kobbie Mainoo", country: "england" },
  { name: "Bruno Guimaraes", country: "brazil" },
  { name: "Lucas Paqueta", country: "brazil" },
  { name: "Douglas Luiz", country: "brazil" },
  { name: "Joao Neves", country: "portugal" },
  { name: "Joao Palhinha", country: "portugal" },
  { name: "Vitinha", country: "portugal" },
  { name: "Otavio", country: "portugal" },
  { name: "Diogo Jota", country: "portugal" },
  { name: "Goncalo Ramos", country: "portugal" },
  { name: "Joao Felix", country: "portugal" },
  { name: "Gavi", country: "spain" },
  { name: "Dani Olmo", country: "spain" },
  { name: "Mikel Merino", country: "spain" },
  { name: "Martin Zubimendi", country: "spain" },
  { name: "Fabian Ruiz", country: "spain" },
  { name: "Alvaro Morata", country: "spain" },
  { name: "Mikel Oyarzabal", country: "spain" },
  { name: "Ferran Torres", country: "spain" },
  { name: "Memphis Depay", country: "netherlands" },
  { name: "Cody Gakpo", country: "netherlands" },
  { name: "Xavi Simons", country: "netherlands" },
  { name: "Donyell Malen", country: "netherlands" },
  { name: "Tijjani Reijnders", country: "netherlands" },
  { name: "Frenkie de Jong", country: "netherlands" },
  { name: "Matthijs de Ligt", country: "netherlands" },
  { name: "Nathan Ake", country: "netherlands" },
  { name: "Denzel Dumfries", country: "netherlands" },
  { name: "Lutsharel Geertruida", country: "netherlands" },
  { name: "Bart Verbruggen", country: "netherlands" },
  { name: "Mark Flekken", country: "netherlands" },
  { name: "Jan Oblak", country: "slovenia" },
  { name: "Giorgi Mamardashvili", country: "georgia" },
  { name: "Khvicha Kvaratskhelia", country: "georgia" },
  { name: "Dominik Szoboszlai", country: "hungary" },
  { name: "Patrik Schick", country: "czech republic" },
  { name: "Tomas Soucek", country: "czech republic" },
  { name: "Dusan Vlahovic", country: "serbia" },
  { name: "Aleksandar Mitrovic", country: "serbia" },
  { name: "Sergej Milinkovic-Savic", country: "serbia" },
  { name: "Filip Kostic", country: "serbia" },
  { name: "Luka Modric", country: "croatia" },
  { name: "Mateo Kovacic", country: "croatia" },
  { name: "Marcelo Brozovic", country: "croatia" },
  { name: "Ivan Perisic", country: "croatia" },
  { name: "Mario Pasalic", country: "croatia" },
  { name: "Lovro Majer", country: "croatia" },
  { name: "Andrej Kramaric", country: "croatia" },
  { name: "Josip Stanisic", country: "croatia" },
  { name: "Josip Sutalo", country: "croatia" },
  { name: "Dominik Livakovic", country: "croatia" },
  { name: "Yann Sommer", country: "switzerland" },
  { name: "Gregor Kobel", country: "switzerland" },
  { name: "Manuel Akanji", country: "switzerland" },
  { name: "Fabian Schar", country: "switzerland" },
  { name: "Ricardo Rodriguez", country: "switzerland" },
  { name: "Granit Xhaka", country: "switzerland" },
  { name: "Remo Freuler", country: "switzerland" },
  { name: "Denis Zakaria", country: "switzerland" },
  { name: "Dan Ndoye", country: "switzerland" },
  { name: "Breel Embolo", country: "switzerland" },
  { name: "Zeki Amdouni", country: "switzerland" },
  { name: "Federico Chiesa", country: "italy" },
  { name: "Gianluca Scamacca", country: "italy" },
  { name: "Mateo Retegui", country: "italy" },
  { name: "Lorenzo Pellegrini", country: "italy" },
  { name: "Davide Frattesi", country: "italy" },
  { name: "Manuel Locatelli", country: "italy" },
  { name: "Bryan Cristante", country: "italy" },
  { name: "Gianluca Mancini", country: "italy" },
  { name: "Giorgio Scalvini", country: "italy" },
  { name: "Alessandro Buongiorno", country: "italy" },
  { name: "Guglielmo Vicario", country: "italy" }
];

function findTopPlayerRank(player) {
  if (!player || !player.name) return 999;
  
  const name = player.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const country = (player.country || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  const cleanName = name.replace(/[^a-z0-9\s]/g, '');
  const cleanCountry = country.replace(/[^a-z0-9\s]/g, '');
  
  const words = cleanName.split(/\s+/).filter(w => w.length > 2);
  
  for (let i = 0; i < TOP_150_PLAYERS.length; i++) {
    const topP = TOP_150_PLAYERS[i];
    const topName = topP.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, '');
    const topCountry = topP.country.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, '');
    
    const countryMatch = cleanCountry.includes(topCountry) || topCountry.includes(cleanCountry) ||
                         (cleanCountry === 'brasile' && topCountry === 'brazil') ||
                         (cleanCountry === 'francia' && topCountry === 'france') ||
                         (cleanCountry === 'spagna' && topCountry === 'spain') ||
                         (cleanCountry === 'inghilterra' && topCountry === 'england') ||
                         (cleanCountry === 'germania' && topCountry === 'germany') ||
                         (cleanCountry === 'belgio' && topCountry === 'belgium') ||
                         (cleanCountry === 'paesi bassi' && topCountry === 'netherlands') ||
                         (cleanCountry === 'marocco' && topCountry === 'morocco') ||
                         (cleanCountry === 'turchia' && topCountry === 'turkey') ||
                         (cleanCountry === 'polonia' && topCountry === 'poland') ||
                         (cleanCountry === 'croazia' && topCountry === 'croatia') ||
                         (cleanCountry === 'svizzera' && topCountry === 'switzerland') ||
                         (cleanCountry === 'corea del sud' && topCountry === 'south korea') ||
                         (cleanCountry === 'argentina' && topCountry === 'argentina') ||
                         (cleanCountry === 'egitto' && topCountry === 'egypt') ||
                         (cleanCountry === 'repubblica ceca' && topCountry === 'czech republic') ||
                         (cleanCountry === 'rep ceca' && topCountry === 'czech republic') ||
                         (cleanCountry === 'colombia' && topCountry === 'colombia') ||
                         (cleanCountry === 'nigeria' && topCountry === 'nigeria') ||
                         (cleanCountry === 'uruguay' && topCountry === 'uruguay') ||
                         (cleanCountry === 'marocco' && topCountry === 'morocco') ||
                         (cleanCountry === 'maroc' && topCountry === 'morocco') ||
                         (cleanCountry === 'canada' && topCountry === 'canada') ||
                         (cleanCountry === 'austria' && topCountry === 'austria') ||
                         (cleanCountry === 'ungheria' && topCountry === 'hungary') ||
                         (cleanCountry === 'serbia' && topCountry === 'serbia');
                         
    if (countryMatch) {
      if (cleanName.includes(topName) || topName.includes(cleanName)) {
        return i + 1;
      }
      
      const topWords = topName.split(/\s+/).filter(w => w.length > 2);
      const matchesWord = words.some(w => topWords.includes(w));
      if (matchesWord) {
        return i + 1;
      }
    }
  }
  return 999;
}

function getPlayerPerformanceRating(player) {
  const base = player.initialValue || 1;
  let maxForRole = 30; // default/fallback
  
  if (player.role === 'ATT') maxForRole = 45;
  else if (player.role === 'CEN') maxForRole = 30;
  else if (player.role === 'DIF') maxForRole = 20;
  else if (player.role === 'POR') maxForRole = 18;

  const ratio = Math.max(0.05, Math.min(1.0, base / maxForRole));
  return 6.0 + ratio * 3.5;
}

function calculateIdealBidRange(player, targetTeam = null) {
  const performance = getPlayerPerformanceRating(player);
  const base = Math.max(1, player.initialValue || 1);
  
  const perfMult = 0.8 + ((performance - 6.0) / 2.8) * 0.5;
  let minPrice = Math.round(base * perfMult * 0.9);
  let maxPrice = Math.round(base * perfMult * 1.25);
  
  const cache = state.aiCache[player.id] || {};
  const starterProb = cache.starterProbability || "50%";
  const playerCat = cache.playerCategory || "buono";
  const qualProb = cache.groupAnalysis?.qualificationProbability || "50%";
  
  let justificationParts = [];
  justificationParts.push(`forza giocatore (${playerCat}, valutazione ${performance.toFixed(1)})`);
  
  if (cache.groupAnalysis?.qualificationProbability) {
    justificationParts.push(`chance passaggio girone ${player.country} al ${qualProb}`);
  } else {
    justificationParts.push(`nazionale ${player.country}`);
  }
  
  if (cache.starterProbability) {
    justificationParts.push(`titolare stimato al ${starterProb}`);
  }
  
  const team = targetTeam || state.teams.find(t => t.isUserTeam) || state.teams.find(t => t.id === state.activeTeamId) || state.teams[0];
  if (team) {
    const remainingCredits = team.budget;
    const playersCount = team.players ? team.players.length : 0;
    
    const playersNeeded = playersCount < 25 ? (25 - playersCount) : 1;
    const avgCreditsPerPlayer = remainingCredits / playersNeeded;
    
    const rank = findTopPlayerRank(player);
    console.log('[DEBUG-RANGE]', player.name, {
      role: player.role,
      initialValue: player.initialValue,
      teamName: team.name,
      budget: team.budget,
      playersCount: playersCount,
      playersNeeded: playersNeeded,
      avgCreditsPerPlayer: avgCreditsPerPlayer,
      rank: rank
    });
    let budgetWeight = 0.05;
    
    if (rank <= 10) budgetWeight = 0.55;
    else if (rank <= 30) budgetWeight = 0.45;
    else if (rank <= 60) budgetWeight = 0.35;
    else if (rank <= 100) budgetWeight = 0.25;
    else if (rank <= 150) budgetWeight = 0.18;
    else {
      if (player.role === 'ATT') budgetWeight = 0.12;
      else if (player.role === 'CEN') budgetWeight = 0.08;
      else if (player.role === 'DIF') budgetWeight = 0.06;
      else budgetWeight = 0.05;
    }
    
    let scaleFactor = 1.0;
    if (playersNeeded > 5) {
      scaleFactor = Math.max(0.4, 5 / playersNeeded);
    }
    const adjustedWeight = budgetWeight * scaleFactor;
    
    const roleCount = team.players ? team.players.filter(p => p.role === player.role).length : 0;
    let roleSaturationFactor = 1.0;
    let roleExplanation = "";
    
    if (player.role === 'POR') {
      if (roleCount === 0) {
        roleSaturationFactor = 1.35;
        roleExplanation = "nessun portiere in rosa (estrema urgenza)";
      } else if (roleCount === 1) {
        roleSaturationFactor = 1.15;
        roleExplanation = "hai 1 portiere (serve arrivare a 3)";
      } else if (roleCount === 2) {
        roleSaturationFactor = 1.0;
        roleExplanation = "hai 2 portieri (manca 1 per rotazione completa)";
      } else {
        roleSaturationFactor = 0.4;
        roleExplanation = `portieri saturi (${roleCount}/3)`;
      }
    } else if (player.role === 'DIF') {
      if (roleCount === 0) {
        roleSaturationFactor = 1.35;
        roleExplanation = "nessun difensore in rosa (estrema urgenza)";
      } else if (roleCount <= 3) {
        roleSaturationFactor = 1.2;
        roleExplanation = `solo ${roleCount} difensori (urgente arrivare a 8)`;
      } else if (roleCount <= 6) {
        roleSaturationFactor = 1.0;
        roleExplanation = `hai ${roleCount} difensori (mancano slot per rotazione ideale)`;
      } else if (roleCount === 7) {
        roleSaturationFactor = 0.9;
        roleExplanation = "hai 7 difensori (manca 1 slot)";
      } else {
        roleSaturationFactor = 0.5;
        roleExplanation = `difensori saturi (${roleCount}/8)`;
      }
    } else if (player.role === 'CEN') {
      if (roleCount === 0) {
        roleSaturationFactor = 1.35;
        roleExplanation = "nessun centrocampista in rosa (estrema urgenza)";
      } else if (roleCount <= 3) {
        roleSaturationFactor = 1.2;
        roleExplanation = `solo ${roleCount} centrocampisti (urgente arrivare a 8)`;
      } else if (roleCount <= 6) {
        roleSaturationFactor = 1.0;
        roleExplanation = `hai ${roleCount} centrocampisti (mancano slot per rotazione ideale)`;
      } else if (roleCount === 7) {
        roleSaturationFactor = 0.9;
        roleExplanation = "hai 7 centrocampisti (manca 1 slot)";
      } else {
        roleSaturationFactor = 0.5;
        roleExplanation = `centrocampisti saturi (${roleCount}/8)`;
      }
    } else if (player.role === 'ATT') {
      if (roleCount === 0) {
        roleSaturationFactor = 1.35;
        roleExplanation = "nessun attaccante in rosa (estrema urgenza)";
      } else if (roleCount <= 2) {
        roleSaturationFactor = 1.2;
        roleExplanation = `solo ${roleCount} attaccanti (urgente arrivare a 6)`;
      } else if (roleCount <= 4) {
        roleSaturationFactor = 1.0;
        roleExplanation = `hai ${roleCount} attaccanti (mancano 2 slot per rotazione ideale)`;
      } else if (roleCount === 5) {
        roleSaturationFactor = 0.85;
        roleExplanation = "hai 5 attaccanti (manca 1 slot)";
      } else {
        roleSaturationFactor = 0.4;
        roleExplanation = `attaccanti saturi (${roleCount}/6)`;
      }
    }
    
    // Exempt top-100 players from role saturation penalty (as they are premium upgrades)
    if (rank <= 100) {
      roleSaturationFactor = 1.0;
      roleExplanation = `${roleExplanation} (top player esente da penalità ballottaggio)`;
    }
    
    const targetMin = Math.round(avgCreditsPerPlayer * adjustedWeight * 0.75 * roleSaturationFactor);
    const targetMax = Math.round(avgCreditsPerPlayer * adjustedWeight * 1.25 * roleSaturationFactor);
    
    minPrice = Math.max(minPrice, targetMin);
    maxPrice = Math.max(maxPrice, targetMax);
    
    const maxAffordable = Math.max(1, remainingCredits - playersNeeded + 1);
    minPrice = Math.min(minPrice, maxAffordable);
    maxPrice = Math.min(maxPrice, maxAffordable);
    
    justificationParts.push(`budget residuo di ${remainingCredits} cr (${Math.round(avgCreditsPerPlayer)} cr/slot stimati)`);
    justificationParts.push(roleExplanation);
  }
  
  minPrice = Math.max(base, minPrice);
  maxPrice = Math.max(minPrice, maxPrice);
  
  const justification = "Calcolato in base a: " + justificationParts.join(", ") + ".";
  return { min: minPrice, max: maxPrice, justification };
}


function calculateMaxBid(team) {
  const emptySlots = countEmptySlots(team);
  if (emptySlots <= 0) return 0;
  return team.budget - (emptySlots - 1);
}

function countEmptySlots(team) {
  return Math.max(0, 35 - team.players.length);
}

function hasRoleSlotAvailable(team, role) {
  return team.players.length < 35;
}

function normalizePlayerAnalysis(data) {
  if (!data) {
    return {
      playerCategory: "buono",
      valueForMoney: "Buono",
      starterProbability: "50%",
      appearances: "Dati non disponibili nella stagione 25/26",
      formState: "Nessuna notizia recente.",
      matchStrength: 50,
      matchAnalysis: {
        nextOpponent: "Da verificare",
        criteriaText: "Analisi del turno in fase di elaborazione."
      },
      groupAnalysis: {
        groupName: "Da verificare",
        qualificationProbability: "50%",
        groupAnalysisText: "Analisi del girone in fase di elaborazione.",
        postGroupPath: "Percorso post-gironi in fase di definizione."
      },
      expectedBonuses: "Nessun bonus specifico atteso segnalato.",
      alternatives: []
    };
  }

  const normalized = { ...data };

  // 1. playerCategory
  let cat = normalized.playerCategory || normalized.category || normalized.playerClass || "buono";
  cat = typeof cat === 'string' ? cat.toLowerCase().trim() : 'buono';
  if (cat.includes('stella') || cat.includes('star')) normalized.playerCategory = "stella";
  else if (cat.includes('ottimo')) normalized.playerCategory = "ottimo";
  else if (cat.includes('buono')) normalized.playerCategory = "buono";
  else if (cat.includes('accettabile')) normalized.playerCategory = "accettabile";
  else if (cat.includes('scarso')) normalized.playerCategory = "scarso";
  else normalized.playerCategory = "buono";

  // 2. valueForMoney
  let val = normalized.valueForMoney || normalized.value || normalized.moneyValue || normalized.qValutazione || "Buono";
  val = typeof val === 'string' ? val.trim() : 'Buono';
  const valLower = val.toLowerCase();
  if (valLower.includes('ottimo')) normalized.valueForMoney = "Ottimo";
  else if (valLower.includes('buono')) normalized.valueForMoney = "Buono";
  else if (valLower.includes('rischioso')) normalized.valueForMoney = "Rischioso";
  else if (valLower.includes('sopravvalutato') || valLower.includes('scarso')) normalized.valueForMoney = "Sopravvalutato";
  else normalized.valueForMoney = "Buono";

  // 3. starterProbability
  let prob = normalized.starterProbability || normalized.probability || normalized.playProbability || normalized.starterProb || "50%";
  if (typeof prob === 'number') {
    prob = `${prob}%`;
  } else if (typeof prob === 'string') {
    const num = parseInt(prob.replace(/[^0-9]/g, ''));
    prob = !isNaN(num) ? `${num}%` : "50%";
  } else {
    prob = "50%";
  }
  normalized.starterProbability = prob;

  // 4. appearances
  normalized.appearances = normalized.appearances || "Dati non disponibili nella stagione 25/26";

  // 5. formState
  normalized.formState = normalized.formState || normalized.form || normalized.status || normalized.formDescription || normalized.description || "Nessuna notizia recente.";

  // 6. matchStrength
  let strength = normalized.matchStrength;
  if (strength === undefined || strength === null) {
    strength = normalized.strength || (normalized.matchAnalysis && (normalized.matchAnalysis.matchStrength || normalized.matchAnalysis.strength)) || 50;
  }
  if (typeof strength === 'string') {
    strength = parseInt(strength.replace(/[^0-9]/g, ''));
  }
  normalized.matchStrength = !isNaN(parseInt(strength)) ? parseInt(strength) : 50;

  // 7. matchAnalysis object (derived/retained for legacy)
  let rawMatch = normalized.matchAnalysis;
  let opponent = normalized.nextOpponent || (rawMatch && (rawMatch.nextOpponent || rawMatch.opponent || rawMatch.nextMatch)) || 'Da verificare';
  let criteria = (rawMatch && (rawMatch.criteriaText || rawMatch.description || rawMatch.text)) || 'Analisi in fase di elaborazione.';
  
  normalized.matchAnalysis = {
    nextOpponent: typeof opponent === 'string' ? opponent.trim() : 'Da verificare',
    criteriaText: typeof criteria === 'string' ? criteria.trim() : 'Analisi in fase di elaborazione.'
  };

  // 8. groupAnalysis object
  let rawGroup = normalized.groupAnalysis || {};
  normalized.groupAnalysis = {
    groupName: rawGroup.groupName || normalized.groupName || 'Da verificare',
    qualificationProbability: rawGroup.qualificationProbability || normalized.qualificationProbability || '50%',
    groupAnalysisText: rawGroup.groupAnalysisText || rawGroup.analysisText || normalized.groupAnalysisText || 'Analisi del girone in fase di elaborazione.',
    postGroupPath: rawGroup.postGroupPath || rawGroup.path || normalized.postGroupPath || 'Percorso post-gironi in fase di definizione.'
  };

  // 9. expectedBonuses
  normalized.expectedBonuses = normalized.expectedBonuses || normalized.bonuses || 'Nessun bonus specifico atteso segnalato.';

  // 10. alternatives array
  let alts = normalized.alternatives || normalized.alternativesList || normalized.concorrenti || [];
  if (!Array.isArray(alts)) {
    alts = [];
  }
  normalized.alternatives = alts.map(alt => {
    if (typeof alt === 'string') {
      return { name: alt, playProbability: "20%" };
    }
    if (alt && typeof alt === 'object') {
      const name = alt.name || alt.playerName || alt.calciatore || 'Alternativa';
      let altProb = alt.playProbability || alt.probability || alt.chance || '20%';
      if (typeof altProb === 'number') {
        altProb = `${altProb}%`;
      } else if (typeof altProb === 'string') {
        const num = parseInt(altProb.replace(/[^0-9]/g, ''));
        altProb = !isNaN(num) ? `${num}%` : "20%";
      }
      return { 
        name: typeof name === 'string' ? name.trim() : 'Alternativa', 
        playProbability: altProb
      };
    }
    return null;
  }).filter(Boolean);

  // 11. roleCompetitionComment
  let compComment = data.roleCompetitionComment || data.alternativesComment || '';
  if (!compComment && alts.length > 0) {
    // Fallback: if we only have old data format with comments per alternative, merge them
    const commentsList = alts
      .map(alt => alt.comment || alt.note || alt.description || alt.descrizione)
      .filter(Boolean);
    if (commentsList.length > 0) {
      compComment = commentsList.join(' ');
    }
  }
  normalized.roleCompetitionComment = typeof compComment === 'string' ? compComment.trim() : '';

  return normalized;
}

// --- UI RENDERING WORKFLOW ---

function renderAll() {
  renderActiveTeamConsole();
  renderPlayerList();
  renderTeamDashboard();
  updateAISettingsEditability();
  if (state.activeTab === 'tabellone') {
    renderTournament();
  }
}

function updateAISettingsEditability() {
  if (dom.configAIProvider) {
    dom.configAIProvider.disabled = !state.isAdmin;
  }
  if (dom.configOpenRouterModel) {
    dom.configOpenRouterModel.disabled = !state.isAdmin;
  }
  if (dom.configGeminiModel) {
    dom.configGeminiModel.disabled = !state.isAdmin;
  }

  // Update label visual hints based on admin privilege
  const providerLabel = document.querySelector('label[for="config-ai-provider"]');
  if (providerLabel) {
    if (!state.isAdmin) {
      providerLabel.innerHTML = 'Provider Intelligenza Artificiale <span style="font-size: 0.65rem; color: var(--color-warning); font-weight: normal; text-transform: none;">(Sola lettura - Accedi come Admin per modificare 🔒)</span>';
    } else {
      providerLabel.innerHTML = 'Provider Intelligenza Artificiale <span style="font-size: 0.65rem; color: var(--color-success); font-weight: normal; text-transform: none;">(Abilitato - Amministratore 👑)</span>';
    }
  }

  const modelLabel = document.querySelector('label[for="config-openrouter-model"]');
  if (modelLabel) {
    if (!state.isAdmin) {
      modelLabel.innerHTML = 'Modello OpenRouter <span style="font-size: 0.65rem; color: var(--color-warning); font-weight: normal; text-transform: none;">(Sola lettura - Accedi come Admin per modificare 🔒)</span>';
    } else {
      modelLabel.innerHTML = 'Modello OpenRouter <span style="font-size: 0.65rem; color: var(--color-success); font-weight: normal; text-transform: none;">(Abilitato - Amministratore 👑)</span>';
    }
  }

  const geminiModelLabel = document.querySelector('label[for="config-gemini-model"]');
  if (geminiModelLabel) {
    if (!state.isAdmin) {
      geminiModelLabel.innerHTML = 'Modello Google Gemini <span style="font-size: 0.65rem; color: var(--color-warning); font-weight: normal; text-transform: none;">(Sola lettura - Accedi come Admin per modificare 🔒)</span>';
    } else {
      geminiModelLabel.innerHTML = 'Modello Google Gemini <span style="font-size: 0.65rem; color: var(--color-success); font-weight: normal; text-transform: none;">(Abilitato - Amministratore 👑)</span>';
    }
  }

  if (dom.btnAdminLoginToggle) {
    if (state.isAdmin) {
      dom.btnAdminLoginToggle.innerHTML = 'Disconnetti Admin 🔒';
      dom.btnAdminLoginToggle.style.color = '#fff';
      dom.btnAdminLoginToggle.setAttribute('data-tooltip', 'Esci dalla sessione amministratore');
    } else {
      dom.btnAdminLoginToggle.innerHTML = 'Accedi come Admin 🔑';
      dom.btnAdminLoginToggle.style.color = '#fff';
      dom.btnAdminLoginToggle.setAttribute('data-tooltip', 'Accedi come amministratore per sbloccare le impostazioni AI');
    }
  }
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

  if (dom.checkboxUserTeam) {
    dom.checkboxUserTeam.checked = team ? !!team.isUserTeam : false;
  }

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

  if (dom.consoleSlotPOR) dom.consoleSlotPOR.textContent = filledPOR;
  if (dom.consoleSlotDIF) dom.consoleSlotDIF.textContent = filledDIF;
  if (dom.consoleSlotCEN) dom.consoleSlotCEN.textContent = filledCEN;
  if (dom.consoleSlotATT) dom.consoleSlotATT.textContent = filledATT;

  // Color background based on slot availability
  const colorBox = (boxEl) => {
    if (!boxEl) return;
    boxEl.style.background = 'rgba(255, 255, 255, 0.02)';
    boxEl.style.borderColor = 'rgba(255, 255, 255, 0.08)';
  };

  colorBox(document.getElementById('console-slot-por')?.parentElement);
  colorBox(document.getElementById('console-slot-dif')?.parentElement);
  colorBox(document.getElementById('console-slot-cen')?.parentElement);
  colorBox(document.getElementById('console-slot-att')?.parentElement);

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

        const escapedName = p.name.replace(/'/g, "\\'");
        const escapedCountry = p.country.replace(/'/g, "\\'");

        item.innerHTML = `
          <div class="mini-player-name" style="font-size: 0.75rem; display: flex; align-items: center; gap: 0.35rem;">
            <span style="display:inline-block; width: 6px; height: 6px; border-radius:50%; background: var(--color-${p.role.toLowerCase()})"></span>
            <span style="color: #fff; font-weight: 500;">
              ${isCountryEliminated(p.country) 
                ? `<span style="text-decoration: line-through; text-decoration-color: var(--color-danger); text-decoration-thickness: 2px; color: var(--color-danger); opacity: 0.85;">${p.name}</span>`
                : p.name
              } <span style="color: var(--color-text-muted); font-size: 0.65rem;">(${p.country})</span>
              ${isCountryEliminated(p.country) ? ' <span style="font-size: 0.6rem; color: var(--color-danger); font-weight: 700;">[ELIMINATO]</span>' : ''}
            </span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span class="mini-player-cost" style="font-weight: 700; color: var(--color-primary); font-size: 0.75rem; margin-right: 0.15rem;">${p.purchaseCost} cr</span>
            <button class="btn-ai-sparkle" style="width: 20px; height: 20px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.65rem; padding: 0;" onclick="showPlayerAIAnalysis('${p.id}', '${escapedName}', '${escapedCountry}', '${p.role}', this); event.stopPropagation();" title="Analisi IA ✨">
              ✨
            </button>
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
        <td colspan="5" class="text-center" style="padding: 2.5rem; color: var(--color-text-muted);">
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

      const allTeams = state.teams;
      let menuItemsHtml = '';
      allTeams.forEach(t => {
        const isActive = t.id === state.activeTeamId;
        const maxBid = calculateMaxBid(t);
        const hasSlots = countEmptySlots(t) > 0;
        const hasRoleOpen = hasRoleSlotAvailable(t, p.role);
        const isEligible = hasSlots && hasRoleOpen && maxBid >= 1;
        const escapedTeamName = t.name.replace(/'/g, "\\'");
        
        let label = t.name;
        if (isActive) label += ' ⭐';
        
        if (isEligible) {
          menuItemsHtml += `
            <a href="#" class="dropdown-menu-item" onclick="setPlayerRowTargetTeam('${p.id}', '${t.id}', '${escapedTeamName}', true); return false;">
              ${label}
            </a>
          `;
        } else {
          let reason = '';
          if (!hasSlots) reason = 'Rosa compl.';
          else if (!hasRoleOpen) reason = `No slot ${p.role}`;
          else if (maxBid < 1) reason = 'Cred. insuff.';
          
          menuItemsHtml += `
            <span class="dropdown-menu-item disabled" title="${reason}">
              ${label} <small style="font-size:0.6rem; color:var(--color-danger)">(${reason})</small>
            </span>
          `;
        }
      });

      actionCellHtml = `
        <div class="split-button-container">
          <button id="assign-btn-${p.id}" class="split-btn-main" ${disableAttr} onclick="assignPlayerDirect('${p.id}', this.getAttribute('data-target-team-id'))">
            ${buttonLabel}
          </button>
          <div class="split-btn-dropdown">
            <button id="arrow-${p.id}" class="split-btn-arrow" onclick="toggleSplitDropdown(event, '${p.id}')">▾</button>
            <div class="split-btn-menu">
              <div class="dropdown-menu-header">Seleziona Squadra:</div>
              ${menuItemsHtml}
            </div>
          </div>
        </div>
      `;
    }

    const escapedName = p.name.replace(/'/g, "\\'");
    const escapedCountry = p.country.replace(/'/g, "\\'");

    let idealRangeHtml = '';
    if (p.ownerId) {
      idealRangeHtml = `<span style="color: var(--color-text-muted); font-size: 0.85rem;">-</span>`;
    } else {
      const hasAnalysis = !!state.aiCache[p.id];
      if (hasAnalysis) {
        const range = calculateIdealBidRange(p);
        idealRangeHtml = `<span style="color: #f59e0b; font-weight: 800; font-size: 0.85rem;">${range.min} - ${range.max} cr</span>`;
      } else {
        idealRangeHtml = `<span style="color: var(--color-text-muted); font-size: 0.65rem; font-style: italic; border: 1px dashed rgba(255,255,255,0.06); padding: 0.15rem 0.35rem; border-radius: 4px; display: inline-flex; align-items: center; gap: 0.2rem;">Su richiesta ✨</span>`;
      }
    }

    tr.innerHTML = `
      <td style="font-weight: 700; white-space: nowrap;">
        ${isCountryEliminated(p.country) 
          ? `<span class="eliminated-player-name" style="text-decoration: line-through; text-decoration-color: var(--color-danger); text-decoration-thickness: 2px; color: var(--color-danger); opacity: 0.85;">${p.name}</span>`
          : `<span>${p.name}</span>`
        }
        ${isCountryEliminated(p.country) ? ' <span class="badge badge-danger" style="font-size: 0.6rem; padding: 0.15rem 0.35rem; background: var(--color-danger); color: #fff; flex-shrink: 0;">❌ ELIMINATO</span>' : ''}
        <button class="btn-ai-sparkle" onclick="showPlayerAIAnalysis('${p.id}', '${escapedName}', '${escapedCountry}', '${p.role}', this); event.stopPropagation();" title="Analisi IA ✨">✨</button>
      </td>
      <td><span class="badge badge-${p.role.toLowerCase()}">${p.role}</span></td>
      <td>${p.country}</td>
      <td style="text-align: center;">${idealRangeHtml}</td>
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
        const isEliminated = isCountryEliminated(p.country);
        rosterHtml += `
          <div class="mini-player-item ${isEliminated ? 'player-eliminated' : ''}">
            <span class="mini-player-name" style="display: inline-flex; align-items: center; gap: 0.25rem;">
              <span class="badge badge-${p.role.toLowerCase()}" style="font-size: 0.6rem; padding: 0.1rem 0.25rem; border-radius: 4px; display: inline-flex; flex-shrink: 0; line-height: 1;">${p.role}</span>
              <span class="player-name-text" style="display: inline-block;">${p.name} <span style="color: var(--color-text-muted); font-size: 0.7rem;">(${p.country})</span></span>
            </span>
            <span class="mini-player-cost" style="font-weight: 700; color: #fff;">
              ${isEliminated ? '<span style="color: var(--color-danger); font-weight: 700; margin-right: 0.35rem; font-size: 0.65rem; display: inline-block;">[ELIMINATO]</span>' : ''}
              ${p.purchaseCost} cr
            </span>
          </div>
        `;
      });
    }

    card.innerHTML = `
      <div class="team-card-header">
        <h3 class="team-name" style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
          ${t.name}
          ${t.isUserTeam ? '<span class="badge badge-user-team" style="background: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 0.65rem; padding: 0.15rem 0.35rem; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.25); font-weight: 700; white-space: nowrap; display: inline-flex; align-items: center; gap: 0.2rem;">⭐ MIA SQUADRA</span>' : ''}
        </h3>
        <div class="team-credits">${t.budget} <span>cr</span></div>
      </div>
      
      <div class="team-roles-progress">
        <div class="role-bar-container">
          <div class="role-bar-label">POR</div>
          <div class="role-bar-value" style="color: var(--color-por)">${por}</div>
        </div>
        <div class="role-bar-container">
          <div class="role-bar-label">DIF</div>
          <div class="role-bar-value" style="color: var(--color-dif)">${dif}</div>
        </div>
        <div class="role-bar-container">
          <div class="role-bar-label">CEN</div>
          <div class="role-bar-value" style="color: var(--color-cen)">${cen}</div>
        </div>
        <div class="role-bar-container">
          <div class="role-bar-label">ATT</div>
          <div class="role-bar-value" style="color: var(--color-att)">${att}</div>
        </div>
      </div>

      <!-- Toggle button for mobile -->
      <button class="mobile-section-toggle" onclick="this.classList.toggle('open'); document.getElementById('roster-collapsible-${t.id}').classList.toggle('open');" style="margin-top: 0.75rem; margin-bottom: 0;">
        <span>Roster (${totalCount}/35 giocatori)</span>
        <svg class="toggle-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>

      <!-- Collapsible wrapper -->
      <div id="roster-collapsible-${t.id}" class="mobile-collapsible">
        <div class="team-players-mini" style="border-top: none; padding-top: 0;">
          <div class="desktop-only-roster-header" style="font-size: 0.7rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase; margin-bottom: 0.25rem; margin-top: 0.5rem;">Roster (${totalCount}/35 giocatori)</div>
          ${rosterHtml}
        </div>
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

  // Determine starter status in ideal mode
  let isP1Starter = false;
  let isP2Starter = false;
  let ideal = null;
  let isIdealMode = state.pitchShowIdeal && state.teamIdealLineups?.[team.id];
  
  if (isIdealMode) {
    ideal = state.teamIdealLineups[team.id];
    isP1Starter = ideal.starters.includes(p1.id);
    isP2Starter = ideal.starters.includes(p2.id);
  }

  // Validation: Roles must match perfectly unless swapping two bench players in ideal mode
  const isBenchSwap = isIdealMode && !isP1Starter && !isP2Starter;
  if (!isBenchSwap && p1.role !== p2.role) {
    showToast(`Errore: puoi scambiare solo calciatori dello stesso ruolo (${p1.role}) per rispettare il modulo!`, 'danger');
    return;
  }

  // If in ideal lineup mode and team has a generated ideal lineup, swap them there
  if (isIdealMode) {

    if (isP1Starter !== isP2Starter) {
      // Swap positions in starters and bench arrays
      if (isP1Starter) {
        ideal.starters = ideal.starters.filter(id => id !== p1.id);
        ideal.bench = ideal.bench.filter(id => id !== p2.id);
        ideal.starters.push(p2.id);
        ideal.bench.push(p1.id);
      } else {
        ideal.starters = ideal.starters.filter(id => id !== p2.id);
        ideal.bench = ideal.bench.filter(id => id !== p1.id);
        ideal.starters.push(p1.id);
        ideal.bench.push(p2.id);
      }
    } else {
      // Both starters or both bench
      if (isP1Starter) {
        const idxS1 = ideal.starters.indexOf(p1.id);
        const idxS2 = ideal.starters.indexOf(p2.id);
        if (idxS1 !== -1 && idxS2 !== -1) {
          ideal.starters[idxS1] = p2.id;
          ideal.starters[idxS2] = p1.id;
        }
      } else {
        const idxB1 = ideal.bench.indexOf(p1.id);
        const idxB2 = ideal.bench.indexOf(p2.id);
        if (idxB1 !== -1 && idxB2 !== -1) {
          ideal.bench[idxB1] = p2.id;
          ideal.bench[idxB2] = p1.id;
        }
      }
    }
    
    // Also reorder team.players roster array to preserve saving order compatibility
    const idx1 = team.players.indexOf(p1);
    const idx2 = team.players.indexOf(p2);
    if (idx1 !== -1 && idx2 !== -1) {
      team.players[idx1] = p2;
      team.players[idx2] = p1;
    }
  } else {
    // Normal manual mode reordering of team.players
    const idx1 = team.players.indexOf(p1);
    const idx2 = team.players.indexOf(p2);
    if (idx1 !== -1 && idx2 !== -1) {
      team.players[idx1] = p2;
      team.players[idx2] = p1;
    }
  }

  showToast(`Scambio completato: ${p1.name} ⇆ ${p2.name}!`, 'success');
  
  autoSave();
  renderPitch();
  renderTeamDashboard();
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

  if (state.pitchShowIdeal && state.teamIdealLineups?.[team.id]) {
    const ideal = state.teamIdealLineups[team.id];
    ideal.bench = ideal.bench.filter(id => id !== player.id);
    if (!ideal.starters.includes(player.id)) {
      ideal.starters.push(player.id);
    }
    
    // Also reorder team.players roster array
    team.players = team.players.filter(x => x.id !== player.id);
    const firstRoleIdx = team.players.findIndex(x => x.role === player.role);
    if (firstRoleIdx !== -1) {
      team.players.splice(firstRoleIdx, 0, player);
    } else {
      team.players.push(player);
    }
  } else {
    // Normal manual mode reordering
    team.players = team.players.filter(x => x.id !== player.id);
    const firstRoleIdx = team.players.findIndex(x => x.role === player.role);
    if (firstRoleIdx !== -1) {
      team.players.splice(firstRoleIdx, 0, player);
    } else {
      team.players.push(player);
    }
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

  const updateDOM = () => {
    const module = team.module || '4-3-3';
    const parts = module.split('-').map(x => parseInt(x));
    
    const defNeeded = parts[0] || 4;
    const cenNeeded = parts[1] || 3;
    const attNeeded = parts[2] || 3;
    const porNeeded = 1;

    const idealLineup = state.teamIdealLineups?.[team.id];
    let porStarters, porBench, difStarters, difBench, cenStarters, cenBench, attStarters, attBench;

    if (state.pitchShowIdeal && idealLineup) {
      // If we have an AI-recommended ideal lineup, use the exact players recommended by the AI!
      const startersList = team.players.filter(p => idealLineup.starters.includes(p.id));
      const benchList = team.players.filter(p => idealLineup.bench.includes(p.id));

      porStarters = startersList.filter(p => p.role === 'POR');
      porBench = benchList.filter(p => p.role === 'POR');

      difStarters = startersList.filter(p => p.role === 'DIF');
      difBench = benchList.filter(p => p.role === 'DIF');

      cenStarters = startersList.filter(p => p.role === 'CEN');
      cenBench = benchList.filter(p => p.role === 'CEN');

      attStarters = startersList.filter(p => p.role === 'ATT');
      attBench = benchList.filter(p => p.role === 'ATT');
    } else {
      // Separate all team players by role
      let porPlayers = team.players.filter(p => p.role === 'POR');
      let difPlayers = team.players.filter(p => p.role === 'DIF');
      let cenPlayers = team.players.filter(p => p.role === 'CEN');
      let attPlayers = team.players.filter(p => p.role === 'ATT');

      // If ideal lineup mode, sort by AI Form Score (fallback)
      if (state.pitchShowIdeal) {
        const getPlayerFormScore = (player) => {
          const cachedRaw = state.aiCache[player.id] || JSON.parse(sessionStorage.getItem(`fantamondiale_ai_${player.id}`) || 'null');
          if (!cachedRaw) return 50;
          const cached = normalizePlayerAnalysis(cachedRaw);
          let score = 50;
          
          // Category score
          const cat = (cached.playerCategory || '').toLowerCase();
          if (cat.includes('stella')) score += 40;
          else if (cat.includes('ottimo')) score += 30;
          else if (cat.includes('buono')) score += 20;
          else if (cat.includes('accettabile')) score += 10;
          else if (cat.includes('scarso')) score -= 20;

          // Starter probability score
          if (cached.starterProbability) {
            const prob = parseInt(cached.starterProbability.replace(/[^0-9]/g, '')) || 50;
            score += prob * 0.2;
          }
          
          // Cost score
          score += (player.purchaseCost || 0) * 0.1;
          return score;
        };

        porPlayers = [...porPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
        difPlayers = [...difPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
        cenPlayers = [...cenPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
        attPlayers = [...attPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
      }

      // Slices: Starters (Titolari) and Bench (Panchina)
      porStarters = porPlayers.slice(0, porNeeded);
      porBench = porPlayers.slice(porNeeded);

      difStarters = difPlayers.slice(0, defNeeded);
      difBench = difPlayers.slice(defNeeded);

      cenStarters = cenPlayers.slice(0, cenNeeded);
      cenBench = cenPlayers.slice(cenNeeded);

      attStarters = attPlayers.slice(0, attNeeded);
      attBench = attPlayers.slice(attNeeded);
    }

    let benchList;
    if (state.pitchShowIdeal && idealLineup) {
      benchList = idealLineup.bench.map(id => team.players.find(p => p.id === id)).filter(Boolean);
    } else {
      benchList = [...porBench, ...difBench, ...cenBench, ...attBench];
    }

    const actualBenchList = benchList.slice(0, 10);
    const tribunaList = benchList.slice(10);

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
          node.style.position = 'relative';
          node.setAttribute('draggable', 'true');
          node.setAttribute('data-player-id', player.id);
          node.style.viewTransitionName = `player-${player.id}`;

          const cachedAnalysisRaw = state.aiCache[player.id] || JSON.parse(sessionStorage.getItem(`fantamondiale_ai_${player.id}`) || 'null');
          const cachedAnalysis = cachedAnalysisRaw ? normalizePlayerAnalysis(cachedAnalysisRaw) : null;
          const strength = cachedAnalysis ? cachedAnalysis.matchStrength : undefined;
          let strengthBadgeHtml = '';
          if (strength !== undefined && strength !== null) {
            const strVal = parseInt(strength);
            let strColor = '#fff';
            let strBg = '#ef4444'; // Red
            if (strVal >= 80) {
              strBg = '#10b981'; // Emerald
            } else if (strVal >= 50) {
              strBg = '#f59e0b'; // Amber
            }
            strengthBadgeHtml = `<div class="pitch-player-strength-badge" title="Forza del turno: ${strVal}/100" style="position: absolute; top: -4px; right: -4px; width: 17px; height: 17px; border-radius: 50%; background: ${strBg}; color: ${strColor}; font-size: 0.58rem; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.25); box-shadow: 0 1px 3px rgba(0,0,0,0.4); z-index: 5;">${strVal}</div>`;
          }

          const startProb = cachedAnalysis ? cachedAnalysis.starterProbability : undefined;
          let probBadgeHtml = '';
          if (startProb) {
            const probVal = parseInt(startProb);
            let probBg = '#ef4444'; // Red
            if (probVal >= 70) {
              probBg = '#10b981'; // Emerald
            } else if (probVal >= 40) {
              probBg = '#f59e0b'; // Amber
            }
            probBadgeHtml = `<div class="pitch-player-prob-badge" title="Percentuale titolarità: ${startProb}" style="position: absolute; bottom: -3px; right: -3px; min-width: 17px; height: 17px; padding: 0 2px; box-sizing: border-box; border-radius: 9px; background: ${probBg}; color: #fff; font-size: 0.48rem; font-weight: 800; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.25); box-shadow: 0 1px 3px rgba(0,0,0,0.4); z-index: 4;">${startProb}</div>`;
          }

          const roleLetter = { POR: 'P', DIF: 'D', CEN: 'C', ATT: 'A' }[player.role] || player.role[0];
          node.innerHTML = `
            ${strengthBadgeHtml}
            <div style="position: relative; display: inline-block;">
              <div class="pitch-player-shirt" style="background: var(--color-${player.role.toLowerCase()}); ${isCountryEliminated(player.country) ? 'opacity: 0.55; border: 2px dashed var(--color-danger);' : ''}">
                ${roleLetter}
              </div>
              ${probBadgeHtml}
            </div>
            <div class="pitch-player-name" style="${isCountryEliminated(player.country) ? 'color: var(--color-danger); text-decoration: line-through;' : ''}">${player.name} (${player.country})</div>
          `;


          // Wire drag and drop events
          node.addEventListener('dragstart', handleDragStart);
          node.addEventListener('dragend', handleDragEnd);
          node.addEventListener('dragover', handleDragOver);
          node.addEventListener('dragleave', handleDragLeave);
          node.addEventListener('drop', handleDrop);

          // Wire rich popover events
          node.addEventListener('click', (e) => {
            e.stopPropagation();
            const isMobile = window.innerWidth <= 768;
            showPitchPlayerTooltip(player.id, node, isMobile);
          });

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
    benchContainer.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem; width: 100%;';

    const renderHeader = (container) => {
      const header = document.createElement('div');
      header.style.cssText = 'display: grid; grid-template-columns: 1.6fr 1fr 0.7fr 0.7fr; gap: 0.5rem; width: 100%; box-sizing: border-box; padding: 0.35rem 0.65rem; font-size: 0.62rem; font-weight: 800; color: var(--color-text-muted); border-bottom: 1px solid var(--border-light); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;';
      header.innerHTML = `
        <span>Calciatore</span>
        <span style="text-align: center;">Avversario</span>
        <span style="text-align: right;">Forza F.</span>
        <span style="text-align: right;">Titolare %</span>
      `;
      container.appendChild(header);
    };

    const renderPlayerNode = (p, container, isTribuna, index) => {
      const el = document.createElement('div');
      el.className = 'bench-player-node';
      el.setAttribute('draggable', 'true');
      el.setAttribute('data-player-id', p.id);
      el.style.viewTransitionName = `player-${p.id}`;
      el.style.cssText = 'display: grid; grid-template-columns: 1.6fr 1fr 0.7fr 0.7fr; align-items: center; gap: 0.5rem; width: 100%; box-sizing: border-box; padding: 0.35rem 0.65rem; cursor: pointer;';

      const cachedAnalysisRaw = state.aiCache[p.id] || JSON.parse(sessionStorage.getItem(`fantamondiale_ai_${p.id}`) || 'null');
      const cachedAnalysis = cachedAnalysisRaw ? normalizePlayerAnalysis(cachedAnalysisRaw) : null;
      const startProb = cachedAnalysis ? cachedAnalysis.starterProbability : 'N/D';
      const strength = cachedAnalysis ? cachedAnalysis.matchStrength : 'N/D';
      const opp = getNextOpponentForCountry(p.country);

      let probColor = 'var(--color-text-muted)';
      if (startProb && startProb.endsWith('%')) {
        const val = parseInt(startProb);
        if (val >= 70) probColor = '#10b981'; // Green
        else if (val >= 40) probColor = '#f59e0b'; // Amber
        else probColor = '#ef4444'; // Red
      }

      let strengthColor = 'var(--color-text-muted)';
      if (strength !== 'N/D') {
        const val = parseInt(strength);
        if (val >= 80) strengthColor = '#10b981';
        else if (val >= 50) strengthColor = '#f59e0b';
        else strengthColor = '#ef4444';
      }

      let warningBadgeHtml = '';
      if (isTribuna) {
        warningBadgeHtml = ` <span style="color: var(--color-warning); font-size: 0.8rem; font-weight: bold; margin-left: 0.25rem;" title="Non entrerà in panchina (max 10 panchinari!)">⚠️</span>`;
        el.style.background = 'rgba(245, 158, 11, 0.05)';
        el.style.borderColor = 'rgba(245, 158, 11, 0.2)';
      }

      el.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.35rem; min-width: 0; overflow: hidden;">
          <span style="font-size: 0.7rem; color: var(--color-text-muted); font-weight: bold; min-width: 14px;">${index + 1}.</span>
          <span class="dot" style="background: var(--color-${p.role.toLowerCase()}); flex-shrink: 0;"></span>
          <span style="font-size: 0.72rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; ${isCountryEliminated(p.country) ? 'text-decoration: line-through; color: var(--color-text-muted);' : ''}" title="${p.name} (${p.country})">${p.name} (${p.country})</span>
          ${warningBadgeHtml}
          ${isCountryEliminated(p.country) ? ' <span style="font-size: 0.52rem; color: var(--color-danger); font-weight: 700; border: 1px solid var(--color-danger); padding: 0.05rem 0.15rem; border-radius: 4px; line-height: 1; flex-shrink: 0;">ELIMINATO</span>' : ''}
        </div>
        <span style="font-size: 0.7rem; text-align: center; color: var(--color-text-muted); font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${opp && opp !== 'Nessuno' && opp !== 'Da verificare' ? `vs ${opp}` : opp}">
          ${opp && opp !== 'Nessuno' && opp !== 'Da verificare' ? `vs ${opp}` : opp}
        </span>
        <span style="font-size: 0.7rem; text-align: right; color: ${strengthColor}; font-weight: 700;">
          ${strength}
        </span>
        <span style="font-size: 0.7rem; text-align: right; color: ${probColor}; font-weight: 700;">
          ${startProb}
        </span>
      `;


      el.addEventListener('dragstart', handleDragStart);
      el.addEventListener('dragend', handleDragEnd);
      el.addEventListener('dragover', handleDragOver);
      el.addEventListener('dragleave', handleDragLeave);
      el.addEventListener('drop', handleDrop);

      // Wire rich popover events
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMobile = window.innerWidth <= 768;
        showPitchPlayerTooltip(p.id, el, isMobile);
      });

      container.appendChild(el);
    };

    if (actualBenchList.length === 0) {
      benchContainer.innerHTML = `<span style="color: var(--color-text-muted); font-size: 0.75rem; font-style: italic;">Panchina vuota... Tutti i giocatori rientrano nei titolari.</span>`;
    } else {
      renderHeader(benchContainer);
      actualBenchList.forEach((p, idx) => renderPlayerNode(p, benchContainer, false, idx));
    }

    // Render Tribuna List
    const tribunaSection = document.getElementById('pitch-tribuna-section');
    const tribunaContainer = document.getElementById('pitch-tribuna-container');
    if (tribunaSection && tribunaContainer) {
      tribunaContainer.innerHTML = '';
      tribunaContainer.style.cssText = 'display: flex; flex-direction: column; gap: 0.25rem; width: 100%;';
      if (tribunaList.length > 0) {
        tribunaSection.style.display = 'block';
        renderHeader(tribunaContainer);
        tribunaList.forEach((p, idx) => renderPlayerNode(p, tribunaContainer, true, idx));
      } else {
        tribunaSection.style.display = 'none';
      }
    }

    // Show or hide the AI tactical card
    const tacticalCard = document.getElementById('pitch-ai-tactical-card');
    const tacticalText = document.getElementById('pitch-ai-tactical-text');
    if (tacticalCard && tacticalText) {
      if (state.pitchShowIdeal && idealLineup && idealLineup.tacticalJustification) {
        tacticalText.textContent = idealLineup.tacticalJustification;
        tacticalCard.style.display = 'block';
      } else {
        tacticalCard.style.display = 'none';
      }
    }
  };

  if (!document.startViewTransition) {
    updateDOM();
  } else {
    document.startViewTransition(() => updateDOM());
  }
}

// Country mapping helper for webhooks
const countryToCode = {
  'Argentina': 'ARG',
  'Algeria': 'ALG',
  'Australia': 'AUS',
  'Austria': 'AUT',
  'Arabia Saudita': 'KSA',
  'Belgio': 'BEL',
  'Bosnia ed Erzegovina': 'BIH',
  'Brasile': 'BRA',
  'Canada': 'CAN',
  'Capo Verde': 'CPV',
  'Colombia': 'COL',
  'Corea del Sud': 'KOR',
  'Costa d\'Avorio': 'CIV',
  'Croazia': 'CRO',
  'Curaçao': 'CUW',
  'Ecuador': 'ECU',
  'Egitto': 'EGY',
  'Francia': 'FRA',
  'Germania': 'GER',
  'Ghana': 'GHA',
  'Giappone': 'JPN',
  'Giordania': 'JOR',
  'Haiti': 'HAI',
  'Inghilterra': 'ENG',
  'Iran': 'IRN',
  'Iraq': 'IRQ',
  'Italia': 'ITA',
  'Marocco': 'MAR',
  'Messico': 'MEX',
  'Norvegia': 'NOR',
  'Nuova Zelanda': 'NZL',
  'Paesi Bassi': 'NED',
  'Panama': 'PAN',
  'Paraguay': 'PAR',
  'Portogallo': 'POR',
  'Qatar': 'QAT',
  'Rep. Ceca': 'CZE',
  'Repubblica Democratica del Congo': 'COD',
  'Scozia': 'SCO',
  'Senegal': 'SEN',
  'Spagna': 'ESP',
  'Stati Uniti': 'USA',
  'Sudafrica': 'RSA',
  'Svezia': 'SWE',
  'Svizzera': 'SUI',
  'Tunisia': 'TUN',
  'Turchia': 'TUR',
  'Uruguay': 'URU',
  'Uzbekistan': 'UZB'
};

async function calculateHmacSha256(secret, message) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await window.crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    messageData
  );
  
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
function compileLineupData(team, showIdeal) {
  const module = team.module || '4-3-3';
  const parts = module.split('-').map(x => parseInt(x));
  
  const defNeeded = parts[0] || 4;
  const cenNeeded = parts[1] || 3;
  const attNeeded = parts[2] || 3;
  const porNeeded = 1;

  const idealLineup = state.teamIdealLineups?.[team.id];
  let porStarters, porBench, difStarters, difBench, cenStarters, cenBench, attStarters, attBench;

  if (showIdeal && idealLineup) {
    const startersList = team.players.filter(p => idealLineup.starters.includes(p.id));
    const benchList = team.players.filter(p => idealLineup.bench.includes(p.id));

    porStarters = startersList.filter(p => p.role === 'POR');
    porBench = benchList.filter(p => p.role === 'POR');

    difStarters = startersList.filter(p => p.role === 'DIF');
    difBench = benchList.filter(p => p.role === 'DIF');

    cenStarters = startersList.filter(p => p.role === 'CEN');
    cenBench = benchList.filter(p => p.role === 'CEN');

    attStarters = startersList.filter(p => p.role === 'ATT');
    attBench = benchList.filter(p => p.role === 'ATT');
  } else {
    let porPlayers = team.players.filter(p => p.role === 'POR');
    let difPlayers = team.players.filter(p => p.role === 'DIF');
    let cenPlayers = team.players.filter(p => p.role === 'CEN');
    let attPlayers = team.players.filter(p => p.role === 'ATT');

    if (showIdeal) {
      const getPlayerFormScore = (player) => {
        const cachedRaw = state.aiCache[player.id] || JSON.parse(sessionStorage.getItem(`fantamondiale_ai_${player.id}`) || 'null');
        if (!cachedRaw) return 50;
        const cached = normalizePlayerAnalysis(cachedRaw);
        let score = 50;
        const cat = (cached.playerCategory || '').toLowerCase();
        if (cat.includes('stella')) score += 40;
        else if (cat.includes('ottimo')) score += 30;
        else if (cat.includes('buono')) score += 20;
        else if (cat.includes('accettabile')) score += 10;
        else if (cat.includes('scarso')) score -= 20;
        if (cached.starterProbability) {
          const prob = parseInt(cached.starterProbability.replace(/[^0-9]/g, '')) || 50;
          score += prob * 0.2;
        }
        score += (player.purchaseCost || 0) * 0.1;
        return score;
      };

      porPlayers = [...porPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
      difPlayers = [...difPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
      cenPlayers = [...cenPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
      attPlayers = [...attPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
    }

    porStarters = porPlayers.slice(0, porNeeded);
    porBench = porPlayers.slice(porNeeded);

    difStarters = difPlayers.slice(0, defNeeded);
    difBench = difPlayers.slice(defNeeded);

    cenStarters = cenPlayers.slice(0, cenNeeded);
    cenBench = cenPlayers.slice(cenNeeded);

    attStarters = attPlayers.slice(0, attNeeded);
    attBench = attPlayers.slice(attNeeded);
  }

  let finalBench;
  if (showIdeal && idealLineup) {
    finalBench = idealLineup.bench.map(id => team.players.find(p => p.id === id)).filter(Boolean);
  } else {
    finalBench = [...porBench, ...difBench, ...cenBench, ...attBench];
  }

  const starters = [...porStarters, ...difStarters, ...cenStarters, ...attStarters];
  return { starters, bench: finalBench };
}

function getFriendlyErrorMessage(status, text) {
  if (!text) return `Stato ${status}`;
  
  let trimmed = text.trim();
  let errorContent = trimmed;
  let parsedJson = false;

  // Try parsing JSON
  try {
    const parsed = JSON.parse(trimmed);
    if (parsed.error) {
      errorContent = parsed.error;
      parsedJson = true;
    } else if (parsed.message) {
      errorContent = parsed.message;
      parsedJson = true;
    }
  } catch (e) {
    // Not JSON
  }

  if (typeof errorContent !== 'string') {
    errorContent = String(errorContent);
  }

  errorContent = errorContent.trim();

  // Check if errorContent is HTML
  if (
    errorContent.startsWith('<') ||
    errorContent.includes('<!DOCTYPE') ||
    errorContent.includes('<html') ||
    errorContent.includes('<body') ||
    errorContent.includes('<style') ||
    errorContent.includes('<div')
  ) {
    const titleMatch = errorContent.match(/<title>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      return `${titleMatch[1].trim()} (Codice ${status})`;
    }
    const h1Match = errorContent.match(/<h1>(.*?)<\/h1>/i);
    if (h1Match && h1Match[1]) {
      return `${h1Match[1].trim()} (Codice ${status})`;
    }
    return `Risposta HTML dal server (Codice ${status})`;
  }

  // If it was valid JSON and not HTML, return the API error directly
  if (parsedJson) {
    return errorContent;
  }

  // Truncate plain text if too long
  if (errorContent.length > 100) {
    return `${errorContent.substring(0, 100)}... (Codice ${status})`;
  }

  return `${errorContent} (Codice ${status})`;
}

async function submitRosterWebhook(team) {
  try {
    const porList = team.players.filter(p => p.role === 'POR');
    const difList = team.players.filter(p => p.role === 'DIF');
    const cenList = team.players.filter(p => p.role === 'CEN');
    const attList = team.players.filter(p => p.role === 'ATT');
    
    const players = [];
    
    porList.forEach((p, idx) => {
      if (idx < 4) {
        players.push({
          name: p.name,
          cost: parseInt(p.purchaseCost) || 0,
          role: p.role
        });
      }
    });
    
    difList.forEach((p, idx) => {
      if (idx < 14) {
        players.push({
          name: p.name,
          cost: parseInt(p.purchaseCost) || 0,
          role: p.role
        });
      }
    });
    
    cenList.forEach((p, idx) => {
      if (idx < 14) {
        players.push({
          name: p.name,
          cost: parseInt(p.purchaseCost) || 0,
          role: p.role
        });
      }
    });
    
    attList.forEach((p, idx) => {
      if (idx < 12) {
        players.push({
          name: p.name,
          cost: parseInt(p.purchaseCost) || 0,
          role: p.role
        });
      }
    });

    const payload = {
      type: 'rosa',
      players
    };

    showToast('Invio rosa in corso...', 'info');

    const response = await fetch('/api/submit-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventType: 'rosa',
        payload
      })
    });

    if (response.ok) {
      showToast('Rosa fissa inviata con successo! ✅', 'success');
    } else {
      const errText = await response.text();
      showToast(`Errore invio rosa: ${getFriendlyErrorMessage(response.status, errText)}`, 'danger');
    }
  } catch (error) {
    console.error('Webhook error:', error);
    showToast(`Errore: ${getFriendlyErrorMessage(500, error.message || error)}`, 'danger');
  }
}

async function submitFormationWebhook(team, showIdeal, round) {
  try {
    const { starters, bench } = compileLineupData(team, showIdeal);
    
    const actualBench = bench.slice(0, 10);
    const formationList = [...starters, ...actualBench];
    const formationObjects = formationList.map(p => {
      return {
        name: p.name,
        cost: parseInt(p.purchaseCost) || 0
      };
    });

    const payload = {
      type: 'formazione',
      round: round,
      formation: formationObjects
    };

    showToast(`Invio formazione (${round}) in corso...`, 'info');

    const response = await fetch('/api/submit-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventType: 'formazione',
        payload
      })
    });

    if (response.ok) {
      showToast('Formazione inviata con successo! ✅', 'success');
    } else {
      const errText = await response.text();
      showToast(`Errore invio formazione: ${getFriendlyErrorMessage(response.status, errText)}`, 'danger');
    }
  } catch (error) {
    console.error('Webhook error:', error);
    showToast(`Errore: ${getFriendlyErrorMessage(500, error.message || error)}`, 'danger');
  }
}

function showTeamPitch(teamId, showIdeal = false) {
  const team = state.teams.find(t => t.id === teamId);
  if (!team) return;

  state.activePitchTeamId = teamId;
  state.pitchShowIdeal = showIdeal;
  dom.pitchModuleSelect.value = team.module || '4-3-3';
  
  // Set modal title dynamically
  const pitchTitleEl = document.getElementById('pitchTitle');
  if (pitchTitleEl) {
    pitchTitleEl.innerHTML = showIdeal ? 'Formazione Ideale IA 📈🔮' : 'Formazione in Campo ⚽';
  }

  // Generate action buttons dynamically
  const buttonsWrapper = document.getElementById('pitch-action-buttons-wrapper');
  if (buttonsWrapper) {
    buttonsWrapper.innerHTML = '';
    
    // Create first row for normal pitch controls
    const mainControlsRow = document.createElement('div');
    mainControlsRow.style.display = 'flex';
    mainControlsRow.style.gap = '0.5rem';
    mainControlsRow.style.flexWrap = 'wrap';
    mainControlsRow.style.width = '100%';
    
    // Add Copy Lineup button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-secondary';
    copyBtn.style.padding = '0.4rem 0.8rem';
    copyBtn.style.fontSize = '0.75rem';
    copyBtn.style.display = 'flex';
    copyBtn.style.alignItems = 'center';
    copyBtn.style.gap = '0.35rem';
    copyBtn.innerHTML = '📋 Copia Formazione';
    copyBtn.onclick = () => copyLineupToClipboard(team, showIdeal);
    mainControlsRow.appendChild(copyBtn);

    // If showing Ideal, add AI buttons inside the formation screen
    if (showIdeal) {
      // 1. Ricalcolo Giocatori button
      const recalcPlayersBtn = document.createElement('button');
      recalcPlayersBtn.className = 'btn';
      recalcPlayersBtn.style.padding = '0.4rem 0.8rem';
      recalcPlayersBtn.style.fontSize = '0.75rem';
      recalcPlayersBtn.style.display = 'flex';
      recalcPlayersBtn.style.alignItems = 'center';
      recalcPlayersBtn.style.gap = '0.35rem';
      recalcPlayersBtn.style.background = 'rgba(168, 85, 247, 0.15)';
      recalcPlayersBtn.style.borderColor = 'rgba(168, 85, 247, 0.4)';
      recalcPlayersBtn.style.color = '#fff';
      recalcPlayersBtn.innerHTML = 'Ricalcolo giocatori 🔄';
      recalcPlayersBtn.onclick = () => recalculatePlayerEvaluations(team);
      mainControlsRow.appendChild(recalcPlayersBtn);

      // 2. Formazione AI button
      const aiLineupBtn = document.createElement('button');
      aiLineupBtn.className = 'btn btn-team-ai-sparkle';
      aiLineupBtn.style.padding = '0.4rem 0.8rem';
      aiLineupBtn.style.fontSize = '0.75rem';
      aiLineupBtn.style.display = 'flex';
      aiLineupBtn.style.alignItems = 'center';
      aiLineupBtn.style.gap = '0.35rem';
      aiLineupBtn.style.background = 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)';
      aiLineupBtn.style.borderColor = 'rgba(168, 85, 247, 0.4)';
      aiLineupBtn.style.color = '#fff';
      aiLineupBtn.innerHTML = 'Formazione AI 🔮';
      aiLineupBtn.onclick = () => generateIdealLineup(team);
      mainControlsRow.appendChild(aiLineupBtn);
    }
    buttonsWrapper.appendChild(mainControlsRow);

    // Create second row/container for webhooks
    const webhookContainer = document.createElement('div');
    webhookContainer.className = 'webhook-container';
    webhookContainer.style.display = 'flex';
    webhookContainer.style.alignItems = 'center';
    webhookContainer.style.gap = '0.5rem';
    webhookContainer.style.flexWrap = 'wrap';
    webhookContainer.style.marginTop = '0.5rem';
    webhookContainer.style.paddingTop = '0.5rem';
    webhookContainer.style.borderTop = '1px dashed var(--border-light)';
    webhookContainer.style.width = '100%';

    // Round Selector
    const roundLabel = document.createElement('label');
    roundLabel.style.fontSize = '0.75rem';
    roundLabel.style.fontWeight = '700';
    roundLabel.style.color = 'var(--color-text-muted)';
    roundLabel.innerText = 'TURNO:';
    webhookContainer.appendChild(roundLabel);

    const roundSelect = document.createElement('select');
    roundSelect.className = 'input-control';
    roundSelect.style.width = '100px';
    roundSelect.style.padding = '0.25rem 0.5rem';
    roundSelect.style.fontSize = '0.75rem';
    roundSelect.style.borderRadius = '4px';
    roundSelect.style.height = '30px';
    
    const rounds = ['G1', 'G2', 'G3', 'Sedicesimi', 'Ottavi', 'Quarti', 'Semifinale', 'Finale'];
    rounds.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r;
      opt.innerText = r;
      if (r === (state.activeRound || 'G1')) {
        opt.selected = true;
      }
      roundSelect.appendChild(opt);
    });
    roundSelect.onchange = (e) => {
      state.activeRound = e.target.value;
    };
    webhookContainer.appendChild(roundSelect);

    // Button Invio Rosa Fissa
    const rosaBtn = document.createElement('button');
    rosaBtn.className = 'btn btn-primary';
    rosaBtn.style.padding = '0.4rem 0.8rem';
    rosaBtn.style.fontSize = '0.75rem';
    rosaBtn.style.height = '30px';
    rosaBtn.style.display = 'flex';
    rosaBtn.style.alignItems = 'center';
    rosaBtn.style.gap = '0.35rem';
    rosaBtn.innerHTML = '📤 Invio Rosa Fissa';
    rosaBtn.onclick = () => submitRosterWebhook(team);
    webhookContainer.appendChild(rosaBtn);

    // Button Invio Formazione
    const formationBtn = document.createElement('button');
    formationBtn.className = 'btn btn-success';
    formationBtn.style.padding = '0.4rem 0.8rem';
    formationBtn.style.fontSize = '0.75rem';
    formationBtn.style.height = '30px';
    formationBtn.style.display = 'flex';
    formationBtn.style.alignItems = 'center';
    formationBtn.style.gap = '0.35rem';
    formationBtn.style.background = 'var(--color-success)';
    formationBtn.style.borderColor = 'var(--color-success)';
    formationBtn.innerHTML = '📤 Invio Formazione';
    formationBtn.onclick = () => submitFormationWebhook(team, showIdeal, roundSelect.value);
    webhookContainer.appendChild(formationBtn);

    buttonsWrapper.appendChild(webhookContainer);
  }

  renderPitch();
  document.getElementById('pitch-dialog').showModal();

  // If showing Ideal for the first time and we have players, automatically trigger recalculate
  if (showIdeal && (!state.teamIdealLineups || !state.teamIdealLineups[team.id]) && team.players.length > 0) {
    generateIdealLineup(team);
  }
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

  // Sanitize message to strip style, script, and link elements to prevent style bleeding/injection
  let safeMessage = message;
  if (typeof safeMessage === 'string') {
    safeMessage = safeMessage
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
      .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
      .replace(/<link[^>]*>/gi, '');
  }

  dom.toast.innerHTML = `
    ${iconHtml}
    <span>${safeMessage}</span>
  `;

  setTimeout(() => {
    dom.toast.classList.remove('show');
  }, 4000);
}

// --- CLOUD STORAGE IMPLEMENTATION ---

let cloudSessionsCatalog = []; // Cache list of sessions metadata globally inside file
let cloudPasswordFailedAttempts = {}; // Track failed password attempts (max 4)

async function openCloudSaveModal() {
  if (!dom.cloudSaveDialog) return;

  // Clear password input
  if (dom.cloudSavePassword) dom.cloudSavePassword.value = '';

  // Pre-fill today's date if empty or not set
  if (dom.cloudSaveDate && !dom.cloudSaveDate.value) {
    dom.cloudSaveDate.value = new Date().toISOString().substring(0, 10);
  }

  // Pre-fill last used author from local storage
  const lastAuthor = localStorage.getItem('fantamondiale_last_author');
  if (dom.cloudSaveAuthor && lastAuthor) {
    dom.cloudSaveAuthor.value = lastAuthor;
  }

  // Show temporary loading in save dialog mode dropdown
  if (dom.cloudSaveMode) {
    dom.cloudSaveMode.innerHTML = `
      <option value="new">-- Crea Nuova Sessione --</option>
      <option disabled>Caricamento sessioni...</option>
    `;
  }

  dom.cloudSaveDialog.showModal();

  try {
    const response = await fetch('/api/load');
    if (!response.ok) throw new Error('Failed to load session list');
    
    cloudSessionsCatalog = await response.json();
    
    if (dom.cloudSaveMode) {
      let optionsHtml = `<option value="new">-- Crea Nuova Sessione --</option>`;
      if (Array.isArray(cloudSessionsCatalog)) {
        cloudSessionsCatalog.forEach(s => {
          optionsHtml += `<option value="${s.id}" ${state.activeCloudSessionId === s.id ? 'selected' : ''}>Sovrascrivi: ${s.title} (${s.author})</option>`;
        });
      }
      dom.cloudSaveMode.innerHTML = optionsHtml;
      
      // Trigger change event to prefill if a session was pre-selected
      handleSaveModeChange();
    }
  } catch (error) {
    console.error(error);
    if (dom.cloudSaveMode) {
      dom.cloudSaveMode.innerHTML = `
        <option value="new">-- Crea Nuova Sessione --</option>
        <option disabled style="color: var(--color-danger)">Errore caricamento lista</option>
      `;
    }
  }
}

function handleSaveModeChange() {
  if (!dom.cloudSaveMode) return;
  const mode = dom.cloudSaveMode.value;

  if (mode === 'new') {
    if (dom.cloudSaveTitle) dom.cloudSaveTitle.value = '';
    if (dom.cloudSaveDate) dom.cloudSaveDate.value = new Date().toISOString().substring(0, 10);
    if (dom.cloudSavePasswordLabel) dom.cloudSavePasswordLabel.innerHTML = 'Imposta Password della Sessione (obbligatoria)';
    if (dom.cloudSavePassword) {
      dom.cloudSavePassword.value = '';
      dom.cloudSavePassword.placeholder = 'Digita una nuova password';
    }
  } else {
    const selectedSession = cloudSessionsCatalog.find(s => s.id === mode);
    if (selectedSession) {
      if (dom.cloudSaveTitle) dom.cloudSaveTitle.value = selectedSession.title;
      if (dom.cloudSaveAuthor) dom.cloudSaveAuthor.value = selectedSession.author;
      if (dom.cloudSaveDate) dom.cloudSaveDate.value = selectedSession.date;
    }
    if (dom.cloudSavePasswordLabel) dom.cloudSavePasswordLabel.innerHTML = 'Password Sessione (richiesta per sovrascrivere)';
    if (dom.cloudSavePassword) {
      // Prefill with active session password if it's the current session, to avoid having to re-type it
      dom.cloudSavePassword.value = (mode === state.activeCloudSessionId) ? (state.cloudSessionPassword || '') : '';
      dom.cloudSavePassword.placeholder = 'Inserisci password esistente';
    }
  }
}

async function confirmCloudSave() {
  const title = dom.cloudSaveTitle?.value?.trim();
  const author = dom.cloudSaveAuthor?.value?.trim();
  const date = dom.cloudSaveDate?.value;
  const mode = dom.cloudSaveMode?.value || 'new';
  const password = dom.cloudSavePassword?.value || '';

  if (!title || !author || !date) {
    showToast('Compila tutti i campi obbligatori (Titolo, Autore e Data)!', 'warning');
    return;
  }

  if (!password) {
    if (mode === 'new') {
      showToast('Imposta una password per proteggere questa nuova sessione!', 'warning');
    } else {
      showToast('Inserisci la password corretta per poter sovrascrivere la sessione!', 'warning');
    }
    return;
  }

  const originalText = dom.btnCloudSaveConfirm.innerHTML;
  try {
    dom.btnCloudSaveConfirm.disabled = true;
    dom.btnCloudSaveConfirm.innerHTML = `Salvataggio in corso...`;

    const metadata = {
      id: mode === 'new' ? null : mode,
      title: title,
      author: author,
      date: date
    };

    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        metadata: metadata,
        password: password,
        state: {
          settings: state.settings,
          teams: state.teams,
          players: state.players,
          teamIdealLineups: state.teamIdealLineups || {},
          tournament: state.tournament || null
        }
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || 'Errore durante il salvataggio');
    }

    // Save author for next pre-fills
    localStorage.setItem('fantamondiale_last_author', author);
    
    // Set active session ID and metadata
    state.activeCloudSessionId = result.id;
    state.cloudSessionPassword = password; // Store active password in memory
    state.activeCloudSessionMetadata = result.session;
    localStorage.setItem('fantamondiale_last_cloud_session_id', result.id);
    localStorage.setItem('fantamondiale_last_cloud_session_password', password);

    showToast('Sessione d\'asta salvata con successo sul Cloud Redis! ☁️', 'success');
    if (dom.cloudSaveDialog) dom.cloudSaveDialog.close();
  } catch (error) {
    console.error(error);
    showToast(error.message, 'danger');
  } finally {
    dom.btnCloudSaveConfirm.disabled = false;
    dom.btnCloudSaveConfirm.innerHTML = originalText;
  }
}

async function handleCloudDropdownHover() {
  if (!dom.cloudLoadDropdownList) return;

  try {
    dom.cloudLoadDropdownList.innerHTML = `<div class="dropdown-item-placeholder">Caricamento in corso...</div>`;
    
    const response = await fetch('/api/load');
    if (!response.ok) throw new Error('Failed to load sessions');
    
    const sessions = await response.json();
    cloudSessionsCatalog = sessions; // Sync local catalog cache
    
    if (!Array.isArray(sessions) || sessions.length === 0) {
      dom.cloudLoadDropdownList.innerHTML = `<div class="dropdown-item-placeholder">Nessuna sessione salvata</div>`;
      return;
    }

    let itemsHtml = '';
    sessions.forEach(s => {
      itemsHtml += `
        <div class="dropdown-item-session" onclick="loadSpecificCloudSession('${s.id}')">
          <div class="dropdown-item-title">${s.title}</div>
          <div class="dropdown-item-meta">
            <span>Autore: <strong>${s.author}</strong></span>
            <span>${s.date}</span>
          </div>
        </div>
      `;
    });
    dom.cloudLoadDropdownList.innerHTML = itemsHtml;
  } catch (error) {
    console.error(error);
    dom.cloudLoadDropdownList.innerHTML = `<div class="dropdown-item-placeholder" style="color: var(--color-danger);">Errore di connessione</div>`;
  }
}

async function openCloudLoadModal() {
  if (!dom.cloudLoadDialog || !dom.cloudLoadListContainer) return;

  dom.cloudLoadListContainer.innerHTML = `<div class="dropdown-item-placeholder">Caricamento elenco in corso...</div>`;
  dom.cloudLoadDialog.showModal();

  try {
    const response = await fetch('/api/load');
    if (!response.ok) throw new Error('Failed to load session catalog');
    
    const sessions = await response.json();
    cloudSessionsCatalog = sessions; // Sync local catalog cache
    
    renderCloudLoadCatalogTable(sessions);
  } catch (error) {
    console.error(error);
    dom.cloudLoadListContainer.innerHTML = `<div class="dropdown-item-placeholder" style="color: var(--color-danger)">Impossibile caricare il catalogo delle sessioni cloud.</div>`;
  }
}

function renderCloudLoadCatalogTable(sessions) {
  if (!dom.cloudLoadListContainer) return;

  if (!Array.isArray(sessions) || sessions.length === 0) {
    dom.cloudLoadListContainer.innerHTML = `<div class="dropdown-item-placeholder">Nessuna sessione salvata su Upstash Redis.</div>`;
    return;
  }

  let tableHtml = `
    <table class="cloud-table">
      <thead>
        <tr>
          <th>Titolo Sessione</th>
          <th>Autore</th>
          <th style="width: 100px;">Data</th>
          <th style="text-align: right; width: 180px;">Azioni</th>
        </tr>
      </thead>
      <tbody>
  `;

  sessions.forEach(s => {
    tableHtml += `
      <tr>
        <td style="font-weight: 700; color: var(--color-primary);">${s.title}</td>
        <td style="font-weight: 600;">${s.author}</td>
        <td>${s.date}</td>
        <td style="text-align: right;">
          <button class="btn" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); border-color: rgba(13, 148, 136, 0.3); margin-right: 0.35rem;" onclick="loadSpecificCloudSession('${s.id}')">
            Carica 📥
          </button>
          <button class="btn btn-danger" style="padding: 0.25rem 0.5rem; font-size: 0.7rem;" onclick="deleteSpecificCloudSession('${s.id}')">
            Elimina 🗑️
          </button>
        </td>
      </tr>
    `;
  });

  tableHtml += `
      </tbody>
    </table>
  `;
  dom.cloudLoadListContainer.innerHTML = tableHtml;
}

function promptCloudPassword(id, skipCache = false) {
  return new Promise((resolve) => {
    if (!skipCache) {
      // If the requested id is the active one and we already have the password in memory, use it!
      if (state.activeCloudSessionId === id && state.cloudSessionPassword) {
        resolve(state.cloudSessionPassword);
        return;
      }
      
      // Also check if there's a cached password in local storage for this session ID
      const lastCachedId = localStorage.getItem('fantamondiale_last_cloud_session_id');
      const lastCachedPwd = localStorage.getItem('fantamondiale_last_cloud_session_password');
      if (lastCachedId === id && lastCachedPwd) {
        resolve(lastCachedPwd);
        return;
      }
    }

    const dlg = document.getElementById('cloud-password-prompt-dialog');
    const input = document.getElementById('cloud-prompt-password-input');
    const confirmBtn = document.getElementById('btn-cloud-password-prompt-confirm');

    if (!dlg || !input || !confirmBtn) {
      resolve(null);
      return;
    }

    input.value = '';
    dlg.showModal();
    input.focus();

    const handleConfirm = () => {
      const pwd = input.value;
      dlg.close();
      cleanup();
      resolve(pwd);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleConfirm();
      }
    };

    const handleClose = () => {
      cleanup();
      resolve(null);
    };

    const cleanup = () => {
      confirmBtn.removeEventListener('click', handleConfirm);
      input.removeEventListener('keypress', handleKeyPress);
      dlg.removeEventListener('close', handleClose);
    };

    confirmBtn.addEventListener('click', handleConfirm);
    input.addEventListener('keypress', handleKeyPress);
    dlg.addEventListener('close', handleClose);
  });
}

async function loadSpecificCloudSession(id, skipConfirm = false) {
  if (!skipConfirm && !confirm('Sei sicuro di voler caricare questa sessione dal Cloud? Sostituirà la sessione d\'asta corrente.')) {
    return;
  }

  // Enforce 4 attempt limit (bypass for administrator)
  const attempts = cloudPasswordFailedAttempts[id] || 0;
  if (attempts >= 4 && !state.isAdmin) {
    showToast('Hai superato il limite di 4 tentativi per questa sessione. Accesso bloccato! 🔒', 'danger');
    if (!state.activeCloudSessionId) {
      openStartupDialog();
    }
    return;
  }

  // If currently logged in as admin, automatically use the admin credentials to bypass the session password prompt
  let password = state.cloudSessionPassword;
  if (!state.isAdmin) {
    password = await promptCloudPassword(id, true);
  }
  if (password === null) {
    if (!state.activeCloudSessionId) {
      openStartupDialog();
    }
    return;
  }

  try {
    const response = await fetch(`/api/load?id=${id}&password=${encodeURIComponent(password)}`);
    const result = await response.json();

    if (!response.ok) {
      if (!state.isAdmin) {
        cloudPasswordFailedAttempts[id] = (cloudPasswordFailedAttempts[id] || 0) + 1;
        const remaining = 4 - cloudPasswordFailedAttempts[id];
        
        if (cloudPasswordFailedAttempts[id] >= 4) {
          showToast('Hai inserito una password errata per 4 volte. Accesso bloccato! 🔒', 'danger');
          localStorage.removeItem('fantamondiale_last_cloud_session_password');
          if (state.activeCloudSessionId === id) {
            state.cloudSessionPassword = null;
          }
          if (!state.activeCloudSessionId) {
            openStartupDialog();
          }
          return;
        }
        
        showToast(`${result.error || 'Errore durante il caricamento.'} Rimangono ${remaining} tentativi.`, 'danger');
        
        // Re-prompt on invalid password so they can try again
        setTimeout(() => {
          // Clear memory cache so they actually get prompted again
          if (state.activeCloudSessionId === id) {
            state.cloudSessionPassword = null;
          }
          localStorage.removeItem('fantamondiale_last_cloud_session_password');
          loadSpecificCloudSession(id, skipConfirm);
        }, 500);
      } else {
        showToast(`Errore caricamento admin: ${result.error || 'Errore durante il caricamento.'}`, 'danger');
      }
      return;
    }

    // Load state
    cloudPasswordFailedAttempts[id] = 0; // Reset counter on success!
    state.settings = result.settings;
    state.teams = result.teams;
    state.teams.forEach(t => {
      if (!t.module) t.module = '4-3-3';
    });
    state.players = result.players;
    state.teamIdealLineups = result.teamIdealLineups || {};
    state.tournament = result.tournament || null;
    state.activeCloudSessionId = id;
    state.cloudSessionPassword = password;

    // Cache metadata from catalog or create a fallback
    const selectedSession = cloudSessionsCatalog.find(s => s.id === id);
    if (selectedSession) {
      state.activeCloudSessionMetadata = {
        id: id,
        title: selectedSession.title,
        author: selectedSession.author,
        date: selectedSession.date
      };
    } else {
      state.activeCloudSessionMetadata = {
        id: id,
        title: "Sessione Ripristinata",
        author: localStorage.getItem('fantamondiale_last_author') || "FantaIA",
        date: new Date().toISOString().substring(0, 10)
      };
    }
    localStorage.setItem('fantamondiale_last_cloud_session_id', id);
    localStorage.setItem('fantamondiale_last_cloud_session_password', password);

    // Fill config inputs in settings tab
    dom.configBudget.value = state.settings.budget;
    if (dom.configSlotPOR) dom.configSlotPOR.value = state.settings.slots.POR;
    if (dom.configSlotDIF) dom.configSlotDIF.value = state.settings.slots.DIF;
    if (dom.configSlotCEN) dom.configSlotCEN.value = state.settings.slots.CEN;
    if (dom.configSlotATT) dom.configSlotATT.value = state.settings.slots.ATT;
    dom.teamListInput.value = state.teams.map(t => t.name).join('\n');

    // Restore AI settings
    if (dom.configAIProvider) dom.configAIProvider.value = state.settings.aiProvider || 'google';
    if (dom.configOpenRouterModel) dom.configOpenRouterModel.value = state.settings.openRouterModel || 'openai/gpt-oss-120b:free';
    if (dom.configGeminiModel) dom.configGeminiModel.value = state.settings.geminiModel || 'gemini-flash-lite-latest';
    const isOR = (state.settings.aiProvider || 'google') === 'openrouter';
    const divORModel = document.getElementById('div-openrouter-model');
    if (divORModel) divORModel.style.display = isOR ? 'block' : 'none';
    const divGeminiModel = document.getElementById('div-gemini-model');
    if (divGeminiModel) divGeminiModel.style.display = isOR ? 'none' : 'block';

    if (state.teams.length > 0) {
      state.activeTeamId = state.teams[0].id;
    } else {
      state.activeTeamId = null;
    }

    autoSave();
    renderAll();
    
    // Close open cloud dialogs if any
    if (dom.cloudSaveDialog) dom.cloudSaveDialog.close();
    if (dom.cloudLoadDialog) dom.cloudLoadDialog.close();

    showToast('Sessione d\'asta ripristinata con successo dal Cloud! ☁️', 'success');
  } catch (error) {
    console.error(error);
    showToast(error.message, 'danger');
    if (!state.activeCloudSessionId) {
      openStartupDialog();
    }
  }
}

async function deleteSpecificCloudSession(id) {
  const selectedSession = cloudSessionsCatalog.find(s => s.id === id);
  const sessionName = selectedSession ? `"${selectedSession.title}"` : 'questa sessione';

  if (!confirm(`Sei sicuro di voler eliminare definitivamente ${sessionName} dal Cloud? L'operazione non è reversibile.`)) {
    return;
  }

  // Enforce attempts check for deletion as well (bypass for administrator)
  const attempts = cloudPasswordFailedAttempts[id] || 0;
  if (attempts >= 4 && !state.isAdmin) {
    showToast('Hai superato il limite di 4 tentativi per questa sessione. Operazione bloccata! 🔒', 'danger');
    return;
  }

  // If currently logged in as admin, automatically use the admin credentials to bypass the session password prompt
  let password = state.cloudSessionPassword;
  if (!state.isAdmin) {
    password = await promptCloudPassword(id, true);
  }
  if (password === null) {
    return;
  }

  try {
    const response = await fetch(`/api/delete?id=${id}&password=${encodeURIComponent(password)}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    if (!response.ok) {
      if (!state.isAdmin) {
        cloudPasswordFailedAttempts[id] = (cloudPasswordFailedAttempts[id] || 0) + 1;
        const remaining = 4 - cloudPasswordFailedAttempts[id];
        if (cloudPasswordFailedAttempts[id] >= 4) {
          showToast('Troppi tentativi falliti. Operazione bloccata! 🔒', 'danger');
          return;
        }
        throw new Error(`${result.error || 'Impossibile eliminare la sessione.'} Rimangono ${remaining} tentativi.`);
      } else {
        showToast(`Errore rimozione admin: ${result.error || 'Errore durante la rimozione.'}`, 'danger');
        return;
      }
    }

    // Success! Reset counter
    cloudPasswordFailedAttempts[id] = 0;

    // Clear active ID if we deleted the currently active session
    if (state.activeCloudSessionId === id) {
      state.activeCloudSessionId = null;
      state.cloudSessionPassword = null;
      state.activeCloudSessionMetadata = null;
      localStorage.removeItem('fantamondiale_last_cloud_session_id');
      localStorage.removeItem('fantamondiale_last_cloud_session_password');
      // Reopen onboarding startup dialog
      openStartupDialog();
    }

    // Update catalog cache and re-render catalog table in modal
    cloudSessionsCatalog = cloudSessionsCatalog.filter(s => s.id !== id);
    renderCloudLoadCatalogTable(cloudSessionsCatalog);
    
    // Refresh dropdown as well
    handleCloudDropdownHover();

    showToast('Sessione rimossa con successo dal Cloud Redis! 🗑️', 'warning');
  } catch (error) {
    console.error(error);
    showToast(error.message, 'danger');
  }
}

async function loginAsAdmin() {
  const attempts = cloudPasswordFailedAttempts['admin_login'] || 0;
  if (attempts >= 4) {
    showToast('Hai superato il limite di 4 tentativi per l\'amministratore. Accesso bloccato! 🔒', 'danger');
    return;
  }

  // Hide startup dialog temporarily
  const startupDlg = document.getElementById('startup-cloud-dialog');
  if (startupDlg) startupDlg.close();

  // Ask for password using promptCloudPassword with ID 'admin_login'
  const password = await promptCloudPassword('admin_login');
  if (password === null) {
    // If they cancel, open startup dialog again
    openStartupDialog();
    return;
  }

  try {
    const response = await fetch(`/api/load?id=admin_verify&password=${encodeURIComponent(password)}`);
    const result = await response.json();

    if (!response.ok) {
      cloudPasswordFailedAttempts['admin_login'] = (cloudPasswordFailedAttempts['admin_login'] || 0) + 1;
      const remaining = 4 - cloudPasswordFailedAttempts['admin_login'];
      
      if (cloudPasswordFailedAttempts['admin_login'] >= 4) {
        showToast('Hai inserito una password errata per 4 volte. Accesso bloccato! 🔒', 'danger');
        return;
      }

      showToast(`Password errata. Rimangono ${remaining} tentativi.`, 'danger');
      setTimeout(() => {
        loginAsAdmin();
      }, 500);
      return;
    }

    // Success!
    cloudPasswordFailedAttempts['admin_login'] = 0;
    state.cloudSessionPassword = password; // Set admin password in memory
    state.isAdmin = true;
    localStorage.setItem('fantamondiale_is_admin', 'true');
    localStorage.setItem('fantamondiale_last_cloud_session_password', password); // Persist password
    if (dom.btnManageCloudSessions) dom.btnManageCloudSessions.style.display = 'block';

    showToast('Accesso Amministratore eseguito con successo! 👑 Gestisci tutte le sessioni.', 'success');
    
    renderAll();
    // Open manage sessions modal directly so the admin can start editing/deleting!
    openCloudLoadModal();
  } catch (error) {
    console.error(error);
    showToast(error.message, 'danger');
    openStartupDialog();
  }
}

function logoutCloudSession() {
  if (state.activeCloudSessionId) {
    if (!confirm('Sei sicuro di voler uscire da questa sessione cloud? Eventuali modifiche non salvate in cloud o scaricate su file andranno perse.')) {
      return;
    }
  }

  // Clear memory credentials
  state.activeCloudSessionId = null;
  state.cloudSessionPassword = null;
  state.activeCloudSessionMetadata = null;
  
  // Clear admin status as well on logout
  state.isAdmin = false;
  localStorage.removeItem('fantamondiale_is_admin');
  if (dom.btnManageCloudSessions) dom.btnManageCloudSessions.style.display = 'none';

  // Clear local storage cache
  localStorage.removeItem('fantamondiale_last_cloud_session_id');
  localStorage.removeItem('fantamondiale_last_cloud_session_password');

  // Trigger DOM updates
  renderAll();
  showToast('Sessione cloud disconnessa con successo! 🔓', 'success');

  // Reopen startup choices dialog onboarding modal
  openStartupDialog();
}

// --- RICH FORMATION PLAYER TOOLTIP / POPOVER LOGIC ---
let activePitchPopover = null;

function closePitchPopover() {
  if (activePitchPopover) {
    activePitchPopover.remove();
    activePitchPopover = null;
    document.body.classList.remove('ai-modal-open');
  }
}

function positionPitchPopover(popover, triggerEl) {
  const dialogEl = document.getElementById('pitch-dialog');
  if (!dialogEl) return;
  const dialogRect = dialogEl.getBoundingClientRect();

  const dialogWidth = dialogRect.width;
  const dialogHeight = dialogRect.height;
  
  // Center popover inside the dialog window on desktop
  const popoverWidth = 320; 
  const popoverHeight = popover.offsetHeight || 380; 

  const left = (dialogWidth - popoverWidth) / 2;
  const top = (dialogHeight - popoverHeight) / 2;

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
  popover.style.width = `${popoverWidth}px`;
}

function renderPitchPopoverLoading(popover, name, isMobile) {
  const closeBtnHtml = `<button class="pitch-popover-close" onclick="closePitchPopover()">✕</button>`;
  popover.innerHTML = `
    ${closeBtnHtml}
    <div style="font-size:0.75rem; font-weight:700; color:#fff; margin-bottom: 0.65rem;">
      Caricamento dati IA per <span style="color:#c084fc;">${name}</span>...
    </div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 35px; border-radius: 8px;"></div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 35px; border-radius: 8px; margin-top: 0.5rem;"></div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 50px; border-radius: 8px; margin-top: 0.5rem;"></div>
  `;
}

function renderPitchPopoverError(popover, errorMsg) {
  popover.innerHTML = `
    <button class="pitch-popover-close" onclick="closePitchPopover()">✕</button>
    <div style="font-size: 0.75rem; font-weight: 700; color: var(--color-danger); margin-bottom: 0.5rem;">Errore di Caricamento ❌</div>
    <p style="font-size:0.65rem; color:#fff; margin:0; line-height:1.4;">${errorMsg}</p>
  `;
}

function renderPitchPopoverData(popover, name, country, role, rawData, triggerEl, isMobile) {
  const data = normalizePlayerAnalysis(rawData);
  const closeBtnHtml = `<button class="pitch-popover-close" onclick="closePitchPopover()">✕</button>`;

  const strength = parseInt(data.matchStrength) || 50;
  let strengthColor = '#f43f5e';
  let strengthBg = 'rgba(244, 63, 94, 0.12)';
  let strengthBorder = 'rgba(244, 63, 94, 0.3)';
  if (strength >= 80) {
    strengthColor = '#10b981';
    strengthBg = 'rgba(16, 185, 129, 0.12)';
    strengthBorder = 'rgba(16, 185, 129, 0.3)';
  } else if (strength >= 50) {
    strengthColor = '#f59e0b';
    strengthBg = 'rgba(245, 158, 11, 0.12)';
    strengthBorder = 'rgba(245, 158, 11, 0.3)';
  }

  let alternativesHtml = '';
  const selfProbability = data.starterProbability || '50%';
  const selfRowHtml = `
    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.68rem; margin-bottom: 0.25rem; background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2); padding: 0.25rem 0.40rem; border-radius: 4px;">
      <span style="color: #c084fc; font-weight: 700;">⭐ ${name} (Analizzato)</span>
      <span style="color: #10b981; font-weight: 800;">Titolare: ${selfProbability}</span>
    </div>
  `;

  let itemsHtml = '';
  if (data.alternatives && Array.isArray(data.alternatives) && data.alternatives.length > 0) {
    itemsHtml = data.alternatives.map(alt => `
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.68rem; margin-bottom: 0.2rem; background: rgba(255, 255, 255, 0.02); padding: 0.2rem 0.4rem; border-radius: 4px;">
        <span style="color: #fff; font-weight: 500;">🔄 ${alt.name}</span>
        <span style="color: #ef4444; font-weight: 700;">Impiego: ${alt.playProbability}</span>
      </div>
    `).join('');
  }

  const commentHtml = data.roleCompetitionComment ? `
    <div style="font-size: 0.65rem; color: #fff; font-weight: 500; line-height: 1.4; padding: 0.45rem 0.55rem; background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--color-primary); margin-top: 0.4rem; border-radius: 4px; border-top-left-radius: 0; border-bottom-left-radius: 0;">
      ${data.roleCompetitionComment}
    </div>
  ` : '';

  alternativesHtml = `
    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 8px; padding: 0.4rem 0.5rem; margin-bottom: 0.5rem;">
      <span style="display: block; font-size: 0.6rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em; margin-bottom: 0.25rem;">Ballottaggi & Competizione di Ruolo 🔄</span>
      ${selfRowHtml}
      ${itemsHtml}
      ${commentHtml}
    </div>
  `;


  popover.innerHTML = `
    ${closeBtnHtml}
    
    <div style="font-size: 0.8rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between; padding-right: 1.5rem; flex-wrap: wrap; gap: 0.25rem;">
      <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 130px;">${name}</span>
      <div style="display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0;">
        <button class="pitch-popover-refresh" style="background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.4); color: #c084fc; cursor: pointer; padding: 0.1rem 0.35rem; font-size: 0.58rem; font-weight: 800; border-radius: 4px; display: flex; align-items: center; gap: 0.15rem; transition: all 0.2s;" onmouseover="this.style.background='rgba(168, 85, 247, 0.25)'" onmouseout="this.style.background='rgba(168, 85, 247, 0.15)'" title="Forza ricalcolo dati freschi IA">🔄 Aggiorna</button>
        <span style="font-size: 0.65rem; color: var(--color-text-muted); font-weight: 600;">${role} | ${country}</span>
      </div>
    </div>



    <!-- Next Match Analysis -->
    <div style="background: rgba(239, 68, 68, 0.03); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 8px; padding: 0.4rem 0.5rem; margin-bottom: 0.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
        <span style="font-size: 0.6rem; color: #f43f5e; text-transform: uppercase; font-weight: 800; letter-spacing: 0.04em;">Prossimo Match ⚔️</span>
        <span style="font-size: 0.68rem; font-weight: 800; color: #f43f5e; text-transform: uppercase;">vs ${data.matchAnalysis?.nextOpponent || 'Da verificare'}</span>
      </div>
      <p style="margin: 0; font-size: 0.65rem; line-height: 1.35; color: #fff; font-weight: 500;">
        ${data.matchAnalysis?.criteriaText || 'Analisi del match non disponibile.'}
      </p>
    </div>

    <!-- Form State -->
    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 8px; padding: 0.4rem 0.5rem; margin-bottom: 0.5rem;">
      <span style="display:block; margin-bottom:0.15rem; font-size: 0.6rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em;">Stato di Forma (Settimana) 📈</span>
      <p style="margin: 0; font-size: 0.65rem; line-height: 1.35; color: #fff; font-weight: 500;">
        ${data.formState || 'Nessuna notizia recente.'}
      </p>
    </div>

    <!-- Expected Bonuses -->
    <div style="background: rgba(168, 85, 247, 0.04); border: 1px dashed rgba(168, 85, 247, 0.25); border-radius: 8px; padding: 0.4rem 0.5rem; margin-bottom: 0.5rem; font-size: 0.65rem;">
      <span style="color: #c084fc; font-weight: 700; display: block; margin-bottom: 0.15rem;">🎁 Bonus Attesi:</span>
      <span style="color: #fff; font-weight: 500;">${data.expectedBonuses || 'Nessun bonus atteso segnalato.'}</span>
    </div>

    <!-- Alternatives -->
    ${alternativesHtml}
  `;

  // Bind refresh click programmatically to prevent click bubbling and popover closing
  const refreshBtn = popover.querySelector('.pitch-popover-refresh');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pId = popover.dataset.playerId || triggerEl.getAttribute('data-player-id') || '';
      refreshPitchPlayerTooltip(pId);
    });
  }
}


async function showPitchPlayerTooltip(playerId, triggerEl, isMobile, forceRefresh = false) {
  let popover;
  if (forceRefresh && activePitchPopover && activePitchPopover.dataset.playerId === playerId) {
    popover = activePitchPopover;
  } else {
    if (activePitchPopover && activePitchPopover.dataset.playerId === playerId && !forceRefresh) {
      return;
    }
    
    closePitchPopover();

    popover = document.createElement('div');
    popover.className = `pitch-player-popover ${isMobile ? 'modal-view' : ''}`;
    popover.dataset.playerId = playerId;
    activePitchPopover = popover;
    
    const dialogEl = document.getElementById('pitch-dialog');
    if (dialogEl) {
      dialogEl.appendChild(popover);
    } else {
      document.body.appendChild(popover);
    }

    if (isMobile) {
      document.body.classList.add('ai-modal-open');
    }
  }

  const player = state.players.find(p => p.id === playerId) ||
                 (state.teams.find(t => t.id === state.activePitchTeamId)?.players.find(p => p.id === playerId));

  if (!player) return;

  if (!isMobile) {
    positionPitchPopover(popover, triggerEl);
    setTimeout(() => {
      if (activePitchPopover === popover) popover.classList.add('show');
    }, 10);
  }

  const cachedDataRaw = state.aiCache[playerId] || JSON.parse(sessionStorage.getItem(`fantamondiale_ai_${playerId}`) || 'null');
  const cachedData = cachedDataRaw ? normalizePlayerAnalysis(cachedDataRaw) : null;

  let shouldFetchInBg = false;
  if (cachedData) {
    const grName = cachedData.groupAnalysis?.groupName;
    const grText = cachedData.groupAnalysis?.groupAnalysisText;
    const isPlaceholderGroup = !grName || 
                               grName === 'Da verificare' || 
                               grName === 'Da definire' || 
                               grName === 'Non disponibile' || 
                               grName === 'Da stabilire' ||
                               grName === 'N/D' ||
                               !grText ||
                               grText.includes('in fase di elaborazione') ||
                               grText.includes('non disponibile');
    if (isPlaceholderGroup) {
      shouldFetchInBg = true;
    }
  }

  if (cachedData && !shouldFetchInBg) {
    renderPitchPopoverData(popover, player.name, player.country, player.role, cachedData, triggerEl, isMobile);
    if (!isMobile) {
      positionPitchPopover(popover, triggerEl);
    }
  } else {
    if (cachedData && shouldFetchInBg) {
      renderPitchPopoverData(popover, player.name, player.country, player.role, cachedData, triggerEl, isMobile);
      if (!isMobile) {
        positionPitchPopover(popover, triggerEl);
      }
      // Add subtle background reload notification text near the opponent label
      setTimeout(() => {
        const oppLabel = popover.querySelector('span[style*="text-transform: uppercase"]');
        if (oppLabel && !oppLabel.innerHTML.includes('Aggiornamento')) {
          oppLabel.innerHTML += ' <span style="font-size:0.52rem; color:var(--color-primary); font-weight:800; animation: pulse 1.2s infinite; text-transform:none;">(Aggiornamento dati...)</span>';
        }
      }, 10);
    } else {
      renderPitchPopoverLoading(popover, player.name, isMobile);
    }
    
    try {
      const response = await fetch('/api/player-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: player.name,
          country: player.country,
          role: player.role,
          provider: state.settings.aiProvider || 'google',
          openRouterModel: state.settings.openRouterModel || 'openai/gpt-oss-120b:free',
          geminiModel: state.settings.geminiModel || 'gemini-flash-lite-latest',
          nextOpponent: getNextOpponentForCountry(player.country)
        })
      });
      const result = await response.json();
      
      if (activePitchPopover !== popover) return;

      if (response.ok && !result.error) {
        const normalized = normalizePlayerAnalysis(result);
        state.aiCache[playerId] = normalized;
        sessionStorage.setItem(`fantamondiale_ai_${playerId}`, JSON.stringify(normalized));
        renderPitchPopoverData(popover, player.name, player.country, player.role, normalized, triggerEl, isMobile);
        if (!isMobile) {
          positionPitchPopover(popover, triggerEl);
        }
        renderPitch(); // Synchronize strength badge on the main pitch visualizer
      } else if (!cachedData) {
        renderPitchPopoverError(popover, result.error || 'Errore API');
      }
    } catch (error) {
      if (activePitchPopover !== popover) return;
      if (!cachedData) {
        renderPitchPopoverError(popover, error.message);
      }
    }
  }
}

async function refreshPitchPlayerTooltip(playerId) {
  if (!playerId) return;
  // Clear cached data
  delete state.aiCache[playerId];
  sessionStorage.removeItem(`fantamondiale_ai_${playerId}`);
  renderPitch(); // Clear/refresh the score badge in the UI immediately

  // Find original trigger node in the DOM
  let triggerEl = document.querySelector(`.pitch-player-node[data-player-id="${playerId}"]`) || 
                  document.querySelector(`.bench-player-node[data-player-id="${playerId}"]`);

  if (!triggerEl) {
    triggerEl = document.body;
  }

  const isMobile = window.innerWidth <= 768;

  // Trigger loading and Vercel API fetch fresh with forceRefresh=true (reusing activePitchPopover)
  showPitchPlayerTooltip(playerId, triggerEl, isMobile, true);
}
window.refreshPitchPlayerTooltip = refreshPitchPlayerTooltip;

// --- DYNAMIC AI SPEECH BUBBLE OVERLAY LOGIC ---
let activeAIPopover = null;

async function showPlayerAIAnalysis(playerId, name, country, role, buttonEl, forceRefresh = false) {
  let popover;
  if (forceRefresh && activeAIPopover && activeAIPopover.dataset.playerId === playerId) {
    popover = activeAIPopover;
    // Clear cache
    delete state.aiCache[playerId];
    sessionStorage.removeItem(`fantamondiale_ai_${playerId}`);
  } else {
    // 1. If popover already open for this player, close it and return
    if (activeAIPopover && activeAIPopover.dataset.playerId === playerId && !forceRefresh) {
      closeAIPopover();
      return;
    }

    // 2. Close any other open popovers first
    closeAIPopover();

    // 3. Create Popover Div
    popover = document.createElement('div');
    popover.className = 'ai-bubble-popover';
    popover.dataset.playerId = playerId;
    activeAIPopover = popover;

    // Append to body immediately to calculate dimensions, but keep invisible or positioned offscreen
    document.body.appendChild(popover);

    // Add modal-open class to lock background scrolling
    document.body.classList.add('ai-modal-open');
  }

  // 5. Render Loading State (Skeleton Loader)
  renderPopoverLoading(popover, name);

  // 6. Check Cache (sessionStorage & in-memory)
  let cachedDataRaw = state.aiCache[playerId];
  if (!cachedDataRaw) {
    const sessionCached = sessionStorage.getItem(`fantamondiale_ai_${playerId}`);
    if (sessionCached) {
      try {
        cachedDataRaw = JSON.parse(sessionCached);
        state.aiCache[playerId] = cachedDataRaw;
      } catch (e) {
        cachedDataRaw = null;
      }
    }
  }
  const cachedData = cachedDataRaw ? normalizePlayerAnalysis(cachedDataRaw) : null;

  let shouldFetchInBg = false;
  if (cachedData) {
    const grName = cachedData.groupAnalysis?.groupName;
    const grText = cachedData.groupAnalysis?.groupAnalysisText;
    const isPlaceholderGroup = !grName || 
                               grName === 'Da verificare' || 
                               grName === 'Da definire' || 
                               grName === 'Non disponibile' || 
                               grName === 'Da stabilire' ||
                               grName === 'N/D' ||
                               !grText ||
                               grText.includes('in fase di elaborazione') ||
                               grText.includes('non disponibile');
    if (isPlaceholderGroup) {
      shouldFetchInBg = true;
    }
  }

  // If in cache, not force refreshing, and opponent is valid, render data immediately
  if (cachedData && !forceRefresh && !shouldFetchInBg) {
    renderPopoverData(popover, name, country, role, cachedData, buttonEl);
    return;
  }

  // If we have cached placeholder data, render it first to give instant feedback
  if (cachedData && shouldFetchInBg && !forceRefresh) {
    renderPopoverData(popover, name, country, role, cachedData, buttonEl);
    setTimeout(() => {
      const titleEl = popover.querySelector('.ai-popover-title');
      if (titleEl && !titleEl.innerHTML.includes('Aggiornamento')) {
        titleEl.innerHTML += ' <span style="font-size:0.52rem; color:var(--color-primary); font-weight:800; animation: pulse 1.2s infinite; text-transform:none;">(Aggiornamento...)</span>';
      }
    }, 10);
  }

  // 7. Fetch from Serverless endpoint
  try {
    const response = await fetch('/api/player-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name, 
        country, 
        role,
        provider: state.settings.aiProvider || 'google',
        openRouterModel: state.settings.openRouterModel || 'openai/gpt-oss-120b:free',
        geminiModel: state.settings.geminiModel || 'gemini-flash-lite-latest',
        nextOpponent: getNextOpponentForCountry(country)
      })
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      if (result.fallback) {
        renderPopoverFallback(popover, result.error);
      } else if (!cachedData) {
        throw new Error(result.error || 'Errore di connessione API.');
      }
      return;
    }

    const normalized = normalizePlayerAnalysis(result);
    // Save to Cache
    state.aiCache[playerId] = normalized;
    sessionStorage.setItem(`fantamondiale_ai_${playerId}`, JSON.stringify(normalized));

    // Render Data
    renderPopoverData(popover, name, country, role, normalized, buttonEl);
    
    // Instantly update the main players table row with the calculated price range
    renderPlayerList();
  } catch (error) {
    console.error(error);
    renderPopoverError(popover, error.message);
  }
}

function closeAIPopover() {
  if (activeAIPopover) {
    activeAIPopover.remove();
    activeAIPopover = null;
    document.body.classList.remove('ai-modal-open');
  }
}

function focusPlayerInList(playerName) {
  closeAIPopover();
  state.filters.search = playerName.toLowerCase();
  if (dom.searchInput) {
    dom.searchInput.value = playerName;
  }
  switchTab('giocatori');
  renderPlayerList();
}

// Position speech bubble dynamically with pointer arrow direction
function positionPopover(popover, buttonEl) {
  const rect = buttonEl.getBoundingClientRect();
  const popoverWidth = 320;
  
  // Calculate relative absolute top & left including page scroll
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  let left = rect.left + scrollX - 20; // Align arrow roughly with button
  let top = rect.bottom + scrollY + 12; // Default below button
  let isBelow = true;

  // If popover overflows bottom of viewport, position above the button
  const popoverHeightEst = 290; // Estimate based on stats cards + profile
  if (rect.bottom + popoverHeightEst > window.innerHeight && rect.top > popoverHeightEst) {
    top = rect.top + scrollY - popoverHeightEst - 12;
    isBelow = false;
  }

  // Keep inside left boundary
  if (left < 10) left = 10;
  // Keep inside right boundary
  if (left + popoverWidth > window.innerWidth - 10) {
    left = window.innerWidth - popoverWidth - 10;
  }

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;

  // Apply triangular class
  popover.classList.remove('ai-bubble-below', 'ai-bubble-above');
  popover.classList.add(isBelow ? 'ai-bubble-below' : 'ai-bubble-above');

  // Dynamically position the ::after arrow to point exactly at the trigger button
  const arrowOffsetLeft = rect.left + scrollX - left + (rect.width / 2) - 8;
  popover.style.setProperty('--arrow-left', `${arrowOffsetLeft}px`);
}

function renderPopoverLoading(popover, name) {
  popover.innerHTML = `
    <div class="ai-popover-header">
      <span class="ai-popover-title">Analisi IA ✨</span>
      <div class="ai-popover-actions">
        <button class="ai-popover-close" onclick="closeAIPopover()">✕</button>
      </div>
    </div>
    <div style="font-size:0.75rem; font-weight:700; color:#fff; margin-bottom: 0.65rem;">
      Consulto l'analista per <span style="color:#c084fc;">${name}</span>...
    </div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 40px; border-radius: 8px;"></div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 40px; border-radius: 8px; margin-top: 0.5rem;"></div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 30px; border-radius: 8px; margin-top: 0.5rem;"></div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 60px; border-radius: 8px; margin-top: 0.5rem;"></div>
  `;
}

function renderPopoverData(popover, name, country, role, rawData, buttonEl) {
  const data = normalizePlayerAnalysis(rawData);

  const categoryValue = (data.playerCategory || '').toLowerCase().trim();
  let categoryClass = 'buono';
  let categoryEmoji = '👍';
  let categoryText = 'Buono';

  if (categoryValue.includes('scarso')) {
    categoryClass = 'scarso';
    categoryEmoji = '📉';
    categoryText = 'Scarso';
  } else if (categoryValue.includes('accettabile')) {
    categoryClass = 'accettabile';
    categoryEmoji = '⚖️';
    categoryText = 'Accettabile';
  } else if (categoryValue.includes('buono')) {
    categoryClass = 'buono';
    categoryEmoji = '👍';
    categoryText = 'Buono';
  } else if (categoryValue.includes('ottimo')) {
    categoryClass = 'ottimo';
    categoryEmoji = '🎯';
    categoryText = 'Ottimo';
  } else if (categoryValue.includes('stella') || categoryValue.includes('star')) {
    categoryClass = 'stella';
    categoryEmoji = '👑';
    categoryText = 'Stella';
  }

  // 1. Calculate Ideal purchase cost range only if player is free
  const playerObj = state.players.find(x => x.id === popover.dataset.playerId);
  let bidRangeHtml = '';
  if (playerObj && !playerObj.ownerId) {
    const range = calculateIdealBidRange(playerObj);
    bidRangeHtml = `
      <div class="ai-bid-range-container" style="margin-bottom: 0.55rem;">
        <div class="ai-bid-range-section" style="background: rgba(245, 158, 11, 0.06); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 8px; padding: 0.5rem 0.6rem; display: flex; justify-content: space-between; align-items: center; border-bottom-left-radius: 0; border-bottom-right-radius: 0;">
          <span style="font-size: 0.62rem; color: #f59e0b; text-transform: uppercase; font-weight: 800; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.25rem;">Offerta Ideale Consigliata 💡</span>
          <span style="font-size: 0.8rem; font-weight: 800; color: #f59e0b; font-family: monospace;">${range.min} - ${range.max} cr</span>
        </div>
        <div style="background: rgba(245, 158, 11, 0.02); border: 1px solid rgba(245, 158, 11, 0.15); border-top: none; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; padding: 0.4rem 0.5rem; font-size: 0.62rem; color: var(--color-text-muted); line-height: 1.35;">
          ${range.justification}
        </div>
      </div>
    `;
  }

  // 2. Format Group Analysis block
  const strength = parseInt(data.matchStrength) || 50;
  let strengthColor = '#f43f5e'; // Red/Rose
  if (strength >= 80) {
    strengthColor = '#10b981'; // Emerald
  } else if (strength >= 50) {
    strengthColor = '#f59e0b'; // Amber
  }

  const groupAnalysisHtml = `
    <div class="ai-group-analysis-section" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 8px; padding: 0.5rem 0.6rem; margin-bottom: 0.55rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
        <span style="font-size: 0.62rem; color: #10b981; text-transform: uppercase; font-weight: 800; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.25rem;">Analisi Girone: ${data.groupAnalysis?.groupName || 'Girone'} 📊</span>
        <span style="font-size: 0.72rem; font-weight: 800; color: #10b981;">Passaggio: ${data.groupAnalysis?.qualificationProbability || '50%'}</span>
      </div>
      <p style="margin: 0 0 0.4rem 0; font-size: 0.68rem; line-height: 1.4; color: #fff; font-weight: 500;">
        ${data.groupAnalysis?.groupAnalysisText || 'Analisi del girone non disponibile.'}
      </p>
      <div style="background: rgba(0, 0, 0, 0.15); border-left: 2px solid #10b981; padding: 0.35rem 0.45rem; border-radius: 4px; font-size: 0.65rem; color: var(--color-text-muted); line-height: 1.35;">
        <strong>Percorso post-gironi:</strong> ${data.groupAnalysis?.postGroupPath || 'Percorso non disponibile.'}
      </div>
    </div>
  `;

  // 3. Format Alternatives challenging starter status
  let alternativesHtml = '';
  let itemsHtml = '';
  if (data.alternatives && Array.isArray(data.alternatives) && data.alternatives.length > 0) {
    itemsHtml = data.alternatives.map(alt => `
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.68rem; margin-bottom: 0.2rem; background: rgba(255, 255, 255, 0.02); padding: 0.2rem 0.4rem; border-radius: 4px;">
        <span style="color: #fff; font-weight: 500;">🔄 ${alt.name}</span>
        <span style="color: #ef4444; font-weight: 700;">Chance impiego: ${alt.playProbability}</span>
      </div>
    `).join('');
  }

  const commentHtml = data.roleCompetitionComment ? `
    <div style="font-size: 0.65rem; color: #fff; font-weight: 500; line-height: 1.4; padding: 0.45rem 0.55rem; background: rgba(255, 255, 255, 0.02); border-left: 3px solid var(--color-primary); margin-top: 0.4rem; border-radius: 4px; border-top-left-radius: 0; border-bottom-left-radius: 0;">
      ${data.roleCompetitionComment}
    </div>
  ` : '';

  alternativesHtml = `
    <div class="ai-alternatives-section" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 8px; padding: 0.5rem 0.6rem; margin-bottom: 0.55rem;">
      <span style="display: block; font-size: 0.62rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em; margin-bottom: 0.35rem;">Ballottaggi & Competizione di Ruolo 🔄</span>
      ${itemsHtml}
      ${commentHtml}
    </div>
  `;


  popover.innerHTML = `
    <div class="ai-popover-header">
      <span class="ai-popover-title">Analisi IA ✨</span>
      <div class="ai-popover-actions">
        <button class="ai-popover-refresh" title="Aggiorna analisi (ricerca online ad oggi)">🔄</button>
        <button class="ai-popover-close" onclick="closeAIPopover()">✕</button>
      </div>
    </div>
    
    <div style="font-size: 0.82rem; font-weight: 800; color: #fff; margin-bottom: 0.65rem; display: flex; align-items: center; justify-content: space-between;">
      <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 160px;">${name}</span>
      <span style="font-size: 0.65rem; color: var(--color-text-muted); font-weight: 600; flex-shrink: 0;">${role} | ${country}</span>
    </div>

    <div class="ai-stat-row">
      <div class="ai-stat-card">
        <span class="ai-stat-label">Club</span>
        <span class="ai-stat-value" title="${data.club || 'N/D'}">${data.club || 'N/D'}</span>
      </div>
      <div class="ai-stat-card">
        <span class="ai-stat-label">${role === 'POR' ? 'Presenze & Clean Sheets' : 'Presenze'}</span>
        <span class="ai-stat-value" title="${data.appearances || 'N/D'}">${data.appearances || 'N/D'}</span>
      </div>
    </div>

    <div class="ai-stat-row">
      <div class="ai-stat-card">
        <span class="ai-stat-label">Titolare 🏆</span>
        <span class="ai-stat-value" title="${data.starterProbability || 'N/D'}">${data.starterProbability || 'N/D'}</span>
      </div>
      <div class="ai-stat-card">
        <span class="ai-stat-label">Forza Giocatore ⭐</span>
        <span class="ai-stat-value" style="color: ${strengthColor}; font-weight: 800;">${strength}/100</span>
      </div>
    </div>

    <div class="ai-category-section">
      <span class="ai-stat-label" style="display:block; margin-bottom:0.25rem">Categoria Giocatore</span>
      <div class="ai-category-badge badge-cat-${categoryClass}">
        <span class="ai-category-emoji">${categoryEmoji}</span>
        <span class="ai-category-text">${categoryText}</span>
      </div>
    </div>

    ${bidRangeHtml}

    ${alternativesHtml}

    <div class="ai-form-section" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 8px; padding: 0.5rem 0.6rem; margin-bottom: 0.55rem;">
      <span class="ai-stat-label" style="display:block; margin-bottom:0.25rem; font-size: 0.6rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em;">Stato di Forma (Settimana) 📈</span>
      <p class="ai-form-text" style="margin: 0; font-size: 0.68rem; line-height: 1.4; color: #fff; font-weight: 500;">
        ${data.formState || 'Nessun aggiornamento recente su questa settimana.'}
      </p>
    </div>

    <div class="ai-profile-section">
      <span class="ai-stat-label" style="display:block; margin-bottom:0.25rem">Profilo Calciatore</span>
      <p class="ai-profile-text" style="font-size: 0.68rem; line-height: 1.4; color: var(--color-text-muted); margin: 0 0 0.45rem 0;">${data.description || 'Nessuna descrizione disponibile.'}</p>
      
      <div style="background: rgba(168, 85, 247, 0.05); border: 1px dashed rgba(168, 85, 247, 0.25); border-radius: 6px; padding: 0.4rem 0.5rem; font-size: 0.65rem;">
        <span style="color: #c084fc; font-weight: 700; display: block; margin-bottom: 0.15rem;">🎁 Bonus Attesi:</span>
        <span style="color: #fff; font-weight: 500;">${data.expectedBonuses || 'Nessun bonus atteso segnalato.'}</span>
      </div>
    </div>
    </div>
  `;

  // Bind refresh click programmatically using raw closure variables!
  const refreshBtn = popover.querySelector('.ai-popover-refresh');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPlayerAIAnalysis(popover.dataset.playerId, name, country, role, buttonEl, true);
    });
  }
}

function renderPopoverFallback(popover, errorMsg) {
  popover.innerHTML = `
    <div class="ai-popover-header">
      <span class="ai-popover-title" style="color: var(--color-warning);">Configurazione AI ⚠️</span>
      <div class="ai-popover-actions">
        <button class="ai-popover-close" onclick="closeAIPopover()">✕</button>
      </div>
    </div>
    <p style="font-size:0.75rem; color:#fff; line-height: 1.4; margin-bottom:0.75rem;">
      ${errorMsg}
    </p>
    <div style="font-size: 0.65rem; color: var(--color-text-muted); line-height: 1.3;">
      Per attivare le funzionalità AI, imposta la variabile <strong>GEMINI_API_KEY</strong> su Vercel con la tua chiave di Google AI Studio.
    </div>
  `;
}

function renderPopoverError(popover, errorMsg) {
  popover.innerHTML = `
    <div class="ai-popover-header">
      <span class="ai-popover-title" style="color: var(--color-danger);">Errore Analisi ❌</span>
      <div class="ai-popover-actions">
        <button class="ai-popover-close" onclick="closeAIPopover()">✕</button>
      </div>
    </div>
    <p style="font-size:0.75rem; color:#fff; line-height: 1.4; margin:0;">
      Impossibile recuperare i dati dell'IA in questo momento.<br>
      <span style="color: var(--color-text-muted); font-size: 0.65rem;">Dettaglio: ${errorMsg}</span>
    </p>
  `;
}

// Click outside popover to close it automatically (with support for active team analysis trigger)
document.addEventListener('click', function(e) {
  if (activeAIPopover && 
      !activeAIPopover.contains(e.target) && 
      !e.target.classList.contains('btn-ai-sparkle') && 
      !e.target.closest('.btn-ai-sparkle') &&
      e.target.id !== 'btn-team-ai-analysis' &&
      !e.target.closest('#btn-team-ai-analysis')) {
    closeAIPopover();
  }

  if (activePitchPopover && 
      !activePitchPopover.contains(e.target) && 
      !e.target.closest('.pitch-player-node') && 
      !e.target.closest('.bench-player-node')) {
    closePitchPopover();
  }
});

async function showTeamAIAnalysis(buttonEl, forceRefresh = false) {
  const team = state.teams.find(t => t.id === state.activeTeamId);
  if (!team) {
    showToast('Seleziona una squadra attiva nel pannello laterale per poter effettuare l\'analisi tattica!', 'warning');
    return;
  }

  // 1. If popover already open for this team, close it and return
  if (activeAIPopover && activeAIPopover.dataset.teamId === team.id && !forceRefresh) {
    closeAIPopover();
    return;
  }

  // 2. Close any other open popovers first
  closeAIPopover();

  // 3. Create Popover Div
  const popover = document.createElement('div');
  popover.className = 'ai-bubble-popover';
  popover.dataset.teamId = team.id;
  activeAIPopover = popover;

  // Append to body immediately to calculate dimensions
  document.body.appendChild(popover);

  // Add modal-open class to lock background scrolling
  document.body.classList.add('ai-modal-open');

  // 5. Render Loading State (Skeleton Loader)
  popover.innerHTML = `
    <div class="ai-popover-header">
      <span class="ai-popover-title">Analisi Tattica IA 🔮</span>
      <div class="ai-popover-actions">
        <button class="ai-popover-close" onclick="closeAIPopover()">✕</button>
      </div>
    </div>
    <div style="font-size:0.75rem; font-weight:700; color:#fff; margin-bottom: 0.65rem;">
      Studio la rosa di <span style="color:#c084fc;">${team.name}</span>...
    </div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 50px; border-radius: 8px;"></div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 50px; border-radius: 8px; margin-top: 0.5rem;"></div>
    <div class="ai-skeleton-pulse ai-skeleton-line" style="width: 100%; height: 50px; border-radius: 8px; margin-top: 0.5rem;"></div>
  `;

  const rosterHash = team.players.map(p => p.id).sort().join(',');
  const cacheKey = `fantamondiale_team_ai_v7_${team.id}_${rosterHash}`;

  // Check Cache (only if not force refreshing)
  if (!forceRefresh) {
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        const textVal = parsed.analysisText || parsed.analysis;
        const recommendedIds = parsed.recommendedPlayerIds || [];
        renderTeamAnalysisPopoverData(popover, team, textVal, recommendedIds, buttonEl);
        return;
      } catch (e) {
        sessionStorage.removeItem(cacheKey);
      }
    }
  }

  // 7. Compile free prospects
  const freePlayers = state.players.filter(p => !p.ownerId && !isCountryEliminated(p.country));
  const sortedFreePlayers = [...freePlayers].sort((a, b) => {
    return getPlayerPriorityScore(b) - getPlayerPriorityScore(a) || b.initialValue - a.initialValue;
  });
  const topFreePlayers = sortedFreePlayers.slice(0, 150).map(p => ({
    id: p.id,
    name: p.name,
    role: p.role,
    country: p.country,
    initialValue: p.initialValue,
    rating: getPlayerPerformanceRating(p)
  }));

  // 8. Group roster by role with minimal details
  const rosterData = {
    POR: team.players.filter(p => p.role === 'POR').map(p => ({ name: p.name, country: p.country })),
    DIF: team.players.filter(p => p.role === 'DIF').map(p => ({ name: p.name, country: p.country })),
    CEN: team.players.filter(p => p.role === 'CEN').map(p => ({ name: p.name, country: p.country })),
    ATT: team.players.filter(p => p.role === 'ATT').map(p => ({ name: p.name, country: p.country }))
  };

  // 9. Fetch analysis from Serverless API
  try {
    const response = await fetch('/api/team-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teamName: team.name,
        roster: rosterData,
        budget: team.budget,
        freePlayers: topFreePlayers,
        provider: state.settings.aiProvider || 'google',
        openRouterModel: state.settings.openRouterModel || 'openai/gpt-oss-120b:free',
        geminiModel: state.settings.geminiModel || 'gemini-flash-lite-latest'
      })
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      if (result.fallback) {
        renderPopoverFallback(popover, result.error);
      } else {
        throw new Error(result.error || 'Errore di connessione API.');
      }
      return;
    }

    // Save to cache
    sessionStorage.setItem(cacheKey, JSON.stringify(result));

    // Render Data
    const textVal = result.analysisText || result.analysis;
    const recommendedIds = result.recommendedPlayerIds || [];
    renderTeamAnalysisPopoverData(popover, team, textVal, recommendedIds, buttonEl);
  } catch (error) {
    console.error(error);
    renderPopoverError(popover, error.message);
  }
}

function renderTeamAnalysisPopoverData(popover, team, analysisText, recommendedPlayerIds, buttonEl) {
  const parsedHtml = parseMarkdown(analysisText);

  // Compile recommended prospects programmatically: top 20 free players in order of FantaMondiale priority
  const freePlayers = state.players.filter(p => !p.ownerId && !isCountryEliminated(p.country));
  
  const sortedFree = [...freePlayers].sort((a, b) => {
    return getPlayerPriorityScore(b) - getPlayerPriorityScore(a) || b.initialValue - a.initialValue;
  });

  const prospectsToShow = sortedFree.slice(0, 20); // Show top 20 players!

  let recommendedHtml = '';
  if (prospectsToShow.length > 0) {
    const groupedByRole = { POR: [], DIF: [], CEN: [], ATT: [] };
    prospectsToShow.forEach(p => {
      groupedByRole[p.role].push(p);
    });

    const roleNames = {
      POR: 'Portieri 🧤',
      DIF: 'Difensori 🛡️',
      CEN: 'Centrocampisti ⚡',
      ATT: 'Attaccanti ⚽'
    };

    let sectionsHtml = '';
    ['POR', 'DIF', 'CEN', 'ATT'].forEach(role => {
      const players = groupedByRole[role];
      if (players && players.length > 0) {
        let itemsHtml = '';
        players.forEach(p => {
          const range = calculateIdealBidRange(p, team);
          const escapedName = p.name.replace(/'/g, "\\'");
          const escapedCountry = p.country.replace(/'/g, "\\'");
          
          const isAiChoice = recommendedPlayerIds && recommendedPlayerIds.includes(p.id);
          const itemBg = isAiChoice ? 'rgba(168, 85, 247, 0.06)' : 'rgba(255, 255, 255, 0.02)';
          const itemBorder = isAiChoice ? '1px solid rgba(168, 85, 247, 0.25)' : '1px solid rgba(255, 255, 255, 0.04)';
          const aiBadge = isAiChoice ? `<span style="font-size: 0.58rem; padding: 0.08rem 0.25rem; border-radius: 4px; background: rgba(168, 85, 247, 0.25); color: #d8b4fe; font-weight: 700; border: 1px solid rgba(168, 85, 247, 0.4); line-height: 1; flex-shrink: 0; display: inline-flex; align-items: center; gap: 0.15rem;">🧠 Scelta IA</span>` : '';
          
          itemsHtml += `
            <div class="mini-player-item" style="display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0.5rem; background: ${itemBg}; border: ${itemBorder}; border-radius: 6px; margin-bottom: 0.35rem; cursor: pointer;" onclick="focusPlayerInList('${escapedName}')" title="Filtra questo giocatore nella lista 🔍">
              <div style="display: flex; align-items: center; gap: 0.35rem; min-width: 0; flex: 1;">
                <span class="badge badge-${p.role.toLowerCase()}" style="font-size: 0.58rem; padding: 0.1rem 0.25rem; border-radius: 4px; line-height: 1; flex-shrink: 0;">${p.role}</span>
                <span style="font-size: 0.72rem; font-weight: 600; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: flex; align-items: center; gap: 0.35rem;">
                  ${p.name} 
                  <span style="color: var(--color-text-muted); font-size: 0.65rem;">(${p.country})</span>
                  ${aiBadge}
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
                <span style="font-size: 0.72rem; font-weight: 800; color: #f59e0b; font-family: monospace;">${range.min}-${range.max} cr</span>
                <button class="btn-ai-sparkle" style="width: 22px; height: 22px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.65rem; padding: 0;" onclick="showPlayerAIAnalysis('${p.id}', '${escapedName}', '${escapedCountry}', '${p.role}', this); event.stopPropagation();" title="Analisi IA giocatore ✨">✨</button>
              </div>
            </div>
          `;
        });

        sectionsHtml += `
          <div class="role-prospects-group" style="margin-bottom: 0.75rem;">
            <div style="font-size: 0.62rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 0.35rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 0.15rem; letter-spacing: 0.03em;">
              ${roleNames[role]}
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.15rem;">
              ${itemsHtml}
            </div>
          </div>
        `;
      }
    });

    recommendedHtml = `
      <div class="ai-recommendations-section" style="margin-top: 0.75rem; border-top: 1px dashed rgba(255, 255, 255, 0.1); padding-top: 0.75rem;">
        <span style="display: block; font-size: 0.62rem; color: #a855f7; text-transform: uppercase; font-weight: 800; letter-spacing: 0.05em; margin-bottom: 0.55rem;">Prospetti Consigliati Rimasti 🔮</span>
        <div>
          ${sectionsHtml}
        </div>
      </div>
    `;
  }

  popover.innerHTML = `
    <div class="ai-popover-header">
      <span class="ai-popover-title">Analisi Tattica IA 🔮</span>
      <div class="ai-popover-actions">
        <button class="ai-popover-refresh" title="Aggiorna analisi (ricerca online ad oggi)">🔄</button>
        <button class="ai-popover-close" onclick="closeAIPopover()">✕</button>
      </div>
    </div>
    
    <div style="font-size: 0.82rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 0.35rem;">
      Roster: <span style="color:#c084fc;">${team.name}</span>
    </div>

    ${parsedHtml}

    ${recommendedHtml}
  `;

  // Bind refresh click programmatically using closure variables
  const refreshBtn = popover.querySelector('.ai-popover-refresh');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showTeamAIAnalysis(buttonEl, true);
    });
  }
}

function parseMarkdown(text) {
  if (!text) return '';
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  let parsedHtml = '<div class="ai-analysis-cards">';
  
  let cardIndex = 0;
  lines.forEach(line => {
    let cleanLine = line;
    // Strip bullet points or numbered prefix like "1. ", "- ", "* "
    cleanLine = cleanLine.replace(/^\s*[-*]\s+/, '');
    cleanLine = cleanLine.replace(/^\s*\d+\.\s+/, '');
    
    // Convert bold **text** to <strong>text</strong>
    cleanLine = cleanLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    if (cleanLine.length > 0) {
      cardIndex++;
      let icon = '✨';
      let title = '';
      
      // Try to extract bold text as title
      const strongMatch = cleanLine.match(/^<strong>(.*?)<\/strong>:?\s*/);
      if (strongMatch) {
        title = strongMatch[1].replace(/^\d+[\.\s\-:]+\s*/, '');
        cleanLine = cleanLine.replace(/^<strong>.*?<\/strong>:?\s*/, '');
      }
      
      if (cardIndex === 1) {
        icon = '📊';
        if (!title) title = 'Voto & Potenziale';
      } else if (cardIndex === 2) {
        icon = '🎯';
        if (!title) title = 'Strategia & Mercato';
      }
      
      parsedHtml += `
        <div class="ai-analysis-card-item card-step-${cardIndex}">
          <div class="ai-card-badge">
            <span class="ai-card-icon">${icon}</span>
          </div>
          <div class="ai-card-content">
            <h4 class="ai-card-title">${title}</h4>
            <p class="ai-card-text">${cleanLine}</p>
          </div>
        </div>
      `;
    }
  });
  
  parsedHtml += '</div>';
  return parsedHtml;
}

// --- CLIPBOARD AND SINGLE-CALL AI RECALCULATE FUNCTIONS ---

function copyLineupToClipboard(team, isIdeal) {
  if (!team) return;

  const module = team.module || '4-3-3';
  const parts = module.split('-').map(x => parseInt(x));
  const defNeeded = parts[0] || 4;
  const cenNeeded = parts[1] || 3;
  const attNeeded = parts[2] || 3;

  const idealLineup = state.teamIdealLineups?.[team.id];
  let porStarters, porBench, difStarters, difBench, cenStarters, cenBench, attStarters, attBench;

  if (isIdeal && idealLineup) {
    const startersList = team.players.filter(p => idealLineup.starters.includes(p.id));
    const benchList = team.players.filter(p => idealLineup.bench.includes(p.id));

    porStarters = startersList.filter(p => p.role === 'POR');
    porBench = benchList.filter(p => p.role === 'POR');

    difStarters = startersList.filter(p => p.role === 'DIF');
    difBench = benchList.filter(p => p.role === 'DIF');

    cenStarters = startersList.filter(p => p.role === 'CEN');
    cenBench = benchList.filter(p => p.role === 'CEN');

    attStarters = startersList.filter(p => p.role === 'ATT');
    attBench = benchList.filter(p => p.role === 'ATT');
  } else {
    let porPlayers = team.players.filter(p => p.role === 'POR');
    let difPlayers = team.players.filter(p => p.role === 'DIF');
    let cenPlayers = team.players.filter(p => p.role === 'CEN');
    let attPlayers = team.players.filter(p => p.role === 'ATT');

    if (isIdeal) {
       const getPlayerFormScore = (player) => {
        const cachedRaw = state.aiCache[player.id] || JSON.parse(sessionStorage.getItem(`fantamondiale_ai_${player.id}`) || 'null');
        if (!cachedRaw) return 50;
        const cached = normalizePlayerAnalysis(cachedRaw);
        let score = 50;
        const cat = (cached.playerCategory || '').toLowerCase();
        if (cat.includes('stella')) score += 40;
        else if (cat.includes('ottimo')) score += 30;
        else if (cat.includes('buono')) score += 20;
        else if (cat.includes('accettabile')) score += 10;
        else if (cat.includes('scarso')) score -= 20;

        if (cached.starterProbability) {
          const prob = parseInt(cached.starterProbability.replace(/[^0-9]/g, '')) || 50;
          score += prob * 0.2;
        }
        score += (player.purchaseCost || 0) * 0.1;
        return score;
      };

      porPlayers = [...porPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
      difPlayers = [...difPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
      cenPlayers = [...cenPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
      attPlayers = [...attPlayers].sort((a, b) => getPlayerFormScore(b) - getPlayerFormScore(a));
    }

    porStarters = porPlayers.slice(0, 1);
    porBench = porPlayers.slice(1);

    difStarters = difPlayers.slice(0, defNeeded);
    difBench = difPlayers.slice(defNeeded);

    cenStarters = cenPlayers.slice(0, cenNeeded);
    cenBench = cenPlayers.slice(cenNeeded);

    attStarters = attPlayers.slice(0, attNeeded);
    attBench = attPlayers.slice(attNeeded);
  }

  let benchList;
  if (isIdeal && idealLineup) {
    benchList = idealLineup.bench.map(id => team.players.find(p => p.id === id)).filter(Boolean);
  } else {
    benchList = [...porBench, ...difBench, ...cenBench, ...attBench];
  }

  // Build the text to copy
  let textToCopy = `🔮 FANTAMONDIALE: Formazione per "${team.name}" (Modulo: ${module})\n\n`;
  textToCopy += `⚽ TITOLARI:\n`;
  textToCopy += `🧤 POR: ${porStarters.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}\n`;
  textToCopy += `🛡️ DIF: ${difStarters.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}\n`;
  textToCopy += `💎 CEN: ${cenStarters.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}\n`;
  textToCopy += `🔥 ATT: ${attStarters.map(p => `${p.name} (${p.country})`).join(', ') || 'Nessuno'}\n\n`;
  
  textToCopy += `🛋️ PANCHINA:\n`;
  if (benchList.length > 0) {
    textToCopy += benchList.map(p => `- ${p.role}: ${p.name} (${p.country})`).join('\n') + '\n';
  } else {
    textToCopy += `Nessuno in panchina\n`;
  }

  textToCopy += `\nGenerato automaticamente dalle Scelte e Criteri Formazione IA di FantaMondiale 🔮✨`;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      showToast('Formazione copiata negli appunti! 📋⚽', 'success');
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
      // Fallback using temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('Formazione copiata negli appunti! 📋⚽', 'success');
      } catch (e) {
        showToast('Errore durante la copia della formazione.', 'danger');
      }
      document.body.removeChild(textarea);
    });
}

async function recalculatePlayerEvaluations(team) {
  if (!team || team.players.length === 0) {
    showToast('Nessun giocatore in rosa da aggiornare!', 'warning');
    return;
  }

  // Clear cached player analysis data for all players in this team
  team.players.forEach(p => {
    delete state.aiCache[p.id];
    sessionStorage.removeItem(`fantamondiale_ai_${p.id}`);
  });

  const dialog = document.getElementById('ai-recalc-dialog');
  const dialogContent = document.getElementById('ai-recalc-dialog-content');
  if (!dialog || !dialogContent) return;

  // Open dialog
  dialog.showModal();

  // Render loader progress
  dialogContent.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; text-align: center;">
      <div class="ai-skeleton-pulse" style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; animation: pulse 1.5s infinite; box-shadow: 0 0 15px rgba(168, 85, 247, 0.45);">🔮</div>
      <h3 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 1.15rem; font-weight: 700;">Ricalcolo Valutazioni Giocatori 🔄</h3>
      <p id="ai-recalc-dialog-status" style="margin: 0 0 1.25rem 0; font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.4;">Fase 1: Raccolta news e statistiche calciatori in lotti...</p>
      <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; margin-bottom: 0.5rem;">
        <div id="ai-recalc-dialog-progress" style="width: 5%; height: 100%; background: linear-gradient(90deg, #38bdf8 0%, #c084fc 100%); border-radius: 4px; transition: width 0.4s ease-out;"></div>
      </div>
    </div>
  `;

  const statusTextEl = document.getElementById('ai-recalc-dialog-status');
  const progressBarEl = document.getElementById('ai-recalc-dialog-progress');

  try {
    const allPlayers = team.players.map(p => ({
      id: p.id,
      name: p.name,
      role: p.role,
      country: p.country,
      nextOpponent: getNextOpponentForCountry(p.country)
    }));
    const batchSize = 3;
    const batches = [];
    
    for (let i = 0; i < allPlayers.length; i += batchSize) {
      batches.push(allPlayers.slice(i, i + batchSize));
    }

    const totalBatches = batches.length;
    
    for (let batchIdx = 0; batchIdx < totalBatches; batchIdx++) {
      const batchPlayers = batches[batchIdx];
      
      if (batchIdx > 0) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      if (statusTextEl && progressBarEl) {
        statusTextEl.innerText = `Fase 1: Recupero news e valutazioni... Lotto ${batchIdx + 1} di ${totalBatches} (${Math.round((batchIdx / totalBatches) * 100)}%)`;
        progressBarEl.style.width = `${Math.round(((batchIdx + 1) / (totalBatches + 2)) * 100)}%`;
      }

      let success = false;
      let attempt = 0;
      let batchResult = null;
      let lastError = null;

      while (!success && attempt < 3) {
        attempt++;
        if (attempt > 1 && statusTextEl) {
          statusTextEl.innerText = `Fase 1: Lotto ${batchIdx + 1} di ${totalBatches}... Riprovo (Tentativo ${attempt}/3)`;
        }

        try {
          const batchResponse = await fetch('/api/player-batch-analysis', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              players: batchPlayers,
              provider: state.settings.aiProvider || 'google',
              openRouterModel: state.settings.openRouterModel || 'openai/gpt-oss-120b:free',
              geminiModel: state.settings.geminiModel || 'gemini-flash-lite-latest'
            })
          });

          if (!batchResponse.ok) {
            throw new Error(`Errore HTTP ${batchResponse.status} ${batchResponse.statusText}`);
          }

          batchResult = await batchResponse.json();
          if (batchResult.error) {
            throw new Error(batchResult.error);
          }

          success = true;
        } catch (err) {
          lastError = err;
          console.warn(`Lotto ${batchIdx + 1} fallito (Tentativo ${attempt}/3):`, err);
          if (attempt < 3) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }

      if (!success) {
        throw new Error(`Impossibile ricevere valutazioni per il Lotto ${batchIdx + 1}: ${lastError ? lastError.message || lastError : 'Errore sconosciuto'}`);
      }

      if (batchResult && batchResult.playersAnalysis) {
        const returnedKeys = Object.keys(batchResult.playersAnalysis);
        const nameToIdMap = {};
        batchPlayers.forEach(p => {
          nameToIdMap[p.name.trim().toLowerCase()] = p.id;
          p.name.split(/\s+/).forEach(part => {
            if (part.length > 2) nameToIdMap[part.toLowerCase()] = p.id;
          });
        });
        
        returnedKeys.forEach(key => {
          let targetId = key;
          const isValidId = batchPlayers.some(p => p.id === key);
          
          if (!isValidId) {
            const keyLower = key.trim().toLowerCase();
            if (nameToIdMap[keyLower]) {
              targetId = nameToIdMap[keyLower];
            } else {
              const matchedId = Object.entries(nameToIdMap).find(([name]) => 
                keyLower.includes(name) || name.includes(keyLower)
              );
              if (matchedId) targetId = matchedId[1];
            }
          }
          
          const analysis = normalizePlayerAnalysis(batchResult.playersAnalysis[key]);
          state.aiCache[targetId] = analysis;
          sessionStorage.setItem(`fantamondiale_ai_${targetId}`, JSON.stringify(analysis));
        });
      }

      // Re-render in real time!
      renderPitch();
      renderTeamDashboard();
    }

    // Verification
    let missingPlayers = team.players.filter(p => !state.aiCache[p.id]);

    if (missingPlayers.length > 0) {
      console.log(`Rilevati ${missingPlayers.length} calciatori senza alcuna valutazione. Tentativo di ripristino mirato...`);
      let retryAttempt = 0;
      const maxRetryAttempts = 2;
      
      while (missingPlayers.length > 0 && retryAttempt < maxRetryAttempts) {
        retryAttempt++;
        if (statusTextEl) {
          statusTextEl.innerText = `Fase 1 (Recupero): Calcolo mirato per ${missingPlayers.length} giocatori rimasti... (Tentativo ${retryAttempt}/${maxRetryAttempts})`;
        }
        
        const retryBatches = [];
        const mappedMissing = missingPlayers.map(p => ({
          id: p.id,
          name: p.name,
          role: p.role,
          country: p.country,
          nextOpponent: getNextOpponentForCountry(p.country)
        }));
        for (let i = 0; i < mappedMissing.length; i += 2) {
          retryBatches.push(mappedMissing.slice(i, i + 2));
        }
        
        for (let rIdx = 0; rIdx < retryBatches.length; rIdx++) {
          const retryBatchPlayers = retryBatches[rIdx];
          
          if (rIdx > 0) {
            await new Promise(resolve => setTimeout(resolve, 800));
          }

          try {
            const retryResponse = await fetch('/api/player-batch-analysis', {
              method: 'POST', 
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                players: retryBatchPlayers,
                provider: state.settings.aiProvider || 'google',
                openRouterModel: state.settings.openRouterModel || 'openai/gpt-oss-120b:free',
                geminiModel: state.settings.geminiModel || 'gemini-flash-lite-latest'
              })
            });
            
            if (retryResponse.ok) {
              const rResult = await retryResponse.json();
              if (rResult && rResult.playersAnalysis) {
                const rKeys = Object.keys(rResult.playersAnalysis);
                const rNameToId = {};
                retryBatchPlayers.forEach(p => {
                  rNameToId[p.name.trim().toLowerCase()] = p.id;
                  p.name.split(/\s+/).forEach(part => {
                    if (part.length > 2) rNameToId[part.toLowerCase()] = p.id;
                  });
                });
                
                rKeys.forEach(key => {
                  let targetId = key;
                  const isValidId = retryBatchPlayers.some(p => p.id === key);
                  if (!isValidId) {
                    const keyLower = key.trim().toLowerCase();
                    if (rNameToId[keyLower]) targetId = rNameToId[keyLower];
                    else {
                      const match = Object.entries(rNameToId).find(([n]) => keyLower.includes(n) || n.includes(keyLower));
                      if (match) targetId = match[1];
                    }
                  }
                  const analysis = normalizePlayerAnalysis(rResult.playersAnalysis[key]);
                  state.aiCache[targetId] = analysis;
                  sessionStorage.setItem(`fantamondiale_ai_${targetId}`, JSON.stringify(analysis));
                });
              }
            }
          } catch (retryErr) {
            console.warn(`Retry batch ${rIdx + 1} failed:`, retryErr);
          }
        }
        
        renderPitch();
        renderTeamDashboard();
        missingPlayers = team.players.filter(p => !state.aiCache[p.id]);
      }
    }

    const evaluatedCount = team.players.filter(p => state.aiCache[p.id]).length;
    if (evaluatedCount === 0) {
      throw new Error('Impossibile ottenere alcuna valutazione dai giocatori. Verifica la connessione e le chiavi API, poi riprova.');
    }

    // Success Screen
    if (progressBarEl) progressBarEl.style.width = '100%';
    
    dialogContent.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; text-align: center;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #10b981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);">✓</div>
        <h3 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 1.15rem; font-weight: 700;">Ricalcolo Completato! 🎉</h3>
        <p style="margin: 0 0 1.5rem 0; font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.45;">
          Tutte le valutazioni e le statistiche dei giocatori per la squadra <strong>${team.name}</strong> sono state aggiornate correttamente con l'AI. (Totale: ${evaluatedCount}/${team.players.length} giocatori).
        </p>
        <button class="btn btn-primary" style="background: linear-gradient(135deg, var(--color-primary) 0%, #4f46e5 100%); border-color: rgba(99, 102, 241, 0.4); padding: 0.55rem 1.5rem; font-size: 0.85rem;" onclick="document.getElementById('ai-recalc-dialog').close()">
          Chiudi
        </button>
      </div>
    `;

    autoSave();
  } catch (err) {
    console.error(err);
    // Error Screen
    dialogContent.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; text-align: center;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(239, 68, 68, 0.15); border: 2px solid #ef4444; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #ef4444; box-shadow: 0 0 15px rgba(239, 68, 68, 0.2);">✗</div>
        <h3 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 1.15rem; font-weight: 700;">Errore Ricalcolo ⚠️</h3>
        <p style="margin: 0 0 1.5rem 0; font-size: 0.85rem; color: var(--color-danger); line-height: 1.45;">
          ${err.message || err}
        </p>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary" style="padding: 0.55rem 1.2rem; font-size: 0.85rem;" onclick="document.getElementById('ai-recalc-dialog').close()">
            Annulla
          </button>
          <button class="btn btn-primary" style="background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); border-color: rgba(168, 85, 247, 0.4); padding: 0.55rem 1.2rem; font-size: 0.85rem;" id="btn-recalc-retry-modal">
            Riprova 🔄
          </button>
        </div>
      </div>
    `;
    const modalRetryBtn = document.getElementById('btn-recalc-retry-modal');
    if (modalRetryBtn) {
      modalRetryBtn.onclick = () => recalculatePlayerEvaluations(team);
    }
  }
}

async function generateIdealLineup(team) {
  if (!team || team.players.length === 0) {
    showToast('Nessun giocatore in rosa da schierare!', 'warning');
    return;
  }

  const pitchContainer = dom.pitchVisualizerContainer;
  const benchContainer = dom.pitchBenchContainer;
  if (!pitchContainer || !benchContainer) return;

  const originalPitchHtml = pitchContainer.innerHTML;
  const originalBenchHtml = benchContainer.innerHTML;

  // Disable buttons during load
  const buttons = document.querySelectorAll('#pitch-action-buttons-wrapper button');
  buttons.forEach(btn => btn.disabled = true);

  // Render a beautiful, premium glassmorphic loader inside the field container
  pitchContainer.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 380px; background: rgba(0,0,0,0.5); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); padding: 2rem; text-align: center; box-sizing: border-box;">
      <div class="ai-skeleton-pulse" style="width: 50px; height: 50px; border-radius: 50%; background: var(--color-primary); margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; animation: pulse 1.5s infinite;">⚽</div>
      <h4 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 0.9rem;">Formazione AI in corso...</h4>
      <p id="ai-recalc-status" style="margin: 0 0 1rem 0; font-size: 0.75rem; color: var(--color-text-muted); line-height: 1.4;">Calcolo schieramento ottimale e modulo tattico da bonus...</p>
      <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; margin-bottom: 0.5rem;">
        <div id="ai-recalc-progress" style="width: 50%; height: 100%; background: linear-gradient(90deg, #38bdf8 0%, #c084fc 100%); border-radius: 3px; transition: width 0.4s ease-out;"></div>
      </div>
    </div>
  `;
  benchContainer.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); font-size: 0.75rem; font-style: italic;">Calcolo in corso...</div>`;

  try {
    const statusTextEl = document.getElementById('ai-recalc-status');
    const progressBarEl = document.getElementById('ai-recalc-progress');

    // Check if any players have evaluations. If completely empty, warn the user.
    const evaluatedPlayers = team.players.filter(p => state.aiCache[p.id]);
    if (evaluatedPlayers.length === 0) {
      showToast('Attenzione: Nessuna valutazione aggiornata in memoria per questa squadra. Esegui prima il "Ricalcolo giocatori" per risultati ideali!', 'warning');
    }

    // Map roster players to include their calculated evaluations (scores, etc.)
    const playersWithEvaluations = team.players.map(p => {
      const analysis = state.aiCache[p.id] || {};
      return {
        id: p.id,
        name: p.name,
        role: p.role,
        country: p.country,
        purchaseCost: p.purchaseCost || 0,
        playerCategory: analysis.playerCategory || "buono",
        starterProbability: analysis.starterProbability || "50%",
        matchStrength: analysis.matchStrength || 50,
        nextOpponent: analysis.matchAnalysis?.nextOpponent || "Da verificare",
        formState: analysis.formState || "In forma."
      };
    });

    const response = await fetch('/api/team-ideal-lineup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        teamName: team.name,
        players: playersWithEvaluations,
        provider: state.settings.aiProvider || 'google',
        openRouterModel: state.settings.openRouterModel || 'openai/gpt-oss-120b:free',
        geminiModel: state.settings.geminiModel || 'gemini-flash-lite-latest'
      })
    });

    if (!response.ok) {
      throw new Error(`Lineup API returned status ${response.status}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }

    // Save ideal lineup recommendation to state
    state.teamIdealLineups[team.id] = {
      module: result.recommendedModule || '4-3-3',
      starters: result.starters || [],
      bench: result.bench || [],
      tacticalJustification: result.tacticalJustification || ''
    };

    // Update the team's module to the AI recommended one
    team.module = result.recommendedModule || team.module || '4-3-3';
    dom.pitchModuleSelect.value = team.module;

    // Set progress to 100%
    if (progressBarEl) {
      progressBarEl.style.width = '100%';
    }

    showToast('Formazione ottimizzata calcolata con successo! 🔮⚽', 'success');
    autoSave();
  } catch (err) {
    console.error(err);
    showToast(`Errore durante il calcolo della formazione: ${err.message || err}`, 'danger');
  }

  // Restore buttons state
  buttons.forEach(btn => btn.disabled = false);

  // Render final updated visualizer and tables
  renderPitch();
  renderTeamDashboard();
}

async function recalculateIdealLineup(team) {
  await recalculatePlayerEvaluations(team);
  await generateIdealLineup(team);
}

// Window globals to wire up inline HTML onclick actions
window.assignPlayerDirect = assignPlayerDirect;
window.undoPurchase = undoPurchase;
window.setPlayerRowTargetTeam = setPlayerRowTargetTeam;
window.toggleSplitDropdown = toggleSplitDropdown;
window.releasePlayer = releasePlayer;
window.showTeamPitch = showTeamPitch;
window.loadSpecificCloudSession = loadSpecificCloudSession;
window.deleteSpecificCloudSession = deleteSpecificCloudSession;
window.showPlayerAIAnalysis = showPlayerAIAnalysis;
window.showTeamAIAnalysis = showTeamAIAnalysis;
window.closeAIPopover = closeAIPopover;
window.focusPlayerInList = focusPlayerInList;
window.copyLineupToClipboard = copyLineupToClipboard;
window.recalculateIdealLineup = recalculateIdealLineup;
window.recalculatePlayerEvaluations = recalculatePlayerEvaluations;
window.generateIdealLineup = generateIdealLineup;
window.autoLoadCloudSession = autoLoadCloudSession;
window.openStartupDialog = openStartupDialog;
window.openNewSessionFromStartup = openNewSessionFromStartup;
window.loadStartupCloudSession = loadStartupCloudSession;
window.resetSessionClean = resetSessionClean;
window.loginAsAdmin = loginAsAdmin;
window.logoutCloudSession = logoutCloudSession;

// --- TOURNAMENT SIMULATOR AND BRACKET FUNCTIONS ---

function initializeTournament(force = false) {
  if (state.tournament && state.tournament.groups && state.tournament.groups.A && state.tournament.knockout && !force) {
    return;
  }

  // Base tournament teams list (Group A to L, 4 per group) - Official 2026 FIFA World Cup Groups
  const defaultGroups = {
    A: ['Messico', 'Sudafrica', 'Corea del Sud', 'Rep. Ceca'],
    B: ['Canada', 'Bosnia ed Erzegovina', 'Qatar', 'Svizzera'],
    C: ['Brasile', 'Marocco', 'Haiti', 'Scozia'],
    D: ['Stati Uniti', 'Paraguay', 'Australia', 'Turchia'],
    E: ['Germania', 'Curaçao', 'Costa d\'Avorio', 'Ecuador'],
    F: ['Paesi Bassi', 'Giappone', 'Svezia', 'Tunisia'],
    G: ['Belgio', 'Egitto', 'Iran', 'Nuova Zelanda'],
    H: ['Spagna', 'Capo Verde', 'Arabia Saudita', 'Uruguay'],
    I: ['Francia', 'Senegal', 'Iraq', 'Norvegia'],
    J: ['Argentina', 'Algeria', 'Austria', 'Giordania'],
    K: ['Portogallo', 'Repubblica Democratica del Congo', 'Uzbekistan', 'Colombia'],
    L: ['Inghilterra', 'Croazia', 'Ghana', 'Panama']
  };

  // Deep clone defaultGroups to state.tournament.groups
  const finalGroups = JSON.parse(JSON.stringify(defaultGroups));

  state.tournament = {
    groups: finalGroups,
    knockout: {
      r32: Array(16).fill(null),
      r16: Array(8).fill(null),
      qf: Array(4).fill(null),
      sf: Array(2).fill(null),
      final: null,
      thirdPlaceWinner: null
    },
    showAiProbabilities: false
  };
}

function getTeamRating(teamName) {
  const baseRatings = {
    'Francia': 94, 'Argentina': 93, 'Brasile': 92, 'Inghilterra': 92, 'Spagna': 91,
    'Portogallo': 90, 'Germania': 89, 'Belgio': 88, 'Paesi Bassi': 88, 'Italia': 87,
    'Marocco': 86, 'Croazia': 86, 'Uruguay': 85, 'Colombia': 84, 'Giappone': 83,
    'Danimarca': 82, 'Svizzera': 82, 'Senegal': 82, 'Turchia': 82, 'Svezia': 82,
    'USA': 81, 'Stati Uniti': 81, 'Costa d\'Avorio': 81, 'Nigeria': 81, 'Norvegia': 80,
    'Polonia': 80, 'Messico': 80, 'Rep. Ceca': 80, 'Austria': 80, 'Corea del Sud': 79,
    'Algeria': 79, 'Egitto': 78, 'Serbia': 78, 'Bosnia ed Erzegovina': 78, 'Scozia': 78,
    'Paraguay': 78, 'Camerun': 77, 'Canada': 77, 'Galles': 77, 'Ghana': 76,
    'Ecuador': 76, 'Australia': 76, 'Tunisia': 75, 'Capo Verde': 75,
    'Repubblica Democratica del Congo': 74, 'Sudafrica': 74, 'Arabia Saudita': 74,
    'Costa Rica': 74, 'Uzbekistan': 73, 'Iran': 73, 'Haiti': 72, 'Giordania': 72,
    'Panama': 72, 'Nuova Zelanda': 71, 'Iraq': 71, 'Qatar': 70, 'Curaçao': 68
  };

  let rating = baseRatings[teamName] || 78;

  if (state.players && Array.isArray(state.players)) {
    const nationPlayers = state.players.filter(p => p.country === teamName);
    if (nationPlayers.length > 0) {
      const sortedVals = nationPlayers.map(p => p.initialValue || 1).sort((a, b) => b - a);
      const topAvg = sortedVals.slice(0, 3).reduce((sum, v) => sum + v, 0) / Math.min(3, sortedVals.length);
      const boost = Math.min(5, topAvg / 8);
      rating += boost;
    }
  }

  if (isCountryEliminated(teamName)) {
    rating = 10;
  }

  return rating;
}

function getTournamentTree() {
  const groups = state.tournament.groups || {};
  const ko = state.tournament.knockout || {};

  const getTeamName = (groupKey, index) => {
    return (groups[groupKey] && groups[groupKey][index]) ? groups[groupKey][index] : 'In attesa...';
  };

  // 1. Calculate best 3rd placed teams across all 12 groups A to L
  const allThirds = [];
  const groupKeys = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  groupKeys.forEach(k => {
    if (groups[k] && groups[k][2]) {
      allThirds.push({ teamName: groups[k][2], groupKey: k });
    }
  });

  // Sort by Elo rating descending (deterministic ranking)
  allThirds.sort((a, b) => getTeamRating(b.teamName) - getTeamRating(a.teamName));
  const bestThirds = allThirds.slice(0, 8);

  // 2. Perform backtracking bipartite matching between group winners and 3rd placed teams
  function matchThirds(bestThirdsList) {
    const winners = [
      { id: 'E', allowed: ['A', 'B', 'C', 'D', 'F'] },
      { id: 'I', allowed: ['C', 'D', 'F', 'G', 'H'] },
      { id: 'A', allowed: ['C', 'E', 'F', 'H', 'I'] },
      { id: 'L', allowed: ['E', 'H', 'I', 'J', 'K'] },
      { id: 'G', allowed: ['A', 'E', 'H', 'I', 'J'] },
      { id: 'D', allowed: ['B', 'E', 'F', 'I', 'J'] },
      { id: 'B', allowed: ['E', 'F', 'G', 'I', 'J'] },
      { id: 'K', allowed: ['D', 'E', 'I', 'J', 'L'] }
    ];

    const assigned = Array(8).fill(null);
    const used = Array(8).fill(false);

    function dfs(winnerIndex) {
      if (winnerIndex === 8) return true;
      const allowedGroups = winners[winnerIndex].allowed;
      for (let i = 0; i < bestThirdsList.length; i++) {
        if (!used[i] && allowedGroups.includes(bestThirdsList[i].groupKey)) {
          used[i] = true;
          assigned[winnerIndex] = i;
          if (dfs(winnerIndex + 1)) return true;
          used[i] = false;
          assigned[winnerIndex] = null;
        }
      }
      return false;
    }

    const success = dfs(0);

    if (!success) {
      // Fallback greedy matching if DFS fails
      const fallbackUsed = Array(8).fill(false);
      for (let w = 0; w < 8; w++) {
        let found = false;
        const allowedGroups = winners[w].allowed;
        for (let i = 0; i < bestThirdsList.length; i++) {
          if (!fallbackUsed[i] && allowedGroups.includes(bestThirdsList[i].groupKey)) {
            fallbackUsed[i] = true;
            assigned[w] = i;
            found = true;
            break;
          }
        }
        if (!found) {
          for (let i = 0; i < bestThirdsList.length; i++) {
            if (!fallbackUsed[i]) {
              fallbackUsed[i] = true;
              assigned[w] = i;
              break;
            }
          }
        }
      }
    }

    const result = {};
    winners.forEach((w, idx) => {
      const thirdIdx = assigned[idx];
      result[w.id] = (thirdIdx !== null && bestThirdsList[thirdIdx]) ? bestThirdsList[thirdIdx].teamName : 'In attesa...';
    });
    return result;
  }

  const thirdsMatch = matchThirds(bestThirds);

  // 3. Define Round of 32 Pairings (Official FIFA 2026 Regulations or Custom Overrides)
  let r32Matches;
  if (state.tournament && state.tournament.customR32 && state.tournament.customR32.length === 16) {
    r32Matches = state.tournament.customR32.map(pair => [pair[0] || 'In attesa...', pair[1] || 'In attesa...']);
  } else {
    r32Matches = [
      [getTeamName('E', 0), thirdsMatch.E || 'In attesa...'], // Match 0 (Winner E vs 3rd A/B/C/D/F)
      [getTeamName('I', 0), thirdsMatch.I || 'In attesa...'], // Match 1 (Winner I vs 3rd C/D/F/G/H)
      [getTeamName('A', 1), getTeamName('B', 1)],             // Match 2 (2A vs 2B - Gara 73)
      [getTeamName('F', 0), getTeamName('C', 1)],             // Match 3 (1F vs 2C - Gara 75)
      [getTeamName('K', 1), getTeamName('L', 1)],             // Match 4 (2K vs 2L - Gara 83)
      [getTeamName('H', 0), getTeamName('J', 1)],             // Match 5 (1H vs 2J - Gara 84)
      [getTeamName('D', 0), thirdsMatch.D || 'In attesa...'], // Match 6 (Winner D vs 3rd B/E/F/I/J)
      [getTeamName('G', 0), thirdsMatch.G || 'In attesa...'], // Match 7 (Winner G vs 3rd A/E/H/I/J)
      [getTeamName('C', 0), getTeamName('F', 1)],             // Match 8 (1C vs 2F - Gara 76)
      [getTeamName('E', 1), getTeamName('I', 1)],             // Match 9 (2E vs 2I - Gara 78)
      [getTeamName('A', 0), thirdsMatch.A || 'In attesa...'], // Match 10 (Winner A vs 3rd C/E/F/H/I)
      [getTeamName('L', 0), thirdsMatch.L || 'In attesa...'], // Match 11 (Winner L vs 3rd E/H/I/J/K)
      [getTeamName('J', 0), getTeamName('H', 1)],             // Match 12 (1J vs 2H - Gara 86)
      [getTeamName('D', 1), getTeamName('G', 1)],             // Match 13 (2D vs 2G - Gara 88)
      [getTeamName('B', 0), thirdsMatch.B || 'In attesa...'], // Match 14 (Winner B vs 3rd E/F/G/I/J)
      [getTeamName('K', 0), thirdsMatch.K || 'In attesa...']  // Match 15 (Winner K vs 3rd D/E/I/J/L)
    ];
  }

  const r16Matches = [
    [ko.r32 ? ko.r32[2] : null, ko.r32 ? ko.r32[3] : null], // R16 Match 0: Winner Gara 73 (Match 2) vs Winner Gara 75 (Match 3)
    [ko.r32 ? ko.r32[0] : null, ko.r32 ? ko.r32[1] : null], // R16 Match 1: Winner Match 0 vs Winner Match 1
    [ko.r32 ? ko.r32[4] : null, ko.r32 ? ko.r32[5] : null], // R16 Match 2: Winner Match 4 vs Winner Match 5
    [ko.r32 ? ko.r32[6] : null, ko.r32 ? ko.r32[7] : null], // R16 Match 3: Winner Match 6 vs Winner Match 7
    [ko.r32 ? ko.r32[8] : null, ko.r32 ? ko.r32[9] : null], // R16 Match 4: Winner Match 8 vs Winner Match 9
    [ko.r32 ? ko.r32[10] : null, ko.r32 ? ko.r32[11] : null], // R16 Match 5: Winner Match 10 vs Winner Match 11
    [ko.r32 ? ko.r32[12] : null, ko.r32 ? ko.r32[13] : null], // R16 Match 6: Winner Match 12 vs Winner Match 13
    [ko.r32 ? ko.r32[14] : null, ko.r32 ? ko.r32[15] : null]  // R16 Match 7: Winner Match 14 vs Winner Match 15
  ];

  const qfMatches = [
    [ko.r16 ? ko.r16[0] : null, ko.r16 ? ko.r16[1] : null], // QF 0
    [ko.r16 ? ko.r16[2] : null, ko.r16 ? ko.r16[3] : null], // QF 1
    [ko.r16 ? ko.r16[4] : null, ko.r16 ? ko.r16[5] : null], // QF 2
    [ko.r16 ? ko.r16[6] : null, ko.r16 ? ko.r16[7] : null]  // QF 3
  ];

  const sfMatches = [
    [ko.qf ? ko.qf[0] : null, ko.qf ? ko.qf[1] : null], // SF 0
    [ko.qf ? ko.qf[2] : null, ko.qf ? ko.qf[3] : null]  // SF 1
  ];

  const sf0Winner = ko.sf ? ko.sf[0] : null;
  const sf0Participants = sfMatches[0];
  const sf0Loser = sf0Winner ? (sf0Participants[0] === sf0Winner ? sf0Participants[1] : sf0Participants[0]) : null;

  const sf1Winner = ko.sf ? ko.sf[1] : null;
  const sf1Participants = sfMatches[1];
  const sf1Loser = sf1Winner ? (sf1Participants[0] === sf1Winner ? sf1Participants[1] : sf1Participants[0]) : null;

  const finalMatch = [ko.sf ? ko.sf[0] : null, ko.sf ? ko.sf[1] : null];
  const thirdPlaceMatch = [sf0Loser, sf1Loser];

  return {
    r32: r32Matches,
    r16: r16Matches,
    qf: qfMatches,
    sf: sfMatches,
    final: finalMatch,
    thirdPlace: thirdPlaceMatch
  };
}

function getNextOpponentForCountry(countryName, round) {
  if (!state.tournament || !state.tournament.groups) {
    initializeTournament();
  }
  
  const r = round || state.activeRound || 'G1';
  
  if (r === 'G1' || r === 'G2' || r === 'G3') {
    // Find the group containing the countryName
    const groups = state.tournament.groups || {};
    let groupTeams = null;
    for (const gk in groups) {
      if (groups[gk] && groups[gk].includes(countryName)) {
        groupTeams = groups[gk];
        break;
      }
    }
    if (!groupTeams || groupTeams.length < 4) return 'Da verificare';
    
    const idx = groupTeams.indexOf(countryName);
    if (r === 'G1') {
      if (idx === 0) return groupTeams[1];
      if (idx === 1) return groupTeams[0];
      if (idx === 2) return groupTeams[3];
      if (idx === 3) return groupTeams[2];
    } else if (r === 'G2') {
      if (idx === 0) return groupTeams[2];
      if (idx === 1) return groupTeams[3];
      if (idx === 2) return groupTeams[0];
      if (idx === 3) return groupTeams[1];
    } else if (r === 'G3') {
      if (idx === 0) return groupTeams[3];
      if (idx === 1) return groupTeams[2];
      if (idx === 2) return groupTeams[1];
      if (idx === 3) return groupTeams[0];
    }
  } else {
    // Knockout round
    const tree = getTournamentTree();
    let matches = [];
    if (r === 'Sedicesimi') matches = tree.r32 || [];
    else if (r === 'Ottavi') matches = tree.r16 || [];
    else if (r === 'Quarti') matches = tree.qf || [];
    else if (r === 'Semifinale') matches = tree.sf || [];
    else if (r === 'Finale') {
      matches = [tree.final, tree.thirdPlace].filter(Boolean);
    }
    
    for (const match of matches) {
      if (match && match.includes(countryName)) {
        const opponent = match[0] === countryName ? match[1] : match[0];
        return opponent || 'In attesa...';
      }
    }
  }
  return 'Da verificare';
}
window.getNextOpponentForCountry = getNextOpponentForCountry;

function validateKnockoutWinners() {
  if (!state.tournament || !state.tournament.groups || !state.tournament.groups.A || !state.tournament.knockout) return false;

  let changed = false;
  for (let step = 0; step < 6; step++) {
    const tree = getTournamentTree();
    const ko = state.tournament.knockout;

    if (step === 0) {
      if (ko.r32) {
        for (let i = 0; i < 16; i++) {
          if (ko.r32[i] !== null) {
            const parts = tree.r32[i];
            if (!parts.includes(ko.r32[i]) || parts.includes(undefined) || parts.includes(null)) {
              ko.r32[i] = null;
              changed = true;
            }
          }
        }
      }
    } else if (step === 1) {
      for (let i = 0; i < 8; i++) {
        if (ko.r16[i] !== null) {
          const parts = tree.r16[i];
          if (!parts.includes(ko.r16[i]) || parts.includes(undefined) || parts.includes(null)) {
            ko.r16[i] = null;
            changed = true;
          }
        }
      }
    } else if (step === 2) {
      for (let i = 0; i < 4; i++) {
        if (ko.qf[i] !== null) {
          const parts = tree.qf[i];
          if (!parts.includes(ko.qf[i]) || parts.includes(undefined) || parts.includes(null)) {
            ko.qf[i] = null;
            changed = true;
          }
        }
      }
    } else if (step === 3) {
      for (let i = 0; i < 2; i++) {
        if (ko.sf[i] !== null) {
          const parts = tree.sf[i];
          if (!parts.includes(ko.sf[i]) || parts.includes(undefined) || parts.includes(null)) {
            ko.sf[i] = null;
            changed = true;
          }
        }
      }
    } else if (step === 4) {
      if (ko.final !== null) {
        const parts = tree.final;
        if (!parts.includes(ko.final) || parts.includes(undefined) || parts.includes(null)) {
          ko.final = null;
          changed = true;
        }
      }
    } else if (step === 5) {
      if (ko.thirdPlaceWinner !== null && ko.thirdPlaceWinner !== undefined) {
        const parts = tree.thirdPlace;
        if (!parts.includes(ko.thirdPlaceWinner) || parts.includes(undefined) || parts.includes(null)) {
          ko.thirdPlaceWinner = null;
          changed = true;
        }
      }
    }
  }

  return changed;
}

function swapGroupTeams(groupKey, indexA, indexB) {
  if (!state.tournament || !state.tournament.groups[groupKey]) return;
  const group = state.tournament.groups[groupKey];
  if (indexA < 0 || indexA > 3 || indexB < 0 || indexB > 3) return;

  const temp = group[indexA];
  group[indexA] = group[indexB];
  group[indexB] = temp;

  validateKnockoutWinners();
  autoSave();
  renderAll();
}

function selectKnockoutWinner(roundKey, matchIndex, winnerName) {
  if (!state.tournament || !winnerName || winnerName === 'In attesa...') return;

  const ko = state.tournament.knockout;
  let currentWinner = null;
  if (roundKey === 'r32') currentWinner = ko.r32 ? ko.r32[matchIndex] : null;
  else if (roundKey === 'r16') currentWinner = ko.r16[matchIndex];
  else if (roundKey === 'qf') currentWinner = ko.qf[matchIndex];
  else if (roundKey === 'sf') currentWinner = ko.sf[matchIndex];
  else if (roundKey === 'final') currentWinner = ko.final;
  else if (roundKey === 'thirdPlace') currentWinner = ko.thirdPlaceWinner;

  const newWinner = (currentWinner === winnerName) ? null : winnerName;

  if (roundKey === 'r32') {
    if (!ko.r32) ko.r32 = Array(16).fill(null);
    ko.r32[matchIndex] = newWinner;
  }
  else if (roundKey === 'r16') ko.r16[matchIndex] = newWinner;
  else if (roundKey === 'qf') ko.qf[matchIndex] = newWinner;
  else if (roundKey === 'sf') ko.sf[matchIndex] = newWinner;
  else if (roundKey === 'final') ko.final = newWinner;
  else if (roundKey === 'thirdPlace') ko.thirdPlaceWinner = newWinner;

  validateKnockoutWinners();
  autoSave();
  renderAll();
}

function simulateGroups() {
  if (!state.tournament) return;

  state.tournament.showAiProbabilities = false;

  for (const groupKey in state.tournament.groups) {
    const teams = state.tournament.groups[groupKey];
    const ratedTeams = teams.map(t => {
      const rating = getTeamRating(t);
      const noise = (Math.random() - 0.5) * 10;
      return { name: t, strength: rating + noise };
    });

    ratedTeams.sort((a, b) => b.strength - a.strength);
    state.tournament.groups[groupKey] = ratedTeams.map(t => t.name);
  }

  validateKnockoutWinners();
  autoSave();
  renderAll();
  showToast('Gironi simulati con successo! 🎲', 'success');
}

function simulateEntireTournament() {
  if (!state.tournament || !state.tournament.groups || !state.tournament.groups.A || !state.tournament.knockout) {
    initializeTournament();
  }

  state.tournament.showAiProbabilities = false;

  for (const groupKey in state.tournament.groups) {
    const teams = state.tournament.groups[groupKey];
    const ratedTeams = teams.map(t => {
      const rating = getTeamRating(t);
      const noise = (Math.random() - 0.5) * 8;
      return { name: t, strength: rating + noise };
    });
    ratedTeams.sort((a, b) => b.strength - a.strength);
    state.tournament.groups[groupKey] = ratedTeams.map(t => t.name);
  }

  validateKnockoutWinners();

  const simMatchWinner = (teamA, teamB) => {
    if (!teamA) return teamB;
    if (!teamB) return teamA;
    const ratingA = getTeamRating(teamA);
    const ratingB = getTeamRating(teamB);
    const probA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 20));
    return Math.random() < probA ? teamA : teamB;
  };

  const ko = state.tournament.knockout;

  let tree = getTournamentTree();
  if (!ko.r32) ko.r32 = Array(16).fill(null);
  for (let i = 0; i < 16; i++) {
    ko.r32[i] = simMatchWinner(tree.r32[i][0], tree.r32[i][1]);
  }

  tree = getTournamentTree();
  for (let i = 0; i < 8; i++) {
    ko.r16[i] = simMatchWinner(tree.r16[i][0], tree.r16[i][1]);
  }

  tree = getTournamentTree();
  for (let i = 0; i < 4; i++) {
    ko.qf[i] = simMatchWinner(tree.qf[i][0], tree.qf[i][1]);
  }

  tree = getTournamentTree();
  for (let i = 0; i < 2; i++) {
    ko.sf[i] = simMatchWinner(tree.sf[i][0], tree.sf[i][1]);
  }

  tree = getTournamentTree();
  ko.final = simMatchWinner(tree.final[0], tree.final[1]);
  ko.thirdPlaceWinner = simMatchWinner(tree.thirdPlace[0], tree.thirdPlace[1]);

  validateKnockoutWinners();
  autoSave();
  renderAll();
  showToast(`Mondiale simulato completamente! 🚀 Vincitore: ${ko.final}`, 'success');
}

function simulateAiPrediction() {
  if (!state.tournament || !state.tournament.groups || !state.tournament.groups.A || !state.tournament.knockout) {
    initializeTournament();
  }

  state.tournament.showAiProbabilities = true;

  const container = document.getElementById('tournament-views-container');
  if (container) {
    container.innerHTML = `
      <div class="empty-state" style="animation: pulse 1.5s infinite; min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div class="champion-trophy" style="font-size: 3.5rem; margin-bottom: 1rem; animation: trophy-bounce 1s infinite alternate;">🔮</div>
        <h3 style="margin-bottom: 0.5rem;">Analisi Predittiva IA in corso...</h3>
        <p style="font-size: 0.8rem; color: var(--color-text-muted);">Calcolo delle probabilità del tabellone e simulazione dei turni in corso...</p>
      </div>
    `;
  }

  setTimeout(() => {
    for (const groupKey in state.tournament.groups) {
      const teams = state.tournament.groups[groupKey];
      const ratedTeams = teams.map(t => ({ name: t, strength: getTeamRating(t) }));
      ratedTeams.sort((a, b) => b.strength - a.strength);
      state.tournament.groups[groupKey] = ratedTeams.map(t => t.name);
    }

    validateKnockoutWinners();

    const getStrongerTeam = (teamA, teamB) => {
      if (!teamA) return teamB;
      if (!teamB) return teamA;
      return getTeamRating(teamA) >= getTeamRating(teamB) ? teamA : teamB;
    };

    const ko = state.tournament.knockout;

    let tree = getTournamentTree();
    if (!ko.r32) ko.r32 = Array(16).fill(null);
    for (let i = 0; i < 16; i++) {
      ko.r32[i] = getStrongerTeam(tree.r32[i][0], tree.r32[i][1]);
    }

    tree = getTournamentTree();
    for (let i = 0; i < 8; i++) {
      ko.r16[i] = getStrongerTeam(tree.r16[i][0], tree.r16[i][1]);
    }

    tree = getTournamentTree();
    for (let i = 0; i < 4; i++) {
      ko.qf[i] = getStrongerTeam(tree.qf[i][0], tree.qf[i][1]);
    }

    tree = getTournamentTree();
    for (let i = 0; i < 2; i++) {
      ko.sf[i] = getStrongerTeam(tree.sf[i][0], tree.sf[i][1]);
    }

    tree = getTournamentTree();
    ko.final = getStrongerTeam(tree.final[0], tree.final[1]);
    ko.thirdPlaceWinner = getStrongerTeam(tree.thirdPlace[0], tree.thirdPlace[1]);

    validateKnockoutWinners();
    autoSave();
    renderAll();
    showToast('Previsione probabilistica IA calcolata! 🔮', 'success');
  }, 800);
}

function resetTournament() {
  if (!confirm('Sei sicuro di voler resettare la simulazione del mondiale?')) return;
  initializeTournament(true);
  autoSave();
  renderAll();
  showToast('Simulazione del mondiale resettata.', 'info');
}

function renderTournament() {
  const container = document.getElementById('tournament-views-container');
  if (!container) return;

  if (!state.tournament || !state.tournament.groups || !state.tournament.groups.A || !state.tournament.knockout) {
    initializeTournament();
  }

  const tabGroups = document.getElementById('subtab-groups');
  const tabBracket = document.getElementById('subtab-bracket');
  if (tabGroups && tabBracket) {
    tabGroups.classList.toggle('active', state.tournamentTab === 'gironi');
    tabBracket.classList.toggle('active', state.tournamentTab === 'tabellone');
  }

  if (state.tournamentTab === 'gironi') {
    renderGroupStage(container);
  } else {
    renderKnockoutBracket(container);
  }
}

// --- GROUP STAGE IA CALCULATIONS & DRAG-AND-DROP ---

function getGroupQualificationProbabilities(groupTeams) {
  if (!groupTeams || groupTeams.length < 4) return [50, 50, 50, 50];
  const ratings = groupTeams.map(t => getTeamRating(t));
  const simCount = 500;
  const qualCounts = [0, 0, 0, 0];

  for (let s = 0; s < simCount; s++) {
    const points = [0, 0, 0, 0];
    const goalsDiff = [0, 0, 0, 0];
    
    const simulateMatch = (idxA, idxB) => {
      const rA = ratings[idxA];
      const rB = ratings[idxB];
      const probA = 1 / (1 + Math.pow(10, (rB - rA) / 20));
      const rand = Math.random();
      // Win A: 70% of probA, Win B: 70% of (1 - probA), Draw: 30%
      const winAProb = probA * 0.7;
      const winBProb = (1 - probA) * 0.7;
      if (rand < winAProb) {
        points[idxA] += 3;
        goalsDiff[idxA] += 1;
        goalsDiff[idxB] -= 1;
      } else if (rand < winAProb + winBProb) {
        points[idxB] += 3;
        goalsDiff[idxB] += 1;
        goalsDiff[idxA] -= 1;
      } else {
        points[idxA] += 1;
        points[idxB] += 1;
      }
    };

    simulateMatch(0, 1);
    simulateMatch(0, 2);
    simulateMatch(0, 3);
    simulateMatch(1, 2);
    simulateMatch(1, 3);
    simulateMatch(2, 3);

    const indices = [0, 1, 2, 3];
    indices.sort((a, b) => {
      if (points[b] !== points[a]) return points[b] - points[a];
      if (goalsDiff[b] !== goalsDiff[a]) return goalsDiff[b] - goalsDiff[a];
      return ratings[b] - ratings[a];
    });

    qualCounts[indices[0]]++;
    qualCounts[indices[1]]++;
  }

  return groupTeams.map((t, idx) => Math.round((qualCounts[idx] / simCount) * 100));
}

function handleGroupDragStart(event, groupKey, index) {
  event.dataTransfer.setData('text/plain', JSON.stringify({ groupKey, index }));
  event.dataTransfer.effectAllowed = 'move';
  event.currentTarget.classList.add('dragging');
}

function handleGroupDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function handleGroupDragEnter(event) {
  event.preventDefault();
  const row = event.currentTarget.closest('.group-team-row');
  if (row) row.classList.add('drag-over');
}

function handleGroupDragLeave(event) {
  const row = event.currentTarget.closest('.group-team-row');
  if (row) row.classList.remove('drag-over');
}

function handleGroupDrop(event, targetGroupKey, targetIndex) {
  event.preventDefault();
  const row = event.currentTarget.closest('.group-team-row');
  if (row) row.classList.remove('drag-over');
  
  try {
    const data = JSON.parse(event.dataTransfer.getData('text/plain'));
    const { groupKey, index } = data;
    
    if (groupKey === targetGroupKey && index !== targetIndex) {
      swapGroupTeams(groupKey, index, targetIndex);
    }
  } catch (err) {
    console.error('Drag and drop error:', err);
  }
}

// Bind to window for global access in inline event attributes
window.handleGroupDragStart = handleGroupDragStart;
window.handleGroupDragOver = handleGroupDragOver;
window.handleGroupDragEnter = handleGroupDragEnter;
window.handleGroupDragLeave = handleGroupDragLeave;
window.handleGroupDrop = handleGroupDrop;

function renderGroupStage(container) {
  const groups = state.tournament.groups;
  const userTeam = state.teams.find(t => t.isUserTeam);

  let html = `<div class="groups-grid">`;

  for (const groupKey in groups) {
    const teams = groups[groupKey];
    const qualProbs = state.tournament.showAiProbabilities ? getGroupQualificationProbabilities(teams) : null;

    html += `
      <div class="group-card">
        <h3 class="group-card-title">Gruppo ${groupKey}</h3>
        <div class="group-team-list">
    `;

    teams.forEach((teamName, idx) => {
      const pCount = userTeam ? (state.players || []).filter(p => p.ownerId === userTeam.id && p.country === teamName).length : 0;
      const userPlayers = userTeam ? (state.players || []).filter(p => p.ownerId === userTeam.id && p.country === teamName) : [];

      let badgeHtml = '';
      if (pCount > 0) {
        const tooltipText = `Calciatori in rosa: ${userPlayers.map(p => `${p.name} (${p.role})`).join(', ')}`;
        badgeHtml = `
          <span class="team-user-badge" data-tooltip="${tooltipText}" title="${tooltipText}">
            ${pCount}
          </span>
        `;
      }

      let probHtml = '';
      if (qualProbs) {
        probHtml = `
          <span class="group-prob-badge" style="margin-left: auto; font-size: 0.65rem; font-weight: 700; color: #a855f7; background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.25); padding: 0.1rem 0.35rem; border-radius: 4px; display: inline-flex; align-items: center; gap: 0.15rem;" title="Probabilità di passaggio del turno (IA)">
            IA: ${qualProbs[idx]}%
          </span>
        `;
      }

      const upDisabled = idx === 0 ? 'disabled' : '';
      const downDisabled = idx === 3 ? 'disabled' : '';

      html += `
        <div class="group-team-row" draggable="true" 
             ondragstart="handleGroupDragStart(event, '${groupKey}', ${idx})" 
             ondragover="handleGroupDragOver(event)" 
             ondragenter="handleGroupDragEnter(event)"
             ondragleave="handleGroupDragLeave(event)"
             ondrop="handleGroupDrop(event, '${groupKey}', ${idx})">
          <div class="team-info-left" style="flex: 1;">
            <span class="team-pos">${idx + 1}</span>
            <span class="team-name" title="${teamName}">${teamName}</span>
            ${badgeHtml}
            ${probHtml}
          </div>
          <div class="reorder-controls">
            <button class="btn-reorder" ${upDisabled} onclick="swapGroupTeams('${groupKey}', ${idx}, ${idx - 1})">▲</button>
            <button class="btn-reorder" ${downDisabled} onclick="swapGroupTeams('${groupKey}', ${idx}, ${idx + 1})">▼</button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}

function renderKnockoutBracket(container) {
  const tree = getTournamentTree();
  const ko = state.tournament.knockout;
  const userTeam = state.teams.find(t => t.isUserTeam);

  let html = `<div class="bracket-wrapper">`;

  // Sedicesimi
  html += `<div class="bracket-column"><div class="bracket-column-header">Sedicesimi di Finale</div>`;
  for (let i = 0; i < 16; i++) {
    const teamA = tree.r32[i][0];
    const teamB = tree.r32[i][1];
    const winner = ko.r32 ? ko.r32[i] : null;
    html += renderBracketMatchCard('r32', i, teamA, teamB, winner, `Sedicesimo ${i+1}`, userTeam);
  }
  html += `</div>`;

  // Ottavi
  html += `<div class="bracket-column"><div class="bracket-column-header">Ottavi di Finale</div>`;
  for (let i = 0; i < 8; i++) {
    const teamA = tree.r16[i][0];
    const teamB = tree.r16[i][1];
    const winner = ko.r16[i];
    html += renderBracketMatchCard('r16', i, teamA, teamB, winner, `Ottavo ${i+1}`, userTeam);
  }
  html += `</div>`;

  // Quarti
  html += `<div class="bracket-column"><div class="bracket-column-header">Quarti di Finale</div>`;
  for (let i = 0; i < 4; i++) {
    const teamA = tree.qf[i][0];
    const teamB = tree.qf[i][1];
    const winner = ko.qf[i];
    html += renderBracketMatchCard('qf', i, teamA, teamB, winner, `Quarto ${i+1}`, userTeam);
  }
  html += `</div>`;

  // Semifinali
  html += `<div class="bracket-column"><div class="bracket-column-header">Semifinali</div>`;
  for (let i = 0; i < 2; i++) {
    const teamA = tree.sf[i][0];
    const teamB = tree.sf[i][1];
    const winner = ko.sf[i];
    html += renderBracketMatchCard('sf', i, teamA, teamB, winner, `Semifinale ${i+1}`, userTeam);
  }
  html += `</div>`;

  // Finale
  html += `<div class="bracket-column final-column"><div class="bracket-column-header">Finale</div>`;
  const finalTeamA = tree.final[0];
  const finalTeamB = tree.final[1];
  const finalWinner = ko.final;
  html += renderBracketMatchCard('final', 0, finalTeamA, finalTeamB, finalWinner, 'Finale', userTeam);

  const thirdTeamA = tree.thirdPlace[0];
  const thirdTeamB = tree.thirdPlace[1];
  const thirdWinner = ko.thirdPlaceWinner;
  html += renderBracketMatchCard('thirdPlace', 0, thirdTeamA, thirdTeamB, thirdWinner, 'Finale 3° Posto 🥉', userTeam);
  html += `</div>`;

  // Vincitore
  html += `
    <div class="bracket-column">
      <div class="bracket-column-header">Vincitore 🏆</div>
      <div class="champion-container">
  `;
  if (ko.final) {
    const champPlayers = userTeam ? (state.players || []).filter(p => p.ownerId === userTeam.id && p.country === ko.final) : [];
    let champPlayersHtml = '';
    if (champPlayers.length > 0) {
      champPlayersHtml = `
        <div class="champion-user-players">
          Hai <strong>${champPlayers.length}</strong> campioni in rosa:<br>
          <span style="font-size: 0.65rem; color: #fff; font-weight: 500;">
            ${champPlayers.map(p => p.name).join(', ')}
          </span>
        </div>
      `;
    } else {
      champPlayersHtml = `
        <div class="champion-user-players">Nessun calciatore della tua rosa in questa nazionale.</div>
      `;
    }

    html += `
      <div class="champion-box">
        <h4>Campione del Mondo</h4>
        <div class="champion-trophy">🏆</div>
        <div class="champion-team-name">${ko.final}</div>
        ${champPlayersHtml}
      </div>
    `;
  } else {
    html += `
      <div class="champion-box" style="opacity: 0.4; border-style: dotted; background: transparent; box-shadow: none; animation: none;">
        <h4>Campione del Mondo</h4>
        <div class="champion-trophy" style="filter: grayscale(1); animation: none; opacity: 0.5;">🏆</div>
        <div style="font-size: 0.72rem; color: var(--color-text-muted); font-style: italic;">Simula la finale</div>
      </div>
    `;
  }
  html += `</div></div></div>`;

  container.innerHTML = html;
}

function renderBracketMatchCard(roundKey, matchIndex, teamA, teamB, winner, title, userTeam) {
  const showProb = state.tournament.showAiProbabilities && teamA && teamB;
  let probA = 50;
  let probB = 50;
  if (showProb) {
    const ratingA = getTeamRating(teamA);
    const ratingB = getTeamRating(teamB);
    probA = Math.round(100 / (1 + Math.pow(10, (ratingB - ratingA) / 20)));
    probB = 100 - probA;
  }

  const renderSlot = (teamName, isTeamB, slotIdx) => {
    if (roundKey === 'r32') {
      const isWinner = winner === teamName;
      const isEliminated = winner && winner !== teamName;
      const pCount = userTeam ? (state.players || []).filter(p => p.ownerId === userTeam.id && p.country === teamName).length : 0;
      const userPlayers = userTeam ? (state.players || []).filter(p => p.ownerId === userTeam.id && p.country === teamName) : [];

      let badgeHtml = '';
      if (pCount > 0 && teamName && teamName !== 'In attesa...') {
        const tooltipText = `Calciatori in rosa: ${userPlayers.map(p => `${p.name} (${p.role})`).join(', ')}`;
        badgeHtml = `
          <span class="team-user-badge" data-tooltip="${tooltipText}" title="${tooltipText}" style="margin-left: 0.15rem; margin-right: 0.15rem; padding: 0.05rem 0.25rem; font-size: 0.6rem;">
            ${pCount}
          </span>
        `;
      }

      let classes = 'bracket-team-slot';
      if (isWinner) classes += ' selected-winner';
      if (isEliminated) classes += ' eliminated-team';

      const probText = showProb ? `<span class="slot-prob-text" style="font-size: 0.65rem;">${isTeamB ? probB : probA}%</span>` : '';

      // Gather 48 teams
      const allTeams = [];
      const groups = (state.tournament && state.tournament.groups) ? state.tournament.groups : {};
      for (const key in groups) {
        if (Array.isArray(groups[key])) {
          groups[key].forEach(t => {
            if (t && !allTeams.includes(t)) {
              allTeams.push(t);
            }
          });
        }
      }
      allTeams.sort((a, b) => a.localeCompare(b));

      const optionsHtml = ['In attesa...', ...allTeams].map(t => {
        const selected = t === teamName ? 'selected' : '';
        return `<option value="${t}" ${selected}>${t}</option>`;
      }).join('');

      const selectHtml = `
        <select class="r32-team-select" 
                style="background: transparent; color: #fff; border: none; font-size: 0.72rem; font-weight: 500; outline: none; width: 100%; cursor: pointer; padding: 0; min-width: 0; text-overflow: ellipsis;"
                onchange="changeR32Team(${matchIndex}, ${slotIdx}, this.value)"
                onclick="event.stopPropagation()">
          ${optionsHtml}
        </select>
      `;

      const winnerIndicator = `
        <div class="r32-winner-indicator" 
             style="width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid ${isWinner ? 'var(--color-success, #10b981)' : 'var(--border-light, rgba(255,255,255,0.15))'}; background: ${isWinner ? 'var(--color-success, #10b981)' : 'transparent'}; display: flex; align-items: center; justify-content: center; font-size: 0.5rem; cursor: pointer; flex-shrink: 0; color: #fff; line-height: 1;"
             onclick="selectKnockoutWinner('r32', ${matchIndex}, '${teamName}')">
          ${isWinner ? '✓' : ''}
        </div>
      `;

      return `
        <div class="${classes}" style="display: flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.5rem; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.25rem; flex: 1; min-width: 0;">
            ${winnerIndicator}
            ${badgeHtml}
            ${selectHtml}
          </div>
          ${probText}
        </div>
      `;
    }

    // Standard non-R32 slots
    if (!teamName) {
      return `<div class="bracket-team-slot empty-team">In attesa...</div>`;
    }

    const isWinner = winner === teamName;
    const isEliminated = winner && winner !== teamName;
    const pCount = userTeam ? (state.players || []).filter(p => p.ownerId === userTeam.id && p.country === teamName).length : 0;
    const userPlayers = userTeam ? (state.players || []).filter(p => p.ownerId === userTeam.id && p.country === teamName) : [];

    let badgeHtml = '';
    if (pCount > 0) {
      const tooltipText = `Calciatori in rosa: ${userPlayers.map(p => `${p.name} (${p.role})`).join(', ')}`;
      badgeHtml = `
        <span class="team-user-badge" data-tooltip="${tooltipText}" title="${tooltipText}" style="margin-left: 0.35rem; padding: 0.05rem 0.25rem; font-size: 0.6rem;">
          ${pCount}
        </span>
      `;
    }

    let classes = 'bracket-team-slot';
    if (isWinner) classes += ' selected-winner';
    if (isEliminated) classes += ' eliminated-team';

    const probText = showProb ? `<span class="slot-prob-text">${isTeamB ? probB : probA}%</span>` : '';
    const trophyIcon = isWinner ? '<span class="slot-winner-icon">🏆</span>' : '';

    return `
      <div class="${classes}" onclick="selectKnockoutWinner('${roundKey}', ${matchIndex}, '${teamName}')">
        <div class="slot-team-name-area">
          <span class="team-name" style="font-size: 0.72rem;">${teamName}</span>
          ${badgeHtml}
        </div>
        <div style="display: flex; align-items: center; gap: 0.35rem;">
          ${probText}
          ${trophyIcon}
        </div>
      </div>
    `;
  };

  let probBarHtml = '';
  if (showProb) {
    probBarHtml = `
      <div class="match-prob-bar-wrapper">
        <div class="match-prob-fill teamA" style="width: ${probA}%"></div>
        <div class="match-prob-fill teamB" style="width: ${probB}%"></div>
      </div>
    `;
  }

  return `
    <div class="bracket-match-card">
      <div class="bracket-match-title">${title}</div>
      ${renderSlot(teamA, false, 0)}
      ${renderSlot(teamB, true, 1)}
      ${probBarHtml}
    </div>
  `;
}

function changeR32Team(matchIndex, slotIndex, teamName) {
  if (!state.tournament) {
    initializeTournament();
  }

  // Initialize customR32 if it doesn't exist
  if (!state.tournament.customR32 || state.tournament.customR32.length !== 16) {
    const tree = getTournamentTree();
    state.tournament.customR32 = [];
    for (let i = 0; i < 16; i++) {
      const tA = tree.r32[i][0] || 'In attesa...';
      const tB = tree.r32[i][1] || 'In attesa...';
      state.tournament.customR32.push([tA, tB]);
    }
  }

  // Update specific team
  state.tournament.customR32[matchIndex][slotIndex] = teamName;

  // Validate knockout winners since a matchup team changed
  validateKnockoutWinners();
  autoSave();
  renderAll();
}

// R32 Pairing Customizer functions
function openR32Editor() {
  const dialog = document.getElementById('r32-editor-dialog');
  const grid = document.getElementById('r32-editor-grid');
  if (!dialog || !grid) return;

  // Gather all 48 teams
  const allTeams = [];
  const groups = (state.tournament && state.tournament.groups) ? state.tournament.groups : {};
  for (const key in groups) {
    if (Array.isArray(groups[key])) {
      groups[key].forEach(team => {
        if (team && !allTeams.includes(team)) {
          allTeams.push(team);
        }
      });
    }
  }
  allTeams.sort((a, b) => a.localeCompare(b));

  // Clear grid
  grid.innerHTML = '';

  const tree = getTournamentTree();
  const currentR32 = tree.r32 || [];

  for (let i = 0; i < 16; i++) {
    const pair = currentR32[i] || ['In attesa...', 'In attesa...'];
    const teamA = pair[0] || 'In attesa...';
    const teamB = pair[1] || 'In attesa...';

    const matchCard = document.createElement('div');
    matchCard.className = 'r32-match-card';
    matchCard.style.cssText = 'background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-light); border-radius: 8px; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;';

    const title = document.createElement('div');
    title.style.cssText = 'font-size: 0.75rem; font-weight: 700; color: var(--color-accent, #c084fc);';
    title.textContent = `Incontro ${i + 1}`;

    const selectsDiv = document.createElement('div');
    selectsDiv.style.cssText = 'display: flex; gap: 0.5rem; align-items: center;';

    // Dropdown 1
    const selectA = document.createElement('select');
    selectA.style.cssText = 'flex: 1; min-width: 0; background: var(--bg-main); color: #fff; border: 1px solid var(--border-light); border-radius: 6px; padding: 0.35rem; font-size: 0.75rem;';
    
    // Dropdown 2
    const selectB = document.createElement('select');
    selectB.style.cssText = 'flex: 1; min-width: 0; background: var(--bg-main); color: #fff; border: 1px solid var(--border-light); border-radius: 6px; padding: 0.35rem; font-size: 0.75rem;';

    // Populate options
    const optionsHtml = ['In attesa...', ...allTeams].map(t => `<option value="${t}">${t}</option>`).join('');
    selectA.innerHTML = optionsHtml;
    selectB.innerHTML = optionsHtml;

    selectA.value = allTeams.includes(teamA) ? teamA : 'In attesa...';
    selectB.value = allTeams.includes(teamB) ? teamB : 'In attesa...';

    selectsDiv.appendChild(selectA);
    
    const vsSpan = document.createElement('span');
    vsSpan.style.cssText = 'font-size: 0.7rem; color: var(--color-text-muted); font-weight: bold;';
    vsSpan.textContent = 'VS';
    selectsDiv.appendChild(vsSpan);

    selectsDiv.appendChild(selectB);

    matchCard.appendChild(title);
    matchCard.appendChild(selectsDiv);

    grid.appendChild(matchCard);
  }

  // Open modal
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.setAttribute('open', 'true');
  }
}

function saveR32CustomPairings() {
  const grid = document.getElementById('r32-editor-grid');
  if (!grid) return;

  const matchCards = grid.querySelectorAll('.r32-match-card');
  const customR32 = [];

  matchCards.forEach(card => {
    const selects = card.querySelectorAll('select');
    if (selects.length === 2) {
      const valA = selects[0].value;
      const valB = selects[1].value;
      customR32.push([valA, valB]);
    }
  });

  if (customR32.length === 16) {
    if (!state.tournament) {
      initializeTournament();
    }
    state.tournament.customR32 = customR32;
    validateKnockoutWinners();
    autoSave();
    
    const dialog = document.getElementById('r32-editor-dialog');
    if (dialog) dialog.close();
    
    renderAll();
    showToast('Accoppiamenti Sedicesimi personalizzati salvati! 💾', 'success');
  }
}

function resetR32CustomPairings() {
  if (state.tournament) {
    delete state.tournament.customR32;
    validateKnockoutWinners();
    autoSave();
  }
  
  const dialog = document.getElementById('r32-editor-dialog');
  if (dialog) dialog.close();

  renderAll();
  showToast('Accoppiamenti resettati al calcolo automatico 🔄', 'info');
}

// Window globals to make functions accessible inline
window.swapGroupTeams = swapGroupTeams;
window.selectKnockoutWinner = selectKnockoutWinner;
window.simulateGroups = simulateGroups;
window.simulateEntireTournament = simulateEntireTournament;
window.simulateAiPrediction = simulateAiPrediction;
window.resetTournament = resetTournament;
window.renderTournament = renderTournament;
window.openR32Editor = openR32Editor;
window.saveR32CustomPairings = saveR32CustomPairings;
window.resetR32CustomPairings = resetR32CustomPairings;
window.changeR32Team = changeR32Team;

// ==========================================================================
// SETUP WIZARD, GUIDED TUTORIAL & AI CHATBOT LOGIC
// ==========================================================================

let wizardStep = 1;
let wizardMode = 'local';
let wizardUploadedPlayers = null;

let tutorialSlide = 1;

let chatbotHistory = [];

function openSetupWizard(mode = 'local') {
  wizardStep = 1;
  wizardMode = mode;
  wizardUploadedPlayers = null;

  const dlg = document.getElementById('setup-wizard-dialog');
  if (!dlg) return;

  // Initialize input values from current state
  const budgetInput = document.getElementById('wizard-budget');
  if (budgetInput) budgetInput.value = state.settings.budget || 300;

  const teamNamesTextarea = document.getElementById('wizard-team-names');
  if (teamNamesTextarea) {
    teamNamesTextarea.value = state.teams.map(t => t.name).join('\n');
  }

  // Reset CSV dropzone status
  const statusText = document.getElementById('wizard-csv-status');
  if (statusText) statusText.innerText = "Trascina qui il file CSV o clicca sotto";

  showWizardStep(1);
  dlg.showModal();
}

function showWizardStep(step) {
  wizardStep = step;
  
  // Hide all step panes
  document.querySelectorAll('.wizard-pane').forEach((p, idx) => {
    p.classList.toggle('active', idx === (step - 1));
  });

  // Update step indicators
  document.querySelectorAll('.wizard-step-indicator').forEach((ind, idx) => {
    ind.classList.toggle('active', idx === (step - 1));
    ind.classList.toggle('completed', idx < (step - 1));
  });

  // Update step title label
  const stepLabel = document.getElementById('setup-wizard-step-label');
  if (stepLabel) stepLabel.innerText = `Passo ${step} di 3`;

  // Update buttons
  const prevBtn = document.getElementById('btn-wizard-prev');
  if (prevBtn) {
    prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
  }

  const nextBtn = document.getElementById('btn-wizard-next');
  if (nextBtn) {
    nextBtn.innerText = step === 3 ? 'Fine 🏁' : 'Avanti ➡️';
  }
}

function handleWizardNext() {
  if (wizardStep < 3) {
    showWizardStep(wizardStep + 1);
  } else {
    // Save configuration
    const budgetInput = document.getElementById('wizard-budget');
    const newBudget = parseInt(budgetInput?.value) || 300;

    // Apply budget settings
    state.settings.budget = newBudget;

    // Parse team names
    const teamNamesTextarea = document.getElementById('wizard-team-names');
    const lines = teamNamesTextarea?.value?.split(/\r?\n/).map(line => line.trim()).filter(Boolean) || [];
    
    if (lines.length > 0) {
      state.teams = lines.map((name, idx) => {
        return {
          id: `t-${idx + 1}`,
          name: name,
          budget: newBudget,
          players: [],
          module: '4-3-3',
          isUserTeam: idx === 0
        };
      });
      state.activeTeamId = state.teams[0].id;
    } else {
      // Default fallback
      state.teams = [
        { id: 't-1', name: 'Dream Team', budget: newBudget, players: [], module: '4-3-3', isUserTeam: true },
        { id: 't-2', name: 'F.C. Fantasmi', budget: newBudget, players: [], module: '4-3-3', isUserTeam: false },
        { id: 't-3', name: 'Galacticos', budget: newBudget, players: [], module: '4-3-3', isUserTeam: false },
        { id: 't-4', name: 'Real Madrink', budget: newBudget, players: [], module: '4-3-3', isUserTeam: false }
      ];
      state.activeTeamId = 't-1';
    }

    // Apply uploaded players if any, otherwise keep default seed players
    if (wizardUploadedPlayers && wizardUploadedPlayers.length > 0) {
      state.players = wizardUploadedPlayers;
    } else {
      state.players = JSON.parse(JSON.stringify(SEED_PLAYERS));
    }

    // Completely clear all player assignments and budget spendings
    state.players.forEach(p => {
      p.ownerId = null;
      p.purchaseCost = null;
    });

    state.teamIdealLineups = {};
    
    // Synchronize DOM inputs in settings tab
    if (dom.configBudget) dom.configBudget.value = newBudget;
    if (dom.teamListInput) dom.teamListInput.value = state.teams.map(t => t.name).join('\n');

    // Re-initialize tournament standings/pairing states
    initializeTournament(true);

    autoSave();
    renderAll();

    // Close wizard dialog
    const dlg = document.getElementById('setup-wizard-dialog');
    if (dlg) dlg.close();

    showToast('Configurazione iniziale applicata con successo! 🎉', 'success');

    // Launch guided tutorial tour!
    setTimeout(() => {
      openTutorial();
    }, 600);

    // If wizard was launched from cloud mode, prompt to save cloud immediately after the tutorial
    if (wizardMode === 'cloud') {
      state.wizardPendingCloudPrompt = true;
    }
  }
}

function handleWizardPrev() {
  if (wizardStep > 1) {
    showWizardStep(wizardStep - 1);
  }
}

function initWizardEvents() {
  const fileInput = document.getElementById('wizard-import-players');
  const dropzone = document.getElementById('wizard-csv-dropzone');
  const statusText = document.getElementById('wizard-csv-status');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleWizardCSVFile(file);
    });
  }

  if (dropzone) {
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--color-primary)';
      dropzone.style.background = 'rgba(168, 85, 247, 0.05)';
    });

    dropzone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      dropzone.style.background = 'rgba(0,0,0,0.25)';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'rgba(255, 255, 255, 0.15)';
      dropzone.style.background = 'rgba(0,0,0,0.25)';
      
      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith('.csv')) {
        handleWizardCSVFile(file);
      } else {
        showToast('Formato non supportato. Carica solo file CSV!', 'danger');
      }
    });
  }

  // Wizard Navigation
  const prevBtn = document.getElementById('btn-wizard-prev');
  if (prevBtn) prevBtn.addEventListener('click', handleWizardPrev);

  const nextBtn = document.getElementById('btn-wizard-next');
  if (nextBtn) nextBtn.addEventListener('click', handleWizardNext);

  // Tutorial Navigation
  const tutPrevBtn = document.getElementById('btn-tut-prev');
  if (tutPrevBtn) tutPrevBtn.addEventListener('click', handleTutorialPrev);

  const tutNextBtn = document.getElementById('btn-tut-next');
  if (tutNextBtn) tutNextBtn.addEventListener('click', handleTutorialNext);

  const recallTutorialBtn = document.getElementById('btn-start-tutorial');
  if (recallTutorialBtn) {
    recallTutorialBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Close dropdown menu
      const wrapper = document.getElementById('actions-dropdown-wrapper');
      if (wrapper) wrapper.classList.remove('open');
      
      // Yield to the browser render queue before opening dialog to resolve Vercel INP latency
      setTimeout(() => {
        openTutorial();
      }, 0);
    });
  }

  // Chatbot Events
  const chatbotTrigger = document.getElementById('fanta-chatbot-trigger');
  const chatbotClose = document.getElementById('fanta-chatbot-close');
  const chatbotSend = document.getElementById('fanta-chatbot-send');
  const chatbotInput = document.getElementById('fanta-chatbot-input');

  if (chatbotTrigger) {
    chatbotTrigger.addEventListener('click', toggleChatbotWindow);
  }

  if (chatbotClose) {
    chatbotClose.addEventListener('click', closeChatbotWindow);
  }

  if (chatbotSend) {
    chatbotSend.addEventListener('click', sendChatbotMessage);
  }

  if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendChatbotMessage();
    });
  }
}

function handleWizardCSVFile(file) {
  const statusText = document.getElementById('wizard-csv-status');
  const reader = new FileReader();
  
  reader.onload = function(evt) {
    const content = evt.target.result;
    try {
      const parsedPlayers = parseCSV(content);
      if (parsedPlayers.length === 0) {
        showToast('Nessun giocatore valido trovato nel file CSV.', 'danger');
        return;
      }
      wizardUploadedPlayers = parsedPlayers;
      if (statusText) {
        statusText.innerHTML = `✅ Caricato con successo: <strong>${file.name}</strong> (${parsedPlayers.length} calciatori)`;
      }
      showToast(`File CSV elaborato con successo! ${parsedPlayers.length} calciatori registrati.`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Errore durante la decodifica del CSV.', 'danger');
    }
  };
  reader.readAsText(file);
}

function openTutorial() {
  tutorialSlide = 1;
  const dlg = document.getElementById('app-tutorial-dialog');
  if (!dlg) return;

  showTutorialSlide(1);
  dlg.showModal();
}

function showTutorialSlide(slide) {
  tutorialSlide = slide;

  // Toggle active slides
  document.querySelectorAll('.tutorial-slide').forEach((s, idx) => {
    s.classList.toggle('active', idx === (slide - 1));
  });

  // Update slide count label
  const stepLabel = document.getElementById('tutorial-step-label');
  if (stepLabel) stepLabel.innerText = `Slide ${slide} di 5`;

  // Update navigation buttons
  const prevBtn = document.getElementById('btn-tut-prev');
  if (prevBtn) {
    prevBtn.style.visibility = slide === 1 ? 'hidden' : 'visible';
  }

  const nextBtn = document.getElementById('btn-tut-next');
  if (nextBtn) {
    nextBtn.innerText = slide === 5 ? 'Chiudi 🏁' : 'Avanti ➡️';
  }
}

function handleTutorialNext() {
  if (tutorialSlide < 5) {
    showTutorialSlide(tutorialSlide + 1);
  } else {
    // Close tutorial
    const dlg = document.getElementById('app-tutorial-dialog');
    if (dlg) dlg.close();

    showToast('Guida completata! Se hai bisogno di aiuto, puoi riavviare la guida dal menu Azioni Asta 📚', 'success');

    // If there was a pending cloud save prompt from the wizard, trigger it now!
    if (state.wizardPendingCloudPrompt) {
      state.wizardPendingCloudPrompt = false;
      setTimeout(() => {
        openCloudSaveModal();
      }, 500);
    }
  }
}

// Global scope access helpers
window.openSetupWizard = openSetupWizard;
window.openTutorial = openTutorial;

function handleTutorialPrev() {
  if (tutorialSlide > 1) {
    showTutorialSlide(tutorialSlide - 1);
  }
}

function toggleChatbotWindow() {
  const win = document.getElementById('fanta-chatbot-window');
  if (win) {
    win.classList.toggle('open');
    if (win.classList.contains('open')) {
      const input = document.getElementById('fanta-chatbot-input');
      if (input) input.focus();
    }
  }
}

function closeChatbotWindow() {
  const win = document.getElementById('fanta-chatbot-window');
  if (win) win.classList.remove('open');
}

async function sendChatbotMessage() {
  const input = document.getElementById('fanta-chatbot-input');
  const messageText = input?.value?.trim();
  if (!messageText) return;

  if (input) input.value = '';

  // Append user message
  appendChatMsg(messageText, 'user');
  chatbotHistory.push({ role: 'user', content: messageText });

  // Add typing indicator
  const messagesContainer = document.getElementById('fanta-chatbot-messages');
  const typingBubble = document.createElement('div');
  typingBubble.className = 'chat-msg assistant';
  typingBubble.innerText = 'L\'assistente sta rispondendo... ⏳';
  if (messagesContainer) {
    messagesContainer.appendChild(typingBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: chatbotHistory.slice(-10),
        provider: state.settings.aiProvider || 'google',
        openRouterModel: state.settings.openRouterModel || '',
        geminiModel: state.settings.geminiModel || ''
      })
    });

    const result = await response.json();
    
    // Remove typing indicator
    typingBubble.remove();

    if (!response.ok || result.error) {
      appendChatMsg(`❌ Errore AI: ${result.error || 'Impossibile connettersi al modello.'}`, 'assistant');
      return;
    }

    appendChatMsg(result.content, 'assistant');
    chatbotHistory.push({ role: 'assistant', content: result.content });
  } catch (err) {
    console.error(err);
    typingBubble.remove();
    appendChatMsg(`❌ Errore di rete: ${err.message || err}`, 'assistant');
  }
}

function sendChatbotPredefined(text) {
  const input = document.getElementById('fanta-chatbot-input');
  if (input) {
    input.value = text;
    sendChatbotMessage();
  }
}

function appendChatMsg(text, sender) {
  const messagesContainer = document.getElementById('fanta-chatbot-messages');
  if (!messagesContainer) return;

  const msgEl = document.createElement('div');
  msgEl.className = `chat-msg ${sender}`;
  
  if (sender === 'assistant') {
    let formattedText = text
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    msgEl.innerHTML = formattedText;
  } else {
    msgEl.innerText = text;
  }

  messagesContainer.appendChild(msgEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

window.sendChatbotPredefined = sendChatbotPredefined;

