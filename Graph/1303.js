// 전쟁 - 전투
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [M, N] = input.shift().split(" ").map(Number);
input = input.map((el) => el.split(""));

// 아군 - 흰색 옷
// 적군 - 파란색 옷
// N명이 뭉치면 N^2명의 위력을 낸다

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
const visitedWhiteCoords = {};
const visitedBlueCoords = {};

function bfs_W(x, y) {
  const queue = [[x, y]];
  visitedWhiteCoords[[x, y]] = true;
  let cnt = 1;

  while (queue.length) {
    const [a, b] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = a + dx[i];
      const ny = b + dy[i];

      if (
        nx < 0 ||
        ny < 0 ||
        nx >= N ||
        ny >= M ||
        visitedWhiteCoords[[nx, ny]]
      )
        continue;
      if (input[x][y] === "W" && input[nx][ny] === "W") {
        cnt += 1;
        visitedWhiteCoords[[nx, ny]] = true;
        queue.push([nx, ny]);
      }
    }
  }

  return cnt;
}

function bfs_B(x, y) {
  const queue = [[x, y]];
  visitedBlueCoords[[x, y]] = true;
  let cnt = 1;

  while (queue.length) {
    const [a, b] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = a + dx[i];
      const ny = b + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M || visitedBlueCoords[[nx, ny]])
        continue;
      if (input[x][y] === "B" && input[nx][ny] === "B") {
        cnt += 1;
        visitedBlueCoords[[nx, ny]] = true;
        queue.push([nx, ny]);
      }
    }
  }

  return cnt;
}

let whiteSum = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visitedWhiteCoords[[i, j]] && input[i][j] === "W") {
      whiteSum += bfs_W(i, j) ** 2;
    }
  }
}

let blackSum = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visitedBlueCoords[[i, j]] && input[i][j] === "B") {
      blackSum += bfs_B(i, j) ** 2;
    }
  }
}

console.log(`${whiteSum} ${blackSum}`);
