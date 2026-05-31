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
    },
    aiProvider: 'openrouter',
    openRouterModel: 'openai/gpt-oss-120b:free'
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
  eliminatedCountries: ['Italia', 'Egitto', 'Nigeria']
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
  toast: null
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

  renderAll();

  // Open the startup onboarding cloud dialog modal
  openStartupDialog();
});

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

  dom.fileDatabaseInput = document.getElementById('file-import-players');
  dom.fileSessionInput = document.getElementById('file-import-session');
  dom.btnExportSession = document.getElementById('btn-export-session');
  dom.btnResetAll = document.getElementById('btn-reset-all');
  dom.btnAdminLoginToggle = document.getElementById('btn-admin-login-toggle');

  dom.btnCloudSave = document.getElementById('btn-cloud-save');
  dom.btnCloudLoad = document.getElementById('btn-cloud-load');
  dom.btnCloudLogout = document.getElementById('btn-cloud-logout');

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

  // Fill config elements from state
  dom.configBudget.value = state.settings.budget;
  dom.configSlotPOR.value = state.settings.slots.POR;
  dom.configSlotDIF.value = state.settings.slots.DIF;
  dom.configSlotCEN.value = state.settings.slots.CEN;
  dom.configSlotATT.value = state.settings.slots.ATT;
  dom.teamListInput.value = state.teams.map(t => t.name).join('\n');

  // Fill AI settings from state
  if (dom.configAIProvider) dom.configAIProvider.value = state.settings.aiProvider || 'openrouter';
  if (dom.configOpenRouterModel) dom.configOpenRouterModel.value = state.settings.openRouterModel || 'openai/gpt-oss-120b:free';
  
  // Apply dynamic show/hide style
  const isOR = (state.settings.aiProvider || 'openrouter') === 'openrouter';
  const divORModel = document.getElementById('div-openrouter-model');
  if (divORModel) divORModel.style.display = isOR ? 'block' : 'none';
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

  // File Imports / Exports
  dom.fileDatabaseInput.addEventListener('change', handlePlayerDatabaseImport);
  dom.fileSessionInput.addEventListener('change', handleSessionImport);
  
  dom.btnExportSession.addEventListener('click', (e) => {
    e.preventDefault();
    exportSession();
  });
  
  dom.btnResetAll.addEventListener('click', (e) => {
    e.preventDefault();
    resetSession();
  });

  if (dom.btnAdminLoginToggle) {
    dom.btnAdminLoginToggle.addEventListener('click', (e) => {
      e.preventDefault();
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
    openCloudSaveModal();
  });

  if (dom.btnCloudLogout) dom.btnCloudLogout.addEventListener('click', (e) => {
    e.preventDefault();
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
  const newAIProvider = dom.configAIProvider ? dom.configAIProvider.value : 'openrouter';
  const newOpenRouterModel = dom.configOpenRouterModel ? dom.configOpenRouterModel.value.trim() : 'openai/gpt-oss-120b:free';

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

      // Restore AI settings
      if (dom.configAIProvider) dom.configAIProvider.value = state.settings.aiProvider || 'openrouter';
      if (dom.configOpenRouterModel) dom.configOpenRouterModel.value = state.settings.openRouterModel || 'openai/gpt-oss-120b:free';
      const isOR = (state.settings.aiProvider || 'openrouter') === 'openrouter';
      const divORModel = document.getElementById('div-openrouter-model');
      if (divORModel) divORModel.style.display = isOR ? 'block' : 'none';

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
    t.budget = state.settings.budget || 500;
    t.players = [];
    t.module = '4-3-3';
  });

  state.teamIdealLineups = {};

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
              teamIdealLineups: state.teamIdealLineups || {}
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
    dom.configSlotPOR.value = state.settings.slots.POR;
    dom.configSlotDIF.value = state.settings.slots.DIF;
    dom.configSlotCEN.value = state.settings.slots.CEN;
    dom.configSlotATT.value = state.settings.slots.ATT;
    dom.teamListInput.value = state.teams.map(t => t.name).join('\n');

    // Restore AI settings
    if (dom.configAIProvider) dom.configAIProvider.value = state.settings.aiProvider || 'openrouter';
    if (dom.configOpenRouterModel) dom.configOpenRouterModel.value = state.settings.openRouterModel || 'openai/gpt-oss-120b:free';
    const isOR = (state.settings.aiProvider || 'openrouter') === 'openrouter';
    const divORModel = document.getElementById('div-openrouter-model');
    if (divORModel) divORModel.style.display = isOR ? 'block' : 'none';

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
    budget: 500,
    slots: {
      POR: 3,
      DIF: 8,
      CEN: 8,
      ATT: 6
    },
    aiProvider: 'openrouter',
    openRouterModel: 'openai/gpt-oss-120b:free'
  };

  // Reset teams to default
  state.teams = [
    { id: 't-1', name: 'Dream Team', budget: 500, players: [], module: '4-3-3' },
    { id: 't-2', name: 'F.C. Fantasmi', budget: 500, players: [], module: '4-3-3' },
    { id: 't-3', name: 'Galacticos', budget: 500, players: [], module: '4-3-3' },
    { id: 't-4', name: 'Real Madrink', budget: 500, players: [], module: '4-3-3' }
  ];

  // Restore players to default cloned from SEED_PLAYERS
  state.players = JSON.parse(JSON.stringify(SEED_PLAYERS));

  // Reset active state variables
  state.activeTab = 'giocatori';
  state.activeTeamId = 't-1';
  state.activeCloudSessionId = null;
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

  // Clear last used session from localStorage and sessionStorage
  localStorage.removeItem('fantamondiale_last_cloud_session_id');
  sessionStorage.clear();

  // Trigger autosave to sync this clean state to the cloud if active
  autoSave();
}

