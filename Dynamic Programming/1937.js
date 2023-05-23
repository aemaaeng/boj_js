// 욕심쟁이 판다
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const forest = input.slice(1).map((el) => el.split(" ").map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];
const visited = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));

function dfs(x, y) {
  if (!visited[x][y]) {
    visited[x][y] = 1;
    let temp = 0;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (forest[x][y] < forest[nx][ny]) {
        temp = Math.max(temp, dfs(nx, ny));
      }
    }
    visited[x][y] += temp;
  }

  return visited[x][y];
}

let answer = 0;

// 각 지점마다 dfs를 돌려본다
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    answer = Math.max(answer, dfs(i, j));
  }
}

console.log(answer);
