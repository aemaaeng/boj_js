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

let visitedCoords = {};
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// 섬별 라벨 붙이기
function label_island(a, b, l) {
  const queue = [[a, b]];
  visitedCoords[[a, b]] = true;
  field[a][b] = l;

  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

      if (!visitedCoords[[nx, ny]] && field[nx][ny] === -1) {
        visitedCoords[[nx, ny]] = true;
        field[nx][ny] = l;
        queue.push([nx, ny]);
      }
    }
  }
}

// 다리 만드는 bfs - 매개변수 num
// 같은 대륙에 있는 모든 땅을 queue에 넣고 시작한다.
function bfs(num) {
  let res = 0;
  const queue = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (field[i][j] === num) {
        visitedCoords[[i, j]] = true;
        queue.push([i, j]);
      }
    }
  }

  // 서로 다른 곳의 다리를 연결한다
  while (queue.length) {
    let S = queue.length;
    for (let i = 0; i < S; i++) {
      const [x, y] = queue.shift();

      for (let j = 0; j < 4; j++) {
        let nx = x + dx[j];
        let ny = y + dy[j];

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

let land_label = 1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]] && field[i][j] !== 0) {
      label_island(i, j, land_label);
      land_label += 1;
    }
  }
}

let answer = Infinity;

// 섬의 개수만큼 다리 만드는 bfs 돌리기
for (let i = 1; i < land_label; i++) {
  answer = Math.min(answer, bfs(i));
  visitedCoords = {};
}

console.log(answer);
