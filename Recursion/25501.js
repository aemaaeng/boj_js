const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().split("\n");

const T = Number(input[0]);

// isPalindrome 함수로 팰린드롬 여부 판단.
// recursion 함수의 호출 횟수 구하기
// 왼쪽 끝과 오른쪽 끝부터 하나씩 비교하는 재귀함수

function recursion(str, l, r, cnt) {
  if (l >= r) {
    return `1 ${cnt}`;
  } else if (str[l] != str[r]) {
    return `0 ${cnt}`;
  } else {
    return recursion(str, l + 1, r - 1, cnt + 1);
  }
}

function isPalindrome(str) {
  return recursion(str, 0, str.length - 1, 1);
}

let answer = [];
for (let i = 1; i < T + 1; i++) {
  answer.push(`${isPalindrome(input[i])}`);
}

console.log(answer.join("\n"));
