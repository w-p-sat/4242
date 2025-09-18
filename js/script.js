// // Цей код запускається, коли вся HTML-структура сторінки завантажена.
// document.addEventListener('DOMContentLoaded', () => {

//     // Ігри беруться з games.js
//     const games = [
//         { id: "book_of_ra", name: "Book of Ra" },
//         { id: "lucky_lady", name: "Lucky Lady's Charm" }
//     ];

//     // Стани для кожної гри
//     const states = {};

//     // Елементи DOM для модалів кожної гри
//     const modals = {};

//     // Ініціалізація станів
//     games.forEach(game => {
//         states[game.id] = {
//             prices: [], // початкова ціна
//             maxPoints: 50,
//             currentPhase: getRandomPhase(),
//             phaseStartTime: Date.now(),
//             longestStreakValue: 9,
//             bonusProbabilityValue: 5.0,
//             lastBigWinTime: '--',
//             activePlayersValue: 0,
//             lastJackpotTime: formatCurrency(Math.floor(Math.random() * (200000 - 50000 + 1)) + 50000),
//             lastJackpotUpdate: Date.now()
//         };
//         // Генеруємо стартовий масив точок для графіка
//         let lastPrice = 50;
//         for (let i = 0; i < states[game.id].maxPoints; i++) {
//             let volatilityFactor = Math.random() * 10 - 5; // ±5%
//             lastPrice = Math.max(20, Math.min(95, lastPrice + volatilityFactor));
//             states[game.id].prices.push(lastPrice);
//         }

//         // Підключаємо елементи модальних вікон
//         modals[game.id] = {
//             currentRTPElement: document.getElementById(`modal_currentRTP_${game.id}`),
//             averageRTPElement: document.getElementById(`modal_averageRTP_${game.id}`),
//             volatilityElement: document.getElementById(`modal_volatility_${game.id}`),
//             lastBigWinElement: document.getElementById(`lastBigWin_${game.id}`),
//             booksFrequencyElement: document.getElementById(`booksFrequency_${game.id}`),
//             longestStreakElement: document.getElementById(`longestStreak_${game.id}`),
//             bonusProbabilityElement: document.getElementById(`bonusProbability_${game.id}`),
//             activePlayersElement: document.getElementById(`activePlayers_${game.id}`),
//             lastJackpotTimeElement: document.getElementById(`lastJackpotTime_${game.id}`),
//             modalElement: document.getElementById(`modal_${game.id}`)
//         };

//         // Додаємо події для кнопок модального вікна
//         const moreInfoBtn = document.querySelector(`.list_slots button[data-game="${game.id}"]`);
//         if (moreInfoBtn) {
//             moreInfoBtn.addEventListener('click', () => {
//                 modals[game.id].modalElement.style.display = 'block';
//                 updateModalData(game.id);
//             });
//         }

//         const closeBtn = modals[game.id].modalElement.querySelector('.close-button');
//         closeBtn.addEventListener('click', () => {
//             modals[game.id].modalElement.style.display = 'none';
//         });

//         modals[game.id].modalElement.addEventListener('click', (e) => {
//             if (e.target === modals[game.id].modalElement) {
//                 modals[game.id].modalElement.style.display = 'none';
//             }
//         });
//     });

//     // 🔧 Функція генерації випадкової фази
//     function getRandomPhase() {
//         const isGreen = Math.random() < 0.5;
//         if (isGreen) {
//             return {
//                 type: 'normal',
//                 color: '#00c107',
//                 duration: Math.floor(Math.random() * 600) + 180,
//                 minRTP: 60,
//                 maxRTP: 95
//             };
//         } else {
//             return {
//                 type: 'normal',
//                 color: '#ff6666',
//                 duration: Math.floor(Math.random() * 600) + 120,
//                 minRTP: 10,
//                 maxRTP: 45
//             };
//         }
//     }

//     // Форматування валюти
//     function formatCurrency(amount) {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 0
//         }).format(amount);
//     }

//     // Функція переходу до наступної фази для конкретної гри
//     function transitionToNextPhase(gameId) {
//         const state = states[gameId];
//         state.currentPhase = getRandomPhase();
//         state.phaseStartTime = Date.now();
//     }

//     // Функція малювання графіка для конкретної гри
//     function drawChart(gameId) {
//         const canvas = document.getElementById(`tradingChart_${gameId}`);
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         let width = canvas.clientWidth;
//         let height = canvas.clientHeight;
//         const Dpr = window.devicePixelRatio || 1;
//         canvas.width = Math.max(1, Math.floor(width * Dpr));
//         canvas.height = Math.max(1, Math.floor(height * Dpr));
//         ctx.setTransform(1,0,0,1,0,0);
//         ctx.scale(Dpr,Dpr);

//         const state = states[gameId];

//         if (state.prices.length === 0) return;

//         const minRTP = Math.min(...state.prices);
//         const maxRTP = Math.max(...state.prices);
//         const padding = (maxRTP - minRTP) * 0.1;
//         const yMinDynamic = Math.max(0, minRTP - padding);
//         const yMaxDynamic = Math.min(100, maxRTP + padding);
//         const yRange = (yMaxDynamic - yMinDynamic) || 1;

//         // Фонова сітка
//         ctx.clearRect(0,0,width,height);
//         ctx.strokeStyle = 'rgba(0,255,247,0.2)';
//         ctx.lineWidth = 0.5;
//         const gridXStep = width / 10;
//         const gridYStep = height / 5;
//         for (let i=1;i<10;i++){
//             ctx.beginPath();
//             ctx.moveTo(i*gridXStep,0);
//             ctx.lineTo(i*gridXStep,height);
//             ctx.stroke();
//         }
//         for (let i=1;i<5;i++){
//             ctx.beginPath();
//             ctx.moveTo(0,i*gridYStep);
//             ctx.lineTo(width,i*gridYStep);
//             ctx.stroke();
//         }

//         // Осі
//         ctx.strokeStyle = '#959595ff';
//         ctx.lineWidth = 1.5;
//         ctx.beginPath();
//         ctx.moveTo(5,0);
//         ctx.lineTo(5,height);
//         ctx.stroke();
//         ctx.beginPath();
//         ctx.moveTo(0,height-5);
//         ctx.lineTo(width,height-5);
//         ctx.stroke();

//         // Мітки по осі Y
//         ctx.fillStyle = '#00ffffff';
//         ctx.font = `10px sans-serif`;
//         ctx.textAlign = 'left';
//         const yLabels = [yMinDynamic, yMinDynamic + yRange*0.25, yMinDynamic + yRange*0.5, yMinDynamic + yRange*0.75, yMaxDynamic];
//         yLabels.forEach(label => {
//             const y = height - ((label - yMinDynamic)/yRange)*height;
//             ctx.fillText(label.toFixed(0),10,y);
//         });

//         // Градієнт під лінією
//         const xStep = width/(state.maxPoints-1);
//         const gradient = ctx.createLinearGradient(0,0,0,height);
//         const topShadowColor = (state.prices[state.prices.length-1]>=50)?'rgba(0,255,183,0.78)':'rgba(255,0,0,0.75)';
//         gradient.addColorStop(0,topShadowColor);
//         gradient.addColorStop(1,'rgba(28,28,28,0)');
//         ctx.fillStyle = gradient;
//         ctx.beginPath();
//         ctx.moveTo(0,height);
//         for (let i=0;i<state.prices.length;i++){
//             const x = i*xStep;
//             const y = height - ((state.prices[i]-yMinDynamic)/yRange)*height;
//             ctx.lineTo(x,y);
//         }
//         ctx.lineTo(width,height);
//         ctx.closePath();
//         ctx.fill();

//         // Лінія графіка
//         ctx.lineWidth = 1.5;
//         ctx.shadowBlur = 100;
//         for (let i=0;i<state.prices.length-1;i++){
//             const x1 = i*xStep;
//             const y1 = height - ((state.prices[i]-yMinDynamic)/yRange)*height;
//             const x2 = (i+1)*xStep;
//             const y2 = height - ((state.prices[i+1]-yMinDynamic)/yRange)*height;
//             ctx.strokeStyle = (state.prices[i+1]>=50)?'#00ffe5ff':'#b90000ff';
//             ctx.shadowColor = ctx.strokeStyle;
//             ctx.beginPath();
//             ctx.moveTo(x1,y1);
//             ctx.lineTo(x2,y2);
//             ctx.stroke();
//         }
//         ctx.shadowBlur = 0;

//         // Остання точка
//         const lastX = (state.prices.length-1)*xStep;
//         const lastY = height - ((state.prices[state.prices.length-1]-yMinDynamic)/yRange)*height;
//         ctx.fillStyle = '#ffffff';
//         ctx.beginPath();
//         ctx.arc(lastX,lastY,3,0,2*Math.PI);
//         ctx.fill();

//         // Текст поточного RTP
//         ctx.fillStyle = '#ffffff';
//         ctx.font = `bold 13px sans-serif`;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'bottom';
//         let textX = lastX;
//         let textY = lastY - 8;
//         if (textX<20) textX=20;
//         if (textX>width-20) textX=width-20;
//         if (textY<20) textY=20;
//         ctx.fillText(`${state.prices[state.prices.length-1].toFixed(1)}%`,textX,textY);
//     }

//     // Функція оновлення даних для конкретної гри
//     function updateData(gameId) {
//         const state = states[gameId];
//         const now = Date.now();

//         // Перевірка переходу фази
//         const elapsedTime = (now - state.phaseStartTime)/1000;
//         if (elapsedTime >= state.currentPhase.duration) {
//             transitionToNextPhase(gameId);
//         }

//         // Розрахунок нового значення RTP
//         const lastPrice = state.prices.length>0?state.prices[state.prices.length-1]:50;
//         let minRTP,maxRTP;
//         if (state.currentPhase.color === '#00c107'){
//             minRTP = 50;
//             maxRTP = state.currentPhase.maxRTP;
//         } else {
//             minRTP = state.currentPhase.minRTP;
//             maxRTP = 49.99;
//         }
//         const range = maxRTP - minRTP;
//         const volatilityFactor = Math.random()*range - (range/2); // коливання ±50% від діапазону
//         const newPrice = lastPrice + volatilityFactor;
//         const clampedPrice = Math.max(minRTP,Math.min(maxRTP,newPrice));
//         state.prices.push(clampedPrice);
//         if (state.prices.length>state.maxPoints) state.prices.shift();

//         // Оновлення бонусів
//         if (state.currentPhase.color === '#00c107') {
//             const isBonus = Math.random()<0.15;
//             if (isBonus){
//                 state.longestStreakValue = 5;
//                 state.bonusProbabilityValue = 5.0;
//                 state.lastBigWinTime = formatCurrency(Math.floor(Math.random()*8000)+1000);
//             } else {
//                 state.longestStreakValue = Math.floor(Math.random()*(15-5+1))+5;
//                 state.bonusProbabilityValue = Math.min(100,state.bonusProbabilityValue+0.5);
//             }
//         } else {
//             const isBonus = Math.random()<0.02;
//             if (isBonus){
//                 state.longestStreakValue = 5;
//                 state.bonusProbabilityValue = 5.0;
//                 state.lastBigWinTime = formatCurrency(Math.floor(Math.random()*300)+50);
//             } else {
//                 state.longestStreakValue = Math.floor(Math.random()*(50-25+1))+25;
//                 state.bonusProbabilityValue = Math.min(100,state.bonusProbabilityValue+0.5);
//             }
//         }

//         state.activePlayersValue = Math.floor(Math.random()*2000)+1000;

