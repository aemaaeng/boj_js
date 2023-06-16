// 적록색약
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((el) => el.split(""));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const notBlind = [];
const blind = [];

let visitedCoords = {};
let area = 0;

function dfs1(x, y) {
  if (visitedCoords[[x, y]]) return;
  visitedCoords[[x, y]] = true;
  area += 1;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
    if (arr[nx][ny] === arr[x][y]) {
      dfs1(nx, ny);
    }
  }

  return area;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]]) notBlind.push(dfs1(i, j));
    area = 0;
  }
}

function dfs2(x, y) {
  if (visitedCoords[[x, y]]) return;
  visitedCoords[[x, y]] = true;
  area += 1;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
    if (
      (arr[x][y] === "G" && arr[nx][ny] === "R") ||
      (arr[x][y] === "R" && arr[nx][ny] === "G") ||
      arr[x][y] === arr[nx][ny]
    ) {
      dfs2(nx, ny);
    }
  }

  return area;
}

visitedCoords = {};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]]) blind.push(dfs2(i, j));
    area = 0;
  }
}

console.log(`${notBlind.length} ${blind.length}`);
