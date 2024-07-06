// JavaScript source code


/*  How does it work?

1) The initial state of the game is 'started=false' and is on standby mode waiting for any key press.

2) When it detects a key press, it set the game state to 'started=true' and nextSequence() function is call which generates the color and stores it in gamePattern array.

3) Then it waits for the user's key press and pushes the user clicked color to the userClickedPattern array and checks if it matches with the corresponding element of the 
gamePattern array.

4) If the color matches, then the nextSequence function is called and the userClickedPattern is reset to zero and it moves to next level.

5) If the color doesn't match, then the game over screen is pulled up and the game state is set to 'started=false'.

*/

var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

// to start the game
$(document).keypress(function () {

    if (!started) {
        started = true;
        nextSequence();
    }

});


// to detect the click on the buttons (click on any of the button from class 'btn')
$(".btn").on("click", function () {

    // clicked button's id is stored in userChosenColor variable
    var userChosenColour = $(this).attr('id');

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


// function to randomly generate the next color in the sequence (and pushing the color in the array + sound + animation)
function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


// checks if the user input color is correct or not
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

        if (userClickedPattern.length == gamePattern.length) {

            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    }
    else {
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


// function to reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


// function to play the sound of the button (clicked + randomly generated)
function playSound(name) {

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


// function to animate the user pressed button (adding and removing 'pressed' class in 0.1 sec)
function animatePress(currentColor) {

    $("." + currentColor).addClass("pressed");

    setTimeout(function () {
       $("." + currentColor).removeClass("pressed")
    }, 100);
}
