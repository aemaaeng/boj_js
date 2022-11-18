// 나는야 포켓몬 마스터 이다솜
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = input[0].split(" ").map(Number)[0];
const M = input[0].split(" ").map(Number)[1];
const pokemons = input.slice(1, -M);
const tests = input.slice(-M);

// 첫째 줄: 도감에 수록된 포켓몬의 수(N), 내가 맞춰야 하는 문제의 수(M)
// 둘째 줄부터 1에서 N까지 들어옴

let pokemonMap = new Map();
for (let i = 0; i < pokemons.length; i++) {
  pokemonMap.set(i + 1, pokemons[i]);
  pokemonMap.set(pokemons[i], i + 1);
}

let answer = [];
for (let test of tests) {
  if (!Number.isNaN(Number(test))) {
    answer.push(pokemonMap.get(Number(test)));
  } else {
    answer.push(pokemonMap.get(test));
  }
}
console.log(answer.join("\n"));
