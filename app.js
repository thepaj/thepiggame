/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

newGame();

//document is the object
// # because of CSS
//document.querySelector('#current-' + activePlayer).textContent = dice; // **setter

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-1').textContent; // **getter

document.querySelector('.btn-roll').addEventListener('click', function() {
 
    if (gamePlaying) {
        
         //1. random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. display results
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. update the roundScore IF the rolled number wasn't 1

        if (dice !== 1) {
            //Add score
            roundScore += dice;
            // === roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }   
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if (gamePlaying) {
        
        // 1. add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // 2. Update the UI (user interface)
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Check if player won the game
        if (scores[activePlayer] >= 10) {
            
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // state variable tells us the condition of the system
            gamePlaying = false;

        } else {
            nextPlayer();
        }
        
    }
    
})

document.querySelector('.btn-new').addEventListener('click', newGame); // no function call operator, otherwise function called immediately

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        // ===
//        if (activePlayer === 0) {
//            activePlayer = 1;
//        } else {
//            activePlayer = 0;
//        }
        roundScore = 0;
        
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        
        // document.querySelector('.player-0-panel').classList.remove('active');
        // document.querySelector('.player-1-panel').classList.add('active');
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
}

function newGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
