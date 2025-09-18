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
           style="background-image:url(${stream.thumbnail_url.replace('{width}', '640').replace('{height}', '360')}?time=${Date.now()}); padding-top:56.25%; position:relative; cursor:pointer;">
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-size:20px;">
          ▶️ ${stream.user_name}
        </div>
      </div>
    `;

    div.querySelector(".preview").addEventListener("click", function() {
      const channel = this.dataset.channel;

      // Створюємо iframe замість preview
      const iframe = document.createElement("iframe");
      iframe.src = `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.position = "absolute";
      iframe.style.top = 0;
      iframe.style.left = 0;
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("webkitallowfullscreen", "true"); // iOS Safari
      iframe.setAttribute("mozallowfullscreen", "true");    // Firefox
      iframe.setAttribute("autoplay", "true");

      this.innerHTML = "";
      this.appendChild(iframe);
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






