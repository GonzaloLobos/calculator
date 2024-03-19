const digitBtns = document.querySelectorAll(".digit");
const operationBtns = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const undo = document.querySelector(".undo");

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

let a = [];
let b = [];
let op;

function updateDiplay(text) {
  display.textContent = text;
}

function operate(op, a, b) {
  const numberA = parseInt(a.join(""));
  const numberB = parseInt(b.join(""));
  return operations[op](numberA, numberB);
}

digitBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (!op) {
      a.push(btn.value);
      updateDiplay(a.join(""));
    } else {
      b.push(btn.value);
      updateDiplay(b.join(""));
    }
  })
);

operationBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    op = btn.value;
  })
);

equals.addEventListener("click", function () {
  let result = operate(op, a, b);
  updateDiplay(result);
});

clear.addEventListener("click", function () {
  a = [];
  b = [];
  op = "";
  updateDiplay("Calculator");
});

undo.addEventListener("click", function () {
  if (!op) {
    a.pop();
    updateDiplay(a.join(""));
  } else {
    b.pop();
    updateDiplay(b.join(""));
  }
});
