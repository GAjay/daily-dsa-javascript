/**
 * @param {string} s
 * @returns {boolean}
 */
export function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
      continue;
    }
    if (ch === ")" || ch === "]" || ch === "}") {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }

  return stack.length === 0;
}
