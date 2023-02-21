// 적록색약
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 적록색약이 아닌 사람 (세 영역을 구분)
// 적록색약인 사람 (빨강-초록을 하나로 묶음)

const N = Number(input.shift());
const grid = input.map((el) => el.split(""));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
let cnt = 0;

let visited = Array.from(new Array(N + 1), () => new Array(N + 1).fill(false));

function dfs_blind(x, y) {
  if (visited[x][y]) return;
  visited[x][y] = true;
  visitedCoords_blind[[x, y]] = true;
  cnt++;

  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];

    if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
      if (
        grid[nx][ny] === grid[x][y] ||
        (grid[x][y] === "R" && grid[nx][ny] === "G") ||
        (grid[x][y] === "G" && grid[nx][ny] === "R")
      ) {
        dfs_blind(nx, ny);
      }
    }
  }

  return cnt;
}

function dfs(x, y) {
  if (visited[x][y]) return;
  visited[x][y] = true;
  visitedCoords[[x, y]] = true;
  cnt++;

  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];

    if (nx >= 0 && ny >= 0 && nx < N && ny < N && grid[nx][ny] === grid[x][y]) {
      dfs(nx, ny);
    }
  }

  return cnt;
}

const non_blind = [];
const blind = [];

const visitedCoords = {};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]]) {
      non_blind.push(dfs(i, j));
      cnt = 0;
    }
  }
}

const visitedCoords_blind = {};
cnt = 0;
visited = Array.from(new Array(N + 1), () => new Array(N + 1).fill(false));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords_blind[[i, j]]) {
      blind.push(dfs_blind(i, j));
      cnt = 0;
    }
  }
}

console.log(non_blind.length, blind.length);