//         // Джекпот раз на годину
//         if (now - state.lastJackpotUpdate >= 3600000){
//             state.lastJackpotTime = formatCurrency(Math.floor(Math.random()*(200000-50000+1))+50000);
//             state.lastJackpotUpdate = now;
//         }

//         // Оновлення DOM елементів
//         const container = document.getElementById(`tradingChart_${gameId}`).closest('.slot-item');
//         const currentRTPElement = container.querySelector('.currentRTP');
//         const averageRTPElement = container.querySelector('.averageRTP');
//         const volatilityElement = container.querySelector('.volatility');

//         const totalRTP = state.prices.reduce((sum,p)=>sum+p,0);
//         const averageRTP = totalRTP/state.prices.length;
//         const rtpRange = Math.max(...state.prices)-Math.min(...state.prices);

//         let volatilityText;
//         if (rtpRange>50) volatilityText='Критична';
//         else if (rtpRange>25) volatilityText='Висока';
//         else if (rtpRange>10) volatilityText='Середня';
//         else volatilityText='Низька';

//         currentRTPElement.textContent = `${state.prices[state.prices.length-1].toFixed(2)}%`;
//         averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         volatilityElement.textContent = volatilityText;

//         // Модальне вікно
//         if (modals[gameId].modalElement.style.display === 'block') {
//             updateModalData(gameId);
//         }

//         drawChart(gameId);
//     }

//     // Оновлення даних модального вікна
//     function updateModalData(gameId){
//         const state = states[gameId];
//         const modal = modals[gameId];

//         const currentRTP = state.prices[state.prices.length-1];
//         const averageRTP = state.prices.reduce((sum,p)=>sum+p,0)/state.prices.length;
//         const rtpRange = Math.max(...state.prices)-Math.min(...state.prices);

//         let volatilityText;
//         if (rtpRange>50) volatilityText='Критична';
//         else if (rtpRange>25) volatilityText='Висока';
//         else if (rtpRange>10) volatilityText='Середня';
//         else volatilityText='Низька';

//         modal.currentRTPElement.textContent = `${currentRTP.toFixed(2)}%`;
//         modal.averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         modal.volatilityElement.textContent = volatilityText;
//         modal.lastBigWinElement.textContent = state.lastBigWinTime;
//         modal.booksFrequencyElement.textContent = `${(Math.random()*(25-5)+5).toFixed(1)}%`;
//         modal.longestStreakElement.textContent = state.longestStreakValue;
//         modal.bonusProbabilityElement.textContent = `${state.bonusProbabilityValue.toFixed(1)}%`;
//         modal.activePlayersElement.textContent = state.activePlayersValue;
//         modal.lastJackpotTimeElement.textContent = state.lastJackpotTime;
//     }


//     games.forEach(game => {
//         updateData(game.id);
//         setInterval(()=>updateData(game.id),5000);
//     }); /*стара версія яка бистро запускал графік */


// //     setInterval(() => {
// //     // оновлюємо тільки видимі ігри
// //     games.slice(0, currentIndex).forEach(game => updateData(game.id));
// // }, 5000);


// });









// document.addEventListener('DOMContentLoaded', () => {

//     const games = [
//         { id: "book_of_ra", name: "Book of Ra" },
//         { id: "lucky_lady", name: "Lucky Lady's Charm" }
//     ];

//     const gameSeeds = {
//         "book_of_ra": 12345,
//         "lucky_lady": 67890
//     };

//     const states = {};
//     const modals = {};

//     // --- Deterministic PRNG ---
//     function seededRandom(seed) {
//         let x = Math.sin(seed) * 10000;
//         return x - Math.floor(x);
//     }

//     // --- Фаза гри ---
//     function getRandomPhase(seed) {
//         const isGreen = seededRandom(seed) < 0.5;
//         if (isGreen) {
//             return {
//                 type: 'normal',
//                 color: '#00c107',
//                 duration: Math.floor(seededRandom(seed + 1) * 600) + 180,
//                 minRTP: 60,
//                 maxRTP: 95
//             };
//         } else {
//             return {
//                 type: 'normal',
//                 color: '#ff6666',
//                 duration: Math.floor(seededRandom(seed + 2) * 600) + 120,
//                 minRTP: 10,
//                 maxRTP: 45
//             };
//         }
//     }

//     // --- Отримати детерміновану ціну для кожної точки графіка ---
//     function getPriceAtTick(gameId, tickIndex) {
//         const seed = gameSeeds[gameId] + tickIndex;
//         const phase = getRandomPhase(seed);
//         const range = phase.maxRTP - phase.minRTP;
//         const volatilityFactor = (seededRandom(seed + 3) - 0.5) * range;
//         return Math.max(phase.minRTP, Math.min(phase.maxRTP, phase.minRTP + range / 2 + volatilityFactor));
//     }

//     // --- Ініціалізація станів ---
//     games.forEach((game, gameIndex) => {
//         states[game.id] = {
//             maxPoints: 30,
//             currentPhase: getRandomPhase(gameSeeds[game.id]),
//             phaseStartTime: Date.now(),
//             longestStreakValue: 9,
//             bonusProbabilityValue: 5.0,
//             lastBigWinTime: '--',
//             activePlayersValue: 0,
//             lastJackpotTime: formatCurrency(Math.floor(Math.random() * (200000 - 50000 + 1)) + 50000),
//             lastJackpotUpdate: Date.now()
//         };

//         modals[game.id] = {
//             currentRTPElement: document.getElementById(`modal_currentRTP_${game.id}`),
//             averageRTPElement: document.getElementById(`modal_averageRTP_${game.id}`),
//             volatilityElement: document.getElementById(`modal_volatility_${game.id}`),
//             lastBigWinElement: document.getElementById(`lastBigWin_${game.id}`),
//             booksFrequencyElement: document.getElementById(`booksFrequency_${game.id}`),
//             longestStreakElement: document.getElementById(`longestStreak_${game.id}`),
//             bonusProbabilityElement: document.getElementById(`bonusProbability_${game.id}`),
//             activePlayersElement: document.getElementById(`activePlayers_${game.id}`),
//             lastJackpotTimeElement: document.getElementById(`lastJackpotTime_${game.id}`),
//             modalElement: document.getElementById(`modal_${game.id}`)
//         };

//         // Події кнопок модального вікна
//         const moreInfoBtn = document.querySelector(`.list_slots button[data-game="${game.id}"]`);
//         if (moreInfoBtn) {
//             moreInfoBtn.addEventListener('click', () => {
//                 modals[game.id].modalElement.style.display = 'block';
//                 updateModalData(game.id);
//             });
//         }

//         const closeBtn = modals[game.id].modalElement.querySelector('.close-button');
//         closeBtn.addEventListener('click', () => {
//             modals[game.id].modalElement.style.display = 'none';
//         });

//         modals[game.id].modalElement.addEventListener('click', (e) => {
//             if (e.target === modals[game.id].modalElement) {
//                 modals[game.id].modalElement.style.display = 'none';
//             }
//         });
//     });

//     // --- Форматування валюти ---
//     function formatCurrency(amount) {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 0
//         }).format(amount);
//     }

//     // --- Малювання графіка ---
//     function drawChart(gameId) {
//         const canvas = document.getElementById(`tradingChart_${gameId}`);
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         const state = states[gameId];

//         const width = canvas.clientWidth;
//         const height = canvas.clientHeight;
//         const Dpr = window.devicePixelRatio || 1;
//         canvas.width = Math.max(1, Math.floor(width * Dpr));
//         canvas.height = Math.max(1, Math.floor(height * Dpr));
//         ctx.setTransform(1,0,0,1,0,0);
//         ctx.scale(Dpr,Dpr);

//         // Генеруємо детерміновані ціни
//         const nowTick = Math.floor(Date.now() / 5000);
//         const prices = [];
//         for (let i = state.maxPoints - 1; i >= 0; i--) {
//             prices.unshift(getPriceAtTick(gameId, nowTick - i));
//         }

//         // Масштабування графіка
//         const minRTP = Math.min(...prices);
//         const maxRTP = Math.max(...prices);
//         const padding = (maxRTP - minRTP) * 0.1;
//         const yMinDynamic = Math.max(0, minRTP - padding);
//         const yMaxDynamic = Math.min(100, maxRTP + padding);
//         const yRange = (yMaxDynamic - yMinDynamic) || 1;

//         ctx.clearRect(0,0,width,height);

//         // Фонова сітка
//         ctx.strokeStyle = 'rgba(0,255,247,0.2)';
//         ctx.lineWidth = 0.5;
//         const gridXStep = width / 10;
//         const gridYStep = height / 5;
//         for (let i=1;i<10;i++){
//             ctx.beginPath();
//             ctx.moveTo(i*gridXStep,0);
//             ctx.lineTo(i*gridXStep,height);
//             ctx.stroke();
//         }
//         for (let i=1;i<5;i++){
//             ctx.beginPath();
//             ctx.moveTo(0,i*gridYStep);
//             ctx.lineTo(width,i*gridYStep);
//             ctx.stroke();
//         }

//         // Осі
//         ctx.strokeStyle = '#959595ff';
//         ctx.lineWidth = 1.5;
//         ctx.beginPath();
//         ctx.moveTo(5,0);
//         ctx.lineTo(5,height);
//         ctx.stroke();
//         ctx.beginPath();
//         ctx.moveTo(0,height-5);
//         ctx.lineTo(width,height-5);
//         ctx.stroke();

//         // Мітки по Y
//         ctx.fillStyle = '#00ffffff';
//         ctx.font = `10px sans-serif`;
//         ctx.textAlign = 'left';
//         const yLabels = [yMinDynamic, yMinDynamic + yRange*0.25, yMinDynamic + yRange*0.5, yMinDynamic + yRange*0.75, yMaxDynamic];
//         yLabels.forEach(label => {
//             const y = height - ((label - yMinDynamic)/yRange)*height;
//             ctx.fillText(label.toFixed(0),10,y);
//         });

//         // Градієнт під лінією
//         const xStep = width/(state.maxPoints-1);
//         const gradient = ctx.createLinearGradient(0,0,0,height);
//         const topShadowColor = (prices[prices.length-1]>=50)?'rgba(0,255,183,0.78)':'rgba(255,0,0,0.75)';
//         gradient.addColorStop(0,topShadowColor);
//         gradient.addColorStop(1,'rgba(28,28,28,0)');
//         ctx.fillStyle = gradient;
//         ctx.beginPath();
//         ctx.moveTo(0,height);
//         for (let i=0;i<prices.length;i++){
//             const x = i*xStep;
//             const y = height - ((prices[i]-yMinDynamic)/yRange)*height;
//             ctx.lineTo(x,y);
//         }
//         ctx.lineTo(width,height);
//         ctx.closePath();
//         ctx.fill();

//         // Лінія графіка
//         ctx.lineWidth = 1.5;
//         ctx.shadowBlur = 100;
//         for (let i=0;i<prices.length-1;i++){
//             const x1 = i*xStep;
//             const y1 = height - ((prices[i]-yMinDynamic)/yRange)*height;
//             const x2 = (i+1)*xStep;
//             const y2 = height - ((prices[i+1]-yMinDynamic)/yRange)*height;
//             ctx.strokeStyle = (prices[i+1]>=50)?'#00ffe5ff':'#b90000ff';
//             ctx.shadowColor = ctx.strokeStyle;
//             ctx.beginPath();
//             ctx.moveTo(x1,y1);
//             ctx.lineTo(x2,y2);
//             ctx.stroke();
//         }
//         ctx.shadowBlur = 0;

