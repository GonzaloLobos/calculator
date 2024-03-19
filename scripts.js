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
let op = [];

function updateDiplay(text) {
  display.textContent = text;
}

function operate(op, a, b) {
  const numberA = parseInt(a.join(""));
  const numberB = parseInt(b.join(""));
  const operator = op[0];
  return operations[operator](numberA, numberB);
}

function resetValues() {
  a = [];
  b = [];
  op = [];
}

digitBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (!op[0]) {
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
    if (op[0]) {
      const temp = operate(op, a, b);
      a = [];
      b = [];
      a.push(temp);
      op.unshift(btn.value);
    } else {
      op.unshift(btn.value);
    }
  })
);

equals.addEventListener("click", function () {
  if (op[0] && a[0] && b[0]) {
    let result = operate(op, a, b);
    updateDiplay(result);
    resetValues(op, a, b);
  }
});

clear.addEventListener("click", function () {
  resetValues();
  updateDiplay("Calculator");
});

undo.addEventListener("click", function () {
  if (!op[0]) {
    a.pop();
    a[0] ? updateDiplay(a.join("")) : updateDiplay("0");
  } else {
    b.pop();
    b[0] ? updateDiplay(b.join("")) : updateDiplay("0");
  }
});
