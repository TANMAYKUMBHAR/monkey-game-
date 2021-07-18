var PLAY = 1;
var END = 0 ;
var gamestate = PLAY ;
var monkey , monkeyI , monkeyS ;
var banana , bananaI , obstacle , obstacleI ;
var FoodGroup , obstacleGroup ;
var ground , Iground; 
var score;

function preload(){
monkeyI=     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
bananaI = loadImage("banana.png");
obstacleI = loadImage("obstacle.png");
monkeyS=loadImage("sprite_3.png"); 
}

function setup() {
createCanvas(500,500); 
monkey=createSprite(100,350);
monkey.addAnimation("monkey",monkeyI);
monkey.scale=0.19; 
ground=createSprite(250,410,500,10);  
obstacleGroup = createGroup();
FoodGroup = createGroup();   
score =0 ; 
}


function draw() {
background(230);
  if (ground.x < 300){
    ground.x = ground.width/2;
} 
  if (gamestate===PLAY){
textSize(30);
fill("black");
textWidth(50);  
text("SURVIVAL TIME : "+ score, 120,50); 
ground.velocityX = -6;

score = score + Math.round(getFrameRate()/59);
if(keyDown("Space")&&monkey.y>=300){
   monkey.velocityY= -15;
}  
monkey.velocityY = monkey.velocityY + 0.8 ; 
monkey .collide(ground);
    banana();  
stone(); 
  
  } 
if(monkey.isTouching(FoodGroup)){
   FoodGroup.destroyEach();
} 
if(obstacleGroup.isTouching(monkey)){
   gamestate=END;
   monkey.addImage(monkeyS); 
   FoodGroup.visible=false;
   obstacleGroup.visible=false;
}
if(gamestate===END){
     FoodGroup.destroyEach();
     obstacleGroup.destroyEach();
     score=0;
     FoodGroup.setVelocityXEach(0)
     FoodGroup.setVelocityYEach(0)
     obstacleGroup.setVelocityYEach(0)
     obstacleGroup.setVelocityXEach(0)
     monkey.velocityY=0;
     monkey.collide(ground);
     FoodGroup.setLifetime=0;
     obstacleGroup.setLifetime=0;
     obstacleGroup.scale=0.001;
    
}
 
drawSprites(); 
}


function banana () {
if(frameCount%80===0){
    b=createSprite(500,250,20,20);
    b.y=Math.round(random(100,200));
    b.addImage(bananaI);
    b.scale=0.29;
    b.velocityX=-15 ;
    b.setLifetime=200;
    FoodGroup.add(b); 
}}
function stone () {
  if(frameCount%100===0){
    o=createSprite(500,375,20,20);
    o.addImage(obstacleI);
    o.scale=0.2 ;
    o.velocityX=-12;
    obstacleGroup.add(o);
}}
 





