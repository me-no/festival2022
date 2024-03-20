let scal = 2;

// sin wave
let swidth; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 300.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let dvel;
let yvalues; // Using an array to store height values for the wave

function preload () {
  back = loadImage("back.png");
  main = loadImage("main.png");
  front = loadImage("front.png");
  tanpopo =loadImage("dandelion.png");
}

function setup() {
  frameRate(20);
  cwidth = main.width/4*scal;
  cheight =main.height/4*scal;
  
  createCanvas(cwidth, cheight);
  background(255);
  
  count = 0;

  // sin wave
  amplitude = cheight/10;
  swidth = cwidth*2/3+scal;
  //dx = map(random(), 0, 1, -(TWO_PI/period)*4, -(TWO_PI/period));
  dx = (TWO_PI / period) * scal;// 周期はscal / period 
  dvel = map(random(), 0, 1, -2, -1);// 二つ目のサインカーブの周期を変える
  yvalues = new Array(floor(swidth / scal));
  
}

function draw() {
  background(255);
  image(back,0,0,cwidth, cheight);
  
  if(count%17==0){
    rhcolor = [255,255,255,50];
    rhr = int(random(30,60))*scal;
    rh_x = int(random(cwidth)/scal)*scal;
    rh_y = int(random(cheight)/scal)*scal;
    makeRhombus(rh_x, rh_y, rhr,rhcolor);
    count=0;
  }
  count++;
  
  // sine wave
  fill(255,255,255,30);
  yvalues = calcWave(yvalues, amplitude, dvel, 0.02);
  renderWave( int(cheight/2/scal-48)*scal, yvalues );
  
  image(main,0,0,cwidth,cheight);

  yvalues = calcWave(yvalues, amplitude, dx, 0.01);
  renderWaveImg( int(cheight/2/scal-8)*scal, yvalues, tanpopo, tanpopo.width/4*scal, tanpopo.height/4*scal);
  
  image(front,0,0,cwidth,cheight);
  
}


function calcWave(array, h, _dx, velocity) {
  // Increment theta (try different values for
  // 'angular velocity' here)
  theta += velocity;

  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < array.length; i++) {
    array[i] = sin(x) * h;
    x += _dx;
  }
  return array;
}

function renderWave(center, array) {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x++) {
    rect(x * scal, center + array[x], scal, scal);
  }
}


function renderWaveImg(center, array,img, i_width, i_height) {
  noStroke();
  fill(255);
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x+=i_width*8) {
    image(img, x*scal, center +array[x], i_width, i_height);
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
