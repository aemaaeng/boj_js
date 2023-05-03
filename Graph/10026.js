// 적록색약
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((el) => el.split(""));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const answer1 = [];
const answer2 = [];

let visitedCoords = {};
let area = 0;

// dfs로 영역 개수 세기 (색약 X)
function dfs1(x, y) {
  if (visitedCoords[[x, y]]) return;
  visitedCoords[[x, y]] = true;
  area += 1;

  // 주변 탐색
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
    if (arr[x][y] === arr[nx][ny]) {
      dfs1(nx, ny);
    }
  }

  return area;
}

function dfs2(x, y) {
  if (visitedCoords[[x, y]]) return;
  visitedCoords[[x, y]] = true;
  area += 1;

  // 주변 탐색
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

    // R과 G를 같은 취급해야 함.
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

// 반복문으로 탐색 - 일반
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]]) {
      answer1.push(dfs1(i, j));
      area = 0;
    }
  }
}

visitedCoords = {};

// 반복문으로 탐색 - 적록색약
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]]) {
      answer2.push(dfs2(i, j));
      area = 0;
    }
  }
}

console.log(`${answer1.length} ${answer2.length}`);
