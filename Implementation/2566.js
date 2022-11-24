// 최댓값
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.split(" ").map(Number));

// 2차원 배열을 1차원으로 펼쳐서 최댓값 먼저 찾고
// 원본 배열에서 각 요소 배열이 그 최댓값을 includes하는지 확인
// 포함한다면 그 인덱스를 저장해놓고 그 배열에서 최댓값의 인덱스를 정답 배열에 저장하기

let flatten = input.reduce((acc, cur) => {
  return acc.concat(cur);
});

const max = Math.max(...flatten);
// 여기에 이제 인덱스 하나씩 추가
let answer = [max];

for (let i = 0; i < input.length; i++) {
  if (input[i].includes(max)) {
    let indicies = `${i + 1} ${input[i].indexOf(max) + 1}`;
    answer.push(indicies);
    break;
  }
}

console.log(answer.join("\n"));
