// xử lý dropdown animation, lựa chọn loại animation.
let playerState = "run";
const dropdownAnimations = document.querySelector("select#animations");
dropdownAnimations.addEventListener(
  "change",
  ({ target }) => (playerState = target.value)
);

// xử lý canvas.
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "./shadow_dog.png";

const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

animationStates.forEach((state, index) => {
  let frames = { loc: [] };
  for (let i = 0; i < state.frames; i++) {
    const positionX = i * spriteWidth;
    const positionY = index * spriteHeight;
    frames.loc.push({
      x: positionX,
      y: positionY,
    });
  }
  spriteAnimations[state.name] = frames;
});

const animate = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Math.floor(gameFrame / staggerFrames): chia đều mỗi frame của gameFrame cho staggerFrames.
  /**
   * số lượng image.
   * staggerFrames = 5;
   * length of images =  7;
   * * ##################### bắt đầu chạy ##################### *
   * gameFrame = 0; Math.floor(gameFrame/staggerFrame = 0) = 0;
   * gameFrame = 1; Math.floor(gameFrame/staggerFrame = 0.2) = 0;
   * gameFrame = 2; Math.floor(gameFrame/staggerFrame = 0.4) = 0;
   * gameFrame = 3; Math.floor(gameFrame/staggerFrame = 0.6) = 0;
   * gameFrame = 4; Math.floor(gameFrame/staggerFrame = 0.8) = 0;
   * * ##################### sau 5 lần chạy: 0%7 = 0(tọa độ) = ảnh thứ 1 ##################### *
   * gameFrame = 5; Math.floor(gameFrame/staggerFrame = 1) = 1;
   * gameFrame = 6; Math.floor(gameFrame/staggerFrame = 1.2) = 1;
   * gameFrame = 7; Math.floor(gameFrame/staggerFrame = 1.4) = 1;
   * gameFrame = 8; Math.floor(gameFrame/staggerFrame = 1.6) = 1;
   * gameFrame = 9; Math.floor(gameFrame/staggerFrame = 1.8) = 1;
   * * ##################### sau 10 lần chạy: 1%7 = 1(tọa độ) = ảnh thứ 2 ##################### *
   * gameFrame = 10; Math.floor(gameFrame/staggerFrame = 2) = 2;
   * gameFrame = 11; Math.floor(gameFrame/staggerFrame = 2.2) = 2;
   * gameFrame = 12; Math.floor(gameFrame/staggerFrame = 2.4) = 2;
   * gameFrame = 13; Math.floor(gameFrame/staggerFrame = 2.6) = 2;
   * gameFrame = 14; Math.floor(gameFrame/staggerFrame = 2.8) = 2;
   * * ##################### sau 15 lần chạy: 2%7 = 2(tọa độ) = ảnh thứ 3 ##################### *
   * gameFrame = 15; Math.floor(gameFrame/staggerFrame = 3) = 3;
   * gameFrame = 16; Math.floor(gameFrame/staggerFrame = 3.2) = 3;
   * gameFrame = 17; Math.floor(gameFrame/staggerFrame = 3.4) = 3;
   * gameFrame = 18; Math.floor(gameFrame/staggerFrame = 3.6) = 3;
   * gameFrame = 19; Math.floor(gameFrame/staggerFrame = 3.8) = 3;
   * * * ##################### sau 20 lần chạy: 3%7 = 3(tọa độ) = ảnh thứ 4 ##################### *
   * gameFrame = 20; Math.floor(gameFrame/staggerFrame = 4) = 4;
   * gameFrame = 21; Math.floor(gameFrame/staggerFrame = 4.2) = 4;
   * gameFrame = 22; Math.floor(gameFrame/staggerFrame = 4.4) = 4;
   * gameFrame = 23; Math.floor(gameFrame/staggerFrame = 4.6) = 4;
   * gameFrame = 24; Math.floor(gameFrame/staggerFrame = 4.8) = 4;
   * * * ##################### sau 25 lần chạy: 4%7 = 4(tọa độ) = ảnh thứ 5 ##################### *
   * *...*
   * gameFrame = 35; Math.floor(gameFrame/staggerFrame = 7) = 7;
   * gameFrame = 36; Math.floor(gameFrame/staggerFrame = 7.2) = 7;
   * gameFrame = 37; Math.floor(gameFrame/staggerFrame = 7.4) = 7;
   * gameFrame = 38; Math.floor(gameFrame/staggerFrame = 7.6) = 7;
   * gameFrame = 39; Math.floor(gameFrame/staggerFrame = 7.8) = 7;
   * * * ##################### sau 40 lần chạy: 7%7 = 0(tọa độ) = ảnh thứ 1 ##################### *
   * gameFrame = 40; Math.floor(gameFrame/staggerFrame = 8) = 8;
   * gameFrame = 41; Math.floor(gameFrame/staggerFrame = 8.2) = 8;
   * gameFrame = 42; Math.floor(gameFrame/staggerFrame = 8.4) = 8;
   * gameFrame = 43; Math.floor(gameFrame/staggerFrame = 8.6) = 8;
   * gameFrame = 44; Math.floor(gameFrame/staggerFrame = 8.8) = 8;
   * * * ##################### sau 45 lần chạy: 8%7 = 1(tọa độ) = ảnh thứ 2 ##################### *
   */
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;

  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  context.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;
  requestAnimationFrame(animate);
};
animate();
