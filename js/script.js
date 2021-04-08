const buttons = document.querySelectorAll('button');
const keys = document.querySelector('.calculator-keyboard')

const historyDisplay = document.querySelector('#history-value');
const outputDisplay = document.querySelector('#output-value');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

const clear = document.querySelector('#clear');
const clearEntry = document.querySelector('#clear-entry');
const equal = document.querySelector('#equals');

let firstOperand = '';
let secondOperand = '';
let result = null;
let operatorVal = '';

keys.addEventListener('click', e => {
    const btn = e.target
    if (btn.matches('button')) {
        console.log(btn.innerText) 

        if (btn.classList.contains('number')) {
            isNumber(btn)
        }

        if (btn.className === 'decimal') {
            isDecimal()
        }

        if (btn.classList.contains('operator')) {
            isOperator(btn)
        }

        if (btn.className === 'clear') {
            // wipe the calculator's memory
            isClear()
            removeActiveStyle()
        }

        if (btn.className === 'clear-entry') {
            // remove calculator's last entry
            isClearEntry()
        }

        if (btn.className === 'equals') {
            isEqualSign()
        }
    }
})


function isNumber (btn) {
    if (operatorVal) {
        removeActiveStyle()    
        secondOperand += btn.innerText
        outputDisplay.innerText = secondOperand

    }else {
        firstOperand += btn.innerText
        outputDisplay.innerText = firstOperand
    }
}

function isDecimal () {  
    if (operatorVal) {
        if(!(secondOperand).includes('.')) {
            secondOperand += '.'
            outputDisplay.innerText = secondOperand
        }
    } else {
        if (!(firstOperand).includes('.')) {
            firstOperand += '.'
            outputDisplay.innerText = firstOperand
        }
    }   
}

function isOperator (btn) {
    btn.classList.add('btn-active')

    let userInput = historyDisplay.innerText
    historyDisplay.innerText = outputDisplay.innerText
    outputDisplay.innerText = ''

    // if operator is clicked after secondOperand has been entered
    if (operatorVal && secondOperand) {   
        result = calculate(firstOperand, operatorVal, secondOperand)
        firstOperand = result
        secondOperand = ''
        historyDisplay.innerText = outputDisplay.innerText
        outputDisplay.innerText = result
    }  

    if (firstOperand === '') {
        firstOperand = userInput
    }

    //when two operators are entered consecutively, remove and replace last operator
    if (operatorVal) {
        removeActiveStyle()
        btn.classList.add('btn-active')
        historyDisplay.innerText = firstOperand
        operatorVal = btn.innerText
        historyDisplay.innerText += operatorVal
        return
    }
    operatorVal = btn.innerText
    historyDisplay.innerText += operatorVal
    console.log(firstOperand, typeof(firstOperand), operatorVal, secondOperand, typeof(secondOperand))
}

function isClear () {
    historyDisplay.innerText = ''
    outputDisplay.innerText =  ''
    firstOperand = ''
    secondOperand = ''
    operatorVal = ''
    result = null
    removeActiveStyle()
}

function isClearEntry () {
    if(secondOperand) {
        secondOperand = (secondOperand).slice(0, -1)          
    } else if (operatorVal) {
        operatorVal = ''
    } else {
        firstOperand = (firstOperand).slice(0, -1)
    }
    historyDisplay.innerText = (historyDisplay.innerText).slice(0, -1)
}

function isEqualSign () {
    if(firstOperand, secondOperand) {
        historyDisplay.innerText += outputDisplay.innerText
        calcValue = calculate(firstOperand, operatorVal, secondOperand)
        result = parseFloat(calcValue.toFixed(7)) 
        outputDisplay.innerText = result
    } 
}

function calculate(n1, operator, n2) {
    const num1 = parseFloat(n1)
    const num2 = parseFloat(n2)
    console.log(num1, operator, num2)
    if (operator === '+') {
        return num1 + num2 
    }
    if (operator === '−') {
        return num1 - num2
    }
    if (operator === '×') {
        return num1 * num2
    }
    if (operator === '÷') {
        return num1 / num2
    }
}

function removeActiveStyle() {
    buttons.forEach(button => {
        button.classList.remove('btn-active')
    })
}