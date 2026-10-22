import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Check which node binary to use (avoid hardened runtime node binaries that fail dlopen)
let nodeBin = process.execPath;
if (process.execPath.includes('ChatGPT') || process.execPath.includes('cua_node')) {
  if (fs.existsSync('/usr/local/bin/node')) {
    nodeBin = '/usr/local/bin/node';
  } else if (fs.existsSync('/opt/homebrew/bin/node')) {
    nodeBin = '/opt/homebrew/bin/node';
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viteBin = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

const args = [viteBin, ...process.argv.slice(2)];

const child = spawn(nodeBin, args, {
  stdio: 'inherit',
  env: { 
    ...process.env, 
    PATH: `/usr/local/bin:/opt/homebrew/bin:${process.env.PATH}` 
  }
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
