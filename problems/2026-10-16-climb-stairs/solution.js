/**
 * @param {number} n
 * @returns {number}
 */
export function climbStairs(n) {
  if (n <= 2) return n;

  let prev = 1;
  let cur = 2;

  for (let i = 3; i <= n; i++) {
    const next = prev + cur;
    prev = cur;
    cur = next;
  }

  return cur;
}
