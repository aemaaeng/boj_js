// 스타트와 링크
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const stats = input.map((el) => {
  return el.split(" ").map(Number);
});

const half = Math.floor(N / 2);
const start = [];
let link = [];
let min = Infinity;

const visited = new Array(N).fill(false);

function dfs(v) {
  // start 배열이 절반의 크기와 같을 때
  if (v === half) {
    let startSum = 0;
    let linkSum = 0;

    // start 배열을 탐색하면서 없는 건 link에 넣는다
    for (let i = 1; i < N + 1; i++) {
      if (start.indexOf(i) === -1) {
        link.push(i);
      }
    }

    // console.log("start: ", start);
    // console.log("link: ", link);
    // console.log("----------------");

    // 합 구하기
    for (let i = 0; i < half - 1; i++) {
      for (let j = i + 1; j < half; j++) {
        startSum +=
          stats[start[i] - 1][start[j] - 1] + stats[start[j] - 1][start[i] - 1];
        linkSum +=
          stats[link[i] - 1][link[j] - 1] + stats[link[j] - 1][link[i] - 1];
      }
    }

    // min보다 작으면 할당
    let diff = Math.abs(startSum - linkSum);
    if (min > diff) {
      min = diff;
    }

    link = [];
    return;
  }

  // 수열 만드는 백트래킹
  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    start.push(i + 1);
    dfs(v + 1);

    start.pop();
    visited[i] = false;
  }
}

dfs(0);
console.log(min);
