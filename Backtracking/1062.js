// 가르침
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, K] = input.shift().split(" ").map(Number);
K -= 5;

const alphabet = "bdefghjklmopqrsuvwxyz";
const check = { a: 1, c: 1, i: 1, n: 1, t: 1 };
let max = 0;

for (let i = 0; i < N; i++) {
  input[i] = new Set(input[i].slice(4, -4));
}

function backtracking(start, end) {
  if (end === 0) {
    let canRead = 0;
    // input 배열을 순회하며 읽을 수 있는 단어가 몇 개인지 체크한다
    for (let word of input) {
      let flag = true;
      for (let letter of word) {
        if (!check[letter]) {
          flag = false;
          break;
        }
      }
      if (flag) canRead += 1;
    }
    max = Math.max(max, canRead);
    return;
  }

  for (let i = start; i < alphabet.length - end + 1; i++) {
    check[alphabet[i]] = 1;
    backtracking(i + 1, end - 1);
    check[alphabet[i]] = 0;
  }
}

if (K < 0) {
  console.log(0);
} else if (K === 21) {
  console.log(N);
} else {
  backtracking(0, K);
  console.log(max);
}
