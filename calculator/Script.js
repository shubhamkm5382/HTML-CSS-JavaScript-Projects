let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    let value = e.target.innerHTML;

    if (value === '=') {
      try {
        // Replace "200%10" with "200 * 10 / 100"
        string = string.replace(/(\d+)%(\d+)/g, '($1 * $2 / 100)');
        // Replace "10%" with "10 / 100" when used after an operator
        string = string.replace(/(\d+)%/g, '($1 / 100)');
        
        // Evaluate the expression
        string = eval(string);
        input.value = string;
      } catch {
        input.value = "Error";
        string = "";
      }
    } else if (value === 'AC') {
      string = "";
      input.value = "0";
    } else if (value === 'DEL') {
      string = string.slice(0, -1);
      input.value = string || "0";
    } else {
      string += value;
      input.value = string;
    }
  });
});


// let input = document.getElementById('inputBox');
// let buttons = document.querySelectorAll('button');
// let string = "";
// let arr = Array.from(buttons);
// arr.forEach(button => {
//   button.addEventListener('click', (e) => {
//     if(e.target.innerHTML == '='){
//       string = eval(string);
//       input.value = string;
//     }
//     else if (e.target.innerHTML == 'AC'){
//       string = "";
//       input.value = string;
//     }
//     else if(e.target.innerHTML == 'DEL') {
//       string = string.substring(0, string.length-1);
//       input.value = string;
//     }
//     else{
//       string += e.target.innerHTML;
//       input.value = string;
//     }
//   })
// })