import { readFileSync } from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

/** @typedef {{ path: string; kind: "missing" | "extra" | "same" | "drift"; details?: string }} Issue */

const INVARIANT_TERMS = ["Next.js", "React", "CMS", "SEO", "WCAG", "Shopify", "Stripe", "Node.js"];

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is Array<unknown>}
 */
function isArray(value) {
  return Array.isArray(value);
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
 * @param {unknown} source - Canonical dictionary subtree (object/array/primitive).
 * @param {unknown} target - Locale dictionary subtree to compare against source.
 * @param {string} basePath
 * @returns {Issue[]}
 */
function compareKeys(source, target, basePath = "") {
  /** @type {Issue[]} */
  const issues = [];

  if (isArray(source)) {
    if (!isArray(target)) {
      issues.push({
        path: basePath || "<root>",
        kind: "missing",
        details: "Expected an array value.",
      });
      return issues;
    }

    const maxLength = Math.max(source.length, target.length);
    for (let index = 0; index < maxLength; index += 1) {
      const currentPath = `${basePath}[${index}]`;
      if (index >= source.length) {
        issues.push({ path: currentPath, kind: "extra" });
        continue;
      }
      if (index >= target.length) {
        issues.push({ path: currentPath, kind: "missing" });
        continue;
      }

      const sourceValue = source[index];
      const targetValue = target[index];
      if (isObject(sourceValue) || isArray(sourceValue)) {
        issues.push(...compareKeys(sourceValue, targetValue, currentPath));
      }
    }

    return issues;
  }

  if (!isObject(source)) {
    return issues;
  }

  if (!isObject(target)) {
    issues.push({
      path: basePath || "<root>",
      kind: "missing",
      details: "Expected an object value.",
    });
    return issues;
  }

  for (const key of Object.keys(source)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;
    if (!(key in target)) {
      issues.push({ path: currentPath, kind: "missing" });
      continue;
    }

    const sourceValue = source[key];
    const targetValue = target[key];

    if (isObject(sourceValue) || isArray(sourceValue)) {
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
 * @param {unknown} source - Canonical dictionary subtree (object/array/primitive).
 * @param {unknown} target - Locale dictionary subtree to compare against source.
 * @param {string} basePath
 * @returns {Issue[]}
 */
function findSameStringValues(source, target, basePath = "") {
  /** @type {Issue[]} */
  const issues = [];

  if (isArray(source)) {
    if (!isArray(target)) return issues;

    const limit = Math.min(source.length, target.length);
    for (let index = 0; index < limit; index += 1) {
      const currentPath = `${basePath}[${index}]`;
      const sourceValue = source[index];
      const targetValue = target[index];

      if (isObject(sourceValue) || isArray(sourceValue)) {
        issues.push(...findSameStringValues(sourceValue, targetValue, currentPath));
      } else if (typeof sourceValue === "string" && typeof targetValue === "string") {
        if (sourceValue.trim() !== "" && sourceValue === targetValue) {
          issues.push({ path: currentPath, kind: "same" });
        }
      }
    }

    return issues;
  }

  if (!isObject(source) || !isObject(target)) {
    return issues;
  }

  for (const key of Object.keys(source)) {
    const currentPath = basePath ? `${basePath}.${key}` : key;

    if (!(key in target)) continue;

    const sourceValue = source[key];
    const targetValue = target[key];

    if (isObject(sourceValue) || isArray(sourceValue)) {
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

/**
 * @param {string} value
 * @returns {string[]}
 */
function extractNumericTokens(value) {
  return [...value.matchAll(/\d+(?:\s*-\s*\d+)?/g)].map((match) =>
    match[0].replace(/\s+/g, ""),
  );
}

/**
 * @param {unknown} source
 * @param {unknown} target
 * @param {string} basePath
 * @returns {Issue[]}
 */
function findTranslationDrift(source, target, basePath = "") {
  /** @type {Issue[]} */
  const issues = [];

  if (isArray(source)) {
    if (!isArray(target)) return issues;

    const limit = Math.min(source.length, target.length);
    for (let index = 0; index < limit; index += 1) {
      const currentPath = `${basePath}[${index}]`;
      issues.push(...findTranslationDrift(source[index], target[index], currentPath));
    }
    return issues;
  }

  if (isObject(source)) {
    if (!isObject(target)) return issues;

    for (const key of Object.keys(source)) {
      if (!(key in target)) continue;
      const currentPath = basePath ? `${basePath}.${key}` : key;
      issues.push(...findTranslationDrift(source[key], target[key], currentPath));
    }
    return issues;
  }

  if (typeof source === "string" && typeof target === "string") {
    const sourceNumbers = extractNumericTokens(source);
    const targetNumbers = extractNumericTokens(target);
    const missingNumbers = sourceNumbers.filter((token) => !targetNumbers.includes(token));
    if (missingNumbers.length > 0) {
      issues.push({
        path: basePath,
        kind: "drift",
        details: `Missing numeric tokens from source: ${missingNumbers.join(", ")}.`,
      });
    }

    const requiredTerms = INVARIANT_TERMS.filter((term) => source.includes(term));
    const missingTerms = requiredTerms.filter((term) => !target.includes(term));
    if (missingTerms.length > 0) {
      issues.push({
        path: basePath,
        kind: "drift",
        details: `Missing invariant terms: ${missingTerms.join(", ")}.`,
      });
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
const drift = findTranslationDrift(enUS, viVN);

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

if (drift.length > 0) {
  console.error("i18n translation drift detected:");
  for (const issue of drift) {
    console.error(`  - ${issue.path}${issue.details ? `: ${issue.details}` : ""}`);
  }
  console.error();
  process.exit(1);
}

console.log("i18n check passed: vi-vn is key-synced with en-us.");
