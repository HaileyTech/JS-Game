let isProcessing = false;

function play(choice) {
  let compChoice = Math.floor(Math.random() * 3 + 1); // 1 is rock, 2 is paper, 3 is scissors
  let wins = sessionStorage.getItem("winCount");
  let ties = sessionStorage.getItem("tieCount");
  let losses = sessionStorage.getItem("lossCount");
  document.getElementById("comp-img").src = "images/mystery.svg";
  document.getElementById("result").innerHTML = ". . .";
  let result = "";

  // Resets to default size
  document.getElementById("comp-img").style.width = "100px";
  document.getElementById("comp-img").style.height = "auto";
  document.getElementById("oppMove").style.width = "auto";
  document.getElementById("oppMove").style.height = "100px";
  document.getElementById("playerMove").style.width = "auto";
  document.getElementById("playerMove").style.height = "100px";


  // Do not allow user to click again during processing
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
    document.getElementById("comp-img").style.width = "120px";
    document.getElementById("comp-img").style.height = "auto";
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
  
  // Update session storage
  sessionStorage.setItem("winCount", wins);
  sessionStorage.setItem("tieCount", ties);
  sessionStorage.setItem("lossCount", losses);

  document.getElementById("wins-num").innerHTML = sessionStorage.getItem("winCount");
  document.getElementById("ties-num").innerHTML = sessionStorage.getItem("tieCount");
  document.getElementById("losses-num").innerHTML = sessionStorage.getItem("lossCount");
  isProcessing = false; // Allow user to click again
  document.getElementById("wait-message").style.display = "none";

  compare(result, choice, compChoice)
}, 1600);

  // Changes back to shaking fists
  document.getElementById("playerMove").src = "images/rock.png"
  document.getElementById("oppMove").src = "images/oppRock.png"
}



function compare(result, choice, compChoice) {
  const player = document.getElementById("playerMove");
  const opp = document.getElementById("oppMove");
  const gamePlay = document.getElementById("gamePlay");

  // Remove previous positioning classes
  player.classList.remove("centered", "on-top", "on-bottom");
  opp.classList.remove("centered", "on-top", "on-bottom");

  if (choice === "paper") {
    // Make paper larger to match size of other options
    document.getElementById("playerMove").style.width = "140px";
    document.getElementById("playerMove").style.height = "auto";
  }

  if (compChoice === 1) {
    // computer chose rock
    compChoice = "oppRock";
    if (result !== "tie") {
      if (choice === "paper") {
        // player won with paper
        gamePlay.classList.add("middle");
        player.classList.add("centered", "on-top");
        opp.classList.add("centered", "on-bottom");
      } else {
        // player lost with scissors
        gamePlay.classList.add("middle");
        opp.classList.add("centered", "on-top");
        player.classList.add("centered", "on-bottom");
      }
    }
    else { // result is a tie (just move to the middle)
      gamePlay.classList.add("middle");
    }
  } else if (compChoice === 2) {
    // computer chose paper
    compChoice = "oppPaper";
    // Make paper larger to match size of other options
    document.getElementById("oppMove").style.width = "140px";
    document.getElementById("oppMove").style.height = "auto";
    if (result !== "tie") {
      if (choice === "scissors") {
        // player won with scissors
        gamePlay.classList.add("middle");
      } else {
        // player lost with rock
        gamePlay.classList.add("middle");
        opp.classList.add("centered", "on-top");
        player.classList.add("centered", "on-bottom");
      }
    } else { // result is a tie (just move to the middle)
      gamePlay.classList.add("middle");
    }
  } else {
    // computer chose scissors
    compChoice = "oppScissors";
    if (result !== "tie") {
      if (choice === "rock") {
        // player won with rock
        gamePlay.classList.add("middle");
        player.classList.add("centered", "on-top");
        opp.classList.add("centered", "on-bottom");
      } else {
        // player lost with paper
        gamePlay.classList.add("middle");
      }
    } else { // result is a tie (just move to the middle)
      gamePlay.classList.add("middle");
    }
  }

  // Change the shaking fist to the player's and opponent's choice
  player.src = "images/" + choice + ".png";
  opp.src = "images/" + compChoice + ".png";
}

function animation() {
  const divElem = document.getElementById("gamePlay");
  divElem.classList.add("showing");

  const player = document.getElementById("playerMove");
  const opp = document.getElementById("oppMove");
  const gamePlay = document.getElementById("gamePlay");

  // Fade out current images
  player.classList.add("hide");
  opp.classList.add("hide");

  // Reset positions and classes
  document.getElementById("gamePlay").classList.remove("middle");
  player.classList.remove("centered", "on-top", "on-bottom");
  opp.classList.remove("centered", "on-top", "on-bottom");

  // Reset positions and classes
  player.classList.remove("movingPlay");
  opp.classList.remove("movingPlay");
  player.style.transform = "translateX(0)";
  opp.style.transform = "translateX(0)";
  void player.offsetWidth;
  void opp.offsetWidth;

  // Start shake animation
  player.classList.add("movingPlay");
  opp.classList.add("movingPlay");
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
