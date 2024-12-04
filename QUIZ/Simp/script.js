var quizData = [
    {
        question: "A stack data structure ____.",
        a: "is a hierarchical collection of data elements whose order is not given by their physical placement in memory.",
        b: "is a linear data structure which accompanies a specific order in which operations are implemented.",
        c: "is a container object that holds a fixed number of values of a single type.",
        d: "is a hierarchical structure that is used to represent and organize data in a way that is easy to navigate and search.",
        correct: "b",
    },
    {
        question: "Process of inserting an element in stack is called _____.",
        a: "Evaluation",
        b: "Pop",
        c: "Push",
        d: "Pull",
        correct: "c",
    },
    {
        question: "What are the basic operations performed on a stack?",
        a: "InsertAt, removeAt, peekAt",
        b: "InsertAt, removeAt, Next",
        c: "Push, pop, and print",
        d: "Push, pop, and peek",
        correct: "d",
    },
    {
        question: "A stack is a data structure that implements movement of data in which format?",
        a: "Random Access",
        b: "Last In First Out",
        c: "First In First Out",
        d: "All of the above",
        correct: "b",
    },
    {
        question: "Infix to prefix    (1+7) * (3+8)",
        a: "*+17+38",
        b: "17+38+*",
        c: "+17+38*",
        d: "*++1738",
        correct: "a",
    },


];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')


let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }

       currentQuiz++

       if(currentQuiz < quizData.length) {
           loadQuiz()
       } 
       
       else {
           quiz.innerHTML = `<br><br>
           <h2>You answered ${score}/${quizData.length} questions correctly </h2><br><br>

           <button onclick="location.reload()">Reload</button>
           `
       }
    }
})