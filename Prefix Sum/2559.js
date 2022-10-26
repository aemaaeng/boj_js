const fs = require("fs");
// TODO: 제출 시 경로 변환 필수 ("/dev/stdin")
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].split(" ")[0]); // 날짜의 수
const K = Number(input[0].split(" ")[1]); // 합을 구하기 위한 연속적인 날짜의 수

const arr = input[1].split(" ");

// 누적합 구하기
const P = [0];
for (let i = 1; i < N + 1; i++) {
  P[i] = P[i - 1] + Number(arr[i - 1]);
}

// N = 2, sums = [];
// sums[0] = 0부터 1까지의 합 => P[2] - P[0] = 1
// sums[1] = 1부터 2까지의 합 => P[3] - P[1] = -6
// sums[2] = 2부터 3까지의 합 => P[4] - P[2] = -13

// N = 5, sums = [];
// sums[0] = 0부터 4까지의 합 => P[5] - P[0] = -12
// sums[1] = 1부터 5까지의 합 => P[6] - P[1] = -12
// sums[2] = 2부터 6까지의 합 => P[7] - P[2] = -3

const sum = [];
for (let i = 0; i < N - K + 1; i++) {
  sum[i] = P[K + i] - P[i];
}

console.log(Math.max(...sum));
