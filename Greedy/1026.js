// 보물
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
let A = input[1].split(" ").map(Number);
let B = input[2].split(" ").map(Number);

// 1 1 1 6 0
// 2 7 8 3 1
// B의 가장 큰 수는 무조건 A의 가장 작은 수와 곱해져야 함.
// A의 가장 큰 수는 무조건 B의 가장 작은 수와 곱해져야 함.
// --> A는 오름차순으로 정렬, B는 내림차순으로 정렬
// 0, 1, 1, 1, 6
// 8, 7, 3, 2, 1

A.sort((a, b) => a - b);
B.sort((a, b) => b - a);

function S(arr1, arr2) {
  let sum = 0;

  for (let i = 0; i < N; i++) {
    sum += arr1[i] * arr2[i];
  }

  return sum;
}

console.log(S(A, B));