//         // Остання точка
//         const lastX = (prices.length-1)*xStep;
//         const lastY = height - ((prices[prices.length-1]-yMinDynamic)/yRange)*height;
//         ctx.fillStyle = '#ffffff';
//         ctx.beginPath();
//         ctx.arc(lastX,lastY,3,0,2*Math.PI);
//         ctx.fill();

//         // Поточний RTP
//         ctx.fillStyle = '#ffffff';
//         ctx.font = `bold 13px sans-serif`;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'bottom';
//         let textX = lastX;
//         let textY = lastY - 8;
//         if (textX<20) textX=20;
//         if (textX>width-20) textX=width-20;
//         if (textY<20) textY=20;
//         ctx.fillText(`${prices[prices.length-1].toFixed(1)}%`,textX,textY);

//         return prices;
//     }

//     // --- Оновлення DOM та модального вікна ---
//     function updateData(gameId) {
//         const state = states[gameId];
//         const prices = drawChart(gameId);

//         const container = document.getElementById(`tradingChart_${gameId}`).closest('.slot-item');
//         const currentRTPElement = container.querySelector('.currentRTP');
//         const averageRTPElement = container.querySelector('.averageRTP');
//         const volatilityElement = container.querySelector('.volatility');

//         const totalRTP = prices.reduce((sum,p)=>sum+p,0);
//         const averageRTP = totalRTP/prices.length;
//         const rtpRange = Math.max(...prices)-Math.min(...prices);

//         let volatilityText;
//         if (rtpRange>50) volatilityText='Критична';
//         else if (rtpRange>25) volatilityText='Висока';
//         else if (rtpRange>10) volatilityText='Середня';
//         else volatilityText='Низька';

//         currentRTPElement.textContent = `${prices[prices.length-1].toFixed(2)}%`;
//         averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         volatilityElement.textContent = volatilityText;

//         if (modals[gameId].modalElement.style.display === 'block') {
//             updateModalData(gameId, prices);
//         }
//     }

//     function updateModalData(gameId, prices) {
//         const state = states[gameId];
//         const modal = modals[gameId];

//         const currentRTP = prices[prices.length-1];
//         const averageRTP = prices.reduce((sum,p)=>sum+p,0)/prices.length;
//         const rtpRange = Math.max(...prices)-Math.min(...prices);

//         let volatilityText;
//         if (rtpRange>50) volatilityText='Критична';
//         else if (rtpRange>25) volatilityText='Висока';
//         else if (rtpRange>10) volatilityText='Середня';
//         else volatilityText='Низька';

//         modal.currentRTPElement.textContent = `${currentRTP.toFixed(2)}%`;
//         modal.averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         modal.volatilityElement.textContent = volatilityText;
//         modal.lastBigWinElement.textContent = state.lastBigWinTime;
//         modal.booksFrequencyElement.textContent = `${(Math.random()*(25-5)+5).toFixed(1)}%`;
//         modal.longestStreakElement.textContent = state.longestStreakValue;
//         modal.bonusProbabilityElement.textContent = `${state.bonusProbabilityValue.toFixed(1)}%`;
//         modal.activePlayersElement.textContent = state.activePlayersValue;
//         modal.lastJackpotTimeElement.textContent = state.lastJackpotTime;
//     }

//     // --- Запуск ---
//     games.forEach((game) => {
//         updateData(game.id);
//         setInterval(() => updateData(game.id), 20000); // оновлення кожну секунду
//     });

// });






// // games.js
// document.addEventListener('DOMContentLoaded', () => {

//     // Єдиний масив ігор
//     const gameList = [
//         { id: "book_of_ra", name: "Book of Ra" },
//         { id: "lucky_lady", name: "Lucky Lady's Charm" }
//     ];

//     const states = {};
//     const modals = {};

//     // --- PRNG з seed ---
//     function seededRandom(seed) {
//         let x = Math.sin(seed) * 10000;
//         return x - Math.floor(x);
//     }

//     function getTimeSeed(interval = 5000) {
//         return Math.floor(Date.now() / interval);
//     }

//     // --- Функція генерації випадкової фази ---
//     function getRandomPhase(gameIndex) {
//         const seed = gameIndex + getTimeSeed();
//         const isGreen = seededRandom(seed) < 0.5;
//         if (isGreen) {
//             return {
//                 type: 'normal',
//                 color: '#00c107',
//                 duration: Math.floor(seededRandom(seed + 1) * 600) + 180,
//                 minRTP: 60,
//                 maxRTP: 95
//             };
//         } else {
//             return {
//                 type: 'normal',
//                 color: '#ff6666',
//                 duration: Math.floor(seededRandom(seed + 2) * 600) + 120,
//                 minRTP: 10,
//                 maxRTP: 45
//             };
//         }
//     }

//     function formatCurrency(amount) {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 0
//         }).format(amount);
//     }

//     // --- Малювання графіка (не чіпаємо) ---
//     function drawChart(gameId) {
//         const canvas = document.getElementById(`tradingChart_${gameId}`);
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         const state = states[gameId];
//         let width = canvas.clientWidth;
//         let height = canvas.clientHeight;
//         const Dpr = window.devicePixelRatio || 1;
//         canvas.width = Math.max(1, Math.floor(width * Dpr));
//         canvas.height = Math.max(1, Math.floor(height * Dpr));
//         ctx.setTransform(1,0,0,1,0,0);
//         ctx.scale(Dpr,Dpr);

//         if (!state.prices.length) return;

//         const minRTP = Math.min(...state.prices);
//         const maxRTP = Math.max(...state.prices);
//         const padding = (maxRTP - minRTP) * 0.1;
//         const yMinDynamic = Math.max(0, minRTP - padding);
//         const yMaxDynamic = Math.min(100, maxRTP + padding);
//         const yRange = (yMaxDynamic - yMinDynamic) || 1;

//         ctx.clearRect(0,0,width,height);

//         const xStep = width/(state.maxPoints-1);
//         ctx.lineWidth = 1.5;
//         ctx.shadowBlur = 100;
//         for (let i=0;i<state.prices.length-1;i++){
//             const x1 = i*xStep;
//             const y1 = height - ((state.prices[i]-yMinDynamic)/yRange)*height;
//             const x2 = (i+1)*xStep;
//             const y2 = height - ((state.prices[i+1]-yMinDynamic)/yRange)*height;
//             ctx.strokeStyle = (state.prices[i+1]>=50)?'#00ffe5ff':'#b90000ff';
//             ctx.shadowColor = ctx.strokeStyle;
//             ctx.beginPath();
//             ctx.moveTo(x1,y1);
//             ctx.lineTo(x2,y2);
//             ctx.stroke();
//         }
//         ctx.shadowBlur = 0;

//         const lastX = (state.prices.length-1)*xStep;
//         const lastY = height - ((state.prices[state.prices.length-1]-yMinDynamic)/yRange)*height;
//         ctx.fillStyle = '#ffffff';
//         ctx.beginPath();
//         ctx.arc(lastX,lastY,3,0,2*Math.PI);
//         ctx.fill();

//         ctx.fillStyle = '#ffffff';
//         ctx.font = `bold 13px sans-serif`;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'bottom';
//         ctx.fillText(`${state.prices[state.prices.length-1].toFixed(1)}%`, lastX, lastY-8);
//     }

//     // --- Ініціалізація станів та модальних ---
//     gameList.forEach((game, gameIndex) => {
//         states[game.id] = {
//             prices: [],
//             maxPoints: 50,
//             currentPhase: getRandomPhase(gameIndex),
//             phaseStartTime: Date.now(),
//             longestStreakValue: 9,
//             bonusProbabilityValue: 5.0,
//             lastBigWinTime: '--',
//             activePlayersValue: 0,
//             lastJackpotTime: formatCurrency(Math.floor(Math.random() * (200000-50000+1)) + 50000),
//             lastJackpotUpdate: Date.now()
//         };

//         let lastPrice = 50;
//         for (let i=0;i<states[game.id].maxPoints;i++){
//             const seed = i + gameIndex*1000 + getTimeSeed();
//             const volatilityFactor = seededRandom(seed)*10 - 5;
//             lastPrice = Math.max(20, Math.min(95, lastPrice + volatilityFactor));
//             states[game.id].prices.push(lastPrice);
//         }

//         modals[game.id] = {
//             currentRTPElement: document.getElementById(`modal_currentRTP_${game.id}`),
//             averageRTPElement: document.getElementById(`modal_averageRTP_${game.id}`),
//             volatilityElement: document.getElementById(`modal_volatility_${game.id}`),
//             lastBigWinElement: document.getElementById(`lastBigWin_${game.id}`),
//             booksFrequencyElement: document.getElementById(`booksFrequency_${game.id}`),
//             longestStreakElement: document.getElementById(`longestStreak_${game.id}`),
//             bonusProbabilityElement: document.getElementById(`bonusProbability_${game.id}`),
//             activePlayersElement: document.getElementById(`activePlayers_${game.id}`),
//             lastJackpotTimeElement: document.getElementById(`lastJackpotTime_${game.id}`),
//             modalElement: document.getElementById(`modal_${game.id}`)
//         };

//         const moreInfoBtn = document.querySelector(`.list_slots button[data-game="${game.id}"]`);
//         if (moreInfoBtn) {
//             moreInfoBtn.addEventListener('click', () => {
//                 if (modals[game.id].modalElement) {
//                     modals[game.id].modalElement.style.display = 'block';
//                     updateModalData(game.id);
//                 }
//             });
//         }

//         const closeBtn = modals[game.id].modalElement?.querySelector('.close-button');
//         if (closeBtn) closeBtn.addEventListener('click', () => modals[game.id].modalElement.style.display = 'none');

//         modals[game.id].modalElement?.addEventListener('click', (e) => {
//             if (e.target === modals[game.id].modalElement) modals[game.id].modalElement.style.display = 'none';
//         });
//     });

//     // --- Оновлення даних ---
//     function updateData(gameId, gameIndex){
//         const state = states[gameId];
//         if (!state || !Array.isArray(state.prices)) return;

//         const now = Date.now();
//         if ((now - state.phaseStartTime) / 1000 >= state.currentPhase.duration) {
//             state.currentPhase = getRandomPhase(gameIndex);
//             state.phaseStartTime = now;
//         }

//         const lastPrice = state.prices.length ? state.prices[state.prices.length-1] : 50;
//         const minRTP = state.currentPhase.color === '#00c107' ? 50 : state.currentPhase.minRTP;
//         const maxRTP = state.currentPhase.color === '#00c107' ? state.currentPhase.maxRTP : 49.99;
//         const range = maxRTP - minRTP;
//         const seed = getTimeSeed() + gameIndex*1000;
//         const volatilityFactor = seededRandom(seed)*range - (range/2);
//         const newPrice = Math.max(minRTP, Math.min(maxRTP, lastPrice + volatilityFactor));
//         state.prices.push(newPrice);
//         if (state.prices.length>state.maxPoints) state.prices.shift();

//         state.activePlayersValue = Math.floor(seededRandom(seed + 7)*2000)+1000;

//         if (now - state.lastJackpotUpdate >= 3600000){
//             state.lastJackpotTime = formatCurrency(Math.floor(Math.random()*(200000-50000+1))+50000);
//             state.lastJackpotUpdate = now;
//         }

//         const chartEl = document.getElementById(`tradingChart_${gameId}`);
//         if (!chartEl) return;
       
//         const container = chartEl.closest('.slot-item');
//         if (!container) return;

