const themeSwitch = document.getElementById('theme-switch');
const circle = document.getElementById('circle');
const screen = document.getElementById('screen-text');
const buttons = document.querySelectorAll('#keypad button');
let currentTheme = null;
let prevNum = null;
let currentNum = null;
let isSecondNumber = false;
let prevOperator = null;

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

function changeTheme() {
    currentTheme >= 3 ? currentTheme = 0 : currentTheme;
    localStorage.setItem('theme', currentTheme + 1);
    setTheme();
}

function pressNumber(number) {
    let displayContent = screen.textContent;

    if (isSecondNumber) {
        displayContent = '';
        isSecondNumber = false;
    }

    screen.textContent = displayContent === '0' ? number : displayContent + number;
}

function addDecimal() {
    !screen.textContent.includes('.') ? screen.textContent = `${screen.textContent}.` : screen.textContent;
}

function pressOperator(operator) {
    currentNum = Number(screen.textContent);

    if (!prevNum) {
        prevNum = currentNum;
        prevOperator = operator;
    }
    else {
        switch (prevOperator) {
            case '+':
                currentNum = prevNum + currentNum;
                screen.textContent = currentNum;
                break;
            case '-':
                currentNum = prevNum - currentNum
                screen.textContent = currentNum;
                break;
            case '*':
                currentNum = prevNum * currentNum
                screen.textContent = currentNum;
                break;
            case '/':
                currentNum = prevNum / currentNum
                screen.textContent = currentNum;
                break;
            case '=':
                screen.textContent = currentNum;
            default:
                screen.textContent = prevNum;
                break;
        }
        prevNum = null;
        prevOperator = null;
    }

    isSecondNumber = true;
}

function deleteElement() {
    screen.textContent.length === 1 ? screen.textContent = 0 : screen.textContent = screen.textContent.slice(0, -1);
}

function resetCalculator() {
    prevNum = null;
    currentNum = null;
    operator = null;
    isSecondNumber = false
    screen.textContent = '';
}

themeSwitch.addEventListener('click', changeTheme);

buttons.forEach((button) => {
    if (button.classList.contains('number')) {
        button.addEventListener('click', () => pressNumber(button.value));
    }

    if (button.classList.contains('decimal')) {
        button.addEventListener('click', () => addDecimal());
    }

    if (button.classList.contains('operator')) {
        button.addEventListener('click', () => pressOperator(button.value));
    }

    if (button.classList.contains('delete')) {
        button.addEventListener('click', () => deleteElement());
    }

    if (button.classList.contains('reset')) {
        button.addEventListener('click', () => resetCalculator());
    }
})

setTheme();

