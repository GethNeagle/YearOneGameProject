/*

The Game Project 8 - Make it Awesome!

*/
//Decalring my variables
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var jumpHeight;
var gravity;
var direction;
var jumpCounter;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var pyramids;
var trees_x;
var t_canyon;
var enemies;
var charStartPos;
var isFound;
var distance;
var newBox;


var slider;
var sounds;
var shine;
var difficultySlider;


function preload() 
{
     
  sounds = new SoundManager(); //sound manager to load sounds
  
    
  
}




function setup()
{
   
    slider = createSlider(0,1,0.5,0.01); //sliders for volume. 
    slider.position(10,550);
    
    difficultySlider = createSlider(1,4,1,1); //slider to change game difficulty
    difficultySlider.position(880,550);
   
    
    sounds.BGM.loop(); //background music
    sounds.BGM2.loop();
    
       
    
    sounds.Flap.loop();
    
    
	createCanvas(1024, 576);
    
    floorPos_y = height * 3/4; //creates the floor
    startGame();
	
    
    
     
}

function startGame()
{
    
	gameChar_x = 100; //starting 
	gameChar_y = floorPos_y;
    
    

	// Variable to control the background scrolling.
	scrollPos = 0;
    scrollPos2 = 0;
    scrollPos3 = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
    jumpHeight = 8;
    gravitySpeed = 5; 
    gravity = 2 ;
    direction = 2; 
    jumpCounter = 0;
    minHeight = 430 ;
    maxHeight = 100;
   // isFound = false;
    lives = 3; //starting lives - when zero, game over.
    gameScore = 0; //starting game score
   
    //chimeValue = 0;
    sideways2 = 0; //varible to limit how far up and down the enemies can move.
    control2 = true;
    fairyDistance = 0;
    
    
    

	// Initialise arrays of scenery objects.
    
    
   
    
    
    canyons_x = [{ x_pos: 200,width: 100},
	             { x_pos: 400,width: 100},
                 { x_pos: 1000,width: 100},
	             { x_pos: 2000,width: 100},
                 { x_pos: 3000,width: 100},
	             { x_pos: 4000,width: 100},
                 { x_pos: -200,width: 100},
	             { x_pos: -700,width: 100},
	             { x_pos: -4010,width: 100},
	             { x_pos: -4075,width: 100},
	             { x_pos: -4095,width: 100},
                 { x_pos: -1000,width: 100},
	             { x_pos: -2000,width: 100},
                 { x_pos: -3000,width: 100},
                 { x_pos: 3475,width: 100},
                 { x_pos: 2410,width: 100},
                 { x_pos: 1695,width: 100},
                 { x_pos: 5995,width: 100},
                 { x_pos: 6055,width: 100},
                 { x_pos: 6140,width: 100},
	             { x_pos: -4000,width: 100}]
       
    trees = [{treePos_x: 60, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -135, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -380, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -500, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -615, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -860, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -945, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -1205, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -1350, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -1470, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -1750, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -1915, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -2145, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -2300, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -2490, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -2635, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -2820, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -2920, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -3180, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -3270, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -3380, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -3530, treePos_y: -57, Col: random(80,200)},
             {treePos_x: -3735, treePos_y: -57, Col: random(80,200)},
             {treePos_x: 690, treePos_y: -57, Col: random(80,200)},
             {treePos_x: 560, treePos_y: -57, Col: random(80,200)},
             {treePos_x: 1305, treePos_y: -57, Col: random(80,200)},
             {treePos_x: 1490, treePos_y: -57, Col: random(80,200)},
             {treePos_x: 1875, treePos_y: -57, Col: random(80,200)},
             {treePos_x: 2035, treePos_y: -57, Col: random(80,200)},
            ]
     
    
    
    deadTrees = [{treePos_x: 2130, treePos_y: -57},
                 {treePos_x: 2495, treePos_y: -57},
                 {treePos_x: 2895, treePos_y: -57},
                 {treePos_x: 3165, treePos_y: -57},
                 {treePos_x: 3165, treePos_y: -57},
                 {treePos_x: 3675, treePos_y: -57},
                 {treePos_x: 3900, treePos_y: -57},
                 {treePos_x: 4190, treePos_y: -57},
                 {treePos_x: 4605, treePos_y: -57},
                 {treePos_x: 5000, treePos_y: -57},
                
                
                ]
    
    bushes = [{treePos_x: 0, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -200, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -500, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -895, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -1225, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -1615, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -1885, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -2195, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -2435, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -2725, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -3180, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -3430, treePos_y: 220, Col: random(100,170)},
             {treePos_x: -3790, treePos_y: 220, Col: random(100,170)}
             
             
             ]
    
    cloud = [{cloud_x: 50,    cloud_y: 30},
             {cloud_x: 350,  cloud_y: 40},
             {cloud_x: 850,  cloud_y: 50},
             {cloud_x: 1250, cloud_y: 30},
             {cloud_x: 1750, cloud_y: 70},
             {cloud_x: 2250, cloud_y: 40},
             {cloud_x: 2850, cloud_y: 20},
             {cloud_x: 50,    cloud_y: 30},
             {cloud_x: -350,  cloud_y: 40},
             {cloud_x: -850,  cloud_y: 50},
             {cloud_x: -1250, cloud_y: 20},
             {cloud_x: -1750, cloud_y: 50},
             {cloud_x: -2250, cloud_y: 40},
             {cloud_x: -2850, cloud_y: 20}]
        
        
    
    mountain = [{mountain_x: -200,mountain_y: 0},
                {mountain_x: 300,mountain_y: 0},
                {mountain_x: 400,mountain_y: 0},
                {mountain_x: 600,mountain_y: 0},
                {mountain_x: 900,mountain_y: 0},
                {mountain_x: 1800,mountain_y: 0, colour1: (123,104,238), colour2: (255,215,0)},
                {mountain_x: -4000,mountain_y: 0},
                {mountain_x: -3200,mountain_y: 0},
                {mountain_x: -2400,mountain_y: 0},
                {mountain_x: -1600,mountain_y: 0},
                {mountain_x: -500,mountain_y: 0},
                {mountain_x: 2500,mountain_y: 0}]
                
   pyramids = [{mountain_x: 1800,mountain_y: 0},
               {mountain_x: 2200,mountain_y: 0},
               {mountain_x: 2500,mountain_y: 0},
               {mountain_x: 2800,mountain_y: 0}] 
    
    
    collectable = [{gem_x:  -3050,    gem_y : 300, isFound: false},
                   {gem_x:  -2050,  gem_y : 300, isFound: false},
                   {gem_x:  -1050, gem_y : 300, isFound: false},
                   {gem_x:  0,  gem_y : 300, isFound: false},
                   {gem_x:  950, gem_y : 300, isFound: false},
                   {gem_x:  1450, gem_y : 300, isFound: false},
                   {gem_x:  1950, gem_y : 300, isFound: false},
                   {gem_x:  2950,    gem_y : 300, isFound: false},
                   {gem_x:  -1450,  gem_y : 300, isFound: false},
                   {gem_x:  -750, gem_y : 300, isFound: false},
                   {gem_x:  350,  gem_y : 300, isFound: false},
                   {gem_x:  2300, gem_y : 300, isFound: false},
                   {gem_x:  -2600, gem_y : 300, isFound: false},
                   {gem_x:  -550, gem_y : 300, isFound: false}]
    
    
    
    flagPole = [{flagPole_x:5000, flagPole_y: 200, isFound: false}]
    
    flag = [{flag_x:5000, flag_y: 200}]
    
    enemies = [{enemy_x: -500, enemy_y: 400 },
               {enemy_x: -795, enemy_y: 400 },
               {enemy_x: -1335, enemy_y: 400 },
               {enemy_x: -2285, enemy_y: 400 },
               {enemy_x: -3200, enemy_y: 400 },
               {enemy_x: -3710, enemy_y: 400 },
               {enemy_x: 700, enemy_y: 400 },
               {enemy_x: 1100, enemy_y: 400 },
               {enemy_x: 1600, enemy_y: 400 },
               {enemy_x: 2635, enemy_y: 400 },
               {enemy_x: 3325, enemy_y: 400 },
               {enemy_x: 4490, enemy_y: 400 },
               {enemy_x: 2000, enemy_y: 400 }]
}

