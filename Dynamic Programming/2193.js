// 이친수
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
const N = Number(fs.readFileSync(filePath).toString().trim());

// D[i] = i자리 이친수의 개수
const D = new Array(N + 1).fill(0);
D[0] = 0;
D[1] = 1;
D[2] = 1;

for (let i = 3; i <= N; i++) {
  D[i] = BigInt(D[i - 1]) + BigInt(D[i - 2]);
}

console.log(String(D[N]));

// 타뷸레이션을 해보면 피보나치 형식으로 개수가 증가하는 것을 알 수 있다.
// 1자리 - 1
// 2자리 - 10
// 3자리 - 100, 101
// 4자리 - 1000, 1001, 1010
// 5자리 - 10000, 10001, 10010, 10101, 10100
// 개수가 기하급수적으로 커지기 때문에 BigInt 숫자형을 활용한다.
