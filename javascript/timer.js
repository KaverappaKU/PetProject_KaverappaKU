window.onload = loadPage;

function loadPage() {
  // Variable declaration for different sections of the form
  var addTaskDetails = document.getElementById("add-task-details");
  var timerWrapper = document.getElementById("timer-wrapper");
  var displayResults = document.getElementById("results");
  // Variable declaration for the buttons
  var addTaskButton = document.getElementById("addtask-button");
  var endTaskButton = document.getElementById("end-task");
  // Variable declaration for input box validations
  var taskName = document.getElementById("taskname");
  var estTime = document.getElementById("esttime");
  // Variable declaration for displaying task details
  var displayTaskName = document.getElementById("displayTask");
  var displayTaskEstTime = document.getElementById("displayEstTime");
  var displayTaskResults = document.getElementById("displayTaskResults");
  var displayTaskEstResults = document.getElementById("displayEstTimeResults");
  var displayTimeTakenResults = document.getElementById(
    "displayTimeTakenResults"
  );
  var displayTimeDiffResults = document.getElementById(
    "displayTimeDiffResults"
  );
  var displayPauseResults = document.getElementById("displayPauseResults");
  var displayResetResults = document.getElementById("displayResetResults");
  var errorMessage = document.getElementById("error-message");
  // Variable declaration for timer buttons
  var startButton = document.getElementById("startButton");
  var stopButton = document.getElementById("stopButton");
  var resetButton = document.getElementById("resetButton");
  var seconds = 0;
  var minutes = 0;
  var hour = 0;
  var totalTime = 0;
  var estimatedTime = 0;
  var timeDiff = 0;
  var pauses = 0;
  var formattedTime = null;
  var secondsTime = null;
  var minutesTime = null;
  var hourTime = null;
  var interval = null;
  var secTimer = document.getElementById("ss");
  var minTimer = document.getElementById("mm");
  var hourTimer = document.getElementById("hh");

  var mode = document.getElementById("mode");
  var isResetClicked = false;
  var reset = 0;

  // Adding eventlistener for toggling between dark mode and light mode
  mode.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      mode.src = "images/light.png";
    } else {
      mode.src = "images/night.png";
    }
  });

  // Function to start the timer
  function startTimer() {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hour++;
      }
    }

    // Variable declaration and adding 0 to the time if it less than 10
    secondsTime = seconds < 10 ? "0" + seconds : seconds;
    minutesTime = minutes < 10 ? "0" + minutes : minutes;
    hourTime = hour < 10 ? "0" + hour : hour;

    secTimer.innerHTML = secondsTime;
    minTimer.innerHTML = minutesTime + " : ";
    hourTimer.innerHTML = hourTime + " : ";
  }

  // start timer button
  startButton.addEventListener("click", function () {
    interval = setInterval(startTimer, 1000);
    isResetClicked = false;
  });

  // stop timer button
  stopButton.addEventListener("click", function () {
    clearInterval(interval);
    pauses++;
  });

  // reset timer button
  resetButton.addEventListener("click", function () {
    clearInterval(interval);
    secTimer.innerHTML = "00";
    minTimer.innerHTML = "00" + " : ";
    hourTimer.innerHTML = "00" + " : ";
    seconds = 0;
    minutes = 0;
    hour = 0;
    isResetClicked = true;
    reset++;
  });

  // Function to calculate total time and time difference
  function calculateTime() {
    if (isResetClicked) {
      totalTime = 0;
    } else {
      totalTime =
        parseInt(hourTime * 360) +
        parseInt(minutesTime * 60) +
        parseInt(secondsTime);
    }
    estimatedTime = parseInt(estTime.value * 60);
    if (totalTime > estimatedTime) {
      timeDiff = (totalTime - estimatedTime) / 60;
    } else {
      timeDiff = (estimatedTime - totalTime) / 60;
    }
    timeDiff = timeDiff.toFixed(2);
  }

  // Function to format the time
  function formatTime(timeInput) {
    const hours = Math.floor(timeInput / 60);
    const minutes = Math.floor(timeInput % 60);
    const seconds = Math.round((timeInput % 1) * 60);

    if (hours == 0 && minutes == 0) {
      formattedTime = `${seconds} second(s)`;
    } else if (hours == 0) {
      if (seconds == 0) {
        formattedTime = `${minutes} minute(s)`;
      } else {
        formattedTime = `${minutes} minute(s), and ${seconds} second(s)`;
      }
    } else {
      formattedTime = `${hours} hour(s), ${minutes} minute(s), and ${seconds} second(s)`;
    }
    return formattedTime;
  }

  // Function to validate input fields
  function validateInputs() {
    if (taskName.value === "") {
      taskName.style.background = "red";
      taskName.focus();
      return false;
    }
    taskName.style.background = "white";

    if ((estTime.value === "") | Number.isNaN(Number(estTime.value))) {
      estTime.style.background = "red";
      estTime.focus();
      return false;
    }
    estTime.style.background = "white";
    return true;
  }

  // Adding eventListener for adding task
  addTaskButton.addEventListener("click", function () {
    if (validateInputs()) {
      displayTaskName.innerHTML = " " + taskName.value + " ";
      displayTaskEstTime.innerHTML = estTime.value;
      addTaskDetails.style.display = "none";
      timerWrapper.style.display = "block";
    }
  });

  // Adding eventListener for ending task
  endTaskButton.addEventListener("click", function () {
    clearInterval(interval);
    calculateTime();
    // Checking for total time non-zero
    if (!isNaN(totalTime) && totalTime !== 0) {
      const timeTaken = (totalTime / 60).toFixed(2);
      displayTaskResults.innerHTML = taskName.value;
      formatTime(estTime.value);
      displayTaskEstResults.innerHTML = formattedTime;
      formatTime(timeTaken);
      displayTimeTakenResults.innerHTML = formattedTime;
      formatTime(timeDiff);
      if (totalTime > estimatedTime) {
        displayTimeDiffResults.innerHTML =
          formattedTime + " more than the estimated time";
      } else {
        displayTimeDiffResults.innerHTML =
          formattedTime + " less than the estimated time";
      }
      displayPauseResults.innerHTML = pauses;
      displayResetResults.innerHTML = reset;
      timerWrapper.style.display = "none";
      displayResults.style.display = "block";
    } else {
      errorMessage.style.display = "block";
      errorMessage.style.color = "#c21313";
      errorMessage.innerHTML =
        "You've not started the task yet, stop wasting time and get to work!!" +
        "<br>" +
        "Hit that start button now";
    }
  });

  return false;
}
