let button = document.querySelector("button");
let info = document.querySelector("#info");

let counterInterval;

let savedCounter;

//add the startCounter()
button.setAttribute("onclick", "startCounter(0)");


function startCounter(counter){

    counter = Number(counter);

    //remove the startCounter() 
    button.removeAttribute("onclick");

    //add the stopCounter()
    button.setAttribute("onclick", "stopCounter()");

    button.innerText = 'Stop Counter';


    counterInterval = setInterval(function(){

        info.innerHTML = counter;

        counter = counter + 1;

        savedCounter = counter;

    }, 1000)

   

}

function stopCounter(){

    button.removeAttribute("onclick");

    button.setAttribute("onclick", "startCounter(savedCounter)");

    button.innerText = "Resume Counter";

    clearInterval(counterInterval);

}

