import { readdirSync, writeFileSync } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '../ui/assets');
const outputPath = join(assetsDir, 'index.tsx');

function toNames(stem) {
  const parts = stem.split('-');
  const camelKey =
    parts[0] + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  const pascalImport = camelKey.charAt(0).toUpperCase() + camelKey.slice(1);
  return { key: camelKey, importName: pascalImport };
}

const icons = readdirSync(assetsDir)
  .filter((f) => f.endsWith('.svg'))
  .map((f) => ({ stem: basename(f, '.svg'), ...toNames(basename(f, '.svg')) }))
  .sort((a, b) => a.key.localeCompare(b.key));

const imports = icons.map(({ importName, stem }) => `import ${importName} from './${stem}.svg';`).join('\n');
const entries = icons.map(({ key, importName }) => `  ${key}: ${importName},`).join('\n');

const content = `${imports}

export const Icons = {
${entries}
};

export type IconName = keyof typeof Icons;
export const iconNames = Object.keys(Icons) as IconName[];
`;

writeFileSync(outputPath, content, 'utf-8');
console.log(`Generated index.tsx with ${icons.length} icons.`);
