const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timeCount = document.querySelector('#timer #timer_sec');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Commonly used data types DO Not Include:",
        choice1: "Strings",
        choice2: "Booleans",
        choice3: "Alerts",
        choice4: "Numbers",
        answer: 3,
    },
    {
        question:
            "The condition in an if / else statement is enclosed with ____.",
        choice1: "Quotes",
        choice2: "Curly brackets",
        choice3: "Parenthesis",
        choice4: "Square brackets",
        answer: 3,
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choice1: "Numbers and strings",
        choice2: "Other arrays",
        choice3: "Booleans",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        choice1: "Commas",
        choice2: "Curly brackets",
        choice3: "Quotes",
        choice4: "Parenthesis",
        answer: 3,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "JavaScript",
        choice2: "Terminal/Bash",
        choice3: "For loops",
        choice4: "Concole.log",
        answer: 4,
    }
]

const SCORE_POINTS = 20
const MAX_QUESTIONS = 5


startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    startTimer(60)
    /*let timeValue = 60;*/
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
    clearInterval(counter);
    startTimer(60);
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 0) {
            clearInterval(counter);
            timeCount.textContent = '0';
        }
    }

    if(time === 0){};
    then(stop)

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

            
        
        }, 1000)
    })
})

let counter;



incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
/*startTimer(60)*/
startGame()
