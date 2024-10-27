#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { jsonSimilarity } = require('../index');

function showUsage() {
  console.log(`
Usage: json-sim <file1.json> <file2.json>

Computes the similarity score between two JSON files.

Options:
  -h, --help    Show this help message.
`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('-h') || args.includes('--help')) {
    showUsage();
    process.exit(0);
  }

  if (args.length !== 2) {
    showUsage();
    process.exit(1);
  }

  const [file1Path, file2Path] = args;

  try {
    const file1Content = fs.readFileSync(path.resolve(process.cwd(), file1Path), 'utf8');
    const file2Content = fs.readFileSync(path.resolve(process.cwd(), file2Path), 'utf8');

    const obj1 = JSON.parse(file1Content);
    const obj2 = JSON.parse(file2Content);

    const similarityScore = jsonSimilarity(obj1, obj2);

    console.log(`${(similarityScore * 100).toFixed(3)}%`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
