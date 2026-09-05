/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function loop() {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a,button,label,.project-item,.skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
    ring.style.width = '52px';
    ring.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});

/* ── NAV SCROLL + ACTIVE ── */
const navbar = document.getElementById('navbar');
const sections = ['hero', 'about', 'work', 'experience', 'contact' ];
const navIds = {
  'hero': 'nav-home',
  'about': 'nav-about',
  'work': 'nav-projects',
  'experience': 'nav-exp',
  // 'github': 'nav-github',
  'contact': 'nav-contact',
   
};

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  let cur = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) cur = id;
  });
  sections.forEach(id => {
    const lk = document.getElementById(navIds[id]);
    if (lk) lk.classList.toggle('active', id === cur);
  });
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMobile.classList.toggle('open');
});

function closeMob() {
  hamburger.classList.remove('open');
  navMobile.classList.remove('open');
}

/* ── SCROLL REVEALS ── */
const obs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }),
  { threshold: .1 }
);
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── THEME TOGGLE ── */
const html = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
let dark = true;

toggleBtn.addEventListener('click', () => {
  dark = !dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  toggleBtn.textContent = dark ? '☀️' : '🌙';
});

/* ── READ MORE TOGGLE ── */
function toggleMore(id, btn) {
  const el = document.getElementById(id);
  const isOpen = el.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.querySelector('span:first-child').textContent = isOpen ? 'Read Less' : 'Read More';
}

/* ── PHOTO UPLOAD ── */
// const photoInput = document.getElementById('photoInput');
const profileImg = document.getElementById('profileImg');
// const photoPlaceholder = document.getElementById('photoPlaceholder');

photoInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    profileImg.src = ev.target.result;
    profileImg.style.display = 'block';
    photoPlaceholder.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

/* ── CONTACT FORM ── */
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const femail = document.getElementById('femail').value.trim();
  const fmessage = document.getElementById('fmessage').value.trim();
  const btn = document.getElementById('formSubmit');
  const success = document.getElementById('formSuccess');

  if (!fname || !femail || !fmessage) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  btn.style.display = 'none';
  success.style.display = 'block';

  // Reset after 4 seconds
  setTimeout(() => {
    btn.style.display = 'flex';
    success.style.display = 'none';
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fsubject').value = '';
    document.getElementById('fmessage').value = '';
  }, 4000);
}
