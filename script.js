let button = document.querySelector("#startCounterBtn");
let setAlarmBtn = document.querySelector("#setAlarmBtn");
let info = document.querySelector("#info");

let counterInterval;

let savedCounter;

window.onload = function(){
    setInterval(checkAlarm, 1000);
}

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



setAlarmBtn.onclick = function(){
   let timeValue = document.querySelector("#time-value").value.trim();

   timeValue = timeValue.length > 0 ? timeValue : null;

   if(timeValue != null){

        saveAlarm(timeValue);

   }

}



function saveAlarm(timeValue){


    //save the timeValue to incompleted alarms
    let feedback = saveToIncompletedAlarms(timeValue)
    if(feedback == true){
        setInterval(checkAlarm, 1000)
    }

   


}

function checkAlarm(){
        

    let currentDate = new Date();

    currentHours = currentDate.getHours();
    currentMinutes = currentDate.getMinutes();

    currentTime = currentHours + ":" + currentMinutes

    // console.log(`Checking ...for ${timeValue}`);

    //retrieve incomplete alarm number 
   nextAlarm = getNextIncompletedAlarm()

   if(nextAlarm < currentTime){
       //remove the next Alarm..
       removeCompletedAlarm(nextAlarm);
   }

   if(nextAlarm == currentTime){
       //start
   }



   console.log("Next Alarm: ", nextAlarm);



   

    
}


function removeCompletedAlarm(alarm){
    let savedAlarms = localStorage.getItem("savedAlarms");
    savedAlarms = JSON.parse(savedAlarms);

    for(let i = 0; i < savedAlarms.length; i++){
        if(savedAlarms[i] == alarm){
            savedAlarms.splice(i, 1);

            //save to completeAlarms
            saveToCompletedAlarms(alarm);

            savedAlarms.sort();

            savedAlarms = JSON.stringify(savedAlarms);

            localStorage.setItem("savedAlarms", savedAlarms);

        }
    }


}


function saveToCompletedAlarms(alarm){
    let completedAlarms = localStorage.getItem("completedAlarms");

    if(completedAlarms == null || completedAlarms == undefined){
        completedAlarms = [];

        completedAlarms.push(alarm);

        completedAlarms = JSON.stringify(completedAlarms);

        localStorage.setItem("completedAlarms", completedAlarms);
    }else{
        completedAlarms = JSON.parse(completedAlarms);

        completedAlarms.push(alarm);

        completedAlarms.sort();

        completedAlarms = JSON.stringify(completedAlarms);

        localStorage.setItem("completedAlarms", completedAlarms);



    }

}


function getNextIncompletedAlarm(){

    let savedAlarms = localStorage.getItem("savedAlarms");

    savedAlarms = JSON.parse(savedAlarms);

    return savedAlarms[0];

}



function saveToIncompletedAlarms(timeValue){
    
    savedAlarms = localStorage.getItem("savedAlarms");

    if(savedAlarms == null || savedAlarms == undefined){
        savedAlarms = [timeValue];

        savedAlarms = JSON.stringify(savedAlarms);

        localStorage.setItem("savedAlarms", savedAlarms);

        return true;
    }else{
        savedAlarms = JSON.parse(savedAlarms);

        //console.log(savedAlarms);

        savedAlarms.push(timeValue);

        console.log(savedAlarms);

        savedAlarms.sort();

        console.log(savedAlarms);

        localStorage.setItem("savedAlarms", JSON.stringify(savedAlarms));

        return true;





        // savedAlarms.map((x) => {
        //     x_box = x.split(":");
        //     console.log(x_box);


        // })
        

        

        
    }


    


}





