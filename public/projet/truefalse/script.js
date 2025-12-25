//Create the function to load the game
function loadTheGame() {
            //When the function begins 'gameS' becomes true and we get to button by his ID
            gameStarted = true;
            trueBtn.disabled = false;
            falseBtn.disabled = false;
            button = document.getElementById('start');
            trueBtn.addEventListener('click', trueButton);
            falseBtn.addEventListener('click', falseButton);
            
            //Then we create another button named buttonB and define his Id and class name
            let buttonB = document.createElement("button");
            buttonB.id ='qButton';
            buttonB.className = 'game-button';
  
            //We define his textContent that will be the text of first question
            buttonB.textContent = question[qNumber].text ;
  
            //We replace the old button for the buttonB, the one who shows the questions
            button.parentNode.replaceChild(buttonB , button);
            buttonB.addEventListener('click', nextQuestion);
            
            sablier();
            
        }


function trueButton(){
  const currentQuestion = question[qNumber];
  if (currentQuestion.correctAnswer === true){
    alert("CORRECT !!!")
    petlescore();
  }else{
    alert("INCORRECT !!! " + "Right Answer: " + currentQuestion.rightAnswer)
  }
  qNumber ++ ;
  nextQuestion();
}
  


function falseButton(){
    const currentQuestion = question[qNumber]
  if (currentQuestion.correctAnswer === false){
    alert("CORRECT !!!")
    petlescore();
  }else{
    alert("INCORRECT !!! " + "Right Answer: " + currentQuestion.rightAnswer)
  }
    qNumber ++ ;
  nextQuestion();
}
 

function nextQuestion(){
   if (qNumber < question.length){
     let buttonB = document.getElementById('qButton');
     buttonB.textContent = "Question: " + question[qNumber].text;
   }else{
     let buttonB = document.getElementById('qButton');
     buttonB.textContent = "GAME OVER";
    let resetBtn = document.createElement("button");
    resetBtn.id = 'reset';
    resetBtn.className = 'game-button';
    resetBtn.textContent = "RESTART";
    document.getElementById("btnContainer").appendChild(resetBtn);
    resetBtn.addEventListener('click', resetGame);
    trueBtn.disabled = true;
    falseBtn.disabled = true;
   }
 }

function petlescore(){
  const currentQuestion = question[qNumber];
  if (currentQuestion.correctAnswer === true){
    let score = document.getElementById('score');
    num = Number(score.textContent);
    num = num + 50;
    score.textContent = num;
  }else if(currentQuestion.correctAnswer === false){
    let score = document.getElementById('score');
    num = Number(score.textContent);
    num = num + 50;
    score.textContent = num;
  }else{
    return 0;
  }
}

function sablier(){
  //Create a timer
  let timer = document.getElementById('time');
  let rebourd = Number(timer.textContent);
  rebourd = rebourd - 1;
  if (gameStarted === true){
    timer.textContent = rebourd;
  }
  if (rebourd === 0){
    clearInterval(myTimer);
    let buttonB = document.getElementById('qButton');
    buttonB.textContent = "GAME OVER";
    let resetBtn = document.createElement("button");
    resetBtn.id = 'reset';
    resetBtn.className = 'game-button';
    resetBtn.textContent = "RESTART";
    document.getElementById("btnContainer").appendChild(resetBtn);
    resetBtn.addEventListener('click', resetGame);
    trueBtn.disabled = true;
    falseBtn.disabled = true;
  }else{
    return 0;
  }
}

function resetGame(){
  location.reload();
}



// Déclarer le tableau avec toutes les phrases
let question = [ {text: 'Pour tout réel x, x² > 0 ', correctAnswer : true , rightAnswer: 'THAT WAS TRUE'} ,
                 {text: 'Pour tout réel x, cos(2π - x) = cos(x)' , correctAnswer : true , rightAnswer: 'THAT WAS TRUE'} ,
                 {text: 'Si sin(x) = 0, alors x est obligatoirement compris entre 0 et π' , correctAnswer: false , rightAnswer: 'x = kπ, k ∈ Z. exemple: 2π < x < 3π'} ,
                 {text: 'La fonction cos est égale à la fonction sin pour tout x' , correctAnswer: false , rightAnswer: 'elles sont égales seulement pour certains x. exemple: π/4'} ,
                 {text: '8*4 = 24' , correctAnswer: false , rightAnswer: '32'} ,
                 {text: '7^2 = 49' , correctAnswer: true , rightAnswer: 'THAT WAS TRUE'} ,
                 {text: '2π = 180°' , correctAnswer: false , rightAnswer: '360°'} ,
                 {text: '2^2 = 4' , correctAnswer: true , rightAnswer: 'THAT WAS TRUE'} ,
                 {text: '100/4 = 25' , correctAnswer: true , rightAnswer: 'THAT WAS TRUE'} ,
                 {text: '20*4 = 100' , correctAnswer: false , rightAnswer: '80'} ];

let rightAnswer = null;
let correctAnswer = null;
let currentQuestion = null;
let qNumber = 0;
let gameStarted = false;
let myTimer = setInterval(sablier, 1000);

let trueBtn, falseBtn, button;

window.onload = function() {
    button = document.getElementById('start');
    button.addEventListener('click', loadTheGame);

    // Initialise les boutons de jeu à l'état désactivé
    trueBtn = document.getElementById('right');
    falseBtn = document.getElementById('wrong');
    trueBtn.disabled = true;
    falseBtn.disabled = true;
}
