const preloaderHTML = `
<section class="sss" id="preloader-container">
    <div class="card">
        <div class="card-inner">
            <div class="card-value-group top-left-value">
                <div class="card-value_">A</div>
                <div class="card-symbol_">♠</div>
            </div>
            <div class="heart-container">
                <span class="heart-symbol-large">♠</span>
            </div>
            <div class="card-value-group bottom-right-value">
                <div class="card-value_">A</div>
                <div class="card-symbol_">♠</div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-inner">
            <div class="card-value-group top-left-value">
                <div class="card-value_">K</div>
                <div class="card-symbol_">♠</div>
            </div>
            <div class="heart-container">
                <span class="heart-symbol-large">♠</span>
            </div>
            <div class="card-value-group bottom-right-value">
                <div class="card-value_">K</div>
                <div class="card-symbol_">♠</div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-inner">
            <div class="card-value-group top-left-value">
                <div class="card-value_">Q</div>
                <div class="card-symbol_">♠</div>
            </div>
            <div class="heart-container">
                <span class="heart-symbol-large">♠</span>
            </div>
            <div class="card-value-group bottom-right-value">
                <div class="card-value_">Q</div>
                <div class="card-symbol_">♠</div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-inner">
            <div class="card-value-group top-left-value">
                <div class="card-value_">J</div>
                <div class="card-symbol_">♠</div>
            </div>
            <div class="heart-container">
                <span class="heart-symbol-large">♠</span>
            </div>
            <div class="card-value-group bottom-right-value">
                <div class="card-value_">J</div>
                <div class="card-symbol_">♠</div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-inner">
            <div class="card-value-group top-left-value">
                <div class="card-value_">10</div>
                <div class="card-symbol_">♠</div>
            </div>
            <div class="heart-container">
                <span class="heart-symbol-large">♠</span>
            </div>
            <div class="card-value-group bottom-right-value">
                <div class="card-value_">10</div>
                <div class="card-symbol_">♠</div>
            </div>
        </div>
    </div>
</section>
`;

// вставляємо preloader у body
document.body.insertAdjacentHTML("afterbegin", preloaderHTML);

// блокуємо скрол
document.body.classList.add('no-scroll');

const preloader = document.getElementById('preloader-container');
const mainContent = document.getElementById('main-content');

// плавне проявлення прелоадера після вставки
requestAnimationFrame(() => {
    preloader.classList.add('visible'); // плавно opacity 0 → 1
});

window.addEventListener('load', () => {
    const preloaderDisplayTime = 5000; // час показу

    setTimeout(() => {
        // плавне зникнення прелоадера
        preloader.classList.remove('visible'); // opacity 1 → 0

        preloader.addEventListener('transitionend', () => {
            preloader.style.display = 'none';

            // показ контенту плавно
            mainContent.classList.add('visible');

            // дозволяємо скрол
            document.body.classList.remove('no-scroll');
        }, { once: true });

    }, preloaderDisplayTime);
});
