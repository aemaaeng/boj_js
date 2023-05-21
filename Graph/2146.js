// 다리 만들기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const field = input.map((el) => el.split(" ").map(Number));

// 섬들을 우선 -1로 만든다
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (field[i][j] === 1) field[i][j] = -1;
  }
}

let visitedCoords = {};
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

// 섬별로 구별짓는 번호를 붙인다 (bfs)
function byIsland(a, b, number) {
  const queue = [[a, b]];
  visitedCoords[[a, b]] = true;
  field[a][b] = number;

  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nx = dx[i] + x;
      let ny = dy[i] + y;

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

      // 방문하지 않았고 필드의 숫자가 -1이라면 인자로 들어온 번호를 붙인다
      if (!visitedCoords[[nx, ny]] && field[nx][ny] === -1) {
        visitedCoords[[nx, ny]] = true;
        field[nx][ny] = number;
        // 이 좌표를 queue에 넣어 이 지점부터 주변 땅을 또 탐색하여 번호를 매긴다
        queue.push([nx, ny]);
      }
    }
  }
}

// 다리 만드는 bfs - 다리 개수 리턴
// 인자로 섬의 번호를 받는다
function bridge_bfs(num) {
  let res = 0;
  const queue = [];
  // 같은 섬은 모두 방문처리 후 queue에 넣고 시작한다
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (field[i][j] === num) {
        visitedCoords[[i, j]] = true;
        queue.push([i, j]);
      }
    }
  }

  // 서로 다른 대륙의 다리를 연결해본다
  while (queue.length) {
    let L = queue.length;
    for (let i = 0; i < L; i++) {
      const [x, y] = queue.shift();

      for (let j = 0; j < 4; j++) {
        let nx = dx[j] + x;
        let ny = dy[j] + y;

        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;

        // 바다가 아니고 현재 섬도 아닐 때 -> 다른 섬이므로 다리의 길이 리턴
        if (field[nx][ny] !== 0 && field[nx][ny] !== num) return res;
        else if (field[nx][ny] === 0 && !visitedCoords[[nx, ny]]) {
          visitedCoords[[nx, ny]] = true;
          queue.push([nx, ny]);
        }
      }
    }
    res += 1;
  }
}

// byIsland 함수를 실행해 섬에 번호를 매긴다
let island_number = 1;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]] && field[i][j] !== 0) {
      byIsland(i, j, island_number);
      island_number += 1;
    }
  }
}

// bfs를 실행한다
let answer = Infinity;
for (let i = 1; i < island_number; i++) {
  answer = Math.min(answer, bridge_bfs(i));
  visitedCoords = {};
}

console.log(answer);
