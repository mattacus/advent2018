let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let fps = 60;
let num_balls = 30;
let vMax = 10;

let frame = 0;

class Ball {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 2;
    this.color = 'white';
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};

let balls = [];

for(let i = 0; i < num_balls; i++) {
  let vX = Math.random() * vMax;
  let vY = Math.random() * vMax;
  let ball = new Ball((Math.random() * canvas.width), (Math.random() * canvas.height), vX, vY);
  balls.push(ball);
}


function draw() {
  setTimeout(function() {
    window.requestAnimationFrame(draw);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // debug
    ctx.font = "12px Arial";
    ctx.fillStyle = 'red';
    ctx.fillText(`frame: ${frame}`, 10, 20);

    // render balls
    balls.forEach(ball => {
      ball.draw();
      ball.x += ball.vx;
      ball.y += ball.vy;
    
      if (ball.y + ball.vy > canvas.height ||
        ball.y + ball.vy < 0) {
        ball.vy = -ball.vy;
      }
      if (ball.x + ball.vx > canvas.width ||
        ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
      }
    })

    frame++;
  }, 20000 / fps)
}
