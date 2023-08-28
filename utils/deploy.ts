import path, { join } from "path";
import fs, { emptyDir, ensureDir, writeJSON } from "fs-extra";
import { existsSync } from "fs";

async function createStaticFile(html: string) {
  const randomString = Math.random().toString(36).substring(7);
  const outdir = join(`.vercel/output/static/${randomString}/`);
  await fs.ensureDir(outdir);

  return fs.writeFileSync(path.join(outdir, `index.html`), html);
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
