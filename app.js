// Etiqueta rasgada, personagem que reage ao ponteiro e ao toque.
const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
const eu = document.getElementById('personagem');
const palco = document.getElementById('palco');
const fim = document.querySelector('.final');
const poses = Object.fromEntries([...eu.querySelectorAll('.pose')].map((p) => [p.dataset.pose, p]));

// Borda de papel rasgado, sempre igual entre visitas
let s = 11;
const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
for (const el of document.querySelectorAll('[data-rasgo]')) {
  const pts = [];
  const lado = (n, f) => { for (let i = 0; i <= n; i++) pts.push(f(i / n, r() * 1.5)); };
  lado(30, (t, j) => `${t * 100}% ${j}%`);
  lado(14, (t, j) => `${100 - j}% ${t * 100}%`);
  lado(30, (t, j) => `${100 - t * 100}% ${100 - j * 2}%`);
  lado(14, (t, j) => `${j}% ${100 - t * 100}%`);
  el.style.clipPath = `polygon(${pts.join(',')})`;
}

const mostrar = (nome) => { for (const k in poses) poses[k].classList.toggle('ativa', k === nome); };
let volta;
const baloes = () => document.querySelectorAll('.balao');
let cliques = 0;
eu.addEventListener('click', () => {
  cliques++;
  baloes().forEach((b) => { b.textContent = cliques === 1 ? 'ei, calma!' : 'de novo?!'; b.classList.remove('fora'); });
  clearTimeout(eu._b);
  eu._b = setTimeout(() => baloes().forEach((b) => b.classList.add('fora')), 1500);
  mostrar('surpresa');
  eu.classList.remove('susto');
  void eu.offsetWidth;
  eu.classList.add('susto');
  clearTimeout(volta);
  volta = setTimeout(() => mostrar('parado'), 900);
});

if (!quieto) {
  const alvo = {x: 0, y: 0};
  const agora = {x: 0, y: 0};
  addEventListener('pointermove', (e) => {
    alvo.x = e.clientX / innerWidth - 0.5;
    alvo.y = e.clientY / innerHeight - 0.5;
  }, {passive: true});
  const quadro = () => {
    agora.x += (alvo.x - agora.x) * 0.08;
    agora.y += (alvo.y - agora.y) * 0.08;
    palco.style.setProperty('--x', `${agora.x * 26}px`);
    palco.style.setProperty('--y', `${agora.y * 14}px`);
    palco.style.setProperty('--r', `${-1.5 + agora.x * 2.4}deg`);
    if (fim) {
      fim.style.setProperty('--x', `${agora.x * 34}px`);
      fim.style.setProperty('--y', `${agora.y * 16}px`);
      fim.style.setProperty('--r', `${agora.x * 3}deg`);
    }
    requestAnimationFrame(quadro);
  };
  requestAnimationFrame(quadro);
}

