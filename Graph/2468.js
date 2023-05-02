// 안전영역 - dfs
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((el) => el.split(" ").map(Number));

let max = 0;

// 최대 높이 구하기
arr.forEach((row) => {
  row.forEach((el) => {
    max = Math.max(max, el);
  });
});

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

// 주어진 높이에 해당하는 안전영역의 크기를 리턴하는 함수
function solution(height) {
  let cnt = 0;
  const visited = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(false)
  );

  function dfs(x, y, h) {
    if (visited[x][y]) return;
    visited[x][y] = true;
    visitedCoords[[x, y]] = true;
    if (arr[x][y] > h) cnt++;

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx >= N || ny >= N || nx < 0 || ny < 0) continue;
      if (!visited[nx][ny] && arr[nx][ny] > h) dfs(nx, ny, h);
    }

    return cnt;
  }

  const safeZone = [];
  const visitedCoords = {};

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][j] > height && !visitedCoords[[i, j]]) {
        safeZone.push(dfs(i, j, height));
        cnt = 0;
      }
    }
  }

  return safeZone.length;
}

let answer = 0;

// 최솟값에서 시작해 최댓값까지 비를 내려보기 (for)
for (let i = 0; i < max; i++) {
  if (solution(i) > answer) answer = solution(i);
}

console.log(answer);
