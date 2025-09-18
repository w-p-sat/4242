// Знаходимо елементи
const menuButton = document.querySelector('.die-button');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.querySelector('.close-btn');

// Функція для відкриття вікна
function openModal() {
  modal.style.display = 'flex';
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Блокуємо скролінг
}

// Функція для закриття вікна
function closeModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
  document.body.style.overflow = ''; // Відновлюємо скролінг
}

// Додаємо слухачів подій
menuButton.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal); // Закриття при кліку на затемнену область