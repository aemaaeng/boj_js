// 최종 순위 - 위상정렬
// 인접행렬 이용
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = Number(input.shift());
const tests = [];
let curIdx = 0;

for (let i = 0; i < T; i++) {
  const numTeams = Number(input[curIdx++]);
  const prevRanks = input[curIdx++].split(" ").map(Number);
  const numPairs = Number(input[curIdx++]);
  const changedPairs = [];

  for (let j = 0; j < numPairs; j++) {
    const [teamA, teamB] = input[curIdx++].split(" ").map(Number);
    changedPairs.push([teamA, teamB]);
  }

  tests.push({ numTeams, prevRanks, numPairs, changedPairs });
}

function topologicalSort(graph, inDegree) {
  const result = [];
  const queue = [];

  for (let i = 0; i < graph.length; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  for (let i = 0; i < graph.length; i++) {
    if (queue.length === 0) return "IMPOSSIBLE";
    if (queue.length > 1) return "?";
    let cur = queue.shift();
    result[i] = cur;
    inDegree[cur]--;

    for (let j = 0; j < graph.length; j++) {
      if (graph[cur][j] === true) inDegree[j]--;
      if (inDegree[j] === 0) queue.push(j);
    }
  }

  return result.map((el) => (el += 1));
}

const results = [];

for (const test of tests) {
  const { numTeams, prevRanks, numPairs, changedPairs } = test;
  const inDegree = new Array(numTeams).fill(0);

  // 그래프를 만든다 (기존 순위 기준, 상대적 변화는 방향 변경)
  const graph = Array.from(new Array(numTeams), () =>
    new Array(numTeams).fill(false)
  );
  for (let i = 0; i < numTeams; i++) {
    for (let j = i + 1; j < numTeams; j++) {
      graph[prevRanks[i] - 1][prevRanks[j] - 1] = true;
      inDegree[prevRanks[j] - 1]++;
    }
  }

  for (let [a, b] of changedPairs) {
    a--;
    b--;
    if (graph[a][b]) {
      graph[a][b] = false;
      graph[b][a] = true;
      inDegree[b]--;
      inDegree[a]++;
    } else {
      graph[b][a] = false;
      graph[a][b] = true;
      inDegree[a]--;
      inDegree[b]++;
    }
  }

  // 위상정렬을 수행한다
  let order = topologicalSort(graph, inDegree);
  typeof order === "string"
    ? results.push(order)
    : results.push(order.join(" "));
}

console.log(results.join("\n"));
