// 괄호의 값
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let str = fs.readFileSync(filePath).toString().trim();

const stack = [];

let temp = 1;
let answer = 0;

for (let i = 0; i < str.length; i++) {
  if (str[i] === "(") {
    temp = temp * 2;
    stack.push(str[i]);
  } else if (str[i] === "[") {
    temp = temp * 3;
    stack.push(str[i]);
  } else if (str[i] === ")") {
    if (stack.length === 0 || stack[stack.length - 1] !== "(") {
      answer = 0;
      break;
    }
    // 가장 안쪽 괄호인 경우
    if (str[i - 1] === "(") {
      answer = answer + temp;
      temp = temp / 2;
      stack.pop();
    } else {
      temp = temp / 2;
      stack.pop();
    }
  } else if (str[i] === "]") {
    if (stack.length === 0 || stack[stack.length - 1] !== "[") {
      answer = 0;
      break;
    }
    // 가장 안쪽 괄호인 경우
    if (str[i - 1] === "[") {
      answer = answer + temp;
      temp = temp / 3;
      stack.pop();
    } else {
      temp = temp / 3;
      stack.pop();
    }
  }
}

if (stack.length !== 0) answer = 0;
console.log(answer);
