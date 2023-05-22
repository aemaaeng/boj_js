// 치즈
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const grid = input.map((el) => el.split(" ").map(Number));

let visitedCoords = {};
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let willMelt = []; // 곧 녹을 치즈 조각을 담은 배열
let answer = 0;
let cnt = 0;

// 치즈의 좌표를 미리 저장해둔 객체
const cheese = {};
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (grid[i][j] === 1) cheese[[i, j]] = true;
  }
}

// 외부 공기와 내부 공기를 분리해서 생각해야 한다
// 외부 공기 = 2, 내부 공기 = 0, 치즈 = 1

// 외부 공기는 전부 2로 바꾸는 bfs
function checkOutside(x, y) {
  const queue = [[x, y]];
  while (queue.length) {
    const [a, b] = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nx = dx[i] + a;
      let ny = dy[i] + b;

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (!visitedCoords[[nx, ny]] && grid[nx][ny] !== 1) {
        visitedCoords[[nx, ny]] = true;
        grid[nx][ny] = 2;
        queue.push([nx, ny]);
      }
    }
  }
}

// 녹을 치즈를 찾는 bfs
// 4변 중 2변 이상 외부 공기와 인접해야 녹는다
function checkCheese(x, y) {
  const queue = [[x, y]];
  visitedCoords[[x, y]] = true;

  while (queue.length) {
    const [a, b] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let nx = dx[i] + a;
      let ny = dy[i] + b;

      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (grid[a][b] === 1 && grid[nx][ny] === 2) cnt += 1;

      if (!visitedCoords[[nx, ny]] && grid[nx][ny] === 1) {
        visitedCoords[[nx, ny]] = true;
        queue.push([nx, ny]);
      }
    }

    if (cnt >= 2) willMelt.push([a, b]);
    cnt = 0;
  }
}

// 치즈를 녹여보는 함수
function melt(arr) {
  for (let i = 0; i < arr.length; i++) {
    let [x, y] = arr[i];
    grid[x][y] = 2;

    delete cheese[`${x},${y}`];
  }
}

while (Object.keys(cheese).length !== 0) {
  checkOutside(0, 0);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!visitedCoords[[i, j]] && grid[i][j] === 1) {
        checkCheese(i, j);
      }
    }
  }

  melt(willMelt);
  answer += 1;

  willMelt = [];
  visitedCoords = {};
}

console.log(answer);
