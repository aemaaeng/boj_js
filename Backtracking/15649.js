// N과 M
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split(" ").map(Number);

function solution(input) {
  const N = input[0];
  const M = input[1];
  let result = "";
  const output = [];
  const isused = new Array(M).fill(false);

  function recursion(k) {
    if (k === M) {
      result += `${output.join(" ")}\n`;
      return;
    }

    for (let i = 0; i < N; i++) {
      if (isused[i] === true) continue;
      isused[i] = true;
      output.push(i + 1);
      recursion(k + 1);
      output.pop();
      isused[i] = false;
    }
  }

  recursion(0);
  return result;
}

console.log(solution(input));
