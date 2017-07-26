/*////////////////////////////////////////////////////////////*/
       /*SELECTION NAVIGATION TIC TAC TOE GAME 7/22/2017*/
/*////////////////////////////////////////////////////////////*/

var globals = {};
var index = -1;
var currentIndex;
var gamepower = true;
//
//begin A check hitting Enter first :  ...
var begin = 0;

function selectForward() {
        if (gamepower) {
        setBegin();
        var elem =  document.getElementById("s"+index);
        if (index<9) {
        if (index == 8) {
        index = -1;
        }
        index++;
        //document.getElementsByClassName('square')[index].classList.add('glow');
        if (!(document.getElementById("s"+index).classList.contains('occupied')))
        {
        document.getElementById("s"+index).style.backgroundImage = "url('imgs/select.svg')";
        }
        if (document.getElementById("s"+index).classList.contains('occupied')) {
        //document.getElementsByClassName('square')[index].classList.remove('glow');    
        }
    }
        //console.log("WHAT IS MY INDEX: "+ index)
        currentIndex = index;
        deselectOtherCells(index);
    }
    showGlow(index);
}

function selectBackwards() {
        if(gamepower) {
        setBegin();
        if(index == -1) {
          index = 9
        }
        if (index>-1) {
        if (index == 0) {
        index = 9;
        }
        index--;
        if (!(document.getElementById("s"+index).classList.contains('occupied')))
        {
        document.getElementById("s"+index).style.backgroundImage = "url('imgs/select.svg')";
        }
    }
        //console.log("WHAT IS MY INDEX: "+ index)
        currentIndex = index;
        deselectOtherCells(index);
    }
    showGlow(index);
}

function deselectOtherCells(z) {
    for(var i=0; i<=8; i++) {
        if(z !== i && (!(document.getElementById("s"+i).classList.contains('occupied')))) {
        document.getElementById("s"+i).style.backgroundImage = "url('')";   
        }
      } 
}
function selectACell(indx) {
    if (!(document.getElementById("s"+index).classList.contains('occupied'))) {

        var next = new State(globals.game.currentState);
        next.board[indx] = "X";
        ui.insertAt(indx, "X");
        next.advanceTurn();
        globals.game.advanceTo(next);
    }
}

function divClick(e) {
         if(globals.game.status === "running" && globals.game.currentState.turn === "X" && ! e.target.classList.contains('occupied')) {

         var myString = e.target.id;
         var indx = Number(myString.substr(myString.length -1));
         var next = new State(globals.game.currentState);
         next.board[indx] = "X";
         ui.insertAt(indx, "X");
         next.advanceTurn();
         globals.game.advanceTo(next);
     };
 }


function checkKey(e) {
    e = e || window.event;
    if(e.keyCode == 13) {
    //Enter key has been pressed
    if(begin == 1) {
    selectACell(currentIndex);
    }
    }
    else if (e.keyCode == '37') {
       // left arrow
      selectBackwards();
    }
    else if (e.keyCode == '39') {
       // right arrow
        selectForward();
    }
}

function setBegin() {
    begin= 1;
}

function showGlow(i) {
    if(gamepower) {
        var myIndx = i;
        document.getElementsByClassName('square')[myIndx].classList.add('glow');
        setTimeout(removeGlow, 250);
        function removeGlow() {
        document.getElementsByClassName('square')[myIndx].classList.remove('glow');
        //
        var snd = new Audio("snd/Submarine.mp3"); // buffers automatically when created
        snd.play();
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////
function startTheGame() {
        gamepower = true;
        // var aiPlayer = new AI(selectedDiffeculty);
        var aiPlayer = new AI("master");
        globals.game = new Game(aiPlayer);
        aiPlayer.plays(globals.game);
        globals.game.start();
}

function init() {
startTheGame();
}
function OnLoad(){
 init();
}
window.addEventListener('load',OnLoad,false);
document.onkeydown = checkKey;
