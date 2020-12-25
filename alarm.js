//STARTING OPTIONS
function timer_start(){
    document.getElementById("start_options").style.display = "none";
    document.getElementById("timer_screen").style.display = "block";
    document.getElementById("timer_start_btn").addEventListener("click",start_timer);
}

function alarm_start(){
    document.getElementById("start_options").style.display = "none";
    document.getElementById("alarm_screen").style.display = "block";
    document.getElementById("alarm_btn").addEventListener("click",start_alarm);
    document.getElementById("alarm_counting_btn").addEventListener("click",close_alert_display);
}

//TIMER _SCREEN
var blinkblink;

//CHOOSE TIME
function display(event){
    var target = event.target;
    var time = target.value.toString();

    //make sure time is always 2 digits
    if (time.length==0){
        time = "00";
    }

    else if (time.length==1) {
        time = "0" + time.toString();
    }
    
    //forbid any non-digit characters
    if (time[0].charCodeAt(0)<48 || time[0].charCodeAt(0)>57){
        time = "00";
        target.value = "";
    }

    if (time[1].charCodeAt(0)<48 || time[1].charCodeAt(0)>57){
        time = "0" + time[0];
        target.value = time[0];
    }

    //change display according to value
    var id = target.getAttribute('id');
    if (id=="hour_input"){
        document.getElementById("hour_display").innerHTML = time;
    }
    else if (id=="alarm_hour_input"){
        if (time>24){
            alert("Please enter a value smaller than 24 hours!")
            target.value = "";
            time = "00";
        }
        document.getElementById("alarm_hour_display").innerHTML = time;
    }
    else {
        //make sure time<60
        if (time>60){
            alert("Please enter a value smaller than 60 minutes!");
            target.value = "";
            time = "00";
        }
        if (id=="minute_input"){           
            document.getElementById("minute_display").innerHTML = time;
        }
        else if (id=="alarm_minute_input"){
            document.getElementById("alarm_minute_display").innerHTML = time;
        }
        else if (id=="second_input"){
            document.getElementById("second_display").innerHTML = time;
        }
    }
}

//BLINK EFFECT
function blink_display(event){
    var elem;
    var target = event.target;
    var id = target.getAttribute('id');
    if (id=="hour_input"){
        elem = document.getElementById("hour_display");
    }
    else if (id=="minute_input"){
        elem = document.getElementById("minute_display");
    }
    else if (id=="second_input"){
        elem = document.getElementById("second_display");       
    }
    else if (id=="alarm_hour_input"){
        elem = document.getElementById("alarm_hour_display");       
    }
    else if (id=="alarm_minute_input"){
        elem = document.getElementById("alarm_minute_display");  
    }
    blinkblink = setInterval(blink_event,1500);
    function blink_event(){
        elem.style.visibility="hidden";
        setTimeout(function(){ elem.style.visibility="visible" },400);
    }
}

//STOP BLINKING EFFECT
function stop_blink_display(){
    clearInterval(blinkblink);
}

//START TIMER
function start_timer(){
    //getting elements
    var hour_display = document.getElementById("hour_display");
    var minute_display = document.getElementById("minute_display");
    var second_display = document.getElementById("second_display");
    var button = document.getElementById("timer_start_btn");
    var audio = new Audio("marimba.mp3");
    
    //calculate time
    var countdown = parseInt(hour_display.innerHTML)*3600 + 
    parseInt(minute_display.innerHTML)*60 +parseInt(second_display.innerHTML);
    
    //prepare to stop timer during counting
    button.innerHTML="stop timer";
    button.removeEventListener("click", start_timer);
    button.addEventListener("click",stop_timer1);
    function stop_timer1(){
        clearInterval(timer);
        button.innerHTML = "start timer";
        button.removeEventListener("click",stop_timer1);
        button.addEventListener("click",start_timer);
    }

    //start counting
    var timer = setInterval(count,1000);
    function count(){
        //when still counting
        if(countdown!=0){
            countdown -= 1;
            //display digits
            var h = Math.floor(countdown/3600);
            if (h<10){
                h = "0"+h;
            }
            hour_display.innerHTML = h;

            var m = Math.floor((countdown-h*3600)/60);
            if (m<10){
                m = "0"+m;
            }
            minute_display.innerHTML = m;

            var s = Math.floor(countdown-h*3600-m*60);
            if (s<10){
                s = "0"+s;
            }
            second_display.innerHTML = s;
        }
        //countdown == 0
        else {
            audio.play();
            clearInterval(timer);
            button.removeEventListener("click",stop_timer1);
            button.addEventListener("click",stop_timer2);
            function stop_timer2(){
                stop_timer1();
                audio.pause();
                audio.currentTime = 0;
            }
        }  
    }
}

//ALARM 
function start_alarm(){
    //get elements
    var hour_display = document.getElementById("alarm_hour_display");
    var minute_display = document.getElementById("alarm_minute_display");
    var counting_display = document.getElementById("alarm_counting_display")
    var button = document.getElementById("alarm_btn");
    var audio = new Audio("marimba.mp3");

    var hour = hour_display.innerHTML;
    var minute = minute_display.innerHTML;

    //make alarm_counting_display visible
    document.getElementById("alarm_counting_para").innerHTML = "Your alarm is set at "+hour+":"+minute+".";
    counting_display.style.visibility = "visible";

    //check time
    var alarm = setInterval(check_time,36000);
    function check_time(){
        var d = new Date();
        var now_hour = d.getHours();
        var now_minute = d.getMinutes();
        if (now_hour==Number(hour) && now_minute==Number(minute)){
            clearInterval(alarm);
            audio.play();
            alert("Time's up!");
            if (counting_display.style.visibility == "visible"){
                counting_display.style.visibility = "hidden";
            }
        }
    }

    //change to reset button
    button.innerHTML="reset alarm";
    button.removeEventListener("click", start_alarm);
    button.addEventListener("click",stop_alarm);
    function stop_alarm(){
        clearInterval(alarm);
        button.innerHTML = "start alarm";
        button.removeEventListener("click",stop_alarm);
        button.addEventListener("click",start_alarm);
        if (counting_display.style.visibility=="visible"){
            close_alert_display();
        }
    }
}

function close_alert_display(){
    document.getElementById("alarm_counting_display").style.visibility="hidden";
}
