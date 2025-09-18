// import { games } from "/games-data.js"; 
// const container = document.querySelector('.box_list_slots');

// function renderAllGames() {
//     // Рендеримо всі ігри
//     games.forEach(game => {
//         const gameDiv = document.createElement('div');
//         gameDiv.classList.add('list_slots');

//         gameDiv.innerHTML = `
//           <div class="list_slots_img_button">
//             <img src="${game.img}" alt="">
//             <button class="more_info" data-game="${game.id}">More information</button>
//           </div>
//           <div class="slot-item">
//             <div class="slot-info">
//               <div class="slot-name">${game.name}</div>
//               <div class="slot-details">Поточний RTP: <span class="currentRTP">--</span></div>
//               <div class="slot-details">Середній RTP: <span class="averageRTP">--</span></div>
//             </div>
//             <div class="chart-container">
//               <canvas id="tradingChart_${game.id}"></canvas>
//             </div>
//           </div>
//         `;
//         container.appendChild(gameDiv);

//         // Створюємо модальне вікно для кожної гри
//         const modalHtml = `
//           <div id="modal_${game.id}" class="modal-overlay" style="display:none;">
//             <div class="modal-content">
//               <span class="close-button" data-game="${game.id}">&times;</span>
//               <h2>Детальна інформація про ${game.name}</h2>
//               <div class="additional-stats-container">
//                 <div class="slot-details">Поточний RTP: <span id="modal_currentRTP_${game.id}">--</span></div>
//                 <div class="slot-details">Середній RTP: <span id="modal_averageRTP_${game.id}">--</span></div>
                
//                 <div class="additional-stat-item"><span class="label">Останній великий виграш</span><span id="lastBigWin_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Частота випадіння «Книг»</span><span id="booksFrequency_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Найбільша серія без бонуса</span><span id="longestStreak_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Ймовірність бонус-гри</span><span id="bonusProbability_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Активних гравців</span><span id="activePlayers_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Останній джекпот</span><span id="lastJackpotTime_${game.id}" class="value">--</span></div>
//                 <button class="play_button">Play now</button>
//                 <p class="text_spin_and_win">Spin the wheel — win $100!</p>
//               </div>
//             </div>
//           </div>
//         `;
//         document.body.insertAdjacentHTML('beforeend', modalHtml);
//     });
// }

// // Запускаємо рендеринг всіх ігор
// renderAllGames();





// import { games } from "/games-data.js"; 
// const container = document.querySelector('.box_list_slots');

// function renderAllGames() {
//     // Рендеримо всі ігри
//     games.forEach(game => {
//         const gameDiv = document.createElement('div');
//         gameDiv.classList.add('section_list_slots');

//         gameDiv.innerHTML = `
//           <div class="name_button">
//               <div class="slot-name"><h2 class="slot-name_text">${game.name}</h2></div>
//                   <a class="spin_button" href="#">
//                     <span>
//                         <img class="img_button_play" src="/img/unnamed (4).png" alt="">
//                         Play
//                         <img class="img_button_play" src="/img/unnamed (4).png" alt="">
//                     </span>
//                     <span>🍒Play🍒</span>
//                     <span>🍇Play🍇</span>
//                     <span>
//                         <img class="img_button_play" src="/img/jackpot.png" alt="">
//                         Play
//                         <img class="img_button_play" src="/img/jackpot.png" alt="">
//                     </span>
//                     <span>
//                         <img class="img_button_play" src="/img/win (2).png" alt="">
//                         Play
//                         <img class="img_button_play" src="/img/win (2).png" alt="">
//                     </span>
//                   </a>
//                 <button class="more_info" onclick="window.location.href='/more_info.html'" data-game="${game.id}">More information</button>
//           </div>
//               <div class="list_slots">
//                   <div class="list_slots_img_button">
//                       <img src="${game.img}" alt="">
//                   </div>
//                   <div class="slot-item">
//                       <div class="slot-info">
//                           <div class="slot-details">Поточний RTP: <span class="currentRTP">--</span></div>
//                           <div class="slot-details">Середній RTP: <span class="averageRTP">--</span></div>
//                       </div>
//                       <div class="chart-container">
//                           <canvas id="tradingChart_${game.id}"></canvas>
//                       </div>
//                   </div>
//         `;
//         container.appendChild(gameDiv);

//         // Створюємо модальне вікно для кожної гри
//         const modalHtml = `
//           <div id="modal_${game.id}" class="modal-overlay" style="display:none;">
//             <div class="modal-content">
//               <span class="close-button" data-game="${game.id}">&times;</span>
//               <h2>Детальна інформація про ${game.name}</h2>
//               <div class="additional-stats-container">
//                 <div class="slot-details">Поточний RTP: <span id="modal_currentRTP_${game.id}">--</span></div>
//                 <div class="slot-details">Середній RTP: <span id="modal_averageRTP_${game.id}">--</span></div>
                
//                 <div class="additional-stat-item"><span class="label">Останній великий виграш</span><span id="lastBigWin_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Частота випадіння «Книг»</span><span id="booksFrequency_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Найбільша серія без бонуса</span><span id="longestStreak_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Ймовірність бонус-гри</span><span id="bonusProbability_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Активних гравців</span><span id="activePlayers_${game.id}" class="value">--</span></div>
//                 <div class="additional-stat-item"><span class="label">Останній джекпот</span><span id="lastJackpotTime_${game.id}" class="value">--</span></div>
//                 <button class="play_button">Play now</button>
//                 <p class="text_spin_and_win">Spin the wheel — win $100!</p>
//               </div>
//             </div>
//           </div>
//         `;
//         document.body.insertAdjacentHTML('beforeend', modalHtml);
//     });
// }

// // Запускаємо рендеринг всіх ігор
// renderAllGames();




