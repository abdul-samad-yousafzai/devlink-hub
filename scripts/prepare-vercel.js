import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const root = process.cwd();
const clientDir = path.join(root, 'dist', 'client');
const targetDir = path.join(root, 'dist');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

(async () => {
  try {
    if (!existsSync(clientDir)) {
      console.error('Client build not found at', clientDir);
      process.exit(1);
    }

    // remove targetDir if it exists but keep safety
    try {
      await fs.rm(targetDir, { recursive: true, force: true });
    } catch (e) {
      // ignore
    }

    // try rename first (fast)
    try {
      await fs.rename(clientDir, targetDir);
      console.log('Moved client build to', targetDir);
      process.exit(0);
    } catch (err) {
      // fallback to copy
      console.log('Rename failed, falling back to copy:', err.message);
      await copyDir(clientDir, targetDir);
      console.log('Copied client build to', targetDir);
      // cleanup original client dir
      try { await fs.rm(path.join(root, 'dist'), { recursive: true, force: false }); } catch(e){}
      process.exit(0);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
