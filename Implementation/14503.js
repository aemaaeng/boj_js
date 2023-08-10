// 로봇 청소기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
let [x, y, d] = input.shift().split(" ").map(Number);
const map = input.map((el) => el.split(" ").map(Number));

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function anti_clockwise() {
  d -= 1;
  if (d === -1) d = 3;
}

let cnt = 1;
let turn_cnt = 0;

const visited = Array.from(new Array(N), () => new Array(M).fill(false));
visited[x][y] = true;

while (true) {
  anti_clockwise();
  let nx = x + directions[d][0];
  let ny = y + directions[d][1];

  if (map[nx][ny] === 0 && !visited[nx][ny]) {
    visited[nx][ny] = true;
    x = nx;
    y = ny;
    cnt += 1;
    turn_cnt = 0;
  } else {
    turn_cnt += 1;
  }

  if (turn_cnt === 4) {
    nx = x - directions[d][0];
    ny = y - directions[d][1];

    if (map[nx][ny] === 0) {
      x = nx;
      y = ny;
    } else {
      break;
    }

    turn_cnt = 0;
  }
}

console.log(cnt);
