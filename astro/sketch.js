let scal = 3;
let canvasWidth, canvasHeight;
let frame = 0;
let tr = 100;// transparency

// for sine wave 
let dr=  0;
let strum = 2;// height of the wave:反比例
let center = -10*scal;// center of y
let centerNoise=1;
let backNoise = 2;

function preload() {
  imgback = loadImage("back.png");
  imgmain = loadImage("kid.png");
  serifu = loadImage("serif_u.png");
  serifd = loadImage("serif_d.png");

}

function setup() {
  canvasWidth = imgmain.width/4*scal;
  canvasHeight = imgmain.height/4*scal;
  createCanvas(canvasWidth, canvasHeight);
  background(255);
  
  frameRate(20);
}

function draw() {
  noStroke();
  fill(255,255,255,tr/6);
  
  n = noise(centerNoise);
  
  drawPixelSineWave((center+n)*10);
  drawPixelSineWave((center-n)*15);
  centerNoise+=0.1;
  
  r = int(random(6, 20));// radius
  circlex = int(random(canvasWidth)/scal)*scal;
  circley = int(random(canvasHeight)/scal)*scal;
  //makeCircle(circlex, circley, r*scal);
  
  rhombusColor = [169,199,211,tr];
  rhombusx = int(random(-50*scal,canvasWidth)/scal)*scal;
  rhombusy = int(random(-50*scal,canvasHeight)/scal)*scal;
  makeRhombus(rhombusx, rhombusy, r*scal, rhombusColor);
  
  backnx = noise(backNoise);
  backny = noise(backnx);
  
  image(imgback, backnx*10, -backny*10, canvasWidth, canvasHeight);  
  backNoise+=0.2;
  image(imgmain, 0, 0, canvasWidth, canvasHeight);
  
  if(frame<10) {
    image(serifu, 0, 0, canvasWidth, canvasHeight);
  } else {
    image(serifd, 0, 0, canvasWidth, canvasHeight);
  }
  if(frame === 20) {
    frame = 0;
  } else {
    frame++;
  }
  
}


function makeRhombus (x, y, r, color) {// xyは左上、rは大きさ、colorは透過色込み
  //rectr = int(random(2, 15))*2-1;// 奇数で出力
  for (i = 0; i < r; i++) {
      ii = i*2+1;
      j = (r - ii)/2;
      l = r - j*2;
      noStroke();
      fill(color[0],color[1],color[2], color[3]);
      for (k = 0; k<l; k++) {
          rect(x+j*scal+k*scal, y+i*scal, scal, scal);
          if(i!=r-1){
              rect(x+j*scal+k*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
          }
      }
    }
}


function makeCircle (x0,y0,radius) {
  // plot circles     
  for (let theta = 0; theta < 360; theta++) {
    relativex = radius*cos(radians(theta));// 極座標→デカルト座標：x軸
    relativey = radius*sin(radians(theta));// 極座標→デカルト座標：y軸
    x = relativex + x0;
    y = relativey + y0;
    intx = int(x/scal)*scal;
    inty = int(y/scal)*scal;

    for (let k = 0; k < abs(relativey)/scal; k++){
      if(relativey <= 0) { rect(intx, inty + k*scal, scal, scal); }
      else { rect(intx, inty - k*scal, scal, scal); }
    }
  }  
}


function drawPixelSineWave (center) {
  for(let x =  0; x < width; x+=scal/10) {
    let angle = dr + x/50;
    let y = map(sin(angle), -strum, strum, width/4, width*3/4)+center;
    rect(int(x/scal)*scal, int(y/scal)*scal, scal,scal);
  }
  dr += 0.05;
}

