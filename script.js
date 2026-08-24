const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 24), { passive: true });
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('details').forEach(other => { if (other !== detail) other.removeAttribute('open'); });
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
setTimeout(() => document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible')), 1200);

const form = document.querySelector('#service-form');

const carousel = document.querySelector('.review-carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.review-slide')];
  const dots = [...carousel.querySelectorAll('.review-dots button')];
  let activeSlide = 0;
  let autoplay;
  let touchStart = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const showSlide = index => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === activeSlide);
      if (dotIndex === activeSlide) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };
  const stopAutoplay = () => clearInterval(autoplay);
  const startAutoplay = () => {
    stopAutoplay();
    if (!reducedMotion) autoplay = setInterval(() => showSlide(activeSlide + 1), 9000);
  };
  carousel.querySelector('.review-prev').addEventListener('click', () => { showSlide(activeSlide - 1); startAutoplay(); });
  carousel.querySelector('.review-next').addEventListener('click', () => { showSlide(activeSlide + 1); startAutoplay(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); startAutoplay(); }));
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) startAutoplay(); });
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { showSlide(activeSlide - 1); startAutoplay(); }
    if (event.key === 'ArrowRight') { showSlide(activeSlide + 1); startAutoplay(); }
  });
  carousel.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; stopAutoplay(); }, { passive: true });
  carousel.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) showSlide(activeSlide + (distance < 0 ? 1 : -1));
    startAutoplay();
  }, { passive: true });
  startAutoplay();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  form.classList.add('is-submitted');
  form.querySelector('.form-success').focus({ preventScroll: true });
});
