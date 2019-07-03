// assign valubles..
var boxes = $(".box");  // this is for each cell in the table
var turn = 0; //players turn 0=X and 1=O
var score = { player1score: 0, player2score: 0 }; // overall game score.
var gameOver = false; // is the game over??  yes or no. 
var playerLabel = $("#number"); // the game lable.  
var markers = ["X", "O"]; // an array of the input x and O
var score1 = $("#score1"); // player1 score .  
var score2 = $("#score2"); // player2 score
var btnsDisabled;


var buttons = $(".buttons button"); // get the start and rest buttons
// click event for start and rest buttons
buttons.click(function () {
   if (this.id == "reset") {
    boxes.attr("disabled", false);
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].disabled = false;
    }
    boxes.text(""); // remove all markers from buttons
    playerLabel.text("Player " + (turn + 1) + "'s Turn");
    gameOver = false;
    // show the score for both players
    score1.text(score.player1score);
    score2.text(score.player2score);
  }
});


function playGame(addXtoBox, boxvalue) {
  if (!gameOver && addXtoBox.innerHTML=="") {
    // write an if condition to check the cell it it's empyt or not 
    addXtoBox.innerHTML = boxvalue; // input 
    addXtoBox.disabled = true;
    turn = Number(!turn);   // switch player turn
    playerLabel.text("Player " + (turn + 1) + "'s Turn");
    // stop the game winner is found
    if (wincheck()) {
      
      gameOver = true;
      // all buttons disabled
      boxes.attr("disabled", true);
      playerLabel.text("Please Reset the Game"); // show message game over
      // update players score
      if (Number(!turn) == 0) {
        score.player1score++;
      } else {
        score.player2score++;
      }
    }
  }
}


boxes.click(function () {
  // add the marker to this button
  console.log('BOXES','turn', turn, 'score', score, 'gameOver', gameOver,'markers', markers);
  playGame(this, markers[turn]);
});
// make sure game buttons are disabled at the start
boxes.attr("disabled", true);

// check for winners
function wincheck() {
   btnsDisabled = 0;

  var winner = "";
  // check for a winner in the horizontal cells
  // [1,2,3],
  // [4,5,6],
  // [7,8,9]

  for (var i = 0; i < 9; i += 3) {
    if ( // check if first box is equal to second box 
      // check if first box equal last box 
      boxes[i].innerHTML == boxes[i + 1].innerHTML &&
      boxes[i + 2].innerHTML == boxes[i].innerHTML &&
      // check if first box equal to x or O 
      (boxes[i].innerHTML == markers[0] ||
        boxes[i].innerHTML == markers[1])
    ) {
      // check winner
      winner = boxes[i].innerHTML;
    }
  }

  // check for a winner in the vertical cells
  for (var i = 0; i < 3; i++) {
    if (
      // [1,4,7],
      // [2,5,8],
      // [3,6,9]
      boxes[i].innerHTML == boxes[i + 3].innerHTML &&
      boxes[i + 6].innerHTML == boxes[i].innerHTML &&
      (boxes[i].innerHTML == markers[0] ||
        boxes[i].innerHTML == markers[1])
    ) {
      winner = boxes[i].innerHTML;
    }
  }

  // check for a winner in the cross.
  if (
    // [1,5,9]
    boxes[0].innerHTML == boxes[4].innerHTML &&
    boxes[8].innerHTML == boxes[0].innerHTML &&
    (boxes[0].innerHTML == markers[0] ||
      boxes[0].innerHTML == markers[1])
  ) {
    winner = boxes[4].innerHTML;
  } else if (
    // [3,5,7]
    boxes[2].innerHTML == boxes[4].innerHTML &&
    boxes[6].innerHTML == boxes[2].innerHTML &&
    (boxes[2].innerHTML == markers[0] ||
      boxes[2].innerHTML == markers[1])
  ) {
    winner = boxes[4].innerHTML;
  }

  // check how many buttons are disabled
  for (var i = 0; i < boxes.length; i++) {
    console.log("here", boxes[i].disabled)
    if (boxes[i].innerHTML != "") {
      btnsDisabled++;
    }
  }

  // if there is a winner
  if (winner != "") {
    swal({
      title: "player " + winner + "  wins",
      text:  'Wahoooooooo!',
      icon: "success",
      button: "kick the loser",
  });

    // alert("player " + winner + "  wins");
    return true;
    // if button are disable and there is no winner
  } else if (btnsDisabled === 9 && !gameOver) {
    console.log(btnsDisabled, gameOver)
    // debugger;
    swal({
      title: "It's a Tie",
      button: "Try Again",
  });

    // alert("it's a Tie");
    playerLabel.text("Please Reset the Game");
    return false;
  }
}
