let currentDisplay = document.querySelector(".currentDisplay");
let previousDisplay = document.querySelector(".previousDisplay");
let numbers = document.querySelectorAll("[data-number]");
let allClear = document.querySelector("[data-allClear]");
let operators = document.querySelectorAll("[data-operator]");
let del = document.querySelector("[data-delete]");
let equals = document.querySelector("[data-equal]");

let currentOperator = undefined;
let currentValue = 0;
let previousValue = "";

if (!currentDisplay.textContent) {
  currentDisplay.textContent = 0;
}

function numberInput(number) {
  if (currentDisplay.textContent == 0) {
    currentDisplay.textContent = number;
  } else {
    currentDisplay.textContent += number;
  }
  currentValue = parseFloat(currentDisplay.textContent);
}

function backspace() {
  if (!currentDisplay.textContent) {
    return;
  }
  if (currentDisplay.textContent.length == 1) {
    currentDisplay.textContent = 0;
  } else {
    currentDisplay.textContent = currentDisplay.textContent.slice(
      0,
      currentDisplay.textContent.length - 1
    );
  }
}

del.addEventListener("click", () => backspace());

numbers.forEach((number) =>
  number.addEventListener("click", () => numberInput(number.textContent))
);

allClear.addEventListener("click", () => clear());

function clear() {
  currentDisplay.textContent = 0;
  previousDisplay.textContent = "";
  currentValue = 0;
  previousValue = "";
  currentOperator = undefined;
  console.log("Current Operator in Clear function:", currentOperator);
}

function equal() {
  if (!currentOperator) {
    return;
  }
  let result = compute(
    currentOperator,
    parseFloat(previousValue),
    parseFloat(currentValue)
  );
  previousValue = "";
  previousDisplay.textContent = "";
  currentOperator = undefined;
  currentValue = result;
  currentDisplay.textContent = result;
  console.log("Current Operator in equal", currentOperator);
}

equals.addEventListener("click", () => equal());

operators.forEach((operator) =>
  operator.addEventListener("click", () => {
    if (currentOperator && currentValue !== 0) {
      let result = compute(
        currentOperator,
        parseFloat(previousValue),
        parseFloat(currentDisplay.textContent)
      );
      previousDisplay.textContent = result + operator.textContent;
      previousValue = result;
    } else {
      previousDisplay.textContent =
        currentDisplay.textContent + operator.textContent;
      previousValue = currentDisplay.textContent;
    }
    currentValue = 0;
    currentDisplay.textContent = 0;
    currentOperator = operator.textContent;
  })
);

function compute(operand, num1, num2) {
  let result = 0;
  switch (operand) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "÷":
      result = num1 / num2;
      break;
    case "√x":
      result = Math.sqrt(num1);
      break;
    default:
      break;
  }
  return result;
}

document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    numberInput(e.key);
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "Enter") {
    equal();
  } else if (e.key === "Escape") {
    clear();
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    let op = { "+": "+", "-": "-", "*": "x", "/": "÷" }[e.key];
    operators.forEach((operator) => {
      if (operator.textContent === op) {
        operator.click();
      }
    });
  }
});
