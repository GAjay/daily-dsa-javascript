# Two Sum

## Problem

Given an array of integers `nums` and an integer `target`, return **indices** of the two numbers such that they add up to `target`.

You may assume each input has **exactly one** solution, and you may not use the same element twice.

You can return the answer in any order.

## Examples

```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] == 9
```

```
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]
```

## Constraints

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Only one valid answer exists.

## Approach (hint)

Use a hash map from value → index while scanning once (O(n) time, O(n) space).
