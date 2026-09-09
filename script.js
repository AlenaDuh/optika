// ===== КАЛЬКУЛЯТОР ЦЕНЫ =====
const lensSelect = document.getElementById('lensType');
const coatingSelect = document.getElementById('coating');
const diopterInput = document.getElementById('diopter');
const diopterValue = document.getElementById('diopterValue');
const priceDisplay = document.getElementById('priceDisplay');

function updatePrice() {
    // Базовая цена
    let base = 4500;

    // Наценка за тип линз
    const lensMap = {
        'standard': 0,
        'thin': 1500,
        'ultrathin': 3500,
        'photochrom': 5000
    };
    base += lensMap[lensSelect.value] || 0;

    // Наценка за покрытие
    const coatingMap = {
        'none': 0,
        'antireflect': 500,
        'scratch': 300,
        'full': 1000
    };
    base += coatingMap[coatingSelect.value] || 0;

    // Наценка за сложные диоптрии (> 4)
    const d = parseFloat(diopterInput.value);
    if (d > 4) base += 800;

    // Скидка 10% для онлайн-калькулятора
    const finalPrice = Math.round(base * 0.9);

    priceDisplay.textContent = finalPrice.toLocaleString() + ' ₽';
}

// События для обновления цены
lensSelect.addEventListener('change', updatePrice);
coatingSelect.addEventListener('change', updatePrice);

diopterInput.addEventListener('input', function() {
    diopterValue.textContent = parseFloat(this.value).toFixed(2);
    updatePrice();
});

// ===== МАСКА ТЕЛЕФОНА =====
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function(e) {
    let raw = this.value.replace(/\D/g, '');
    if (raw.length > 11) raw = raw.slice(0, 11);
    
    let formatted = '+7';
    if (raw.length > 1) {
        formatted += ' (' + raw.slice(1, 4);
    }
    if (raw.length >= 5) {
        formatted += ') ' + raw.slice(4, 7);
    }
    if (raw.length >= 8) {
        formatted += '-' + raw.slice(7, 9);
    }
    if (raw.length >= 10) {
        formatted += '-' + raw.slice(9, 11);
    }
    
    this.value = formatted;
});

// ===== ОТПРАВКА ФОРМЫ (ЗАГЛУШКА) =====
const form = document.getElementById('orderForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Проверка телефона (минимальная)
    const phone = document.getElementById('phone').value;
    if (phone.replace(/\D/g, '').length < 10) {
        alert('⚠️ Пожалуйста, введите корректный номер телефона.');
        return;
    }
    
    alert('✅ Спасибо! Мы свяжемся с вами в ближайшее время.');
    
    // Сброс формы
    this.reset();
    
    // Сброс калькулятора к значениям по умолчанию
    diopterInput.value = 2;
    diopterValue.textContent = '2.00';
    lensSelect.value = 'thin';
    coatingSelect.value = 'none';
    updatePrice();
    
    // Сброс телефона
    phoneInput.value = '';
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
updatePrice();

// ===== INTERSECTION OBSERVER ДЛЯ АНИМАЦИЙ =====
const cards = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));