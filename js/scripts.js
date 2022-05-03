// Business Logic for Gamers
function Gamers (player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.currentPlayer;
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

function Players(name) {
  this.name = name;
  this.isTurn = false;
  this.tempScore = 0;
  this.totalScore = 0;
  this.dice = new Dice (1, 6);
}

Players.prototype.tempScoreCheck = function () {
  return this.tempScore;
}

Players.prototype.addToTempScore = function (number) {
  this.tempScore += number;
}

Players.prototype.addToCurrentScore = function() {
  this.currentScore += this.tempScore;
  this.tempScore = 0;
}

Players.prototype.isTurnOver = function () {
  if (this.dice.currentRoll === 1) {
    return true; 
  } else {
    return false;
  }
}

// Score.prototype.start = function(dice) {
//   dice.roll();
//   if(dice.side === 1) {
//     this.tempScore = 0;
    
//   } else {
//     this.tempScore += dice.side;
//   }
// }

// Score.prototype.hold = function () {
//   this.totalScore += this.tempScore;
// }

// function playerTotal (tempScore, totalScore) {
//   this.tempScore = tempScore;
//   this.totalScore = totalScore;
  


// Business Logic for Dice

function Dice (minNum, maxNum) {
  this.minNum = minNum;
  this.maxNum + maxNum;
  this.currentRoll = 0;
}

Dice.prototype.roll = function() {
  return Math.floor(Math.random() * (this.maxNum - this.minNum +1)) + this.minNum;
}

//UI

// class NewGame {
//   constructor() {
//     this.currentPlayer = currentPlayer;
//   }
// }

function displaySwitch (newGame) {
  if (newGame.player1.isTurn === true) {
    $("span#current-player").text("Player 1");
  } else {
    $("span#current-player").text("Player 2");
  }
}

function winMode(newGame) {
  $("#winners-space").show();
  $("span#winner-name").text(newGame.currentPlayer.name);
  document.getElementById("player-hold").disabled = true;
  document.getElementById("player-roll").disabled = true;
}

function rollButton (newGame) {
  if (newGame.gameStart === true) {
    $("#rolled-one").hide();
    newGame.currentPlayer.dice.currentRoll = newGame.currentPlayer.dice.roll();
    $("span#current-roll").text(newGame.currentPlayer.dice.currentRoll);
    if (newGame.currentPlayer.isTurnOver() === true) {
      $("#rolled-one").show();
      newGame.currentPlayer.tempScore = 0;
      $("span#round-total").text(newGame.currentPlayer.tempScore);
      newGame.currentPlayerSwitch();
      displaySwitch(newGame);
    } else {
      newGame.currentPlayer.addToTempScore (newGame.currentPlayer.dice.currentRoll);
      $("span#round-total").text(newGame.currentPlayer.tempScore);
    }
  }
}

function holdButton (newGame) {
  if (newGame.currentPlayer.tempScore != 0) {
    newGame.currentPlayer.addToCurrentScore();
    if (newGame.winnerStatusCheck() === true) {
      winMode(newGame);
    }
      if (newGame.player1.isTurn === true) {
        $("span#player-1-score").text(newGame.currentPlayer.currentScore);
        newGame.currentPlayerSwitch();
        displaySwitch(newGame);
      } else {
        $("span#player-2-score").text(newGame.currentPlayer.currentScore);
        newGame.currentPlayerSwitch();
        displaySwitch(newGame);
      }
  }
}

$(document).ready(function() {
  let newGame;
  
  $("button#start-game").click(function() {
    let player1 = new Players ("Player 1");
    let player2 = new Players ("Player 2");
    newGame = new Gamers (player1, player2);
    newGame.gameStart = true;
    newGame.currentPlayerSwitch();
    displaySwitch(newGame);
    $("#play").show();
  })

  $("button#player-roll").click(function() {
    rollButton(newGame);
  });
  
  $("button#player-hold").click(function () {
    holdButton(newGame);
  });
  
  $("button#reset-game").click(function() {
    location.reload();
  });
});




// function displayResults(totalScore1, totalScore2, tempScore1, tempScore2, diceSide) {
//   $("div#score-total-1").text(totalpScore1);
//   $("div#score-total-2").text(totalScore2);
//   $("div#score-temp-1").text(tempScore1);
//   $("div#score-temp-2").text(tempScore2);
//   $("div#dice").html(displayDice(diceSide));
// }

// function displayDice (side) {
//   //display and link images for all six sides of dice.
// }