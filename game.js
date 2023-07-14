
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;
var lev=0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function(){
  var userChoosenColour=$(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer();
});

function checkAnswer(){
  var ans=true;
  if(lev<level){
    if(gamePattern[lev]===userClickedPattern[lev]){
      console.log("correct");
    }
    else{
      ans=false;
      console.log("wrong");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },100);
      $("#level-title").text("Wrong answer press any key to continue");
      gamePattern=[];
      userClickedPattern=[];
      started=false;
      level=0;
      lev=-1;
    }
  }
  lev++;
  if(lev===level && ans===true){
    lev=0;
    userClickedPattern=[];
    nextSequence();
  }
}

function nextSequence(){
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  // handler();
}
// nextSequence();

function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
// handler();
