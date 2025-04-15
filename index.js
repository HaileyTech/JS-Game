function play(choice) {
  let compChoice = Math.floor(Math.random() * 3 + 1); // 1 is rock, 2 is paper, 3 is scissors
  let wins = sessionStorage.getItem("winCount");
  let ties = sessionStorage.getItem("tieCount");
  let losses = sessionStorage.getItem("lossCount");
  document.getElementById("comp-img").src = "images/mystery.svg";
  document.getElementById("result").innerHTML = ". . .";

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

  document.getElementById("player-choice").innerHTML = "You chose " + choice; // displays player's choice
  setTimeout(() => {
  if (compChoice == 1) {
    // computer chose rock
    document.getElementById("comp-img").src = "images/rock.svg";
    if (choice == "rock") {
      document.getElementById("result").innerHTML =
        "Rock ties rock. No one wins.";
      ties++;
    } else if (choice == "paper") {
      document.getElementById("result").innerHTML =
        "Paper beats rock. You win!";
      wins++;
    } else {
      document.getElementById("result").innerHTML =
        "Rock beats scissors. You lose";
      losses++;
    }
  } else if (compChoice == 2) {
    // computer chose paper
    document.getElementById("comp-img").src = "images/paper.svg";
    if (choice == "rock") {
      document.getElementById("result").innerHTML =
        "Paper beats rock. You lose.";
      losses++;
    } else if (choice == "paper") {
      document.getElementById("result").innerHTML =
        "Paper ties paper. No one wins.";
      ties++;
    } else {
      document.getElementById("result").innerHTML =
        "Scissors beats paper. You win!";
      wins++;
    }
  } else {
    // computer chose scissors
    document.getElementById("comp-img").src = "images/scissors.svg";
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
    }
  }

  animation(choice, compChoice);
  
  sessionStorage.setItem("winCount", wins);
  sessionStorage.setItem("tieCount", ties);
  sessionStorage.setItem("lossCount", losses);

  document.getElementById("wins-num").innerHTML = sessionStorage.getItem("winCount");
  document.getElementById("ties-num").innerHTML = sessionStorage.getItem("tieCount");
  document.getElementById("losses-num").innerHTML = sessionStorage.getItem("lossCount");
}, 250);

}

// function animation(choice, compChoice) {
//   const divElem = document.getElementById("gamePlay");
//   divElem.classList.add("showing");
//   document.getElementById("gamePlay").innerHTML = `<h2>${document.getElementById("result").innerHTML}</h2>`;
// }

// function animation(choice, compChoice) {
//   const divElem = document.getElementById("gamePlay");

//   // Update content first
//   divElem.innerHTML = `<h2>${document.getElementById("result").innerHTML}</h2>`;

//   // Then trigger the transition
//   divElem.classList.add("showing");
// }


function animation(choice, compChoice) {
  const divElem = document.getElementById("gamePlay");

  // Update the result text
  // divElem.innerHTML = `<h2>${document.getElementById("result").innerHTML}</h2>`;

  // Show the div
  divElem.classList.add("showing");
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
