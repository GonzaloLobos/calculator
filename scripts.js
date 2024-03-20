const operatorBtn = document.querySelectorAll(".operator");
const digitBtns = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const undo = document.querySelector(".undo");
const decimalBtn = document.querySelector(".decimal-point");

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

let a = [];
let b = [];
let op = "";

function updateDiplay(text) {
  display.textContent = text;
}

function operate(op, a, b) {
  const numberA = parseFloat(a.join(""));
  const numberB = parseFloat(b.join(""));
  const operator = op;
  return operations[operator](numberA, numberB);
}

function resetValues() {
  a = [];
  b = [];
  op = "";
}

function handleDigit(digit) {
  if (!op) {
    if (a.length < 16) {
      a.push(digit);
      updateDiplay(a.join(""));
    }
  } else {
    if (b.length < 16) {
      b.push(digit);
      updateDiplay(b.join(""));
    }
  }
}

function handleOperator(operator) {
  if (op && a[0] && b[0]) {
    const result = operate(op, a, b);
    if (result == Infinity) {
      updateDiplay("Math Error");
      resetValues();
    } else {
      resetValues();
      a.push(result);
      op = operator;
    }
  } else if (a[0]) {
    op = operator;
  }
}

function handleEquals() {
  if (op && a[0] && b[0]) {
    const result = operate(op, a, b);
    result == Infinity ? updateDiplay("Math Error") : updateDiplay(result);
    resetValues();
  }
}

function handleUndo() {
  if (!op) {
    a.pop();
    a[0] ? updateDiplay(a.join("")) : updateDiplay("0");
  } else {
    b.pop();
    b[0] ? updateDiplay(b.join("")) : updateDiplay("0");
  }
}

function handleDecimal() {
  if (!op && !a.includes(".")) {
    a.push(".");
    updateDiplay(a.join(""));
    //Only add decimal point to "b" if "op" is defined.
    //Otherwise, doing so for "a" adds it to "b" too
  } else if (op && !b.includes(".")) {
    b.push(".");
    updateDiplay(b.join(""));
  }
}

digitBtns.forEach((btn) =>
  btn.addEventListener("click", () => handleDigit(btn.value))
);

operatorBtn.forEach((btn) =>
  btn.addEventListener("click", () => handleOperator(btn.value))
);

equals.addEventListener("click", handleEquals);

undo.addEventListener("click", handleUndo);

decimalBtn.addEventListener("click", handleDecimal);

clear.addEventListener("click", () => {
  resetValues();
  updateDiplay("Calculator");
});

window.addEventListener("keydown", (e) => {
  let keyPressed = e.key;
  switch (keyPressed) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      handleDigit(keyPressed);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      handleOperator(keyPressed);
      break;
    case "Enter":
      e.preventDefault();
      handleEquals();
      break;
    case "Backspace":
      handleUndo();
      break;
    case ".":
      handleDecimal();
      break;
  }
});
