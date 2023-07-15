const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.width = 20;
    this.height = 20;
    this.weight = 1;
  }
  update() {
    let curve = Math.sin(angle) * 20;
    if (this.y > canvas.height - this.height * 3 + curve) {
      this.y = canvas.height - this.height * 3 + curve;
      this.vy = 0;
    } else {
      this.y += this.vy;
      this.vy *= 0.9;
      this.vy += this.weight;
    }
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }
    if (spacePressed && this.y > this.height * 3) {
      this.flap();
    }
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  flap() {
    this.vy -= 2;
  }
}

const bird = new Bird();

class Particle {
  constructor() {
    this.x = bird.x;
    this.y = bird.y;
    this.size = Math.random() * 7 + 3;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = "red";
  }

  update() {
    this.x -= gamespeed;
    this.y += this.speedY;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

let particlesArray = [];
const handleParticles = () => {
  particlesArray.unshift(new Particle());
  for (let i = 0; i < particlesArray.length; i++) {
    const element = particlesArray[i];
    element.update();
    element.draw();
  }

  // if more than 200, remove 20.
  if (particlesArray.length > 200) {
    for (let i = 0; i < 20; i++) {
      particlesArray.pop(particlesArray[i]);
    }
  }
};

const obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height) / 3 + 20;
    this.bottom = (Math.random() * canvas.height) / 3 + 20;
    this.x = canvas.width;
    this.width = 20;
    this.color = "blue";
    this.counted = false;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }

  update() {
    this.x -= gamespeed;
    if (!this.counted && this.x < bird.x) {
      score++;
      this.counted = true;
    }
    this.draw();
  }
}

const handleObstacles = () => {
  if (frame % 50 === 0) {
    obstaclesArray.unshift(new Obstacle());
  }

  for (let i = 0; i < obstaclesArray.length; i++) {
    const element = obstaclesArray[i];
    element.update();
  }
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
};

const handleCollisions = () => {
  for (let i = 0; i < obstaclesArray.length; i++) {
    const element = obstaclesArray[i];

    if (
      bird.x < element.x + element.width &&
      bird.x + bird.width > element.x &&
      ((bird.y < 0 + element.top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - element.bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      // collision detected
      // ctx.drawImage(bang, bird.x, bird.y, 50, 50);

      ctx.font = "25px Georgia";
      ctx.fillStyle = "black";
      ctx.fillText(
        "Game Over, you score is " + score,
        160,
        canvas.height / 2 - 10
      );
      return true;
    }
  }
};

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillRect(10, canvas.height - 90, 50, 50);
  handleParticles();
  handleObstacles();
  bird.update();
  bird.draw();

  ctx.fillStyle = gradient;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);

  handleCollisions();
  if (handleCollisions()) return;

  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
};

animate();

window.addEventListener("keydown", ({ code }) => {
  if (code === "Space") spacePressed = true;
});
window.addEventListener("keyup", ({ code }) => {
  if (code === "Space") spacePressed = false;
});
