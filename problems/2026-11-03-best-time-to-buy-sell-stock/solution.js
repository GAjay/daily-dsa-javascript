/**
 * @param {number[]} prices
 * @returns {number}
 */
export function maxProfit(prices) {
  let min = prices[0];
  let best = 0;
  for (let i = 1; i < prices.length; i++) {
    best = Math.max(best, prices[i] - min);
    min = Math.min(min, prices[i]);
  }
  return best;
}
