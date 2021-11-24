var PLAY=1;
var END=0;
var gameState=1;

var ghost,candy ,monster,candyGroup,monsterGroup, score,r,randomcandy, position;
var ghostImage , candy1, candy2 ,candy3,candy4, monsterImage, gameOverImage;
var gameOverSound;

function preload(){
  backgroundImage = loadImage("forest.jpg")

  ghostImage = loadImage("ghost.png");
  monsterImage = loadAnimation("pacman1.png","pacman2.png")
  candy1 = loadImage("candy1.png");
  candy2 = loadImage("candy2.png");
  candy3 = loadImage("candy3.png");
  gameOverImage = loadImage("gameOver.png")
  
  gameOverSound = loadSound("gameover.wav")
}



function setup() {
  createCanvas(1280,720);
  
  scene = createSprite(0,0,1280,720);
  scene.addImage(backgroundImage);
  scene.scale = 2.2

   ghost=createSprite(40,200,20,20);
   ghost.addImage(ghostImage);
   ghost.scale=0.3
  ghost.setCollider("rectangle",0,0,40,40);
  score=0;
  candyGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("0");
  scene.velocityX = -3

  if (scene.x < 0){
     scene.x = scene.width/2;
  }
  
  if(gameState===PLAY){
    
    candys();
    Monster();
    
    ghost.y=World.mouseY;
    ghost.x=World.mouseX;
  
    if(candyGroup.isTouching(ghost)){
      candyGroup.destroyEach();
    
      score=score+5;

    }
    else
    {

      if(monsterGroup.isTouching(ghost)){
        gameState=END;
        gameOverSound.play()
        
        
        candyGroup.destroyEach();
        monsterGroup.destroyEach();
        candyGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        ghost.addImage(gameOverImage);
        ghost.scale=0.2;
        ghost.x=640;
        ghost.y=360;
      }
    }
  }
  
  drawSprites();
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.x = 1280
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
    monster.scale=0.2
    monster.velocityX=-(15+(score/5));
    monster.setLifetime=100;
    
    monsterGroup.add(monster);
  }
}

function candys(){
  if(World.frameCount%80===0){
    candy=createSprite(400,200,20,20);
    candy.x = 1280    

      candy.velocityX=-(15+(score/5));

     
    candy.scale=0.2;
     r=Math.round(random(1,3));
    if (r == 1) {
      candy.addImage(candy1);
    } else if (r == 2) {
      candy.addImage(candy2);
    } else  {
      candy.addImage(candy3);
    } 
    
    candy.y=Math.round(random(50,550));
   
    
    candy.setLifetime=100;
    
    candyGroup.add(candy);
  }
}