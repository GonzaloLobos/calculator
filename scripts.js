const digitBtns = document.querySelectorAll(".digit");
const operationBtns = document.querySelectorAll(".operator");
const display = document.querySelector(".display");

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
