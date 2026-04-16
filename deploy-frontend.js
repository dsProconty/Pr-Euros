```javascript
/**
* deploy-frontend.js
*
* Uso desde la raíz del repo Pr-Euros:
*   node deploy-frontend.js <ruta-al-proyecto-angular>
*
* Ejemplo:
*   node deploy-frontend.js C:/Proyectos/pr-euros-frontend
*/

 

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

 

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────

 

const RAILWAY_URL  = 'https://pr-euros-production.up.railway.app';
const REPO_ROOT    = path.resolve(__dirname);
const FRONTEND_DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(REPO_ROOT, 'FRONTEND');

 

// ─── UTILIDADES ───────────────────────────────────────────────────────────────

 

function run(cmd, cwd = REPO_ROOT) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

 

function findFile(dir, name) {
  if (!fs.existsSync(dir)) return null;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { const f = findFile(full, name); if (f) return f; }
    else if (e.name === name) return full;
  }
  return null;
}

 

function copyDir(src, dest) {
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    if (e.isDirectory()) { fs.mkdirSync(d, { recursive: true }); copyDir(s, d); }
    else fs.copyFileSync(s, d);
  }
}

 

// ─── VALIDAR ──────────────────────────────────────────────────────────────────

 

if (!fs.existsSync(path.join(FRONTEND_DIR, 'angular.json'))) {
  console.error(`✗ No se encontró angular.json en: ${FRONTEND_DIR}`);
  console.error('  Uso: node deploy-frontend.js <ruta-al-proyecto-angular>');
  process.exit(1);
}
console.log(`\n📁 Frontend : ${FRONTEND_DIR}`);
console.log(`📁 Repo     : ${REPO_ROOT}`);

 

// ─── PASO 1: Inyectar URL del backend ─────────────────────────────────────────

 

console.log('\n─── 1/5 Inyectando URL del backend ───');
const envFile = findFile(path.join(FRONTEND_DIR, 'src'), 'environment.prod.ts')
             || findFile(path.join(FRONTEND_DIR, 'src'), 'environment.ts');

 

if (envFile) {
  let env = fs.readFileSync(envFile, 'utf8');
  env = env.replace(/apiUrl\s*:\s*['"`][^'"`]*['"`]/, `apiUrl: '${RAILWAY_URL}'`);
  env = env.replace(/https?:\/\/[a-z0-9-]+\.ngrok[a-z0-9.-]*/g, RAILWAY_URL);
  fs.writeFileSync(envFile, env, 'utf8');
  console.log(`  ✓ ${path.relative(FRONTEND_DIR, envFile)}`);
} else {
  console.warn('  ⚠ No se encontró environment.prod.ts — verifica la URL manualmente.');
}