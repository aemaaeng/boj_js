// 연구소
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((el) => el.split(" ").map(Number));

let answer = 0;

function bfs(arr) {
  let cnt = 0;
  let queue = [];
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 2) queue.push([i, j]);
    }
  }

  // 바이러스 퍼트리기
  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < N && ny < M && arr[nx][ny] === 0) {
        arr[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }

  // 안전영역 세기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 0) cnt++;
    }
  }

  return cnt;
}

function backtracking(cnt) {
  if (cnt === 3) {
    let copied = map.map((el) => [...el]);
    let safeZone = bfs(copied);

    answer = Math.max(safeZone, answer);
    return;
  }

  // 벽 세우기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0) {
        map[i][j] = 1;
        backtracking(cnt + 1);
        map[i][j] = 0;
      }
    }
  }
}

backtracking(0);
console.log(answer);
