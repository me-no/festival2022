let scal = 2; 
let actualWidth = 96;
let actualHeight = 128;
let width = actualWidth*scal;
let height = actualHeight*scal;

// キャンバス表示位置の変更
let canvas = document.getElementById('canvas');

function preload() {
 imgbody = loadImage("body.png");
 imgeyered= loadImage("eyered.png");
 imgeyeblue = loadImage("eyeblue.png");
 imgeyeteal = loadImage("eyeteal.png");
 imgpaint1 = loadImage("paintdeep.png");
 imgpaint2 = loadImage("paintassyn.png");
 imgpaint3 = loadImage("paintwhite.png");
 imghat = loadImage("hat.png");
 imgtape = loadImage("tape.png");
 imgwing = loadImage("wing.png");

 imgcandy = loadImage("candy.png");
}

function setup () {
    let c = createCanvas(width, height);
    c.parent('canvas');  //canvasを指定した要素の子要素にする
}

function draw () {
    eyes = [imgeyered, imgeyeblue, imgeyeteal];
    paints = [imgpaint1, imgpaint2, imgpaint3, imgbody];
    components = [imghat, imgtape, imgwing];

    eyeDice = int(random(eyes.length));
    paintDice = int(random(paints.length));
    componentDice = int(random(components.length));

    image(imgbody, 0, -scal, width, height);
    image(paints[paintDice], 0, -scal, width, height);
    image(eyes[eyeDice], 0, -scal, width, height);
    image(components[componentDice], 0, -scal, width, height);
    image(imgcandy, 0, -scal, width, height);

    noLoop();
}

function keyPressed() {
    if (key == 's'){
      saveCanvas('avatar', 'png'); // ファイル名, ファイル形式(png or jpg)
      //gd.timestamp()
    }
  }