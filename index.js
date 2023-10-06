/*const BLANK_BOARD = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]*/

/*let counter
const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]*/

/*--------------------------------------------------------------------------------------------
--------------------------------- Initialize -------------------------------------
--------------------------------------------------------------------------------------------*/

/*const buttonElem = document.getElementsByTagName('button')[0];
buttonElem.addEventListener('click', initGame);*/

//const rows = document.getElementsByClassName('row');
//const numberElems = document.getElementsByClassName('number');
/*let solvedPuzzle;
let missedNumbers; */

/*let selectedNumber;
let selectedBox = {
    elem: "",
    row: "",
    box: ""
} */


function initGame() {
    //let startingBoard = newStartingBoard(5);

    /*let puzzleBoard = startingBoard[1];
    solvedPuzzle = startingBoard[2];
    missedNumbers = startingBoard[0];*/

    /*for (let i = 0; i < puzzleBoard.length; i++) {
        for (let y = 0; y < puzzleBoard[i].length; y++) {

            let row = rows[i].getElementsByClassName('square');
            if (puzzleBoard[i][y] == 0) {
                row[y].innerHTML = "";
                //row[y].addEventListener('click', setSelectedSquare(y))
                row[y].addEventListener('click', function() {
                    setSelectedSquare(this, i, y); 
                }); 
            } else {
                row[y].innerHTML = puzzleBoard[i][y];
            }
        }
    }*/

    
    /*for(let i=0; i<numberElems.length; i++){
        numberElems[i].addEventListener('click', checkIfCorrectNumber);
    }*/

    //startTimer();
}

/*function checkIfCorrectNumber(){
    selectedBox.elem.innerHTML = this.innerHTML;
    selectedNumber = this;

    if(this.innerHTML != solvedPuzzle[selectedBox.row][selectedBox.box]){
        selectedBox.elem.style.color = "red";
    }else{
        for(let i=0; i < missedNumbers.length; i++){
            // if correct, remove the number from array
            if(missedNumbers[i].val == this.innerHTML){
                missedNumbers.splice(i, 1)
                break;
            }
        }
        selectedBox.elem.style.color = "black";
    }

    isCompleted();
}*/

/*function setSelectedSquare(selectedSquare, rowIndex, squareIndex){
    let squares = document.getElementsByClassName('square');

    for(let i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = "transparent";
    }

    selectedBox.elem = selectedSquare;
    selectedBox.row = rowIndex;
    selectedBox.box = squareIndex;

    selectedSquare.style.backgroundColor = "lightblue";
}*/

/*function checkIfNumberCompleted(){
    let numberCompleted = true;
    for(let i=0; i < missedNumbers.length; i++){

        if(missedNumbers[i].val == selectedNumber.innerHTML){
           numberCompleted = false;
           break;
        }
    }
    return numberCompleted
}

function isCompleted(){
    if(checkIfNumberCompleted()){
        selectedNumber.style.visibility = "hidden";
    }

    if(missedNumbers.length < 1){
        console.log("GAME COMPLETED")
        stopTimer();
    }
}*/