//         const currentRTPElement = container.querySelector('.currentRTP');
//         const averageRTPElement = container.querySelector('.averageRTP');
//         const volatilityElement = container.querySelector('.volatility');

//         const totalRTP = state.prices.reduce((sum, p) => sum + Number(p || 0), 0);
//         const averageRTP = totalRTP / state.prices.length || 0;
//         const rtpRange = Math.max(...state.prices) - Math.min(...state.prices);

//         let volatilityText = rtpRange > 50 ? 'Критична' :
//                              rtpRange > 25 ? 'Висока' :
//                              rtpRange > 10 ? 'Середня' : 'Низька';

//         if (currentRTPElement) currentRTPElement.textContent = `${Number(state.prices[state.prices.length - 1]).toFixed(2)}%`;
//         if (averageRTPElement) averageRTPElement.textContent = `${Number(averageRTP).toFixed(2)}%`;
//         if (volatilityElement) volatilityElement.textContent = volatilityText;

//         if (modals[gameId]?.modalElement?.style.display === 'block') {
//             updateModalData(gameId);
//         }

//         drawChart(gameId);
//     }

//     function updateModalData(gameId){
//         const state = states[gameId];
//         const modal = modals[gameId];
//         if (!state || !modal) return;

//         const currentRTP = Number(state.prices[state.prices.length - 1] || 0);
//         const averageRTP = state.prices.reduce((sum,p)=>sum+Number(p||0),0)/state.prices.length || 0;
//         const rtpRange = Math.max(...state.prices)-Math.min(...state.prices);

//         let volatilityText = rtpRange > 50 ? 'Критична' :
//                              rtpRange > 25 ? 'Висока' :
//                              rtpRange > 10 ? 'Середня' : 'Низька';

//         if (modal.currentRTPElement) modal.currentRTPElement.textContent = `${currentRTP.toFixed(2)}%`;
//         if (modal.averageRTPElement) modal.averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         if (modal.volatilityElement) modal.volatilityElement.textContent = volatilityText;
//         if (modal.lastBigWinElement) modal.lastBigWinElement.textContent = state.lastBigWinTime;
//         if (modal.booksFrequencyElement) modal.booksFrequencyElement.textContent = `${(Math.random()*(25-5)+5).toFixed(1)}%`;
//         if (modal.longestStreakElement) modal.longestStreakElement.textContent = state.longestStreakValue;
//         if (modal.bonusProbabilityElement) modal.bonusProbabilityElement.textContent = `${state.bonusProbabilityValue.toFixed(1)}%`;
//         if (modal.activePlayersElement) modal.activePlayersElement.textContent = state.activePlayersValue;
//         if (modal.lastJackpotTimeElement) modal.lastJackpotTimeElement.textContent = state.lastJackpotTime;
//     }

//     // --- Запуск оновлення ---
//     gameList.forEach((game,index)=>{
//         updateData(game.id,index);
//         setInterval(()=>updateData(game.id,index),5000);
//     });

// });















// // Цей код відповідає за відображення даних з Firebase у реальному часі

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// document.addEventListener('DOMContentLoaded', () => {

//     const firebaseConfig = {
//         apiKey: "AIzaSyDVEhuyqT3JQRIF7tHFpDCKe1lYzf0WbYs",
//         authDomain: "analizatot-slots.firebaseapp.com",
//         projectId: "analizatot-slots",
//         storageBucket: "analizatot-slots.firebasestorage.app",
//         messagingSenderId: "1019195914545",
//         appId: "1:1019195914545:web:7f2974395cc1dd17b01810",
//         measurementId: "G-HVW128CCQS"
//     };

//     const app = initializeApp(firebaseConfig);
//     const db = getDatabase(app);

//     const games = [
//         { id: "book_of_ra", name: "Book of Ra" },
//         { id: "lucky_lady", name: "Lucky Lady's Charm" }
//     ];

//     const states = {};
//     const modals = {};

//     // --- Ініціалізація DOM-елементів для модальних вікон ---
//     games.forEach((game) => {
//         states[game.id] = {
//             prices: [],
//             longestStreakValue: 9,
//             bonusProbabilityValue: 5.0,
//             lastBigWinTime: '--',
//             activePlayersValue: 0,
//             lastJackpotTime: '--'
//         };

//         modals[game.id] = {
//             currentRTPElement: document.getElementById(`modal_currentRTP_${game.id}`),
//             averageRTPElement: document.getElementById(`modal_averageRTP_${game.id}`),
//             volatilityElement: document.getElementById(`modal_volatility_${game.id}`),
//             lastBigWinElement: document.getElementById(`lastBigWin_${game.id}`),
//             booksFrequencyElement: document.getElementById(`booksFrequency_${game.id}`),
//             longestStreakElement: document.getElementById(`longestStreak_${game.id}`),
//             bonusProbabilityElement: document.getElementById(`bonusProbability_${game.id}`),
//             activePlayersElement: document.getElementById(`activePlayers_${game.id}`),
//             lastJackpotTimeElement: document.getElementById(`lastJackpotTime_${game.id}`),
//             modalElement: document.getElementById(`modal_${game.id}`)
//         };

//         const moreInfoBtn = document.querySelector(`.list_slots button[data-game="${game.id}"]`);
//         if (moreInfoBtn) {
//             moreInfoBtn.addEventListener('click', () => {
//                 modals[game.id].modalElement.style.display = 'block';
//                 updateModalData(game.id);
//             });
//         }

//         const closeBtn = modals[game.id].modalElement.querySelector('.close-button');
//         closeBtn.addEventListener('click', () => {
//             modals[game.id].modalElement.style.display = 'none';
//         });

//         modals[game.id].modalElement.addEventListener('click', (e) => {
//             if (e.target === modals[game.id].modalElement) {
//                 modals[game.id].modalElement.style.display = 'none';
//             }
//         });
//     });

//     function formatCurrency(amount) {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 0
//         }).format(amount);
//     }

//     // --- Малювання графіка на основі отриманих даних ---
//     function drawChart(gameId, prices) {
//         const canvas = document.getElementById(`tradingChart_${gameId}`);
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         const state = states[gameId];

//         const width = canvas.clientWidth;
//         const height = canvas.clientHeight;
//         const Dpr = window.devicePixelRatio || 1;
//         canvas.width = Math.max(1, Math.floor(width * Dpr));
//         canvas.height = Math.max(1, Math.floor(height * Dpr));
//         ctx.setTransform(1, 0, 0, 1, 0, 0);
//         ctx.scale(Dpr, Dpr);

//         if (!prices || prices.length === 0) {
//             ctx.clearRect(0, 0, width, height);
//             ctx.fillStyle = '#ffffff';
//             ctx.font = `bold 16px sans-serif`;
//             ctx.textAlign = 'center';
//             ctx.fillText('Завантаження даних...', width / 2, height / 2);
//             return;
//         }

//         const minRTP = Math.min(...prices);
//         const maxRTP = Math.max(...prices);
//         const padding = (maxRTP - minRTP) * 0.1;
//         const yMinDynamic = Math.max(0, minRTP - padding);
//         const yMaxDynamic = Math.min(100, maxRTP + padding);
//         const yRange = (yMaxDynamic - yMinDynamic) || 1;

//         ctx.clearRect(0, 0, width, height);

//         ctx.strokeStyle = 'rgba(0,255,247,0.2)';
//         ctx.lineWidth = 0.5;
//         const gridXStep = width / 10;
//         const gridYStep = height / 5;
//         for (let i = 1; i < 10; i++) {
//             ctx.beginPath();
//             ctx.moveTo(i * gridXStep, 0);
//             ctx.lineTo(i * gridXStep, height);
//             ctx.stroke();
//         }
//         for (let i = 1; i < 5; i++) {
//             ctx.beginPath();
//             ctx.moveTo(0, i * gridYStep);
//             ctx.lineTo(width, i * gridYStep);
//             ctx.stroke();
//         }

//         ctx.strokeStyle = '#959595ff';
//         ctx.lineWidth = 1.5;
//         ctx.beginPath();
//         ctx.moveTo(5, 0);
//         ctx.lineTo(5, height);
//         ctx.stroke();
//         ctx.beginPath();
//         ctx.moveTo(0, height - 5);
//         ctx.lineTo(width, height - 5);
//         ctx.stroke();

//         ctx.fillStyle = '#00ffffff';
//         ctx.font = `10px sans-serif`;
//         ctx.textAlign = 'left';
//         const yLabels = [yMinDynamic, yMinDynamic + yRange * 0.25, yMinDynamic + yRange * 0.5, yMinDynamic + yRange * 0.75, yMaxDynamic];
//         yLabels.forEach(label => {
//             const y = height - ((label - yMinDynamic) / yRange) * height;
//             ctx.fillText(label.toFixed(0), 10, y);
//         });

//         const xStep = width / (prices.length - 1);
//         const gradient = ctx.createLinearGradient(0, 0, 0, height);
//         const topShadowColor = (prices[prices.length - 1] >= 50) ? 'rgba(0,255,183,0.78)' : 'rgba(255,0,0,0.75)';
//         gradient.addColorStop(0, topShadowColor);
//         gradient.addColorStop(1, 'rgba(28,28,28,0)');
//         ctx.fillStyle = gradient;
//         ctx.beginPath();
//         ctx.moveTo(0, height);
//         for (let i = 0; i < prices.length; i++) {
//             const x = i * xStep;
//             const y = height - ((prices[i] - yMinDynamic) / yRange) * height;
//             ctx.lineTo(x, y);
//         }
//         ctx.lineTo(width, height);
//         ctx.closePath();
//         ctx.fill();

//         ctx.lineWidth = 1.5;
//         ctx.shadowBlur = 100;
//         for (let i = 0; i < prices.length - 1; i++) {
//             const x1 = i * xStep;
//             const y1 = height - ((prices[i] - yMinDynamic) / yRange) * height;
//             const x2 = (i + 1) * xStep;
//             const y2 = height - ((prices[i + 1] - yMinDynamic) / yRange) * height;
//             ctx.strokeStyle = (prices[i + 1] >= 50) ? '#00ffe5ff' : '#b90000ff';
//             ctx.shadowColor = ctx.strokeStyle;
//             ctx.beginPath();
//             ctx.moveTo(x1, y1);
//             ctx.lineTo(x2, y2);
//             ctx.stroke();
//         }
//         ctx.shadowBlur = 0;

//         const lastX = (prices.length - 1) * xStep;
//         const lastY = height - ((prices[prices.length - 1] - yMinDynamic) / yRange) * height;
//         ctx.fillStyle = '#ffffff';
//         ctx.beginPath();
//         ctx.arc(lastX, lastY, 3, 0, 2 * Math.PI);
//         ctx.fill();

//         ctx.fillStyle = '#ffffff';
//         ctx.font = `bold 13px sans-serif`;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'bottom';
//         let textX = lastX;
//         let textY = lastY - 8;
//         if (textX < 20) textX = 20;
//         if (textX > width - 20) textX = width - 20;
//         if (textY < 20) textY = 20;
//         ctx.fillText(`${prices[prices.length - 1].toFixed(1)}%`, textX, textY);
//     }

//     // --- Оновлення DOM та модального вікна ---
//     function updateData(gameId, data) {
//         const state = states[gameId];
//         Object.assign(state, data); // Оновлення стану з даних Firebase

//         const prices = state.prices;
//         drawChart(gameId, prices);

