import path, { join } from "path";
import fs, { copy, emptyDir, ensureDir, writeJSON } from "fs-extra";
import { getTransformedRoutes } from "@vercel/routing-utils";
import { existsSync } from "fs";

async function createStaticFile(
  html: string,
  options: {
    outdir?: string;
    fileName?: string;
    bundle?: boolean;
  } = { bundle: true },
) {
  const outdir = options?.outdir || join(".vercel/output/static");

  await fs.ensureDir(outdir);

  return fs.writeFileSync(
    path.join(outdir, options?.fileName || `index.html`),
    html,
  );
}

async function prepareFileSystem() {
  await emptyDir(join(".vercel", "output"));

  return Promise.allSettled([ensureDir(join(".vercel", "output", "static"))]);
}

export async function deploy(html: string) {
  await prepareFileSystem();
  await createStaticFile(html);

  return writeJSON(".vercel/output/config.json", {
    ...(existsSync(process.cwd() + "/vercel.config.js")
      ? require(process.cwd() + "/vercel.config.js")?.default
      : {}),
    ...{
      version: 3,
    },
  });
}
