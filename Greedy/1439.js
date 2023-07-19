// 문자열 뒤집기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let S = fs.readFileSync(filePath).toString().trim();

let zeroCnt = 0;
let oneCnt = 0;

S[0] === "1" ? (zeroCnt += 1) : (oneCnt += 1);

// 원본 문자열에서 인접한 두 수가 서로 다른 경우를 센다
for (let i = 0; i < S.length - 1; i++) {
  if (S[i] !== S[i + 1]) {
    if (S[i + 1] === "1") {
      zeroCnt += 1; // 다음 원소가 1이면 0으로 바꿔야하니까 zeroCnt를 더한다
    } else {
      oneCnt += 1;
    }
  }
}

// zeroCnt, oneCnt 중 더 작은 걸 출력한다 <- 아하!
console.log(Math.min(zeroCnt, oneCnt));
