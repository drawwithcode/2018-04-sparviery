num = 18;
num += 1;
ballSize = 25;
function setup() {
  createCanvas(800,600);

   noFill();
  for(i=2;i<num*(4/3);i++){
    for(j=1;j<num;j++){
      addBall(
            600 / num * i - ballSize,
            600 / num * j,
            ballSize);
    }
  }
}

function draw() {
background(200);
doBalls();
textFont('Helvetica');
fill(0,0,255);
textSize(15);

text('TAP', 389, 289);
noFill();

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function doBalls(){
  for(i=0;i<balls.length;i++){
    balls[i].step();
  }
}

var balls = [];


function Ball( sX, sY, size) {
  noFill();
  stroke(40);
  this.x = sX;
  this.y = sY;
  this.size = size;
  this.sizeOg = size;
  this.distToMouse;
  this.timer = 0;
  this.newSize = size * 2;
  this.step = function(dir){

    if(this.timer > 0){
      this.timer --;
    }else if(this.timer == 0){
      this.size = this.newSize;
      this.timer = -1;
    }

    if(this.size > this.sizeOg) this.size -= 1;
    ellipse(this.x, this.y, this.size);
  }

  this.onPress = function(){
    this.distToMouse = sqrt((mouseX - this.x)*(mouseX - this.x) + (mouseY - this.y)*(mouseY - this.y));
    this.timer = floor(this.distToMouse * 0.1);
  }

  this.onDrag = function(){
    this.distToMouse = sqrt((mouseX - this.x)*(mouseX - this.x) + (mouseY - this.y)*(mouseY - this.y));
    this.size = floor(this.distToMouse * 0.2);
  }
}

function mousePressed() {
  for(i=0;i<balls.length;i++){
    balls[i].onPress();
  }
  return false;
}

function addBall(sX, sY, size){
  var ball = new Ball(sX, sY, size);
  balls.push(ball);
}
