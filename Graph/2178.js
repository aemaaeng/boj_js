// 미로찾기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const maze = input.slice(1).map((el) => el.split("").map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(x, y) {
  // 주변이 1일 때마다 maze의 그 값을 현재 값에 1을 더한 것으로 update
  // console.log(maze[N - 1][M - 1])
  const queue = [[x, y]];
  while (queue.length) {
    const [cx, cy] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + cx;
      const ny = dy[i] + cy;

      // 범위 벗어나면 제외
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (maze[nx][ny] === 1) {
        queue.push([nx, ny]);
        maze[nx][ny] = maze[cx][cy] + 1;
      }
    }
  }

  return maze[N - 1][M - 1];
}

console.log(bfs(0, 0));
