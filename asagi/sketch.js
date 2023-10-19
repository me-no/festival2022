let scal = 2;
let cwidth, cheight;
let icnnoise=1;
let count=0;


// drastic sin curve
let xspacing = scal; // Distance between each horizontal location
let w; // Width of entire wave
let psi = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave


function preload () {
  imgback = loadImage("back-wide.png");
  imgkid = loadImage("kid-wide.png");
  imgicn = loadImage("asagi-icon.png");
  imgicnr = loadImage("asagi-icon-red.png");
  imgobj = loadImage("objects.png");
}

function setup() {
  //frameRate(24);
  cwidth = imgback.width/4*scal;
  cheight = imgback.height/4*scal;
  createCanvas(cwidth, cheight);
  background(255);
  

  // drastic sine curve
  dx = (TWO_PI / period) * xspacing;
  w =  cwidth + xspacing;
  yvalues = new Array(floor(w / xspacing)); 
  sinHeight = cheight/5;
  amplitude = sinHeight;

}

function draw() {
  // for rhombus
  rhombusr = 24*scal;
  rhombusx = int(random(-rhombusr, cwidth)/scal)*scal;
  rhombusy = int(random(-rhombusr, cheight)/scal)*scal;
  rcolors = [255,255,255,100];
  
  image(imgback, 0,0, cwidth, cheight);  
  
  tint(255,100);
  beginLayer();
  background(255,255,255,0);
  // sin curve 
  noStroke();
  //colorDice = int(random(colors.length));
  fill(177,237,253,100);
  calcWave();
  psi += 0.01;
  let gamma = psi;
  for (let i = 0; i < yvalues.length; i++){
    yvalues[i] = sin( gamma/TWO_PI ) * amplitude;
    gamma +=dx;
  }
  for (let x = 0; x < yvalues.length; x++) {
    drasticx = int(x*xspacing/scal)*scal;
    drasticy = int(yvalues[x]/scal)*scal;

    rect(drasticx, drasticy+cheight/2, scal, scal);
    rect(drasticx, drasticy+cheight*1/9, scal, scal);
    rect(drasticx, drasticy+cheight*8/9, scal, scal);
  }
  
  //if(count==6){
    erase();
    makeRhombus(rhombusx, rhombusy, rhombusr, rcolors);
    //count=0;
    noErase();
  //}
  
  endLayer();
  tint(255,255);
  
  if(count==6){
    makeRhombus(rhombusx, rhombusy, rhombusr, rcolors);
    count=0;
  }
  
  count+=1;
  
  image(imgkid, 0, 0, cwidth, cheight);
  image(imgobj, 0, 0, cwidth, cheight);
  
  // the icon
  rop = map(noise(icnnoise), 0,1,50,255);
  tint(255,rop);
  msXpx = int(mouseX/scal)*scal;
  msYpx = int(mouseY/scal)*scal;
  if(mouseY > 160*scal) {
    //image(imgicnr, mouseX, mouseY, imgicnr.width/4*scal, imgicnr.height/4*scal);
    image(imgicnr, msXpx, msYpx, imgicnr.width/4*scal, imgicnr.height/4*scal);
  } else {
    //image(imgicn, mouseX, mouseY, imgicn.width/4*scal, imgicn.height/4*scal);
    image(imgicn, msXpx, msYpx, imgicn.width/4*scal, imgicn.height/4*scal);
  }
  tint(255,255);
  icnnoise+=0.01;


}


function calcWave() {
  psi += 0.01;// 波の速さはここ

  // For every x value, calculate a y value with sine function
  let x = psi;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
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
