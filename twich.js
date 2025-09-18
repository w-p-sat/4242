// let streams = [];
// let offset = 0;
// const limit = 5;
// let currentLang = "";

// // Завантаження стрімів з Railway сервера
// async function fetchStreams() {
//   try {
//     const response = await fetch(`https://serwerstream-production.up.railway.app/streams?lang=${currentLang}`);
//     const data = await response.json();

//     if (data.data) {
//       streams = data.data;
//       offset = 0;
//       document.getElementById("streams-container").innerHTML = "";

//       if (streams.length === 0) {
//         // Якщо стрімів немає — показуємо повідомлення
//         document.getElementById("streams-container").innerHTML = `<p style="color:white; text-align:center; margin:20px;">Unfortunately, there are no streams available for this language.</p>`;
//         document.getElementById("loadMore").style.display = "none";
//       } else {
//         renderStreams();
//       }
//     }
//   } catch (error) {
//     console.error("Помилка завантаження стрімів:", error);
//     document.getElementById("streams-container").innerHTML = `<p style="color:red; text-align:center; margin:20px;">An error occurred while loading the streams.</p>`;
//   }
// }

// // Рендер по 5 стрімів
// function renderStreams() {
//   const container = document.getElementById("streams-container");
//   const slice = streams.slice(offset, offset + limit);

//   slice.forEach(stream => {
//     const div = document.createElement("div");
//     div.className = "stream";

//     div.innerHTML = `
//       <div class="preview" data-channel="${stream.user_login}" 
//            style="background-image:url(${stream.thumbnail_url.replace('{width}', '640').replace('{height}', '360')}?time=${Date.now()})">
//         ▶️ ${stream.user_name}
//       </div>
//     `;

//     div.querySelector(".preview").addEventListener("click", function() {
//       const channel = this.dataset.channel;
//       const iframeDiv = document.createElement("div");
//       iframeDiv.style.width = "100%";
//       iframeDiv.style.height = "360px";
//       this.replaceWith(iframeDiv);

//       new Twitch.Player(iframeDiv, {
//         channel: channel,
//         width: '100%',
//         height: '100%',
//         autoplay: true,
//         muted: false
//       });
//     });

//     container.appendChild(div);
//   });

//   offset += limit;

//   const loadMoreBtn = document.getElementById("loadMore");
//   loadMoreBtn.style.display = offset >= streams.length ? "none" : "block";
// }

// // Кнопка "Показати більше"
// document.getElementById("loadMore").addEventListener("click", renderStreams);

// // Кнопки мов
// document.querySelectorAll("#lang-buttons .btn").forEach(btn => {
//   btn.addEventListener("click", e => {
//     e.preventDefault();
//     currentLang = btn.dataset.lang;
//     fetchStreams();
//     highlightButton(btn);
//   });
// });

// function highlightButton(activeBtn) {
//   document.querySelectorAll("#lang-buttons .btn").forEach(btn => btn.classList.remove("active"));
//   activeBtn.classList.add("active");
// }

// // Старт
// window.addEventListener("DOMContentLoaded", () => {
//   const defaultBtn = document.querySelector('#lang-buttons .btn[data-lang=""]');
//   if (defaultBtn) highlightButton(defaultBtn);
//   fetchStreams();
// });


// let streams = [];
// let offset = 0;
// const limit = 5;
// let currentLang = "";

// // Завантаження стрімів з Railway сервера
// async function fetchStreams() {
//   try {
//     const response = await fetch(`https://serwerstream-production.up.railway.app/streams?lang=${currentLang}`);
//     const data = await response.json();

//     if (data.data) {
//       streams = data.data;
//       offset = 0;
//       document.getElementById("streams-container").innerHTML = "";

//       if (streams.length === 0) {
//         // Якщо стрімів немає — показуємо повідомлення
//         document.getElementById("streams-container").innerHTML = `<p style="color:white; text-align:center; margin:20px;">Unfortunately, there are no streams available for this language.</p>`;
//         document.getElementById("loadMore").style.display = "none";
//       } else {
//         renderStreams();
//       }
//     }
//   } catch (error) {
//     console.error("Помилка завантаження стрімів:", error);
//     document.getElementById("streams-container").innerHTML = `<p style="color:red; text-align:center; margin:20px;">An error occurred while loading the streams.</p>`;
//   }
// }

// // Рендер по 5 стрімів
// function renderStreams() {
//   const container = document.getElementById("streams-container");
//   const slice = streams.slice(offset, offset + limit);

//   slice.forEach(stream => {
//     const div = document.createElement("div");
//     div.className = "stream";

//     div.innerHTML = `
//       <div class="preview" data-channel="${stream.user_login}" 
//            style="background-image:url(${stream.thumbnail_url.replace('{width}', '640').replace('{height}', '360')}?time=${Date.now()});
//                   aspect-ratio: 16/9;
//                   background-size: cover;
//                   background-position: center;">
//         ▶️ ${stream.user_name}
//       </div>
//     `;