function openNewSessionFromStartup() {
  const startupDlg = document.getElementById('startup-cloud-dialog');
  if (startupDlg) startupDlg.close();

  // Reset to a completely fresh auction session state
  resetSessionClean();
  renderAll();

  openCloudSaveModal();
}

function loadStartupCloudSession(id) {
  const startupDlg = document.getElementById('startup-cloud-dialog');
  if (startupDlg) startupDlg.close();
  loadSpecificCloudSession(id, true);
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
  updateAISettingsEditability();
}

function updateAISettingsEditability() {
  if (dom.configAIProvider) {
    dom.configAIProvider.disabled = !state.isAdmin;
  }
  if (dom.configOpenRouterModel) {
    dom.configOpenRouterModel.disabled = !state.isAdmin;
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

        const escapedName = p.name.replace(/'/g, "\\'");
        const escapedCountry = p.country.replace(/'/g, "\\'");

        item.innerHTML = `
          <div class="mini-player-name" style="font-size: 0.75rem; display: flex; align-items: center; gap: 0.35rem;">
            <span style="display:inline-block; width: 6px; height: 6px; border-radius:50%; background: var(--color-${p.role.toLowerCase()})"></span>
            <span style="color: #fff; font-weight: 500;">
              ${p.name} <span style="color: var(--color-text-muted); font-size: 0.65rem;">(${p.country})</span>
              ${state.eliminatedCountries.includes(p.country) ? ' <span style="font-size: 0.6rem; color: var(--color-danger); font-weight: 700;">[ELIMINATO]</span>' : ''}
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

    const escapedName = p.name.replace(/'/g, "\\'");
    const escapedCountry = p.country.replace(/'/g, "\\'");
    tr.innerHTML = `
      <td style="font-weight: 700; white-space: nowrap;">
        ${p.name}
        ${state.eliminatedCountries.includes(p.country) ? ' <span class="badge badge-danger" style="font-size: 0.6rem; padding: 0.15rem 0.35rem; background: var(--color-danger); color: #fff;">❌ ELIMINATO</span>' : ''}
        <button class="btn-ai-sparkle" onclick="showPlayerAIAnalysis('${p.id}', '${escapedName}', '${escapedCountry}', '${p.role}', this); event.stopPropagation();" title="Analisi IA ✨">✨</button>
      </td>
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
              ${p.name} <span style="color: var(--color-text-muted); font-size: 0.7rem;">(${p.country})</span>
              ${state.eliminatedCountries.includes(p.country) ? ' <span style="font-size: 0.6rem; color: var(--color-danger); font-weight: 700;">[ELIMINATO]</span>' : ''}
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
        const cached = state.aiCache[player.id] || JSON.parse(sessionStorage.getItem(`fantamondiale_ai_${player.id}`) || '{}');
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
          <div class="pitch-player-shirt" style="background: var(--color-${player.role.toLowerCase()}); ${state.eliminatedCountries.includes(player.country) ? 'opacity: 0.55; border: 2px dashed var(--color-danger);' : ''}">
            ${player.purchaseCost}
          </div>
          <div class="pitch-player-name" style="${state.eliminatedCountries.includes(player.country) ? 'color: var(--color-danger); text-decoration: line-through;' : ''}">${player.name.split(' ').pop()}</div>
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
        <span style="${state.eliminatedCountries.includes(p.country) ? 'text-decoration: line-through; color: var(--color-text-muted);' : ''}">${p.name} (${p.role}) - <strong>${p.purchaseCost} cr</strong></span>
        ${state.eliminatedCountries.includes(p.country) ? ' <span style="font-size: 0.55rem; color: var(--color-danger); font-weight: 700; border: 1px solid var(--color-danger); padding: 0.05rem 0.2rem; border-radius: 4px; line-height: 1;">ELIMINATO</span>' : ''}
      `;

      el.addEventListener('dragstart', handleDragStart);
      el.addEventListener('dragend', handleDragEnd);
      el.addEventListener('dragover', handleDragOver);
      el.addEventListener('dragleave', handleDragLeave);
      el.addEventListener('drop', handleDrop);

      benchContainer.appendChild(el);
    });
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
    buttonsWrapper.appendChild(copyBtn);

    // If showing Ideal, add AI Update button
    if (showIdeal) {
      const refreshAIBtn = document.createElement('button');
      refreshAIBtn.className = 'btn btn-team-ai-sparkle';
      refreshAIBtn.style.padding = '0.4rem 0.8rem';
      refreshAIBtn.style.fontSize = '0.75rem';
      refreshAIBtn.style.display = 'flex';
      refreshAIBtn.style.alignItems = 'center';
      refreshAIBtn.style.gap = '0.35rem';
      refreshAIBtn.style.background = 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)';
      refreshAIBtn.style.borderColor = 'rgba(168, 85, 247, 0.4)';
      refreshAIBtn.innerHTML = '🔄 Ricalcola Formazione IA';
      refreshAIBtn.onclick = () => recalculateIdealLineup(team);
      buttonsWrapper.appendChild(refreshAIBtn);
    }
  }

  renderPitch();
  document.getElementById('pitch-dialog').showModal();

  // If showing Ideal for the first time and we have players, automatically trigger recalculate
  if (showIdeal && (!state.teamIdealLineups || !state.teamIdealLineups[team.id]) && team.players.length > 0) {
    recalculateIdealLineup(team);
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

  dom.toast.innerHTML = `
    ${iconHtml}
    <span>${message}</span>
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
          teamIdealLineups: state.teamIdealLineups || {}
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

  // Enforce 4 attempt limit
  const attempts = cloudPasswordFailedAttempts[id] || 0;
  if (attempts >= 4) {
    showToast('Hai superato il limite di 4 tentativi per questa sessione. Accesso bloccato! 🔒', 'danger');
    if (!state.activeCloudSessionId) {
      openStartupDialog();
    }
    return;
  }

  const password = await promptCloudPassword(id, true);
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
    dom.configSlotPOR.value = state.settings.slots.POR;
    dom.configSlotDIF.value = state.settings.slots.DIF;
    dom.configSlotCEN.value = state.settings.slots.CEN;
    dom.configSlotATT.value = state.settings.slots.ATT;
    dom.teamListInput.value = state.teams.map(t => t.name).join('\n');

    // Restore AI settings
    if (dom.configAIProvider) dom.configAIProvider.value = state.settings.aiProvider || 'openrouter';
    if (dom.configOpenRouterModel) dom.configOpenRouterModel.value = state.settings.openRouterModel || 'openai/gpt-oss-120b:free';
    const isOR = (state.settings.aiProvider || 'openrouter') === 'openrouter';
    const divORModel = document.getElementById('div-openrouter-model');
    if (divORModel) divORModel.style.display = isOR ? 'block' : 'none';

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

  // Enforce attempts check for deletion as well
  const attempts = cloudPasswordFailedAttempts[id] || 0;
  if (attempts >= 4) {
    showToast('Hai superato il limite di 4 tentativi per questa sessione. Operazione bloccata! 🔒', 'danger');
    return;
  }

  const password = await promptCloudPassword(id, true);
  if (password === null) {
    return;
  }

  try {
    const response = await fetch(`/api/delete?id=${id}&password=${encodeURIComponent(password)}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    if (!response.ok) {
      cloudPasswordFailedAttempts[id] = (cloudPasswordFailedAttempts[id] || 0) + 1;
      const remaining = 4 - cloudPasswordFailedAttempts[id];
      if (cloudPasswordFailedAttempts[id] >= 4) {
        showToast('Troppi tentativi falliti. Operazione bloccata! 🔒', 'danger');
        return;
      }
      throw new Error(`${result.error || 'Impossibile eliminare la sessione.'} Rimangono ${remaining} tentativi.`);
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

// --- DYNAMIC AI SPEECH BUBBLE OVERLAY LOGIC ---
let activeAIPopover = null;

async function showPlayerAIAnalysis(playerId, name, country, role, buttonEl, forceRefresh = false) {
  // 1. If popover already open for this player, close it and return
  if (activeAIPopover && activeAIPopover.dataset.playerId === playerId && !forceRefresh) {
    closeAIPopover();
    return;
  }

  // 2. Close any other open popovers first
  closeAIPopover();

  // 3. Create Popover Div
  const popover = document.createElement('div');
  popover.className = 'ai-bubble-popover';
  popover.dataset.playerId = playerId;
  activeAIPopover = popover;

  // Append to body immediately to calculate dimensions, but keep invisible or positioned offscreen
  document.body.appendChild(popover);

  // Add modal-open class to lock background scrolling
  document.body.classList.add('ai-modal-open');

  // 5. Render Loading State (Skeleton Loader)
  renderPopoverLoading(popover, name);

  // 6. Check Cache (sessionStorage & in-memory)
  let cachedData = state.aiCache[playerId];
  if (!cachedData) {
    const sessionCached = sessionStorage.getItem(`fantamondiale_ai_${playerId}`);
    if (sessionCached) {
      try {
        cachedData = JSON.parse(sessionCached);
        state.aiCache[playerId] = cachedData;
      } catch (e) {
        cachedData = null;
      }
    }
  }

  // If in cache and not force refreshing, render data immediately
  if (cachedData && !forceRefresh) {
    renderPopoverData(popover, name, country, role, cachedData, buttonEl);
    return;
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
        provider: state.settings.aiProvider || 'openrouter',
        openRouterModel: state.settings.openRouterModel || 'openai/gpt-oss-120b:free'
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

    // Save to Cache
    state.aiCache[playerId] = result;
    sessionStorage.setItem(`fantamondiale_ai_${playerId}`, JSON.stringify(result));

    // Render Data
    renderPopoverData(popover, name, country, role, result, buttonEl);
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

function renderPopoverData(popover, name, country, role, data, buttonEl) {
  const qpClass = data.valueForMoney ? data.valueForMoney.toLowerCase().replace(/[^a-z]/g, '') : 'buono';

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
        <span class="ai-stat-label">Presenze</span>
        <span class="ai-stat-value" title="${data.appearances || 'N/D'}">${data.appearances || 'N/D'}</span>
      </div>
    </div>

    <div class="ai-stat-row">
      <div class="ai-stat-card">
        <span class="ai-stat-label">Titolare 🏆</span>
        <span class="ai-stat-value" title="${data.starterProbability || 'N/D'}">${data.starterProbability || 'N/D'}</span>
      </div>
      <div class="ai-stat-card">
        <span class="ai-stat-label">Rapporto Q/P</span>
        <span class="ai-stat-value badge-qp-${qpClass}">${data.valueForMoney || 'N/D'}</span>
      </div>
    </div>

    <div class="ai-category-section">
      <span class="ai-stat-label" style="display:block; margin-bottom:0.25rem">Categoria Giocatore</span>
      <div class="ai-category-badge badge-cat-${categoryClass}">
        <span class="ai-category-emoji">${categoryEmoji}</span>
        <span class="ai-category-text">${categoryText}</span>
      </div>
    </div>

    <div class="ai-form-section" style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 8px; padding: 0.5rem 0.6rem; margin-bottom: 0.6rem;">
      <span class="ai-stat-label" style="display:block; margin-bottom:0.25rem; font-size: 0.6rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.04em;">Stato di Forma (Settimana Corrente) 📈</span>
      <p class="ai-form-text" style="margin: 0; font-size: 0.72rem; line-height: 1.4; color: #fff; font-weight: 500;">
        ${data.formState || 'Nessun aggiornamento recente su questa settimana.'}
      </p>
    </div>

    <div class="ai-profile-section">
      <span class="ai-stat-label" style="display:block; margin-bottom:0.25rem">Profilo Calciatore</span>
      <p class="ai-profile-text">${data.description || 'Nessuna descrizione disponibile.'}</p>
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

  // 6. Roster Hash & Cache Key
  const rosterHash = team.players.map(p => p.id).sort().join(',');
  const cacheKey = `fantamondiale_team_ai_${team.id}_${rosterHash}`;

  // Check Cache (only if not force refreshing)
  if (!forceRefresh) {
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        renderTeamAnalysisPopoverData(popover, team, parsed.analysis, buttonEl);
        return;
      } catch (e) {
        sessionStorage.removeItem(cacheKey);
      }
    }
  }

  // 7. Group roster by role with minimal details
  const rosterData = {
    POR: team.players.filter(p => p.role === 'POR').map(p => ({ name: p.name, country: p.country })),
    DIF: team.players.filter(p => p.role === 'DIF').map(p => ({ name: p.name, country: p.country })),
    CEN: team.players.filter(p => p.role === 'CEN').map(p => ({ name: p.name, country: p.country })),
    ATT: team.players.filter(p => p.role === 'ATT').map(p => ({ name: p.name, country: p.country }))
  };

  // 8. Fetch analysis from Serverless API
  try {
    const response = await fetch('/api/team-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teamName: team.name,
        roster: rosterData,
        provider: state.settings.aiProvider || 'openrouter',
        openRouterModel: state.settings.openRouterModel || 'openai/gpt-oss-120b:free'
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
    renderTeamAnalysisPopoverData(popover, team, result.analysis, buttonEl);
  } catch (error) {
    console.error(error);
    renderPopoverError(popover, error.message);
  }
}

function renderTeamAnalysisPopoverData(popover, team, analysisText, buttonEl) {
  const parsedHtml = parseMarkdown(analysisText);

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
        const cached = state.aiCache[player.id] || JSON.parse(sessionStorage.getItem(`fantamondiale_ai_${player.id}`) || '{}');
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

async function recalculateIdealLineup(team) {
  if (!team || team.players.length === 0) {
    showToast('Nessun giocatore in rosa da aggiornare!', 'warning');
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
      <div class="ai-skeleton-pulse" style="width: 50px; height: 50px; border-radius: 50%; background: var(--color-primary); margin-bottom: 1rem; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; animation: pulse 1.5s infinite;">🔮</div>
      <h4 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 0.9rem;">Ricalcolo Formazione IA...</h4>
      <p id="ai-recalc-status" style="margin: 0 0 1rem 0; font-size: 0.75rem; color: var(--color-text-muted); line-height: 1.4;">Analisi in corso della rosa completa e delle ultime news calcistiche in tempo reale...</p>
      <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; margin-bottom: 0.5rem;">
        <div id="ai-recalc-progress" style="width: 100%; height: 100%; background: linear-gradient(90deg, #38bdf8 0%, #c084fc 100%); border-radius: 3px; animation: aiPulse 1.5s ease infinite;"></div>
      </div>
    </div>
  `;
  benchContainer.innerHTML = `<div style="text-align: center; color: var(--color-text-muted); font-size: 0.75rem; font-style: italic;">Ricarica in corso...</div>`;

  try {
    const response = await fetch('/api/team-ideal-lineup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        teamName: team.name,
        players: team.players,
        provider: state.settings.aiProvider || 'openrouter',
        openRouterModel: state.settings.openRouterModel || 'openai/gpt-oss-120b:free'
      })
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
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

    // Map playersAnalysis results back to player-level caches so detail cards stay updated!
    if (result.playersAnalysis) {
      Object.keys(result.playersAnalysis).forEach(playerId => {
        const analysis = result.playersAnalysis[playerId];
        state.aiCache[playerId] = analysis;
        sessionStorage.setItem(`fantamondiale_ai_${playerId}`, JSON.stringify(analysis));
      });
    }

    showToast('Formazione ideale ricalcolata con successo in base alle ultime news! 🔮📈', 'success');
    autoSave();
  } catch (err) {
    console.error(err);
    showToast(`Errore durante il ricalcolo: ${err.message || err}`, 'danger');
  }

  // Restore buttons state
  buttons.forEach(btn => btn.disabled = false);

  // Render fresh updated pitch
  renderPitch();
  renderTeamDashboard();
}

// Window globals to wire up inline HTML onclick actions
window.assignPlayerDirect = assignPlayerDirect;
window.releasePlayer = releasePlayer;
window.showTeamPitch = showTeamPitch;
window.loadSpecificCloudSession = loadSpecificCloudSession;
window.deleteSpecificCloudSession = deleteSpecificCloudSession;
window.showPlayerAIAnalysis = showPlayerAIAnalysis;
window.showTeamAIAnalysis = showTeamAIAnalysis;
window.closeAIPopover = closeAIPopover;
window.copyLineupToClipboard = copyLineupToClipboard;
window.recalculateIdealLineup = recalculateIdealLineup;
window.autoLoadCloudSession = autoLoadCloudSession;
window.openStartupDialog = openStartupDialog;
window.openNewSessionFromStartup = openNewSessionFromStartup;
window.loadStartupCloudSession = loadStartupCloudSession;
window.resetSessionClean = resetSessionClean;
window.loginAsAdmin = loginAsAdmin;
window.logoutCloudSession = logoutCloudSession;
