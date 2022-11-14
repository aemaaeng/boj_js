// 숫자 카드 2
// Map 자료구조나 이분 탐색 활용

// 이분 탐색 활용 풀이
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let cards = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function binary_search(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = parseInt((left + right) / 2);

    if (arr[middle][0] < target) {
      left = middle + 1;
    } else if (arr[middle][0] > target) {
      right = middle - 1;
    } else {
      return arr[middle][1];
    }
  }
  return 0;
}

const nums = input[3].split(" ").map(Number);
const arr = [[cards[0], 1]];

for (let i = 1; i < cards.length; i++) {
  if (cards[i - 1] === cards[i]) {
    arr[arr.length - 1][1] += 1;
  } else {
    arr.push([cards[i], 1]);
  }
}

const answer = nums.map((el) => binary_search(arr, el));
console.log(answer.join(" "));

// ** 처음 풀이 (시간 초과) **
// let cards = input[1]
//   .split(" ")
//   .map(Number)
//   .sort((a, b) => a - b);

// let counter = {};

// for (let i = 0; i < cards.length; i++) {
//   if (counter[cards[i]] === undefined) {
//     counter[cards[i]] = 0;
//   }
//   counter[cards[i]] += 1;
// }

// const key = Object.keys(counter).map(Number);
// const val = Object.values(counter);

// let nums = input[3].split(" ").map(Number);
// let answer = new Array(nums.length).fill(0);

// for (let i = 0; i < nums.length; i++) {
//   if (key.indexOf(nums[i]) === -1) {
//     answer[i] = 0;
//   } else {
//     answer[i] = val[key.indexOf(nums[i])];
//   }
// }

// console.log(answer.join(" "));
