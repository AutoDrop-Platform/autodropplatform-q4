// app/utils/GuardianFixer.ts
import fs from 'fs';
import path from 'path';
import { ESLint } from 'eslint';

export async function runGuardianFixer(baseDir = process.cwd()) {
  const eslint = new ESLint({ fix: true });
  const files = await getFilesRecursive(baseDir);

  for (const file of files) {
    if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js')) {
      const results = await eslint.lintFiles([file]);
      await ESLint.outputFixes(results);
    }
  }

  console.log('[GuardianFixer] ✅ Code scanned and auto-fixed.');
}

async function getFilesRecursive(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() ? getFilesRecursive(res) : res;
  }));
  return Array.prototype.concat(...files);
}
