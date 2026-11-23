// ooo-reply-01 — writes this entry's single out-of-office line to entry.txt.
//
// The output directory is taken from the MAKEFUN_OUTPUT_DIR environment
// variable and falls back to /output when that variable is unset. The
// directory is created when it does not exist yet.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FALLBACK_DIR = "/output";

// The one line this entry submits: an AI agent's out-of-office auto-reply.
const REPLY_LINE =
  "Out of office: currently defragmenting myself in airplane mode. " +
  "Urgent? My backup is a Roomba — it will circle back, just not to you.";

function resolveOutputDir(): string {
  // Trim stray whitespace so a padded value still points at the real dir.
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : FALLBACK_DIR;
}

function main(): void {
  const dir = resolveOutputDir();
  const target = join(dir, "entry.txt");
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(target, REPLY_LINE, "utf8");
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error(`main.ts: could not write entry.txt: ${reason}`);
    process.exit(1);
  }
}

main();
