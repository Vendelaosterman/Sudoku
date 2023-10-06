function Main(){

    _this = this;
    this.mainBoard = document.getElementsByClassName('mainBoard')[0];
    this.gameBoard = document.getElementsByClassName('gameBoard')[0];
    this.levelBoard = document.getElementsByClassName('levelBoard')[0];

    this.init = function(){
        let startBtn = document.getElementsByClassName('startBtn')[0];
        // Enable this one for full functionality
        startBtn.addEventListener('click', this.pickLevel);

        // Enable these ones for testing
        /*let testStartBtn = document.getElementsByClassName('testStartBtn')[0];
        testStartBtn.addEventListener('click', this.testingNewGame);
        _this.mainBoard.style.visibility="hidden";
        _this.gameBoard.style.visibility="visible";*/
    }

    this.pickLevel = function(){
        //_this.levelBoard.classList.add('show');
        _this.levelBoard.style.visibility="visible";
        document.getElementsByClassName('level-wr')[0].classList.add('show');
        let levelElems = document.getElementsByClassName('level-wr')[0].getElementsByTagName('p');
       
        for(let i=0; i < levelElems.length; i++){
            levelElems[i].addEventListener('click', _this.startNewGame);
        }
    }

    this.startNewGame = function(){
        _this.mainBoard.style.visibility="hidden";
        _this.gameBoard.style.visibility="visible";
        _this.levelBoard.style.visibility="hidden";
        document.getElementsByTagName('body')[0].style.backgroundColor="white";
        document.getElementsByTagName('body')[0].style.background="white";

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