'use strict';

const display = document.getElementById('display');
const dot = document.getElementById('dot');
let lastElement = 'operator';

//Adds numbers to display.
function addNumber(id) {
  let num = document.getElementById(id);
  let number = num.textContent;
  let val = display.value;
  let n = parseInt(number)
   console.log(typeof n)
  //Removes leading zero if no decimal.
  if (val[0] === '0' && val[1] !== '.') {
    val = val.slice(1);
  }
    
  if (val.length <= 17) {//11) {
    val += n.toLocaleString('en-US')
  }
  lastElement = 'number'; 
  display.value = val;
  console.log(lastElement +'|' + display.value);
 }

//Adds operators to a display.
function addOperator(id) {
  let opr = document.getElementById(id);
  let operator = opr.textContent;
  let val = display.value;
  let len = val.length - 1;
  let last;
  
  // Prevents a first char to be an operator.
  if (1 <= val.length < 16 && lastElement !== 'operator') {
    
    lastElement = 'operator';
    val += operator;
  }
  //Changes operator
  else if (1 <= val.length < 16 && lastElement === 'operator') {
    //Converts "x" to "*" and "÷" to "/".
    if (operator === 'x') {
      last = val.substring(0, len) + '*';
    }
    else if (operator === '÷') {
      last = val.substring(0, len) + '/';
    } 

    last = val.substring(0, len) + operator;
    val = last; 
  }
  console.log(val.length); 
  display.value = val;
  console.log(lastElement +'|' + display.value);
  }

//Set backspace functionality.
function setBackspace() {
   let val = display.value;
   let len = val.length - 1;
   let backspace = val.substring(0, len);
   display.value = backspace; 
}

//Deletes all.
function setDeleteAll() {
  display.value = '';
  lastElement = 'operator';

  if (dot.classList.contains('unclickable')) {
    dot.classList.remove('unclickable');
    dot.classList.add('clickable');
  } else {
    return;
  }
}

//Change positive number to negativ and vice versa.
function switchSign() {
  let val = display.value;

  if(val[0] === '-') {
    val = val.slice(1);
  } else {
    val = '-' + val.slice(0);
  }
  display.value = val;
}

function setSquare() {
  let val = display.value;
 //Squares a value and replaces decimal zeros if exist.   
  if (val.length <= 13) {
    val = Math.pow(val, 2).toFixed(2).replace(/\.?0*$/g,'').toLocaleString('en-US');
  } 
  else if (val.length > 13) {
    val = expo(Math.pow(val, 2), 6);
  } 
  display.value = val;
  console.log(test(display.value));
}

function setTotal() {
  let val = display.value;
  //If last element operator display Err.
  if (lastElement === 'operator') {
    display.value = 'Err';
    return display.value; 
    }
  //Calculates a value and replaces decimal zeros if exist.  
  else if (val.length <= 17) {
   val = parseInt(eval(val)).toFixed(2).replace(/\.?0*$/g,'').toLocaleString('en-US');
  } 
  else if (val.length > 17) {
    val = expo(eval(val), 6);
  } 
  display.value = val;
  console.log(test(display.value));
}

/*Returns a string representing the number object in exponential notation.*/
function expo(x, f) {
  return Number.parseFloat(x).toExponential(f);
}

function test() {
  if (isFinite(display.value)) {
    return display.value;//Value is NOT Infinity.
  }

  else if (isNaN(display.value)) {
    display.value = 'Err';
    return display.value;//Returns if a value is NaN.
  }

  else if (typeof display.value === 'undefined') {
    display.value = 'Err';
    return display.value;//Returns if a value undefined
  }

  else if (display.value === null) {
    display.value = 'Err';
    return display.value;//Returns if a value null.
 }

  else if (display.value instanceof Error && typeof display.message !== 'undefined'){
    display.value = 'Err';
    return display.value;// Returns if value is an error object
 }

  display.value = 'Err';
  return display.value;//Value is Infinity!
 }

//Prevents entering charachters.
display.addEventListener('keydown', (e) => {
  e.preventDefault();
});
  
//Add event delegation to event listener. 
document.addEventListener('click', (e) => {
  
  const clicked = e.target;
  
  //If error, prevents clicking buttons except ac button.
  if (display.value === 'Err') {
    if (clicked.id === 'ac') {
      setDeleteAll();
    } else {
      return false;
     }
  }  

  if (clicked.classList[0] === 'number') {
    addNumber(clicked.id);
    }
 
  if (clicked.classList[0] === 'operator') {
   //Prevents multiple decimals in one number.
    if (clicked === dot) {
      dot.classList.remove('clickable');
      dot.classList.add('unclickable');
    } 
    else if (clicked !== dot) {  
      dot.classList.remove('unclickable');
      dot.classList.add('clickable');
    }
    addOperator(clicked.id);
  }
  
  if (clicked.id === 'backspace') {
    setBackspace();
    }

  if (clicked.id === 'ac') {
    setDeleteAll();
    }

  if (clicked.id === 'sign') {
    switchSign(); 
    }

  if (clicked.id === 'square') {
    setSquare();
    }

  if (clicked.id === 'equal') {
    setTotal();
    }
});