const operationBtns = document.querySelectorAll(".operator");
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
  decimalBtn.removeAttribute("disabled");
  a = [];
  b = [];
  op = "";
}

digitBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (!op) {
      while (a.length < 16) {
        a.push(btn.value);
        updateDiplay(a.join(""));
        break;
      }
    } else {
      while (b.length < 16) {
        b.push(btn.value);
        updateDiplay(b.join(""));
        break;
      }
    }
  })
);

operationBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (op && a[0] && b[0]) {
      const result = operate(op, a, b);
      if (result == Infinity) {
        updateDiplay("Math Error");
        resetValues();
      } else {
        a = [];
        b = [];
        a.push(result);
        op = btn.value;
      }
    } else if (a[0]) {
      op = btn.value;
    }

    if (op && a[0]) {
      decimalBtn.removeAttribute("disabled");
    }
  })
);

equals.addEventListener("click", function () {
  if (op && a[0] && b[0]) {
    const result = operate(op, a, b);
    if (result == Infinity) {
      updateDiplay("Math Error");
    } else {
      updateDiplay(result);
    }
    resetValues();
  }
});

clear.addEventListener("click", function () {
  resetValues();
  updateDiplay("Calculator");
});

undo.addEventListener("click", function () {
  if (!op) {
    a.pop();
    a[0] ? updateDiplay(a.join("")) : updateDiplay("0");
    if (!a.includes(".")) {
      decimalBtn.removeAttribute("disabled");
    }
  } else {
    b.pop();
    b[0] ? updateDiplay(b.join("")) : updateDiplay("0");
    if (!b.includes(".")) {
      decimalBtn.removeAttribute("disabled");
    }
  }
});

decimalBtn.addEventListener("click", function () {
  if (!op) {
    a.push(".");
    decimalBtn.setAttribute("disabled", "");
    updateDiplay(a.join(""));
  } else {
    b.push(".");
    decimalBtn.setAttribute("disabled", "");
    updateDiplay(b.join(""));
  }
});
