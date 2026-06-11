const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = [...document.querySelectorAll('.nav-links a')];
const toTop = document.querySelector('.to-top');
const pubSearch = document.querySelector('#pubSearch');
const publicationItems = [...document.querySelectorAll('#publicationList li')];

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks?.classList.toggle('show');
});

navItems.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('show');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const updateActiveLink = () => {
  const fromTop = window.scrollY + 120;
  navItems.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    const isActive = section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop;
    link.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', () => {
  updateActiveLink();
  toTop?.classList.toggle('show', window.scrollY > 500);
});

pubSearch?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  publicationItems.forEach((item) => {
    item.style.display = item.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});

toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelector('#year').textContent = new Date().getFullYear();
updateActiveLink();
