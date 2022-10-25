const fs = require("fs");
// TODO: 제출 시 경로 변환 필수 ("/dev/stdin")
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].split(" ")[0]); // 수의 개수
const M = Number(input[0].split(" ")[1]); // 반복 횟수
const arr = input[1].split(" "); // 수 배열

const test = input.slice(2);
// 반복문 안에서 test[i].split(" ")

const P = [0];
// Prefix Sum 배열 만들기
for (let i = 1; i < N + 1; i++) {
  P[i] = P[i - 1] + Number(arr[i - 1]);
}

// 반복문 안에서 console.log()를 쓰면 시간초과가 발생
// 정답 배열을 하나 만들어두어야 함
const answer = [];

for (let i = 0; i < M; i++) {
  let start = Number(test[i].split(" ")[0]);
  let end = Number(test[i].split(" ")[1]);

  answer.push(P[end] - P[start - 1]);
}

console.log(answer.join("\n"));
