// 단지번호 붙이기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

// 1 = 집이 있는 곳, 0 = 집이 없는 곳
// 단지별 번호 붙이기, 각 단지에 속하는 집의 수를 오름차순으로 정렬하기

const N = Number(input.shift());
const map = input.map((el) => el.split("").map(Number));

// 첫 번째 줄: 총 단지 수
// 각 단지 내 집의 수를 오름차순으로 정렬
function bfs(x, y) {
  const queue = [[x, y]];
  const visited = {};
  visited[[x, y]] = 1;
  visitedCoords[[x, y]] = 1;
  let dx = [0, 0, -1, 1];
  let dy = [-1, 1, 0, 0];
  let cnt = 1;

  while (queue.length) {
    for (let i = 0; i < queue.length; i++) {
      let coord = queue.shift();
      for (let j = 0; j < 4; j++) {
        let nx = coord[0] + dx[j];
        let ny = coord[1] + dy[j];

        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < N &&
          ny < N &&
          !visited[[nx, ny]] &&
          map[nx][ny] === 1
        ) {
          visited[[nx, ny]] = 1;
          visitedCoords[[nx, ny]] = 1;
          cnt++;
          queue.push([nx, ny]);
        }
      }
    }
  }
  return cnt;
}

// 이미 방문한 곳을 중복으로 가지 않기 위함
const visitedCoords = {};
const answer = []; // bfs를 수행해 각 단지별 집 수를 담을 배열
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 1 && !visitedCoords[[i, j]]) answer.push(bfs(i, j));
  }
}

console.log(answer.length);
answer.sort((a, b) => a - b);
console.log(answer.join("\n"));
