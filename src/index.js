//popup a todo-hoz

{/* <button onclick="myFunction()">Click Me</button>

<div id="myDIV">
  This is my DIV element.
</div>

function myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } */}


const addBtn = document.querySelector('#addItem')
const popUpForm = document.querySelector('#popUpForm')

addBtn.addEventListener('click', function(){
    if (popUpForm.style.display === 'none'){
        addBtn.value = 'x'
        popUpForm.style.display = 'block'
    }
    else{
        addBtn.value = '+'
        popUpForm.style.display = 'none'
    }

})




// addBtn.addEventListener('click', ()=>{
//     const popUpForm = document.querySelector('#popUpForm')
//     if (popUpForm.style.display === 'none') {
//         popUpForm.style.display = 'block' 
//     }
// })

// function openCurry() {
//     document.querySelector("#curry-pop").style.display = "block";
//   }

//   function closeCurry() {
//     document.querySelector("#curry-pop").style.display = "none";
//   }

