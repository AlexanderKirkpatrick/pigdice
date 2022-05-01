// Business Logic for Gamers
function Gamers (player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.activePlayer;
  this.gameStart = false;
} 

Gamers.prototype.currentPlayerSwitch = function() {
  if (this.player1.isTurn === true) {
    this.player1.isTurn = false;
    this.player2.isTurn = true;
    this.player1 = this.currentPlayer;
    this.currentPlayer = this.Player2;
  } else if (this.player2.isTurn === true) {
    this.player2.isTurn = false;
    this.player1.isTurn = true;
    this.player2 = this.currentPlayer;
    this.currentPlayer = this.player1;
  } else {
    this.currentPlayer = this.player1;
    this.player1.isTurn= true;
  }
}

Gamers.prototype.winnerStatusCheck = function () {
  if (this.currentPlayer.currentScore >= 100) {
    return true;
  }
}

//Business Logic for Scores

function Score (tempScore, totalScore) {
  this.tempScore = tempScore;
  this.totalScore = totalScore;
}

Score.prototype.start = function(dice) {
  dice.roll();
  if(dice.side === 1) {
    this.tempScore = 0;
    
  } else {
    this.tempScore += dice.side;
  }
}

Score.prototype.hold = function () {
  this.totalScore += this.tempScore;
}

function playerTotal (tempScore, totalScore) {
  this.tempScore = tempScore;
  this.totalScore = totalScore;
  
}

// Business Logic for Dice

function Dice (side) {
  const randomSide = Math.floor(Math.random() * 6) + 1;
  console.log(side);
  this.side = randomSide;
}

// Dice.prototype.roll = function() {
//   this.side = Math.floor((Math.random() * 6) + 1);
// }

//UI

function displayResults(tempScore1, tempScore2, totalScore1, totalScore2, diceSide) {
  
}