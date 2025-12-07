#!/usr/bin/env node
/**
 * tools/game-agent.js
 *
 * Lightweight agent to:
 * - Score playability of puzzles (based on puzzle definitions included in wordgrid.html)
 * - Enumerate simple grid transforms and variants and score them
 * - Search for "secret message" combinations (acrostics etc.) using a local wordlist
 *
 * Usage:
 *   node tools/game-agent.js                   # runs against built-in puzzles
 *   node tools/game-agent.js --wordlist ./words.txt
 *   node tools/game-agent.js --out report.json
 */

const fs = require("fs");
const path = require("path");

const argv = require("minimist")(process.argv.slice(2));

const WORDLIST_PATH = argv.wordlist || null;
const OUT_PATH = argv.out || "tools/agent-report.json";

const puzzles = [
  {
    id: 1,
    title: "Puzzle 1 – Corners fixed",
    target: [
      ["a","l","a","r","m"],
      ["w", null,"d", null,"a"],
      ["a","b","a","c","k"],
      ["i", null,"g", null,"e"],
      ["t","e","e","n","s"]
    ],
    prefilled: [[0,0],[0,4],[4,0],[4,4]]
  },
  {
    id: 2,
    title: "Puzzle 2 – Corners + centre",
    target: [
      ["f","i","s","h","y"],
      ["r", null,"t", null,"o"],
      ["a","b","a","c","k"],
      ["i", null,"i", null,"e"],
      ["l","i","n","e","d"]
    ],
    prefilled: [[0,0],[0,4],[4,0],[4,4],[2,2]]
  },
  {
    id: 3,
    title: "Puzzle 3 – Edge midpoints fixed",
    target: [
      ["s","w","a","m","p"],
      ["l", null,"d", null,"o"],
      ["a","b","a","c","k"],
      ["n", null,"g", null,"e"],
      ["t","h","e","i","r"]
    ],
    prefilled: [[0,2],[2,0],[2,4],[4,2]]
  },
  {
    id: 4,
    title: "Puzzle 4 – Midpoints + centre",
    target: [
      ["p","o","s","e","r"],
      ["l", null,"t", null,"a"],
      ["a","b","a","c","k"],
      ["z", null,"g", null,"e"],
      ["a","h","e","a","d"]
    ],
    prefilled: [[0,2],[2,0],[2,4],[4,2],[2,2]]
  },
  {
    id: 5,
    title: "Puzzle 5 – Centre plus shape",
    target: [
      ["p","o","s","e","r"],
      ["l", null,"t", null,"a"],
      ["a","b","a","c","k"],
      ["z", null,"g", null,"e"],
      ["a","m","e","n","d"]
    ],
    prefilled: [[2,2],[1,2],[2,1],[3,2],[2,3]]
  }
];

function flatten(l) { return Array.prototype.concat.apply([], l); }

function letterCountsFromTarget(target) {
  const counts = {};
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const v = target[r][c];
      if (!v) continue;
      counts[v] = (counts[v] || 0) + 1;
    }
  }
  return counts;
}

function isVowel(ch) { return "aeiou".includes(ch); }

function scorePlayability(puzzle) {
  const target = puzzle.target;
  const counts = letterCountsFromTarget(target);

  const consonantCounts = Object.entries(counts).filter(([k])=>!isVowel(k));
  const repeatedConsonants = consonantCounts.filter(([k,v]) => v > 1);

  const totalTiles = flatten(target).filter(Boolean).length;
  const prefilled = puzzle.prefilled.length;
  const prefillFraction = prefilled / totalTiles;

  const branching = Object.values(counts).reduce((a,b)=>a+b,0);

  const score = 100
    - Math.min(50, (Object.keys(counts).length / totalTiles) * 50)
    - Math.min(25, (1 - (repeatedConsonants.length / Math.max(1, consonantCounts.length))) * 25)
    - Math.min(25, prefillFraction * 25);

  return {
    totalTiles, prefilled, prefillFraction,
    repeatedConsonants,
    uniqueLetters: Object.keys(counts).length,
    counts,
    branchingEstimate: branching,
    score: Math.round(score*100)/100
  };
}