/*function newStartingBoard (holes) {
    // Reset global iteration counter to 0 and Try to generate a new game. 
    // If counter reaches its maximum limit in the fillPuzzle function, current attemp will abort
    // To prevent the abort from crashing the script, the error is caught and used to re-run
    // this function
    try {
      counter = 0
      let solvedBoard = newSolvedBoard()  
  
      // Clone the populated board and poke holes in it. 
      // Stored the removed values for clues
      let [removedVals, startingBoard] = pokeHoles( solvedBoard.map ( row => row.slice() ), holes)
  
      return [removedVals, startingBoard, solvedBoard]
      
    } catch (error){ 
      return newStartingBoard(holes)
    }
}   */
 
  // The board will be completely solved once for each item in the empty cell list.
  // The empty cell array is rotated on each iteration, so that the order of the empty cells
  // And thus the order of solving the game, is different each time.
  // The solution for each attempt is pushed to a possibleSolutions array as a string
  // Multiple solutions are identified by taking a unique Set from the possible solutions
  // and measuring its length. If multiple possible solutions are found at any point
  // If will return true, prompting the pokeHoles function to select a new value for removal.
  
  function multiplePossibleSolutions (boardToCheck) {
    const possibleSolutions = []
    const emptyCellArray = emptyCellCoords(boardToCheck)
    for (let index = 0; index < emptyCellArray.length; index++) {
      // Rotate a clone of the emptyCellArray by one for each iteration
      emptyCellClone = [...emptyCellArray]
      const startingPoint = emptyCellClone.splice(index, 1);
      emptyCellClone.unshift( startingPoint[0] ) 
      thisSolution = fillFromArray( boardToCheck.map( row => row.slice() ) , emptyCellClone)
      possibleSolutions.push( thisSolution.join() )
      if (Array.from(new Set(possibleSolutions)).length > 1 ) return true
    }
    return false
  }
  
  // This will attempt to solve the puzzle by placing values into the board in the order that
  // the empty cells list presents
  function fillFromArray(startingBoard, emptyCellArray) {
    const emptyCell = nextStillEmptyCell(startingBoard, emptyCellArray)
    if (!emptyCell) return startingBoard
    for (num of shuffle(numArray) ) {   
      pokeCounter++
      if ( pokeCounter > 60_000_000 ) throw new Error ("Poke Timeout")
      if ( safeToPlace( startingBoard, emptyCell, num) ) {
        startingBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = num 
        if ( fillFromArray(startingBoard, emptyCellArray) ) return startingBoard 
        startingBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = 0 
      }
    }
    return false
  }
  
  // As numbers get placed, not all of the initial cells are still empty.
  // This will find the next still empty cell in the list
  function nextStillEmptyCell (startingBoard, emptyCellArray) {
    for (coords of emptyCellArray) {
      if (startingBoard[ coords.row ][ coords.col ] === 0) return {rowIndex: coords.row, colIndex: coords.col}
    }
    return false
  }
  
  // Generate array from range, inclusive of start & endbounds.
  const range = (start, end) => {
    const length = end - start + 1
    return Array.from( {length} , ( _ , i) => start + i)
  }
  
  // Get a list of all empty cells in the board from top-left to bottom-right
  function emptyCellCoords (startingBoard) {
    const listOfEmptyCells = []
    for (const row of range(0,8)) {
      for (const col of range(0,8) ) {
        if (startingBoard[row][col] === 0 ) listOfEmptyCells.push( {row, col } )
      }
    }
    return listOfEmptyCells
  }


/*function shuffle(array){
    let newArray = [...array]
    for ( let i = newArray.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * ( i + 1 ) );
        [ newArray[ i ], newArray[ j ] ] = [ newArray[ j ], newArray[ i ] ];
    }
    return newArray;
}*/


/*--------------------------------------------------------------------------------------------
--------------------------------- Check if Location Safe -------------------------------------
--------------------------------------------------------------------------------------------*/

/*function rowSafe(puzzleArray, emptyCell, num){
    return puzzleArray[ emptyCell.rowIndex ].indexOf(num) == -1
}

function colSafe(puzzleArray, emptyCell, num){
    return !puzzleArray.some(row => row[ emptyCell.colIndex ] == num )
}

function boxSafe(puzzleArray, emptyCell, num){
     // Define top left corner of box region for empty cell
     boxStartRow = emptyCell.rowIndex - (emptyCell.rowIndex % 3) 
     boxStartCol = emptyCell.colIndex - (emptyCell.colIndex % 3)
     let safe = true
   
     for ( boxRow of [0,1,2] ) {  // Each box region has 3 rows
       for ( boxCol of [0,1,2] ) { // Each box region has 3 columns
         // Is num is present in box region?
         if ( puzzleArray[boxStartRow + boxRow][boxStartCol + boxCol] == num ) { 
           safe = false // If number is found, it is not safe to place
         }
       }
     }
     return safe
}*/

/*function safeToPlace(puzzleArray, emptyCell, num){
    return rowSafe(puzzleArray, emptyCell, num) && 
  colSafe(puzzleArray, emptyCell, num) && 
  boxSafe(puzzleArray, emptyCell, num) 
}*/

/*--------------------------------------------------------------------------------------------
--------------------------------- Obtain Next Empty Cell -------------------------------------
--------------------------------------------------------------------------------------------*/

