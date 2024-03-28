const mcq_type = localStorage.ques_model
const time_type = localStorage.time_mode
let currentQuestion = 0;
  let selectedAnswers = [];
  let timerInterval =0; 

document.addEventListener('DOMContentLoaded', function () {
   
    const timerDisplay = document.querySelector('#timer');
    if(time_type =='time'){
     quizDurationInSeconds = 50; // 5 minutes
    }
    else if(time_type =='perQuestion'){
         quizDurationInSeconds = 10; // 1 min
    }
    startTimer(quizDurationInSeconds, timerDisplay);
      +localStorage.token
               
});

  //const results = {result :results, time : time}

  
//   document.addEventListener('DOMContentLoaded', function () {
//     runalljson()
//      runrandomjson()
// });

fetch('/execute');
fetch('/random')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      return response.json();
    })
    .then(data => {
      // Process the JSON data
      debugger
     
  const quizData = data.quiz.questions;
  window["quizData"]= data.quiz.questions;
  window["totalQuestions"] = quizData.length;

  // Show the first question initially
  showQuestion(currentQuestion);
  document.getElementById('prev-btn').hidden = true
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  //console.log(totalQuestions)
  
  function showQuestion(questionNumber) {
      
    document.querySelectorAll('.question-container').forEach(container => {
      container.style.display = 'none';
    });
    document.getElementById('question-container').innerHTML = generateQuestionHTML(window["quizData"][questionNumber]);
  }
  
  function nextQuestion() {
      debugger
    if (currentQuestion < window["totalQuestions"] - 1 ) {
      const radiosel = isRadioSelected()
      if(radiosel==false){
        selectedAnswers[currentQuestion] = ''
      }else{
      storeAnswer(document.querySelector('input[name="answer'+currentQuestion+'"]:checked').value)
    }
    if(time_type =='perQuestion'){
 
           
    }
      document.getElementById('nxt-btn').hidden = false
      document.getElementById('prev-btn').hidden = false
      currentQuestion++;
      if(currentQuestion == window["totalQuestions"].length){
        document.getElementById('submit-btn').hidden = false
        document.getElementById('nxt-btn').hidden = true
      }else{
      showQuestion(currentQuestion);
      }
    }
  }
  
  function prevQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      showQuestion(currentQuestion);
      if(currentQuestion==0){
        document.getElementById('prev-btn').hidden = true
      }
    }
  }
  
  function generateQuestionHTML(question) {
      
    let html = `<div class="question-container">`;
    html += `<h2>${question.question}</h2>`;
    question.options.forEach((option, index) => {
      html += `<input type="radio" name="answer${currentQuestion}" value="${option}"> ${option}<br>`;
    });
    html += `</div>`;
    return html;
  }
  
  function storeAnswer(answer) {
        selectedAnswers[currentQuestion] = answer;
      }
  //console.log(selectedAnswers)
  
       function calculateScore(currentQuestion){
        const radiosel = isRadioSelected()
        if(radiosel==false){
        selectedAnswers[currentQuestion] = ''
      }else{
      storeAnswer(document.querySelector('input[name="answer'+currentQuestion+'"]:checked').value)
    }
        window['totalScore'] = 0;
        for (let i = 0; i < window["totalQuestions"]; i++) {
          if (selectedAnswers[i] === window["quizData"][i].answer) {
              window['totalScore']++;
          }
        }
        return window['totalScore'];
      } 
      //console.log(totalScore)
      function startTimer(duration, display) {
        
            let timer = duration, minutes, seconds;
            timerInterval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = "Time Left: " + minutes + ":" + seconds;
                //display =  minutes + ":" + seconds
                if(time_type =='time'){
                if (--timer < 0) {
                    timer = duration;
                    submitQuiz();
                }
                }
              else if(time_type =='perQuestion'){
                if (--timer < 0) {
            
            timer = duration;
            if(currentQuestion == window["totalQuestions"]-1){
              clearInterval(timerInterval); // Stop the timer when the quiz is submitted
              submitQuiz();
            }else{
            nextQuestion();
            }
          }
        
              
            }
                
            }, 1000);
        }
      async function submitQuiz() {
        debugger
            clearInterval(timerInterval); // Stop the timer when the quiz is submitted
            timerInterval = document.getElementById('timer').innerHTML.slice(11)
            calculateScore(currentQuestion);
           
            const data = {
              name : localStorage.token,
              result : totalScore,
              timetaken:timerInterval
            }

            $.ajax({
              url: '/submit',
              type: 'POST',
              contentType: 'application/json',
              data: JSON.stringify(data),
              success: function(response) {
                  console.log('Data saved:', response);
                  window.location.href = '/option.html';
              },
              error: function(xhr, status, error) {
                  console.error('Error:', error);
                  
              }
          });
            console.log(response)
      }
       
// Here we are checking for the validations
function isRadioSelected() {
var radioGroup = document.getElementsByName('answer'+currentQuestion);

  for (var i = 0; i < radioGroup.length; i++) {
    if (radioGroup[i].checked) {
      return true; // At least one radio button is selected
    }
  }

  return false; // No radio button is selected
}