//         const container = document.getElementById(`tradingChart_${gameId}`).closest('.slot-item');
//         const currentRTPElement = container.querySelector('.currentRTP');
//         const averageRTPElement = container.querySelector('.averageRTP');
//         const volatilityElement = container.querySelector('.volatility');

//         const totalRTP = prices.reduce((sum, p) => sum + p, 0);
//         const averageRTP = totalRTP / prices.length;
//         const rtpRange = Math.max(...prices) - Math.min(...prices);

//         let volatilityText;
//         if (rtpRange > 50) volatilityText = 'Критична';
//         else if (rtpRange > 25) volatilityText = 'Висока';
//         else if (rtpRange > 10) volatilityText = 'Середня';
//         else volatilityText = 'Низька';

//         currentRTPElement.textContent = `${prices[prices.length - 1].toFixed(2)}%`;
//         averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         volatilityElement.textContent = volatilityText;

//         if (modals[gameId].modalElement.style.display === 'block') {
//             updateModalData(gameId);
//         }
//     }

//     function updateModalData(gameId) {
//         const state = states[gameId];
//         const prices = state.prices;
//         const modal = modals[gameId];

//         const currentRTP = prices[prices.length - 1];
//         const averageRTP = prices.reduce((sum, p) => sum + p, 0) / prices.length;
//         const rtpRange = Math.max(...prices) - Math.min(...prices);

//         let volatilityText;
//         if (rtpRange > 50) volatilityText = 'Критична';
//         else if (rtpRange > 25) volatilityText = 'Висока';
//         else if (rtpRange > 10) volatilityText = 'Середня';
//         else volatilityText = 'Низька';

//         modal.currentRTPElement.textContent = `${currentRTP.toFixed(2)}%`;
//         modal.averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         modal.volatilityElement.textContent = volatilityText;
//         modal.lastBigWinElement.textContent = state.lastBigWinTime;
//         modal.booksFrequencyElement.textContent = `${(Math.random() * (25 - 5) + 5).toFixed(1)}%`;
//         modal.longestStreakElement.textContent = state.longestStreakValue;
//         modal.bonusProbabilityElement.textContent = `${state.bonusProbabilityValue.toFixed(1)}%`;
//         modal.activePlayersElement.textContent = state.activePlayersValue;
//         modal.lastJackpotTimeElement.textContent = state.lastJackpotTime;
//     }

//     // --- Запуск ---
//     games.forEach((game) => {
//         const dbRef = ref(db, `games/${game.id}`);
//         onValue(dbRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 updateData(game.id, data);
//             }
//         });
//     });

// });


// import { games } from "/js/games-data.js"; 
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// document.addEventListener('DOMContentLoaded', () => {

//     const firebaseConfig = {
//         apiKey: "AIzaSyDVEhuyqT3JQRIF7tHFpDCKe1lYzf0WbYs",
//         authDomain: "analizatot-slots.firebaseapp.com",
//         projectId: "analizatot-slots",
//         storageBucket: "analizatot-slots.firebasestorage.app",
//         messagingSenderId: "1019195914545",
//         appId: "1:1019195914545:web:7f2974395cc1dd17b01810",
//         measurementId: "G-HVW128CCQS"
//     };

//     const app = initializeApp(firebaseConfig);
//     const db = getDatabase(app);

//     // const games = [
//     //     { id: "book_of_ra", name: "Book of Ra" },
//     //     { id: "lucky_lady", name: "Lucky Lady's Charm" },
//     //             { id: "sizzling_hot", name: "Sizzling Hot" },
//     //     { id: "gonzos_quest", name: "Gonzo's Quest"}
//     // ];

//     const states = {};
//     const modals = {};

//     // --- Ініціалізація DOM-елементів для модальних вікон ---
//     games.forEach((game) => {
//         states[game.id] = {
//             prices: [],
//             longestStreakValue: 9,
//             bonusProbabilityValue: 5.0,
//             lastBigWinTime: '--',
//             activePlayersValue: 0,
//             lastJackpotTime: '--'
//         };

//         modals[game.id] = {
//             currentRTPElement: document.getElementById(`modal_currentRTP_${game.id}`),
//             averageRTPElement: document.getElementById(`modal_averageRTP_${game.id}`),
//             lastBigWinElement: document.getElementById(`lastBigWin_${game.id}`),
//             booksFrequencyElement: document.getElementById(`booksFrequency_${game.id}`),
//             longestStreakElement: document.getElementById(`longestStreak_${game.id}`),
//             bonusProbabilityElement: document.getElementById(`bonusProbability_${game.id}`),
//             activePlayersElement: document.getElementById(`activePlayers_${game.id}`),
//             lastJackpotTimeElement: document.getElementById(`lastJackpotTime_${game.id}`),
//             modalElement: document.getElementById(`modal_${game.id}`)
//         };

//         const moreInfoBtn = document.querySelector(`.list_slots button[data-game="${game.id}"]`);
//         if (moreInfoBtn) {
//             moreInfoBtn.addEventListener('click', () => {
//                 modals[game.id].modalElement.style.display = 'block';
//                 updateModalData(game.id);
//             });
//         }

//         const closeBtn = modals[game.id].modalElement.querySelector('.close-button');
//         closeBtn.addEventListener('click', () => {
//             modals[game.id].modalElement.style.display = 'none';
//         });

//         modals[game.id].modalElement.addEventListener('click', (e) => {
//             if (e.target === modals[game.id].modalElement) {
//                 modals[game.id].modalElement.style.display = 'none';
//             }
//         });
//     });

//     // --- Функція для форматування валюти ---
//     function formatCurrency(amount) {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 0
//         }).format(amount);
//     }

//     // --- Змінні для зберігання сум джекпотів для кожної гри ---
//     const lastBigWinAmounts = {
//         "book_of_ra": formatCurrency(Math.floor(Math.random() * 5000) + 1000),
//         "lucky_lady": formatCurrency(Math.floor(Math.random() * 5000) + 1000)
//     };
//     const lastJackpotAmounts = {
//         "book_of_ra": formatCurrency(Math.floor(Math.random() * 100000) + 50000),
//         "lucky_lady": formatCurrency(Math.floor(Math.random() * 100000) + 50000)
//     };

//     // Оновлення "Останнього великого виграшу" кожні 20 хвилин
//     setInterval(() => {
//         games.forEach(game => {
//             lastBigWinAmounts[game.id] = formatCurrency(Math.floor(Math.random() * 5000) + 1000);
//             if (modals[game.id].modalElement.style.display === 'block') {
//                 modals[game.id].lastBigWinElement.textContent = lastBigWinAmounts[game.id];
//             }
//         });
//     }, 20 * 60 * 1000);

//     // Оновлення "Останнього джекпота" кожні 2 години
//     setInterval(() => {
//         games.forEach(game => {
//             lastJackpotAmounts[game.id] = formatCurrency(Math.floor(Math.random() * 100000) + 50000);
//             if (modals[game.id].modalElement.style.display === 'block') {
//                 modals[game.id].lastJackpotTimeElement.textContent = lastJackpotAmounts[game.id];
//             }
//         });
//     }, 2 * 60 * 60 * 1000);

//     // --- Малювання графіка на основі отриманих даних ---
//     function drawChart(gameId, prices) {
//         const canvas = document.getElementById(`tradingChart_${gameId}`);
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         const state = states[gameId];

//         const width = canvas.clientWidth;
//         const height = canvas.clientHeight;
//         const Dpr = window.devicePixelRatio || 1;
//         canvas.width = Math.max(1, Math.floor(width * Dpr));
//         canvas.height = Math.max(1, Math.floor(height * Dpr));
//         ctx.setTransform(1, 0, 0, 1, 0, 0);
//         ctx.scale(Dpr, Dpr);

//         if (!prices || prices.length === 0) {
//             ctx.clearRect(0, 0, width, height);
//             ctx.fillStyle = '#ffffff';
//             ctx.font = `bold 16px sans-serif`;
//             ctx.textAlign = 'center';
//             ctx.fillText('Завантаження даних...', width / 2, height / 2);
//             return;
//         }

//         const minRTP = Math.min(...prices);
//         const maxRTP = Math.max(...prices);
//         const padding = (maxRTP - minRTP) * 0.1;
//         const yMinDynamic = Math.max(0, minRTP - padding);
//         const yMaxDynamic = Math.min(100, maxRTP + padding);
//         const yRange = (yMaxDynamic - yMinDynamic) || 1;

//         ctx.clearRect(0, 0, width, height);

//         ctx.strokeStyle = 'rgba(0,255,247,0.2)';
//         ctx.lineWidth = 0.5;
//         const gridXStep = width / 10;
//         const gridYStep = height / 5;
//         for (let i = 1; i < 10; i++) {
//             ctx.beginPath();
//             ctx.moveTo(i * gridXStep, 0);
//             ctx.lineTo(i * gridXStep, height);
//             ctx.stroke();
//         }
//         for (let i = 1; i < 5; i++) {
//             ctx.beginPath();
//             ctx.moveTo(0, i * gridYStep);
//             ctx.lineTo(width, i * gridYStep);
//             ctx.stroke();
//         }

//         ctx.strokeStyle = '#959595ff';
//         ctx.lineWidth = 1.5;
//         ctx.beginPath();
//         ctx.moveTo(5, 0);
//         ctx.lineTo(5, height);
//         ctx.stroke();
//         ctx.beginPath();
//         ctx.moveTo(0, height - 5);
//         ctx.lineTo(width, height - 5);
//         ctx.stroke();

//         ctx.fillStyle = '#00ffffff';
//         ctx.font = `10px sans-serif`;
//         ctx.textAlign = 'left';
//         const yLabels = [yMinDynamic, yMinDynamic + yRange * 0.25, yMinDynamic + yRange * 0.5, yMinDynamic + yRange * 0.75, yMaxDynamic];
//         yLabels.forEach(label => {
//             const y = height - ((label - yMinDynamic) / yRange) * height;
//             ctx.fillText(label.toFixed(0), 10, y);
//         });

//         const xStep = width / (prices.length - 1);
//         const gradient = ctx.createLinearGradient(0, 0, 0, height);
//         const topShadowColor = (prices[prices.length - 1] >= 50) ? 'rgba(0,255,183,0.78)' : 'rgba(255,0,0,0.75)';
//         gradient.addColorStop(0, topShadowColor);
//         gradient.addColorStop(1, 'rgba(28,28,28,0)');
//         ctx.fillStyle = gradient;
//         ctx.beginPath();
//         ctx.moveTo(0, height);
//         for (let i = 0; i < prices.length; i++) {
//             const x = i * xStep;
//             const y = height - ((prices[i] - yMinDynamic) / yRange) * height;
//             ctx.lineTo(x, y);
//         }
//         ctx.lineTo(width, height);
//         ctx.closePath();
//         ctx.fill();

//         ctx.lineWidth = 1.5;
//         ctx.shadowBlur = 100;
//         for (let i = 0; i < prices.length - 1; i++) {
//             const x1 = i * xStep;
//             const y1 = height - ((prices[i] - yMinDynamic) / yRange) * height;
//             const x2 = (i + 1) * xStep;
//             const y2 = height - ((prices[i + 1] - yMinDynamic) / yRange) * height;
//             ctx.strokeStyle = (prices[i + 1] >= 50) ? '#00ffe5ff' : '#b90000ff';
//             ctx.shadowColor = ctx.strokeStyle;
//             ctx.beginPath();
//             ctx.moveTo(x1, y1);
//             ctx.lineTo(x2, y2);
//             ctx.stroke();
//         }
//         ctx.shadowBlur = 0;

