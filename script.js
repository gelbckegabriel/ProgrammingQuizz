const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// QUESTIONS.
const questions = [
    {
      "question": "What was the purpose of PHP?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Operational System",
          "correct": false
        },
        {
          "answer": "Database",
          "correct": false
        },
      ]
    },
    {
      "question": "One way to declare a variable in java Script is:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Which is the ID selector from CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
    {
        "question": "What does 'DOM' means?",
        "answers": [
          {
            "answer": "Documentation of Modelling",
            "correct": false
          },
          {
            "answer": "Document of Modernization",
            "correct": false
          },
          {
            "answer": "Domain Object Model",
            "correct": false
          },
          {
            "answer": "Document Object Model",
            "correct": true
          },
        ]
      },
      {
        "question": "which tag is correct for a Paragraph?",
        "answers": [
          {
            "answer": "input",
            "correct": false
          },
          {
            "answer": "text",
            "correct": false
          },
          {
            "answer": "p",
            "correct": true
          },
          {
            "answer": "font",
            "correct": false
          },
        ]
      },
      {
        "question": "Which option is the correct way to define a function in JS?",
        "answers": [
          {
            "answer": "function(a, b) {...}",
            "correct": true
          },
          {
            "answer": "def function(a) {...}",
            "correct": false
          },
          {
            "answer": "function a,b {...}",
            "correct": false
          },
          {
            "answer": "set function(a) {...}",
            "correct": false
          },
        ]
      },
      {
        "question": "Which is the most famous programming language in 2022?",
        "answers": [
          {
            "answer": "Python",
            "correct": false
          },
          {
            "answer": "PHP",
            "correct": false
          },
          {
            "answer": "JavaScript",
            "correct": true
          },
          {
            "answer": "Java",
            "correct": false
          },
        ]
      },
      {
        "question": "Who is the developer of this game?",
        "answers": [
          {
            "answer": "John Wick",
            "correct": false
          },
          {
            "answer": "Eduardo Bezerra",
            "correct": false
          },
          {
            "answer": "Jubileu Andrade",
            "correct": false
          },
          {
            "answer": "Gabriel Gelbcke",
            "correct": true
          },
        ]
      },
  ]

// NEW QUIZZ TO FIRST QUESTION.
function init() {
    // CREATE FIRST QUESTION.
    console.log('The game started!');    
    createQuestion(0)
};

// CREATE A QUESTION.
function createQuestion(i) {

    // CLEAN THE LAST QUESTION.
    const oldButtons = answersBox.querySelectorAll('button');
    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // ALTER QUESTION TEXT.
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');
    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // SET ALTERNATIVES.
    questions[i].answers.forEach(function(answer, i) {

        // CREATES THE TEMPLATE FOR THE QUIZZ BUTTON.
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true);
        const letterBtn = answerTemplate.querySelector('.btn-letter');
        const answerText = answerTemplate.querySelector('.question-answer');
        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute('correct-answer', answer['correct']);

        // REMOVE HIDE AND TEMPLATE CLASS.
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        // INSERT ALTERNATIVES ON SCREEN.
        answersBox.appendChild(answerTemplate);

        // INSERT CLICK EVENT ON BUTTON.
        answerTemplate.addEventListener('click', function() {
            checkAnswer(this);
        });

    });

    // INCREMENT QUESTION NUMBER.
    actualQuestion++;

};

// CHECK ANSWER.
function checkAnswer(btn) {

    // SELECT ALL BUTTONS.
    const buttons = answersBox.querySelectorAll('button');

    // VERIFIES IF THE ANSWER IS CORRECT.
    buttons.forEach(function(button) {

        if(button.getAttribute('correct-answer') === 'true') {
            button.classList.add('correct-answer');

            if(btn === button) {
                points++;
            }

        } else {
            button.classList.add('wrong-answer');
        }

    });

    // NEXT QUESTION.
    nextQuestion();

};

// NEXT QUESTION.
function nextQuestion() {

    // TIMER TO CHANGE THE QUESTION.
    setTimeout(function() {

        // CHECK IF HAVE ANY OTHER QUESTIONS LEFT.
        if(actualQuestion >= questions.length) {
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);

    }, 1400);

};

// DISPLAY THE FINAL SCREEN.
function showSuccessMessage() {

    // CALCULATE SCORE.
    const score = ((points / questions.length) * 100).toFixed(2);
    const displayScore = document.querySelector('#display-score span');
    displayScore.textContent = score.toString();

    // ALTER CORRECT ANSWERS NUMBER.
    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    // ALTER TOTAL QUESTIONS NUMBER.
    const totalQuestions = document.querySelector('#questions-qty');
    totalQuestions.textContent = questions.length;

    hideOrShowQuizz();

};

// HIDE OR SHOW SCORE.
function hideOrShowQuizz() {
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

// RESTART QUIZZ.
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function() {

    // START GAME FROM SCRATCH.
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();

});

// QUIZZ INITIALIZATION.
init();