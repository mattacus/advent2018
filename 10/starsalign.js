let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
var raf;
let fps = 60;
let vMax = 10;

let frame = 0;

class Star {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 1;
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

let stars = [];

starData.forEach(data => {
  let {position, velocity} = data;
  let [x, y] = position;
  let [xV, yV] = velocity;
  let star = new Star(x + (canvas.width / 2), y + (canvas.height / 2), xV, yV);
  stars.push(star);
})

// fast-forward star positions (to the interesting part):
for(let time = 0; time < 10100; time++) {
  stars.forEach(star => {
    star.x += star.vx;
    star.y += star.vy;
  })
}

function draw() {
  raf = requestAnimationFrame(draw);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // debug
  ctx.font = "12px Arial";
  ctx.fillStyle = 'red';
  ctx.fillText(`frame: ${frame}`, 10, 20);

  // render stars
  stars.forEach(star => {
    star.draw();
    star.x += star.vx;
    star.y += star.vy;
  })

  frame++;
}

canvas.addEventListener('mouseover', function (e) {
  cancelAnimationFrame(raf);
});

canvas.addEventListener('mouseout', function (e) {
  raf = requestAnimationFrame(draw);
});