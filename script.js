var timerIntervalId;
var date = new Date(START_DATE);
var isTicking = false;

//CONSTANTS
var DEFAULT_TEMPLATE = '00:00:00';
var ROOT = 'root';
var TITLE = 'zTimer';
var ONE_SECOND = 1000; //ms
var START_DATE = 'May 15, 1991 00:00:00';

//or document.body.onclick
window.onclick = function (ev) {
  if (isTicking) {
    stopTimer();
  } else {
    startTimer();
  }
};

function startTimer() {
  updateHTML(DEFAULT_TEMPLATE);
  updateTitle(DEFAULT_TEMPLATE);

  isTicking = true;
  drawBackground();
  resetTimer();
  timerIntervalId = setInterval(tickHandler, ONE_SECOND);
};

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

  var currentTime = `${hours}:${minutes}:${seconds}`;

  updateHTML(currentTime);
  updateTitle(currentTime);
};

function resetTimer() {
  date = new Date(START_DATE)
};

function makeTick() {
  date.setSeconds(date.getSeconds() + 1);
};

function updateTitle(value) {
  document.title = `${value} - ${TITLE}`;
}

function getHours() {
  var hours = date.getHours();
  return hours < 10 ? `0${hours}` : hours;
};

function getMinutes() {
  var minutes = date.getMinutes();
  return minutes < 10 ? `0${minutes}` : minutes;
};

function getSeconds() {
  var seconds = date.getSeconds();
  return seconds < 10 ? `0${seconds}` : seconds;
};

function updateHTML(time) {
  document.getElementById('timer').innerHTML = time;
};

function drawBackground() {
  var root = document.getElementById(
    ROOT
  );
  if (isTicking) {
    document.body.style.backgroundColor = 'lightgreen';
  } else {
    document.body.style.backgroundColor = 'indianred';
  }
};