// Rasgo: abre de cima para baixo com fibra, dobra e cacos, depois as duas folhas caem para os lados
if (!quieto && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('rasgo-on');
  const cartaz = palco.querySelector('.cartaz');
  const sob = palco.querySelector('.sob');
  const N = 110;
  const costura = [];
  const fibra = [];
  let x = 47;
  for (let i = 0; i <= N; i++) {
    x = Math.min(56, Math.max(38, x + (r() - 0.5) * 2.6));
    const dente = (i % 2 ? 1 : -1) * r() * 0.75;
    costura.push(x + dente + Math.sin(i * 0.33) * 1.4);
    fibra.push(0.35 + r() * 1.5);
  }
  const yDe = (i) => (i / N) * 100;
  const poly = (base, f) => {
    const pts = [];
    for (let i = 0; i <= N; i++) pts.push(`${f(i).toFixed(2)}% ${yDe(i).toFixed(2)}%`);
    return `polygon(${base[0]},${pts.join(',')},${base[1]})`;
  };
  const BE = ['0 0', '0 100%'];
  const BD = ['100% 0', '100% 100%'];
  const folha = (pai, nome) => {
    const d = document.createElement('div');
    d.className = `folha ${nome}`;
    pai.append(d);
    return d;
  };
  const metade = (nome, conteudo) => {
    const m = document.createElement('div');
    m.className = `metade ${nome}`;
    const fora = folha(m, 'f-fora');
    const fib = folha(m, 'f-fibra');
    const c = document.createElement('div');
    c.className = 'miolo';
    c.append(conteudo);
    m.append(c);
    const somb = folha(m, 'f-sombra');
    const aba = folha(m, 'f-aba');
    palco.append(m);
    return {m, fora, fib, c, somb, aba};
  };
  const copia = cartaz.cloneNode(true);
  copia.removeAttribute('id');
  copia.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
  copia.setAttribute('aria-hidden', 'true');
  copia.inert = true;
  const E = metade('esq', cartaz);
  const D = metade('dir', copia);

  const cores = ['#e9e5da', '#e9e5da', '#c8f031', '#2b3fff', '#f6f3ea'];
  const cacos = Array.from({length: 16}, (_, k) => {
    const d = document.createElement('i');
    d.className = 'caco';
    d.setAttribute('aria-hidden', 'true');
    d.style.setProperty('--t', `${10 + r() * 30}px`);
    d.style.background = cores[k % cores.length];
    d.style.clipPath = `polygon(${r() * 30}% 0,100% ${r() * 30}%,${70 + r() * 30}% 100%,0 ${60 + r() * 40}%)`;
    palco.append(d);
    const i = Math.floor(r() * N);
    return {d, i, y0: yDe(i) / 100, vx: (r() > 0.5 ? 1 : -1) * (120 + r() * 340), vy: -(60 + r() * 240), giro: (r() - 0.5) * 900};
  });

  const est = {p: 0};
  const desenhar = () => {
    const p = est.p;
    palco.classList.toggle('rasgando', p > 0.003);
    const z = Math.min(1, p / 0.56);
    const ponta = (z * z * (3 - 2 * z)) * 135;
    const abre = (i) => Math.max(0, (ponta - yDe(i)) / 100) ** 1.3 * 15;
    const eX = (i) => costura[i] - abre(i);
    const dX = (i) => costura[i] + abre(i);
    const fib = (i) => fibra[i] * Math.min(1, abre(i) / 1.2);
    const dobra = (i) => Math.min(abre(i) * 0.6, 3.4) * (0.75 + fibra[i] * 0.16);
    E.c.style.clipPath = poly(BE, eX);
    D.c.style.clipPath = poly(BD, dX);
    E.fib.style.clipPath = poly(BE, (i) => eX(i) + fib(i));
    D.fib.style.clipPath = poly(BD, (i) => dX(i) - fib(i));
    E.fora.style.clipPath = poly(BE, (i) => eX(i) + fib(i) + Math.min(abre(i), 1.8));
    D.fora.style.clipPath = poly(BD, (i) => dX(i) - fib(i) - Math.min(abre(i), 1.8));
    const faixa = (borda, f) => {
      const a = [];
      const b = [];
      for (let i = 0; i <= N; i++) {
        a.push(`${borda(i).toFixed(2)}% ${yDe(i).toFixed(2)}%`);
        b.unshift(`${f(i).toFixed(2)}% ${yDe(i).toFixed(2)}%`);
      }
      return `polygon(${a.concat(b).join(',')})`;
    };
    E.aba.style.clipPath = faixa(eX, (i) => eX(i) - dobra(i));
    D.aba.style.clipPath = faixa(dX, (i) => dX(i) + dobra(i));
    E.somb.style.clipPath = faixa(eX, (i) => eX(i) - dobra(i) * 1.7);
    D.somb.style.clipPath = faixa(dX, (i) => dX(i) + dobra(i) * 1.7);

    const q = Math.max(0, (p - 0.5) / 0.5);
    const c = q * q;
    E.m.style.transform = q ? `translate3d(${-c * 88}%,${c * 9}%,0) rotate(${-c * 9}deg) rotateY(${c * 24}deg)` : '';
    D.m.style.transform = q ? `translate3d(${c * 92}%,${c * 11}%,0) rotate(${c * 10}deg) rotateY(${-c * 24}deg)` : '';
    sob.style.transform = `scale(${0.82 + 0.18 * Math.min(1, p * 1.3)})`;

    const W = palco.clientWidth;
    const H = palco.clientHeight;
    for (const k of cacos) {
      const t = (p - k.y0 * 0.42) / 0.5;
      if (t <= 0 || t >= 1) {
        k.d.style.visibility = 'hidden';
        continue;
      }
      k.d.style.visibility = 'visible';
      const xx = (costura[k.i] / 100) * W + k.vx * t;
      const yy = k.y0 * H + k.vy * t + 900 * t * t;
      k.d.style.transform = `translate3d(${xx}px,${yy}px,0) rotate(${k.giro * t}deg)`;
    }
  };
  gsap.timeline({scrollTrigger: {trigger: palco, start: 'top top', end: '+=170%', pin: true, scrub: 0.45, anticipatePin: 1}})
    .to(est, {p: 1, ease: 'none', onUpdate: desenhar});

}

// Faixas de projetos: a que recebe o mouse, o toque ou o foco abre
const faixas = [...document.querySelectorAll('#parede .poster')];
const abrir = (f) => faixas.forEach((p) => p.classList.toggle('ativo', p === f));
for (const f of faixas) {
  f.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') abrir(f); });
  f.addEventListener('click', () => abrir(f));
  f.addEventListener('focusin', () => abrir(f));
}