function draw()
{
    
  
    
    sounds.BGM.setVolume(slider.value()) //loads all the sounds to play.
    sounds.BGM2.setVolume(slider.value())
    sounds.Chime.setVolume(slider.value())
    sounds.Chime2.setVolume(slider.value())
    sounds.Chime3.setVolume(slider.value())
    sounds.Jump1.setVolume(slider.value())
    sounds.Jump3.setVolume(slider.value())
    sounds.Flap.setVolume(slider.value())
    sounds.death.setVolume(slider.value())
    
    
    
    if (gameChar_world_x < 2000) //to chamge the BGM at a certain point.
        {
            sounds.BGM2.setVolume(0);
        }else{
            sounds.BGM2.setVolume(slider.value());
        }
    if (gameChar_world_x > 2000)
        {
            sounds.BGM.setVolume(0);
        }
    
	background(100, 155, 255); // fill the sky blue
    
    
    
    if (gameChar_world_x < 2000)// paces sun behind scenery.
    {
      sun();
    }
    
    
    
    
    //Draw mountain objects.
    push();
    translate(scrollPos,0); //scrolls the screen.
    if (gameChar_world_x < 2000)
        {
    for (var i = 0; i < mountain.length; i++)
        {
            push();
            translate(scrollPos2,0);
            drawMountain(mountain[i]);
            //mountain.mountain_x = mountain[i];
            pop();
        }
        }
    if (gameChar_world_x > 1700)
        {
            for (var j = 0; j < pyramids.length; j++)
                {
                    
                
            push();
            translate(scrollPos2,0);
            drawPyramids(pyramids[j]);
            //mountain.mountain_x = mountain[i];
            pop();
                }
            
        }
    pop();
    
    push();
    translate(scrollPos, 0);
    //Draw Bushes
    
    for (var i = 0; i < bushes.length; i++)
        {
            drawBushes(bushes[i]);
        }
    pop();
    
    
	noStroke();
	fill(0,155,0);
    
    if (gameChar_world_x < 2100)
        {
            
        
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
        }
    else{ //draws the desert ground
        push();
        fill(240,230,140)
        rect(0, floorPos_y, width, height/4);
        pop();
    }


        
        
    
    
    
	// Draw clouds.
    
    push();
    
    
    translate(scrollPos, 0);
    
	// Draw clouds.
    
    if (gameChar_world_x < 2000){
    for (var i = 0; i < cloud.length; i++)
        {
            push(); 
            let step = frameCount/2 % 3000; // allows clouds to move
            applyMatrix(1, 0, 0, 1, 40 + step, 1);
            drawCloud(cloud[i]);
            pop();
        }
    }
   


    
    

	// Draw trees.
    if (gameChar_world_x < 2000)
        {
    for (var i = 0; i < trees.length; i++)
        {
            drawTree(trees[i]);
           
        }
        }
    if (gameChar_world_x > 1700)
        {
            for (var j = 0; j < deadTrees.length; j++)
                {
                    
                
            push();
           
            drawDeadTree(deadTrees[j]);
            pop();
                }
        }
    
    
    
    
    //draw flagpole & check if it's been found  
    for (var i = 0; i < flagPole.length; i++)
        {
            if(flagPole[i].isFound == false)
                {
                    drawFlagPole(flagPole[i]);
                    checkFlag(flagPole[i]);
                    drawFlag(flag[i]);
                    
                }
            if(flagPole[i].isFound == true)
                {
                    flagPole.isFound = true;
                    drawFlagPole(flagPole[i]);
                    drawFlag(flag[i]);
                    
                    
                }
            
            }
  
    
     //draw Enemies && initiate enemy detection
    
    for (var i = 0; i < enemies.length; i++)
        {
            drawEnemies(enemies[i]);
            moveEnemies2(enemies[i]);
            enemyDetection(enemies[i]);
            
           
        }

 
    
     
    // Draw Collectables & initiate detection
    for (var i = 0; i < collectable.length; i++ )
        {
            if (collectable[i].isFound == false)
            {
                drawCollectable(collectable[i]);
                checkCollectable(collectable[i]);
            }
            else {
                collectable[i].isFound = true;
                
            }
                
                    
        
            
        }
   //draw canyons & initiate checking
    for (var i = 0; i < canyons_x.length; i++)
        {
            drawCanyon(canyons_x[i]);
            checkCanyon(canyons_x[i]);
        }
    
    //sign posts to point to different parts of the level
    fill(240,230,140)
    rect(135,393,40,20)
    rect(135,412,5,20)
    triangle(174,393,186,402,174,413)
    fill(0,0,0)
    push();
    textSize(10)
    text('Desert', 142,405)
    pop();
    
    fill(240,230,140)
    rect(65,393,-40,20)
    rect(65,412,-5,20)
    triangle(25,393,12,402,25,413)
    push();
    fill(0,0,0)
    textSize(10)
    text('Forest', 25,405)
    pop();
    
	

	
    
    
    pop();
    
    if (gameChar_world_x> 2000) //places the sun at front to stop clipping with certain objects. 
        {
            sun();
        }
    
    //GUI
    textSize(40);
    fill(255,215,0)
    text('Score: ' + gameScore , 20 , 50)
    
    textSize(40);
    text('Lives: ' + lives , width-200 , 50)
   
    textSize(15);
    text('Volume: ' + slider.value() , 35 , 550)
    
    textSize(15);
    text('Difficulty: ' + difficultySlider.value() , 910 , 550)
    //Level complete message
    if (flagPole.isFound == true)
    {
        fill(72,61,139)
        textSize(100);
        text('Level Complete !' , width/2 - 400, height/2)
        return
    }
    //Game over message
    if (lives < 1)
    {
        fill(255, 0  , 0 )
        textSize(100);
        text('Game Over' , width/2 -325 , height/2);
        textSize(50);
        text('Press Space Bar', width/4, height/4);
        text('To restart', width/3, height/8);
        if (keyCode == 32) //key SpaceBar
        {
            startGame();
        }
       
        return
    }
    if (gameScore < 999 && flagPoleDistance < 50) //if player doesn't have enough points, they can't complete the level. 
        {
            fill(255,255,0);
            textSize(100);
            text('Collect more Gems !' , width/2 - 400, height/2)
        }  
    
    
    
	
	drawGameChar();

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width-500)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
            scrollPos2 += 0.2;
            scrollPos3 += 0.5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width-500)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
            scrollPos2 -= -0.5;
            scrollPos3 -= 0.5;
		}
	}

	// Logic to make the game character rise and fall.
    if(gameChar_y >= minHeight && isFalling == false)
            {
                gameChar_y = floorPos_y;
                jumpCounter = 0;
            }
        else
            {
                gameChar_y = gameChar_y + (gravity*gravitySpeed);
            }
    
        if(isFalling == true){
            if(gameChar_y <= maxHeight || jumpCounter >= jumpHeight){
                if(gameChar_y >= minHeight){ //stops gamechar from falling through floor is space is pressed
                    gameChar_y = minHeight;
                    isFalling = false;
                }
                gravitySpeed = direction;
            }
            else{
                gravitySpeed = -jumpHeight;
                jumpCounter = jumpCounter +1;
            }
        }
        else{
            gravitySpeed = direction;
        }
   
    
    
    if(isPlummeting == true && gameChar_y > 800) //resets the game character when fallen down a canyon.
        {
            isPlummeting = false;
            facingForward = true;
            gameChar_x = 100;
            scrollPos = 0;
            gameChar_world_x = 0;
            gameChar_y = floorPos_y;
            isFalling = false;
            minHeight = floorPos_y;
            lives--;
            gameScore = gameScore/2;
            
        }
    
    


	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	console.log("press" + keyCode);
	console.log("press" + key);
    

	// if statements to control the animation of the character when
	// keys are pressed.
	 
    if(keyCode == 65) //key A
        {
            isLeft = true;
      
        } 
    if (keyCode == 68) // key D
        {
            isRight = true;
        }
    if (keyCode == 32) //key SpaceBar
        {
            isFalling = true;
            jumpSound();
        }

}

