// 감소하는 수
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let N = Number(fs.readFileSync(filePath).toString().trim());

function solution() {
  if (N < 10) return N;
  if (N >= 1023) return -1;

  const decreases = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let target = 0;

  while (true) {
    let before = decreases[target] % 10;
    for (let i = 0; i < before; i++) {
      decreases.push(decreases[target] * 10 + i);

      if (N + 1 === decreases.length) {
        return decreases[N];
      }
    }
    target += 1;
  }
}

console.log(solution());