//     div.querySelector(".preview").addEventListener("click", function() {
//       const channel = this.dataset.channel;
//       const iframeDiv = document.createElement("div");
//       iframeDiv.style.width = "100%";
//       iframeDiv.style.aspectRatio = "16/9"; // замість фіксованої висоти
//       this.replaceWith(iframeDiv);

//       new Twitch.Player(iframeDiv, {
//         channel: channel,
//         width: '100%',
//         height: '100%',
//         autoplay: true,
//         muted: false
//       });
//     });

//     container.appendChild(div);
//   });

//   offset += limit;

//   const loadMoreBtn = document.getElementById("loadMore");
//   loadMoreBtn.style.display = offset >= streams.length ? "none" : "block";
// }

// // Кнопка "Показати більше"
// document.getElementById("loadMore").addEventListener("click", renderStreams);

// // Кнопки мов
// document.querySelectorAll("#lang-buttons .btn").forEach(btn => {
//   btn.addEventListener("click", e => {
//     e.preventDefault();
//     currentLang = btn.dataset.lang;
//     fetchStreams();
//     highlightButton(btn);
//   });
// });

// function highlightButton(activeBtn) {
//   document.querySelectorAll("#lang-buttons .btn").forEach(btn => btn.classList.remove("active"));
//   activeBtn.classList.add("active");
// }

// // Старт
// window.addEventListener("DOMContentLoaded", () => {
//   const defaultBtn = document.querySelector('#lang-buttons .btn[data-lang=""]');
//   if (defaultBtn) highlightButton(defaultBtn);
//   fetchStreams();
// });


let streams = [];
let offset = 0;
const limit = 5;
let currentLang = "";

// Завантаження стрімів з Railway сервера
async function fetchStreams() {
  try {
    const response = await fetch(`https://serwerstream-production.up.railway.app/streams?lang=${currentLang}`);
    const data = await response.json();

    if (data.data) {
      streams = data.data;
      offset = 0;
      document.getElementById("streams-container").innerHTML = "";

      if (streams.length === 0) {
        document.getElementById("streams-container").innerHTML = `<p style="color:white; text-align:center; margin:20px;">Unfortunately, there are no streams available for this language.</p>`;
        document.getElementById("loadMore").style.display = "none";
      } else {
        renderStreams();
      }
    }
  } catch (error) {
    console.error("Помилка завантаження стрімів:", error);
    document.getElementById("streams-container").innerHTML = `<p style="color:red; text-align:center; margin:20px;">An error occurred while loading the streams.</p>`;
  }
}

// Рендер по 5 стрімів
function renderStreams() {
  const container = document.getElementById("streams-container");
  const slice = streams.slice(offset, offset + limit);

  slice.forEach(stream => {
    const div = document.createElement("div");
    div.className = "stream";

    div.innerHTML = `
      <div class="preview" data-channel="${stream.user_login}" 
           style="background-image:url(${stream.thumbnail_url.replace('{width}', '640').replace('{height}', '360')}?time=${Date.now()})">
        ▶️ ${stream.user_name}
      </div>
    `;

    div.querySelector(".preview").addEventListener("click", function() {
      const channel = this.dataset.channel;

      // Створюємо iframe прямо в DOM, щоб fullscreen працював
const hostname = window.location.hostname; // localhost або твій домен
iframe.src = `https://player.twitch.tv/?channel=${channel}&parent=${hostname}`;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("webkitallowfullscreen", "");
      iframe.setAttribute("mozallowfullscreen", "");

      // Очищаємо див і вставляємо iframe
      this.replaceWith(iframe);

      // Задаємо висоту адаптивно під превью
      iframe.style.height = `${iframe.offsetWidth * 9 / 16}px`; // 16:9
      window.addEventListener("resize", () => {
        iframe.style.height = `${iframe.offsetWidth * 9 / 16}px`;
      });
    });

    container.appendChild(div);
  });

  offset += limit;

  const loadMoreBtn = document.getElementById("loadMore");
  loadMoreBtn.style.display = offset >= streams.length ? "none" : "block";
}

// Кнопка "Показати більше"
document.getElementById("loadMore").addEventListener("click", renderStreams);

// Кнопки мов
document.querySelectorAll("#lang-buttons .btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    currentLang = btn.dataset.lang;
    fetchStreams();
    highlightButton(btn);
  });
});

function highlightButton(activeBtn) {
  document.querySelectorAll("#lang-buttons .btn").forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// Старт
window.addEventListener("DOMContentLoaded", () => {
  const defaultBtn = document.querySelector('#lang-buttons .btn[data-lang=""]');
  if (defaultBtn) highlightButton(defaultBtn);
  fetchStreams();
});





