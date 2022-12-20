// 부분수열의 합
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => {
    el = el.split(" ");
    return el.map(Number);
  });

const N = input[0][0];
const S = input[0][1];

const nums = input[1];

// 모든 부분집합 구하기
function powerSet(arr) {
  const result = [];

  function recursion(subset, start) {
    result.push(subset);
    for (let i = start; i < arr.length; i++) {
      recursion(subset.concat(arr[i]), i + 1);
    }
  }

  recursion([], 0);
  return result;
}

// 빈 집합 제거
const combinations = powerSet(nums).slice(1);

let sums = combinations.map((el) => {
  return el.reduce((acc, cur) => acc + cur);
});

let answer = sums.filter((el) => el === S);
console.log(answer.length);
