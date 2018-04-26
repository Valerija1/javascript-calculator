/*jshint esversion: 6 */
/* jshint node: true */
/*jslint evil: true */
'use strict';

const display = document.getElementById('display');
const dot = document.getElementById('dot');
let lastElement = 'operator';

//Add numbers to display.
function addNumber(id) {
  let number = document.getElementById(id).textContent;
  let val = display.value;
  //Removes leading zero if no decimal.
  if (val[0] === '0'&& val[1] !== '.') {
    val = val.slice(0, -1);
    lastElement = 'operator';
  }
  if (val.length < 17) {
    val += number;
    lastElement = 'number'; 
  }
  display.value = val;
  console.log(`${lastElement} ${display.value}`);
}


function addOperator(id) {
  let operator = document.getElementById(id).textContent;
  let val = display.value;
  // Prevents a first char to be an operator.
  if (1 <= val.length && val.length < 16) {
    if (lastElement === 'number') {
       val += operator;
       lastElement = 'operator';
    }
    //Changes operator
    else if (lastElement === 'operator') {
      val = val.slice(0, -1) + operator;
    }
  }  
  display.value = val;
  console.log(`${lastElement} ${display.value}`);
}

//Set backspace functionality.
function setBackspace() {
   let val = display.value;
   val = val.slice(0, -1);
   display.value = val; 
}

//Delete all.
function setDeleteAll() {
  display.value = '';
  lastElement = 'operator';
  
  if (dot.classList.contains('unclickable')) {
    dot.classList.remove('unclickable').add('clickable')
  } else {
    return;
   }
}

//Change positive number to negativ and vice versa.
function switchSign() {
  let val = display.value;
  val = val[0] === '-' ? val.slice(1) : '-' + val.slice(0);
  display.value = val;
}

function setSquare() {
  let val = display.value;
//Squares a value and replaces decimal zeros if exist.   
  if (val.length <= 13) {
    val = Math.pow(val, 2).toFixed(4).replace(/\.?0*$/g,'');
  } else {
    val = expo(Math.pow(val, 2), 6);
    
    if(val === 'Infinity') {
      val = test(val);
    }
  }
  display.value = val;
}

function setTotal() {
  let val = display.value;
  //If last element operator display Error.
  if(lastElement === 'operator') {
    return syntaxErr(val); 
  }
  //Calculate a value and replace decimal zeros if exist.  
  if (val.length <= 17) {
    val = eval(val).toFixed(4).replace(/\.?0*$/g,'');
   
  } 
  else {
    val = expo(eval(val), 6);
  }
  
  val = test(val);
  display.value = val;
}

//Return a string representing the number object in exponential notation.
const expo = (x, f) => Number.parseFloat(x).toExponential(f);
/*Exception handling statements 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#Exception_handling_statements*/
function syntaxErr() {
  try {
    throw new SyntaxError('Error');
  } catch (e) {
    alert(`${e.name}: Unexpected end of input`);
    display.value = e.message;
    return display.value; 
    }    
}
/*Determines whether the passed value is a finite number. 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite*/
function test(number) {
  //number = parseInt(number);

  if (Number.isFinite(number)) {
    console.log('Number is NOT Infinity.');
    return number;//Return if a value is NOT Infinity, -Infinity, NaN, null or undefined.
    }
 
  try {
    throw new Error('Error');
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
     
    if (typeof number === 'undefined') {
      alert('Value is undefined!');
      return e.message;//Return true if a value is undefined.
    }
    alert('Value is Infinity!');
    return e.message;//Return if a value is Infinity, -Infinity, NaN or null.
    }
}

//Prevent enter charachters.
display.addEventListener('keydown', e => e.preventDefault());
  
//Add event delegation to event listener. 
document.addEventListener('click', e => {
  
  const clicked = e.target;
  
  //If error, prevents clicking buttons except ac button.
  if (display.value === 'Error') {
    if (clicked.id === 'ac') {
      setDeleteAll();
    } else {
      return;
     }
  }  

  if (clicked.classList[0] === 'number') {
    addNumber(clicked.id);
    }
 
  if (clicked.classList[0] === 'operator') {
   //Prevent multiple dots in one number.
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
