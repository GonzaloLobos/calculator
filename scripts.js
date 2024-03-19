const operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

let a = "";
let b = "";
let op;

const digitBtns = document.querySelectorAll(".digit");
const operationBtns = document.querySelectorAll(".operator");

digitBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    !op ? (a += btn.value) : (b += btn.value);
  })
);

operationBtns.forEach((btn) =>
  btn.addEventListener("click", function () {
    op = btn.value;
  })
);
