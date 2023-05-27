// 양 구출작전
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const islands = input.map((el) => el.split(" "));

const islandInfo = [[], [0, 0]]; // 섬에 어떤 동물이 몇 마리 살고 있는지 담은 배열
const tree = Array.from(new Array(N + 1), () => new Array().fill([])); // 각 섬의 관계를 트리 자료구조로 표현

function dfs(x) {
  let cnt = 0;
  // 재귀
  for (let i of tree[x]) {
    cnt += dfs(i);
  }

  // tree에서 dfs를 돌고 s이면 더하고 w이면 뺀다
  if (islandInfo[x][0] === "W") {
    cnt -= islandInfo[x][1];
    if (cnt < 0) cnt = 0;
  } else {
    cnt += islandInfo[x][1];
  }

  return cnt;
}

islands.forEach((el, idx) => {
  const [t, a, p] = el;
  islandInfo.push([t, Number(a)]);
  tree[Number(p)].push(idx + 2);
});

// 뿌리는 1번 섬, 1번 섬을 시작점으로 dfs를 돈다
console.log(dfs(1));
