/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
var spacePressed = false;
var angle = 0;
var hue = 0;
var frame = 0;
var score = 0;
var gamespeed = 2;

var Bird = /*#__PURE__*/function () {
  function Bird() {
    _classCallCheck(this, Bird);

    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.width = 20;
    this.height = 20;
    this.weight = 1;
  }

  _createClass(Bird, [{
    key: "update",
    value: function update() {
      var curve = Math.sin(angle) * 20;

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
  }, {
    key: "draw",
    value: function draw() {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }, {
    key: "flap",
    value: function flap() {
      this.vy -= 2;
    }
  }]);

  return Bird;
}();

var bird = new Bird();

var Particle = /*#__PURE__*/function () {
  function Particle() {
    _classCallCheck(this, Particle);

    this.x = bird.x;
    this.y = bird.y;
    this.size = Math.random() * 7 + 3;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = "red";
  }

  _createClass(Particle, [{
    key: "update",
    value: function update() {
      this.x -= gamespeed;
      this.y += this.speedY;
    }
  }, {
    key: "draw",
    value: function draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }]);

  return Particle;
}();

var particlesArray = [];

var handleParticles = function handleParticles() {
  particlesArray.unshift(new Particle());

  for (var i = 0; i < particlesArray.length; i++) {
    var element = particlesArray[i];
    element.update();
    element.draw();
  } // if more than 200, remove 20.


  if (particlesArray.length > 200) {
    for (var _i = 0; _i < 20; _i++) {
      particlesArray.pop(particlesArray[_i]);
    }
  }
};

var obstaclesArray = [];

var Obstacle = /*#__PURE__*/function () {
  function Obstacle() {
    _classCallCheck(this, Obstacle);

    this.top = Math.random() * canvas.height / 3 + 20;
    this.bottom = Math.random() * canvas.height / 3 + 20;
    this.x = canvas.width;
    this.width = 20;
    this.color = "blue";
    this.counted = false;
  }

  _createClass(Obstacle, [{
    key: "draw",
    value: function draw() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, 0, this.width, this.top);
      ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }
  }, {
    key: "update",
    value: function update() {
      this.x -= gamespeed;

      if (!this.counted && this.x < bird.x) {
        score++;
        this.counted = true;
      }

      this.draw();
    }
  }]);

  return Obstacle;
}();

var handleObstacles = function handleObstacles() {
  if (frame % 50 === 0) {
    obstaclesArray.unshift(new Obstacle());
  }

  for (var i = 0; i < obstaclesArray.length; i++) {
    var element = obstaclesArray[i];
    element.update();
  }

  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
};

var handleCollisions = function handleCollisions() {
  for (var i = 0; i < obstaclesArray.length; i++) {
    var element = obstaclesArray[i];

    if (bird.x < element.x + element.width && bird.x + bird.width > element.x && (bird.y < 0 + element.top && bird.y + bird.height > 0 || bird.y > canvas.height - element.bottom && bird.y + bird.height < canvas.height)) {
      // collision detected
      // ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      ctx.font = "25px Georgia";
      ctx.fillStyle = "black";
      ctx.fillText("Game Over, you score is " + score, 160, canvas.height / 2 - 10);
      return true;
    }
  }
};

var gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.9", "#fff");

var animate = function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // ctx.fillRect(10, canvas.height - 90, 50, 50);

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
window.addEventListener("keydown", function (_ref) {
  var code = _ref.code;
  if (code === "Space") spacePressed = true;
});
window.addEventListener("keyup", function (_ref2) {
  var code = _ref2.code;
  if (code === "Space") spacePressed = false;
});

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map