function keyReleased()
{

	console.log("release" + keyCode);
	console.log("release" + key);
    if(keyCode == 65)
        {
            isLeft = false;
        }
    if(keyCode == 68)
        {
            isRight = false;
        }
    if (keyCode == 32)
        {
            isFalling = false;
        }

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    
    //the game character
	if(isLeft && isFalling)
	{
		push();
        fill(255,228,196);
        ellipse(gameChar_x -2 ,gameChar_y -17,15,25);
        pop();
    
      
    //head
        push();
        fill(255,222,173);
        ellipse(gameChar_x -2 ,gameChar_y -28,15,20);
        pop();
    
    
    
    //hair behind ear
        push();
        fill(205,133,63)
        triangle(gameChar_x +6 ,gameChar_y -35 ,gameChar_x -4 ,gameChar_y -37 ,gameChar_x +1 ,gameChar_y -47)
        triangle(gameChar_x +5 ,gameChar_y -34 ,gameChar_x -1 ,gameChar_y -36 ,gameChar_x +10 ,gameChar_y -42)
        pop();
    
        push();
        fill(139,69,19);
        triangle(gameChar_x -3 ,gameChar_y -37 ,gameChar_x +7 ,gameChar_y -51 ,gameChar_x +6 ,gameChar_y -34)
    
    //left ear
        push();
        fill(255,222,173);
        ellipse(gameChar_x ,gameChar_y -38,9,9);
        pop();




        //left inner ear
        push();
        fill(222,184,135);
        ellipse(gameChar_x ,gameChar_y -38,6,6);
        pop();


    
    //behind left eye
        push();
        fill(255,228,196);
        ellipse(gameChar_x -5 ,gameChar_y -30,10,10)
        pop();


        //left eye
        push();
        stroke(0);
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x -5 ,gameChar_y -30, 5, 5)
        pop();
        //left pupil
        push();
        fill(0)
        ellipse(gameChar_x -6 ,gameChar_y -30,2,2)
        pop();


        //outernose
        push();
        stroke(0)
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x -7 ,gameChar_y -23,12,8)
        pop();

        //innernose
        push();
        ellipse(gameChar_x -13 ,gameChar_y -24,5,3)
        pop();

        push();
        stroke(0);
        strokeWeight(0.2);
        fill(200,200,200)
        pop();


        //lower body
        push();
        fill(255,222,173);
        ellipse(gameChar_x -2 ,gameChar_y -8,10,11)
        pop();


        //left leg
        push();
        fill(255,222,173);
        quad(gameChar_x -10 ,gameChar_y ,gameChar_x -5 ,gameChar_y -5 ,gameChar_x -3 ,gameChar_y -5 ,gameChar_x -8 ,gameChar_y);
        pop();


        //right leg
        push();
        fill(255,222,173);
        quad(gameChar_x -2 ,gameChar_y -5 ,gameChar_x ,gameChar_y -5 ,gameChar_x +5 ,gameChar_y,gameChar_x +2 ,gameChar_y);
        pop();



        //left arm
        push();
        fill(255,222,173);
        quad(gameChar_x -19 ,gameChar_y -25 ,gameChar_x -9 ,gameChar_y -18 ,gameChar_x -9 ,gameChar_y -16 ,gameChar_x -18 ,gameChar_y -21)
        pop();

        //right arm
        push();
        fill(255,222,173);
        quad(gameChar_x -1 ,gameChar_y -16 ,gameChar_x -1 ,gameChar_y -18 ,gameChar_x +4 ,gameChar_y -11 ,gameChar_x +3 ,gameChar_y -9)
        pop();



        //end layer of hair left
        push();
        fill(139,69,19);
        triangle(gameChar_x +5 ,gameChar_y -7 ,gameChar_x +7 ,gameChar_y -18 ,gameChar_x +22 ,gameChar_y -7)
        triangle(gameChar_x  ,gameChar_y -4 ,gameChar_x +4 ,gameChar_y -11 ,gameChar_x +16 ,gameChar_y +1)
        triangle(gameChar_x +6 ,gameChar_y -16 ,gameChar_x +4 ,gameChar_y -27 ,gameChar_x +23 ,gameChar_y -18)
        triangle(gameChar_x +7 ,gameChar_y -25 ,gameChar_x +5 ,gameChar_y -37 ,gameChar_x +23 ,gameChar_y -30)
        triangle(gameChar_x +8 ,gameChar_y -20 ,gameChar_x +5 ,gameChar_y -34 ,gameChar_x +24 ,gameChar_y -25)



        //middle layer hair left
        push();
        fill(184,134,11);
        triangle(gameChar_x +5 ,gameChar_y -9 ,gameChar_x +5 ,gameChar_y -15 ,gameChar_x +17 ,gameChar_y -7)
        triangle(gameChar_x +4 ,gameChar_y -12 ,gameChar_x +6 ,gameChar_y -21 ,gameChar_x +19 ,gameChar_y -16)
        triangle(gameChar_x +6 ,gameChar_y -20 ,gameChar_x +5 ,gameChar_y -27 ,gameChar_x +20 ,gameChar_y -28)
        triangle(gameChar_x +5 ,gameChar_y -31 ,gameChar_x +3 ,gameChar_y -36 ,gameChar_x +17 ,gameChar_y -40)
        triangle(gameChar_x +1 ,gameChar_y -5 ,gameChar_x +3 ,gameChar_y -8 ,gameChar_x +14 ,gameChar_y -1)
        pop();
    
    
    
    //hair walking left
        push();
        fill(205,133,63);
        triangle(gameChar_x +1 ,gameChar_y -6 ,gameChar_x +4 ,gameChar_y -13 ,gameChar_x +12 ,gameChar_y -4);
        triangle(gameChar_x +3 ,gameChar_y -11 ,gameChar_x +5 ,gameChar_y -16 ,gameChar_x +15 ,gameChar_y -9);
        triangle(gameChar_x +4 ,gameChar_y -14 ,gameChar_x +4 ,gameChar_y -23 ,gameChar_x +17 ,gameChar_y -20);
        triangle(gameChar_x +4 ,gameChar_y -23 ,gameChar_x +3 ,gameChar_y -35 ,gameChar_x +18 ,gameChar_y -32);
        triangle(gameChar_x +4 ,gameChar_y -21 ,gameChar_x +4 ,gameChar_y -31 ,gameChar_x +12 ,gameChar_y -25);
        triangle(gameChar_x +3 ,gameChar_y -36 ,gameChar_x +1 ,gameChar_y -33 ,gameChar_x +4 ,gameChar_y -29);
        triangle(gameChar_x +4 ,gameChar_y -30 ,gameChar_x +2 ,gameChar_y -25 ,gameChar_x +5 ,gameChar_y -21);
        triangle(gameChar_x +4 ,gameChar_y -23 ,gameChar_x +1 ,gameChar_y -18 ,gameChar_x +5 ,gameChar_y -13);
        triangle(gameChar_x +5 ,gameChar_y -14 ,gameChar_x -1 ,gameChar_y -11 ,gameChar_x +1 ,gameChar_y -6);
        pop();

	}
	else if(isRight && isFalling)
	{
		 //body
        push();
        fill(255,228,196);
        ellipse(gameChar_x +3 ,gameChar_y -17,15,25);
        pop(); 

        //head
        push();
        fill(255,222,173);
        ellipse(gameChar_x +3 ,gameChar_y -28,15,20);
        pop();


        //hair behind ear
        push();
        fill(205,133,63)
        triangle(gameChar_x -6 ,gameChar_y -35 ,gameChar_x +4 ,gameChar_y -37 ,gameChar_x -1 ,gameChar_y -47)
        triangle(gameChar_x -5 ,gameChar_y -34 ,gameChar_x +1 ,gameChar_y -36 ,gameChar_x -10 ,gameChar_y -42)
        pop();

        push();
        fill(139,69,19);
        triangle(gameChar_x +3 ,gameChar_y -37 ,gameChar_x -7 ,gameChar_y -51 ,gameChar_x -6 ,gameChar_y -34)

        //left ear
        push();
        fill(255,222,173);
        ellipse(gameChar_x,gameChar_y -38,9,9);
        pop();




        //left inner ear
        push();
        fill(222,184,135);
        ellipse(gameChar_x,gameChar_y -38,6,6);
        pop();

        //behind left eye
        push();
        fill(255,228,196);
        ellipse(gameChar_x +5 ,gameChar_y -30,10,10)
        pop();


        //left eye
        push();
        stroke(0);
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x +5 ,gameChar_y -30, 5, 5)
        pop();
        //left pupil
        push();
        fill(0)
        ellipse(gameChar_x +6 ,gameChar_y -30,2,2)
        pop();


        //outernose
        push();
        stroke(0)
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x +7 ,gameChar_y -23,12,8)
        pop();

        //innernose
        push();
        ellipse(gameChar_x +13 ,gameChar_y -24,5,3)
        pop();

        push();
        stroke(0);
        strokeWeight(0.2);
        fill(200,200,200)
        pop();


        //lower body
        push();
        fill(255,222,173);
        ellipse(gameChar_x +2 ,gameChar_y -8,10,11)
        pop();


        //left leg
        push();
        fill(255,222,173);
        quad(gameChar_x +10 ,gameChar_y,gameChar_x +6 ,gameChar_y -5 ,gameChar_x +3 ,gameChar_y -5 ,gameChar_x +8 ,gameChar_y);
        pop();


        //right leg
        push();
        fill(255,222,173);
        quad(gameChar_x +2 ,gameChar_y -5 ,gameChar_x -7,gameChar_y ,gameChar_x -5 ,gameChar_y,gameChar_x-4 ,gameChar_y);
        pop();



        //left arm
        push();
        fill(255,222,173);
        quad(gameChar_x +10 ,gameChar_y -18 ,gameChar_x +17 ,gameChar_y -23 ,gameChar_x +17 ,gameChar_y -20 ,gameChar_x +10 ,gameChar_y -16)
        pop();

        //right arm
        push();
        fill(255,222,173);
        quad(gameChar_x -1 ,gameChar_y -16 ,gameChar_x -1 ,gameChar_y -18 ,gameChar_x +4 ,gameChar_y -11 ,gameChar_x +3 ,gameChar_y -9)
        pop();




        //end layer of hair left
        push();
        fill(139,69,19);
        triangle(gameChar_x -5 ,gameChar_y -7 ,gameChar_x -7 ,gameChar_y -18 ,gameChar_x -22 ,gameChar_y -7)
        triangle(gameChar_x,gameChar_y -4 ,gameChar_x -4 ,gameChar_y -11 ,gameChar_x -16 ,gameChar_y -1)
        triangle(gameChar_x -6 ,gameChar_y -16 ,gameChar_x -4 ,gameChar_y -27 ,gameChar_x -23 ,gameChar_y -22)
        triangle(gameChar_x -7 ,gameChar_y -25 ,gameChar_x -5 ,gameChar_y -37 ,gameChar_x -23 ,gameChar_y -36)
        triangle(gameChar_x -8 ,gameChar_y -20 ,gameChar_x -5 ,gameChar_y -34 ,gameChar_x -24 ,gameChar_y -29)



        //middle layer hair left
        push();
        fill(184,134,11);
        triangle(gameChar_x -5 ,gameChar_y -9 ,gameChar_x -5 ,gameChar_y -15 ,gameChar_x -17 ,gameChar_y -7)
        triangle(gameChar_x -4 ,gameChar_y -12 ,gameChar_x -6 ,gameChar_y -21 ,gameChar_x -19 ,gameChar_y -16)
        triangle(gameChar_x -6 ,gameChar_y -20 ,gameChar_x -5 ,gameChar_y -27 ,gameChar_x -20 ,gameChar_y -28)
        triangle(gameChar_x -5 ,gameChar_y -31 ,gameChar_x -3 ,gameChar_y -36 ,gameChar_x -17 ,gameChar_y -40)
        triangle(gameChar_x -1 ,gameChar_y -5 ,gameChar_x -3 ,gameChar_y -8 ,gameChar_x -14 ,gameChar_y -1)
        pop();



        //hair walking left
        push();
        fill(205,133,63);
        triangle(gameChar_x -1 ,gameChar_y -6 ,gameChar_x -4 ,gameChar_y -13 ,gameChar_x -12 ,gameChar_y -4);
        triangle(gameChar_x -3 ,gameChar_y -11 ,gameChar_x -5 ,gameChar_y -16 ,gameChar_x -15 ,gameChar_y -9);
        triangle(gameChar_x -4 ,gameChar_y -14 ,gameChar_x -4 ,gameChar_y -23 ,gameChar_x -17 ,gameChar_y -20);
        triangle(gameChar_x -4 ,gameChar_y -23 ,gameChar_x -3 ,gameChar_y -35 ,gameChar_x -18 ,gameChar_y -32);
        triangle(gameChar_x -4 ,gameChar_y -21 ,gameChar_x -4 ,gameChar_y -31 ,gameChar_x -12 ,gameChar_y -25);
        triangle(gameChar_x -3 ,gameChar_y -36 ,gameChar_x -1 ,gameChar_y -33 ,gameChar_x -4 ,gameChar_y -29);
        triangle(gameChar_x -4 ,gameChar_y -30 ,gameChar_x -2 ,gameChar_y -25 ,gameChar_x -5 ,gameChar_y -21);
        triangle(gameChar_x -4 ,gameChar_y -23 ,gameChar_x -1 ,gameChar_y -18 ,gameChar_x -5 ,gameChar_y -13);
        triangle(gameChar_x -5 ,gameChar_y -14 ,gameChar_x +1 ,gameChar_y -11 ,gameChar_x -1 ,gameChar_y -6);

        pop();

	}
	else if(isLeft)
	{
		//body
        push();
        fill(255,228,196);
        ellipse(gameChar_x -2 ,gameChar_y -17 ,15,25);
        pop();


        //head
        push();
        fill(255,222,173);
        ellipse(gameChar_x -2 ,gameChar_y -28 ,15,20);
        pop();



        //hair behind ear
        push();
        fill(205,133,63)
        triangle(gameChar_x +6 ,gameChar_y -35 ,gameChar_x -4 ,gameChar_y -37 ,gameChar_x +1 ,gameChar_y -47)
        triangle(gameChar_x +5 ,gameChar_y -34 ,gameChar_x -1 ,gameChar_y -36 ,gameChar_x +10 ,gameChar_y -42)
        pop();

        push();
        fill(139,69,19);
        triangle(gameChar_x -3 ,gameChar_y -37 ,gameChar_x +7 ,gameChar_y -51 ,gameChar_x +6 ,gameChar_y -34)

        //left ear
        push();
        fill(255,222,173);
        ellipse(gameChar_x,gameChar_y -38 ,9,9);
        pop();




        //left inner ear
        push();
        fill(222,184,135);
        ellipse(gameChar_x,gameChar_y -38,6,6);
        pop();



        //behind left eye
        push();
        fill(255,228,196);
        ellipse(gameChar_x -5 ,gameChar_y -30,10,10)
        pop();


        //left eye
        push();
        stroke(0);
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x -5 ,gameChar_y -30 , 5, 5)
        pop();
        //left pupil
        push();
        fill(0)
        ellipse(gameChar_x -6 ,gameChar_y -30 ,2,2)
        pop();


        //outernose
        push();
        stroke(0)
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x -7 ,gameChar_y -23 ,12,8)
        pop();

        //innernose
        push();
        ellipse(gameChar_x -13 ,gameChar_y -24,5,3)
        pop();

        push();
        stroke(0);
        strokeWeight(0.2);
        fill(200,200,200)
        pop();


        //lower body
        push();
        fill(255,222,173);
        ellipse(gameChar_x -2 ,gameChar_y -8 ,10,11)
        pop();


        //left leg
        push();
        fill(255,222,173);
        quad(gameChar_x -7 ,gameChar_y,gameChar_x -5 ,gameChar_y -5 ,gameChar_x -3 ,gameChar_y -5 ,gameChar_x -3 ,gameChar_y);
        pop();


        //right leg
        push();
        fill(255,222,173);
        quad(gameChar_x -2 ,gameChar_y -5 ,gameChar_x,gameChar_y -5 ,gameChar_x +3 ,gameChar_y ,gameChar_x -2 ,gameChar_y );
        pop();



        //left arm
        push();
        fill(255,222,173);
        quad(gameChar_x -15 ,gameChar_y -9 ,gameChar_x -15 ,gameChar_y -11 ,gameChar_x -10 ,gameChar_y -18 ,gameChar_x -9 ,gameChar_y -16 )
        pop();

        //right arm
        push();
        fill(255,222,173);
        quad(gameChar_x -1 ,gameChar_y -16 ,gameChar_x -1 ,gameChar_y -18 ,gameChar_x +4 ,gameChar_y -11 ,gameChar_x +3 ,gameChar_y -9)
        pop();



        //end layer of hair left
        push();
        fill(139,69,19);
        triangle(gameChar_x +5 ,gameChar_y -7 ,gameChar_x +7 ,gameChar_y -18 ,gameChar_x +22 ,gameChar_y -7)
        triangle(gameChar_x ,gameChar_y -4 ,gameChar_x +4 ,gameChar_y -11 ,gameChar_x +16 ,gameChar_y -1)
        triangle(gameChar_x +6 ,gameChar_y -16 ,gameChar_x +4 ,gameChar_y -27 ,gameChar_x +23 ,gameChar_y -22)
        triangle(gameChar_x +7 ,gameChar_y -25 ,gameChar_x +5 ,gameChar_y -37 ,gameChar_x +23 ,gameChar_y -36)
        triangle(gameChar_x +8 ,gameChar_y -20 ,gameChar_x +5 ,gameChar_y -34 ,gameChar_x +24 ,gameChar_y -29 )



        //middle layer hair left
        push();
        fill(184,134,11);
        triangle(gameChar_x +5 ,gameChar_y -9 ,gameChar_x +5 ,gameChar_y -15 ,gameChar_x +17 ,gameChar_y -7)
        triangle(gameChar_x +4 ,gameChar_y -12 ,gameChar_x +6 ,gameChar_y -21 ,gameChar_x +19 ,gameChar_y -16)
        triangle(gameChar_x +6 ,gameChar_y -20 ,gameChar_x +5 ,gameChar_y -27 ,gameChar_x +20 ,gameChar_y -28)
        triangle(gameChar_x +5 ,gameChar_y -31 ,gameChar_x +3 ,gameChar_y -36 ,gameChar_x +17 ,gameChar_y -40)
        triangle(gameChar_x +1 ,gameChar_y -5 ,gameChar_x +3 ,gameChar_y -8 ,gameChar_x +14 ,gameChar_y -1)
        pop();



        //hair walking left
        push();
        fill(205,133,63);
        triangle(gameChar_x +1 ,gameChar_y -6 ,gameChar_x +4 ,gameChar_y -13 ,gameChar_x +12 ,gameChar_y -4);
        triangle(gameChar_x +3 ,gameChar_y -11 ,gameChar_x +5 ,gameChar_y -16 ,gameChar_x +15 ,gameChar_y -9);
        triangle(gameChar_x +4 ,gameChar_y -14 ,gameChar_x +4 ,gameChar_y -23 ,gameChar_x +17 ,gameChar_y -20);
        triangle(gameChar_x +4 ,gameChar_y -23 ,gameChar_x +3 ,gameChar_y -35 ,gameChar_x +18 ,gameChar_y -32);
        triangle(gameChar_x +4 ,gameChar_y -21 ,gameChar_x +4 ,gameChar_y -31 ,gameChar_x +12 ,gameChar_y -25);
        triangle(gameChar_x +3 ,gameChar_y -36 ,gameChar_x +1 ,gameChar_y -33 ,gameChar_x +4 ,gameChar_y -29);
        triangle(gameChar_x +4 ,gameChar_y -30 ,gameChar_x +2 ,gameChar_y -25 ,gameChar_x +5 ,gameChar_y -21);
        triangle(gameChar_x +4 ,gameChar_y -23 ,gameChar_x +1 ,gameChar_y -18 ,gameChar_x +5 ,gameChar_y -13);
        triangle(gameChar_x +5 ,gameChar_y -14 ,gameChar_x -1 ,gameChar_y -11 ,gameChar_x +1 ,gameChar_y -6);
        pop();

	}
	else if(isRight)
	{
		 //body
        push();
        fill(255,228,196);
        ellipse(gameChar_x +3 ,gameChar_y -17 ,15,25);
        pop(); 

        //head
        push();
        fill(255,222,173);
        ellipse(gameChar_x +3 ,gameChar_y -28 ,15,20);
        pop();


        //hair behind ear
        push();
        fill(205,133,63)
        triangle(gameChar_x -6 ,gameChar_y -35 ,gameChar_x +4 ,gameChar_y -37 ,gameChar_x -1 ,gameChar_y -47)
        triangle(gameChar_x -5 ,gameChar_y -34 ,gameChar_x +1 ,gameChar_y -36 ,gameChar_x -10 ,gameChar_y -42 )
        pop();

        push();
        fill(139,69,19);
        triangle(gameChar_x +3 ,gameChar_y -37 ,gameChar_x -7 ,gameChar_y -51 ,gameChar_x -6 ,gameChar_y -34)

        //left ear
        push();
        fill(255,222,173);
        ellipse(gameChar_x,gameChar_y -38,9,9);
        pop();




        //left inner ear
        push();
        fill(222,184,135);
        ellipse(gameChar_x,gameChar_y -38 ,6,6);
        pop();

        //behind left eye
        push();
        fill(255,228,196);
        ellipse(gameChar_x +5 ,gameChar_y -30,10,10)
        pop();


        //left eye
        push();
        stroke(0);
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x+5 ,gameChar_y -30, 5, 5)
        pop();
        //left pupil
        push();
        fill(0)
        ellipse(gameChar_x +6 ,gameChar_y -30,2,2)
        pop();


        //outernose
        push();
        stroke(0)
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x +7 ,gameChar_y -23,12,8)
        pop();

        //innernose
        push();
        ellipse(gameChar_x +13 ,gameChar_y -24,5,3)
        pop();

        push();
        stroke(0);
        strokeWeight(0.2);
        fill(200,200,200)
        pop();


        //lower body
        push();
        fill(255,222,173);
        ellipse(gameChar_x +2 ,gameChar_y -8,10,11)
        pop();


        //left leg
        push();
        fill(255,222,173);
        quad(gameChar_x +7 ,gameChar_y,gameChar_x +5 ,gameChar_y -5 ,gameChar_x +3 ,gameChar_y -5 ,gameChar_x +3 ,gameChar_y);
        pop();


        //right leg
        push();
        fill(255,222,173);
        quad(gameChar_x +2 ,gameChar_y -5 ,gameChar_x ,gameChar_y -5 ,gameChar_x -3 ,gameChar_y,gameChar_x +2 ,gameChar_y);
        pop();




        //left arm
        push();
        fill(255,222,173);
        quad(gameChar_x +15 ,gameChar_y -9 ,gameChar_x +15 ,gameChar_y -11 ,gameChar_x +10 ,gameChar_y -16 ,gameChar_x +9 ,gameChar_y -14 )
        pop();

        //right arm
        push();
        fill(255,222,173);
        quad(gameChar_x -1 ,gameChar_y -16 ,gameChar_x -1 ,gameChar_y -18 ,gameChar_x +4 ,gameChar_y -11 ,gameChar_x +3 ,gameChar_y -9)
        pop();




        //end layer of hair left
        push();
        fill(139,69,19);
        triangle(gameChar_x -5 ,gameChar_y -7 ,gameChar_x -7 ,gameChar_y -18 ,gameChar_x -22 ,gameChar_y -7)
        triangle(gameChar_x,gameChar_y -4 ,gameChar_x -4 ,gameChar_y -11 ,gameChar_x -16 ,gameChar_y -1)
        triangle(gameChar_x -6 ,gameChar_y -16 ,gameChar_x -4 ,gameChar_y -27 ,gameChar_x -23 ,gameChar_y -22)
        triangle(gameChar_x -7 ,gameChar_y -25 ,gameChar_x -5 ,gameChar_y -37 ,gameChar_x -23 ,gameChar_y -36)
        triangle(gameChar_x -8 ,gameChar_y -20 ,gameChar_x -5 ,gameChar_y -34 ,gameChar_x -22 ,gameChar_y -29)



        //middle layer hair left
        push();
        fill(184,134,11);
        triangle(gameChar_x -5 ,gameChar_y -9 ,gameChar_x -5 ,gameChar_y -15 ,gameChar_x -17 ,gameChar_y -7)
        triangle(gameChar_x -4 ,gameChar_y -12 ,gameChar_x -6 ,gameChar_y -21 ,gameChar_x -19 ,gameChar_y -16)
        triangle(gameChar_x -6 ,gameChar_y -20 ,gameChar_x -5 ,gameChar_y -27 ,gameChar_x -20 ,gameChar_y -28)
        triangle(gameChar_x -5 ,gameChar_y -31 ,gameChar_x -3 ,gameChar_y -36 ,gameChar_x -17 ,gameChar_y -40)
        triangle(gameChar_x -1 ,gameChar_y -5 ,gameChar_x -3 ,gameChar_y -8 ,gameChar_x -14 ,gameChar_y -1)
        pop();



        //hair walking left
        push();
        fill(205,133,63);
        triangle(gameChar_x -1 ,gameChar_y -6 ,gameChar_x -4 ,gameChar_y -13 ,gameChar_x -12 ,gameChar_y -4);
        triangle(gameChar_x -3 ,gameChar_y -11 ,gameChar_x -5 ,gameChar_y -16 ,gameChar_x -15 ,gameChar_y -9);
        triangle(gameChar_x -4 ,gameChar_y -14 ,gameChar_x -4 ,gameChar_y -23 ,gameChar_x -17 ,gameChar_y -20);
        triangle(gameChar_x -4 ,gameChar_y -23 ,gameChar_x -3 ,gameChar_y -35 ,gameChar_x -18 ,gameChar_y -32);
        triangle(gameChar_x -4 ,gameChar_y -21 ,gameChar_x -4 ,gameChar_y -31 ,gameChar_x -12 ,gameChar_y -25 );
        triangle(gameChar_x -3 ,gameChar_y -36 ,gameChar_x -1 ,gameChar_y -33 ,gameChar_x -4 ,gameChar_y -29);
        triangle(gameChar_x -4 ,gameChar_y -30 ,gameChar_x -2 ,gameChar_y -25 ,gameChar_x -5 ,gameChar_y -21);
        triangle(gameChar_x -4 ,gameChar_y -23 ,gameChar_x -1 ,gameChar_y -18 ,gameChar_x -5 ,gameChar_y -13);
        triangle(gameChar_x -5 ,gameChar_y -14 ,gameChar_x +1 ,gameChar_y -11 ,gameChar_x -1 ,gameChar_y -6);

        pop();

	}
	else if(isFalling || isPlummeting)
	{
		push();
        fill(139,69,19);
        triangle(gameChar_x -21 ,gameChar_y -10 ,gameChar_x -6 ,gameChar_y -24 ,gameChar_x -3 ,gameChar_y -6)
        triangle(gameChar_x -23 ,gameChar_y -23 ,gameChar_x -6 ,gameChar_y -35 ,gameChar_x -6 ,gameChar_y -9 )
        triangle(gameChar_x -21 ,gameChar_y -41 ,gameChar_x +0 ,gameChar_y -39 ,gameChar_x -16 ,gameChar_y -26 )
        triangle(gameChar_x -6 ,gameChar_y -48 ,gameChar_x +1 ,gameChar_y -38 ,gameChar_x -11 ,gameChar_y -36 )
        triangle(gameChar_x +6 ,gameChar_y -51 ,gameChar_x +9 ,gameChar_y -34 ,gameChar_x -9 ,gameChar_y -37)
        triangle(gameChar_x +14 ,gameChar_y -47 ,gameChar_x +10 ,gameChar_y -30 ,gameChar_x -3 ,gameChar_y -41)
        triangle(gameChar_x +19 ,gameChar_y -37 ,gameChar_x +10 ,gameChar_y -29 ,gameChar_x +5 ,gameChar_y -42 )
        triangle(gameChar_x +20 ,gameChar_y -28 ,gameChar_x +8 ,gameChar_y -21 ,gameChar_x +4 ,gameChar_y -47)
        triangle(gameChar_x +10 ,gameChar_y -30 ,gameChar_x +21 ,gameChar_y -23 ,gameChar_x +7 ,gameChar_y -20 )
        triangle(gameChar_x +8 ,gameChar_y -20 ,gameChar_x +19 ,gameChar_y -19 ,gameChar_x +8 ,gameChar_y -14 )
        triangle(gameChar_x +4 ,gameChar_y -5 ,gameChar_x +21 ,gameChar_y -12 ,gameChar_x +5 ,gameChar_y -27 )
        triangle(gameChar_x -14 ,gameChar_y -45 ,gameChar_x -2 ,gameChar_y -38 ,gameChar_x -11 ,gameChar_y -30)

        //back layer of hair
        push();
        fill(184,134,11);
        triangle(gameChar_x -16 ,gameChar_y -14 ,gameChar_x -7 ,gameChar_y -20 ,gameChar_x -5 ,gameChar_y -7 )
        triangle(gameChar_x -17 ,gameChar_y -21 ,gameChar_x -8 ,gameChar_y -27 ,gameChar_x -5 ,gameChar_y -14 )
        triangle(gameChar_x -19 ,gameChar_y -34 ,gameChar_x -5 ,gameChar_y -36 ,gameChar_x -5 ,gameChar_y -20 )
        triangle(gameChar_x -18 ,gameChar_y -27 ,gameChar_x -7 ,gameChar_y -33 ,gameChar_x -9 ,gameChar_y -21 )
        triangle(gameChar_x -18 ,gameChar_y -40 ,gameChar_x -10 ,gameChar_y -38 ,gameChar_x -11 ,gameChar_y -31)
        triangle(gameChar_x -5 ,gameChar_y -46 ,gameChar_x +0 ,gameChar_y -37 ,gameChar_x -10 ,gameChar_y -35 )
        triangle(gameChar_x +2 ,gameChar_y -46 ,gameChar_x +6 ,gameChar_y -34 ,gameChar_x -5 ,gameChar_y -35)
        triangle(gameChar_x +8 ,gameChar_y -46 ,gameChar_x +9 ,gameChar_y -33 ,gameChar_x +0 ,gameChar_y -35 )
        triangle(gameChar_x +16 ,gameChar_y -38 ,gameChar_x +9 ,gameChar_y -28 ,gameChar_x +1 ,gameChar_y -38 )
        triangle(gameChar_x +7 ,gameChar_y -34 ,gameChar_x +17 ,gameChar_y -29 ,gameChar_x +6 ,gameChar_y -24)
        triangle(gameChar_x +9 ,gameChar_y -31 ,gameChar_x +18 ,gameChar_y -25 ,gameChar_x +6 ,gameChar_y -20 )
        triangle(gameChar_x +6 ,gameChar_y -27 ,gameChar_x +18 ,gameChar_y -19 ,gameChar_x +6 ,gameChar_y -15)
        triangle(gameChar_x +5 ,gameChar_y -27 ,gameChar_x +16 ,gameChar_y -13 ,gameChar_x +4 ,gameChar_y -7)
        pop();




        //layer of hair
        push();
        fill(205,133,63);
        triangle(gameChar_x -12 ,gameChar_y -12 ,gameChar_x -9 ,gameChar_y -15 ,gameChar_x -7 ,gameChar_y -10)
        triangle(gameChar_x -12 ,gameChar_y -17 ,gameChar_x -9 ,gameChar_y -20 ,gameChar_x -7 ,gameChar_y -10 )
        triangle(gameChar_x -12 ,gameChar_y -22 ,gameChar_x -9 ,gameChar_y -25 ,gameChar_x -7 ,gameChar_y -10)
        triangle(gameChar_x -15 ,gameChar_y -26 ,gameChar_x -12 ,gameChar_y -28 ,gameChar_x -10 ,gameChar_y -22 )
        triangle(gameChar_x -15 ,gameChar_y -32 ,gameChar_x -10 ,gameChar_y -34 ,gameChar_x -9 ,gameChar_y -27)
        triangle(gameChar_x -17 ,gameChar_y -30 ,gameChar_x -12 ,gameChar_y -31 ,gameChar_x -11 ,gameChar_y -27)
        triangle(gameChar_x -5 ,gameChar_y -41 ,gameChar_x -2 ,gameChar_y -37 ,gameChar_x -7 ,gameChar_y -36)
        triangle(gameChar_x -1 ,gameChar_y -42 ,gameChar_x +2 ,gameChar_y -37 ,gameChar_x -4 ,gameChar_y -37 )
        triangle(gameChar_x +3 ,gameChar_y -42 ,gameChar_x +6 ,gameChar_y -36 ,gameChar_x +0 ,gameChar_y -37 )
        triangle(gameChar_x +9 ,gameChar_y -33 ,gameChar_x +15 ,gameChar_y -32 ,gameChar_x +9 ,gameChar_y -28 )
        triangle(gameChar_x +10 ,gameChar_y -31 ,gameChar_x +16 ,gameChar_y -29 ,gameChar_x +10 ,gameChar_y -27)
        triangle(gameChar_x +11 ,gameChar_y -30 ,gameChar_x +15 ,gameChar_y -27 ,gameChar_x +8 ,gameChar_y -24 )
        triangle(gameChar_x +10 ,gameChar_y -27 ,gameChar_x +15 ,gameChar_y -24 ,gameChar_x +8 ,gameChar_y -22)
        triangle(gameChar_x +8 ,gameChar_y -24 ,gameChar_x +13 ,gameChar_y -22 ,gameChar_x +8 ,gameChar_y -17 )
        triangle(gameChar_x +8 ,gameChar_y -22 ,gameChar_x +12 ,gameChar_y -16 ,gameChar_x +5 ,gameChar_y -9)
        triangle(gameChar_x +6 ,gameChar_y -21 ,gameChar_x +11 ,gameChar_y -11 ,gameChar_x +4 ,gameChar_y -9)
        pop();










        //body
        push();
        fill(255,228,196);
        ellipse(gameChar_x,gameChar_y-20,18,25);
        ellipse(gameChar_x,gameChar_y-20,18,25);
        pop();





        //left ear
        push();
        fill(255,222,173);
        ellipse(gameChar_x -9 ,gameChar_y -36,9,9);
        pop();

        //right ear
        push();
        fill(255,222,173);
        ellipse(gameChar_x +9 ,gameChar_y -36 ,9,9);
        pop();


        //left inner ear
        push();
        fill(222,184,135);
        ellipse(gameChar_x -9 ,gameChar_y -36,6,6);
        pop();

        //right inner ear
        push();
        fill(222,184,135);
        ellipse(gameChar_x +9 ,gameChar_y -36,6,6);
        pop()



        //head
        push();
        fill(255,222,173);
        ellipse(gameChar_x ,gameChar_y -28 ,25,20);
        pop();






        //middle of eyes
        push();
        fill(222,184,135);
        ellipse(gameChar_x ,gameChar_y -34 ,7,7);
        pop();

        //behind left eye
        push();
        fill(255,228,196);
        ellipse(gameChar_x -5 ,gameChar_y -30 ,10,10)
        pop();

        //behind right eye
        push();
        fill(255,228,196);
        ellipse(gameChar_x +5 ,gameChar_y -30 ,10,10);
        pop();



        //left eye
        push();
        stroke(0);
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x -5 ,gameChar_y -30 , 5, 5)
        pop();
        //left pupil
        push();
        fill(0)
        ellipse(gameChar_x -4 ,gameChar_y -30 ,2,2)
        pop();


        //right eye
        push();
        stroke(0);
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x +5 ,gameChar_y -30,5,5)
        pop();
        //right pupil
        push();
        fill(0)
        ellipse(gameChar_x +4 ,gameChar_y -30 ,2,2)
        pop();

        //outernose
        push();
        stroke(0)
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x,gameChar_y -23,12,8)
        pop();

        //innernose
        push();
        ellipse(gameChar_x,gameChar_y -24 ,5,3)
        pop();

        push();
        stroke(0);
        strokeWeight(0.2);
        fill(200,200,200)
        pop();

        //lower body
        push();
        fill(255,222,173);
        ellipse(gameChar_x ,gameChar_y -8,14,11)
        pop();


        //left leg
        push();
        fill(255,222,173);
        quad(gameChar_x -12 ,gameChar_y  ,gameChar_x -5 ,gameChar_y -5 ,gameChar_x -3 ,gameChar_y -5 ,gameChar_x -8 ,gameChar_y )
        pop();


        //right leg
        push();
        fill(255,222,173);
        quad(gameChar_x +3 ,gameChar_y -5 ,gameChar_x +5 ,gameChar_y -5 ,gameChar_x +12 ,gameChar_y  ,gameChar_x +8 ,gameChar_y )
        pop();



        //left arm
        push();
        fill(255,222,173);
        quad(gameChar_x -15 ,gameChar_y -19 ,gameChar_x -15 ,gameChar_y -21 ,gameChar_x -9 ,gameChar_y -18 ,gameChar_x -9 ,gameChar_y -16)
        pop();

        //right arm
        push();
        fill(255,222,173);
        quad(gameChar_x +9 ,gameChar_y -16 ,gameChar_x +9 ,gameChar_y -18 ,gameChar_x +14 ,gameChar_y -21 ,gameChar_x +14 ,gameChar_y -19)
        pop();

	}
	else 
	{
		 push();
        fill(139,69,19);
        triangle(gameChar_x-21,gameChar_y-13,gameChar_x-6,gameChar_y-24,gameChar_x-3,gameChar_y-6)
        triangle(gameChar_x-23,gameChar_y-26,gameChar_x-6,gameChar_y-35,gameChar_x-6,gameChar_y-9)
        triangle(gameChar_x-21,gameChar_y-43,gameChar_x,gameChar_y-39,gameChar_x-16,gameChar_y-26)
        triangle(gameChar_x-6,gameChar_y-53,gameChar_x+1,gameChar_y-38,gameChar_x-11,gameChar_y-36)
        triangle(gameChar_x+6,gameChar_y-54,gameChar_x+9,gameChar_y-34,gameChar_x-9,gameChar_y-37)
        triangle(gameChar_x+14,gameChar_y-48,gameChar_x+10,gameChar_y-30,gameChar_x-3,gameChar_y-41)
        triangle(gameChar_x+19,gameChar_y-39,gameChar_x+10,gameChar_y-29,gameChar_x+5,gameChar_y-42)
        triangle(gameChar_x +20 ,gameChar_y -32 ,gameChar_x +8 ,gameChar_y -21 ,gameChar_x +4 ,gameChar_y -47)
        triangle(gameChar_x +10 ,gameChar_y -33 ,gameChar_x +21 ,gameChar_y -23 ,gameChar_x +7 ,gameChar_y -20)
        triangle(gameChar_x +8 ,gameChar_y -24 ,gameChar_x +19 ,gameChar_y -19 ,gameChar_x +8 ,gameChar_y -14)
        triangle(gameChar_x +4 ,gameChar_y -8 ,gameChar_x +21 ,gameChar_y -12 ,gameChar_x +5 ,gameChar_y -27 )
        triangle(gameChar_x -14 ,gameChar_y -48 ,gameChar_x -2 ,gameChar_y -38 ,gameChar_x -11 ,gameChar_y -30 )
        pop();

        //back layer of hair
        push();
        fill(184,134,11);
        triangle(gameChar_x -16 ,gameChar_y -14 ,gameChar_x -7 ,gameChar_y -20 ,gameChar_x -5 ,gameChar_y -7)
        triangle(gameChar_x -17 ,gameChar_y -21 ,gameChar_x -8 ,gameChar_y -27 ,gameChar_x -5 ,gameChar_y -14)
        triangle(gameChar_x -19 ,gameChar_y -34 ,gameChar_x -5 ,gameChar_y -36 ,gameChar_x -5 ,gameChar_y -20 )
        triangle(gameChar_x -18 ,gameChar_y -27 ,gameChar_x -7 ,gameChar_y -33 ,gameChar_x -9 ,gameChar_y -21 )
        triangle(gameChar_x -18 ,gameChar_y -40 ,gameChar_x -10 ,gameChar_y -38 ,gameChar_x -11 ,gameChar_y -31)
        triangle(gameChar_x -5 ,gameChar_y -46 ,gameChar_x +0 ,gameChar_y -37 ,gameChar_x -10 ,gameChar_y -35 )
        triangle(gameChar_x +2 ,gameChar_y -46 ,gameChar_x +6 ,gameChar_y -34 ,gameChar_x -5 ,gameChar_y -35)
        triangle(gameChar_x +8 ,gameChar_y -46 ,gameChar_x +9 ,gameChar_y -33 ,gameChar_x +0 ,gameChar_y -35 )
        triangle(gameChar_x +16 ,gameChar_y -38 ,gameChar_x +9 ,gameChar_y -28 ,gameChar_x +1 ,gameChar_y -38 )
        triangle(gameChar_x +7 ,gameChar_y -34 ,gameChar_x +17 ,gameChar_y -29 ,gameChar_x+6 ,gameChar_y -24 )
        triangle(gameChar_x +9 ,gameChar_y -31 ,gameChar_x +18 ,gameChar_y -25 ,gameChar_x +6 ,gameChar_y -20)
        triangle(gameChar_x +6 ,gameChar_y -27 ,gameChar_x +18 ,gameChar_y -19 ,gameChar_x +6 ,gameChar_y -15)
        triangle(gameChar_x +5 ,gameChar_y -27 ,gameChar_x +16 ,gameChar_y -13 ,gameChar_x +4 ,gameChar_y -7)
        pop();

        //layer of hair
        push();
        fill(205,133,63);
        triangle(gameChar_x -12 ,gameChar_y -12 ,gameChar_x -4 ,gameChar_y -10  ,gameChar_x -7 ,gameChar_y -10 )
        triangle(gameChar_x -15 ,gameChar_y -26 ,gameChar_x -12 ,gameChar_y -28 ,gameChar_x -10 ,gameChar_y -22)
        triangle(gameChar_x -15 ,gameChar_y -32 ,gameChar_x -10 ,gameChar_y -34 ,gameChar_x -9 ,gameChar_y -27)
        triangle(gameChar_x -17 ,gameChar_y -30 ,gameChar_x -12 ,gameChar_y -31 ,gameChar_x -11 ,gameChar_y -27 )
        triangle(gameChar_x -5 ,gameChar_y -41 ,gameChar_x -2 ,gameChar_y -37 ,gameChar_x -7 ,gameChar_y -36 )
        triangle(gameChar_x -1 ,gameChar_y -42 ,gameChar_x +2 ,gameChar_y -37 ,gameChar_x -4 ,gameChar_y -37)
        triangle(gameChar_x +3 ,gameChar_y -42 ,gameChar_x +6 ,gameChar_y -36 ,gameChar_x +0 ,gameChar_y -37 )
        triangle(gameChar_x +9 ,gameChar_y -33 ,gameChar_x +15 ,gameChar_y -32 ,gameChar_x +9 ,gameChar_y -28)
        triangle(gameChar_x +10 ,gameChar_y -31 ,gameChar_x +16 ,gameChar_y -29 ,gameChar_x +10 ,gameChar_y -27)
        triangle(gameChar_x +11 ,gameChar_y -30 ,gameChar_x +15 ,gameChar_y -27 ,gameChar_x +8 ,gameChar_y -24)
        triangle(gameChar_x +10 ,gameChar_y -27 ,gameChar_x +15 ,gameChar_y -24 ,gameChar_x +8 ,gameChar_y -22 )
        triangle(gameChar_x +8 ,gameChar_y -24 ,gameChar_x +13 ,gameChar_y -22 ,gameChar_x +8 ,gameChar_y -17 )
        triangle(gameChar_x +8 ,gameChar_y -22 ,gameChar_x +12 ,gameChar_y -16 ,gameChar_x +5 ,gameChar_y -9)
        triangle(gameChar_x +6 ,gameChar_y -21 ,gameChar_x +11 ,gameChar_y -11 ,gameChar_x +4 ,gameChar_y -9)
        pop();

        //body
        push();
        fill(255,228,196);
        ellipse(gameChar_x,gameChar_y-17,20,25);
        pop();

        //left ear
        push();
        fill(255,222,173);
        ellipse(gameChar_x -10 ,gameChar_y -38 ,9,9);
        pop();

        //right ear
        push();
        fill(255,222,173);
        ellipse(gameChar_x+10,gameChar_y-38,9,9);
        pop();

        //left inner ear
        push();
        fill(222,184,135);
        ellipse(gameChar_x-10,gameChar_y-38,6,6);
        pop();

        //right inner ear
        push();
        fill(222,184,135);
        ellipse(gameChar_x+10,gameChar_y-38,6,6);
        pop()

        //head
        push();
        fill(255,222,173);
        ellipse(gameChar_x,gameChar_y-28,25,20);
        pop();

        //middle of eyes
        push();
        fill(222,184,135);
        ellipse(gameChar_x,gameChar_y-34,7,7);
        pop();

        //behind left eye
        push();
        fill(255,228,196);
        ellipse(gameChar_x-5,gameChar_y-30,10,10)
        pop();

        //behind right eye
        push();
        fill(255,228,196);
        ellipse(gameChar_x+5,gameChar_y-30,10,10);
        pop();

        //left eye
        push();
        stroke(0);
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x-5, gameChar_y-30, 5, 5)
        pop();
        //left pupil
        push();
        fill(0)
        ellipse(gameChar_x-4,gameChar_y-30,2,2)
        pop();

        //right eye
        push();
        stroke(0);
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x+5,gameChar_y-30,5,5)
        pop();
        //right pupil
        push();
        fill(0)
        ellipse(gameChar_x+4,gameChar_y-30,2,2)
        pop();

        //outernose
        push();
        stroke(0)
        strokeWeight(0.2);
        fill(255,255,255)
        ellipse(gameChar_x,gameChar_y-23,12,8)
        pop();

        //innernose
        push();
        fill(139,69,19);
        ellipse(gameChar_x,gameChar_y-24,5,3)
        pop();

        push();
        stroke(0);
        strokeWeight(0.2);
        fill(200,200,200)
        pop();

        //lower body
        push();
        fill(255,222,173);
        ellipse(gameChar_x,gameChar_y-8,14,11)
        pop();

        //left leg
        push();
        fill(255,222,173);
        quad(gameChar_x -7 ,gameChar_y,gameChar_x -5 ,gameChar_y -5 ,gameChar_x -3 ,gameChar_y -5 ,gameChar_x -3 ,gameChar_y)
        pop();

        //right leg
        push();
        fill(255,222,173);
        quad(gameChar_x +3 ,gameChar_y -5 ,gameChar_x +5 ,gameChar_y -5 ,gameChar_x +7 ,gameChar_y  ,gameChar_x +3 ,gameChar_y )
        pop();

        //left arm
        push();
        fill(255,222,173);
        quad(gameChar_x -15 ,gameChar_y -9 ,gameChar_x -15 ,gameChar_y -11 ,gameChar_x -10 ,gameChar_y -18 ,gameChar_x -9 ,gameChar_y -16 )
        pop();

        //right arm
        push();
        fill(255,222,173);
        quad(gameChar_x +9 ,gameChar_y -16 ,gameChar_x +9 ,gameChar_y -18 ,gameChar_x +14 ,gameChar_y -11 ,gameChar_x +13 ,gameChar_y -9 )
        pop();
    }
    
    
    
    
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawCloud(t_cloud)

