// 이동하기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const maze = input.slice(1).map((el) => el.split(" ").map(Number));
const D = Array.from(new Array(N), () => new Array(M).fill(0));

// 아래, 오른쪽, 대각선 아래로만 이동 가능
// 위, 왼쪽, 대각선 위 요소들 중 큰 것을 취하며 테이블을 채워나간다
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const top = i > 0 ? D[i - 1][j] : 0;
    const left = j > 0 ? D[i][j - 1] : 0;
    const diag = i > 0 && j > 0 ? D[i - 1][j - 1] : 0;
    D[i][j] = maze[i][j] + Math.max(top, left, diag);
  }
}

// console.log(D);
console.log(D[N - 1][M - 1]);
