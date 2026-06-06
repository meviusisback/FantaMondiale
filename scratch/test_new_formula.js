const SEED_PLAYERS = [
  { id: 's-51', name: 'Kylian Mbappé', role: 'ATT', country: 'Francia', initialValue: 45 },
  { id: 's-52', name: 'Erling Haaland', role: 'ATT', country: 'Norvegia', initialValue: 42 }
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

function calculateIdealBidRangeNew(player, teamBudget, playersCount) {
  const performance = getPlayerPerformanceRating(player);
  const base = Math.max(1, player.initialValue || 1);
  
  const perfMult = 0.8 + ((performance - 6.0) / 2.8) * 0.5;
  let minPrice = Math.round(base * perfMult * 0.9);
  let maxPrice = Math.round(base * perfMult * 1.25);
  
  const remainingCredits = teamBudget;
  const playersNeeded = playersCount < 25 ? (25 - playersCount) : 1;
  
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
  
  // Using remainingCredits instead of avgCreditsPerPlayer!
  const targetMin = Math.round(remainingCredits * adjustedWeight * 0.75);
  const targetMax = Math.round(remainingCredits * adjustedWeight * 1.25);
  
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

console.log('Mbappe (initValue=45) at 300 budget, 0 players:', calculateIdealBidRangeNew(SEED_PLAYERS[0], 300, 0));
console.log('Mbappe (initValue=45) at 500 budget, 0 players:', calculateIdealBidRangeNew(SEED_PLAYERS[0], 500, 0));
console.log('Mbappe (initValue=1) at 300 budget, 0 players:', calculateIdealBidRangeNew({ name: 'Kylian Mbappé', role: 'ATT', initialValue: 1 }, 300, 0));
console.log('Mbappe (initValue=1) at 500 budget, 0 players:', calculateIdealBidRangeNew({ name: 'Kylian Mbappé', role: 'ATT', initialValue: 1 }, 500, 0));
console.log('Haaland (initValue=42) at 300 budget, 0 players:', calculateIdealBidRangeNew(SEED_PLAYERS[1], 300, 0));
console.log('Haaland (initValue=1) at 300 budget, 0 players:', calculateIdealBidRangeNew({ name: 'Erling Haaland', role: 'ATT', initialValue: 1 }, 300, 0));
console.log('Generic ATT (initValue=1) at 300 budget, 0 players:', calculateIdealBidRangeNew({ name: 'Generic Player', role: 'ATT', initialValue: 1 }, 300, 0));
