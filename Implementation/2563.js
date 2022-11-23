// 색종이
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

const N = input[0][0];

// 2차원 배열을 이용하여 색종이로 평면을 덮는 문제
// 색종이로 덮을 2차원 배열 선언하기
let plane = Array.from(Array(100), () => new Array(100).fill(0));
const papers = input.slice(1);

// 1의 개수를 셀 변수
let cnt = 0;

for (let i = 0; i < N; i++) {
  // N만큼 반복문을 돌면서 평면에 색종이를 붙인다
  let x = papers[i][0];
  let y = papers[i][1];
  for (let j = x; j < x + 10; j++) {
    for (let k = y; k < y + 10; k++) {
      // 이미 1로 칠해져있는 부분은 칠하지 않는다
      if (plane[j][k] === 1) {
        continue;
      }
      plane[j][k] = 1;
      cnt += 1;
    }
  }
}

console.log(cnt);