import { games } from "/games-data.js"; 
const container = document.querySelector('.box_list_slots');

function renderAllGames() {
    // Рендеримо всі ігри
    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('section_list_slots');

        gameDiv.innerHTML = `
          <div class="name_button">
              <div class="slot-name"><h2 class="slot-name_text">${game.name}</h2></div>
                  <a class="spin_button" href="#">
                    <span>
                        <img class="img_button_play" src="/img/unnamed (4).png" alt="">
                        Play
                        <img class="img_button_play" src="/img/unnamed (4).png" alt="">
                    </span>
                    <span>🍒Play🍒</span>
                    <span>🍇Play🍇</span>
                    <span>
                        <img class="img_button_play" src="/img/jackpot.png" alt="">
                        Play
                        <img class="img_button_play" src="/img/jackpot.png" alt="">
                    </span>
                    <span>
                        <img class="img_button_play" src="/img/win (2).png" alt="">
                        Play
                        <img class="img_button_play" src="/img/win (2).png" alt="">
                    </span>
                  </a>
                <button class="more_info" onclick="window.location.href='/more_info.html?game=${game.id}'" data-game="${game.id}">More information</button>
          </div>
              <div class="list_slots">
                  <div class="list_slots_img_button">
                      <img src="${game.img}" alt="">
                  </div>
                  <div class="slot-item">
                      <div class="slot-info">
                          <div class="slot-details">Поточний RTP: <span class="currentRTP">--</span></div>
                          <div class="slot-details">Середній RTP: <span class="averageRTP">--</span></div>
                      </div>
                      <div class="chart-container">
                          <canvas id="tradingChart_${game.id}"></canvas>
                      </div>
                  </div>
        `;
        container.appendChild(gameDiv);
    });
}

// --- Відображення деталей гри на сторінці more_info.html ---
const detailsContainer = document.querySelector('.game-details-container'); // Контейнер для деталей гри
if (detailsContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');
    const game = games.find(g => g.id == gameId);

    if (game) {
        detailsContainer.innerHTML = `
        <main class="main">
            <section class="main_section">
                <div class="main_one_box">
                    <nav class="main_one_box_title">
                        <h2>${game.name}</h2>
                    </nav>
                    <nav class="main_one_box_logo_slots">
                        <img src="${game.img}" alt="">
                    </nav>
                    <nav class="main_one_box_button_pay">
                        <a class="spin_button" href="#">
                            <span>
                                <img class="img_button_play" src="/img/unnamed (4).png" alt="">
                                Play
                                <img class="img_button_play" src="/img/unnamed (4).png" alt="">
                            </span>
                            <span>🍒Play🍒</span>
                            <span>🍇Play🍇</span>
                            <span>
                                <img class="img_button_play" src="/img/jackpot.png" alt="">
                                Play
                                <img class="img_button_play" src="/img/jackpot.png" alt="">
                            </span>
                            <span>
                                <img class="img_button_play" src="/img/win (2).png" alt="">
                                Play
                                <img class="img_button_play" src="/img/win (2).png" alt="">
                            </span>
                        </a>
                    </nav>
                </div>
                <div class="main_two_box">
                    <div class="main_two_box_RTPmain-box">
                        <div class="main_two_box_RTPmain-box_curent">
                            <div class="flex flex-1 justify-center items-center">
                                <div>
                                    <div class="poker-chip-container">
                                        <div class="chip-edge"></div>
                                        <div class="chip-edge-glow"></div>
                                        <div class="chip-inlay">
                                            <div class="main-glow"></div>
                                            <div class="label">Curent RTP</div>
                                            <div class="percentage-value" id="modal_currentRTP_${game.id}">${game.currentRTP || '--'}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="main_two_box_RTPmain-box_average">
                            <div class="flex flex-1 justify-center items-center">
                                <div>
                                    <div class="poker-chip-container">
                                        <div class="chip-edge"></div>
                                        <div class="chip-edge-glow"></div>
                                        <div class="chip-inlay">
                                            <div class="main-glow"></div>
                                            <div class="label">Average RTP</div>
                                            <div class="percentage-value" id="modal_averageRTP_${game.id}">${game.averageRTP || '--'}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main_two_box_statistick">
                        <div class="card-container">
                            <div class="central-symbol">♠</div>
                            <span class="card-text">The last big win</span>
                            <span class="card-value" id="lastBigWin_${game.id}">${game.lastBigWin || '--'}%</span>
                        </div>
                        <div class="card-container">
                            <div class="central-symbol">♠</div>
                            <span class="card-text">Scatter frequency</span>
                            <span class="card-value" id="booksFrequency_${game.id}">${game.booksFrequency || '--'}%</span>
                        </div>
                        <div class="card-container">
                            <div class="central-symbol">♠</div>
                            <span class="card-text">No-bonus streak</span>
                            <span class="card-value" id="longestStreak_${game.id}">${game.longestStreak || '--'}%</span>
                        </div>
                        <div class="card-container">
                            <div class="central-symbol">♠</div>
                            <span class="card-text">Bonus chancen</span>
                            <span class="card-value" id="bonusProbability_${game.id}">${game.bonusProbability || '--'}%</span>
                        </div>
                        <div class="card-container">
                            <div class="central-symbol">♠</div>
                            <span class="card-text">Active players</span>
                            <span class="card-value" id="activePlayers_${game.id}">${game.activePlayers || '--'}%</span>
                        </div>
                        <div class="card-container">
                            <div class="central-symbol">♠</div>
                            <span class="card-text">Last jackpot</span>
                            <span class="card-value" id="lastJackpotTime_${game.id}">${game.lastJackpotTime || '--'}%</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        `;
    }
}

// Запускаємо рендеринг всіх ігор
renderAllGames();


