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
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  form.classList.add('is-submitted');
  form.querySelector('.form-success').focus({ preventScroll: true });
});
