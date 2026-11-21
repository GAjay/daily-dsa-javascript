/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @returns {void}
 */
export function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  for (let k = m + n - 1; j >= 0; k--) {
    if (i >= 0 && nums1[i] > nums2[j]) nums1[k] = nums1[i--];
    else nums1[k] = nums2[j--];
  }
}
