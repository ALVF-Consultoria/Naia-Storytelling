import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const frontendDir = path.join(__dirname, 'frontend');
const backendDir = path.join(__dirname, 'backend');
const backendPublicDir = path.join(backendDir, 'public');

console.log('🚀 Starting Full Build Process...');

// 1. Install Frontend Deps (optional, but good for safety)
console.log('📦 Installing Frontend Dependencies...');
execSync('npm install', { cwd: frontendDir, stdio: 'inherit' });

// 2. Build Frontend
console.log('🏗️  Building React App...');
execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });

// 3. Clear Backend Public Dir
console.log('🧹 Cleaning Backend Public Directory...');
if (fs.existsSync(backendPublicDir)) {
  fs.rmSync(backendPublicDir, { recursive: true, force: true });
}
fs.mkdirSync(backendPublicDir);

// 4. Move Dist to Backend Public
console.log('🚚 Moving Build to Backend...');
const distDir = path.join(frontendDir, 'dist');
fs.cpSync(distDir, backendPublicDir, { recursive: true });

// 5. Backend Setup
console.log('⚙️  Setting up Backend...');
execSync('npm install', { cwd: backendDir, stdio: 'inherit' });

console.log('✅ Build Complete!');
console.log('👉 To run locally for testing:');
console.log('   cd backend && npm start');
console.log('👉 For Hostinger: Upload the "backend" folder content.');
