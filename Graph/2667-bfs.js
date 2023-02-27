// 단지번호 붙이기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 1 = 집이 있는 곳, 0 = 집이 없는 곳
// 단지별 번호 붙이기, 각 단지에 속하는 집의 수를 오름차순으로 정렬하기
const N = Number(input.shift());
const map = input.map((el) => el.split("").map(Number));

// 단지 수, 단지 수를 담는 배열
const answer = [];
let cnt = 1;

// 방문 여부 확인
const visited = Array.from(new Array(N + 1), () =>
  new Array(N + 1).fill(false)
);

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

// 단지 수를 세는 bfs
function bfs(x, y) {
  const queue = [[x, y]];
  visited[x][y] = true;
  visitedCoords[[x, y]] = true;

  while (queue.length) {
    let coord = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nx = coord[0] + dx[i];
      let ny = coord[1] + dy[i];

      // 범위를 벗어나지 않고 방문하지 않았으며 1이라면 단지 수에 1 더하기
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < N &&
        !visited[nx][ny] &&
        map[nx][ny] === 1
      ) {
        queue.push([nx, ny]);
        visited[nx][ny] = true;
        visitedCoords[[nx, ny]] = true;
        cnt++;
      }
    }
  }

  return cnt;
}

// 이중 반복문으로 bfs 돌리기 + answer 배열에 push
const visitedCoords = {};
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visitedCoords[[i, j]] && map[i][j] === 1) {
      answer.push(bfs(i, j));
      cnt = 1;
    }
  }
}

// 답 출력
console.log(answer.length);
answer.sort((a, b) => a - b);
console.log(answer.join("\n"));
