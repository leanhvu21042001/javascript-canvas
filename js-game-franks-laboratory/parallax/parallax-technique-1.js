//********* ######## Init global variables ######## */
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 10;
const backgroundLayer1 = new Image();
backgroundLayer1.src = "layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "layer-5.png";

//********* ######## Handle Events ######## */
const gameSpeedShow = document.querySelector("span#game-speed--show");
const inputGameSpeed = document.querySelector("input#input-game-speed");

inputGameSpeed.value = gameSpeed;
gameSpeedShow.textContent = gameSpeed;

inputGameSpeed.addEventListener("change", ({ target }) => {
  gameSpeed = target.value;
  gameSpeedShow.textContent = target.value;
});

//********* ######## Init classes ######## */

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.x2 = this.width;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;

    if (this.x < -this.width) this.x = this.width + this.x2 - this.speed;
    if (this.x2 < -this.width) this.x2 = this.width + this.x - this.speed;

    this.x -= this.speed;
    this.x2 -= this.speed;
  }

  draw() {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x2, this.y);
  }
}

//********* ######## Init Objects ######## */

const layer1 = new Layer(backgroundLayer1, 0.5);
const layer2 = new Layer(backgroundLayer2, 0.5);
const layer3 = new Layer(backgroundLayer3, 0.5);
const layer4 = new Layer(backgroundLayer4, 0.5);
const layer5 = new Layer(backgroundLayer5, 1);
const layers = [layer1, layer2, layer3, layer4, layer5];

//********* ######## Animate game ######## */
const animate = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  layers.forEach((layer) => {
    layer.update();
    layer.draw();
  });

  requestAnimationFrame(animate);
};
animate();
