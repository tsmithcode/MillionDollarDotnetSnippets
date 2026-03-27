import { readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";

const root = process.cwd();
const buildManifest = JSON.parse(readFileSync(path.join(root, ".next/build-manifest.json"), "utf8"));
const appBuildManifest = JSON.parse(readFileSync(path.join(root, ".next/app-build-manifest.json"), "utf8"));

const budgets = {
  sharedFirstLoadGzip: 105 * 1024,
  homeFirstLoadGzip: 140 * 1024,
  contentPageFirstLoadGzip: 136 * 1024,
  routeSpecificChunkGzip: 8 * 1024,
  layoutCssGzip: 5 * 1024
};

function fileSize(relativePath) {
  const absolutePath = path.join(root, ".next", relativePath);
  const buffer = readFileSync(absolutePath);

  return {
    raw: statSync(absolutePath).size,
    gzip: gzipSync(buffer).length
  };
}

function totalGzip(files) {
  return files.reduce((sum, file) => sum + fileSize(file).gzip, 0);
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} kB`;
}

const sharedFiles = buildManifest.rootMainFiles;
const sharedFirstLoadGzip = totalGzip(sharedFiles);

const layoutFiles = appBuildManifest.pages["/layout"] ?? [];
const homeFiles = appBuildManifest.pages["/page"] ?? [];
const aboutFiles = appBuildManifest.pages["/about/page"] ?? [];
const proofFiles = appBuildManifest.pages["/proof/page"] ?? [];
const leadershipFiles = appBuildManifest.pages["/leadership/page"] ?? [];

const sharedFileSet = new Set([...sharedFiles, ...layoutFiles]);

function uniqueRouteFiles(routeFiles) {
  return routeFiles.filter((file) => !sharedFileSet.has(file));
}

const homeSpecificFiles = uniqueRouteFiles(homeFiles);
const aboutSpecificFiles = uniqueRouteFiles(aboutFiles);
const proofSpecificFiles = uniqueRouteFiles(proofFiles);
const leadershipSpecificFiles = uniqueRouteFiles(leadershipFiles);

const homeFirstLoadGzip = totalGzip([...new Set([...sharedFiles, ...layoutFiles, ...homeSpecificFiles])]);
const aboutFirstLoadGzip = totalGzip([...new Set([...sharedFiles, ...layoutFiles, ...aboutSpecificFiles])]);
const proofFirstLoadGzip = totalGzip([...new Set([...sharedFiles, ...layoutFiles, ...proofSpecificFiles])]);
const leadershipFirstLoadGzip = totalGzip([...new Set([...sharedFiles, ...layoutFiles, ...leadershipSpecificFiles])]);

const homeRouteChunkGzip = totalGzip(homeSpecificFiles.filter((file) => file.endsWith(".js")));
const aboutRouteChunkGzip = totalGzip(aboutSpecificFiles.filter((file) => file.endsWith(".js")));
const proofRouteChunkGzip = totalGzip(proofSpecificFiles.filter((file) => file.endsWith(".js")));
const leadershipRouteChunkGzip = totalGzip(leadershipSpecificFiles.filter((file) => file.endsWith(".js")));

const layoutCssFile = layoutFiles.find((file) => file.endsWith(".css"));
const layoutCssGzip = layoutCssFile ? fileSize(layoutCssFile).gzip : 0;

const checks = [
  {
    label: "Shared first-load JS gzip",
    actual: sharedFirstLoadGzip,
    budget: budgets.sharedFirstLoadGzip
  },
  {
    label: "Homepage first-load gzip",
    actual: homeFirstLoadGzip,
    budget: budgets.homeFirstLoadGzip
  },
  {
    label: "About page first-load gzip",
    actual: aboutFirstLoadGzip,
    budget: budgets.contentPageFirstLoadGzip
  },
  {
    label: "Proof page first-load gzip",
    actual: proofFirstLoadGzip,
    budget: budgets.contentPageFirstLoadGzip
  },
  {
    label: "Leadership page first-load gzip",
    actual: leadershipFirstLoadGzip,
    budget: budgets.contentPageFirstLoadGzip
  },
  {
    label: "Homepage route-specific chunk gzip",
    actual: homeRouteChunkGzip,
    budget: budgets.routeSpecificChunkGzip
  },
  {
    label: "About route-specific chunk gzip",
    actual: aboutRouteChunkGzip,
    budget: budgets.routeSpecificChunkGzip
  },
  {
    label: "Proof route-specific chunk gzip",
    actual: proofRouteChunkGzip,
    budget: budgets.routeSpecificChunkGzip
  },
  {
    label: "Leadership route-specific chunk gzip",
    actual: leadershipRouteChunkGzip,
    budget: budgets.routeSpecificChunkGzip
  },
  {
    label: "Layout CSS gzip",
    actual: layoutCssGzip,
    budget: budgets.layoutCssGzip
  }
];

const failures = checks.filter((check) => check.actual > check.budget);

console.log("Performance budget report");
console.log("=========================");

for (const check of checks) {
  const status = check.actual <= check.budget ? "PASS" : "FAIL";
  console.log(`${status} ${check.label}: ${formatKb(check.actual)} / ${formatKb(check.budget)}`);
}

if (failures.length > 0) {
  console.error("");
  console.error("Performance budgets were exceeded.");
  process.exit(1);
}
