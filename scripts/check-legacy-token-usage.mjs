import { execSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();

const legacyPattern = [
  '--surface-',
  '--text-',
  '--border-default',
  '--border-strong',
  '--brand-primary',
  '--brand-purple-deep',
  '--btn-primary-',
  '--btn-secondary-',
  '--gradient-',
  '--shadow-focus',
].join('|');

let output = '';
try {
  output = execSync(`rg -n --no-heading -e "${legacyPattern}" docs packages`, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
} catch (error) {
  // rg exits with code 1 when no matches are found.
  if (error.status === 1) {
    console.log('[legacy-gate] OK: no legacy token usage found.');
    process.exit(0);
  }
  throw error;
}

const allowPrefixes = [
  'packages/kalki-design/src/tokens.css',
  'packages/kalki-design/src/components/ui/',
  'docs/app/globals.css',
];

const lines = output.split('\n').filter(Boolean);
const disallowed = [];

for (const line of lines) {
  const filePath = line.split(':')[0];
  const normalized = filePath.replaceAll('\\\\', '/');
  const allowed = allowPrefixes.some((prefix) => normalized.startsWith(prefix));
  if (!allowed) {
    disallowed.push(line);
  }
}

if (disallowed.length > 0) {
  console.error('[legacy-gate] Found legacy token usage outside allowed migration zones:');
  for (const line of disallowed) console.error(`  ${line}`);
  process.exit(1);
}

console.log('[legacy-gate] OK: legacy token usage constrained to migration-safe files.');