{
    
    //base of cloud
    fill(255,255,255)
    rect(t_cloud.cloud_x+146,t_cloud.cloud_y+90,100,10)
    
    //left of cloud
    ellipse(t_cloud.cloud_x+146,t_cloud.cloud_y+75,50)
    
    //right of cloud
    ellipse(t_cloud.cloud_x+246,t_cloud.cloud_y+75,50)
    
    //2ndleft cloud
    ellipse(t_cloud.cloud_x+171,t_cloud.cloud_y+ 50, 40)
    
    //2nd right cloud
    ellipse(t_cloud.cloud_x+221,t_cloud.cloud_y+35,50)
    
    //middlepartcloud
    ellipse(t_cloud.cloud_x+192,t_cloud.cloud_y+34,20)
    
    //cloudfiller
    rect(t_cloud.cloud_x+166,t_cloud.cloud_y+39,75,60)
    
    //cloudshading right 1st
    fill(240,240,240)
    ellipse(t_cloud.cloud_x+246,t_cloud.cloud_y+75,45)
    fill(255,255,255)
    ellipse(t_cloud.cloud_x+240,t_cloud.cloud_y+75,45)
    
    //cloudshading 2nd right
    fill(240,240,240)
    ellipse(t_cloud.cloud_x+221,t_cloud.cloud_y+35,45)
    fill(255,255,255)
    ellipse(t_cloud.cloud_x+219,t_cloud.cloud_y+35,43)
    
    //cloudshading left
    fill(240,240,240)
    ellipse(t_cloud.cloud_x+171,t_cloud.cloud_y+50,35)
    fill(255,255,255)
    ellipse(t_cloud.cloud_x+168,t_cloud.cloud_y+50,34)
    
    //cloudshadinglittleone
    fill(240,240,240)
    ellipse(t_cloud.cloud_x+192,t_cloud.cloud_y+34,15)
    fill(255,255,255)
    ellipse(t_cloud.cloud_x+190,t_cloud.cloud_y+34,13)
    
    
    
    
    
    
    
}

