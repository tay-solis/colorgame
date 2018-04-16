var num = 6;
var colors = generateRandomColors(num);

var squares = document.getElementsByClassName("square");
var pickedColor = pickColor();
var pickedDisplay = document.querySelector("#rgbdisplay");
var messageDisplay = document.querySelector("#message");
var headerDisplay = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easybtn = document.querySelector("#easybtn");
var hardbtn = document.querySelector("#hardbtn");

var modeButtons = document.querySelectorAll(".modeButtons");

init();

function init(){
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons(){

  //set up easy and hard buttons
  for(var i = 0; i < modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? num = 3: num = 6;
      reset();
    });
  }
}

function setUpSquares(){
  for(var i = 0; i < squares.length; i++){
    //add colors to squares
    squares[i].style.backgroundColor = colors[i];
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
      //grab color of picked square and compare to picked squares
      var clickedColor = this.style.backgroundColor;
      if(clickedColor === pickedColor){
        messageDisplay.textContent = "You Win!"
        changeColors(pickedColor);
        headerDisplay.style.backgroundColor = pickedColor;
        resetButton.textContent ="Play Again?";
      } else{
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again!";
      }
    });
  }
}


function changeColors(color){
  for(var i = 0; i < squares.length; i++){
    squares[i].style.backgroundColor = color;
  }
}

//picks a random color from the array of colors
function pickColor(){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

//returns an array of random colors with length num
function generateRandomColors(num){
  var arr = [];
  for(var i = 0; i < num; i++){
    arr.push(randomColor());
  }
  return arr;
}

//generates a random rgb color
function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset(){
  //set up reset button
  pickedDisplay.textContent = pickedColor;
  resetButton.addEventListener("click", function(){
    setUpSquares();
    reset();
  });
  //sets up colors
	colors = generateRandomColors(num);
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	pickedDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	headerDisplay.style.backgroundColor = "#DC582A";
}
