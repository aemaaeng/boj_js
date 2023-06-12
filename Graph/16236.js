const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const space = input.map((el) => el.split(" ").map(Number));

const sharkPos = [];
let size = 2;

// 아기상어의 좌표 저장하기, 9를 0으로 바꾸기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (space[i][j] === 9) {
      space[i][j] = 0;
      sharkPos.push(i);
      sharkPos.push(j);
    }
  }
}

// 상, 좌, 우, 하
const dx = [-1, 0, 0, 1];
const dy = [0, -1, 1, 0];

// 먹을 수 있는 물고기들을 저장하는 배열
let fish = [];

function bfs(x, y) {
  const visited = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(false)
  );
  const queue = [[x, y, 0]];
  fish = [];

  while (queue.length) {
    const [a, b, d] = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nx = a + dx[i];
      let ny = b + dy[i];
      let distance = d + 1;

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (space[nx][ny] <= size && !visited[nx][ny]) {
        // 사이즈가 작으면 잡아먹는다
        if (space[nx][ny] < size && space[nx][ny] !== 0) {
          fish.push([nx, ny, distance]);
        }
        visited[nx][ny] = true;
        // console.log(nx, ny, distance);
        queue.push([nx, ny, distance]);
      }
    }
  }
}

const [sharkPosX, sharkPosY] = sharkPos;
bfs(sharkPosX, sharkPosY);

let ate = 0;
let sec = 0;

// 잡아먹을 수 있는 물고기가 하나일 때
// 잡아먹을 수 있는 물고기가 여러 마리일 때 나눠서
while (fish.length) {
  if (fish.length === 1) {
    const [x, y, distance] = fish.shift();
    space[x][y] = 0;
    ate += 1;
    if (ate === size) {
      size += 1;
      ate = 0;
    }
    sec += distance;
    bfs(x, y);
  } else if (fish.length >= 2) {
    fish.sort((a, b) => {
      let A = a[2];
      let B = b[2];
      if (A < B) return -1;
      else if (A > B) return 1;
      else {
        // 거리가 같으면 x축끼리 비교 시작 (위쪽 우선)
        // 위에 있는 물고기 먼저
        A = a[0];
        B = b[0];
        if (A < B) return -1;
        else if (A > B) return 1;
        else {
          // 그래도 같으면 y축끼리 비교 (왼쪽 우선)
          A = a[1];
          B = b[1];
          if (A < B) return -1;
          else if (A > B) return 1;
          else return 0;
        }
      }
    });
    const [x, y, distance] = fish.shift();
    space[x][y] = 0;
    ate += 1;
    if (size === ate) {
      size += 1;
      ate = 0;
    }
    sec += distance;
    bfs(x, y);
  }
}

if (fish.length === 0) console.log(sec);
