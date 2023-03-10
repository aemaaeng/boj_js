// 치즈
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const grid = input.map((el) => el.split(" ").map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let hour = 0;
// 외부 공기 = 2, 내부 공기 = 0, 치즈 = 1

// 사라질 치즈 조각의 좌표를 저장하는 배열
let willMelt = [];
let visitedCoords = {};
let cnt = 0;

// 처음에 미리 1의 좌표를 저장해두기 -> 치즈가 녹을 때마다 하나씩 지우기
let obj = {};
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (grid[i][j] === 1) obj[[i, j]] = true;
  }
}

// ** 외부 공간은 전부 2로 바꾸는 bfs
function checkOutside(x, y) {
  const queue = [[x, y]];
  while (queue.length) {
    const [a, b] = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nx = a + dx[i];
      let ny = b + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (!visitedCoords[[nx, ny]] && grid[nx][ny] !== 1) {
        visitedCoords[[nx, ny]] = true;
        grid[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }
}

// 곧 사라질 치즈 조각을 찾는 bfs
function bfs(x, y) {
  const queue = [[x, y]];
  visitedCoords[[x, y]] = true;

  while (queue.length) {
    const [a, b] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let nx = a + dx[i];
      let ny = b + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (grid[a][b] === 1 && grid[nx][ny] === 2) {
        cnt += 1;
      }

      if (!visitedCoords[[nx, ny]] && grid[nx][ny] === 1) {
        queue.push([nx, ny]);
        visitedCoords[[nx, ny]] = true;
      }
    }

    // 주변의 2곳 이상이 0이라면 사라질 치즈 조각임.
    if (cnt >= 2) willMelt.push([a, b]);
    cnt = 0;
  }
}

function meltCheese(arr) {
  for (let i = 0; i < arr.length; i++) {
    let [x, y] = arr[i];
    grid[x][y] = 2;

    delete obj[`${x},${y}`];
  }
}

while (Object.keys(obj).length !== 0) {
  // 외부 공기 찾기
  checkOutside(0, 0);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!visitedCoords[[i, j]] && grid[i][j] === 1) {
        bfs(i, j);
      }
    }
  }

  meltCheese(willMelt);
  hour += 1;

  // 초기화
  willMelt = [];
  visitedCoords = {};
}

console.log(hour);
