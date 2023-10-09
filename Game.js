function Game(){

    let _this = this;

    this.missedNumbers;
    this.unSolvedBoard;
    this.solvedBoard;
    this.selectedNumber;
    this.timer; 
    this.level;
    this.editModeOn = false;
    this.score = 0;
    this.selectedBox = {
        elem: "",
        rowIndex: "",
        colIndex: ""
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

        // Handle listener on gameboard
        for (let i = 0; i < this.unSolvedBoard.length; i++) {
            for (let y = 0; y < this.unSolvedBoard[i].length; y++) {
    
                let row = this.rowElems[i].getElementsByClassName('square');
                if (this.unSolvedBoard[i][y] == 0) {
                    row[y].firstElementChild.innerHTML = "";
                    row[y].addEventListener('click', this.handleSelectedBox);
                } else {
                    row[y].firstElementChild.innerHTML = this.unSolvedBoard[i][y];
                }
            }
        }

        //handle listener on numbers div 
        for(let i=0; i < this.numberElems.length; i++){;
            this.numberElems[i].addEventListener('click', function() {
                _this.selectedNumber = this;
                if(_this.editModeOn){
                    _this.handleNotes();
                }else{
                    _this.checkIfCorrectNumber();
                }
            }); 
            
        }

        //init listener on edit button
        let editBtn = document.getElementsByClassName('editBtn')[0];
        editBtn.addEventListener('click', this.toggleNotesMode);

        //init listener on undo btn
        let undoBtn = document.getElementsByClassName('undoBtn')[0];
        undoBtn.addEventListener('click', this.handleUndo);

        this.timer = new Timer();
        this.timer.startTimer();

        let levelHudElem = document.getElementById('levelHud');
        levelHudElem.innerHTML = this.level;;
    }

    this.toggleNotesMode = function(){
        let editIcon = this.getElementsByClassName('editIcon')[0];
        let textColor;
        let backgroundColor;

         // Toggle between on/off
         if(_this.editModeOn){
            _this.editModeOn = false;
            this.classList.remove('edit-on');
            this.classList.add('edit-off');
            editIcon.innerHTML = "edit_off"
            textColor = "black";
            backgroundColor = "rgba(45,124,255,1)";

        }else if(!_this.editModeOn){
            _this.editModeOn = true;
            this.classList.remove('edit-off');
            this.classList.add('edit-on');
            editIcon.innerHTML = "edit"
            textColor = "gray";
            backgroundColor = "lightGray";
        }

        for(let i=0; i < _this.numberElems.length; i++){
            _this.numberElems[i].style.color = textColor;
            _this.numberElems[i].style.backgroundColor = backgroundColor;
        }

    }

    this.handleSelectedBox = function(){
        let boxes = document.getElementsByClassName('square');

        for (let i = 0; i < boxes.length; i++) {
            boxes[i].style.backgroundColor = "transparent";
        }

        _this.selectedBox.elem = this;
        _this.selectedBox.rowIndex = this.getAttribute('rowIndex');
        _this.selectedBox.colIndex = this.getAttribute('colIndex');
        _this.selectedBox.elem.style.backgroundColor = "rgba(188,213,255,1)";
    }

    this.checkIfCorrectNumber = function () {

        // Change classList
        this.selectedBox.elem.classList.remove('editModeOn');
        this.selectedBox.elem.classList.add('editModeOff');

        this.selectedBox.elem.innerHTML = this.selectedNumber.innerHTML;

        // Check if correct number
        if (this.selectedNumber.firstElementChild.innerHTML != this.solvedBoard[this.selectedBox.rowIndex][this.selectedBox.colIndex]) {
            _this.selectedBox.elem.style.color = "red";
        } else {
            for (let i = 0; i < this.missedNumbers.length; i++) {
                // if correct, remove the number from array
                if (this.missedNumbers[i].val == this.selectedNumber.firstElementChild.innerHTML) {
                    this.updateScore();
                    this.missedNumbers.splice(i, 1);
                    // Remove eventlistener on box 
                    this.selectedBox.elem.removeEventListener('click', this.handleSelectedBox);
                    break;
                }
            }
            this.selectedBox.elem.style.color = "black";
        }

        this.checkIfGameCompleted();
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
        document.getElementsByTagName('body')[0].style.background="rgb(188,213,255)";
        document.getElementsByTagName('body')[0].style.background="radial-gradient(circle, rgba(188,213,255,1) 0%, rgba(45,124,255,1) 100%)";

        let timeElem = document.getElementById('time');
        let levelElem = document.getElementById('level');
        let scoreElem = document.getElementById('score');
       
        timeElem.innerHTML = this.timer.gameDuration;
        levelElem.innerHTML = this.level;
        scoreElem.innerHTML = this.score;
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
        if(this.selectedBox.elem.classList.contains('editModeOff')){
            this.selectedBox.elem.firstElementChild.innerHTML = "";
        }

        this.selectedBox.elem.classList.remove('editModeOff');
        this.selectedBox.elem.classList.add('editModeOn');
        this.selectedBox.elem.style.color = "gray";
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

    this.updateScore = function(){
        let scoreElem = document.getElementById('scoreHud');
        this.score = this.timer.updateScore(this.selectedNumber.firstElementChild.innerHTML);
        scoreElem.innerHTML = this.score;
    }

    this.handleUndo = function(){
        console.log(_this.selectedBox)
        if(_this.selectedBox.elem.classList.contains('editModeOff')){
            _this.selectedBox.elem.firstElementChild.innerHTML = "";
        }
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