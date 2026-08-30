import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const platformsPath = path.join(__dirname, '../../data/platforms.json');

let cache = null;

export function getPlatforms() {
  if (!cache) {
    cache = JSON.parse(fs.readFileSync(platformsPath, 'utf8'));
  }
  return cache;
}

export function getPlatformList() {
  return Object.entries(getPlatforms()).map(([id, p]) => ({
    id,
    label: p.label,
  }));
}

export function getPlatform(id) {
  const p = getPlatforms()[id];
  if (!p) throw new Error(`Bilinmeyen platform: ${id}`);
  return { id, ...p };
}
