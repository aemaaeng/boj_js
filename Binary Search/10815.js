// 숫자 카드
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const cards = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const nums = input[3].split(" ").map(Number);

// 이분 탐색
function binary_search(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = parseInt((left + right) / 2);

    if (arr[middle] < target) {
      left = middle + 1;
    } else if (arr[middle] > target) {
      right = middle - 1;
    } else {
      return 1;
    }
  }

  return 0;
}

const answer = nums.map((el) => binary_search(cards, el));
console.log(answer.join(" "));
