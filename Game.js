function Game(){

    let _this = this;

    this.missedNumbers;
    this.unSolvedBoard;
    this.solvedBoard;
    this.selectedNumber;
    this.timer; 
    this.level;
    this.editModeOn = false;
    this.selectedBox = {
        elem: "",
        row: "",
        box: ""
    } 

    this.rowElems = document.getElementsByClassName('row');
    this.numberElems = document.getElementsByClassName('number');
    
    

    this.generateSudokuBoard = function(level){
        let board = new SudokuGenerator();
        let startingBoard = board.newStartingBoard(level.id);
        this.level = level.innerHTML;
        this.missedNumbers = startingBoard[0];
        this.unSolvedBoard = startingBoard[1];
        this.solvedBoard = startingBoard[2];

        this.handleEventListener();
    }

    this.handleEventListener = function(){

        // Handle listener on board
        for (let i = 0; i < this.unSolvedBoard.length; i++) {
            for (let y = 0; y < this.unSolvedBoard[i].length; y++) {
    
                let row = this.rowElems[i].getElementsByClassName('square');
                if (this.unSolvedBoard[i][y] == 0) {
                    row[y].firstElementChild.innerHTML = "";
                    row[y].addEventListener('click', function() {
                        _this.handleSelectedBox(this, i, y); 
                    }); 
                } else {
                    row[y].firstElementChild.innerHTML = this.unSolvedBoard[i][y];
                }
            }
        }

        //handle listener on numbers div 
        for(let i=0; i < this.numberElems.length; i++){
            this.numberElems[i].addEventListener('click', this.checkIfCorrectNumber);
        }

        //handle listener on edit button
        let editBtn = document.getElementsByClassName('editBtn')[0];
        let editText = editBtn.getElementsByTagName('p')[0];
        let textColor;
        let backgroundColor;
        editBtn.addEventListener('click', function(){
            // Toggle between on/off
            if(_this.editModeOn){
                _this.editModeOn = false;
                editBtn.classList.remove('edit-on');
                editBtn.classList.add('edit-off');
                editText.innerHTML="OFF";
                textColor = "black";
                backgroundColor = "rgba(45,124,255,1)";

            }else if(!_this.editModeOn){
                _this.editModeOn = true;
                editBtn.classList.remove('edit-off');
                editBtn.classList.add('edit-on');
                editText.innerHTML="ON";
                textColor = "gray";
                backgroundColor = "lightGray";
            }

            for(let i=0; i < _this.numberElems.length; i++){
                _this.numberElems[i].style.color = textColor;
                _this.numberElems[i].style.backgroundColor = backgroundColor;
            }
        });

        this.timer = new Timer();
        this.timer.startTimer();

        let levelHudElem = document.getElementById('levelHud');
        console.log(this.level)
        levelHudElem.innerHTML = this.level;;
    }

    this.handleSelectedBox = function(selectedBoxElem, rowIndex, boxIndex){
        let boxes = document.getElementsByClassName('square');

        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = "transparent";
        }

        this.selectedBox.elem = selectedBoxElem;
        this.selectedBox.row = rowIndex;
        this.selectedBox.box = boxIndex;

        selectedBoxElem.style.backgroundColor = "rgba(188,213,255,1)";
    }

    this.checkIfCorrectNumber = function () {
        _this.selectedNumber = this;
        // Check if editmode is enabled
        if(_this.editModeOn){
            _this.handleNotes();
            return
        }

        _this.selectedBox.elem.innerHTML = this.innerHTML;

        // Check if correct number
        if (this.firstElementChild.innerHTML != _this.solvedBoard[_this.selectedBox.row][_this.selectedBox.box]) {
            _this.selectedBox.elem.style.color = "red";
        } else {
            for (let i = 0; i < _this.missedNumbers.length; i++) {
                // if correct, remove the number from array
                if (_this.missedNumbers[i].val == this.firstElementChild.innerHTML) {
                    console.log(_this.missedNumbers[i].val)
                    console.log(this.innerHTML)
                    _this.missedNumbers.splice(i, 1)
                    break;
                }
            }
            _this.selectedBox.elem.style.color = "black";
        }

        _this.checkIfGameCompleted();
    }

    this.checkIfGameCompleted = function(){
        if(this.areAllPresent()){
            this.selectedNumber.style.visibility = "hidden";
        }
    
        if(this.missedNumbers.length < 1){
            this.timer.stopTimer();
            this.showResultBoard();
        }
    }

    this.showResultBoard = function(){
        document.getElementsByClassName('gameBoard')[0].style.visibility = "hidden";
        document.getElementsByClassName('resultBoard')[0].style.visibility = "visible";

        let timeElem = document.getElementById('time');
        let levelElem = document.getElementById('level');
        console.log(timeElem)
        timeElem.innerHTML = this.timer.gameDuration;
        levelElem.innerHTML = this.level;
    }

    // A method that checks if all occurrences of a specific number are on the board
    this.areAllPresent = function(){
        let numberCompleted = true;
        console.log(this.missedNumbers)
        for (let i = 0; i < this.missedNumbers.length; i++) {
            if (this.missedNumbers[i].val == this.selectedNumber.firstElementChild.innerHTML) {
                numberCompleted = false;
                break;
            }
        }
        return numberCompleted
    }

    this.handleNotes = function(){
        this.selectedBox.elem.classList.remove('editModeOff');
        this.selectedBox.elem.classList.add('editModeOn');
        let sortedString;

        // Remove character if already exists
        if(this.selectedBox.elem.firstElementChild.innerHTML.includes(this.selectedNumber.firstElementChild.innerHTML)){
            let newString = this.selectedBox.elem.firstElementChild.innerHTML.replace(this.selectedNumber.firstElementChild.innerHTML, "");
            sortedString = this.sortString(newString);
        }else{
            // add character to string 
            let currentContent = this.selectedBox.elem.firstElementChild.innerHTML;
            console.log(currentContent);
            currentContent += this.selectedNumber.firstElementChild.innerHTML;
            sortedString = this.sortString(currentContent);
        }

        this.selectedBox.elem.firstElementChild.innerHTML = sortedString;
    }

    this.sortString = function(originalString){
        let digitsList = originalString.split('');
        digitsList.sort(function(a, b) {
            return a - b;
        });
        
        let sortedString = digitsList.join('');
        return sortedString;
    }
}