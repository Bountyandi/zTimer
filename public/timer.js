var timerIntervalId;
var isTicking = false;
var clickCount = 0;

//CONSTANTS
var DEFAULT_TEMPLATE = '00:00:00';
var TITLE = 'zTimer';
var ONE_SECOND = 1000; //ms
var START_DATE = 'May 15, 1991 00:00:00';
var date = new Date(START_DATE);


window.onload = function () {
    //set defaults UI data
    updateHTML(DEFAULT_TEMPLATE);
    updateTitle(DEFAULT_TEMPLATE);

    document.body.onclick = clicksHandler;
    document.body.onkeyup = _onkeyupHandler;
};

function singleClick() {
    isTicking ? pauseTimer() : startTimer()
};

function doubleClick() {
    stopTimer();
    resetTimer();
    startTimer();
};

function _onkeyupHandler(e) {
    if ( ( e.keyCode == 13 ) || ( e.keyCode == 32 ) ) { // Enter and Space
        clicksHandler(e);
    } else if (e.keyCode == 27) { // Esc
        clicksHandler(e, true);
    }

}

function clicksHandler(e, imperativeReload) {
    e.stopPropagation();
    debugger
    clickCount++;
    if (clickCount == 1) {
        singleClickTimerId = setTimeout(function () {
            clickCount = 0;

            singleClick();
        }, 200);
    }
    // else
    if (( clickCount == 2 ) || imperativeReload) {
        clearTimeout(singleClickTimerId);
        clickCount = 0;

        doubleClick();
    }
};


function startTimer() {
    isTicking = true;
    drawBackground();

    timerIntervalId = setInterval(tickHandler, ONE_SECOND);
};

function pauseTimer() {
    isTicking = false;
    drawBackground();
    clearInterval(timerIntervalId);
};

//for now same like pauseTimer()
function stopTimer() {
    isTicking = false;
    drawBackground();
    clearInterval(timerIntervalId);
};

function tickHandler() {
    makeTick();

    var hours = getHours();
    var minutes = getMinutes();
    var seconds = getSeconds();

    var currentTime = hours + ':' + minutes + ':' + seconds;

    updateHTML(currentTime);
    updateTitle(currentTime);
};

function resetTimer() {
    date = new Date(START_DATE);
};

function makeTick() {
    date.setSeconds(date.getSeconds() + 1);
};

function updateTitle(value) {
    document.title = value + ' - ' + TITLE;
}

function getHours() {
    var hours = date.getHours();
    return hours < 10 ? '0' + hours : hours;
};

function getMinutes() {
    var minutes = date.getMinutes();
    return minutes < 10 ? '0' + minutes : minutes;
};

function getSeconds() {
    var seconds = date.getSeconds();
    return seconds < 10 ? '0' + seconds : seconds;
};

function updateHTML(time) {
    document.getElementById('timer').innerHTML = time;
};

function drawBackground() {
    if (isTicking) {
        document.body.style.backgroundColor = 'lightgreen';
    } else {
        document.body.style.backgroundColor = 'indianred';
    }
};
