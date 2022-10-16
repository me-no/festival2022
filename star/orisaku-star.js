let  skyColors = [
    [41,39,79],
    [70,82,130],
    [96,117,160]
]

let starColors = [
    [255,219,3],
    [140,117,160],
    [255,255,255]
]

let scal = 6;
let actualSize = 128;
let width = actualSize*scal;
let height = actualSize*scal;

let img;

let noiseVar = 1;

function preload() {
    // Font
    font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    //img = loadImage("assets/hackle-top.png");
    //img = loadImage("assets/hackle-bottom2.png");
    img = loadImage("hackle-star-back.png");
    imgRare = loadImage("hackle-star-cancel.png");
    imgHint = loadImage("hackle-star-hint.png");
}

function setup () {
    createCanvas(width, height);
    noFill();
    background(0,33,54);
}

function draw() {
    // 等倍のサイズは128x128
    // 8倍で座標を決める
    // 円の半径を決める
    // ランダムな円を108 個生成
    for (k=0; k<108; k++) {
        //noiseVal = noise(noiseVar)*500-200;
        x = int(random(0, 128))*8;// このx とy で円の左上頂点が決まる→ここを規則的にする
        y = int(random(0, 128))*8;
        //x = 1024/108 *k;// キャンバスの幅をk等分
        //y = x+noiseVal;
        r = int(random(2, 15))*2-1;// 奇数で出力
        tr = random(50, 200);
        d = int(random(0,skyColors.length));
        colr = skyColors[d][0];
        colg = skyColors[d][1];
        colb = skyColors[d][2];
        for (i = 0; i < r; i++) {
            ii = i*2+1;
            j = (r - ii)/2;
            l = r - j*2;
            noStroke();
            fill(colr, colg, colb, tr);
            for (t = 0; t<l; t++) {
                //rect(x+t*scal, y+i*scal, scal,scal);// triangle1
                //rect(x+j*scal+t*scal, y+i*scal, scal,scal);// triangle2
                rect(x+j*scal+t*scal, y+i*scal, scal,scal);
                if(i!=r-1){
                    rect(x+j*scal+t*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
                }
            }
        }
        //noiseVar += 0.1;
    }

    // ランダムな星を生成_小
    for (k = 0; k < 8000; k++) {
        x = int(random(0, 128)*scal);
        y = int(random(0, 128)*scal);
        r = int(random(1,3));
        tr = random(50,100);
        d = int(random(0, starColors.length));
        colr = starColors[d][0];
        colg = starColors[d][1];
        colb = starColors[d][2];
        noStroke();
        fill(colr, colg, colb, tr);
        rect(x, y, r/4*scal, r/4*scal);

    }
    // ランダムな星を生成_星雲
    starColors.splice(0,1);
    x_separation = 10000;
    curvature = int(random(2,6));
    for (k = 0; k < x_separation; k++) {
        noiseVal = noise(noiseVar);
        xx = 1024/x_separation*k;
        if(curvature === 5) {// 星雲のカーブの曲率を決める
            yy = sqrt(xx)*10 +noiseVal*300;
        } else {
            yy = -(xx*xx/(curvature*1000) +noiseVal*300)+600;
        }
        r = int(random(1,3));
        tr = random(50,100);
        d = int(random(0, starColors.length));
        colr = starColors[d][0];
        colg = starColors[d][1];
        colb = starColors[d][2];
        noStroke();
        fill(colr, colg, colb, tr);
        rect(xx, yy, r/4*scal, r/4*scal);
        if(80<tr && tr <80.001 && r === 1){
            console.log(tr);
            console.log(r);
            tr_temp = tr;
            count = 0;
            for(count= 0; count < 16; count++){
                fill(colr, colg, colb, tr_temp);
                rect(xx+(count+1)*r/4*scal, yy+(count+1)*r/4*scal, r/4*scal, r/4*scal);
                tr_temp += 20;
            }
        }

        noiseVar += 0.4;
    }

    // ランダムな星を生成
    //starColors.splice(0,1);
    for (k = 0; k < 500; k++) {
        x = int(random(0, 128)*scal);
        y = int(random(0, 128)*scal);
        r = int(random(1,3));
        tr = random(100,200);
        d = int(random(0, starColors.length));
        colr = starColors[d][0];
        colg = starColors[d][1];
        colb = starColors[d][2];
        noStroke();
        fill(colr, colg, colb, tr);
        rect(x, y, r/2*scal, r/2*scal);
    }

    //読み込んだ画像の表示
    imgDice = int(random(8));
    if(imgDice === 1 ){
        if (curvature === 5){
            image(imgHint, 0, 0, width, height);
        } else {
            image(imgRare, 0, 0, width, height);
        }
    } else {
        image(img, 0, 0,width, height);//top
    }
    console.log(height);
    // sign
    textFont(font);
    fill(255,255,255,30);
    noStroke();
    textSize(12);
    //text("#ドット絵再考察", 10, height - 16*2, width);
    text("さよならさんすう", 10, height - 16, width);

    noLoop();
}