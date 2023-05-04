// 알파벳
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [R, C] = input[0].split(" ").map(Number);
const board = input.slice(1).map((el) => el.split(""));

const alpha = new Array(26).fill(false);

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
let max = 0;

// dfs
function dfs(x, y, cnt) {
  if (max < cnt) max = cnt;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
    if (!alpha[board[nx][ny].charCodeAt() - 65]) {
      alpha[board[nx][ny].charCodeAt() - 65] = true;
      dfs(nx, ny, cnt + 1);
      alpha[board[nx][ny].charCodeAt() - 65] = false;
    }
  }
}

alpha[board[0][0].charCodeAt() - 65] = true;
dfs(0, 0, 1);
console.log(max);
