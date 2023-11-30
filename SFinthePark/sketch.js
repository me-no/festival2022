let scal = 2;

// for sine wave 
let dr=  0;
let strum = 2;// height of the wave:反比例
let center = -10*scal;// center of y
let centerNoise=0;
//let backNoise = 2;
let tr = 100;// transparency
let count=0;
let rest = 4;

function preload() {
  imgback = loadImage("back.png");
  imgfish = loadImage("manbow.png");
  imgtrn = loadImage("train.png");
  imgslider= loadImage("front.png");
  imglight = loadImage("light.png");
  
  imgl1 = loadImage("l1.png");
  imgl2 = loadImage("l2.png");
  imgl3 = loadImage("l3.png");
  
  imgr1= loadImage("r1.png");
  imgr2 = loadImage("r2.png");
  imgr3 = loadImage("r3.png");
  imgr4 = loadImage("r4.png");
  
  imgkid = loadImage("kid.png");
  imgkid2 = loadImage("kid2.png");
}


function setup() {
  cwidth = imgback.width/4*scal;
  cheight = imgback.height/4*scal;
  createCanvas(cwidth, cheight);
  background(210,233,236);
  frameRate(10);
}

function draw() {
  noStroke();
  
  r = int(random(6, 20));// radius
  rhombusColor = [210,233,236,tr];
  rhombusx = int(random(-50*scal,cwidth)/scal)*scal;
  rhombusy = int(random(-50*scal,cheight)/scal)*scal;
  makeRhombus(rhombusx, rhombusy, r*scal, rhombusColor);

  
  fill(255,255,255,tr/4);
  
  n = noise(centerNoise);
  fish = map(n, 0, 1, 0, 20);
  train = map(n, 0, 1, 0, 30);
  
  drawPixelSineWave((center)*16,strum);
  drawPixelSineWave((center)*4,strum);
  
  //
  // 触ると動くデジタルバージョン:
  //
  // https://me-no.sayosan.cf/SFinthePark/
  //
  // 
  //     ■■■
  //     ■ ■
  //     ■ ■
  //     ■ ■                QR Code
  //   ■■■ ■■■
  //   ■     ■
  //    ■   ■
  //      ■
  // 
  
  

  image(imgback, 0, 0, cwidth, cheight);
  
  drawPixelSineWave((center)*8,strum);
  drawPixelSineWave((center)*8,strum*2);
  
  // manbow 
  if(mouseX>186*scal && mouseY>44*scal && mouseX<327*scal && mouseY<144*scal) {
    image(imgfish, mouseX/186+fish, mouseX/186-fish, cwidth, cheight);
  } else {
    image(imgfish, 0, 0, cwidth, cheight);
  }

  // train
  if(mouseX > 49*scal && mouseY > 28*scal && mouseX < 144*scal && mouseY < 111*scal) {
    image(imgtrn, mouseX/49-train, mouseX/49-train, cwidth, cheight);
  } else {
    image(imgtrn, 0, 0, cwidth,cheight);
  }
  
  centerNoise+=0.05;

  // the front 
  image(imgslider, 0, 0, cwidth, cheight);
  
  // UO
  d = new Date();
  uocount = d.getMilliseconds();
  if(90*scal<mouseX && 124*scal<mouseY && mouseX<146*scal && mouseY<216*scal){
    if(uocount<200){
      image(imgl1, 0, 0, cwidth, cheight);
    } else if (uocount<400){
      image(imgl2, 0, 0, cwidth, cheight);
    } else if(uocount < 600) {
      image(imgl3, 0, 0, cwidth, cheight);
    }
  } else if(220*scal<mouseX && 95*scal<mouseY && mouseX<357*scal && mouseY<220*scal) {
    if(uocount<150){
      image(imgr1, 0, 0, cwidth, cheight);
    } else if (uocount<300) {
      image(imgr2,  0, 0, cwidth, cheight);
    } else if(uocount<450) {
      image(imgr3,  0, 0, cwidth, cheight);
    } else if(uocount<600) {
      image(imgr4,  0, 0, cwidth, cheight);
    }
  }
  
  // morse
  if(
    count < 2 || (3<=count && count<4) || (5<=count && count<7) || (8<=count && count<=9)
    ||
     (10+rest<=count && count<12+rest)||(13+rest<=count && count<15+rest) || (16+rest<=count && count<17+rest) || (18+rest<=count && count<=20+rest)
    ) {
     image(imglight, 0, 0, cwidth, cheight);
   }
  
  count++;
  
  // kid 
  if(count > 20) {
    image(imgkid2, 0, 0, cwidth, cheight);
  } else {
    image(imgkid, 0, 0, cwidth, cheight);
  }
  
  if(count > 20+rest*2) {
    count = 0;
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

function drawPixelSineWave (center, sinheight) {
  for(let x =  0; x < width; x+=scal/10) {
    let angle = dr + x/50;
    let y = map(sin(angle), -sinheight, sinheight, width/4, width*3/4)+center;
    rect(int(x/scal)*scal, int(y/scal)*scal, scal,scal);
  }
  dr += 0.05;
}

