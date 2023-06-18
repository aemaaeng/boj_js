// 양 구출작전
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const islands = input.map((el) => el.split(" "));

const info = [[], [0, 0]];
const tree = Array.from(new Array(N + 1), () => new Array().fill([]));

islands.forEach((el, idx) => {
  const [t, a, p] = el;
  info.push([t, Number(a)]);
  tree[Number(p)].push(idx + 2);
});

function dfs(v) {
  let cnt = 0;

  tree[v].forEach((el) => {
    cnt += dfs(el);
  });

  if (info[v][0] === "S") {
    cnt += Number(info[v][1]);
  } else if (info[v][0] === "W") {
    cnt -= Number(info[v][1]);
    if (cnt < 0) cnt = 0;
  }

  return cnt;
}

console.log(dfs(1));
