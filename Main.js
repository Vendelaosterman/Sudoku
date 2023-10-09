function Main(){

    _this = this;
    //this.mainBoard = document.getElementsByClassName('mainBoard')[0];
    //this.gameBoard = document.getElementsByClassName('gameBoard')[0];
    this.levelBoard = document.getElementsByClassName('levelBoard')[0];
    //this.resultBoard = document.getElementsByClassName('resultBoard')[0];

    this.init = function(){
        let startBtn = document.getElementsByClassName('startBtn')[0];
        // Enable this one for full functionality
        startBtn.addEventListener('click', this.pickLevel);
        let newGameBtn = document.getElementsByClassName('newGameBtn')[0];
        newGameBtn.addEventListener('click', this.pickLevel);

        // Enable these ones for testing
        /*let testStartBtn = document.getElementsByClassName('testStartBtn')[0];
        testStartBtn.addEventListener('click', this.testingNewGame);
        _this.mainBoard.style.visibility="hidden";
        _this.gameBoard.style.visibility="visible";*/
    }

    this.pickLevel = function(){
        //console.log(_this.levelBoard)
        let resultBoard = document.getElementsByClassName('resultBoard')[0];
        _this.levelBoard = document.getElementsByClassName('levelBoard')[0];
        //console.log(newBoard);
        _this.levelBoard.style.visibility="visible";
        document.getElementsByClassName('level-wr')[0].classList.add('show');
        let levelElems = document.getElementsByClassName('level-wr')[0].getElementsByTagName('p');

        for(let i = 0; i < levelElems.length; i++){
            levelElems[i].addEventListener('click', _this.newGame);
        }
       
        /*for(let i=0; i < levelElems.length; i++){
            if(resultBoard.style.visibility=="visible"){
                console.log("resultBoard")
                levelElems[i].removeEventListener('click', _this.startGame);
                levelElems[i].addEventListener('click', _this.startNewGame);
            }else{
                console.log("not resultbord")
                levelElems[i].removeEventListener('click', _this.startNewGame);
                levelElems[i].addEventListener('click', _this.startGame);
            }
        }*/
    }

    this.newGame = function(){
        document.getElementsByClassName('level-wr')[0].classList.remove('show');
        let mainBoard = document.getElementsByClassName('mainBoard')[0];
        let gameBoard = document.getElementsByClassName('gameBoard')[0];
        let resultBoard = document.getElementsByClassName('resultBoard')[0];
        _this.levelBoard.style.visibility="hidden";
        mainBoard.style.visibility="hidden";
        resultBoard.style.visibility="hidden";
        gameBoard.style.visibility="visible";

        document.getElementsByTagName('body')[0].style.backgroundColor="white";
        document.getElementsByTagName('body')[0].style.background="white";

        let game = new Game();
        game.generateSudokuBoard(this);
    }

    this.startNewGame = function(){
        document.getElementsByClassName('level-wr')[0].classList.remove('show');
        let resultBoard = document.getElementsByClassName('resultBoard')[0];
        resultBoard.style.visibility="hidden";
        console.log("HELLO")
        _this.levelBoard.style.visibility="hidden";
        _this.gameBoard.style.visibility="visible";
        let game = new Game();
        game.generateSudokuBoard(this);
    }

    this.testingNewGame = function(){
        let game = new Game();
        game.generateSudokuBoard(2);
    }

}

let main = new Main;
main.init();