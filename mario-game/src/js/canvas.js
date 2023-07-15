import background from "../img/background.png";
import hills from "../img/hills.png";
import platform from "../img/platform.png";
import platformSmallTall from "../img/platformSmallTall.png";

import spriteRunLeft from "../img/spriteRunLeft.png";
import spriteRunRight from "../img/spriteRunRight.png";
import spriteStandLeft from "../img/spriteStandLeft.png";
import spriteStandRight from "../img/spriteStandRight.png";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// canvas sizes
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;
class Player {
  constructor() {
    this.speed = 10;
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 66;
    this.height = 150;

    this.image = createImage(spriteStandRight);
    this.frames = 0;
    this.sprites = {
      stand: {
        left: createImage(spriteStandLeft),
        right: createImage(spriteStandRight),
        cropWidth: 177,
        width: 66,
      },
      run: {
        left: createImage(spriteRunLeft),
        right: createImage(spriteRunRight),
        cropWidth: 341,
        width: 127.875,
      },
    };

    this.currentSprite = this.sprites.stand.right;
    this.currentCropWidth = 177;
  }

  draw() {
    // c.fillStyle = "red";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;

    // 28 characters.
    if (
      this.frames > 59 &&
      (this.currentSprite === this.sprites.stand.right ||
        this.currentSprite === this.sprites.stand.left)
    )
      this.frames = 0;
    else if (
      this.frames > 29 &&
      (this.currentSprite === this.sprites.run.right ||
        this.currentSprite === this.sprites.run.left)
    )
      this.frames = 0;

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // tọa độ + chiều cao + vận tốc.
    // vận tốc tăng theo thời gian nên cũng được cộng vào.
    // nếu kết quả vẫn nhỏ hơn height thì vẫn thiếp tục cho rơi xuống.

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      // *Bỏ phần này để vận tốc tiếp tục tăng, thì sẽ có hiệu ứng player bị nhảy xuống hố luôn.
      // this.velocity.y = 0;
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y
      // this.width,
      // this.height
    );
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y
      // this.width,
      // this.height
    );
  }
}

const createImage = (imageSrc) => {
  const image = new Image();
  image.src = imageSrc;
  return image;
};

// first start game
let platformImage = createImage(platform);
let platformSmallTallImage = createImage(platformSmallTall);
let player = new Player();
let platforms = [];
let genericObjects = [];

let lastKey = "";

const keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

let scrollOffset = 0;

const init = () => {
  platformImage = createImage(platform);
  player = new Player();
  platforms = [
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({ x: -1, y: 470, image: platformImage }),
    new Platform({
      x: platformImage.width - 3,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 700 - 2,
      y: 470,
      image: platformImage,
    }),
  ];
  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background),
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills),
    }),
  ];

  scrollOffset = 0;
};

// animation
const animate = () => {
  window.requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "#fff";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => genericObject.draw());
  platforms.forEach((platform) => platform.draw());
  player.update(); // bị overlap nên phải đặt player phía dưới platforms.

  // di chuyển trái phải trái. chỉ di chuyển trong khoảng từ 100 đến 400
  // và nếu đã vượt 400 hoặc 100 thì đứng player đứng yên và tăng vị trí platform nếu tiếp tục press.
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => (platform.position.x -= player.speed));
      genericObjects.forEach(
        (genericObject) => (genericObject.position.x -= player.speed * 0.66)
      );
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => (platform.position.x += player.speed));
      genericObjects.forEach(
        (genericObject) => (genericObject.position.x += player.speed * 0.66)
      );
    }
  }

  // cho player đứng trên platform
  // play chỉ đứng trên platform khi vị trí y của play + chiều cao <= y platform
  // và chỉ khi vận tốc y + vị trí + chiều cao player >= vị trí y của platform.
  // nghĩa là vẫn có độ rơi
  //* platform collision detection.
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      //
      player.position.x + player.width >= platform.position.x &&
      //
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // sprite switching
  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.run.right
  ) {
    player.frames = 1;
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.run.left
  ) {
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSprite !== player.sprites.stand.left
  ) {
    player.currentSprite = player.sprites.stand.left;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSprite !== player.sprites.stand.right
  ) {
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }

  // win condition
  if (scrollOffset > platformImage.width * 5 + 700 - 2) {
    console.log("You win!");
  }

  // win condition
  if (player.position.y > canvas.height) {
    init();
  }
};

animate();

window.addEventListener("keydown", ({ keyCode }) => {
  // switch move
  switch (keyCode) {
    // left
    case 65:
      keys.left.pressed = true;
      lastKey = "left";
      break;
    // down
    case 83:
      break;
    // right
    case 68:
      keys.right.pressed = true;
      lastKey = "right";
      break;
    // up
    case 87:
      // chỉ khi vận tốc bằng 0, nghĩa là nhân vật chạm đất. thì mới được phép nhảy tiếp.
      if (player.velocity.y === 0) {
        player.velocity.y -= 10;
      }

      // nếu muốn nhân vật nhảy liên tục không đợi chạm đất thì bỏ lệnh trên và thêm câu lệnh dưới.
      // player.velocity.y -= 15;
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  // switch move
  switch (keyCode) {
    // left
    case 65:
      keys.left.pressed = false;
      break;
    // down
    case 83:
      break;
    // right
    case 68:
      keys.right.pressed = false;

      break;
    // up
    case 87:
      break;
  }
});