// Lanterna: o feixe sai da mão do personagem e vai até o ponteiro, nunca para trás
const lanterna = document.querySelector('.lanterna');
if (lanterna) {
  const tela = document.getElementById('breu');
  const ctx = tela.getContext('2d');
  const boneco = document.getElementById('comLanterna');
  const LENTE = {x: 0.7, y: 0.47}; // posição da lente na imagem do personagem
  const alvo = {x: 0, y: 0};
  const mira = {x: 0, y: 0};
  const botao = document.getElementById('botaoLuz');
  const legenda = document.getElementById('luzTexto');
  let tocou = false;
  let acesa = false;
  let acendeu = 0;
  let W = 0;
  let H = 0;
  const K = 3; // canvas menor: o desfoque natural deixa a luz macia
  const medir = () => {
    W = lanterna.clientWidth;
    H = lanterna.clientHeight;
    tela.width = Math.ceil(W / K);
    tela.height = Math.ceil(H / K);
    mira.x = alvo.x = W * 0.68;
    mira.y = alvo.y = H * 0.55;
  };
  const apontar = (e) => {
    tocou = true;
    const b = lanterna.getBoundingClientRect();
    alvo.x = e.clientX - b.left;
    alvo.y = e.clientY - b.top;
  };
  lanterna.addEventListener('pointermove', apontar, {passive: true});
  lanterna.addEventListener('pointerdown', apontar, {passive: true});
  const alternar = () => {
    acesa = !acesa;
    acendeu = performance.now();
    botao.textContent = acesa ? 'Desligar a lanterna' : 'Ligar a lanterna';
    botao.setAttribute('aria-pressed', String(acesa));
    legenda.textContent = acesa ? 'Agora mexa a lanterna para encontrar o caminho.' : 'Luz apagada. Clique para ligar a lanterna.';
    if (quieto) pintar();
  };
  botao.addEventListener('click', (e) => { e.stopPropagation(); alternar(); });
  lanterna.addEventListener('click', (e) => { if (!e.target.closest('a,button')) alternar(); });
  addEventListener('resize', medir);
  medir();
  const lente = () => {
    const b = boneco.getBoundingClientRect();
    const s = lanterna.getBoundingClientRect();
    return {x: b.left - s.left + b.width * LENTE.x, y: b.top - s.top + b.height * LENTE.y};
  };
  const pintar = () => {
    const o = lente();
    const tx = Math.max(mira.x, o.x + Math.min(120, W * 0.14));
    const ty = mira.y;
    const R = Math.max(110, Math.min(W, H) * 0.24);
    const ang = Math.atan2(ty - o.y, tx - o.x);
    const nx = Math.cos(ang + Math.PI / 2);
    const ny = Math.sin(ang + Math.PI / 2);
    ctx.setTransform(1 / K, 0, 0, 1 / K, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(2,2,4,.975)';
    ctx.fillRect(0, 0, W, H);
    const idade = performance.now() - acendeu;
    const brilho = !acesa ? 0 : quieto || idade > 420 ? 1 : Math.sin(idade * 0.06) > -0.2 ? 0.25 + idade / 700 : 0.05;
    if (!brilho) {
      if (!quieto) boneco.style.transform = 'rotate(0deg)';
      ctx.globalAlpha = 1;
      return;
    }
    ctx.globalAlpha = brilho;
    ctx.globalCompositeOperation = 'destination-out';
    const g = ctx.createLinearGradient(o.x, o.y, tx, ty);
    g.addColorStop(0, 'rgba(0,0,0,.95)');
    g.addColorStop(1, 'rgba(0,0,0,.55)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(o.x + nx * 12, o.y + ny * 12);
    ctx.lineTo(tx + nx * R * 0.95, ty + ny * R * 0.95);
    ctx.lineTo(tx - nx * R * 0.95, ty - ny * R * 0.95);
    ctx.lineTo(o.x - nx * 12, o.y - ny * 12);
    ctx.closePath();
    ctx.fill();
    const rad = ctx.createRadialGradient(tx, ty, R * 0.2, tx, ty, R * 1.05);
    rad.addColorStop(0, 'rgba(0,0,0,1)');
    rad.addColorStop(0.65, 'rgba(0,0,0,.85)');
    rad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(tx, ty, R * 1.05, 0, 7);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(255,238,170,.07)';
    ctx.beginPath();
    ctx.moveTo(o.x + nx * 12, o.y + ny * 12);
    ctx.lineTo(tx + nx * R * 0.9, ty + ny * R * 0.9);
    ctx.lineTo(tx - nx * R * 0.9, ty - ny * R * 0.9);
    ctx.lineTo(o.x - nx * 12, o.y - ny * 12);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    if (!quieto) boneco.style.transform = `rotate(${Math.max(-5, Math.min(5, (ang * 180) / Math.PI * 0.16))}deg)`;
  };
  boneco.addEventListener('load', pintar);
  const quadroL = (t) => {
    requestAnimationFrame(quadroL);
    const b = lanterna.getBoundingClientRect();
    if (b.bottom < 0 || b.top > innerHeight) return;
    if (!tocou && !quieto && acesa) {
      alvo.x = W * (0.66 + Math.sin(t / 1500) * 0.16);
      alvo.y = H * (0.56 + Math.cos(t / 2100) * 0.2);
    }
    mira.x += (alvo.x - mira.x) * 0.14;
    mira.y += (alvo.y - mira.y) * 0.14;
    pintar();
  };
  if (quieto) pintar();
  else requestAnimationFrame(quadroL);
}
