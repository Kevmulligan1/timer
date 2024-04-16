let timerInterval;
let startTimeStamp;

// Check if there is a start timestamp stored in local storage
if (localStorage.getItem('startTimeStamp')) {
  startTimeStamp = parseInt(localStorage.getItem('startTimeStamp'));
  startTimer(); // Start the timer if a timestamp exists
} else {
  startTimeStamp = Date.now(); // Record the current timestamp if it doesn't exist
  localStorage.setItem('startTimeStamp', startTimeStamp); // Save the timestamp to local storage
}

function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  startTimeStamp = Date.now(); // Reset the start timestamp to the current time
  localStorage.setItem('startTimeStamp', startTimeStamp); // Save the updated timestamp to local storage
  updateTimerDisplay(); // Reset the timer display
}

function updateTimer() {
  const currentTimeStamp = Date.now();
  const timeDifference = currentTimeStamp - startTimeStamp;
  const totalSeconds = Math.floor(timeDifference / 1000);
  let remainingSeconds = totalSeconds;

  const days = Math.floor(remainingSeconds / (3600 * 24));
  remainingSeconds %= 3600 * 24;
  const hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds %= 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  updateTimerDisplay(days, hours, minutes, seconds);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  const displayDays = days < 10 ? "0" + days : days;
  const displayHours = hours < 10 ? "0" + hours : hours;
  const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
  const displaySeconds = seconds < 10 ? "0" + seconds : seconds;
  document.getElementById("timer").textContent = displayDays + ":" + displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
