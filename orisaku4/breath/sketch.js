let scal= 3;

let colors = [
  [230,224,221], // lightblue
  [232,239,240], // lightpink
  //[183,213,232], // aqua
]
let colorDice;

// drastic sin curve
let xspacing = 3; // Distance between each horizontal location
let w; // Width of entire wave
let psi = 0.0; // Start angle at 0
let amplitude; // Height of wave
let period = 180.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave

// random 3 waves
let randomCenters = [];
let randomHeights = [];
let randomDistances = [];

function preload(){
  imgmain = loadImage("sidefacemirror.png");
}

function setup() {
  canvasWidth = imgmain.width / 4 * scal;
  canvasHeight = imgmain.height/4*scal;
  createCanvas(canvasWidth, canvasHeight);
  sinHight = canvasHeight/6;
  background(255);

  // drastic sine curve
  dx = (TWO_PI / period) * xspacing;
  w =  canvasWidth + xspacing;
  yvalues = new Array(floor(w / xspacing)); 
  amplitude = sinHight;
  // random 3 waves
  for(i = 0; i<3; i++){
    let centerDice = int(random(canvasHeight/2, canvasHeight)/scal)*scal;
    let randomHeight = int(random(sinHight/3, sinHight)/scal)*scal;
    let randomDistance = int(random(0, canvasWidth/3)/scal)*scal;
    randomCenters.push(centerDice);
    randomHeights.push(randomHeight);
    randomDistances.push(randomDistance);
  }

}

function draw() {

  // plot rectangles
  rectx = int(random(-15, canvasWidth)/scal)*scal;// x とy が頂点; 
  recty = int(random(canvasHeight/2, canvasHeight)/scal)*scal;

  rectr = int(random(2, 15))*2-1;// 奇数で出力
  tr = random(0, 70);
  colorDice = int(random(colors.length));
  for (i = 0; i < rectr; i++) {
      ii = i*2+1;
      j = (rectr - ii)/2;
      l = rectr - j*2;
      noStroke();
      //fill(255,255,255, tr);
      fill(colors[colorDice][0], colors[colorDice][1], colors[colorDice][2], tr);
      for (k = 0; k<l; k++) {
          rect(rectx+j*scal+k*scal, recty+i*scal, scal, scal);
          if(i!=rectr-1){
              rect(rectx+j*scal+k*scal, recty+2*rectr*scal-i*scal-scal*2, scal, scal);
          }
      }
  }

  // drastic sine curve
  noStroke();
  //colorDice = int(random(colors.length));
  fill(255);
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
    //fill(colors[colorDice][0], colors[colorDice][1], colors[colorDice][2], tr);
    rect(drasticx, drasticy+canvasHeight/2, scal, scal);

    rect(drasticx, drasticy+canvasHeight*2/3, scal, scal);
    
    //random 3 waves    
    for(i = 0; i<3; i++){
      rect(drasticx, randomHeights[i]*drasticy/sinHight+randomCenters[i], scal, scal);
    }
  }
  
  image(imgmain, 0, 0, canvasWidth, canvasHeight);
}


function calcWave() {
  psi += 0.01// 波の速さはここ

  // For every x value, calculate a y value with sine function
  let x = psi;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

