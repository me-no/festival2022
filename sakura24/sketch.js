
let scal = 2;
let count;

// noise for floating
noise_x = Math.random();
noise_y = Math.random();

// sin wave
let swidth; // Width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 300.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let dvel;
let yvalues; // Using an array to store height values for the wave


function preload () {
  back=loadImage("back.png");
  front=loadImage("front.png");
  g_back = loadImage("ground-back.png");
  g_back2 = loadImage("ground-back2.png");
  g_front = loadImage("ground-front.png");
  kid = loadImage("kid.png");
  kid2 = loadImage("kid2.png");
  sakura = loadImage("sakura-front.png");
  petal = loadImage("petal.png");
  petal2 = loadImage("petal2.png");
  
  g_backs = [g_back, g_back2];
  kids = [kid, kid2];
  petals = [petal, petal2];
  
}

function setup() {
  frameRate(30);
  cwidth = back.width/4*scal;
  cheight = back.height/4*scal;
  createCanvas(cwidth,cheight);
  background(198,226,246);

  // sin wave
  amplitude = cheight/10;
  swidth = cwidth+scal;
  //dx = map(random(), 0, 1, -(TWO_PI/period)*4, -(TWO_PI/period));
  dx = -(TWO_PI / period) * scal;// 周期はscal / period 
  dvel = map(random(), 0, 1, -3, -1);// 二つ目のサインカーブの周期を変える
  yvalues = new Array(floor(swidth / scal));
}

function draw() {
  background(198,226,246, 100);
  
  d = new Date();
  count = d.getMilliseconds();
  if(count < 500) {
    i = 0;
  } else {
    i = 1;
  }
  
  image(back,0,0,cwidth,cheight);
  image(g_backs[i], 0,0,cwidth,cheight);
  
  // sine wave
  fill(255,255,255,30);
  
  yvalues = calcWave(yvalues, amplitude*1.5, dvel, 0.01);// ここでdvel にdx をかけると正常なサインカーブになる
  renderWave( int(cheight/2/scal + 36)*scal, yvalues);
  
  yvalues = calcWave(yvalues, amplitude, dx, 0.02);
  //renderWave( int(cheight/2/scal+24)*scal, yvalues );
  
  
  image(g_front, 0,0,cwidth,cheight);
  
  renderWaveImg(int(cheight/2/scal+24)*scal, yvalues, petals);
  
  image(kids[i], 0,0,cwidth,cheight);
  image(front, 0,0,cwidth,cheight);
  
  sakura_x = map(noise(noise_x), 0, 1, 0, 20*scal);
  sakura_y = map(noise(noise_y), 0, 1, -10*scal, 0);
  image(sakura, sakura_x, sakura_y, cwidth,cheight);
  
  noise_x +=0.02;
  noise_y +=0.01;
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

function renderWaveImg(center, array,imgs) {
  noStroke();
  fill(255);
  
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < array.length; x+=petal.width/4*scal) {
    let i = count+x;
    if(i<500) {  
      image(imgs[0], x * scal, center + array[x], imgs[0].width/4*scal, imgs[0].height/4*scal);
    } else {
      image(imgs[1], x * scal, center + array[x],imgs[1].width/4*scal, imgs[1].height/4*scal);
    }
  }
}
