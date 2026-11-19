// Copia el build de Angular (dist/nido-frontend/browser) a la carpeta static del backend,
// para que Spring Boot lo sirva en la misma URL que la API (http://localhost:8080/).
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origen = join(raiz, 'dist', 'nido-frontend', 'browser');
const destino = join(raiz, '..', 'Nido', 'src', 'main', 'resources', 'static');

if (!existsSync(origen)) {
  console.error('No existe el build. Ejecute primero: ng build');
  process.exit(1);
}
mkdirSync(destino, { recursive: true });
for (const archivo of readdirSync(destino)) {
  rmSync(join(destino, archivo), { recursive: true, force: true });
}
cpSync(origen, destino, { recursive: true });
console.log(`Frontend copiado a ${destino}`);
