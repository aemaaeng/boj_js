// 스타트와 링크
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const stats = input.map((el) => {
  return el.split(" ").map(Number);
});
const half = N / 2;
let min = Infinity;
const visited = new Array(N).fill(false);

function dfs(count, v) {
  // 딱 절반 나뉘었을 때
  if (count === half) {
    const start = [];
    const link = [];
    let startSum = 0;
    let linkSum = 0;

    // visited에 있는 건 start, 없는 건 link에
    for (let i = 0; i < N; i++) {
      if (visited[i]) {
        start.push(i);
      } else {
        link.push(i);
      }
    }

    // 합 구하기
    for (let i = 0; i < half; i++) {
      for (let j = i + 1; j < half; j++) {
        startSum += stats[start[i]][start[j]] + stats[start[j]][start[i]];
        linkSum += stats[link[i]][link[j]] + stats[link[j]][link[i]];
      }
    }

    // min보다 작으면 업데이트
    let diff = Math.abs(startSum - linkSum);
    if (min > diff) {
      min = diff;
    }
    return;
  }

  // 수열 만드는 백트래킹
  for (let i = v; i < N; i++) {
    visited[i] = true;
    dfs(count + 1, i + 1);
    visited[i] = false;
  }
}

dfs(0, 0);
console.log(min);
