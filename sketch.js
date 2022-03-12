const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,background;

var canvas, angle, tower, ground, cannon;
var score = 0;
//VAR BALLS
var balls = [];

//var boats
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
 
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  //ANGLE
  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  //crear objeto cannon
  cannon= new Cannon (180, 110, 130, 100, angle);
  //cannonBall = new CannonBall(cannon.x, cannon.y);
 
  //boat = new Boat(width-79,height-60, 170, 170, -80);



}

function draw() {
  image(backgroundImg, 0, 0, width, height);
  //background(189);
 
  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  //rect(tower.position.x, tower.position.y, 160,310);

  push();
  imageMode(CENTER);
  //rect(tower.position.x, tower.position.y, 160,310);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  //for
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i],i);
    
  }

  //display de cannon para verlo en pantalla
  cannon.display();
  //cannonBall.display();

    //Matter.Body.setVelocity(boat.body,{x:-0.9, y:0})
  //boat.display();

  //showBoats();
  showBoats();



}

function showCannonBalls(ball) {
  //condicion
  if (ball) {
    ball.display();

    //if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      
    //}
    
  }


}

function showBoats() {
  if (boats.length > 0) {
    if (boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300) {

    //POSITION
    var positions = [-40, -60, -70, -20];
    var position = random(positions);
    var boat = new Boat(width, height - 100, 170, 170, position);

      //PUSH
      boats.push(boat);

    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
         
       //X,Y
       x: -0.9,
       y: 0
        });

        boats[i].display();
        
        
     } 
    }
  } 
  else {

  //BOAT
  var boat = new Boat(width, height - 60, 170, 170, -60);
  boats.push(boat);

  }
}





function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    // cannonBall.shoot();
    balls[balls.length - 1].shoot();
    
  }
}


//function collisionWithBoat(index) {
  
//}





function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}



