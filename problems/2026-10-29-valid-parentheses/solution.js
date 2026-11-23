/**
 * @param {string} s
 * @returns {boolean}
 */
export function isValid(s) {
  const stack = [];
  const closeToOpen = { ")": "(", "}": "{", "]": "[" };
  for (const ch of s) {
    if (ch === "(" || ch === "{" || ch === "[") {
      stack.push(ch);
    } else if (stack.pop() !== closeToOpen[ch]) {
      return false;
    }
  }
  return stack.length === 0;
}
