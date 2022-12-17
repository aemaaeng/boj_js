// 유레카 이론
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);

const N = input[0];
const num = input.slice(1);
const answer = [];

// 삼각수 배열 만들기
let triangular = [];
let i = 1;
let t = 0;
while (t < 1000) {
  t = (i * (i + 1)) / 2;
  triangular.push(t);
  i++;
}

// 그 여부를 판별하는 함수 만들기?
const threeNums = (n) => {
  // 한 원소가 여러 번 나와도 됨
  for (let i = 0; i < triangular.length; i++) {
    for (let j = 0; j < triangular.length; j++) {
      for (let k = 0; k < triangular.length; k++) {
        let sum = triangular[i] + triangular[j] + triangular[k];
        if (n === sum) return 1;
      }
    }
  }

  return 0;
};

for (let n of num) {
  answer.push(threeNums(n));
}

console.log(answer.join("\n"));