function transforms(target) {
  function rotate90(t) {
    const out = Array.from({length:5}, ()=>Array(5).fill(null));
    for (let r=0;r<5;r++) for (let c=0;c<5;c++) out[c][4-r] = t[r][c];
    return out;
  }
  function rotate180(t){ return rotate90(rotate90(t)); }
  function rotate270(t){ return rotate90(rotate180(t)); }
  function transpose(t) { const out = Array.from({length:5}, ()=>Array(5).fill(null)); for (let r=0;r<5;r++) for (let c=0;c<5;c++) out[c][r] = t[r][c]; return out; }
  function mirrorLR(t) { const out = Array.from({length:5}, ()=>Array(5).fill(null)); for (let r=0;r<5;r++) for (let c=0;c<5;c++) out[r][4-c] = t[r][c]; return out; }
  function mirrorUD(t) { const out = Array.from({length:5}, ()=>Array(5).fill(null)); for (let r=0;r<5;r++) for (let c=0;c<5;c++) out[4-r][c] = t[r][c]; return out; }
  return {identity: t=>t, rotate90, rotate180, rotate270, transpose, mirrorLR, mirrorUD};
}

function build6Words(target) {
  const across = [0,2,4].map(r => target[r].map(c=>c||"").join(''));
  const down = [0,2,4].map(c => { let s = ""; for (let r=0;r<5;r++) s += target[r][c] || ""; return s; });
  return across.concat(down);
}

function firstLetters(words) { return words.map(w => w[0]||"").join(""); }
function lastLetters(words) { return words.map(w => w[w.length-1]||"").join(""); }

let WORDSET = null;
if (WORDLIST_PATH) {
  try {
    const data = fs.readFileSync(WORDLIST_PATH, "utf8");
    WORDSET = new Set(data.split(/\r?\n/).map(s=>s.trim().toLowerCase()).filter(Boolean));
    console.log(`Loaded ${WORDSET.size} words from ${WORDLIST_PATH}`);
  } catch (err) {
    console.error("Failed to load wordlist:", err.message);
  }
}

function isEnglishWord(s) {
  if (!s) return false;
  if (!WORDSET) {
    return /^[a-z]{2,10}$/.test(s.toLowerCase());
  }
  return WORDSET.has(s.toLowerCase());
}

function enumerateVariants(puzzle) {
  const t = transforms(puzzle.target);
  const variants = [];
  const tFns = transforms(puzzle.target);
  const names = Object.keys(tFns);
  for (const name of names) {
    if (name === "identity") continue;
    const transformed = tFns[name](puzzle.target);
    variants.push({name, target: transformed});
  }
  const patterns = { "corners": [[0,0],[0,4],[4,0],[4,4]], "midpoints": [[0,2],[2,0],[2,4],[4,2]], "plus": [[2,2],[1,2],[2,1],[3,2],[2,3]] };
  for (const key of Object.keys(patterns)) {
    variants.push({name: `prefill-${key}`, target: puzzle.target, prefilled: patterns[key]});
  }
  return variants;
}

function searchSecretMessages(puzzle) {
  const results = [];
  const words = build6Words(puzzle.target);
  const candidates = [
    {type: "first", value: firstLetters(words)},
    {type: "last", value: lastLetters(words)},
    {type: "first_rev", value: firstLetters(words.slice().reverse())},
    {type: "last_rev", value: lastLetters(words.slice().reverse())}
  ];
  for (const cand of candidates) {
    const isWord = isEnglishWord(cand.value);
    results.push({...cand, isWord});
  }
  return results;
}

function run() {
  const report = {timestamp: new Date().toISOString(), puzzles: []};
  for (const p of puzzles) {
    const play = scorePlayability(p);
    const variants = enumerateVariants(p).map(v => ({ name: v.name, uniqueLetters: flatten(v.target).filter(Boolean).length, playability: scorePlayability({target:v.target, prefilled: p.prefilled}).score }));
    const secrets = searchSecretMessages(p);
    report.puzzles.push({ id: p.id, title: p.title, playability: play, variants, secrets });
  }
  fs.writeFileSync(OUT_PATH, JSON.stringify(report, null, 2), "utf8");
  console.log(`Wrote report to ${OUT_PATH}`);
  console.log(JSON.stringify(report, null, 2));
}

run();
