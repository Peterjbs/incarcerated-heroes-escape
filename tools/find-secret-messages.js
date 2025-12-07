#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const wordlist = argv.wordlist || null;
if (!wordlist) console.log("Warning: no --wordlist provided; fallback heuristics will be used.");
const spawn = require("child_process").spawnSync;
const script = path.resolve(__dirname, "game-agent.js");
const args = [];
if (wordlist) args.push("--wordlist", wordlist);
args.push("--out", "tools/secret-report.json");
const res = spawn("node", [script, ...args], {stdio: "inherit"});
if (res.error) console.error("Failed to run agent:", res.error);
else console.log("Agent finished; see tools/secret-report.json");
