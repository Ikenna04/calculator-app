// Variables
const rootElem = document.documentElement,
	clearBtn = document.querySelector('[data-clear]'),
	deleteBtn = document.querySelector('[data-delete]'),
	screen = document.querySelector('#screen'),
	operands = document.querySelectorAll('[data-operand]'),
	operators = document.querySelectorAll('[data-operator]'),
	equalsBtn = document.querySelector('[data-equals]');

let dataTheme,
	newtheme,
	firstNumber = '',
	secondNumber = '',
	operator = '',
	result,
	number;

// Functions

// | THEME SWITCH FUNCTION
const switchTheme = () => {
	dataTheme = rootElem.getAttribute('data-theme');
	newtheme =
		dataTheme === 'dark' ? 'light' : dataTheme === 'light' ? 'custom' : 'dark';
	rootElem.setAttribute('data-theme', newtheme);

	localStorage.setItem('theme', newtheme);
};

// | APPEND NUMBER
const appendNumber = number => {
	if (!operator) {
		if (number == '.') {
			if (!firstNumber.includes('.')) {
				firstNumber += number;
				screen.innerText = firstNumber
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		} else {
			firstNumber += number;
			screen.innerText = firstNumber
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
	} else {
		if (!screen.innerText) {
			firstNumber = 0;

			if (number == '.') {
				if (!secondNumber.includes('.')) {
					secondNumber += number;
					screen.innerText = secondNumber
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}
			} else {
				secondNumber += number;
				screen.innerText = secondNumber
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		} else if (!firstNumber && screen.innerText) {
			firstNumber = screen.innerText;
			if (number == '.') {
				if (!secondNumber.includes('.')) {
					secondNumber += number;
					screen.innerText = secondNumber
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}
			} else {
				secondNumber += number;
				screen.innerText = secondNumber
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		} else {
			if (number == '.') {
				if (!secondNumber.includes('.')) {
					secondNumber += number;
					screen.innerText = secondNumber
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				}
			} else {
				secondNumber += number;
				screen.innerText = secondNumber
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
			}
		}
	}
};

// | CLEAR SCREEN
const clearScreen = () => {
	firstNumber = '';
	secondNumber = '';
	operator = '';
	screen.innerText = '';
};

// | COMPUTE FNX
const computeResult = () => {
	let result = 0;
	firstNumber = firstNumber.toString().replace(',', '');
	secondNumber = secondNumber.toString().replace(',', '');

	switch (operator) {
		case '+':
			result = parseFloat(firstNumber) + parseFloat(secondNumber);
			break;

		case '/':
			result = parseFloat(firstNumber) / parseFloat(secondNumber);
			break;

		case '×':
			result = parseFloat(firstNumber) * parseFloat(secondNumber);
			break;

		case '-':
			result = parseFloat(firstNumber) - parseFloat(secondNumber);
			break;

		default:
			break;
	}

	firstNumber = '';
	secondNumber = '';
	operator = '';
	screen.innerText = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// | DEL FNX
const deleteLast = () => {
	if (!operator) {
		number = firstNumber.split('');
		number.pop();
		firstNumber = number.join('');
		screen.innerText = firstNumber
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		number = '';
	} else if (secondNumber) {
		number = secondNumber.split('');
		number.pop();
		secondNumber = number.join('');
		screen.innerText = secondNumber
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
};

// Add an Operator
function addOperator(_operator) {
	if (!operator) {
		operator = _operator;
		_operator = '';
	} else {
		computeResult();
		operator = _operator;
		_operator = '';
	}
}

// Event Listeners
operands.forEach(function (operand) {
	operand.addEventListener('click', function (e) {
		appendNumber(e.target.innerText);
	});
});

operators.forEach(function (operator) {
	operator.addEventListener('click', function (e) {
		addOperator(e.target.innerText);
	});
});

deleteBtn.addEventListener('click', deleteLast);

equalsBtn.addEventListener('click', computeResult);

clearBtn.addEventListener('click', clearScreen);

document.querySelector('.theme').addEventListener('click', switchTheme);
