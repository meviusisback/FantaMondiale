const SEED_PLAYERS = [
  { id: 's-51', name: 'Kylian Mbappé', role: 'ATT', country: 'Francia', initialValue: 45 },
  { id: 's-52', name: 'Erling Haaland', role: 'Norvegia', country: 'Norvegia', initialValue: 42 }
];

const TOP_150_PLAYERS = [
  { name: "Kylian Mbappe", country: "france" },
  { name: "Erling Haaland", country: "norway" }
];

function getPlayerPerformanceRating(player) {
  const base = player.initialValue || 1;
  let maxForRole = 30;
  if (player.role === 'ATT') maxForRole = 45;
  const ratio = Math.max(0.05, Math.min(1.0, base / maxForRole));
  return 6.0 + ratio * 3.5;
}

function findTopPlayerRank(player) {
  if (player.name.includes('Mbappé') || player.name.includes('Mbappe')) return 1;
  if (player.name.includes('Haaland')) return 2;
  return 999;
}

function calculateIdealBidRange(player, teamBudget, playersCount) {
  const performance = getPlayerPerformanceRating(player);
  const base = Math.max(1, player.initialValue || 1);
  
  const perfMult = 0.8 + ((performance - 6.0) / 2.8) * 0.5;
  let minPrice = Math.round(base * perfMult * 0.9);
  let maxPrice = Math.round(base * perfMult * 1.25);
  
  const remainingCredits = teamBudget;
  const playersNeeded = playersCount < 25 ? (25 - playersCount) : 1;
  const avgCreditsPerPlayer = remainingCredits / playersNeeded;
  
  const rank = findTopPlayerRank(player);
  let budgetWeight = 0.05;
  
  if (rank <= 10) budgetWeight = 0.55;
  
  let scaleFactor = 1.0;
  if (playersNeeded > 5) {
    scaleFactor = Math.max(0.4, 5 / playersNeeded);
  }
  const adjustedWeight = budgetWeight * scaleFactor;
  
  const targetMin = Math.round(avgCreditsPerPlayer * adjustedWeight * 0.75);
  const targetMax = Math.round(avgCreditsPerPlayer * adjustedWeight * 1.25);
  
  const beforeBudgetMin = minPrice;
  const beforeBudgetMax = maxPrice;

  minPrice = Math.max(minPrice, targetMin);
  maxPrice = Math.max(maxPrice, targetMax);
  
  const maxAffordable = Math.max(1, remainingCredits - playersNeeded + 1);
  minPrice = Math.min(minPrice, maxAffordable);
  maxPrice = Math.min(maxPrice, maxAffordable);
  
  minPrice = Math.max(base, minPrice);
  maxPrice = Math.max(minPrice, maxPrice);

  return {
    initialValue: base,
    beforeBudgetMin,
    beforeBudgetMax,
    targetMin,
    targetMax,
    finalMin: minPrice,
    finalMax: maxPrice
  };
}

console.log('Mbappe at 300 budget, 0 players:', calculateIdealBidRange(SEED_PLAYERS[0], 300, 0));
console.log('Mbappe at 500 budget, 0 players:', calculateIdealBidRange(SEED_PLAYERS[0], 500, 0));
console.log('Mbappe with initialValue=1 at 300 budget:', calculateIdealBidRange({ name: 'Kylian Mbappé', role: 'ATT', initialValue: 1 }, 300, 0));
console.log('Mbappe with initialValue=1 at 500 budget:', calculateIdealBidRange({ name: 'Kylian Mbappé', role: 'ATT', initialValue: 1 }, 500, 0));