// Function to draw mountains objects.
function drawMountain(t_mountain)
{
    //front of mountain

    fill(123,104,238)
    triangle(t_mountain.mountain_x+425,t_mountain.mountain_y+432,t_mountain.mountain_x+523,t_mountain.mountain_y+272,t_mountain.mountain_x+600,t_mountain.mountain_y+432)
    
    //side of mountain
    fill(72,61,139)
    triangle(t_mountain.mountain_x+523,t_mountain.mountain_y+272,t_mountain.mountain_x+670,t_mountain.mountain_y+432,t_mountain.mountain_x+600,t_mountain.mountain_y+432)
    //snow
    fill(255,255,255)
    triangle(t_mountain.mountain_x+478,t_mountain.mountain_y+346,t_mountain.mountain_x+523,t_mountain.mountain_y+272,t_mountain.mountain_x+552,t_mountain.mountain_y+338)
    //snow
    fill(255,255,255)
    triangle(t_mountain.mountain_x+477,t_mountain.mountain_y+357,t_mountain.mountain_x+479,t_mountain.mountain_y+344,t_mountain.mountain_x+496,t_mountain.mountain_y+342)
    
    fill(255,255,255)
    triangle(t_mountain.mountain_x+492,t_mountain.mountain_y+364,t_mountain.mountain_x+494,t_mountain.mountain_y+343,t_mountain.mountain_x+507,t_mountain.mountain_y+341)
    
    fill(255,255,255)
    triangle(t_mountain.mountain_x+512,t_mountain.mountain_y+365,t_mountain.mountain_x+506,t_mountain.mountain_y+339,t_mountain.mountain_x+519,t_mountain.mountain_y+339)
    
    fill(255,255,255)
    triangle(t_mountain.mountain_x+529,t_mountain.mountain_y+367,t_mountain.mountain_x+518,t_mountain.mountain_y+338,t_mountain.mountain_x+531,t_mountain.mountain_y+338)
    
    fill(255,255,255)
    triangle(t_mountain.mountain_x+542,t_mountain.mountain_y+353,t_mountain.mountain_x+529,t_mountain.mountain_y+336,t_mountain.mountain_x+545,t_mountain.mountain_y+337)
    
    fill(255,255,255)
    triangle(t_mountain.mountain_x+554,t_mountain.mountain_y+345,t_mountain.mountain_x+545,t_mountain.mountain_y+338,t_mountain.mountain_x+552,t_mountain.mountain_y+338)
    
    fill(240,240,240)
    triangle(t_mountain.mountain_x+554,t_mountain.mountain_y+344,t_mountain.mountain_x+523,t_mountain.mountain_y+272,t_mountain.mountain_x+561,t_mountain.mountain_y+313)
    
    fill(240,240,240)
    triangle(t_mountain.mountain_x+564,t_mountain.mountain_y+343,t_mountain.mountain_x+553,t_mountain.mountain_y+331,t_mountain.mountain_x+559,t_mountain.mountain_y+320)
    
    fill(240,240,240)
    triangle(t_mountain.mountain_x+579,t_mountain.mountain_y+333,t_mountain.mountain_x+556,t_mountain.mountain_y+318,t_mountain.mountain_x+561,t_mountain.mountain_y+313)
   
}

