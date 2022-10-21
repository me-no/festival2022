let colorList = [
  ["white", "#ffffff", 9],
  ["blueline" , "#002136", 2],
  ["orangen" , "#fbbc25", 1],
  ["brown" , "#f43f3a", 2]
]

let scal = 32;
let width = 16*scal;
let height= 22*scal;

let squareList = [];

let img;
let font;

function preload() {
  // Font
  font = loadFont("../assets/misaki_gothic.ttf");

  // Images
  imghackle = loadImage("draculaHackle.png");

}

function setup () {
    c = createCanvas(width, height);
    c.parent('canvas');  //canvasを指定した要素の子要素にする
    noFill();
    background(0,0,30);

  frameRate(1);
}

function draw() {
  for (col of colorList) {
      for(i = 0; i < col[2]; i++) {
          squareList.push(col[1]);
      }
  }
  //読み込んだ画像の表示
  image(imghackle, 0, 0, 16*scal, 16*scal);
  
  for (k = 0; k < 14; k++){
    i = k-int(k/7)*7+3;
    j = int(k/7)+8;
    len = squareList.length;
    d = int(random(len));
    //d番目の色でドットを描く
    stroke(squareList[d]);
    fill(squareList[d]);
    rect(i*scal, j*scal, scal, scal);
    squareList.splice(d, 1);
  }

  //タイトルと日付を挿入
  let dt    = new Date();
  let year  = dt.getFullYear();
  let month = dt.getMonth()+1;
  let date  = dt.getDate();
  let hours   = dt.getHours();
  let minutes = dt.getMinutes();
  let seconds = dt.getSeconds();
  // Format
  textAlign(LEFT);
  var str = year + "/" + month + "/" + date + " " + mkSign(hours, minutes, seconds);
  fill(255, 255, 255);
  noStroke();
  textSize(24);
  textFont(font);
  text("クリエイターズ文化祭2022", 20, 280*2);
  fill(0);
  rect(20, 290*2, width, 24);//時刻表示をリセットするよう黒背景表示
  fill(255);
  text(str, 20, 300*2);
  textAlign(RIGHT);
  fill(100,100, 130);
  textSize(16);
  text("#さよならさんすう", 0, 325*2, width);
  //textSize(10);
  //text("@RyntaloL", 0, 340, width);

  //noLoop();
}

function mkSign(hours, minutes, seconds) {
    if(hours < 10)   hours   = "0" + hours;
	if(minutes < 10) minutes = "0" + minutes;
	if(seconds < 10) seconds = "0" + seconds;
	var str = hours + ":" + minutes + ":" + seconds;
	return str;
}