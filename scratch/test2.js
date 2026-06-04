function getPlayerPerformanceRating(player) {
  const base = player.initialValue || 1;
  let maxForRole = 30;
  if (player.role === 'ATT') maxForRole = 45;
  else if (player.role === 'DIF') maxForRole = 20;
  else if (player.role === 'POR') maxForRole = 18;
  const ratio = Math.max(0.05, Math.min(1.0, base / maxForRole));
  return 6.0 + ratio * 3.5;
}

function findTopPlayerRank(player) {
  if (player.name === 'MOHAMED SALAH') return 13;
  if (player.name === 'ALISSON') return 21;
  return 999; // Abdelmoneim
}

function calculateIdealBidRangeNew(player, team) {
  const performance = getPlayerPerformanceRating(player);
  const base = Math.max(1, player.initialValue || 1);
  const perfMult = 0.8 + ((performance - 6.0) / 2.8) * 0.5;
  let minPrice = Math.round(base * perfMult * 0.9);
  let maxPrice = Math.round(base * perfMult * 1.25);

  const remainingCredits = team.budget;
  const playersCount = team.players.length;
  
  // New formula:
  const playersNeeded = playersCount < 25 ? (25 - playersCount) : 1;
  const avgCreditsPerPlayer = remainingCredits / playersNeeded;
  
  const rank = findTopPlayerRank(player);
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
  
  // SATURATION
  const roleCount = team.players.filter(p => p.role === player.role).length;
  let roleSaturationFactor = 1.0;
  
  if (player.role === 'POR') {
    if (roleCount === 0) roleSaturationFactor = 1.35;
    else if (roleCount === 1) roleSaturationFactor = 1.15;
    else if (roleCount === 2) roleSaturationFactor = 1.0;
    else roleSaturationFactor = 0.4;
  } else if (player.role === 'DIF') {
    if (roleCount === 0) roleSaturationFactor = 1.35;
    else if (roleCount <= 3) roleSaturationFactor = 1.2;
    else if (roleCount <= 6) roleSaturationFactor = 1.0;
    else if (roleCount === 7) roleSaturationFactor = 0.9;
    else roleSaturationFactor = 0.5;
  } else if (player.role === 'ATT') {
    if (roleCount === 0) roleSaturationFactor = 1.35;
    else if (roleCount <= 2) roleSaturationFactor = 1.2;
    else if (roleCount <= 4) roleSaturationFactor = 1.0;
    else if (roleCount === 5) roleSaturationFactor = 0.85;
    else roleSaturationFactor = 0.4;
  }

  // Exempt top-100 players from role saturation penalty
  if (rank <= 100) {
    roleSaturationFactor = 1.0;
  }
  
  const targetMin = Math.round(avgCreditsPerPlayer * adjustedWeight * 0.75 * roleSaturationFactor);
  const targetMax = Math.round(avgCreditsPerPlayer * adjustedWeight * 1.25 * roleSaturationFactor);
  
  minPrice = Math.max(minPrice, targetMin);
  maxPrice = Math.max(maxPrice, targetMax);
  
  const maxAffordable = Math.max(1, remainingCredits - playersNeeded + 1);
  minPrice = Math.min(minPrice, maxAffordable);
  maxPrice = Math.min(maxPrice, maxAffordable);
  
  minPrice = Math.max(base, minPrice);
  maxPrice = Math.max(minPrice, maxPrice);
  
  return { min: minPrice, max: maxPrice };
}

// 26 players team: 3 POR, 8 DIF, 8 CEN, 7 ATT
const mockTeam = {
  budget: 475,
  players: [
    ...Array(3).fill({ role: 'POR' }),
    ...Array(8).fill({ role: 'DIF' }),
    ...Array(8).fill({ role: 'CEN' }),
    ...Array(7).fill({ role: 'ATT' })
  ]
};

const salah = { name: 'MOHAMED SALAH', role: 'ATT', initialValue: 3 };
const alisson = { name: 'ALISSON', role: 'POR', initialValue: 3 };
const abdelmoneim = { name: 'MOHAMED ABDELMONEIM', role: 'DIF', initialValue: 8 };

console.log('Salah Range:', calculateIdealBidRangeNew(salah, mockTeam));
console.log('Alisson Range:', calculateIdealBidRangeNew(alisson, mockTeam));
console.log('Abdelmoneim Range:', calculateIdealBidRangeNew(abdelmoneim, mockTeam));
