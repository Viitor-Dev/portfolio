// node servir.mjs  →  http://localhost:4173
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const RAIZ = path.dirname(fileURLToPath(import.meta.url));
const T = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml'};
http.createServer((q, s) => {
  let r = decodeURIComponent(new URL(q.url, 'http://x').pathname);
  if (r.endsWith('/')) r += 'index.html';
  const f = path.join(RAIZ, path.normalize(r));
  if (!f.startsWith(RAIZ) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return s.writeHead(404).end('404');
  s.writeHead(200, {'Content-Type': T[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store'});
  fs.createReadStream(f).pipe(s);
}).listen(Number(process.env.PORT || 4173), '127.0.0.1');
