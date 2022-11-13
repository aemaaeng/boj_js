// 수 찾기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const A = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const M = input[3].split(" ").map(Number);

let answer = [];

function binary_search(A, k, start, end) {
  // 시작점이 끝점보다 더 커지면 false 리턴
  if (start > end) {
    return false;
  }

  let mid = Math.floor((start + end) / 2);

  if (A[mid] === k) {
    return true;
  } else if (A[mid] > k) {
    return binary_search(A, k, start, mid - 1);
  } else {
    return binary_search(A, k, mid + 1, end);
  }
}

for (num of M) {
  if (binary_search(A, num, 0, A.length - 1)) {
    answer.push(1);
  } else {
    answer.push(0);
  }
}

console.log(answer.join("\n"));
