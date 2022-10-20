// 입력 받기
const fs = require("fs");
// const input = fs.readFileSync("test.txt").toString().trim().split("\n");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let N = Number(input); // 원반의 개수
let cnt = 0; // 옮긴 횟수
let answer = []; // 옮기는 과정을 저장할 배열

// 하노이 탑 이동 순서
function solution(num, from, other, to) {
  // base case
  if (num === 0) {
    return;
  } else {
    solution(num - 1, from, to, other);
    answer.push([from, to]);
    cnt += 1;
    solution(num - 1, other, from, to);
  }
}

solution(N, "1", "2", "3");
console.log(cnt);
console.log(answer.map((el) => el.join(" ")).join("\n"));
