// 소트인사이드
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString();

let arr = input.split("");

arr.sort((a, b) => {
  return b.charCodeAt(0) - a.charCodeAt(0);
});

console.log(arr.join(""));

// 배열의 순서를 뒤집어주는 메소드가 있음 (mutable)
// Array.prototype.reverse()
// 한 줄로 끝낼 수 있다.
// console.log(input.split("").sort().reverse().join(""));
