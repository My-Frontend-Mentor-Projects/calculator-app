const themeSwitch = document.getElementById('theme-switch');
const circle = document.getElementById('circle');
let currentTheme = null;

function setTheme() {
    currentTheme = Number(localStorage.getItem('theme')) || 1;

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        switch (currentTheme) {
            case 1:
                circle.classList.remove('theme-3');
                circle.classList.add('theme-1');
                break;
            case 2:
                circle.classList.remove('theme-1');
                circle.classList.add('theme-2');
                break;
            case 3:
                circle.classList.remove('theme-2');
                circle.classList.add('theme-3')
                break;
            default:
                break;
        }
    }

}

function switchTheme() {
    currentTheme >= 3 ? currentTheme = 0 : currentTheme;
    localStorage.setItem('theme', currentTheme + 1);
    setTheme();
}

themeSwitch.addEventListener('click', switchTheme);

setTheme();