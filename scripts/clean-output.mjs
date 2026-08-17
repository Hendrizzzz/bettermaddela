import { rmSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

const repositoryRoot = resolve(process.cwd());
const outputDirectory = resolve(repositoryRoot, "out");

if (
  basename(outputDirectory) !== "out" ||
  dirname(outputDirectory) !== repositoryRoot
) {
  throw new Error("Refusing to clean an unexpected build-output path.");
}

rmSync(outputDirectory, { force: true, recursive: true });