//         const lastX = (prices.length - 1) * xStep;
//         const lastY = height - ((prices[prices.length - 1] - yMinDynamic) / yRange) * height;
//         ctx.fillStyle = '#ffffff';
//         ctx.beginPath();
//         ctx.arc(lastX, lastY, 3, 0, 2 * Math.PI);
//         ctx.fill();

//         ctx.fillStyle = '#ffffff';
//         ctx.font = `bold 13px sans-serif`;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'bottom';
//         let textX = lastX;
//         let textY = lastY - 8;
//         if (textX < 20) textX = 20;
//         if (textX > width - 20) textX = width - 20;
//         if (textY < 20) textY = 20;
//         ctx.fillText(`${prices[prices.length - 1].toFixed(1)}%`, textX, textY);
//     }

//     // --- Оновлення DOM та модального вікна ---
//     function updateData(gameId, data) {
//         const state = states[gameId];
//         Object.assign(state, data); // Оновлення стану з даних Firebase

//         const prices = state.prices;
//         drawChart(gameId, prices);

//         const container = document.getElementById(`tradingChart_${gameId}`).closest('.slot-item');
//         const currentRTPElement = container.querySelector('.currentRTP');
//         const averageRTPElement = container.querySelector('.averageRTP');

//         const totalRTP = prices.reduce((sum, p) => sum + p, 0);
//         const averageRTP = totalRTP / prices.length;

//         currentRTPElement.textContent = `${prices[prices.length - 1].toFixed(2)}%`;
//         averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
        
//         if (modals[gameId].modalElement.style.display === 'block') {
//             updateModalData(gameId);
//         }
//     }

//     function updateModalData(gameId) {
//         const state = states[gameId];
//         const prices = state.prices;
//         const modal = modals[gameId];

//         const currentRTP = prices[prices.length - 1];
//         const averageRTP = prices.reduce((sum, p) => sum + p, 0) / prices.length;
        
//         modal.currentRTPElement.textContent = `${currentRTP.toFixed(2)}%`;
//         modal.averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         modal.lastBigWinElement.textContent = lastBigWinAmounts[gameId];
//         modal.booksFrequencyElement.textContent = `${(Math.random() * (25 - 5) + 5).toFixed(1)}%`;
//         modal.longestStreakElement.textContent = state.longestStreakValue;
//         modal.bonusProbabilityElement.textContent = `${state.bonusProbabilityValue.toFixed(1)}%`;
//         modal.activePlayersElement.textContent = state.activePlayersValue;
//         modal.lastJackpotTimeElement.textContent = lastJackpotAmounts[gameId];
//     }

//     // --- Запуск ---
//     games.forEach((game) => {
//         const dbRef = ref(db, `games/${game.id}`);
//         onValue(dbRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 updateData(game.id, data);
//             }
//         });
//     });

// });



// import { games } from "/js/games-data.js"; 
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// document.addEventListener('DOMContentLoaded', () => {

//     const firebaseConfig = {
//         apiKey: "AIzaSyDVEhuyqT3JQRIF7tHFpDCKe1lYzf0WbYs",
//         authDomain: "analizatot-slots.firebaseapp.com",
//         projectId: "analizatot-slots",
//         storageBucket: "analizatot-slots.firebasestorage.app",
//         messagingSenderId: "1019195914545",
//         appId: "1:1019195914545:web:7f2974395cc1dd17b01810",
//         measurementId: "G-HVW128CCQS"
//     };

//     const app = initializeApp(firebaseConfig);
//     const db = getDatabase(app);

//     const states = {};
//     const modals = {};

//     // --- Ініціалізація DOM-елементів для модальних вікон ---
//     games.forEach((game) => {
//         states[game.id] = {
//             prices: [],
//             longestStreakValue: 9,
//             bonusProbabilityValue: 5.0,
//             lastBigWinTime: '--',
//             activePlayersValue: 0,
//             lastJackpotTime: '--'
//         };

//         modals[game.id] = {
//             currentRTPElement: document.getElementById(`modal_currentRTP_${game.id}`),
//             averageRTPElement: document.getElementById(`modal_averageRTP_${game.id}`),
//             lastBigWinElement: document.getElementById(`lastBigWin_${game.id}`),
//             booksFrequencyElement: document.getElementById(`booksFrequency_${game.id}`),
//             longestStreakElement: document.getElementById(`longestStreak_${game.id}`),
//             bonusProbabilityElement: document.getElementById(`bonusProbability_${game.id}`),
//             activePlayersElement: document.getElementById(`activePlayers_${game.id}`),
//             lastJackpotTimeElement: document.getElementById(`lastJackpotTime_${game.id}`),
//             modalElement: document.getElementById(`modal_${game.id}`)
//         };

//         const moreInfoBtn = document.querySelector(`.list_slots button[data-game="${game.id}"]`);
//         if (moreInfoBtn) {
//             moreInfoBtn.addEventListener('click', () => {
//                 modals[game.id].modalElement.style.display = 'block';
//                 updateModalData(game.id);
//             });
//         }

//         const closeBtn = modals[game.id].modalElement.querySelector('.close-button');
//         closeBtn.addEventListener('click', () => {
//             modals[game.id].modalElement.style.display = 'none';
//         });

//         modals[game.id].modalElement.addEventListener('click', (e) => {
//             if (e.target === modals[game.id].modalElement) {
//                 modals[game.id].modalElement.style.display = 'none';
//             }
//         });
//     });

//     // --- Функція для форматування валюти ---
//     function formatCurrency(amount) {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 0
//         }).format(amount);
//     }

//     // --- Змінні для зберігання сум джекпотів для кожної гри ---
//     const lastBigWinAmounts = {
//         "book_of_ra": formatCurrency(Math.floor(Math.random() * 5000) + 1000),
//         "lucky_lady": formatCurrency(Math.floor(Math.random() * 5000) + 1000)
//     };
//     const lastJackpotAmounts = {
//         "book_of_ra": formatCurrency(Math.floor(Math.random() * 100000) + 50000),
//         "lucky_lady": formatCurrency(Math.floor(Math.random() * 100000) + 50000)
//     };

//     // Оновлення "Останнього великого виграшу" кожні 20 хвилин
//     setInterval(() => {
//         games.forEach(game => {
//             lastBigWinAmounts[game.id] = formatCurrency(Math.floor(Math.random() * 5000) + 1000);
//             if (modals[game.id].modalElement.style.display === 'block') {
//                 modals[game.id].lastBigWinElement.textContent = lastBigWinAmounts[game.id];
//             }
//         });
//     }, 20 * 60 * 1000);

//     // Оновлення "Останнього джекпота" кожні 2 години
//     setInterval(() => {
//         games.forEach(game => {
//             lastJackpotAmounts[game.id] = formatCurrency(Math.floor(Math.random() * 100000) + 50000);
//             if (modals[game.id].modalElement.style.display === 'block') {
//                 modals[game.id].lastJackpotTimeElement.textContent = lastJackpotAmounts[game.id];
//             }
//         });
//     }, 2 * 60 * 60 * 1000);

//     // --- Малювання графіка на основі отриманих даних ---
//     function drawChart(gameId, prices) {
//         const canvas = document.getElementById(`tradingChart_${gameId}`);
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         const state = states[gameId];

//         const width = canvas.clientWidth;
//         const height = canvas.clientHeight;
//         const Dpr = window.devicePixelRatio || 1;
//         canvas.width = Math.max(1, Math.floor(width * Dpr));
//         canvas.height = Math.max(1, Math.floor(height * Dpr));
//         ctx.setTransform(1, 0, 0, 1, 0, 0);
//         ctx.scale(Dpr, Dpr);

//         if (!prices || prices.length === 0) {
//             ctx.clearRect(0, 0, width, height);
//             ctx.fillStyle = '#ffffff';
//             ctx.font = `bold 16px sans-serif`;
//             ctx.textAlign = 'center';
//             ctx.fillText('Завантаження даних...', width / 2, height / 2);
//             return;
//         }

//         const minRTP = Math.min(...prices);
//         const maxRTP = Math.max(...prices);
//         const padding = (maxRTP - minRTP) * 0.1;
//         const yMinDynamic = Math.max(0, minRTP - padding);
//         const yMaxDynamic = Math.min(100, maxRTP + padding);
//         const yRange = (yMaxDynamic - yMinDynamic) || 1;

//         ctx.clearRect(0, 0, width, height);

//         ctx.strokeStyle = 'rgba(0,255,247,0.2)';
//         ctx.lineWidth = 0.5;
//         const gridXStep = width / 10;
//         const gridYStep = height / 5;
//         for (let i = 1; i < 10; i++) {
//             ctx.beginPath();
//             ctx.moveTo(i * gridXStep, 0);
//             ctx.lineTo(i * gridXStep, height);
//             ctx.stroke();
//         }
//         for (let i = 1; i < 5; i++) {
//             ctx.beginPath();
//             ctx.moveTo(0, i * gridYStep);
//             ctx.lineTo(width, i * gridYStep);
//             ctx.stroke();
//         }

//         ctx.strokeStyle = '#959595ff';
//         ctx.lineWidth = 1.5;
//         ctx.beginPath();
//         ctx.moveTo(5, 0);
//         ctx.lineTo(5, height);
//         ctx.stroke();
//         ctx.beginPath();
//         ctx.moveTo(0, height - 5);
//         ctx.lineTo(width, height - 5);
//         ctx.stroke();

//         ctx.fillStyle = '#00ffffff';
//         ctx.font = `10px sans-serif`;
//         ctx.textAlign = 'left';
//         const yLabels = [yMinDynamic, yMinDynamic + yRange * 0.25, yMinDynamic + yRange * 0.5, yMinDynamic + yRange * 0.75, yMaxDynamic];
//         yLabels.forEach(label => {
//             const y = height - ((label - yMinDynamic) / yRange) * height;
//             ctx.fillText(label.toFixed(0), 10, y);
//         });

//         const xStep = width / (prices.length - 1);
//         const gradient = ctx.createLinearGradient(0, 0, 0, height);
//         const topShadowColor = (prices[prices.length - 1] >= 50) ? 'rgba(0,255,183,0.78)' : 'rgba(255,0,0,0.75)';
//         gradient.addColorStop(0, topShadowColor);
//         gradient.addColorStop(1, 'rgba(28,28,28,0)');
//         ctx.fillStyle = gradient;
//         ctx.beginPath();
//         ctx.moveTo(0, height);
//         for (let i = 0; i < prices.length; i++) {
//             const x = i * xStep;
//             const y = height - ((prices[i] - yMinDynamic) / yRange) * height;
//             ctx.lineTo(x, y);
//         }
//         ctx.lineTo(width, height);
//         ctx.closePath();
//         ctx.fill();

//         ctx.lineWidth = 1.5;
//         ctx.shadowBlur = 100;
//         for (let i = 0; i < prices.length - 1; i++) {
//             const x1 = i * xStep;
//             const y1 = height - ((prices[i] - yMinDynamic) / yRange) * height;
//             const x2 = (i + 1) * xStep;
//             const y2 = height - ((prices[i + 1] - yMinDynamic) / yRange) * height;
//             ctx.strokeStyle = (prices[i + 1] >= 50) ? '#00ffe5ff' : '#b90000ff';
//             ctx.shadowColor = ctx.strokeStyle;
//             ctx.beginPath();
//             ctx.moveTo(x1, y1);
//             ctx.lineTo(x2, y2);
//             ctx.stroke();
//         }
//         ctx.shadowBlur = 0;

