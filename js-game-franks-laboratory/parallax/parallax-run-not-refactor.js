// xử lý canvas.
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 15;

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

let x = 0;
let x2 = 2400;

const animate = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.drawImage(backgroundLayer4, x, 0);
  context.drawImage(backgroundLayer4, x2, 0);

  // trừ gameSpeed vì tóc độ khi thay đổi x2 hoặc x1 là 15frames
  // +x2 hoặc +x là vì trong khoảng thời gian 15frames thì x, x2 đã đi được một quảng đường.
  if (x < -2400) x = 2400 + x2 - gameSpeed;
  else x -= gameSpeed;
  if (x2 < -2400) x2 = 2400 + x - gameSpeed;
  else x2 -= gameSpeed;

  requestAnimationFrame(animate);
};
animate();
