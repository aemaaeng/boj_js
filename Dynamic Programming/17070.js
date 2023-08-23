// 파이프 옮기기 1
// 참고: https://velog.io/@eunseokim/BOJ-17070%EB%B2%88-%ED%8C%8C%EC%9D%B4%ED%94%84-%EC%98%AE%EA%B8%B0%EA%B8%B0-1-dp-%ED%92%80%EC%9D%B4-python
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const board = input.map((el) => el.split(" ").map(Number));

// 벽 = 1, 빈 칸 = 0
const D = Array.from(new Array(3), () =>
  Array.from(new Array(N), () => new Array(N).fill(0))
);

// 현재 칸, 현재 칸의 위쪽, 왼쪽도 빈 칸이라면 대각선 설치 가능
// 현재 칸의 가로 파이프 개수 = 왼쪽 칸의 가로 파이프의 개수 + 왼쪽 칸의 대각선 파이프 개수
// 현재 칸의 세로 파이프 개수 = 위쪽 칸의 세로 파이프의 개수 + 위쪽 칸의 대각선 파이프 개수
// 현재 칸의 대각선 파이프 개수 = 대각선 위 칸의 가로 파이프 개수 + 대각선 위 칸의 세로 파이프 개수 + 대각선 위 칸의 대각선 파이프 개수

D[0][0][1] = 1;
for (let i = 2; i < N; i++) {
  if (board[0][i] === 0) D[0][0][i] = D[0][0][i - 1];
}

// tabulation
for (let r = 1; r < N; r++) {
  for (let c = 1; c < N; c++) {
    // 대각선 파이프
    if (board[r][c] === 0 && board[r][c - 1] === 0 && board[r - 1][c] === 0) {
      D[1][r][c] = D[0][r - 1][c - 1] + D[1][r - 1][c - 1] + D[2][r - 1][c - 1];
    }

    // 가로, 세로 파이프
    if (board[r][c] === 0) {
      D[0][r][c] = D[0][r][c - 1] + D[1][r][c - 1];
      D[2][r][c] = D[1][r - 1][c] + D[2][r - 1][c];
    }
  }
}

let sum = 0;
for (let i = 0; i < 3; i++) {
  sum += D[i][N - 1][N - 1];
}

console.log(sum);
