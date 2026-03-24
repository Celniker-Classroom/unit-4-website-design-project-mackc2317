// Core site interactions: gallery modal, contact form, theme switcher

// Gallery modal popup
window.addEventListener('DOMContentLoaded', () => {
const gallery = document.querySelector('.gallery');
if (gallery) {
gallery.addEventListener('click', (e) => {
if (e.target.tagName === 'IMG') {
const src = e.target.src;
const alt = e.target.alt;
const modal = document.createElement('div');
modal.style.position = 'fixed';
modal.style.top = 0;
modal.style.left = 0;
modal.style.width = '100vw';
modal.style.height = '100vh';
modal.style.background = 'rgba(0,0,0,0.7)';
modal.style.display = 'flex';
modal.style.alignItems = 'center';
modal.style.justifyContent = 'center';
modal.style.zIndex = '1000';
modal.innerHTML = `<img src="${src}" alt="${alt}" style="max-width:90vw;max-height:80vh;border-radius:8px;box-shadow:0 2px 16px #000;" />`;
modal.addEventListener('click', () => document.body.removeChild(modal));
document.body.appendChild(modal);
}
});
}

// Contact form
const contactForm = document.getElementById('contactForm');
const contactMsg = document.getElementById('contactMsg');
if (contactForm && contactMsg) {
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
contactMsg.textContent = 'Thank you for your message!';
contactForm.reset();
setTimeout(() => { contactMsg.textContent = ''; }, 3000);
});
}

// Theme switcher
const themeSwitcher = document.getElementById('themeSwitcher');
if (themeSwitcher) {
themeSwitcher.addEventListener('click', () => {
document.body.classList.toggle('theme-dark');
themeSwitcher.textContent = document.body.classList.contains('theme-dark') ? '☀️' : '🌙';
});
}
});
