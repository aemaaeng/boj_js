const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const forest = input.slice(1).map((el) => el.split(" ").map(Number));

const visited = Array.from(new Array(N), () => new Array(N).fill(false));
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
let answer = 0;

function dfs(x, y) {
  if (visited[x][y] === false) {
    visited[x][y] = 1;
    let temp = 0;
    for (let i = 0; i < 4; i++) {
      const cx = dx[i] + x;
      const cy = dy[i] + y;

      if (cx < 0 || cy < 0 || cx >= N || cy >= N) continue;
      if (forest[x][y] > forest[cx][cy]) temp = Math.max(temp, dfs(cx, cy));
    }
    visited[x][y] += temp;
  }
  return visited[x][y];
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j] === false) {
      answer = Math.max(answer, dfs(i, j));
    }
  }
}

console.log(answer);
