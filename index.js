
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started = false;

var level = 0

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkSolution(userClickedPattern.length-1);
});

function checkSolution(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence,1000);
        }
    }
    
    else{
        console.log("Wrong");
        var audio = new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over....Press any key to restart");
        audio.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
  
    var randomChosenColour = buttonColours[randomNumber];
  
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
  }


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },200);
}


function playSound(key){
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}