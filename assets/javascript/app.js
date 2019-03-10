
$(document).ready(function () {


    var queryURL = 'https://opentdb.com/api.php?amount=3&difficulty=medium&type=multiple';

    var questions = [];
    var questionBank = [];
    var questionAnswers = [];
    var correctAnswer;
    var wins = 0;
    var loss = 0;
    var count = 0;
    var time = 15;

    $('.gameStart').on('click', function yeetyah() {

        var nmbQ = $('.nQ').val()
        var diff = $('.diff').val()
        var genre = $('.genre').val()
        var genreVal;
        if (genre == "Anime") {
            genreVal = '31';
        }
        else if (genre == 'General Knowledge') {
            genreVal = '9';
        }
        else if (genre == 'Science and Nature') {
            genreVal = '17';
        }
        else if (genre == 'Mythology') {
            genreVal = '20';
        }
        else if (genre == 'Animals') {
            genreVal = '27';
        }
        else if (genre == 'Movies') {
            genreVal = '11';
        }

        var newURL = 'https://opentdb.com/api.php?amount=' + nmbQ + '&category=' + genreVal + '&difficulty=' + diff + '&type=multiple'

        $('.gameStart').css({ 'display': 'none' })
        $('.askForm').css({ 'display': 'none' })


        $.ajax({
            url: newURL,
            method: "GET"
        }).then(function (response) {

            for (let i = 0; i < response.results.length; i++) {

                var mystring = response.results[i].question;
                mystring = mystring.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&eacute;/g, "é");
                questions.push(response.results[i]);
                questionBank.push(mystring);
                questionAnswers.push(response.results[i].correct_answer);
            }
            setQuestion()
        })

    })

    function setQuestion() {

        if (count < questions.length) {
            run();
            $('.quest').css({ 'pointer-events': 'auto' })
            $('.quest').removeClass('wrongHL');
            $('.quest').removeClass('highlight');
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
            $(this).addClass('highlight');
        }
        else {
            gotWrong();
            $(this).addClass('wrongHL');
            for (let i = 0; i < 4; i++) {
                if ($('.q' + i).text() == correctAnswer) {
                    $('.q' + i).addClass('highlight');
                }

            }
        }
        $('.quest').css({ 'pointer-events': 'none' })
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
        stop();
        wins++;
        $(".answer").text("Correct Answer! Nice job ;)");
        $(".winLog").text('Wins: ' + wins);
        myVar = setTimeout(setQuestion, 3000)
    }

    function gotWrong() {
        stop()
        loss++;
        $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
        $(".lossLog").text('Losses: ' + loss);
        myVar = setTimeout(setQuestion, 3000)

    }
    function timeLoss() {
        stop()
        loss++;
        $(".answer").text("Times Up!  Correct Answer: " + correctAnswer);
        $(".lossLog").text('Losses: ' + loss);
        myVar = setTimeout(setQuestion, 3000)
    }

    function endScreen() {
        console.log('working! eS')
        stop();


        // $('#show-number').css({ 'display': 'none' })
        $('.answer').empty();
        $('.winLog').empty();
        $('.lossLog').empty();
        $('.ques').empty();
        $('.questionContainer').empty();
        $('.gameOver').html('SCORE: <br>' + wins + ' CORRECT <br>' + loss + ' INCORRECT')

        var newGame = $('<button>').text('New Game?')
        $('.newGame').append(newGame);

    }
    $('.newGame').on('click', function () {
        location.reload();
    })
    var intervalId;

    function decrement() {

        if (time == 0) {
            clearInterval(intervalId)
            timeLoss()
        }
        else {
            time--;
            $("#show-number").html("<h2>" + time + "</h2>");
        }

    }
    function stop() {
        // console.log('stop working!')
        clearInterval(intervalId);
        $('#show-number').css({ 'display': 'none' })
        time = 15;
    }

    function run() {
        clearInterval(intervalId);
        time = 15;
        $('#show-number').css({ 'display': 'initial' })
        intervalId = setInterval(decrement, 1000);

    }

})