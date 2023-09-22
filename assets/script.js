let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let score = 0;
let $time = document.querySelector("#time");
let isGameStarted = false;
let $timeHeader = document.querySelector("#time-header");
let $resultHeader = document.querySelector("#result-header");
let $result = document.querySelector("#result");
let $input = document.querySelector("#game-time");

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);
$input.addEventListener("input", setTime);

function startGame() {
  score = 0;
  $input.setAttribute("disabled", "true");
  $timeHeader.classList.remove("hide");
  $resultHeader.classList.add("hide");
  isGameStarted = true;
  $start.classList.add("hide");
  $game.style.backgroundColor = "#fff";

  let interval = setInterval(function () {
    let time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  setTime();
  renderBox();
}

function setScore() {
  $result.textContent = score.toString();
}

function setTime() {
  let time = parseInt($input.value);
  $time.textContent = time.toFixed(1);
}

function endGame() {
  isGameStarted = false;
  $input.removeAttribute("disabled");
  setScore();
  $start.classList.remove("hide");
  $game.style.backgroundColor = "#ccc";
  $game.innerHTML = "";
  $timeHeader.classList.add("hide");
  $resultHeader.classList.remove("hide");
}

function handleBoxClick(event) {
  if (!isGameStarted == true) {
    return;
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = "";
  let box = document.createElement("div");
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  let color = randomColor();

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = color;
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  $game.insertAdjacentElement("afterbegin", box);
  box.setAttribute("data-box", "true");
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor() {
  let colors = ["green", "blue", "red", "black", "pink", "yellow", "grey"];
  // let a = colors[Math.random(colors.length)];
  return colors[Math.floor(Math.random(colors.length - 1) * colors.length)];
}
