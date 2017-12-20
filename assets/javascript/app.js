var state = {
    correctAnswers: 0,
    wrongAnswers: 0,
    timeUp:0,
    roundNumber: -1,
    correctAnswersList:  ['Coca-Cola', 'Franklin Pierce','Germany',
    'Blue','1843','Max','United Kingdom', 'Clarice','Donner', 'It\'s a Wonderful Life'],
    seconds: 30,
    intervalId: 0
};

function resetValues(){
    state = {
       correctAnswers: 0,
       wrongAnswers: 0,
       timeUp:0,
       roundNumber: -1,
       correctAnswersList: ['Coca-Cola', 'Franklin Pierce','Germany',
       'Blue','1843','Max','United Kingdom', 'Clarice','Donner', 'It\'s a Wonderful Life'],
       seconds: 30,
       intervalId: 0
   };
}

function Round(question, answers, image){
    this.question = question;
    this.answers = answers;
    this.image = image;
   }

var round1 = new Round ('Which of these companies was the first to use Santa Clause in an advertisement?', 
['Coca-Cola', 
'Pepsi', 
'7-Up',
 'Fanta'],
'src = "images/image.png"');

var round2 = new Round ('Which president was the first to decorate the White House Christmas tree?', 
['Franklin Pierce', 
'Benjamin Franklin',
'George Washington',
'Abraham Lincoln'], 
'src = "images/image1.png"');

var round3 = new Round ('Which country did the gingerbread house come from?',
['Germany',
'Austria', 
'Switzerland', 
'United States'],
'src = "images/image2.png"');

var round4 = new Round ('What kind of Christmas does Elvis Presley sing about?', 
['Blue', 
'White', 
'Red', 
'Snowy'], 
'src = "images/image3.png"');

var round5 = new Round ('In what year was "A Christmas Carol", by Charles Dickens, published?', 
['1843', 
'1765', 
'1860', 
'1906'], 
'src = "images/image4.png"');

var round6 = new Round ('What is the name of the Grinch\'s dog in the movie "How the Grinch Stole Christmas"?', 
['Max', 
'Pete', 
'Sam', 
'Ruth'], 
'src = "images/image5.png"');

var round7 = new Round ('Where was "A Christmas Carol" written?', 
['United Kingdom', 
'Germany', 
'United States', 
'Australia'], 
'src = "images/image6.png"');

var round8 = new Round ('Which reindeer helps Rudolph fly at the reindeer games?', 
['Clarice', 
'Donner', 
'Dancer', 
'Blitzen'], 
'src = "images/image7.png"');

var round9 = new Round ('Which reindeer is Rudolph\'s dad?', 
['Donner', 
'Clarice', 
'Dancer', 
'Blitzen'], 
'src = "images/image8.png"');

var round10 = new Round ('Which Christmas movie has been played more than any other?', 
['It\'s a Wonderful Life', 
'A Christmas Story', 
'Home Alone', 
'Frosty the Snowman'], 
'src = "images/image9.png"');

var rounds = [round1, round2, round3, round4, round5, round6, round7, round8, round9, round10];

function createStartButton(){
     $('#start-button').append('<button class = "startButton btn btn-primary btn-sm" onclick = "firstRound()"> Start');
    // correctAnswers();
}

function createRestartButton(){
    stop();
    remove();
    $('#start-button').append('<button class = "startButton btn btn-primary btn-sm" onclick = "firstRound()"> Restart');
    $('#correct').append('<div class = "summary">Correct ' + state.correctAnswers);
    $('#wrong').append('<div class = "summary">Wrong ' + state.wrongAnswers);
    $('#timeUp').append('<div class = "summary">Timeup ' + state.timeUp);
    // correctAnswers();
    resetValues();
}

function remove () {
    $('.startButton, .answers, .timer, .messege, .table, .question, .image, .summary').remove();
}

function runRound(number){
    checkRound(number);
}

function shuffleAnswers(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function firstRound() {
    remove();
    state.seconds = 30;
    run();
    state.roundNumber++;
    var shuffleArray = rounds[state.roundNumber];
    shuffleAnswers(shuffleArray.answers);
    $('#question').html('<div class = "question">' + rounds[state.roundNumber].question);
    for (i = 0; i < shuffleArray.answers.length; i++){
       $('#answers').append('<tr class = "table"><th> <button class = "answers answer'+ [i] + '"  onclick = "runRound('+ [i] +')">' + shuffleArray.answers[i]);
    }
}

function checkAnswer(number){
    var value = $('.answer' + number).text();
     if (value == state.correctAnswersList[state.roundNumber]){
        state.correctAnswers++;
        page('Correct!!! <br>');
    } else {
        state.wrongAnswers++;
        page('Nope!!! The correct answer was: <br>' + state.correctAnswersList[state.roundNumber]);
    }
    console.log(state.correctAnswersList);
    console.log('Value ' + value + ' ' + state.correctAnswersList[state.roundNumber]);
}

function checkRound(number){
    if (state.roundNumber <= 9){
       checkAnswer(number);
    } else {
       createRestartButton();
    }
}

function run() {
    state.intervalId = setInterval(decrement, 1000);
  }

function decrement() {
    state.seconds--;
    $("#show-number").html("<h2  class = 'timer'>" + state.seconds + "</h2>");
    if (state.seconds === 0) {
        state.timeUp++;
        remove();
        page('Time up. The correct answer was: <br>' + state.correctAnswersList[state.roundNumber]);
    } 
  }

function stop() {
      clearInterval(state.intervalId);
  }

function page(messege) {
     stop();
     remove();
     $('#image').html('<img class = image ' + rounds[state.roundNumber].image + '>');
     $('#messege').html('<div class = messege>' + messege + '<div>');
    if ((state.roundNumber < 9)){
        setTimeout(firstRound, 5*1000); 
    } else {
        setTimeout( createRestartButton, 5*1000);
    }
}

createStartButton();