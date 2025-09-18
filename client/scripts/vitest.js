#!/usr/bin/env node
/* eslint-env node */
import fs from 'fs';
import path from 'path';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const testsRoot = path.join(projectRoot, 'src', '__tests__');

const suites = [];
let currentSuite = { name: 'Root', tests: [] };
suites.push(currentSuite);

const pushTest = (test) => {
  if (!currentSuite) {
    throw new Error('No active suite');
  }
  currentSuite.tests.push(test);
};

global.describe = (name, fn) => {
  const parentSuite = currentSuite;
  const suite = { name, tests: [] };
  suites.push(suite);
  currentSuite = suite;
  fn();
  currentSuite = parentSuite;
};

global.it = (name, fn) => pushTest({ name, fn });
global.test = global.it;

const expect = (received) => ({
  toBe: (expected) => {
    if (received !== expected) {
      throw new Error(`Expected ${received} to be ${expected}`);
    }
  },
  toEqual: (expected) => {
    const actual = JSON.stringify(received);
    const expectedString = JSON.stringify(expected);
    if (actual !== expectedString) {
      throw new Error(`Expected ${actual} to equal ${expectedString}`);
    }
  },
  toBeTruthy: () => {
    if (!received) {
      throw new Error(`Expected ${received} to be truthy`);
    }
  },
  toContain: (expected) => {
    if (!received?.includes?.(expected)) {
      throw new Error(`Expected ${received} to contain ${expected}`);
    }
  },
});

global.expect = expect;

global.beforeEach = () => {};
global.afterEach = () => {};

global.beforeAll = () => {};
global.afterAll = () => {};

const loadTests = async () => {
  if (!fs.existsSync(testsRoot)) {
    return;
  }
  const files = fs
    .readdirSync(testsRoot)
    .filter((file) => file.endsWith('.test.js'))
    .map((file) => path.join(testsRoot, file));

  for (const file of files) {
    await import(url.pathToFileURL(file));
  }
};

const run = async () => {
  await loadTests();
  let passed = 0;
  let failed = 0;

  for (const suite of suites) {
    if (suite.tests.length === 0) {
      continue;
    }
    console.log(`\nSuite: ${suite.name}`);
    for (const testCase of suite.tests) {
      try {
        await testCase.fn();
        passed += 1;
        console.log(`  ✓ ${testCase.name}`);
      } catch (error) {
        failed += 1;
        console.error(`  ✗ ${testCase.name}`);
        console.error(`    ${error.message}`);
      }
    }
  }

  console.log(`\nCompleted. Passed: ${passed} Failed: ${failed}`);
  if (failed > 0) {
    process.exitCode = 1;
  }
};

run();
