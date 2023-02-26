// 아기 상어
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const space = input.map((el) => el.split(" ").map(Number));

let size = 2;
let a, b;
let fish = [];

// 아기상어의 위치 저장, 9를 0으로 초기화
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (space[i][j] === 9) {
      a = i;
      b = j;
      space[i][j] = 0;
    }
  }
}

// 먹을 수 있는 물고기의 위치를 탐색하는 bfs
function bfs(x, y) {
  const visited = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(false)
  );
  const queue = [];
  queue.push([x, y, 0]);
  const offset = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];
  fish = [];

  while (queue.length) {
    for (let i = 0; i < queue.length; i++) {
      let temp = queue.shift();

      for (let j = 0; j < 4; j++) {
        let nx = temp[0] + offset[j][0];
        let ny = temp[1] + offset[j][1];
        let distance = temp[2] + 1;

        if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
          if (!visited[nx][ny] && space[nx][ny] <= size) {
            // 상어가 먹을 수 있는 물고기
            if (size > space[nx][ny] && space[nx][ny] !== 0) {
              // 물고기 배열에 추가
              fish.push({ x: nx, y: ny, distance });
            }
            // 방문처리하고 큐에 추가
            visited[nx][ny] = true;
            queue.push([nx, ny, distance]);
          }
        }
      }
    }
  }
}

bfs(a, b);

let ate = 0;
let sec = 0;

while (fish.length) {
  if (fish.length === 1) {
    // 잡아먹고 위치 저장
    a = fish[0].x;
    b = fish[0].y;
    space[a][b] = 0;
    ate += 1;
    if (size === ate) {
      size += 1;
      ate = 0;
    }
    sec += fish[0].distance;
    fish.shift();
    bfs(a, b);
  } else if (fish.length >= 2) {
    // fish 배열을 거리순으로 정렬
    fish.sort((a, b) => {
      let A = a.distance;
      let B = b.distance;
      if (A < B) return -1;
      else if (A > B) return 1;
      else {
        A = a.x;
        B = b.x;
        if (A < B) return -1;
        else if (A > B) return 1;
        else {
          A = a.y;
          B = b.y;
          if (A < B) return -1;
          else if (A > B) return 1;
          else return 0;
        }
      }
    });
    a = fish[0].x;
    b = fish[0].y;
    space[a][b] = 0;
    ate += 1;
    // 사이즈 업데이트
    if (size === ate) {
      size += 1;
      ate = 0;
    }
    sec += fish[0].distance;
    fish.shift();
    bfs(a, b);
  }
}

if (fish.length === 0) console.log(sec);
