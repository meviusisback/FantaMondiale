const TOP_150_PLAYERS = [
  { name: 'Kylian Mbappe', country: 'france' },
  { name: 'Erling Haaland', country: 'norway' },
  { name: 'Vinicius Junior', country: 'brazil' },
  { name: 'Jude Bellingham', country: 'england' },
  { name: 'Harry Kane', country: 'england' },
  { name: 'Lionel Messi', country: 'argentina' },
  { name: 'Lautaro Martinez', country: 'argentina' },
  { name: 'Kevin De Bruyne', country: 'belgium' },
  { name: 'Jamal Musiala', country: 'germany' },
  { name: 'Florian Wirtz', country: 'germany' },
  { name: 'Bukayo Saka', country: 'england' },
  { name: 'Phil Foden', country: 'england' },
  { name: 'Mohamed Salah', country: 'egypt' },
  { name: 'Rodrygo Silva', country: 'brazil' },
  { name: 'Antoine Griezmann', country: 'france' },
  { name: 'Rafael Leao', country: 'portugal' },
  { name: 'Cole Palmer', country: 'england' },
  { name: 'Lamine Yamal', country: 'spain' }
];

function findTopPlayerRank(player) {
  return 13; // Assume Salah matches at rank 13
}

function getPlayerPerformanceRating(player) {
  const base = player.initialValue || 1;
  let maxForRole = 30;
  if (player.role === 'ATT') maxForRole = 45;
  const ratio = Math.max(0.05, Math.min(1.0, base / maxForRole));
  return 6.0 + ratio * 3.5;
}

function test(player, team) {
  const performance = getPlayerPerformanceRating(player);
  const base = Math.max(1, player.initialValue || 1);
  const perfMult = 0.8 + ((performance - 6.0) / 2.8) * 0.5;
  let minPrice = Math.round(base * perfMult * 0.9);
  let maxPrice = Math.round(base * perfMult * 1.25);
  
  const remainingCredits = team.budget;
  const playersCount = team.players.length;
  const targetRosterSize = playersCount < 25 ? 25 : 35;
  const playersNeeded = Math.max(1, targetRosterSize - playersCount);
  const avgCreditsPerPlayer = remainingCredits / playersNeeded;
  
  const rank = findTopPlayerRank(player);
  let budgetWeight = 0.45; // Rank 13
  
  let scaleFactor = 1.0;
  if (playersNeeded > 5) {
    scaleFactor = Math.max(0.4, 5 / playersNeeded);
  }
  const adjustedWeight = budgetWeight * scaleFactor;
  
  console.log('base:', base, 'perfMult:', perfMult, 'initial min/max:', minPrice, maxPrice);
  console.log('playersNeeded:', playersNeeded, 'avgCreditsPerPlayer:', avgCreditsPerPlayer, 'adjustedWeight:', adjustedWeight);

  for (let roleCount = 0; roleCount <= 8; roleCount++) {
    let roleSaturationFactor = 1.0;
    if (player.role === 'ATT') {
      if (roleCount === 0) roleSaturationFactor = 1.35;
      else if (roleCount <= 2) roleSaturationFactor = 1.2;
      else if (roleCount <= 4) roleSaturationFactor = 1.0;
      else if (roleCount === 5) roleSaturationFactor = 0.85;
      else roleSaturationFactor = 0.4;
    }
    
    let tMin = Math.round(avgCreditsPerPlayer * adjustedWeight * 0.75 * roleSaturationFactor);
    let tMax = Math.round(avgCreditsPerPlayer * adjustedWeight * 1.25 * roleSaturationFactor);
    
    let finalMin = Math.max(minPrice, tMin);
    let finalMax = Math.max(maxPrice, tMax);
    
    const maxAffordable = Math.max(1, remainingCredits - playersNeeded + 1);
    finalMin = Math.min(finalMin, maxAffordable);
    finalMax = Math.min(finalMax, maxAffordable);
    
    finalMin = Math.max(base, finalMin);
    finalMax = Math.max(finalMin, finalMax);
    
    console.log(`roleCount: ${roleCount}, saturation: ${roleSaturationFactor}, tMin/tMax: ${tMin}/${tMax}, final: ${finalMin}-${finalMax}`);
  }
}

const player = { role: 'ATT', initialValue: 3 };
const team = { budget: 475, players: Array(26).fill({ role: 'DIF' }) }; // Let's vary the role counts
test(player, team);
