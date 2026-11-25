
// Quiz questions
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for web styling?",
        options: [
            "Java",
            "CSS",
            "Python",
            "C++"
        ],
        answer: 1
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "int",
            "string",
            "let",
            "float"
        ],
        answer: 2
    },
    {
        question: "Which method displays an alert box?",
        options: [
            "prompt()",
            "alert()",
            "write()",
            "display()"
        ],
        answer: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "//",
            "<!-- -->",
            "**",
            "##"
        ],
        answer: 0
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

// Shuffle questions randomly
function shuffleQuestions() {

    for (let i = questions.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [questions[i], questions[j]] =
        [questions[j], questions[i]];
    }

    currentQuestion = 0;
    score = 0;

    displayQuestion();
}

// Start the quiz
function startQuiz() {

    clearInterval(timer);

    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz").style.display = "block";
    document.getElementById("result").style.display = "none";
    document.getElementById("shuffle-btn").style.display = "inline-block";

    displayQuestion();
}

// Display the current question
function displayQuestion() {

    clearInterval(timer);

    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    timeLeft = 30;

    document.getElementById("question-number").innerHTML =
        "Question " + (currentQuestion + 1);

    document.getElementById("question").innerHTML =
        questions[currentQuestion].question;

    document.getElementById("feedback").innerHTML = "";

    document.getElementById("next-btn").disabled = true;

    displayOptions();

    startTimer();
}

// Display answer options
function displayOptions() {

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";

    const options = questions[currentQuestion].options;

    options.forEach((option, index) => {

        const button = document.createElement("button");

        button.innerHTML = option;
        button.className = "option";

        button.onclick = function() {
            checkAnswer(index, button);
        };

        optionsDiv.appendChild(button);
    });
}

// Check the user's answer
function checkAnswer(selected, button) {

    clearInterval(timer);

    const correctAnswer = questions[currentQuestion].answer;

    const buttons = document.querySelectorAll(".option");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (selected === correctAnswer) {

        score++;

        button.classList.add("correct");

        document.getElementById("feedback").innerHTML =
            "Correct Answer!";

    } else {

        button.classList.add("incorrect");

        buttons[correctAnswer].classList.add("correct");

        document.getElementById("feedback").innerHTML =
            "Incorrect! The correct answer is " +
            questions[currentQuestion].options[correctAnswer];
    }

    document.getElementById("next-btn").disabled = false;
}

// Start the timer
function startTimer() {

    updateTimer();

    timer = setInterval(function() {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timer);

            document.getElementById("feedback").innerHTML =
                "Time is up!";

            document.querySelectorAll(".option").forEach(btn => {
                btn.disabled = true;
            });

            const correctAnswer = questions[currentQuestion].answer;

            document.querySelectorAll(".option")[correctAnswer]
                .classList.add("correct");

            document.getElementById("next-btn").disabled = false;
        }

    }, 1000);
}

// Update the timer display
function updateTimer() {

    document.getElementById("timer").innerHTML =
        "Time: " + timeLeft + "s";
}

// Move to the next question
function nextQuestion() {

    currentQuestion++;

    displayQuestion();
}

// Display final score
function showResult() {

    clearInterval(timer);

    document.getElementById("quiz").style.display = "none";

    document.getElementById("result").style.display = "block";

    document.getElementById("shuffle-btn").style.display = "none";

    document.getElementById("final-score").innerHTML =
        "Your Score: " + score + " / " + questions.length;
}

// Start quiz when page loads
startQuiz();
