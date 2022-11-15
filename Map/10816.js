// 숫자 카드 2
// Map 자료구조나 이분 탐색 활용

// Map 활용 풀이
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const cards = input[1].split(" ").map(Number);
const nums = input[3].split(" ").map(Number);

let answer = [];

// map으로 개수 세기
const counter = new Map();

for (let card of cards) {
  if (!counter.has(card)) {
    counter.set(card, 0);
  }
  let value = counter.get(card);
  counter.set(card, value + 1);
}

for (let i = 0; i < nums.length; i++) {
  if (!counter.has(nums[i])) {
    answer[i] = 0;
  } else {
    answer[i] = counter.get(nums[i]);
  }
}

console.log(answer.join(" "));
