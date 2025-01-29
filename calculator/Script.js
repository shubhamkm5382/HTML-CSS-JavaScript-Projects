let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll("button");
let expression = "";
let isCalculated = false;

// Define valid operator pairs
const allowedPairs = {
  "*": ["-", "/"],
  "/": ["-", "/"],
  "%": ["*", "+", "-", "/"],
  "+": [],
  "-": [],
};

// Check if a character is an operator
function isOperator(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}

// Validate and handle operator input
function handleOperatorInput(currentString, newValue) {
  const lastChar = currentString.slice(-1);

  // Prevent starting with invalid operators, except '-'
  if (currentString === "" && newValue !== "-") {
    return currentString;
  }

  // Replace operator if invalid, else append
  if (isOperator(lastChar)) {
    if (!allowedPairs[lastChar]?.includes(newValue)) {
      return currentString.slice(0, -1) + newValue;
    }
  } else {
    currentString += newValue;
  }

  // Prevent leading operators like '+', '*', '/', '%'
  if (/^[+\*/%]/.test(currentString)) {
    return currentString.slice(0, -1);
  }

  return currentString;
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerHTML;

    if (value === "=") {
      if (isCalculated) return;

      try {
        // Remove trailing operators (except '%')
        if (/[\+\-\*\/]$/.test(expression)) {
          expression = expression.slice(0, -1);
        }

        // Handle percentage calculations
        expression = expression.replace(/(\d+)%(\d+)/g, "($1 * $2 / 100)");
        expression = expression.replace(/(\d+)%/g, "($1 / 100)");

        // Evaluate the expression
        expression = eval(expression).toString();
        input.value = expression;
        isCalculated = true;
      } catch {
        input.value = "Error";
        expression = "";
        isCalculated = false;
      }
    } else if (value === "AC") {
      expression = "";
      input.value = "0";
      isCalculated = false;
    } else if (value === "DEL") {
      expression = expression.slice(0, -1);
      input.value = expression || "0";
      isCalculated = false;
    } else {
      let newExpression = isCalculated ? value : expression;

      // Handle operators
      if (isOperator(value)) {
        newExpression = handleOperatorInput(newExpression, value);
      } else {
        newExpression += value;
      }

      // Update expression
      expression = newExpression;
      input.value = expression;
      isCalculated = false;
    }
  });
});
