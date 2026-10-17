/**
 * @param {number[]} prices
 * @returns {number}
 */
export function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    best = Math.max(best, price - minPrice);
  }

  return best;
}
