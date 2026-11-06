/**
 * @param {string} s
 * @returns {boolean}
 */
export function isValid(s) {
  const pairs = { ")": "(", "}": "{", "]": "[" };
  const stack = [];
  for (const ch of s) {
    if (ch === "(" || ch === "{" || ch === "[") {
      stack.push(ch);
    } else {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}
