// 국영수
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const scores = input.map((el) =>
  el.split(" ").map((v, idx) => {
    if (idx > 0) v = Number(v);
    return v;
  })
);

let names = [];

function sortAlphabetically(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

scores.sort((a, b) => {
  if (a[1] === b[1]) {
    if (a[2] === b[2]) {
      if (a[3] === b[3]) {
        return sortAlphabetically(a[0], b[0]);
      }
      return b[3] - a[3];
    }
    return a[2] - b[2];
  }
  return b[1] - a[1];
});

scores.forEach((el) => {
  names.push(el[0]);
});

console.log(names.join("\n"));
