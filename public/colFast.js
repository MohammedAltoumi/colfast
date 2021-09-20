let screen = document.querySelector(".screen");
let buttons = document.querySelectorAll("button");
let score = 0;

screen.style.backgroundColor = randomColor();


//////// for loop to add click event for all buttons  /////////

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {

    ////// when player choose a wrong answer ///////

    if (buttons[i].style.backgroundColor !== screen.style.backgroundColor) {
      document.getElementById("score").defaultValue = score;
      document.getElementById("submit").click();
    }

    animatedButton(buttons[i].innerHTML)

    ////// test if the screen has the same color as one of the buttons ///////

    while (buttons[i].style.backgroundColor === screen.style.backgroundColor) {
      let previusColor = screen.style.backgroundColor;
      screen.style.backgroundColor = randomColor();
      
      ////// to make sure the screen`s color will change every time /////////

      if (previusColor === screen.style.backgroundColor) {
        screen.style.backgroundColor = randomColor();
      }
    }

    score++;
  })
}

///////// this even do the same as click event but by press key /////////

document.addEventListener("keydown", (event) => {

  button = document.querySelector("."+ event.key);

  ////// when player choose a wrong answer ///////

  if (button.style.backgroundColor !== screen.style.backgroundColor) {
    document.getElementById("score").defaultValue = score;
    document.getElementById("submit").click();
  }

  animatedButton(event.key)

  ////// test if the screen has the same color as one of the buttons ///////
  
  while (button.style.backgroundColor === screen.style.backgroundColor) {
    let previusColor = screen.style.backgroundColor;
    screen.style.backgroundColor = randomColor();

    ////// to make sure the screen`s color will change every time /////////

    if (previusColor === screen.style.backgroundColor) {
      screen.style.backgroundColor = randomColor();
    }
  }

  score++;
})


/////// setup a timer for the game //////////

var timer = setInterval(start, 1000)
    var time = 0;

    function num() {
      return time++
    }
    
    function start() {
      if (time == 30) {
        document.getElementById("score").defaultValue = score;
        document.getElementById("submit").click();
      }
      document.querySelector("p").innerText = returnData(time);
      time++;
    }
    
    function returnData(input) {
      return input > 9 ? input : `0${input}`
    }
  
    ////// random color for the screen output /////////

    function randomColor() {
      colors = ["red", "yellow", "blue", "green"];
      return colors[Math.floor(Math.random() * 7)];
    }

    
    


////////for add an animation when the player press any buttton //////// 

function animatedButton(button) {
  var activeButton = document.querySelector("." + button)
  activeButton.classList.add('pressed');
  setTimeout(() => {
    activeButton.classList.remove('pressed');

  }, 100)
}

