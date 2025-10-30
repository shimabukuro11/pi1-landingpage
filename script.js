
// Navbar: toggle mobile menu
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#nav-menu');
if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true' || false;
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('show');
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Carousel
// ===== Carousel (contain, A11y, swipe, dots, autoplay) =====
(function carouselInit() {
  const root = document.querySelector('#galeria .carousel');
  if (!root) return;

  const track = root.querySelector('[data-carousel-track]');
  const slides = Array.from(track.children);
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');
  const dotsWrap = root.querySelector('.carousel-dots');

  let index = 0;

  // Cria dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
    dot.addEventListener('click', () => { index = i; update(); resetAutoplay(); });
    dotsWrap.appendChild(dot);
  });

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap.querySelectorAll('button').forEach((b, i) =>
      b.setAttribute('aria-current', i === index ? 'true' : 'false')
    );
  }

  function goPrev() { index = (index - 1 + slides.length) % slides.length; update(); }
  function goNext() { index = (index + 1) % slides.length; update(); }

  prevBtn.addEventListener('click', () => { goPrev(); resetAutoplay(); });
  nextBtn.addEventListener('click', () => { goNext(); resetAutoplay(); });

  // Teclado
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goPrev(); resetAutoplay(); }
    if (e.key === 'ArrowRight') { goNext(); resetAutoplay(); }
  });

  // Swipe (touch)
  let startX = 0;
  track.addEventListener('touchstart', (e) => startX = e.touches[0].clientX, { passive: true });
  track.addEventListener('touchend',   (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) { goPrev(); resetAutoplay(); }
    if (dx < -50){ goNext(); resetAutoplay(); }
  }, { passive: true });

  // Autoplay
  let timer = null;
  function startAutoplay(){ timer = setInterval(goNext, 5000); }
  function resetAutoplay(){ clearInterval(timer); startAutoplay(); }

  update();
  startAutoplay();
})();


// Form validation (client-side)
(function formInit(){
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const fields = ['nome', 'email', 'mensagem'];
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    fields.forEach(id => {
      const el = form.querySelector('#' + id);
      const error = el.nextElementSibling;
      error.textContent = '';
      if (!el.value.trim()) {
        error.textContent = 'Campo obrigatório.';
        ok = false;
      }
      if (id === 'email' && el.value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(el.value)) {
          error.textContent = 'Informe um e-mail válido.';
          ok = false;
        }
      }
    });

    if (!ok) return;

    // Simula envio
    alert('Obrigado! Sua solicitação foi enviada. Entraremos em contato em breve.');
    form.reset();
  });
})();
