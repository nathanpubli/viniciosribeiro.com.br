// Vinicios Ribeiro Mentoria — landing page behavior.

// Site settings (the design's "Tweaks" panel).
const CONFIG = {
  whatsappNumber: '5521988792087', // +55 21 98879-2087
  showFloatingWhatsApp: true,
  showTexture: true,
};

const FAQ = [
  ['Quanto tempo a mentoria exige por semana?', '[preencher] Os encontros são pensados para a rotina de quem está na loja. Além deles, você reserva algumas horas na semana para implementar o plano.'],
  ['Serve para quem tem só 1 loja?', 'Sim. A mentoria atende donos de 1 a 5 lojas. Com uma loja, é o melhor momento para estruturar antes de crescer.'],
  ['É online ou presencial?', '[preencher com o formato real]'],
  ['Em quanto tempo vejo resultado?', 'Depende do ponto de partida e da implementação. As primeiras mudanças de rotina e indicadores costumam aparecer já nas primeiras semanas de acompanhamento.'],
  ['Qual é o investimento?', 'O investimento é apresentado na conversa de aplicação, depois de entendermos o momento da sua loja.'],
];

const waNumber = String(CONFIG.whatsappNumber).replace(/\D/g, '');
const waLink = text => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

// Sends a Lead event to GTM (dataLayer) and the Meta Pixel, when installed.
function track(event, data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
  if (window.fbq) window.fbq('track', 'Lead', data);
}

// Settings
if (!CONFIG.showTexture) document.body.classList.add('no-texture');
document.querySelector('.wa-float').hidden = !CONFIG.showFloatingWhatsApp;

// WhatsApp buttons
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = waLink('Olá! Quero saber mais sobre a Vinicios Ribeiro Mentoria.');
  a.addEventListener('click', () => track('whatsapp_click', { origem: 'botao' }));
});

// Image slots: show the placeholder until the photo file exists in images/
document.querySelectorAll('.slot img').forEach(img => {
  const slot = img.closest('.slot');
  const empty = () => slot.classList.add('is-empty');
  if (img.complete && !img.naturalWidth) empty();
  img.addEventListener('error', empty);
  img.addEventListener('load', () => slot.classList.remove('is-empty'));
});

// FAQ accordion (one open at a time)
const faqList = document.getElementById('faq');
faqList.innerHTML = FAQ.map(([q, a], i) => `
  <div class="faq-item">
    <button type="button" class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
      <span>${q}</span><span class="faq-sign" aria-hidden="true"><svg class="ic"><use href="#i-plus"/></svg></span>
    </button>
    <p class="faq-a" id="faq-a-${i}" hidden>${a}</p>
  </div>`).join('');
faqList.addEventListener('click', e => {
  const btn = e.target.closest('.faq-q');
  if (!btn) return;
  const wasOpen = btn.getAttribute('aria-expanded') === 'true';
  faqList.querySelectorAll('.faq-q').forEach(b => {
    const open = b === btn && !wasOpen;
    b.setAttribute('aria-expanded', open);
    b.nextElementSibling.hidden = !open;
  });
});

// Application form
const form = document.getElementById('lead-form');
const errorEl = form.querySelector('.form-error');
const choices = [...form.querySelectorAll('.choice')];
let investir = '';

choices.forEach(btn => btn.addEventListener('click', () => {
  investir = btn.textContent;
  choices.forEach(b => b.setAttribute('aria-checked', b === btn));
  errorEl.textContent = '';
}));
form.addEventListener('input', () => { errorEl.textContent = ''; });

form.addEventListener('submit', e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(form));
  if (!f.nome.trim() || f.whats.replace(/\D/g, '').length < 10 || !f.lojas || !f.fat || !investir) {
    errorEl.textContent = 'Preencha nome, WhatsApp com DDD, lojas, faturamento e disponibilidade para investir.';
    return;
  }
  const msg = `Olá! Acabei de aplicar para a Vinicios Ribeiro Mentoria.\nNome: ${f.nome}\nCidade/UF: ${f.cidade}\nLojas: ${f.lojas}\nFaturamento: ${f.fat}\nMaior desafio: ${f.desafio}\nInvestir agora: ${investir}`;
  const href = waLink(msg);
  track('lead_form', { lojas: f.lojas, faturamento: f.fat, investir });
  document.getElementById('lead-wa').href = href;
  form.hidden = true;
  document.getElementById('lead-sent').hidden = false;
  window.open(href, '_blank');
});
