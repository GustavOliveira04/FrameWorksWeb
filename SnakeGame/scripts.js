
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const box = 20;
const gridSize = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = 'RIGHT';
let gameOver = false;
let speed = 100;

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

function collision(head, array) {
  return array.some(segment => head.x === segment.x && head.y === segment.y);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (gameOver) return;

  ctx.fillStyle = '#FFFFFF';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));
  
  let head = { ...snake[0] };
  if (direction === 'LEFT') head.x -= box;
  if (direction === 'UP') head.y -= box;
  if (direction === 'RIGHT') head.x += box;
  if (direction === 'DOWN') head.y += box;

  if (head.x < 0 || head.x >= gridSize * box || head.y < 0 || head.y >= gridSize * box || collision(head, snake)) {
    gameOver = true;
    return;
  }

  snake.unshift(head);
  snake.pop();
}

let game = setInterval(draw, speed);