// 다리 만들기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const field = input.map((el) => el.split(" ").map(Number));

// -1로 만들기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (field[i][j] === 1) field[i][j] = -1;
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
let visitedCoords = {};

function labelIsland(a, b, num) {
  const queue = [[a, b]];
  visitedCoords[[a, b]] = true;
  field[a][b] = num;

  while (queue.length) {
    const coords = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = coords[0] + dx[i];
      const ny = coords[1] + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (field[nx][ny] !== 0 && !visitedCoords[[nx, ny]]) {
        visitedCoords[[nx, ny]] = true;
        field[nx][ny] = num;
        queue.push([nx, ny]);
      }
    }
  }
}

function bfs(num) {
  let res = 0; // 다리 길이
  const queue = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (field[i][j] === num) {
        visitedCoords[[i, j]] = true;
        queue.push([i, j]);
      }
    }
  }

  while (queue.length) {
    let L = queue.length;
    for (let i = 0; i < L; i++) {
      const coords = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nx = coords[0] + dx[i];
        const ny = coords[1] + dy[i];

        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

        if (field[nx][ny] !== 0 && field[nx][ny] !== num) {
          return res;
        } else if (field[nx][ny] === 0 && !visitedCoords[[nx, ny]]) {
          visitedCoords[[nx, ny]] = true;
          queue.push([nx, ny]);
        }
      }
    }
    res += 1;
  }
}

// 섬에 번호 매기기
let label = 1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]] && field[i][j] !== 0) {
      labelIsland(i, j, label);
      label += 1;
    }
  }
}

let answer = Infinity;

// 섬별로 bfs 실행해보며 최솟값 리턴
for (let i = 1; i < label; i++) {
  answer = Math.min(bfs(i), answer);
  visitedCoords = {};
}

console.log(answer);
