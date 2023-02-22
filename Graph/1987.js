// 알파벳
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [R, C] = input.shift().split(" ").map(Number);
const board = input.map((row) => row.split(""));

let ans = 0;
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const visited = new Array(26).fill(false);

function dfs(x, y, cnt) {
  if (ans < cnt) ans = cnt;

  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];

    if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
      if (!visited[board[nx][ny].charCodeAt() - 65]) {
        visited[board[nx][ny].charCodeAt() - 65] = true;
        dfs(nx, ny, cnt + 1);
        visited[board[nx][ny].charCodeAt() - 65] = false;
      }
    }
  }
}

visited[board[0][0].charCodeAt() - 65] = true;
dfs(0, 0, 1);
console.log(ans);
