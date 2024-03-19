const digitBtns = document.querySelectorAll(".digit");
const operationBtns = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equals = document.querySelector(".equals");

const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

let a = "";
let b = "";
let op;

function updateDiplay(text) {
  display.textContent = text;
}

function operate(op, a, b) {
  const numberA = parseInt(a);
  const numberB = parseInt(b);
  return operations[op](numberA, numberB);
}

digitBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    if (!op) {
      a += btn.value;
      updateDiplay(a);
    } else {
      b += btn.value;
      updateDiplay(b);
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
