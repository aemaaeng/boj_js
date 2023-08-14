// 미세먼지 안녕!
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [R, C, T] = input.shift().split(" ").map(Number);
let room = input.map((el) => el.split(" ").map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const purifier = [];

let obj = {};

for (let i = 0; i < R; i++) {
  if (room[i][0] === -1) {
    purifier.push(i);
    purifier.push(i + 1);
    break;
  }
}

function spreadDust(x, y) {
  let cur = room[x][y];
  let spread = Math.floor(cur / 5);
  let cnt = 0;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || ny < 0 || nx >= R || ny >= C || room[nx][ny] === -1) continue;
    if (!obj[spread]) obj[spread] = [];
    obj[spread].push([nx, ny]);
    cnt += 1;
  }
  // 현재 칸 업데이트
  room[x][y] = cur - spread * cnt;
}

function rotateAntiClockwise(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // 맨 앞쪽 (열)
  for (let i = rows - 2; i > 0; i--) {
    matrix[i][0] = matrix[i - 1][0];
  }

  // 맨 윗줄
  for (let i = 1; i < cols; i++) {
    matrix[0][i - 1] = matrix[0][i];
  }

  // 맨 끝쪽 (열)
  for (let i = 0; i < rows - 1; i++) {
    matrix[i][cols - 1] = matrix[i + 1][cols - 1];
  }

  // 맨 아랫줄
  for (let i = cols - 1; i > 1; i--) {
    matrix[rows - 1][i] = matrix[rows - 1][i - 1];
  }

  matrix[rows - 1][1] = 0;

  return matrix;
}

function rotateClockwise(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // 맨 앞줄 (열)
  for (let i = 1; i < rows - 1; i++) {
    matrix[i][0] = matrix[i + 1][0];
  }

  // 맨 아랫줄
  for (let i = 1; i < cols; i++) {
    matrix[rows - 1][i - 1] = matrix[rows - 1][i];
  }

  // 맨 끝줄 (열)
  for (let i = rows - 1; i >= 1; i--) {
    matrix[i][cols - 1] = matrix[i - 1][cols - 1];
  }

  // 맨 윗줄
  for (let i = cols - 1; i > 1; i--) {
    matrix[0][i] = matrix[0][i - 1];
  }

  matrix[0][1] = 0;

  return matrix;
}

let sec = 0;

while (sec < T) {
  // 1. 먼지 퍼트리기
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (room[i][j] !== -1 && room[i][j] !== 0) {
        spreadDust(i, j);
      }
    }
  }

  for (const key in obj) {
    for (const [x, y] of obj[key]) {
      room[x][y] += Number(key);
    }
  }

  // 2. 공기청정기 작동시키기
  const rotatedTop = rotateAntiClockwise(room.slice(0, purifier[1]));
  const rotatedBottom = rotateClockwise(room.slice(purifier[1], R));

  // 3. 회전한 배열을 새로 할당시키기
  room = [...rotatedTop, ...rotatedBottom];

  // 1초 더하기
  sec += 1;
  obj = {};
}

let result = 0;

room.forEach((row) => {
  result += row.reduce((acc, cur) => acc + cur, 0);
});

console.log(result + 2);

// 중요한 포인트
// 먼지를 동시다발적으로 퍼트리는 것
// 시계방향, 반시계방향 테두리 회전 알고리즘 숙지
