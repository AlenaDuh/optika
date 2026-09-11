'use strict';

/* ---------- Бургер-меню ---------- */
const burgerBtn = document.getElementById('burgerBtn');
const navLinks  = document.getElementById('navLinks');

let overlay = null;

if (burgerBtn && navLinks) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    const setMenu = (open) => {
        burgerBtn.classList.toggle('active', open);
        navLinks.classList.toggle('active', open);
        overlay.classList.toggle('active', open);

        burgerBtn.setAttribute('aria-expanded', String(open));
        burgerBtn.setAttribute(
            'aria-label',
            open ? 'Закрыть меню' : 'Открыть меню'
        );

        document.body.style.overflow = open ? 'hidden' : '';
    };

    const toggleMenu = () => {
        setMenu(!navLinks.classList.contains('active'));
    };

    burgerBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', () => setMenu(false));

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            setMenu(false);
            burgerBtn.focus();
        }
    });
}

/* ---------- Маска телефона ---------- */
const phoneInput = document.getElementById('formPhone');

/**
 * Форматирует ввод в маску +7 (XXX) XXX-XX-XX
 * @param {string} value — сырое значение input
 * @returns {string} — отформатированная строка
 */
function formatPhone(value) {
    let digits = value.replace(/\D/g, '');

    if (digits.startsWith('8')) {
        digits = '7' + digits.slice(1);
    } else if (!digits.startsWith('7')) {
        digits = '7' + digits;
    }

    digits = digits.slice(0, 11);

    let formatted = '+7';

    if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ')';
    if (digits.length > 4)  formatted += ' ' + digits.slice(4, 7);
    if (digits.length > 7)  formatted += '-' + digits.slice(7, 9);
    if (digits.length > 9)  formatted += '-' + digits.slice(9, 11);

    return formatted;
}

if (phoneInput) {
    phoneInput.addEventListener('input', () => {
        phoneInput.value = formatPhone(phoneInput.value);
    });

    phoneInput.addEventListener('focus', () => {
        if (!phoneInput.value) phoneInput.value = '+7 ';
    });

    phoneInput.addEventListener('blur', () => {
        if (phoneInput.value === '+7 ' || phoneInput.value === '+7') {
            phoneInput.value = '';
        }
    });
}

/* ---------- Форма заявки ---------- */
const form       = document.getElementById('orderForm');
const submitBtn  = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (form && submitBtn && formStatus) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const name      = document.getElementById('formName').value.trim();
        const phone     = document.getElementById('formPhone').value.trim();
        const salon     = document.getElementById('formSalon');
        const salonText = salon.options[salon.selectedIndex].text;
        const comment   = document.getElementById('formComment').value.trim();

        const phoneDigits = phone.replace(/\D/g, '');

        if (phoneDigits.length !== 11 || !phoneDigits.startsWith('7')) {
            formStatus.textContent = 'Пожалуйста, введите полный номер телефона.';
            formStatus.className = 'form-status error';
            if (phoneInput) phoneInput.focus();
            return;
        }

        const message =
            `Новая заявка на приём\n\n` +
            `Имя: ${name}\n` +
            `Телефон: ${phone}\n` +
            `Салон: ${salonText}\n` +
            `Комментарий: ${comment || '—'}`;

        console.info(message);

        submitBtn.disabled = true;
        submitBtn.textContent = 'Готовим заявку…';

        setTimeout(() => {
            formStatus.textContent =
                'Форма заполнена корректно. Отправка на сервер пока не подключена.';
            formStatus.className = 'form-status error';

            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
        }, 350);
    });
}