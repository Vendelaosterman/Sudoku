function Timer(){

    // Initialize variables for minutes and seconds
    this.minutes = 0;
    this.seconds = 0;
    this.intervalId; // Variable to store the interval ID
    this.gameDuration;
    this.timerElement = document.getElementById('timer');
    this.score = 0;
    this.baseScore = 20;
    _this = this;

// Function to update the timer display
this.updateTimerDisplay = function() {
    this.timerElement.textContent = `${this.minutes.toString().padStart(2, '0')}:${this.seconds.toString().padStart(2, '0')}`;
}

this.updateScore = function(point){
    this.score += this.baseScore * point;

    if(this.score < 0){
        this.score = 0;
    }

    return this.score;
}

// Function to start the timer
this.startTimer = function() {
    this.intervalId = setInterval(function () {
        _this.seconds++;
        if (_this.seconds === 60) {
            _this.seconds = 0;
            _this.minutes++;
            if(_this.baseScore != 1){
                _this.baseScore--;
            }
        }
        _this.updateTimerDisplay();
    }, 1000); // Update every 1 second (1000 milliseconds)
}

this.stopTimer = function() {
    clearInterval(this.intervalId);
    this.gameDuration = this.timerElement.innerHTML;
}
}