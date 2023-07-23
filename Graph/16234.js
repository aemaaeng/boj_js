// 인구 이동
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, L, R] = input.shift().split(" ").map(Number);
const field = input.map((el) => el.split(" ").map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(a, b, visited) {
  const queue = [[a, b]];
  const united = [[a, b]];
  visited[a][b] = true;
  let sum = field[a][b];

  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N || visited[nx][ny]) continue;
      if (
        Math.abs(field[nx][ny] - field[x][y]) >= L &&
        Math.abs(field[nx][ny] - field[x][y]) <= R &&
        !visited[nx][ny]
      ) {
        queue.push([nx, ny]);
        visited[nx][ny] = true;
        sum += field[nx][ny];
        united.push([nx, ny]);
      }
    }
  }
  for (const el of united) {
    const [i, j] = el;
    field[i][j] = Math.floor(sum / united.length);
  }
  return united.length === 1 ? 0 : 1;
}

let total_cnt = 0;
let flag = [];

while (true) {
  const visited = Array.from(new Array(N), () => new Array(N).fill(false));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j] === false) {
        flag.push(bfs(i, j, visited));
      }
    }
  }
  if (!flag.filter((el) => el === 1).length) break;
  flag = [];
  total_cnt += 1;
}
console.log(total_cnt);
