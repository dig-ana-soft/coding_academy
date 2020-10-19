
    var tiles = [];     // tile object
    var player = 'X';   // player's turn
    var winner = '!';    // winner status. not undefined, to trigger initboard on load
    
    /* Tile Object Functions */
    //-----------------------//
    function Tile(i) {                      // Tile constructor
        this.id = i;                        // d for div
        this.div = document.getElementById(i);   // get div handle
        this.value = '_';   // initial value
    }
    Tile.prototype.play = function(xO) {    // Fills the tile object with X/O
        if (this.value === '_') {           // check if empty
            this.value = xO.toUpperCase();  // if so - fill it
            if (player == 'X') {            // then switch turn
                player = 'O';
            } else {
                player = 'X';
            }
        }
    }
    Tile.prototype.print = function() {     // Prints the tile on page
        this.div.innerText = this.value;}
    
    function initBoard() {                  // New game
        for (let i=1; i<=9; i++) {
            tiles[i] = new Tile(i);         // Create tiles objects
            tiles[i].print();
            player = 'X';                   // X begins
            playerPrint(player);
        }
        document.querySelector("#banner").style.visibility="hidden";
    }
    
    function tileClick() {
        if (winner) {initBoard();}
        var tileId = event.target.id;       // get div id
        tiles[tileId].play(player);         // play with player
        tiles[tileId].print();              // print it

        playerPrint(player);                // change info box player
        winner = checkForWin();             // check for win
        if (winner) {                       // winning routine
            let bannerDiv=document.querySelector("#banner");
            bannerDiv.innerText = "PLAYER " + winner + " WINS!!"
            bannerDiv.style.visibility="visible";
            bannerDiv.style.animationDuration="2s";            
        };
    }

    const playerPrint = (player) => {
        document.querySelector("#info-box").innerText = 'PLAYER: ' + player;
    }

    function checkForWin() {
        // check lines :
        for (let i=1; i<=9; i+=3) {
            if (checkLine(tiles[i], tiles[i+1], tiles[i+2])) {
                return tiles[i].value;
            }
        }
        // check columns
        for (let i=1; i<=3; i++) {
            if (checkLine(tiles[i], tiles[i+3], tiles[i+6])) {
                return tiles[i].value;
            }
        }
        // check diagonals
        if (checkLine(tiles[1], tiles[5], tiles[9])) {
            return tiles[5].value;
        }
        if (checkLine(tiles[3], tiles[5], tiles[7])) {
            return tiles[5].value;
        }
    }

    // gets 3 tiles and if they're the same - return their value
    const checkLine = (a, b, c) => {
        if (a.value == b.value && a.value == c.value && a.value != '_') {
                return a.value;
        }
    }
    const boardDiv = document.querySelector("#board");
    
    
    //let tiles[10] = [];
    
