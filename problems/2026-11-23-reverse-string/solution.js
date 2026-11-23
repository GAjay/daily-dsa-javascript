/**
 * @param {string[]} s
 * @returns {void}
 */
export function reverseString(s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    [s[i], s[j]] = [s[j], s[i]];
  }
}
