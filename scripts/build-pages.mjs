import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const staging = join(root, ".pages-build");
// Build a disposable copy: the server API in the original project stays intact.
if (dirname(staging) !== root || !staging.endsWith(".pages-build")) {
  throw new Error("Unsafe Pages staging directory");
}
rmSync(staging, { recursive: true, force: true });
mkdirSync(staging);
for (const entry of ["src", "public", "package.json", "next.config.ts", "tsconfig.json", "next-env.d.ts", "postcss.config.mjs"]) {
  if (existsSync(join(root, entry))) cpSync(join(root, entry), join(staging, entry), { recursive: true });
}
rmSync(join(staging, "src", "app", "api"), { recursive: true, force: true });
const result = spawnSync(process.execPath, [join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"], {
  cwd: staging,
  stdio: "inherit",
  env: { ...process.env, SITE_URL: "https://thienvan99.github.io", NEXT_PUBLIC_GITHUB_PAGES: "true" },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
// Next 16.2.12 export uses path.relative (backslashes on Windows), but its
// segment filename encoder only replaces forward slashes. Supply the flat
// filenames the browser requests; Linux already emits these exact filenames.
if (process.platform === "win32") {
  const output = join(staging, "out");
  function normalizeSegments(directory, segmentRoot = null) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        normalizeSegments(path, segmentRoot ?? (entry.name.startsWith("__next.") ? path : null));
      } else if (segmentRoot && entry.name.endsWith(".txt")) {
        const target = join(dirname(segmentRoot), relative(dirname(segmentRoot), path).split(sep).join("."));
        cpSync(path, target);
      }
    }
  }
  normalizeSegments(output);
}
writeFileSync(join(staging, "out", ".nojekyll"), "");
console.log("GitHub Pages artifact: .pages-build/out (https://thienvan99.github.io/beta/)");