//         const lastX = (prices.length - 1) * xStep;
//         const lastY = height - ((prices[prices.length - 1] - yMinDynamic) / yRange) * height;
//         ctx.fillStyle = '#ffffff';
//         ctx.beginPath();
//         ctx.arc(lastX, lastY, 3, 0, 2 * Math.PI);
//         ctx.fill();

//         ctx.fillStyle = '#ffffff';
//         ctx.font = `bold 13px sans-serif`;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'bottom';
//         let textX = lastX;
//         let textY = lastY - 8;
//         if (textX < 20) textX = 20;
//         if (textX > width - 20) textX = width - 20;
//         if (textY < 20) textY = 20;
//         ctx.fillText(`${prices[prices.length - 1].toFixed(1)}%`, textX, textY);
//     }

//     // --- Оновлення DOM та модального вікна ---
//     function updateData(gameId, data) {
//         const state = states[gameId];
//         Object.assign(state, data); // Оновлення стану з даних Firebase

//         const prices = state.prices;
//         drawChart(gameId, prices);

//         const container = document.getElementById(`tradingChart_${gameId}`).closest('.slot-item');
//         const currentRTPElement = container.querySelector('.currentRTP');
//         const averageRTPElement = container.querySelector('.averageRTP');

//         const totalRTP = prices.reduce((sum, p) => sum + p, 0);
//         const averageRTP = totalRTP / prices.length;

//         currentRTPElement.textContent = `${prices[prices.length - 1].toFixed(2)}%`;
//         averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         
//         if (modals[game.id].modalElement.style.display === 'block') {
//             updateModalData(game.id);
//         }
//     }

//     function updateModalData(gameId) {
//         const state = states[gameId];
//         const prices = state.prices;
//         const modal = modals[gameId];

//         const currentRTP = prices[prices.length - 1];
//         const averageRTP = prices.reduce((sum, p) => sum + p, 0) / prices.length;
//         
//         modal.currentRTPElement.textContent = `${currentRTP.toFixed(2)}%`;
//         modal.averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         modal.lastBigWinElement.textContent = lastBigWinAmounts[gameId];
//         modal.booksFrequencyElement.textContent = `${(Math.random() * (25 - 5) + 5).toFixed(1)}%`;
//         modal.longestStreakElement.textContent = state.longestStreakValue;
//         modal.bonusProbabilityElement.textContent = `${state.bonusProbabilityValue.toFixed(1)}%`;
//         modal.activePlayersElement.textContent = state.activePlayersValue;
//         modal.lastJackpotTimeElement.textContent = lastJackpotAmounts[gameId];
//     }

//     // --- Запуск ---
//     games.forEach((game) => {
//         const dbRef = ref(db, `games/${game.id}`);
//         onValue(dbRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 updateData(game.id, data);
//             }
//         });
//     });

// });


// import { games } from "/games-data.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// document.addEventListener('DOMContentLoaded', () => {

//     const firebaseConfig = {
//         apiKey: "AIzaSyDVEhuyqT3JQRIF7tHFpDCKe1lYzf0WbYs",
//         authDomain: "analizatot-slots.firebaseapp.com",
//         projectId: "analizatot-slots",
//         storageBucket: "analizatot-slots.firebasestorage.app",
//         messagingSenderId: "1019195914545",
//         appId: "1:1019195914545:web:7f2974395cc1dd17b01810",
//         measurementId: "G-HVW128CCQS"
//     };

//     const app = initializeApp(firebaseConfig);
//     const db = getDatabase(app);

//     const states = {};
//     const modals = {};

//     // --- Допоміжна функція для пошуку об'єкта гри за ID ---
//     function getGameById(id) {
//         return games.find(game => game.id === id);
//     }

//     // --- Ініціалізація DOM-елементів для модальних вікон ---
//     games.forEach((game) => {
//         states[game.id] = {
//             prices: [],
//             longestStreakValue: 9,
//             bonusProbabilityValue: 5.0,
//             lastBigWinTime: '--',
//             activePlayersValue: 0,
//             lastJackpotTime: '--'
//         };

//         modals[game.id] = {
//             currentRTPElement: document.getElementById(`modal_currentRTP_${game.id}`),
//             averageRTPElement: document.getElementById(`modal_averageRTP_${game.id}`),
//             lastBigWinElement: document.getElementById(`lastBigWin_${game.id}`),
//             booksFrequencyElement: document.getElementById(`booksFrequency_${game.id}`),
//             longestStreakElement: document.getElementById(`longestStreak_${game.id}`),
//             bonusProbabilityElement: document.getElementById(`bonusProbability_${game.id}`),
//             activePlayersElement: document.getElementById(`activePlayers_${game.id}`),
//             lastJackpotTimeElement: document.getElementById(`lastJackpotTime_${game.id}`),
//             modalElement: document.getElementById(`modal_${game.id}`)
//         };

//         const moreInfoBtn = document.querySelector(`.list_slots button[data-game="${game.id}"]`);
//         if (moreInfoBtn) {
//             moreInfoBtn.addEventListener('click', () => {
//                 modals[game.id].modalElement.style.display = 'block';
//                 updateModalData(game.id);
//             });
//         }

//         const closeBtn = modals[game.id].modalElement.querySelector('.close-button');
//         closeBtn.addEventListener('click', () => {
//             modals[game.id].modalElement.style.display = 'none';
//         });

//         modals[game.id].modalElement.addEventListener('click', (e) => {
//             if (e.target === modals[game.id].modalElement) {
//                 modals[game.id].modalElement.style.display = 'none';
//             }
//         });
//     });

//     // --- Функція для форматування валюти ---
//     function formatCurrency(amount) {
//         return new Intl.NumberFormat('en-US', {
//             style: 'currency',
//             currency: 'USD',
//             minimumFractionDigits: 0
//         }).format(amount);
//     }

//     // --- Змінні для зберігання сум джекпотів для кожної гри ---
//     const lastBigWinAmounts = {
//         "book_of_ra": formatCurrency(Math.floor(Math.random() * 5000) + 1000),
//         "lucky_lady": formatCurrency(Math.floor(Math.random() * 5000) + 1000),
//         "sizzling_hot": formatCurrency(Math.floor(Math.random() * 5000) + 1000),
//         "gonzos_quest": formatCurrency(Math.floor(Math.random() * 5000) + 1000)
//     };
//     const lastJackpotAmounts = {
//         "book_of_ra": formatCurrency(Math.floor(Math.random() * 100000) + 50000),
//         "lucky_lady": formatCurrency(Math.floor(Math.random() * 100000) + 50000),
//         "sizzling_hot": formatCurrency(Math.floor(Math.random() * 100000) + 50000),
//         "gonzos_quest": formatCurrency(Math.floor(Math.random() * 100000) + 50000)
//     };

//     // Оновлення "Останнього великого виграшу" кожні 20 хвилин
//     setInterval(() => {
//         games.forEach(game => {
//             lastBigWinAmounts[game.id] = formatCurrency(Math.floor(Math.random() * 5000) + 1000);
//             if (modals[game.id].modalElement.style.display === 'block') {
//                 modals[game.id].lastBigWinElement.textContent = lastBigWinAmounts[game.id];
//             }
//         });
//     }, 20 * 60 * 1000);

//     // Оновлення "Останнього джекпота" кожні 2 години
//     setInterval(() => {
//         games.forEach(game => {
//             lastJackpotAmounts[game.id] = formatCurrency(Math.floor(Math.random() * 100000) + 50000);
//             if (modals[game.id].modalElement.style.display === 'block') {
//                 modals[game.id].lastJackpotTimeElement.textContent = lastJackpotAmounts[game.id];
//             }
//         });
//     }, 2 * 60 * 60 * 1000);

//     // --- Малювання графіка на основі отриманих даних ---
//     function drawChart(gameId, prices) {
//         const canvas = document.getElementById(`tradingChart_${gameId}`);
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         const state = states[gameId];

//         const width = canvas.clientWidth;
//         const height = canvas.clientHeight;
//         const Dpr = window.devicePixelRatio || 1;
//         canvas.width = Math.max(1, Math.floor(width * Dpr));
//         canvas.height = Math.max(1, Math.floor(height * Dpr));
//         ctx.setTransform(1, 0, 0, 1, 0, 0);
//         ctx.scale(Dpr, Dpr);

//         if (!prices || prices.length === 0) {
//             ctx.clearRect(0, 0, width, height);
//             ctx.fillStyle = '#ffffff';
//             ctx.font = `bold 16px sans-serif`;
//             ctx.textAlign = 'center';
//             ctx.fillText('Завантаження даних...', width / 2, height / 2);
//             return;
//         }

//         const minRTP = Math.min(...prices);
//         const maxRTP = Math.max(...prices);
//         const padding = (maxRTP - minRTP) * 0.1;
//         const yMinDynamic = Math.max(0, minRTP - padding);
//         const yMaxDynamic = Math.min(100, maxRTP + padding);
//         const yRange = (yMaxDynamic - yMinDynamic) || 1;

//         ctx.clearRect(0, 0, width, height);

//         ctx.strokeStyle = 'rgba(0,255,247,0.2)';
//         ctx.lineWidth = 0.5;
//         const gridXStep = width / 10;
//         const gridYStep = height / 5;
//         for (let i = 1; i < 10; i++) {
//             ctx.beginPath();
//             ctx.moveTo(i * gridXStep, 0);
//             ctx.lineTo(i * gridXStep, height);
//             ctx.stroke();
//         }
//         for (let i = 1; i < 5; i++) {
//             ctx.beginPath();
//             ctx.moveTo(0, i * gridYStep);
//             ctx.lineTo(width, i * gridYStep);
//             ctx.stroke();
//         }

//         ctx.strokeStyle = '#959595ff';
//         ctx.lineWidth = 1.5;
//         ctx.beginPath();
//         ctx.moveTo(5, 0);
//         ctx.lineTo(5, height);
//         ctx.stroke();
//         ctx.beginPath();
//         ctx.moveTo(0, height - 5);
//         ctx.lineTo(width, height - 5);
//         ctx.stroke();

//         ctx.fillStyle = '#00ffffff';
//         ctx.font = `10px sans-serif`;
//         ctx.textAlign = 'left';
//         const yLabels = [yMinDynamic, yMinDynamic + yRange * 0.25, yMinDynamic + yRange * 0.5, yMinDynamic + yRange * 0.75, yMaxDynamic];
//         yLabels.forEach(label => {
//             const y = height - ((label - yMinDynamic) / yRange) * height;
//             ctx.fillText(label.toFixed(0), 10, y);
//         });

//         const xStep = width / (prices.length - 1);
//         const gradient = ctx.createLinearGradient(0, 0, 0, height);
//         const topShadowColor = (prices[prices.length - 1] >= 50) ? 'rgba(0,255,183,0.78)' : 'rgba(255,0,0,0.75)';
//         gradient.addColorStop(0, topShadowColor);
//         gradient.addColorStop(1, 'rgba(28,28,28,0)');
//         ctx.fillStyle = gradient;
//         ctx.beginPath();
//         ctx.moveTo(0, height);
//         for (let i = 0; i < prices.length; i++) {
//             const x = i * xStep;
//             const y = height - ((prices[i] - yMinDynamic) / yRange) * height;
//             ctx.lineTo(x, y);
//         }
//         ctx.lineTo(width, height);
//         ctx.closePath();
//         ctx.fill();

