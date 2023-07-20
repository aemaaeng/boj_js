// 경쟁적 전염
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const [S, X, Y] = input.pop().split(" ").map(Number);
const examiner = input.map((el) => el.split(" ").map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(arr) {
  const queue = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 바이러스 종류, 시간, 위치X, 위치Y
      if (arr[i][j] !== 0) queue.push([arr[i][j], 0, i, j]);
    }
  }

  queue.sort((a, b) => a[0] - b[0]);

  while (queue.length) {
    let [virus, sec, x, y] = queue.shift();
    if (sec === S) break;
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      else if (arr[nx][ny] === 0) {
        arr[nx][ny] = virus;
        queue.push([virus, sec + 1, nx, ny]);
      }
    }
  }
}

bfs(examiner);
console.log(examiner[X - 1][Y - 1]);
