// 단지번호 붙이기 - dfs
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const map = input.map((el) => el.split("").map(Number));

let visited = Array.from(Array(N + 1), () => new Array(N + 1).fill(0));

let cnt = 0;
let dx = [0, 0, -1, 1];
let dy = [-1, 1, 0, 0];

function dfs(x, y) {
  if (visited[x][y]) return;
  visited[x][y] = 1;
  visitedCoords[[x, y]] = 1;
  cnt++;

  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];

    if (
      nx >= 0 &&
      ny >= 0 &&
      nx < N &&
      ny < N &&
      !visited[nx][ny] &&
      map[nx][ny] === 1
    ) {
      dfs(nx, ny);
    }
  }

  return cnt;
}

const visitedCoords = {};
const answer = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 1 && !visitedCoords[[i, j]]) {
      answer.push(dfs(i, j));
      cnt = 0;
    }
  }
}

console.log(answer.length);
answer.sort((a, b) => a - b);
console.log(answer.join("\n"));
