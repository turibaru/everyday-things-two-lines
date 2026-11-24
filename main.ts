// A fresh read on every run means the words on disk are the words that ship.
// Four hundred code points is the ceiling; counting by code point keeps accents and emoji honest.
// When the entry runs long we stop before writing anything, so no stale file can pretend to pass.
// The output folder comes from the environment, never from a guess baked into this file.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const content = readFileSync(join(here, "entry.txt"), "utf8");

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (Array.from(content).length > 400) {
  console.error(
    `entry too long: ${Array.from(content).length} code points (max 400)`,
  );
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), content);
