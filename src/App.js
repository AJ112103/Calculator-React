import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  function inputDigit(digit) {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  }

  function inputDecimal() {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  }

  function clear() {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  }

  function performOperation(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  }

  function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  return (
    <div className="calculator">
      <div className="display-value">{displayValue}</div>
      <div className="number-buttons">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button key={num} className="numbers" onClick={() => inputDigit(num)}>
            {num}
          </button>
        ))}
        <button className="numbers" onClick={inputDecimal}>.</button>
      </div>
      <div className="operation-buttons">
        <button className="operations" onClick={() => performOperation('+')}>+</button>
        <button className="operations" onClick={() => performOperation('-')}>-</button>
        <button className="operations" onClick={() => performOperation('/')}>/</button>
        <button className="operations" onClick={() => performOperation('*')}>x</button>
        <button className="operations" onClick={() => performOperation('=')}>=</button>
        <button className="operations" onClick={clear}>C</button>
      </div>
    </div>
  );
}

export default App;
