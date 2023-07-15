const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";

const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;

const animate = () => {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // context.fillRect(50, 50, 100, 100);
  // context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);

  context.drawImage(
    playerImage,
    // tọa độ muốn cắt trên ảnh.
    frameX * spriteWidth,
    frameY * spriteHeight,
    // kích thước cắt ảnh, dựa theo toạ độ.
    spriteWidth,
    spriteHeight,
    // toạ độ hiển thị ảnh được cắt lên canvas.
    0,
    0,
    // kích thước hiển thị ẢNH ĐÃ ĐƯỢC CẮT lên canvas.
    spriteWidth,
    spriteHeight
  );

  // **Basic (change frameX  each default frames)** //
  // // staggerFrames = 5 nghĩa là mỗi ảnh sẽ chạy 5 frames, chạy xong 5 frames thì thay đổi.
  // if (gameFrame % staggerFrames === 0) {
  //   // thay đổi frame
  //   if (frameX < 6) {
  //     frameX++;
  //   } else {
  //     frameX = 0;
  //   }
  // }

  gameFrame++;
  requestAnimationFrame(animate);
};
animate();
