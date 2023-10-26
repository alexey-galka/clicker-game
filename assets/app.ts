let $start: HTMLElement = document.querySelector('#start') as HTMLElement;
let $game: HTMLElement = document.querySelector('#game') as HTMLElement;
let score: number = 0;
let $time: HTMLElement = document.querySelector('#time') as HTMLElement;
let isGameStarted: boolean = false;
let $timeHeader: HTMLElement = document.querySelector(
  '#time-header'
) as HTMLElement;
let $resultHeader: HTMLElement = document.querySelector(
  '#result-header'
) as HTMLElement;
let $result: HTMLElement = document.querySelector('#result') as HTMLElement;
let $input: HTMLInputElement = document.querySelector(
  '#game-time'
) as HTMLInputElement;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$input.addEventListener('input', setTime);

function startGame(): void {
  score = 0;
  $input.setAttribute('disabled', 'true');
  $timeHeader.classList.remove('hide');
  $resultHeader.classList.add('hide');
  isGameStarted = true;
  $start.classList.add('hide');
  $game.style.backgroundColor = '#fff';

  let interval = setInterval(function () {
    let time: number = parseFloat($time.textContent as string);

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

function setScore(): void {
  $result.textContent = score.toString();
}

function setTime(): void {
  const time: number = parseInt($input.value);
  $time.textContent = time.toFixed(1);
}

function endGame(): void {
  isGameStarted = false;
  $input.removeAttribute('disabled');
  setScore();
  $start.classList.remove('hide');
  $game.style.backgroundColor = '#ccc';
  $game.innerHTML = '';
  $timeHeader.classList.add('hide');
  $resultHeader.classList.remove('hide');
}

function handleBoxClick(event: MouseEvent): void {
  if (!isGameStarted == true) {
    return;
  }

  const target: HTMLElement = event.target as HTMLElement;
  if (target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox(): void {
  $game.innerHTML = '';
  const box = document.createElement('div');
  const boxSize: number = getRandom(30, 100);
  const gameSize: DOMRect = $game.getBoundingClientRect();
  const maxTop: number = gameSize.height - boxSize;
  const maxLeft: number = gameSize.width - boxSize;
  const color: string = randomColor();

  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = color;
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  $game.insertAdjacentElement('afterbegin', box);
  box.setAttribute('data-box', 'true');
}

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomColor(): string {
  let colors: string[] = [
    'green',
    'blue',
    'red',
    'black',
    'pink',
    'yellow',
    'grey',
  ];
  return colors[Math.floor(Math.random() * colors.length - 1)];
}
