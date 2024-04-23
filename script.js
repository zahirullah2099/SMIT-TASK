 document.getElementById("student-data").addEventListener('submit',(Event) => {
    Event.preventDefault();
    const rollNo = document.getElementById("roll-no").value;
    const name = document.getElementById("name").value;
 const batch= document.getElementById("batch").value;
 const section = document.getElementById("section").value;

 const data={
     rollNo : rollNo,
    Name : name,
    Batch : batch,
    Section : section
 };
 
 const actualData = JSON.stringify(data);
//  console.log(actualData);
sessionStorage.setItem("studentDetails" , actualData);
alert("student details has been stored in session");

document.getElementById("student-data").reset();

});

const question = [
    {
        question: "which is the largest animal in the world",
        answer:[
            {text: "shark", correct:false},
            {text: "blue whale", correct:true},
            {text: "elephant", correct:false},
            {text: "giraffa", correct:false}
        ]
    }, 
    {
        question: "Who painted the Mona Lisa?",
        answer: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Michelangelo", correct: false }
        ]
    },

    {
        question: "What is the capital of Japan?",
        answer: [
            { text: "Tokyo", correct: true },
            { text: "Osaka", correct: false },
            { text: "Kyoto", correct: false },
            { text: "Seoul", correct: false }
        ]
    },

    {
        question: "Who wrote 'Romeo and Juliet'?",
        answer: [
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Charles Dickens", correct: false },
            { text: "Mark Twain", correct: false }
        ]
    }
];

const questionElement = document.getElementById("quesion");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
 function showQuestion(){
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElement.innerHTML = questionNo + "," + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
 }

 function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
 }

 function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
 }
 function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "play again";
    nextButton.style.display="block"
 }
 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
 }
 nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
 })
 startQuiz();