//draws the mountains in yellow in desert.
function drawPyramids(t_pyramid)
{
    //front of mountain

    fill(255,215,0)
    triangle(t_pyramid.mountain_x+425,t_pyramid.mountain_y+432,t_pyramid.mountain_x+523,t_pyramid.mountain_y+272,t_pyramid.mountain_x+600,t_pyramid.mountain_y+432)
    
    //side of mountain
    fill(72,61,139)
    triangle(t_pyramid.mountain_x+523,t_pyramid.mountain_y+272,t_pyramid.mountain_x+670,t_pyramid.mountain_y+432,t_pyramid.mountain_x+600,t_pyramid.mountain_y+432)
    //snow
    fill(255,215,0)
    triangle(t_pyramid.mountain_x+478,t_pyramid.mountain_y+346,t_pyramid.mountain_x+523,t_pyramid.mountain_y+272,t_pyramid.mountain_x+552,t_pyramid.mountain_y+338)
    //snow
    fill(255,215,0)
    triangle(t_pyramid.mountain_x+477,t_pyramid.mountain_y+357,t_pyramid.mountain_x+479,t_pyramid.mountain_y+344,t_pyramid.mountain_x+496,t_pyramid.mountain_y+342)
    
    fill(255,215,0)
    triangle(t_pyramid.mountain_x+492,t_pyramid.mountain_y+364,t_pyramid.mountain_x+494,t_pyramid.mountain_y+343,t_pyramid.mountain_x+507,t_pyramid.mountain_y+341)
    
    fill(255,215,0)
    triangle(t_pyramid.mountain_x+512,t_pyramid.mountain_y+365,t_pyramid.mountain_x+506,t_pyramid.mountain_y+339,t_pyramid.mountain_x+519,t_pyramid.mountain_y+339)
    
    fill(255,215,0)
    triangle(t_pyramid.mountain_x+529,t_pyramid.mountain_y+367,t_pyramid.mountain_x+518,t_pyramid.mountain_y+338,t_pyramid.mountain_x+531,t_pyramid.mountain_y+338)
    
    fill(255,215,0)
    triangle(t_pyramid.mountain_x+542,t_pyramid.mountain_y+353,t_pyramid.mountain_x+529,t_pyramid.mountain_y+336,t_pyramid.mountain_x+545,t_pyramid.mountain_y+337)
    
    fill(255,215,0)
    triangle(t_pyramid.mountain_x+554,t_pyramid.mountain_y+345,t_pyramid.mountain_x+545,t_pyramid.mountain_y+338,t_pyramid.mountain_x+552,t_pyramid.mountain_y+338)
    
    fill(72,61,139)
    triangle(t_pyramid.mountain_x+554,t_pyramid.mountain_y+344,t_pyramid.mountain_x+523,t_pyramid.mountain_y+272,t_pyramid.mountain_x+561,t_pyramid.mountain_y+313)
    
    fill(72,61,139)
    triangle(t_pyramid.mountain_x+564,t_pyramid.mountain_y+343,t_pyramid.mountain_x+553,t_pyramid.mountain_y+331,t_pyramid.mountain_x+559,t_pyramid.mountain_y+320)
    
    fill(72,61,139)
    triangle(t_pyramid.mountain_x+579,t_pyramid.mountain_y+333,t_pyramid.mountain_x+556,t_pyramid.mountain_y+318,t_pyramid.mountain_x+561,t_pyramid.mountain_y+313)
   
}

