
var PLAY = 1;
var END = 0;
var gameState = PLAY; 
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime,score
var ground,groundImage
var obstacleGroup;
var stop;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameImage = loadImage("jungle.jpg")
  monkeyStopImage = loadImage("sprite_0.png")
}


function setup() {
  createCanvas(600, 400);
  
  //creating sword
   monkey=createSprite(40,200,20,20);
   monkey.addAnimation("running",monkey_running);
   monkey.scale=0.1;
  
  ground = createSprite(50,230,600,10)
 
   ground.x = ground.width /2;
  
  stop =createSprite(40,200,20,20);
  
  survivalTime = 0;
  score = 0;
  FoodGroup = new Group();
  ObstaclesGroup = new Group();
  obstaclesGroup = createGroup();
  
}

function draw() {
  background(300);
  
text("Score: "+ score, 500,50);
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("survivalTime:" + survivalTime,100,50 );
  
  if(gameState === PLAY){

        ground.velocityX = -(4 + 3* score/100)
  
    ground.addImage("ground",gameImage);
     
    if (ground.x < 250){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
       
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
   spawnFood();
   spawnObstacles();
    
    if(FoodGroup.isTouching(monkey)){
        score = score + 1;  
      FoodGroup.setLifetimeEach(-1); 
    }
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
           }
    
  }  
  
   if (gameState === END) {
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     FoodGroup.destroyEach();
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
     
   }
  
   
  
 //stop trex from falling down
  monkey.collide(ground); 
    
  drawSprites();
  
  



function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var food = createSprite(600,120,40,10);
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -5      ;
    
     //assign lifetime to the variable
    food.lifetime = 200;
    FoodGroup.add(food);
  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
  var obstacle = createSprite(450,205,10,40);
  

   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5   
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

 




}