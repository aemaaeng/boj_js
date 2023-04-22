// 미로 탐색
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const maze = input.slice(1).map((el) => el.split("").map(Number));

function bfs(x, y) {
  const queue = [[x, y]];
  const result = [];
  const visited = {};
  visited[[x, y]] = 1;
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  while (queue.length) {
    let coord = queue.shift();
    result.push(coord);
    for (let i = 0; i < 4; i++) {
      const nx = coord[0] + dx[i];
      const ny = coord[1] + dy[i];

      // 정해진 범위에 벗어나는지 확인하기
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;

      if (!visited[[nx, ny]] && maze[nx][ny] === 1) {
        // 방문하지 않은 곳이고 1이면 queue에 넣기
        visited[[nx, ny]] = visited[coord] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  return visited[[N - 1, M - 1]];
}

console.log(bfs(0, 0));
