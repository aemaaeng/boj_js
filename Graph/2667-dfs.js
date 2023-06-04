// 단지번호 붙이기 - dfs
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const field = input.map((el) => el.split("").map(Number));

const visitedCoords = {};
const visited = Array.from(new Array(N + 1), () =>
  new Array(N + 1).fill(false)
);

let cnt = 0;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function dfs(x, y) {
  if (visited[x][y]) return;
  visited[x][y] = true;
  visitedCoords[[x, y]] = true;
  cnt += 1;

  // 상하좌우 탐색
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
    if (!visited[nx][ny] && field[nx][ny] === 1) dfs(nx, ny);
  }

  return cnt;
}

const answer = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]] && field[i][j] === 1) {
      answer.push(dfs(i, j));
      cnt = 0;
    }
  }
}

console.log(answer.length);
answer.sort((a, b) => a - b);
console.log(answer.join("\n"));