// Function to draw trees objects.
function drawTree(t_tree,Col)
{

    push();    
    noStroke();
    //visible branches main branch
    fill(t_tree.Col,69,19)
    ellipse(t_tree.treePos_x +95,t_tree.treePos_y +310,100)
    
   
    
    //clipping branches
    noStroke();
    fill(100, 155, 255)
    ellipse(t_tree.treePos_x +99,t_tree.treePos_y+260,130,160)
    
     //visible branches left
    fill(t_tree.Col,69,19)
    ellipse(t_tree.treePos_x +39,t_tree.treePos_y+277,80)
    
    //clipping branches left
    fill(100, 155, 255)
    ellipse(t_tree.treePos_x+37,t_tree.treePos_y+262,80,80)
    
    //visible branches right
    fill(t_tree.Col,69,19)
    noStroke();
    ellipse(t_tree.treePos_x+161,t_tree.treePos_y+299,100)
    
    
    //clipping branmches right
    fill(100, 155, 255)
    noStroke();
    ellipse(t_tree.treePos_x+159,t_tree.treePos_y+279,100,100)
    
    
    
    //tree trunk
    fill(t_tree.Col,69,19)
    stroke(139,69,19)
    triangle(t_tree.treePos_x+80,t_tree.treePos_y+489,t_tree.treePos_x+100,t_tree.treePos_y+300,t_tree.treePos_x+130,t_tree.treePos_y+489)
    
    fill(205,133,63)
    triangle(t_tree.treePos_x+121,t_tree.treePos_y+489,t_tree.treePos_x+109,t_tree.treePos_y+358,t_tree.treePos_x+130,t_tree.treePos_y+489)
    
    
     //clipping top trunk
    fill(100, 155, 255)
    noStroke();
    ellipse(t_tree.treePos_x+100,t_tree.treePos_y+325,31)
    ellipse(t_tree.treePos_x+102,t_tree.treePos_y+304,15)
    
    noStroke();
    //treebasefoliage
    fill(255,255,255)
    rect(t_tree.treePos_x,t_tree.treePos_y+286,210,10)
    
    //foliage left
    fill(0,128,0)
    ellipse(t_tree.treePos_x,t_tree.treePos_y+255,90)
    
    //foliage right
    ellipse(t_tree.treePos_x+210,t_tree.treePos_y+255,100)
    
    //foliage 2nd from left
    ellipse(t_tree.treePos_x+42,t_tree.treePos_y+200,80)
    
    //folliage 3rd from left
    ellipse(t_tree.treePos_x+84,t_tree.treePos_y+150,100)
    
    //folliage 4th from left
    ellipse(t_tree.treePos_x+126,t_tree.treePos_y+150,70)
    //folliage 5th from left
    ellipse(t_tree.treePos_x+168,t_tree.treePos_y+200,80)
    
    //foliage along base folliage
    ellipse(t_tree.treePos_x+34,t_tree.treePos_y+288,35)
    ellipse(t_tree.treePos_x+65,t_tree.treePos_y+288,35)
    ellipse(t_tree.treePos_x+90,t_tree.treePos_y+288,40)
    ellipse(t_tree.treePos_x+115,t_tree.treePos_y+288,30)
    ellipse(t_tree.treePos_x+140,t_tree.treePos_y+288,35)
    ellipse(t_tree.treePos_x+165,t_tree.treePos_y+288,40)
    ellipse(t_tree.treePos_x+190,t_tree.treePos_y+288,30)
    
    //treefiller
    rect(t_tree.treePos_x+37,t_tree.treePos_y+183,130,100)
    
    //second layer foliage right 1
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+210,t_tree.treePos_y+255,90)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+200,t_tree.treePos_y+255,90)
    
    //second layer foliage right 2
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+168,t_tree.treePos_y+200,70)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+160,t_tree.treePos_y+195,70)
    
    //second layer foliage right 3
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+122,t_tree.treePos_y+152,70)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+118,t_tree.treePos_y+150,70)
    
    //second layer foliage right 6
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+2,t_tree.treePos_y+254,80)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+5,t_tree.treePos_y+254,75)
    
    //second layer foliage right 5
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+42,t_tree.treePos_y+200,70)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+46,t_tree.treePos_y+198,65)
    
    //second layer foliage right 4
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+80,t_tree.treePos_y+145,80)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+85,t_tree.treePos_y+150,75)
    
    //middle foliage
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+103,t_tree.treePos_y+256,80)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+103,t_tree.treePos_y+250,78)
   
    pop();    
    
    
    
}

//draws the tress with no foliage for the desert. 
function drawDeadTree(t_deadtree)
{

    push();    
    noStroke();
    //visible branches main branch
    fill(139,69,19)
    ellipse(t_deadtree.treePos_x +56,t_deadtree.treePos_y +310,100)
    
   
    
    //clipping branches
    noStroke();
    fill(100, 155, 255)
    ellipse(t_deadtree.treePos_x +60,t_deadtree.treePos_y+260,130,160)
    
     //visible branches left
    fill(139,69,19)
    ellipse(t_deadtree.treePos_x,t_deadtree.treePos_y+277,80)
    
    //clipping branches left
    fill(100, 155, 255)
    ellipse(t_deadtree.treePos_x-2,t_deadtree.treePos_y+262,80,80)
    
    //visible branches right
    fill(139,69,19)
    noStroke();
    ellipse(t_deadtree.treePos_x+122,t_deadtree.treePos_y+299,100)
    
    
    //clipping branmches right
    fill(100, 155, 255)
    noStroke();
    ellipse(t_deadtree.treePos_x+120,t_deadtree.treePos_y+279,100,100)
    
    
    
    //tree trunk
    fill(139,69,19)
    stroke(139,69,19)
    triangle(t_deadtree.treePos_x+41,t_deadtree.treePos_y+489,t_deadtree.treePos_x+61,t_deadtree.treePos_y+300,t_deadtree.treePos_x+91,t_deadtree.treePos_y+489)
    
    fill(205,133,63)
    triangle(t_deadtree.treePos_x+82,t_deadtree.treePos_y+489,t_deadtree.treePos_x+70,t_deadtree.treePos_y+358,t_deadtree.treePos_x+91,t_deadtree.treePos_y+489)
    
    
     //clipping top trunk
    fill(100, 155, 255)
    noStroke();
    ellipse(t_deadtree.treePos_x+61,t_deadtree.treePos_y+325,31)
    ellipse(t_deadtree.treePos_x+63,t_deadtree.treePos_y+304,15)
     
    pop();    
    
    
    
}


