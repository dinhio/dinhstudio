import { readFileSync } from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

/** @typedef {{ path: string; kind: "missing" | "extra" | "same" }} Issue */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * @param {string} filePath
 * @param {string} exportName
 */
function loadTsExport(filePath, exportName) {
  const absPath = path.resolve(filePath);
  const source = readFileSync(absPath, "utf8");

  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: absPath,
  }).outputText;

  const cjsModule = { exports: {} };
  const require = createRequire(absPath);
  const context = {
    module: cjsModule,
    exports: cjsModule.exports,
    require,
    __filename: absPath,
    __dirname: path.dirname(absPath),
  };

  vm.runInNewContext(transpiled, context, { filename: absPath });

  const exported = cjsModule.exports[exportName];
  if (!exported || !isObject(exported)) {
    throw new Error(`Could not load export \"${exportName}\" from ${filePath}`);
  }

  return exported;
}

/**
 * @param {Record<string, unknown>} source
 * @param {Record<string, unknown>} target
 * @param {string} basePath
 * @returns {Issue[]}
 */
function compareKeys(source, target, basePath = "") {
  /** @type {Issue[]} */
  const issues = [];

  for (const key of Object.keys(source)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;
    if (!(key in target)) {
      issues.push({ path: currentPath, kind: "missing" });
      continue;
    }

    const sourceValue = source[key];
    const targetValue = target[key];

    if (isObject(sourceValue) && isObject(targetValue)) {
      issues.push(...compareKeys(sourceValue, targetValue, currentPath));
    }
  }

  for (const key of Object.keys(target)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;
    if (!(key in source)) {
      issues.push({ path: currentPath, kind: "extra" });
    }
  }

  return issues;
}

/**
 * @param {Record<string, unknown>} source
 * @param {Record<string, unknown>} target
 * @param {string} basePath
 * @returns {Issue[]}
 */
function findSameStringValues(source, target, basePath = "") {
  /** @type {Issue[]} */
  const issues = [];

  for (const key of Object.keys(source)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;

    if (!(key in target)) continue;

    const sourceValue = source[key];
    const targetValue = target[key];

    if (isObject(sourceValue) && isObject(targetValue)) {
      issues.push(...findSameStringValues(sourceValue, targetValue, currentPath));
      continue;
    }

    if (typeof sourceValue === "string" && typeof targetValue === "string") {
      if (sourceValue.trim() !== "" && sourceValue === targetValue) {
        issues.push({ path: currentPath, kind: "same" });
      }
    }
  }

  return issues;
}

const enUS = loadTsExport("i18n/dictionaries/en-us.ts", "enUS");
const viVN = loadTsExport("i18n/dictionaries/vi-vn.ts", "viVN");

const keyIssues = compareKeys(enUS, viVN);
const missing = keyIssues.filter((issue) => issue.kind === "missing");
const extra = keyIssues.filter((issue) => issue.kind === "extra");
const same = findSameStringValues(enUS, viVN);

if (missing.length > 0 || extra.length > 0) {
  console.error("i18n key sync failed.\n");

  if (missing.length > 0) {
    console.error("Missing keys in vi-vn:");
    for (const issue of missing) {
      console.error(`  - ${issue.path}`);
    }
    console.error();
  }

  if (extra.length > 0) {
    console.error("Extra keys in vi-vn:");
    for (const issue of extra) {
      console.error(`  - ${issue.path}`);
    }
    console.error();
  }

  process.exit(1);
}

if (same.length > 0) {
  console.warn("i18n keys are in sync, but these values are unchanged from en-us:");
  for (const issue of same) {
    console.warn(`  - ${issue.path}`);
  }
  console.warn();
}

console.log("i18n check passed: vi-vn is key-synced with en-us.");
