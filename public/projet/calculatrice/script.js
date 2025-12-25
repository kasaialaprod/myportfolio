const nums = document.getElementsByClassName('num');
const operators = document.getElementsByClassName('ope');
const screen = document.getElementsByClassName('screen')[0];
const equal = document.getElementById('eq');

let firstNumber = null;
let currentOperator = null;

function displayNumber(event) {
  screen.textContent += event.target.textContent;
}

function chooseOperator(event) {
  firstNumber = Number(screen.textContent);
  currentOperator = event.target.textContent;
  screen.textContent = '';
}

for (let i = 0; i < nums.length; i++) {
  nums[i].addEventListener('click', displayNumber);
}

for (let j = 0; j < operators.length; j++) {
  operators[j].addEventListener('click', chooseOperator);
}

function calcul() {
  const secondNumber = Number(screen.textContent);
  let result;

  switch (currentOperator) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case 'x':
      result = firstNumber * secondNumber;
      break;
    case '/':
      result = firstNumber / secondNumber;
      break;
    default:
      result = 'Erreur';
  }

  screen.textContent = result;
}

equal.addEventListener('click', calcul);