//         ctx.lineWidth = 1.5;
//         ctx.shadowBlur = 100;
//         for (let i = 0; i < prices.length - 1; i++) {
//             const x1 = i * xStep;
//             const y1 = height - ((prices[i] - yMinDynamic) / yRange) * height;
//             const x2 = (i + 1) * xStep;
//             const y2 = height - ((prices[i + 1] - yMinDynamic) / yRange) * height;
//             ctx.strokeStyle = (prices[i + 1] >= 50) ? '#00ffe5ff' : '#b90000ff';
//             ctx.shadowColor = ctx.strokeStyle;
//             ctx.beginPath();
//             ctx.moveTo(x1, y1);
//             ctx.lineTo(x2, y2);
//             ctx.stroke();
//         }
//         ctx.shadowBlur = 0;

//         const lastX = (prices.length - 1) * xStep;
//         const lastY = height - ((prices[prices.length - 1] - yMinDynamic) / yRange) * height;
//         ctx.fillStyle = '#ffffff';
//         ctx.beginPath();
//         ctx.arc(lastX, lastY, 3, 0, 2 * Math.PI);
//         ctx.fill();

//         ctx.fillStyle = '#ffffff';
//         ctx.font = `bold 13px sans-serif`;
//         ctx.textAlign = 'center';
//         ctx.textBaseline = 'bottom';
//         let textX = lastX;
//         let textY = lastY - 8;
//         if (textX < 20) textX = 20;
//         if (textX > width - 20) textX = width - 20;
//         if (textY < 20) textY = 20;
//         ctx.fillText(`${prices[prices.length - 1].toFixed(1)}%`, textX, textY);
//     }

//     // --- Оновлення DOM та модального вікна ---
//     function updateData(gameId, data) {
//         const state = states[gameId];
//         Object.assign(state, data); // Оновлення стану з даних Firebase

//         const prices = state.prices;
//         drawChart(gameId, prices);

//         const container = document.getElementById(`tradingChart_${gameId}`).closest('.slot-item');
//         const currentRTPElement = container.querySelector('.currentRTP');
//         const averageRTPElement = container.querySelector('.averageRTP');

//         const totalRTP = prices.reduce((sum, p) => sum + p, 0);
//         const averageRTP = totalRTP / prices.length;

//         currentRTPElement.textContent = `${prices[prices.length - 1].toFixed(2)}%`;
//         averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
        
//         if (modals[gameId].modalElement.style.display === 'block') {
//             updateModalData(gameId);
//         }
//     }

//     function updateModalData(gameId) {
//         const state = states[gameId];
//         const prices = state.prices;
//         const modal = modals[gameId];
        
//         const currentRTP = prices[prices.length - 1];
//         const averageRTP = prices.reduce((sum, p) => sum + p, 0) / prices.length;
        
//         modal.currentRTPElement.textContent = `${currentRTP.toFixed(2)}%`;
//         modal.averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
//         modal.lastBigWinElement.textContent = lastBigWinAmounts[gameId];
//         modal.booksFrequencyElement.textContent = `${(Math.random() * (25 - 5) + 5).toFixed(1)}%`;
//         modal.longestStreakElement.textContent = state.longestStreakValue;
//         modal.bonusProbabilityElement.textContent = `${state.bonusProbabilityValue.toFixed(1)}%`;
//         modal.activePlayersElement.textContent = state.activePlayersValue;
//         modal.lastJackpotTimeElement.textContent = lastJackpotAmounts[gameId];
//     }

//     // --- Запуск ---
//     games.forEach((game) => {
//         const dbRef = ref(db, `games/${game.id}`);
//         onValue(dbRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 // Виправлено: передаємо game.id, а не game
//                 updateData(game.id, data);
//             }
//         });
//     });

// });

import { games } from "/games-data.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDVEhuyqT3JQRIF7tHFpDCKe1lYzf0WbYs",
    authDomain: "analizatot-slots.firebaseapp.com",
    projectId: "analizatot-slots",
    storageBucket: "analizatot-slots.firebasestorage.app",
    messagingSenderId: "1019195914545",
    appId: "1:1019195914545:web:7f2974395cc1dd17b01810",
    measurementId: "G-HVW128CCQS",
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const states = {};

  // --- Форматування валюти ---
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  }

  // --- Дані для виграшів з LocalStorage ---
  const lastBigWinAmounts = {};
  const lastJackpotAmounts = {};

  const now = Date.now();

  games.forEach((game) => {
    states[game.id] = {
      prices: [],
      longestStreakValue: 9,
      bonusProbabilityValue: 5.0,
      activePlayersValue: 0,
    };

    // lastBigWin (оновлювати раз на 20 хв)
    let storedBigWin = JSON.parse(localStorage.getItem(`lastBigWin_${game.id}`));
    if (!storedBigWin || now - storedBigWin.time > 20 * 60 * 1000) {
      storedBigWin = { value: formatCurrency(Math.floor(Math.random() * 5000) + 1000), time: now };
      localStorage.setItem(`lastBigWin_${game.id}`, JSON.stringify(storedBigWin));
    }
    lastBigWinAmounts[game.id] = storedBigWin.value;

    // lastJackpot (оновлювати раз на 2 години)
    let storedJackpot = JSON.parse(localStorage.getItem(`lastJackpot_${game.id}`));
    if (!storedJackpot || now - storedJackpot.time > 2 * 60 * 60 * 1000) {
      storedJackpot = { value: formatCurrency(Math.floor(Math.random() * 100000) + 50000), time: now };
      localStorage.setItem(`lastJackpot_${game.id}`, JSON.stringify(storedJackpot));
    }
    lastJackpotAmounts[game.id] = storedJackpot.value;

    // кнопка переходу на сторінку more_info.html
    const btn = document.querySelector(`.list_slots button[data-game="${game.id}"]`);
    if (btn) {
      btn.addEventListener("click", () => {
        window.location.href = `more_info.html?game=${game.id}`;
      });
    }
  });

  // --- Функція для малювання графіка ---
  function drawChart(gameId, prices) {
    const canvas = document.getElementById(`tradingChart_${gameId}`);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const Dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(width * Dpr));
    canvas.height = Math.max(1, Math.floor(height * Dpr));
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(Dpr, Dpr);

    if (!prices || prices.length === 0) {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold 16px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("Завантаження даних...", width / 2, height / 2);
      return;
    }

    const minRTP = Math.min(...prices);
    const maxRTP = Math.max(...prices);
    const padding = (maxRTP - minRTP) * 0.1;
    const yMinDynamic = Math.max(0, minRTP - padding);
    const yMaxDynamic = Math.min(100, maxRTP + padding);
    const yRange = yMaxDynamic - yMinDynamic || 1;

    ctx.clearRect(0, 0, width, height);

    // сітка
    ctx.strokeStyle = "rgba(0,255,247,0.2)";
    ctx.lineWidth = 0.5;
    const gridXStep = width / 10;
    const gridYStep = height / 5;
    for (let i = 1; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridXStep, 0);
      ctx.lineTo(i * gridXStep, height);
      ctx.stroke();
    }
    for (let i = 1; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * gridYStep);
      ctx.lineTo(width, i * gridYStep);
      ctx.stroke();
    }

    // осі
    ctx.strokeStyle = "#959595ff";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(5, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, height - 5);
    ctx.lineTo(width, height - 5);
    ctx.stroke();

    // підписи
    ctx.fillStyle = "#00ffffff";
    ctx.font = `10px sans-serif`;
    ctx.textAlign = "left";
    const yLabels = [
      yMinDynamic,
      yMinDynamic + yRange * 0.25,
      yMinDynamic + yRange * 0.5,
      yMinDynamic + yRange * 0.75,
      yMaxDynamic,
    ];
    yLabels.forEach((label) => {
      const y = height - ((label - yMinDynamic) / yRange) * height;
      ctx.fillText(label.toFixed(0), 10, y);
    });

    // графік
    const xStep = width / (prices.length - 1);
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    const topShadowColor =
      prices[prices.length - 1] >= 50 ? "rgba(0,255,183,0.78)" : "rgba(255,0,0,0.75)";
    gradient.addColorStop(0, topShadowColor);
    gradient.addColorStop(1, "rgba(28,28,28,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let i = 0; i < prices.length; i++) {
      const x = i * xStep;
      const y = height - ((prices[i] - yMinDynamic) / yRange) * height;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 100;
    for (let i = 0; i < prices.length - 1; i++) {
      const x1 = i * xStep;
      const y1 = height - ((prices[i] - yMinDynamic) / yRange) * height;
      const x2 = (i + 1) * xStep;
      const y2 = height - ((prices[i + 1] - yMinDynamic) / yRange) * height;
      ctx.strokeStyle = prices[i + 1] >= 50 ? "#00ffe5ff" : "#b90000ff";
      ctx.shadowColor = ctx.strokeStyle;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    const lastX = (prices.length - 1) * xStep;
    const lastY = height - ((prices[prices.length - 1] - yMinDynamic) / yRange) * height;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(lastX, lastY, 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold 13px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    let textX = lastX;
    let textY = lastY - 8;
    if (textX < 20) textX = 20;
    if (textX > width - 20) textX = width - 20;
    if (textY < 20) textY = 20;
    ctx.fillText(`${prices[prices.length - 1].toFixed(1)}%`, textX, textY);
  }

  // --- Оновлення даних ---
  function updateData(gameId, data) {
    const state = states[gameId];
    Object.assign(state, data);

    const prices = state.prices;
    drawChart(gameId, prices);

    // оновлюємо картки на головній
    const canvas = document.getElementById(`tradingChart_${gameId}`);
    if (canvas) {
      const container = canvas.closest(".slot-item");
      if (container) {
        const currentRTPElement = container.querySelector(".currentRTP");
        const averageRTPElement = container.querySelector(".averageRTP");

        if (currentRTPElement && averageRTPElement && prices.length > 0) {
          const totalRTP = prices.reduce((sum, p) => sum + p, 0);
          const averageRTP = totalRTP / prices.length;

          currentRTPElement.textContent = `${prices[prices.length - 1].toFixed(2)}%`;
          averageRTPElement.textContent = `${averageRTP.toFixed(2)}%`;
        }
      }
    }

    // оновлюємо more_info.html
    const detailsContainer = document.querySelector(".game-details-container");
    if (detailsContainer) {
      const urlParams = new URLSearchParams(window.location.search);
      const currentGameId = urlParams.get("game");
      if (currentGameId === gameId && prices.length > 0) {
        document.getElementById(`modal_currentRTP_${gameId}`).textContent =
          `${prices[prices.length - 1].toFixed(2)}%`;
        document.getElementById(`modal_averageRTP_${gameId}`).textContent =
          `${(prices.reduce((sum, p) => sum + p, 0) / prices.length).toFixed(2)}%`;

        document.getElementById(`lastBigWin_${gameId}`).textContent = lastBigWinAmounts[gameId];
        document.getElementById(`booksFrequency_${gameId}`).textContent =
          `${(Math.random() * (25 - 5) + 5).toFixed(1)}%`;
        document.getElementById(`longestStreak_${gameId}`).textContent =
          state.longestStreakValue;
        document.getElementById(`bonusProbability_${gameId}`).textContent =
          `${state.bonusProbabilityValue.toFixed(1)}%`;
        document.getElementById(`activePlayers_${gameId}`).textContent =
          state.activePlayersValue;
        document.getElementById(`lastJackpotTime_${gameId}`).textContent =
          lastJackpotAmounts[gameId];
      }
    }
  }

  // --- Firebase ---
  games.forEach((game) => {
    const dbRef = ref(db, `games/${game.id}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        updateData(game.id, data);
      }
    });
  });
});