function drawBushes(t_tree)
{

    
    //second layer foliage right 2
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+168,t_tree.treePos_y+200,70)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+160,t_tree.treePos_y+195,70)
    
    //second layer foliage right 3
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+122,t_tree.treePos_y+152,70)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+118,t_tree.treePos_y+150,70)
    
 
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+42,t_tree.treePos_y+200,70)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+46,t_tree.treePos_y+198,65)
    
    //second layer foliage right 4
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+80,t_tree.treePos_y+145,80)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+85,t_tree.treePos_y+150,75)
    
    //middle foliage
    fill(0,t_tree.Col,0)
    ellipse(t_tree.treePos_x+103,t_tree.treePos_y+200,80)
    fill(0,128,0)
    ellipse(t_tree.treePos_x+103,t_tree.treePos_y+205,78)
}
//draws the flag pole
function drawFlagPole(t_flagPole)

{
    push();
    fill(105,105,105)
    rect(t_flagPole.flagPole_x, t_flagPole.flagPole_y, 5,237)
    fill(128,128,128)
    rect(t_flagPole.flagPole_x,t_flagPole.flagPole_y,2,237)
    rect(t_flagPole.flagPole_x+5,t_flagPole.flagPole_y,2,237)
    
    pop();
    
}
//draws the flag.
function drawFlag(t_flag)

{
    push();
    fill(255,0,0)
    triangle(t_flag.flag_x, t_flag.flag_y, t_flag.flag_x, t_flag.flag_y+20, t_flag.flag_x+30, t_flag.flag_y+10)
    pop();
}



// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{



    fill(90,90,90);
    rect(t_canyon.x_pos,floorPos_y,t_canyon.width,floorPos_y);
    fill(50,50,50);
    rect(t_canyon.x_pos + 20, floorPos_y + 1, t_canyon.width-40, floorPos_y);

}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if(gameChar_world_x >= t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos+t_canyon.width && gameChar_y >= floorPos_y)
        {
            isPlummeting = true; //falls down a canyon
            minHeight = 2000; //sets how fall the char can fall
            gravitySpeed += 5; //makes falling faster
            isLeft = false; //stops player from being able to move left and right
            isRight = false;
            isFalling = false; //stops player from being able to jump
        }
        else
            {
                isPlummeting = false; //false if not falling down a canyon
            }
    if(gameChar_y > floorPos_y)
        {
            isPlummeting = true; //if character is below the floor, it is plummeting    
        }

}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{


    //Gem
    //top middle
    fill(240,128,128)
    quad(t_collectable.gem_x+10,t_collectable.gem_y+113,t_collectable.gem_x+13,t_collectable.gem_y+113,t_collectable.gem_x+16,t_collectable.gem_y+119,t_collectable.gem_x+7,t_collectable.gem_y+119)
    //topleft
    fill(255,192,203)
    quad(t_collectable.gem_x+13,t_collectable.gem_y+113,t_collectable.gem_x+16,t_collectable.gem_y+113,t_collectable.gem_x+21,t_collectable.gem_y+119,t_collectable.gem_x+16,t_collectable.gem_y+119)
    //topright
    fill(255,0,0)
    quad(t_collectable.gem_x+5,t_collectable.gem_y+113,t_collectable.gem_x+10,t_collectable.gem_y+113,t_collectable.gem_x+7,t_collectable.gem_y+119,t_collectable.gem_x,t_collectable.gem_y+119)
    //bottom middle
    triangle(t_collectable.gem_x+7,t_collectable.gem_y+119,t_collectable.gem_x+15,t_collectable.gem_y+119,t_collectable.gem_x+11,t_collectable.gem_y+132)
    //bottomright
    fill(178,34,34)
    triangle(t_collectable.gem_x+15,t_collectable.gem_y+119,t_collectable.gem_x+21,t_collectable.gem_y+119,t_collectable.gem_x+11,t_collectable.gem_y+132)
    //bottomleft
    fill(220,20,60)
    triangle(t_collectable.gem_x,t_collectable.gem_y+119,t_collectable.gem_x+7,t_collectable.gem_y+119,t_collectable.gem_x+11,t_collectable.gem_y+132)
    //toprefractright
    fill(139,0,0)
   
   

}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    
        
    distance = dist(t_collectable.gem_x,t_collectable.gem_y,gameChar_world_x,gameChar_y);
        
    
    if (distance > 132 && distance < 135 && gameChar_y == floorPos_y)//checks distance between collectable and game character.
        {
           
                t_collectable.isFound = true;
                gameScore = gameScore + 100;
                playGemMusic();
            
                
        }
     
    
    
}

//function to check if flagpole has been found

function checkFlag(t_flagpole)
{
    score = gameScore;
    flagPoleDistance = dist(t_flagpole.flagPole_x,t_flagpole.flagPole_y+t_flagpole.flagPole_y, gameChar_world_x, gameChar_y);
    
    if (gameScore > 999 && flagPoleDistance < 50)
        {
            flagPole.isFound = true;
        }  
    
}


//class system to load sounds. Note: when trying to load music files in preload(), it wasn't
//working. 

class SoundManager
{
    constructor()
    {
       
        this.BGM = loadSound('Assets/Sounds/music1.wav')
        this.BGM2 = loadSound('Assets/Sounds/music2.mp3')
        this.Chime = loadSound('Assets/Sounds/chime1.mp3')
        this.Chime2 = loadSound('Assets/Sounds/chime2.mp3')
        this.Chime3 = loadSound('Assets/Sounds/chime3.mp3')
        this.Jump1 = loadSound('Assets/Sounds/jump1.mp3')
        this.Jump2 = loadSound('Assets/Sounds/jump2.mp3')
        this.Jump3 = loadSound('Assets/Sounds/jump3.mp3')
        this.Flap = loadSound('Assets/Sounds/flap.mp3')
        this.death = loadSound('Assets/Sounds/pain.mp3')
    
        this.Chime.setVolume(0.05);
        this.Chime2.setVolume(0.05);
    }
    
}

//plays random sound effect when collecting a collectable.
function playGemMusic()
{
    random1 = random(0,10);
    
    
    

    if (random1 > 0 && random1 < 3)
            {
                sounds.Chime.play();
               
            }
    else if (random1 > 3 && random1 < 6)
    {
        sounds.Chime2.play();
        
    }
    else if (random1 > 6 && random1 < 10)
    {
        sounds.Chime3.play();
        
    }
    
}

//plays random sounds effect when jumping.
function jumpSound() 

{
    random1 = random(0,10);
    
    
    

    if (random1 > 0 && random1 < 6)
            {
                sounds.Jump1.play();
               
            }

    else if (random1 > 6 && random1 < 10)
    {
        sounds.Jump3.play();
        
    }
    
}

//function to draw the enemies
function drawEnemies(t_enemy)
{
    
    
    push();
    fill(200,200,200)
    ellipse(t_enemy.enemy_x,t_enemy.enemy_y,10,10)
    
    fill(200,200,200)
    //ellipse(t_enemy.enemy_x-10,t_enemy.enemy_y,20,7)
    fill(200,200,200)
    triangle(t_enemy.enemy_x,t_enemy.enemy_y,t_enemy.enemy_x-15, t_enemy.enemy_y-8,t_enemy.enemy_x-15,t_enemy.enemy_y-15)
    triangle(t_enemy.enemy_x,t_enemy.enemy_y,t_enemy.enemy_x+15, t_enemy.enemy_y+8,t_enemy.enemy_x+15,t_enemy.enemy_y+15)
    triangle(t_enemy.enemy_x,t_enemy.enemy_y,t_enemy.enemy_x+15, t_enemy.enemy_y-8,t_enemy.enemy_x+15,t_enemy.enemy_y-15)
    triangle(t_enemy.enemy_x,t_enemy.enemy_y,t_enemy.enemy_x-15, t_enemy.enemy_y+8,t_enemy.enemy_x-13,t_enemy.enemy_y+15)
    fill(255,255,255)
    ellipse(t_enemy.enemy_x,t_enemy.enemy_y,7,7)
    triangle(t_enemy.enemy_x,t_enemy.enemy_y,t_enemy.enemy_x-14, t_enemy.enemy_y-9,t_enemy.enemy_x-14,t_enemy.enemy_y-13)
    triangle(t_enemy.enemy_x,t_enemy.enemy_y,t_enemy.enemy_x+14, t_enemy.enemy_y+9,t_enemy.enemy_x+14,t_enemy.enemy_y+13)
    triangle(t_enemy.enemy_x,t_enemy.enemy_y,t_enemy.enemy_x+14, t_enemy.enemy_y-10,t_enemy.enemy_x+13,t_enemy.enemy_y-12)
    triangle(t_enemy.enemy_x,t_enemy.enemy_y,t_enemy.enemy_x-14, t_enemy.enemy_y+8,t_enemy.enemy_x-13,t_enemy.enemy_y+12) 
 
    pop();
    
}
    

//function to move the enemies vertically.
function moveEnemies2(t_enemy)
{
    
   
    
    if (sideways2 < 200 && control2 == true)
         {
             t_enemy.enemy_y = t_enemy.enemy_y + 0.3;
             sideways2 = sideways2 + 1;
             fill(240,230,140)
             ellipse(t_enemy.enemy_x, t_enemy.enemy_y, 8)
             fill('rgba(255,255,0,0.1)')
             ellipse(t_enemy.enemy_x, t_enemy.enemy_y, 20)
             
             
             
         }
    if (sideways2 == 200)
        {
            control2 = false;    
        }
    if (control2 == false)
        {
            t_enemy.enemy_y = t_enemy.enemy_y -0.3;
            sideways2 = sideways2 -1;
            
            
        }
    if (sideways2 < 0)
        {
            control2 = true;
        }
    
    
    
    

}
//function that allows the enemy to chase the player when it is close.
function enemyDetection(t_enemy)
{
    
    distance = dist(t_enemy.enemy_x,t_enemy.enemy_y,gameChar_world_x,gameChar_y);

    value = difficultySlider.value();
    
    if (distance > 10 && distance <30)//checks distance between enemy and game character.
        {
           
                lives = lives -1;
                gameChar_x = 100;
                scrollPos = 0;
                gameChar_world_x = 0;
                t_enemy.enemy_x -= 1;
                sounds.death.play();
            
                
        }
    if (distance >0 && distance < 300 && gameChar_world_x < t_enemy.enemy_x)
        {
            t_enemy.enemy_x = t_enemy.enemy_x - value;
        }
    if (distance >0 && distance < 300 && gameChar_world_x > t_enemy.enemy_x)
        {
            t_enemy.enemy_x = t_enemy.enemy_x + value;
        }
    
    
}
//draws the sun
function sun()
{
    fill(255,255,0)
    ellipse(159,133,50)
    fill('rgba(255,255,0,0.1)')
    ellipse(159,133,100)
    fill('rgba(255,255,0,0.08)')
    ellipse(159,133,150)
}

