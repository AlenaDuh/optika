// ===== БУРГЕР-МЕНЮ =====
const burgerBtn = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');

const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

function toggleMenu() {
    burgerBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

burgerBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// ===== МАСКА ТЕЛЕФОНА =====
const phoneInput = document.getElementById('formPhone');

if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        let raw = this.value.replace(/\D/g, '');
        if (raw.length > 11) raw = raw.slice(0, 11);

        let formatted = '+7';
        if (raw.length > 1) formatted += ' (' + raw.slice(1, 4);
        if (raw.length >= 5) formatted += ') ' + raw.slice(4, 7);
        if (raw.length >= 8) formatted += '-' + raw.slice(7, 9);
        if (raw.length >= 10) formatted += '-' + raw.slice(9, 11);

        this.value = formatted;
    });
}

// ===== ОТПРАВКА ФОРМЫ =====
const form = document.getElementById('orderForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const phone = document.getElementById('formPhone').value;
    if (phone.replace(/\D/g, '').length < 10) {
        alert('⚠️ Пожалуйста, введите корректный номер телефона.');
        return;
    }

    const name = document.getElementById('formName').value;
    const salon = document.getElementById('formSalon');
    const salonText = salon.options[salon.selectedIndex].text;
    const comment = document.getElementById('formComment').value;

    alert(`✅ Новая заявка!\n\nИмя: ${name}\nТелефон: ${phone}\nСалон: ${salonText}\nКомментарий: ${comment || '—'}\n\nСпасибо! Мы свяжемся с вами в ближайшее время.`);
    this.reset();
});

// ===== АНИМАЦИИ =====
const cards = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

cards.forEach(card => observer.observe(card));