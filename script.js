const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");

// Append button value to display
buttons.forEach(button => {
  button.addEventListener("click", () => {
    display.value += button.dataset.value;
  });
});

// Clear display
clear.addEventListener("click", () => {
  display.value = "";
});

// Evaluate the expression
equals.addEventListener("click", () => {
  evaluateExpression();
});

function evaluateExpression() {
  try {
    // Replace Unicode characters (÷ × −) if any
    const expression = display.value.replace(/÷/g, "/").replace(/×/g, "*").replace(/−/g, "-");
    const result = eval(expression); // Consider using a parser for security in real apps
    if (!isFinite(result)) throw new Error("Math Error");
    display.value = result;
  } catch (error) {
    display.value = "Error";
    setTimeout(() => (display.value = ""), 1500);
  }
}

// Keyboard input support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/[0-9+\-*/.]/.test(key)) {
    display.value += key;
  } else if (key === "Enter") {
    evaluateExpression();
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key === "Escape") {
    display.value = "";
  }
});