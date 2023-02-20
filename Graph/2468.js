// 안전영역
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const swamp = input.map((el) => el.split(" ").map(Number));

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

let maxHeight = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (swamp[i][j] > maxHeight) maxHeight = swamp[i][j];
  }
}

function solution(height) {
  const visited = Array.from(new Array(N + 1), () => new Array(N + 1));
  let cnt = 0;

  // 잠기지 않는 영역을 하나씩 세는 dfs
  function dfs(x, y, h) {
    if (visited[x][y]) return;
    visited[x][y] = true;
    visitedCoords[[x, y]] = true;
    if (swamp[x][y] > h) cnt++;

    // 상하좌우 탐색
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (
        nx < N &&
        ny < N &&
        nx >= 0 &&
        ny >= 0 &&
        !visited[nx][ny] &&
        swamp[nx][ny] > h
      ) {
        dfs(nx, ny, h);
      }
    }

    return cnt;
  }

  const safeZone = [];
  const visitedCoords = {};

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (swamp[i][j] > height && !visitedCoords[[i, j]]) {
        safeZone.push(dfs(i, j, height));
        cnt = 0;
      }
    }
  }

  return safeZone.length;
}

const answer = [];
for (let i = 0; i < maxHeight; i++) {
  answer.push(solution(i));
}
console.log(Math.max(...answer));
