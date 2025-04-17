let isProcessing = false;


function play(choice) {
  let compChoice = Math.floor(Math.random() * 3 + 1); // 1 is rock, 2 is paper, 3 is scissors
  let wins = sessionStorage.getItem("winCount");
  let ties = sessionStorage.getItem("tieCount");
  let losses = sessionStorage.getItem("lossCount");
  document.getElementById("comp-img").src = "images/mystery.svg";
  document.getElementById("result").innerHTML = ". . .";
  let result;


  // Block clicks during processing
  if (isProcessing) {
    const waitMessage = document.getElementById("wait-message");
    waitMessage.style.display = "block";
    setTimeout(() => {
      waitMessage.style.display = "none";
    }, 2000); // Hide message after 2 seconds
    return; // Exit the function early
  }
  isProcessing = true; // Lock further clicks

  if (wins == null) {
    wins = 0;
  } else {
    wins = wins;
  }
  if (ties == null) {
    ties = 0;
  } else {
    ties = ties;
  }
  if (losses == null) {
    losses = 0;
  } else {
    losses = losses;
  }

  setTimeout(() => {
    animation();
  },200);


  document.getElementById("player-choice").innerHTML = "You chose " + choice; // displays player's choice
  setTimeout(() => {
  if (compChoice == 1) { // computer chose rock
    document.getElementById("comp-img").src = "images/oppRock.png";
    if (choice == "rock") {
      document.getElementById("result").innerHTML =
        "Rock ties rock. No one wins.";
      ties++;
      result = "tie"
    } else if (choice == "paper") {
      document.getElementById("result").innerHTML =
        "Paper beats rock. You win!";
      wins++;
    } else {
      document.getElementById("result").innerHTML =
        "Rock beats scissors. You lose";
      losses++;
    }
  } else if (compChoice == 2) { // computer chose paper
    document.getElementById("comp-img").src = "images/oppPaper.png";
    if (choice == "rock") {
      document.getElementById("result").innerHTML =
        "Paper beats rock. You lose.";
      losses++;
    } else if (choice == "paper") {
      document.getElementById("result").innerHTML =
        "Paper ties paper. No one wins.";
      ties++;
      result = "tie";
    } else {
      document.getElementById("result").innerHTML =
        "Scissors beats paper. You win!";
      wins++;
    }
  } else { // computer chose scissors
    document.getElementById("comp-img").src = "images/oppScissors.png";
    if (choice == "rock") {
      document.getElementById("result").innerHTML =
        "Rock beats scissors. You win!";
      wins++;
    } else if (choice == "paper") {
      document.getElementById("result").innerHTML =
        "Scissors beats paper. You lose";
      losses++;
    } else {
      document.getElementById("result").innerHTML =
        "Scissors ties scissors. No one wins.";
      ties++;
      result = "tie";
    }
  }

  result = "hi"
  
  // Update session storage
  sessionStorage.setItem("winCount", wins);
  sessionStorage.setItem("tieCount", ties);
  sessionStorage.setItem("lossCount", losses);

  document.getElementById("wins-num").innerHTML = sessionStorage.getItem("winCount");
  document.getElementById("ties-num").innerHTML = sessionStorage.getItem("tieCount");
  document.getElementById("losses-num").innerHTML = sessionStorage.getItem("lossCount");
  isProcessing = false; // Allow user to click again
  document.getElementById("wait-message").style.display = "none";
}, 1600);

compare(result)
}


function animation() {
  const divElem = document.getElementById("gamePlay");
  divElem.classList.add("showing");

  const player = document.getElementById("playerMove");

  // Remove the shaking animation class if it's there
  player.classList.remove("movingPlay");

  // Force reflow 
  void player.offsetWidth;

  // Add class to trigger shaking animation
  player.classList.add("movingPlay");
}

function compare(result) {

}



function reset() {
  sessionStorage.setItem("winCount", 0);
  sessionStorage.setItem("tieCount", 0);
  sessionStorage.setItem("lossCount", 0);

  document.getElementById("wins-num").innerHTML = sessionStorage.getItem("winCount");
  document.getElementById("ties-num").innerHTML = sessionStorage.getItem("tieCount");
  document.getElementById("losses-num").innerHTML = sessionStorage.getItem("lossCount");
  document.getElementById("player-choice").innerHTML = "You choose ...";
  document.getElementById("comp-img").src = "images/mystery.svg";
  document.getElementById("result").innerHTML = "Results";

  document.getElementById("gamePlay").classList.remove("showing");
  
}
