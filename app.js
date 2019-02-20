let scores;
let roundScore;
let activePlayer;
let gameOn;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gameOn) {
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';
        document.querySelector('.dice2').style.display = 'block';
        document.querySelector('.dice2').src = 'dice-' + dice2 + '.png';

        if (dice === 6) {
            let six = dice;
            roundScore += six;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else if (dice !== 1 && dice2 !== 1) {
            roundScore += (dice + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', function () {
    newGame();
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gameOn) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        if (scores[activePlayer] >= 10) {
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            gameOn = false;

        } else {
            nextPlayer();
        }
    }


});

function newGame() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameOn = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function nextPlayer() {

    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

}
