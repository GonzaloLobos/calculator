const digitBtns = document.querySelectorAll('.digit');

digitBtns.forEach((btn)=> btn.addEventListener('click', function(){
  console.log(btn.value);
}))