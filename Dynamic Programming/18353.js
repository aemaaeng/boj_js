// 병사 배치하기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
input = input[0].split(" ").map(Number);

// D[i] = arr[i]를 마지막 원소로 가지는 부분 수열의 최대 길이
const D = new Array(N).fill(1); // 자기 자신을 포함하므로 초기값은 1로

for (let i = 0; i < N; i++) {
  let max = 0;
  for (let j = 0; j < i; j++) {
    if (input[i] < input[j] && D[j] > max) {
      max = D[j];
    }
  }
  D[i] = max + 1;
}

console.log(N - Math.max(...D));
