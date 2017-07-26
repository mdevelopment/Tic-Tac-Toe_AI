/*
 * ui object encloses all UI related methods
 */
var ui = {};



//holds the current visible view
//ui.currentView = "";

/*
 * switchs the view on the UI depending on who's turn it switchs
 * @param turn [String]: the player to switch the view to
 */

ui.switchViewTo = function(turn) {
    //console.log("SWITCHING VIEW TO: "+ turn)
    //helper function for async calling
    function _switch(_turn) {
        ui.currentView = "#" + _turn;
    }
    if (turn === "lost"  ) {
            //console.log("LOST MESSAGE!!!");
            document.getElementById('Finals').style.visibility = "visible";
            document.getElementById('Won').style.visibility = "visible";
            document.getElementById('Restart').style.visibility = "visible";
            gamepower =  false;
            
        } else if (turn === "draw") {
          //console.log("DRAW MESSAGE");
          document.getElementById('Finals').style.visibility = "visible";
          document.getElementById('Draw').style.visibility = "visible";
          document.getElementById('Restart').style.visibility = "visible";
          gamepower =  false;
    } 
};

/*
 * places X or O in the specifed place in the board
 * @param i [Number] : row number (0-indexed)
 * @param j [Number] : column number (0-indexed)
 * @param symbol [String]: X or O
 */
ui.insertAt = function(indx, symbol) {

    var targetCell = document.getElementById("s"+indx);
    if(!targetCell.classList.contains('occupied')) {
            targetCell.classList.add('occupied');
            if(symbol == "X") {
            document.getElementById("s"+indx).style.backgroundImage = "url('imgs/X.svg')";
        } else if(symbol == "O") {
            document.getElementById("s"+indx).style.backgroundImage = "url('imgs/O.svg')";
        }
    }
}
