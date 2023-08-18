//create player factory
const playerFactory = (name, symbol) => {
    this.name = name
    this.symbol = symbol
    return {name, symbol}
}

let player1 = playerFactory("Player1", "X")
let player2 = playerFactory("Player2", "O")


//module display winning message
var winnerBanner = (function(){
    const overlay = document.querySelector('.overlay');
    const msgContainer = document.querySelector('.msgcontainer');

    function displayMessage(msg) {
        const message = document.createElement('div');
        message.classList.add('msg');
        message.textContent = msg;
        msgContainer.appendChild(message);

        overlay.style.display = 'flex'; // Show the overlay
    }

    function resetMessage() {
        overlay.style.display = 'none'; // Hide the overlay
        msgContainer.innerHTML = '';
    }

    return { displayMessage, resetMessage };
})();

//module evaluate game
var winner = (function(){
    function evaluateWinner(){
        function hasWinningCombo(array) {
            const winArrays = [
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
                ['1', '4', '7'],
                ['2', '5', '8'],
                ['3', '6', '9'],
                ['1', '5', '9'],
                ['3', '5', '7']
            ];

            return winArrays.some(winArray =>
                winArray.every(element => array.includes(element))
            );
        }

        if (hasWinningCombo(chooseSpace.player1moves)){
            winnerBanner.displayMessage('Player 1 wins!');
        }
        else if (hasWinningCombo(chooseSpace.player2moves)){
            winnerBanner.displayMessage('Player 2 wins!');
        }
        else if(chooseSpace.player1moves.length + chooseSpace.player2moves.length === 9){
            winnerBanner.displayMessage("It's a tie!");
        }
    }  

    return {evaluateWinner};
})();


//module chooseSpace
    //for each space add click event and fill with the symbol of player
var chooseSpace = (function(){
    var currentPlayer = player1;
    var player1moves=[]
    var player2moves=[]

    var currentMove = document.querySelector('.currentplayermsg')
    currentMove.textContent = "It is Player1's Move"

    const spaces = document.querySelectorAll('.space')
        spaces.forEach((move)=> {
            move.addEventListener('click', () => {
                move.textContent = currentPlayer.symbol;

                if(currentPlayer==player1){
                    player1moves.push(move.id)}
                else {player2moves.push(move.id)};

                currentPlayer = (currentPlayer === player1) ? player2 : player1;

                currentMove.textContent = `It is ${currentPlayer.name}'s Move`;

                winner.evaluateWinner();
                }, { once: true });
        });
    
    return {player1moves, player2moves, currentPlayer}
})();


//reset Module
var reset = (function(){
    const resetButton = document.querySelector('.reset');
    resetButton.addEventListener('click', () => {
        chooseSpace.currentPlayer = player1;
        chooseSpace.player1moves=[];
        chooseSpace.player2moves=[];
        location.reload(); 
        winnerBanner.resetMessage();
    });
})();







