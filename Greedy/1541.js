// 잃어버린 괄호
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim();

// idea: +를 먼저 계산하고 -는 나중에 계산한다.

function computeMinimum(input) {
  // 우선 -를 기준으로 나누고
  // +로 연결된 숫자들은 다 더한다
  const numbers = input.split("-").map((str) => {
    return str
      .split("+")
      .map(Number)
      .reduce((acc, cur) => acc + cur, 0);
  });

  let result = numbers[0] * 2 - numbers.reduce((acc, cur) => acc + cur, 0);

  return result;
}

console.log(computeMinimum(input));

// result 계산 방식
// numbers[0] + numbers[0] - (numbers[0] + numbers[1] + numbers[2])
// numbers[0] + numbers[0] - numbers[0] - numbers[1] - numbers[2]
// numbers[0] - numbers[1] - numbers[2]

// Array.prototype.split()
// separator가 생략되거나 str에 등장하지 않을 경우, 반환되는 배열은 원본 문자열을 유일한 원소로 가집니다. (출처: mdn)
