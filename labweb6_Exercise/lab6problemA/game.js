
/* Store game scores and results */
let wins = 0;
let losses = 0;
let draws = 0;

let results = [];
let gameStarted = false;
let round = 0;

/* Start the game */
function startGame() {

    let name = document.getElementById("playerName").value;

    // Validate player name
    if (name == "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;

    // Display welcome message
    document.getElementById("welcome").innerHTML =
        "Welcome, " + name + "!";

    // Display starting date and time
    document.getElementById("startTime").innerHTML =
        "Game started on: " + Date();

}

/* Generate computer choice */
function getComputerChoice() {

    let choices = ["rock", "paper", "scissors"];

    let randomIndex = Math.floor(Math.random() * 3);

    return choices[randomIndex];
}

/* Play one round */
function playRound(playerChoice) {

    // Check whether the game has started
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    // Get computer choice
    let computerChoice = getComputerChoice();

    // Change image sources
    document.getElementById("playerImg").src =
        playerChoice + ".png";

    document.getElementById("computerImg").src =
        computerChoice + ".png";

    // Determine round result
    let roundResult;

    if (playerChoice == computerChoice) {

        roundResult = "Draw";
        draws++;

    } else if (
        (playerChoice == "rock" && computerChoice == "scissors") ||
        (playerChoice == "scissors" && computerChoice == "paper") ||
        (playerChoice == "paper" && computerChoice == "rock")
    ) {

        roundResult = "Win";
        wins++;

    } else {

        roundResult = "Lose";
        losses++;

    }

    // Store result
    results.push(roundResult);

    round++;

    // Display result and change colour
    let resultElement = document.getElementById("result");

    resultElement.innerHTML =
        "You chose " + playerChoice +
        ". Computer chose " + computerChoice +
        ". " + roundResult + "!";

    if (roundResult == "Win") {
        resultElement.style.color = "green";
    } else if (roundResult == "Lose") {
        resultElement.style.color = "red";
    } else {
        resultElement.style.color = "grey";
    }

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Add round to history table
    document.getElementById("history").innerHTML +=
        "<tr>" +
        "<td>" + round + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + roundResult + "</td>" +
        "</tr>";

}

/* Display game summary */
function showSummary() {

    let totalRounds = results.length;
    let totalWins = 0;

    // Count wins using a for loop
    for (let i = 0; i < results.length; i++) {

        if (results[i] == "Win") {
            totalWins++;
        }

    }

    // Calculate win percentage
    let percentage = 0;

    if (totalRounds > 0) {
        percentage = Math.round((totalWins / totalRounds) * 100);
    }

    // Display summary
    document.getElementById("summary").innerHTML =
        "You played " + totalRounds +
        " rounds and won " + percentage + "%.";

}

/* Reset the game */
function resetGame() {

    // Reset scores
    wins = 0;
    losses = 0;
    draws = 0;
    round = 0;

    // Empty results array
    results = [];

    // Stop game
    gameStarted = false;

    // Reset scoreboard
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    // Clear history but keep header
    document.getElementById("history").innerHTML =
        "<tr>" +
        "<th>Round</th>" +
        "<th>You</th>" +
        "<th>Computer</th>" +
        "<th>Result</th>" +
        "</tr>";

    // Clear messages
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("welcome").innerHTML = "";
    document.getElementById("startTime").innerHTML = "";

    // Reset images
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";

}
