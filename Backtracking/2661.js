// 좋은 수열
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let N = Number(fs.readFileSync(filePath).toString().trim());

const answer = [];

function isGoodSequence(str) {
  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length + 1; j++) {
      // i부터 j까지의 부분 문자열
      let tmp = str.substring(i, j);
      if (str.startsWith(tmp, j)) return false;
    }
  }
  return true;
}

function backtracking(cnt, sequence) {
  if (cnt === N) {
    let str = sequence.join("");
    if (isGoodSequence(str)) answer.push(Number(str));
    sequence = "";
  } else {
    for (let i = 1; i <= 3; i++) {
      sequence.push(i);
      backtracking(cnt + 1, sequence);
      sequence.pop(i);
    }
  }
}

backtracking(0, []);
console.log(Math.min(...answer));
