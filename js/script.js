const $ = document;

const buttons = $.querySelectorAll('.button-type');
const finalResult = $.querySelector('.text-type');
const themMode = $.querySelector('.fa-moon');
const allInputs = $.querySelectorAll('input');

function calculateResult(clickedOrTypedValue) {
    if (clickedOrTypedValue === 'C') {
        finalResult.value = 'Result';
    } else if (clickedOrTypedValue === '=') {  
        //calculation
        if (finalResult.value !== 'Result') {
            //replace x and * 
            while (finalResult.value.includes('x')) {
                finalResult.value = finalResult.value.replace('x', '*');
            }
            finalResult.value = eval(finalResult.value);
            if (isNaN(finalResult.value)) {
                finalResult.value = 'cant calculate 0/0';
            }
        }
    } else if (clickedOrTypedValue === 'Backspace') {
        //remove last character
        finalResult.value = finalResult.value.slice(0, -1);
    } else {
        //remove Result string from result
        if (finalResult.value.includes('Result')) {
            finalResult.value = finalResult.value.replace('Result', '');
        }

        finalResult.value += clickedOrTypedValue;
    }
}

//click by mouse
buttons.forEach(button => {
    button.addEventListener('click', e => {
        const clickedValue = e.target.value;
        calculateResult(clickedValue);
    });
});

//typped by keaboard
$.body.addEventListener('keydown', e => {
    e.preventDefault();
    const typedValue = e.key;
    switch (typedValue) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '+':
        case '-':
        case 'x':
        case '/':
        case '.':
        case 'C':
        case 'Backspace':
            calculateResult(typedValue);
            break;
        case 'Enter':
            calculateResult('=');
            break;
        default:
            break;
    }
});

// change theme
themMode.addEventListener('click', () => {
    if (themMode.className === 'fa-solid fa-moon') {
        themMode.className = 'fa-solid fa-sun';
        $.body.style.backgroundColor = getComputedStyle($.documentElement).getPropertyValue('--light-bg-color');
        allInputs.forEach(input => {
            if (input.value !== 'C') {
                input.style.backgroundColor = getComputedStyle($.documentElement).getPropertyValue('--light-input-bg-color');
                input.style.color = getComputedStyle($.documentElement).getPropertyValue('--light-color');
            } 
        });
    } else {
        themMode.className = 'fa-solid fa-moon';
        $.body.style.backgroundColor = getComputedStyle($.documentElement).getPropertyValue('--dark-bg-color');
        allInputs.forEach(input => {
            if (input.value !== 'C') {
                input.style.backgroundColor = getComputedStyle($.documentElement).getPropertyValue('--dark-input-bg-color');
                input.style.color = getComputedStyle($.documentElement).getPropertyValue('--dark-color');
            } 
        });
    }
});