<!DOCTYPE html>
<head>
    <title>Alarm Clock</title>
    <link rel="stylesheet" href="alarm.css">
    <script src="alarm.js"></script>
</head>
<body>
    <!-- CHOOSE TIMER/ALARM -->
    <div id="start_options">
        <h1>Alarm Clock</h1>
        <button class="button" style="right:1%" onclick="timer_start()">TIMER</button>
        <button class="button" style="left:1%" onclick="alarm_start()">ALARM</button>
    </div>
    <!-- TIMER SCREEN -->
    <div id="timer_screen" onload="start_btn_function()">
        <div class="intro">
            <p class="left_intro">TIMER</p>
            <p class="right_intro">Enter amount of time, then click the button below.</p>
        </div>
        <div class="display_digits">
            <div class="layer1" style="z-index: -1;">
                <span class="numbers" id="hour_display">00</span>
                <span class="colon"> :</span >
                <span class="numbers" id="minute_display">00</span >
                <span class="colon"> :</span >
                <span class="numbers" id="second_display">00</span > 
            </div>
            <div class="layer2">
                <input onfocus="blink_display(event)" oninput="display(event)" onblur="stop_blink_display()" type="text" pattern="[0-9]{1,2}" maxlength="2" id="hour_input" required="required" style="margin-right:181.83px;">
                <input onfocus="blink_display(event)" oninput="display(event)" onblur="stop_blink_display()" type="text" pattern="[0-9]{1,2}" maxlength="2" id="minute_input" required="required" style="margin-right:181.83px;">
                <input onfocus="blink_display(event)" oninput="display(event)" onblur="stop_blink_display()" type="text" pattern="[0-9]{1,2}" maxlength="2" id="second_input" required="required">
            </div>
        </div>
        <button class="btn" id="timer_start_btn">start timer</button>
    </div>
    <!-- ALARM SCREEN -->
    <div id="alarm_screen">
        <div class="intro">
            <p class="left_intro">ALARM</p>
            <p class="right_intro">When would you like the alarm to go off?</p>
        </div>
        <div class="alarm_display_digits">
            <div class="alarm_layer1" style="z-index: -1;">
                <span class="numbers" id="alarm_hour_display">00</span>
                <span class="colon"> :</span >
                <span class="numbers" id="alarm_minute_display">00</span>
            </div>
            <div class="alarm_layer2">
                <input onfocus="blink_display(event)" oninput="display(event)" onblur="stop_blink_display()" type="text" pattern="[0-9]{1,2}" maxlength="2" id="alarm_hour_input" style="margin-right:181.83px;">
                <input onfocus="blink_display(event)" oninput="display(event)" onblur="stop_blink_display()" type="text" pattern="[0-9]{1,2}" maxlength="2" id="alarm_minute_input">
            </div>
        </div>
        <button class="btn" id="alarm_btn">start alarm</button>
      <!-- Notify when the Alarm is active -->
        <div id="alarm_counting_display">
            <p id="alarm_counting_para"></p>
            <button id="alarm_counting_btn">Got it!</button>
        </div>
    </div>
</body>
