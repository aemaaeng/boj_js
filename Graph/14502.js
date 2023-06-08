// 연구소
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const field = input.map((el) => el.split(" ").map(Number));

let answer = 0;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(arr) {
  let cnt = 0;
  const queue = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 2) queue.push([i, j]);
    }
  }

  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (arr[nx][ny] === 0) {
        arr[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 0) cnt += 1;
    }
  }

  return cnt;
}

// 벽 세우는 백트래킹
function backtracking(cnt) {
  if (cnt === 3) {
    // bfs 실행 후 값 업데이트
    let copied = field.map((el) => [...el]);
    let res = bfs(copied);

    answer = Math.max(answer, res);
    return;
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (field[i][j] === 0) {
        field[i][j] = 1;
        backtracking(cnt + 1);
        field[i][j] = 0;
      }
    }
  }
}

backtracking(0);
console.log(answer);
