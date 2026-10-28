# Merge Sorted Array

## Problem

You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, the number of elements in `nums1` and `nums2` respectively.

Merge `nums2` into `nums1` as one sorted array **in-place**. The first `m` elements of `nums1` are the mergeable values; the last `n` elements of `nums1` are `0` placeholders. The length of `nums1` is `m + n`.

## Examples

```
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
```

## Constraints

- `nums1.length == m + n`
- `nums2.length == n`

## Notes

Implement `merge` in `solution.js`.
