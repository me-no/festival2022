let scal = 2;
let canvasWidtn, canvasHeight;

// for sunlight
let x0, y0;
let _x=1,_y=0;

// for sine curve
let xspacing = scal; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 45.0*scal; // Height of wave
let period = 360.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

function preload () {
    imgback = loadImage("back-1.png");
    imgmain = loadImage("slider-1.png");
    imgkid = loadImage("kid.png");
}

function setup () {
    actualSize = imgmain.width/4;
    canvasWidth = actualSize*scal;
    canvasHeight= actualSize*scal;
    createCanvas(canvasWidth, canvasHeight);
    background(255);
    image(imgback, 0, 0, canvasWidth, canvasHeight);
    image(imgmain, 0,0,canvasWidth, canvasHeight);

    y0 = 200*scal;//直線の始点は160 ~ 256+138, 直線の式はy=-x+160*scalで
    x0 = 202*scal;
    tr = 100;

    // sine curve
    dx = (TWO_PI / period) * xspacing;
    w =  canvasWidth;
    yvalues = new Array(floor(w / xspacing)); 

}

function draw () {
  // for sine wave
  calcWave();
  theta += 0.001;
  let phi = theta;
  for (let i = 0; i < yvalues.length; i++){
      yvalues[i] = sin(phi) * amplitude;
      phi +=dx;
  }
  
  // plot sine wave for shadow
  fill(200,200,200,tr);
  noStroke();
  for (let x = 0; x < yvalues.length; x++) {
      rect(x*xspacing, yvalues[x]+canvasHeight - 40*scal, scal, scal);
  }
  
  image(imgback,0, 0, canvasWidth, canvasHeight);



  tint(255,255,255, 50);
  image(imgmain,0,0, canvasWidth, canvasHeight);

  noStroke();

  _y = _y + 0.06;
  y0 = y0+ (5-noise(_y)*10);
  //console.log(y0, _y);

  for (let k=0; k<y0; k+=scal*2){
      fill(255,255,255,tr);
      rect(k, -k+y0, scal*4, scal*4);
      fill(255,255,255,tr/3);
      rect(k, -k+y0-scal, scal*4, scal*4);
      rect(k, -k+y0+scal, scal*4, scal*4);
  }
  if(y0 < 160*scal || (256+138)*scal < y0) {// y0 が行きすぎたらリセット
      y0 = 200*scal;
  }

  // 2本目
  _x = _x + 0.02;
  x0 = x0+ (5-noise(_x)*10);

  for (let k=0; k<x0; k+=scal*2){
      fill(255,255,255,tr);
      rect(k, -k+x0, scal*4, scal*4);
      fill(255,255,255,tr/3);
      rect(k, -k+x0-scal, scal*4, scal*4);
      rect(k, -k+x0+scal, scal*4, scal*4);
  }
  if(x0 < 160*scal || (256+138)*scal < x0) {// x0 が行きすぎたらリセット
      x0 = 300*scal;
  }

  // line from the cursor position
  for(let i =0; i<canvasWidth; i+=scal*2){// 直線の式はy=-x+mouseX+mouseY
      fill(255,255,255, tr);
      rect(i,-i+mouseX+mouseY, 4*scal, 4*scal);
      fill(255,255,255,tr/3);
      rect(i,-i+mouseX+mouseY-scal, scal*8, scal*8);
      //rect(i,-i+mouseX+mouseY-2*scal, scal, scal);
      rect(i,-i+mouseX+mouseY+scal, scal*8, scal*8);
      //rect(i,-i+mouseX+mouseY+2*scal, scal, scal);
  }

  // plot sine curve
  fill(255,255,255,tr/2);
  noStroke();
  for (let x = 0; x < yvalues.length; x++) {
      rect(x*xspacing, yvalues[x]+canvasHeight - 95*scal, scal, scal);
      rect(x*xspacing+scal, yvalues[x]+canvasHeight - 95*scal, scal, scal);
      rect(x*xspacing+period/2, yvalues[x]+canvasHeight - 140*scal, scal, scal);
      rect(x*xspacing, yvalues[x]+canvasHeight - 185*scal, scal, scal);

  }

  tint(255,200);
  image(imgkid, 0, 0, canvasWidth, canvasHeight);
}

// for sine curve
function calcWave() {
    // Increment theta (try different values for 'angular velocity' here)
    theta += 0.02;// 波の速さはここ
  
    // For every x value, calculate a y value with sine function
    let x = theta;
    for (let i = 0; i < yvalues.length; i++) {
      yvalues[i] = sin(x) * amplitude;
      x += dx;
    }
  }
