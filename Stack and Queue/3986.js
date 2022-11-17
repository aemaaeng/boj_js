// 좋은 단어
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const words = input.slice(1);
let cnt = 0;

function goodWord(word) {
  let stack = [];

  for (let i = 0; i < word.length; i++) {
    if (i === 0 || stack[stack.length - 1] !== word[i]) {
      stack.push(word[i]);
      continue;
    }
    if (stack[stack.length - 1] === word[i]) {
      stack.pop();
    }
  }

  return stack.length === 0;
}

for (let word of words) {
  if (goodWord(word)) {
    cnt += 1;
  }
}

console.log(cnt);
