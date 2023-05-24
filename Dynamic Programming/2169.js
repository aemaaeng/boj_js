// 로봇 조종하기
// 참고: https://blog.naver.com/occidere/220808155184
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((el) => el.split(" ").map(Number));
const mars = Array.from(new Array(N + 1), () => new Array(M + 1).fill(null));

// 헷갈리니까 1 indexed로 만든다
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    mars[i][j] = arr[i - 1][j - 1];
  }
}

const D = Array.from(new Array(N + 1), () => new Array(M + 1).fill(null));
// 왼쪽에서 오른쪽으로 갈 경우와 오른쪽에서 왼쪽으로 갈 경우를 구별해야 한다
const temp = Array.from(new Array(2), () => new Array(M + 1).fill(null));

D[1][1] = mars[1][1];
// 첫째 줄은 따로 처리한다
for (let i = 2; i <= M; i++) {
  D[1][i] = mars[1][i] + D[1][i - 1];
}

// 둘째 줄부터 temp 배열을 활용해 오->왼 값과 왼->오 값을 비교해 더 큰 것을 D 배열에 담는다
for (let i = 2; i <= N; i++) {
  temp[0][0] = D[i - 1][1];
  for (let j = 1; j <= M; j++) {
    temp[0][j] = Math.max(temp[0][j - 1], D[i - 1][j]) + mars[i][j];
  }
  temp[1][M + 1] = D[i - 1][M];
  for (let j = M; j >= 1; j--) {
    temp[1][j] = Math.max(temp[1][j + 1], D[i - 1][j]) + mars[i][j];
  }
  for (j = 1; j <= M; j++) {
    D[i][j] = Math.max(temp[0][j], temp[1][j]);
  }
}

console.log(D[N][M]);
