// 단지번호 붙이기 - bfs
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const field = input.map((el) => el.split("").map(Number));

const visited = Array.from(new Array(N + 1), () =>
  new Array(N + 1).fill(false)
);
let houseCnt = 1;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(x, y) {
  const queue = [[x, y]];
  visited[x][y] = true;
  visitedCoords[[x, y]] = true;

  while (queue.length) {
    const coord = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = coord[0] + dx[i];
      const ny = coord[1] + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

      if (!visited[nx][ny] && field[nx][ny] === 1) {
        queue.push([nx, ny]);
        visited[nx][ny] = true;
        visitedCoords[[nx, ny]] = true;
        houseCnt += 1;
      }
    }
  }
  return houseCnt;
}

const answer = [];
const visitedCoords = {};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]] && field[i][j] === 1) {
      answer.push(bfs(i, j));
      houseCnt = 1;
    }
  }
}

console.log(answer.length);
answer.sort((a, b) => a - b);
console.log(answer.join("\n"));
