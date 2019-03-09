
$(document).ready(function () {


    var queryURL = 'https://opentdb.com/api.php?amount=3&difficulty=medium&type=multiple';

    var questions = [];
    var questionBank = [];
    var questionAnswers = [];
    var correctAnswer;
    var wins = 0;
    var loss = 0;
    var count = 0;


    $('.gameStart').on('click', function () {

        console.log($('.diff').val())
        var nmbQ = $('.nQ').val()
        var diff = $('.diff').val()
        var genre = $('.genre').val()

        $('.gameStart').css({ 'display': 'none' })


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (let i = 0; i < response.results.length; i++) {

                var mystring = response.results[i].question;
                mystring = mystring.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, "é");

                console.log(mystring);
                questions.push(response.results[i]);
                questionBank.push(mystring);
                questionAnswers.push(response.results[i].correct_answer);
            }
            setQuestion()
        })
    })

    function setQuestion() {

        if (count < questions.length) {
            $('.answer').empty();
            correctAnswer = questions[count].correct_answer;
            $(".ques").empty();
            $(".quest").empty();
            $(".ques").text(questionBank[count]);
            var a = questions[count].incorrect_answers[0].replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, "é");
            var b = questions[count].incorrect_answers[1].replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, "é");
            var c = questions[count].incorrect_answers[2].replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, "é");
            var d = questions[count].correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, "é");
            var newQuestion = [a, b, c, d];
            var k = shuffle(newQuestion);
            //adds questions into question divs 
            for (let i = 0; i < newQuestion.length; i++) {
                $('.q' + i).text(k[i]);
            }
        }
        else {
            endScreen();
        }
        count++;
    }

    $(document).on('click', '.quest', function () {

        var k = $(this).text();
        if (k == correctAnswer) {
            gotRight();
        }
        else {
            gotWrong();
        }
    })

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    var myVar;
    function gotRight() {
        wins++;
        $(".answer").text("Correct Answer! Nice job ;)");
        $(".winLog").text('Wins: ' + wins);
        myVar = setTimeout(setQuestion, 3000)
    }

    function gotWrong() {
        loss++;
        $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
        $(".lossLog").text('Losses: ' + loss);
        // setTimeout(setQuestion(), 5000);
        myVar = setTimeout(setQuestion, 3000)
    }

    function endScreen() {
        $('.answer').empty();
        $('.winLog').empty();
        $('.lossLog').empty();
        $('.ques').empty();
        $('.questionContainer').empty();
        $('.gameOver').html('SCORE: <br>' + wins + ' CORRECT <br>' + loss + ' INCORRECT')

    }

})
// var number = 0;
// var intervalId;
// var bool = false;
// function decrement() {
//     number--;
//     $("#show-number").html("<h2>" + number + "</h2>");
//     if (number === 0 && bool == true) {

//         number = 15;
//         $('.answer').empty();
//         setQuestion();
//         bool = false;
//         $('.answer').empty();
//     }
//     else if (number === 0 && bool == false) {
//         // setQuestion();
//         middleCard();
//     }
// }

// function run() {

//     clearInterval(intervalId);
//     number = 15;
//     intervalId = setInterval(decrement, 1000);
// }

// function middleCard() {

//     $('.answer').text('Correct Answer!' + questions[count].correct_answer);
//     count++;
//     clearInterval(intervalId);
//     number = 5;
//     intervalId = setInterval(decrement, 1000);
//     bool = true;

// }

// run();