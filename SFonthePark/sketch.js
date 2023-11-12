let scal = 3;

// for sine wave 
let dr=  0;
let strum = 2;// height of the wave:反比例
let center = -10*scal;// center of y
let centerNoise=0;
//let backNoise = 2;
let tr = 100;// transparency


function preload() {
  imgback = loadImage("back.png");
  imgfish = loadImage("manbow.png");
  imgtrn = loadImage("train.png");
  imgslider= loadImage("theslider.png");
}

function setup() {
  cwidth = imgback.width/4*scal;
  cheight = imgback.height/4*scal;
  createCanvas(cwidth, cheight);
  background(210,233,236);
}

function draw() {
  noStroke();
  
  r = int(random(6, 20));// radius
  rhombusColor = [210,233,236,tr];
  rhombusx = int(random(-50*scal,cwidth)/scal)*scal;
  rhombusy = int(random(-50*scal,cheight)/scal)*scal;
  makeRhombus(rhombusx, rhombusy, r*scal, rhombusColor);

  
  fill(255,255,255,tr/6);
  
  n = noise(centerNoise);
  fish = map(n, 0, 1, 0, 20);
  train = map(n, 0, 1, 0, 30);
  
  drawPixelSineWave((center)*16);
  drawPixelSineWave((center)*4);

  image(imgback, 0, 0, cwidth, cheight);
  
  drawPixelSineWave((center)*8);
  
  // manbow 
  if(mouseX>186*scal && mouseY>44*scal && mouseX<327*scal && mouseY<144*scal) {
    image(imgfish, fish, -fish, cwidth, cheight);
    centerNoise+=0.01;
  } else {
    image(imgfish, 0, 0, cwidth, cheight);
  }

  // train
  if(mouseX > 49*scal && mouseY > 28*scal && mouseX < 144*scal && mouseY < 111*scal) {
    image(imgtrn, -train, -train, cwidth, cheight);
    centerNoise+=0.01;
  } else {
    image(imgtrn, 0, 0, cwidth,cheight);
  }

  
  // the front 
  image(imgslider, 0, 0, cwidth, cheight);
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

function drawPixelSineWave (center) {
  for(let x =  0; x < width; x+=scal/10) {
    let angle = dr + x/50;
    let y = map(sin(angle), -strum, strum, width/4, width*3/4)+center;
    rect(int(x/scal)*scal, int(y/scal)*scal, scal,scal);
  }
  dr += 0.05;
}

