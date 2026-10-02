// Parallax da foto de fundo + partículas roxas flutuando.
(() => {
  const photo = document.getElementById('bg-photo');
  let raf = null;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      const y = Math.min(window.scrollY, window.innerHeight);
      photo.style.transform = `translate3d(0,${-y * 0.15}px,0)`;
    });
  }, { passive: true });

  // Posições pseudo-aleatórias fixas (mesmas a cada carregamento).
  const box = document.getElementById('particles');
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 16; i++) {
    const r = (n) => (Math.sin(i * 97.13 + n * 13.7) + 1) / 2;
    const size = (1.5 + r(2) * 2.5).toFixed(1) + 'px';
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = (r(1) * 100).toFixed(1) + '%';
    p.style.width = size;
    p.style.height = size;
    p.style.animationDuration = (14 + r(3) * 14).toFixed(1) + 's';
    p.style.animationDelay = (-r(4) * 24).toFixed(1) + 's';
    frag.appendChild(p);
  }
  box.appendChild(frag);
})();
