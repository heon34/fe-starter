// Helpers
const $ = (s, r = document) => r.querySelector(s);
const navToggle = $('#navToggle');
const siteNav = $('#siteNav');
const themeToggle = $('#themeToggle');
const form = $('#newsletter-form');
const msg = $('.form-msg');

// Mobile nav toggle (a11y)
navToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Theme toggle (persist)
const setTheme = (mode) => {
  document.documentElement.setAttribute('data-theme', mode);
  themeToggle?.setAttribute('aria-pressed', String(mode === 'dark'));
  localStorage.setItem('theme', mode);
};
(() => {
  const saved = localStorage.getItem('theme');
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  setTheme(saved || preferred);
})();
themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Form submit (EmailJS **veya** fetch)
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = $('#email').value.trim();
  if (!email) { msg.textContent = 'Lütfen e-posta gir.'; return; }
  msg.textContent = 'Gönderiliyor...';

  try {
    // === Seçenek A: EmailJS ===
    // window.emailjs.init('PUBLIC_KEY');
    // await window.emailjs.send('SERVICE_ID','TEMPLATE_ID',{ email });
    // === Seçenek B: Kendi endpointin ===
    // await fetch('https://api.ornekinstance.com/subscribe', {
    //   method:'POST', headers:{'Content-Type':'application/json'},
    //   body: JSON.stringify({ email })
    // });

    // Demo için başarı simülasyonu:
    await new Promise(r => setTimeout(r, 600));
    msg.textContent = 'Teşekkürler! E-posta kaydedildi.';
    form.reset();
  } catch (err) {
    console.error(err);
    msg.textContent = 'Üzgünüm, bir hata oluştu. Daha sonra tekrar dene.';
  }
});
