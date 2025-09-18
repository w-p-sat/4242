// // Цей код відповідає за динамічне завантаження та фільтрацію ігрових автоматів.
// document.addEventListener('DOMContentLoaded', () => {

//     const searchInput = document.getElementById('search-input');
//     // Використовуємо правильний селектор для контейнера слотів
//     const slotsContainer = document.querySelector('.box_list_slots');
    
//     // Використовуємо лише той список ігор, що ви надали.
//     const games = [
//         { id: "book_of_ra", name: "Book of Ra", img: "/img/book_of_ra.jpg" },
//         { id: "lucky_lady", name: "Lucky Lady's Charm", img: "/img/lady.jpg" },
//         { id: "sizzling_hot", name: "Sizzling Hot", img: "/img/sizzling.jpg" },
//         { id: "gonzos_quest", name: "Gonzo's Quest", img: "/img/gonzo.jpg" }
//     ];

//     let gamesPerPage = 10;
//     let currentIndex = 0;
//     let filteredGames = [...games]; // Початковий список для пошуку

//     // Функція для рендерингу ігор на сторінку
//     function renderGames() {
//         const slice = filteredGames.slice(currentIndex, currentIndex + gamesPerPage);
//         slice.forEach(game => {
//             const gameDiv = document.createElement('div');
//             gameDiv.classList.add('list_slots');
//             gameDiv.setAttribute('data-game-name', game.name);

//             gameDiv.innerHTML = `
//                 <div class="list_slots_img_button">
//                     <img src="${game.img}" alt="${game.name}">
//                     <button class="more_info" data-game="${game.id}">More information</button>
//                 </div>
//                 <div class="slot-item">
//                     <div class="slot-info">
//                         <div class="slot-name">${game.name}</div>
//                         <div class="slot-details">Поточний RTP: <span class="currentRTP">--</span></div>
//                         <div class="slot-details">Середній RTP: <span class="averageRTP">--</span></div>
//                     </div>
//                     <div class="chart-container">
//                         <canvas id="tradingChart_${game.id}"></canvas>
//                     </div>
//                 </div>
//             `;
//             // Перевіряємо, чи існує контейнер перед додаванням
//             if (slotsContainer) {
//                 slotsContainer.appendChild(gameDiv);
//             }
//         });

//         currentIndex += gamesPerPage;

//         // Показуємо/ховаємо кнопку "Показати ще"
//         if (currentIndex >= filteredGames.length) {
//             loadMoreBtn.style.display = 'none';
//         } else {
//             loadMoreBtn.style.display = 'block';
//         }
//     }

//     // Функція для фільтрації слотів
//     function filterSlots() {
//         const query = searchInput.value.toLowerCase();
        
//         // Очищаємо контейнер і скидаємо індекси
//         if (slotsContainer) {
//             slotsContainer.innerHTML = '';
//         }
//         currentIndex = 0;

//         // Фільтруємо основний масив ігор
//         filteredGames = games.filter(game => game.name.toLowerCase().includes(query));

//         // Рендеримо відфільтровані ігри
//         renderGames();
//     }

//     // Створення кнопки "Показати ще" та додавання її на сторінку
//     const loadMoreBtn = document.createElement('button');
//     loadMoreBtn.id = 'loadMoreBtn';
//     loadMoreBtn.textContent = 'Показати ще';
    
//     // Перевіряємо, чи існує контейнер, перш ніж додавати кнопку
//     if (slotsContainer) {
//         slotsContainer.after(loadMoreBtn);
//     }

//     // Додаємо слухач подій на поле пошуку
//     if (searchInput) {
//         searchInput.addEventListener('input', filterSlots);
//     }

//     // Додаємо слухач подій на submit форми, щоб запобігти перезавантаженню
//     const searchForm = document.getElementById('search-form');
//     if (searchForm) {
//         searchForm.addEventListener('submit', (e) => {
//             e.preventDefault();
//             filterSlots();
//         });
//     }

//     // Додаємо слухач подій на кнопку "Показати ще"
//     if (loadMoreBtn) {
//         loadMoreBtn.addEventListener('click', renderGames);
//     }

//     // Початкове завантаження ігор
//     renderGames();
// });



