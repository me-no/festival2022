let imgw, imgh, zodiacw, zodiach;
let canvasWidth, canvasHeight;

function preload() {
  //firefly = loadGif("firefly.gif");
  pumpkin = loadImage("pumpkin.png");
  yuzu = loadImage("yuzu.png");

  canvasWidth = 192;
  canvasHeight = 128;
}


function setup() {
  //createCanvas(imgw,imgh);
  cvs_pump = createARGraphics(canvasWidth, canvasHeight, P2D, {markerId:47});
  cvs_yuzu = createARGraphics(canvasWidth, canvasHeight, P2D, {markerId:63});
  
  }

function draw() {
  cvs_yuzu.image(yuzu, 0, 0);
  cvs_pump.image(pumpkin, 0, 0);

}