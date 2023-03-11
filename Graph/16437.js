// 양 구출 작전
// 참고:  https://kagrin97-blog.vercel.app/algorithm/16437-%EC%96%91%20%EA%B5%AC%EC%B6%9C%20%EC%9E%91%EC%A0%84
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = Number(input.shift());
const islands = input.map((el) => el.split(" "));

// 양의 수를 리턴하는 dfs
function dfs(curIdx) {
  let sheepCnt = 0;
  for (let i of tree[curIdx]) {
    sheepCnt += dfs(i);
  }

  if (islandInfo[curIdx][0] === "W") {
    sheepCnt -= islandInfo[curIdx][1];
    if (sheepCnt < 0) sheepCnt = 0;
  } else {
    sheepCnt += islandInfo[curIdx][1];
  }

  return sheepCnt;
}

// 실제 섬 번호와 맞추기 위한 더미 데이터 두 개를 미리 넣어놓는다.
let islandInfo = [[], [0, 0]];
// 섬 간의 연결 정보를 담을 tree 배열
let tree = Array.from(new Array(N + 1), () => new Array().fill([]));

islands.forEach((island, idx) => {
  const [t, a, p] = island;
  islandInfo.push([t, Number(a)]);
  tree[Number(p)].push(idx + 2);
});

// 1번 섬부터 dfs 시작
console.log(dfs(1));
