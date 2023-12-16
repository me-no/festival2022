let imgw, imgh, zodiacw, zodiach;
let canvasWidth, canvasHeight;

function preload() {
  firefly = loadGif("firefly.gif");
  fireworks = loadGif("fireworks.gif");
  kid = loadGif("kid.gif");
  lantern = loadGif("lantern.gif");
  sign = loadGif("sign.gif");
  star = loadGif("star.gif");
  train = loadGif("train.gif");
  zodiac = loadGif("zodiac_full3.gif");
  
  imgw = 327;
  imgh = 325;
  zodiacw = 637;
  zodiach = 860;
  canvasWidth = imgw;
  canvasHeight = imgh;
}


function setup() {
  //createCanvas(imgw,imgh);
  cvs_train = createARGraphics(canvasWidth, canvasHeight, P2D, {markerId:4});
  cvs_fireworks = createARGraphics(canvasWidth, canvasHeight, P2D, {markerId:28});
  cvs_firefly = createARGraphics(canvasWidth, canvasHeight, P2D, {markerId:47});
  cvs_kid = createARGraphics(canvasWidth, canvasHeight, P2D, {markerId:12});
  cvs_sign = createARGraphics(canvasWidth, canvasHeight, P2D, {markerId:10});
  cvs_lantern = createARGraphics(canvasWidth, canvasHeight, P2D, {markerId:56});
  cvs_stars = createARGraphics(canvasWidth, canvasHeight, P2D, {markerId:2});
  cvs_zodiac = createARGraphics(zodiacw, zodiach, P2D, {markerId:63});
  
  }

function draw() {
  cvs_train.image(train,0,0);
  cvs_fireworks.image(fireworks, 0, 0);
  cvs_firefly.image(firefly, 0, 0);
  cvs_kid.image(kid, 0, 0);
  cvs_sign.image(sign, 0, 0);
  cvs_lantern.image(lantern,0,0);
  cvs_stars.image(star, 0, 0);
  cvs_zodiac.image(zodiac, 0,0);
}