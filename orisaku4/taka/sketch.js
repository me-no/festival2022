let scal = 3;
let canvasWidth;

// rose curve
let r;
let theta=0;
let a;
let b;
let rtheta, rphi;

// sin curve 
let phi = 0, dphi = 0.5;
let sinHight;
let sinCenter;

// drastic sine curve
let xspacing = 3; // Distance between each horizontal location
let w; // Width of entire wave
let psi = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave




function preload(){
  imgtaka = loadImage("taka.png");
}

function setup() {
  canvasWidth = imgtaka.width/4 * scal;
  createCanvas(canvasWidth, canvasWidth);
  center = canvasWidth/2;
  background(255);
  
  // sin curve 
  sinHight = canvasWidth/3;
  sinCenter = canvasWidth;
  
  // drastic sine curve
  dx = (TWO_PI / period) * xspacing;
  w =  canvasWidth + xspacing;
  yvalues = new Array(floor(w / xspacing)); 
  amplitude = sinHight;

  // layer
  layer_rose = createGraphics(canvasWidth,canvasWidth);
  layer_rose.clear();
  
  // rose curve
  rtheta=0.01;
  a = 2;//int(random(1,7));
  b = 7;//int(random(1,6.9));
}

function draw() {
  //background(255);
  // sin curve 
  noStroke();
  fill(227,163,23);
  sinx = canvasWidth - phi;
  siny = sinHight * sin(phi/(Math.PI*16) )+sinCenter;
  intsinx= int(sinx/scal)*scal;
  intsiny = int(siny/scal)*scal;
  for(let i = 0; i < intsiny; i+=scal){
    //rect(intsinx, intsiny+i, scal, scal);
  }
  phi+=dphi;
  
  
  // drastic sine curve
  noStroke();
  calcWave();
  psi += 0.001;
  let gamma = psi;
  for (let i = 0; i < yvalues.length; i++){
    yvalues[i] = sin( gamma/PI ) * amplitude;
    gamma +=dx;
  }
  for (let x = 0; x < yvalues.length; x++) {
    drasticx = int(x*xspacing/scal)*scal;
    drasticy = int(yvalues[x]/scal)*scal;
    //rect(x*xspacing, yvalues[x] +sinCenter, scal, scal);
    fill(227,163,23,100);
    rect(drasticx, drasticy+sinCenter, scal, scal);

    fill(244,212,98,100);
    rect(drasticx, drasticy/2+sinCenter/2, scal, scal);
    
    fill(243,234,208,100);
    rect(drasticx, drasticy/2+sinCenter/2-sinHight, scal, scal);
  }
  
  // rose curve
  r= center*3/4*scal*sin(a*theta/b);

  x = (r/scal)*cos(theta+0.1)+center;
  y = (r/scal)*sin(theta+0.1)+center;
  
  intx = int(x/scal)*scal;
  inty = int(y/scal)*scal;
  
  // plot rectangles
  rectx = int(random(-15, canvasWidth)/scal)*scal;// x とy が頂点; 
  recty = int(random(-15, canvasWidth)/scal)*scal;

  rectr = int(random(2, 15))*2-1;// 奇数で出力
  tr = random(0, 70);
  for (i = 0; i < rectr; i++) {
      ii = i*2+1;
      j = (rectr - ii)/2;
      l = rectr - j*2;
      noStroke();
      fill(255,255,255, tr);
      for (k = 0; k<l; k++) {
          rect(rectx+j*scal+k*scal, recty+i*scal, scal, scal);
          if(i!=rectr-1){
              rect(rectx+j*scal+k*scal, recty+2*rectr*scal-i*scal-scal*2, scal, scal);
          }
      }
  }

  // white rose curve 
  white_r = center*3/4*scal*sin(b*theta/a);
  white_x = (white_r/scal)*cos(theta+0.1)+center;
  white_y = (white_r/scal)*sin(theta+0.1)+center;
  white_intx = int(white_x/scal)*scal;
  white_inty = int(white_y/scal)*scal;
  
  // draw rose curves
  layer_rose.noStroke();
  layer_rose.fill(255);
  layer_rose.rect(white_intx, white_inty, scal, scal);
  
  layer_rose.fill(199,77,100);
  layer_rose.rect(intx,inty,scal,scal);
  

  theta+=rtheta;
  image(layer_rose, 0, 0, canvasWidth, canvasWidth);

  image(imgtaka, 0, 0, canvasWidth, canvasWidth);
  image(layer_rose, 131*scal, 125*scal, 3*scal, 3*scal);
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


