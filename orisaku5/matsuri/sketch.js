let scal = 3;
let cwidth, cheight, actualwidth, actualheight;

let noisex = 1, noisey = 2;

function preload () {
  imgkid = loadImage("kid1.png");
  imgkidlighten = loadImage("kid2.png");
  imgback = loadImage("back.png");
  imgmarks = loadImage("marks.png");
  imgtree = loadImage("tree.png");
  imglettero = loadImage("letter_orange.png");
  imgletterr = loadImage("letter_red.png");
  imgfly = loadImage("firefly.png");
}

function setup() {
  frameRate(10);
  actualwidth = imgback.width/4;
  actualheight = imgback.height/4;
  cwidth = actualwidth*scal;
  cheight = actualheight*scal;
  
  createCanvas(cwidth, cheight);
  background(0,33,54);
  //image(imgback, 0, 0, cwidth, cheight);

}

function draw() {
  // plot circle for background
  tr  = random(30);
  circlex = int(random(actualwidth))*scal;
  circley = int(random(actualheight))*scal;

  noStroke();
  
  if(mouseX > 52*scal && mouseX < 81*scal && mouseY > 76*scal && mouseY < 130*scal) {// 「停」のところで提灯が消えていく
    fill(0,33,54);
  }else {
    fill(255,219,3,tr);
    // plot letters for background
    letterox = int(random(actualwidth))*scal;
    letteroy = int(random(actualheight))*scal;
    image(imglettero, letterox, letteroy, imglettero.width/16*scal, imglettero.height/16*scal);

    letterrx = int(random(actualwidth))*scal;
    letterry = int(random(actualheight))*scal;
    image(imgletterr, letterrx, letterry, imgletterr.width/16*scal, imgletterr.height/16*scal);
    }
  circleradius = int(random(4, 12))*scal;
  makeCircle(circlex, circley, circleradius);
  
  
  // the back is floating
  back_x = noise(noisex/2)*20;
  back_y = noise(noisey/2)*20;
  image(imgback,back_x-3*scal, back_y-3*scal, cwidth, cheight);
  
  image(imgmarks, 0,0,cwidth,cheight);

  
  // plot firefly
  fill(255,255,255,10);
  mouseradius = int(random(16,30)/scal)*scal;
  makeCircleAvec(mouseX, mouseY, mouseradius);  
  
  
  // 蛍の光の前面に来る要素
  if(mouseX >90*scal && mouseX < 190*scal && mouseY > 59*scal && mouseY < 180*scal){
    image(imgkidlighten, 0, 0, cwidth, cheight);
  } else {
    image(imgkid, 0, 0, cwidth, cheight);
  }

  // tree is floating
  tree_x = noise(noisex)*20;
  tree_y = noise(noisey)*20;
  image(imgtree, tree_x-3*scal, tree_y-3*scal, cwidth,cheight);
  
  noisex +=0.05;
  noisey +=0.03;
    
  
  flywidth = imgfly.width/16*scal;
  flyheight = imgfly.height/16*scal;
  image(imgfly, mouseX-flywidth, mouseY-flyheight, flywidth,flyheight);

  
  // plot another fireflies
  image(imgfly, 10*scal+noise(noisey)*50,cheight-20*scal+noise(noisex)*50,flywidth,flyheight);
  image(imgfly, cwidth-30*scal+noise(noisey)*30, cheight-50*scal+noise(noisex)*30,flywidth,flyheight);
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

function makeCircleAvec (x0,y0,radius) {
  // plot circles
  // with larger scaling
  scal_ord = scal;
  scal = scal*3;
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
  scal = scal_ord;// reset scal
}
