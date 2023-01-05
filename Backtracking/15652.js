// N과 M (4)
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split(" ").map(Number);

const N = input[0];
const M = input[1];
let result = "";
const output = [];
const isused = new Array(M).fill(false);

function recursion(idx, k) {
  if (k === M) {
    result += `${output.join(" ")}\n`;
    return;
  }

  for (let i = idx; i < N; i++) {
    isused[i] = true;
    output.push(i + 1);
    recursion(i, k + 1);
    output.pop();
    isused[i] = false;
  }
}

recursion(0, 0);
console.log(result);
