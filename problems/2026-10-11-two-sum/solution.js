/**
 * @param {number[]} nums
 * @param {number} target
 * @returns {[number, number]}
 */
export function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) {
      return [seen.get(need), i];
    }
    seen.set(nums[i], i);
  }

  throw new Error("No two sum pair found");
}
