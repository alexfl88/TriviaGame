$(document).ready(function(){
  
// event listeners
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',

    // Question set with options and correct answers
    questions: {
      q1: 'Who does not have a celebrity cameo in the show?',
      q2: 'What city does Lily move to in the summer after breaking up with Marshal?',
      q3: 'What fruit is sitting on Teds nightstand when he wakes up with a sprained ankle?',
      q4: 'What kind of car was passed down to Marshal by his brothers?',
      q5: "Over the course of the whole show, how many slaps does Marshal give Barney over their slap bet?",
      q6: 'Who does Barney get engaged to, but ends up not working out in the end?',
      q7: "Who does Ted ultimately end up with at the end of the show?"
    },
    options: {
      q1: ['Katy Perry', 'Kim Kardashian', 'Megan Fox', 'Carrie Underwood'],
      q2: ['San Francisco', 'Chicago', 'Boston', 'Los Angeles'],
      q3: ['Watermelon', 'Cantelope', 'Grapefruit', 'Pineapple'],
      q4: ['Sedan', 'Volkswagen', 'Fiero', 'Truck'],
      q5: ['5','7','10','8'],
      q6: ['Zoey','Quinn','Nora','Wendy'],
      q7: ['Robin', 'Tracy', 'Victoria','Zoey']
    },
    answers: {
      q1: 'Megan Fox',
      q2: 'San Francisco',
      q3: 'Pineapple',
      q4: 'Fiero',
      q5: '8',
      q6: 'Quinn',
      q7: 'Robin'
    },
    
    // Method to initialize the game
    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      trivia.nextQuestion();
      
    },
    
    // method that loops through to display questions and options
    nextQuestion : function(){
      
    // this sets the timer to 20 seconds per question
      trivia.timer = 20;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
    // this keeps the timer from speeding up faster than normal
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
    
    // retrieves all the questions and then indexes the questions in the current set
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
    
    // this sets up the array for all the user's options for the current question
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
    // this creates all guesses for the trivia game in the html
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    timerRunning : function(){
      // if timer still has time left and there are still questions left to ask
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 8){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 3000);
        $('#results').html('<h3>Oops! You are out of time! The answer was: ' + Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      // if all the questions have been displayed, end the game and show results
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
            $('#results')
          .html('<h3>Thanks for playing!</h3>'+
          '<p>Correct answers: '+ trivia.correct +'</p>'+
          '<p>Incorrect answers: '+ trivia.incorrect +'</p>'+
          '<p>Unanswered questions: '+ trivia.unanswered +'</p>'+
          '<p>Press START to play again!</p>');
        

        $('#game').hide();
        

        $('#start').show();
      }
      
    },

    guessChecker : function() {
      
      var resultId;
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
      if($(this).text() === currentAnswer){
        // if correct answer is chosen, turn button green
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 2000);
        $('#results').html('<h3>Correct! Good job!</h3>');
      }
      else{
        // if incorrect answer is chosen, turn button red
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 3000);
        $('#results').html('<h3>Incorrect! The answer was: '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      
      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
      
      trivia.nextQuestion();
       
    }
  }