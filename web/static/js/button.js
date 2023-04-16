function change() {
    if (document.getElementById("ansbtn").innerText == "Answer") {
        document.getElementById("ansbtn").innerText = "Correct answer";
       
    } else {
        document.getElementById("ansbtn").innerText = "Answer";
    
    }
}

function loading(){
    if( document.getElementById("loading").style.display=="none"){
        document.getElementById("start").innerText="Starting - click to cancel"
        document.getElementById("loading").style.display="inline-block";
    }else{
        document.getElementById("start").innerText="Start"
        document.getElementById("loading").style.display="none";
    }
    
}

// function updateProgressBar(progressBar, value) {
//     value = Math.round(value);
//     progressBar.querySelector(".progress__fill").style.width = `${value}%`;
//     progressBar.querySelector(".progress__text").textContent = `${value}%`;
//   }
  
//   const myProgressBar = document.querySelector(".progress");