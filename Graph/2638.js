// 치즈
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const grid = input.map((el) => el.split(" ").map(Number));

let visitedCoords = {};
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const cheese = {};
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (grid[i][j] === 1) cheese[[i, j]] = true;
  }
}

function outsideAir(x, y) {
  const queue = [[x, y]];

  while (queue.length) {
    const coords = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = coords[0] + dx[i];
      const ny = coords[1] + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (grid[nx][ny] !== 1 && !visitedCoords[[nx, ny]]) {
        visitedCoords[[nx, ny]] = true;
        grid[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }
}

function meltCheese(arr) {
  for (let i = 0; i < arr.length; i++) {
    const [x, y] = arr[i];
    grid[x][y] = 2;

    delete cheese[`${x},${y}`];
  }
}

let willMelt = [];

function bfs(x, y) {
  visitedCoords[[x, y]] = true;
  const queue = [[x, y]];
  let cnt = 0;

  while (queue.length) {
    const coords = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = coords[0] + dx[i];
      const ny = coords[1] + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (grid[x][y] === 1 && grid[nx][ny] === 2) cnt += 1;

      if (!visitedCoords[[nx, ny]] && grid[nx][ny] === 1) {
        visitedCoords[[nx, ny]] = true;
        queue.push([nx, ny]);
      }
    }
    if (cnt >= 2) willMelt.push([coords[0], coords[1]]);
    cnt = 0;
  }
}

let hour = 0;

while (Object.keys(cheese).length !== 0) {
  outsideAir(0, 0);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (grid[i][j] === 1 && !visitedCoords[[i, j]]) bfs(i, j);
    }
  }

  meltCheese(willMelt);
  hour += 1;

  willMelt = [];
  visitedCoords = [];
}

console.log(hour);