/*function nextEmptyCell(puzzleArray) {
    const emptyCell = { 
        rowIndex: "", 
        colIndex: "" 
    }

    puzzleArray.forEach((row, rowIndex) => {
        // If this key has already been assigned, skip iteration
        if (emptyCell.colIndex !== "") return

        // find first zero-element
        let firstZero = row.find(col => col === 0)

        // if no zero present, skip to next row
        if (firstZero === undefined) return;
        emptyCell.rowIndex = rowIndex
        emptyCell.colIndex = row.indexOf(firstZero)
    })

    if (emptyCell.colIndex !== "") return emptyCell
    // If emptyCell was never assigned, there are no more zeros
    return false
}*/

/*--------------------------------------------------------------------------------------------
--------------------------------- Generate Filled Board -------------------------------------
--------------------------------------------------------------------------------------------*/

/*function fillPuzzle(startingBoard) {
    const emptyCell = nextEmptyCell(startingBoard)
    // If there are no more zeros, the board is finished, return it
    if (!emptyCell) {
        return startingBoard
    }

    for (num of shuffle(numArray)) {
        // counter is a global variable tracking the number of iterations performed in generating a puzzle
        // Most puzzles generate in < 500ms, but occassionally random generation could run in to
        // heavy backtracking and result in a long wait. Best to abort this attempt and restart.
        // See initializer function for more
        counter++
        if (counter > 20_000_000) throw new Error("Recursion Timeout")

        if (safeToPlace(startingBoard, emptyCell, num)) {
            // If safe to place number, place it
            startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = num

            // Recursively call the fill function to place num in next empty cell
            if (fillPuzzle(startingBoard)) {
                return startingBoard
            }
            // If we were unable to place the future num, that num was wrong. 
            // Reset it and try next
            startingBoard[emptyCell.rowIndex][emptyCell.colIndex] = 0
        }
    }
    // If unable to place any number, return false, 
    // causing previous round to go to next num
    return false
}*/

/*function newSolvedBoard(){
    const newBoard = BLANK_BOARD.map(row => row.slice() ) // Create an unaffiliated clone of a fresh board
    fillPuzzle(newBoard) // Populate the board using backtracking algorithm
    return newBoard
}*/

/*--------------------------------------------------------------------------------------------
--------------------------------- Generate Playable Board ------------------------------------
--------------------------------------------------------------------------------------------*/

/*function pokeHoles(startingBoard, holes){
    const removedVals = []
  
    while (removedVals.length < holes) {
      const val = Math.floor(Math.random() * 81) // Value between 0-81
      const randomRowIndex = Math.floor(val / 9) // Integer 0-8 for row index
      const randomColIndex = val % 9 
  
      if (!startingBoard[ randomRowIndex ]) continue // guard against cloning error
      if ( startingBoard[ randomRowIndex ][ randomColIndex ] == 0 ) continue // If cell already empty, restart loop
      
      removedVals.push({  // Store the current value at the coordinates
        rowIndex: randomRowIndex, 
        colIndex: randomColIndex, 
        val: startingBoard[ randomRowIndex ][ randomColIndex ] 
      })
      startingBoard[ randomRowIndex ][ randomColIndex ] = 0 // "poke a hole" in the board at the coords
      const proposedBoard = startingBoard.map ( row => row.slice() ) // Clone this changed board
      
      // Attempt to solve the board after removing value. If it cannot be solved, restore the old value.
      // and remove that option from the list
      if ( !fillPuzzle( proposedBoard ) ) {  
        startingBoard[ randomRowIndex ][ randomColIndex ] = removedVals.pop().val 
      }
    }
    return [removedVals, startingBoard]
}*/

/*--------------------------------------------------------------------------------------------
--------------------------------- Timer -------------------------------------
--------------------------------------------------------------------------------------------*/

// Initialize variables for minutes and seconds
/*let minutes = 0;
let seconds = 0;
let intervalId; // Variable to store the interval ID
let gameDuration;

// Function to update the timer display
function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    //gameDuration
}

// Function to start the timer
function startTimer() {
    intervalId = setInterval(function () {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateTimerDisplay();
    }, 1000); // Update every 1 second (1000 milliseconds)
}

function stopTimer() {
    clearInterval(intervalId);
    const timerElement = document.getElementById('timer');
    console.log(timerElement.innerHTML)
}*/
