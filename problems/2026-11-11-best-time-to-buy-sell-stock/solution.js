/**
 * @param {number[]} prices
 * @returns {number}
 */
export function maxProfit(prices) {
  let minPrice = Infinity;
  let best = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else best = Math.max(best, price - minPrice);
  }
  return best;
}
