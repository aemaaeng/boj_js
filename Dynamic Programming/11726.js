// 2 x n 타일링
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim();

const n = Number(input);

function solution(n) {
  let cache = [0, 1, 2];

  function recur(size) {
    if (cache[size] !== undefined) return cache[size];
    if (size <= 2) return cache[n];
    cache[size] = (recur(size - 1) + recur(size - 2)) % 10007;
    return cache[size];
  }

  return recur(n);
}

console.log(solution(n));

// 오버플로우 방지를 위해 10007로 나눠주고 있음.
// 출력할 때 나누는 것이 아니라 중간중간 나눠주는 게 포인트이다!
// 이거 때문에 계속 틀렸다고 나왔음
// 참고: https://www.acmicpc.net/board/view/91259
