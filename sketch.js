/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here https://freesound.org/

*/

//ADDED SOUND AND PLATFORMS
//GAME PROJECT - PART 7

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees;
var collectable;
var canyon;
var cloud;
var mountain;

var game_score;
var flagpole;
var lives;
var token;

var jumpSound;
var plummetSound;
var enemySound;

var platforms;

var enemies;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/Jet.mp3');
	jumpSound.setVolume(0.1);
	plummetSound = loadSound('assets/Plummet.mp3');
	plummetSound.setVolume(1);
	enemySound = loadSound('assets/Boom.mp3');
    enemySound.setVolume(1);
}


function setup()
{
    createCanvas(1024, 576);
    floorPos_y = height * 3/4;
	lives = 3;
	startGame();
}
function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
	
	//Trees
	trees = 
	[
		{xpos : 0,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : -200,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : -400,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : -600,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : -800,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : -1000,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : 200,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : 400,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : 700,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : 900,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : 1100,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : 1400,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : 1600,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : 1800,ypos: floorPos_y - 144,width: 80, height: 80},
		{xpos : 2000,ypos: floorPos_y - 144,width: 80, height: 80},
	]

	//Collectable Item
	collectable =
	[
		{x_pos: -150, y_pos: 100, size: 50, isFound: false},
		{x_pos: -350, y_pos: 100, size: 50, isFound: false},
		{x_pos: -600, y_pos: 100, size: 50, isFound: false},
		{x_pos: -750, y_pos: 100, size: 50, isFound: false},
		{x_pos: -1200, y_pos: 100, size: 50, isFound: false},
		{x_pos: -1400, y_pos: 100, size: 50, isFound: false},
		{x_pos: 450, y_pos: 100, size: 50, isFound: false},
		{x_pos: 600, y_pos: 100, size: 50, isFound: false},
		{x_pos: 900, y_pos: 100, size: 50, isFound: false},
		{x_pos: 1200, y_pos: 100, size: 50, isFound: false},
		{x_pos: 1300, y_pos: 100, size: 50, isFound: false},
		{x_pos: 1500, y_pos: 100, size: 50, isFound: false},
		{x_pos: 1800, y_pos: 100, size: 50, isFound: false},
	];

	//Canyon
	canyon =
	[
		{x_pos: -380,y_pos: floorPos_y,width: 100,height: 100},
		{x_pos: -830,y_pos: floorPos_y,width: 100,height: 100},
		{x_pos: -1200,y_pos: floorPos_y,width: 100,height: 100},
		{x_pos: 100,y_pos: floorPos_y,width: 100,height: 100},
		{x_pos: 480,y_pos: floorPos_y,width: 100,height: 100},
		{x_pos: 850,y_pos: floorPos_y,width: 100,height: 100},
		{x_pos: 1200,y_pos: floorPos_y,width: 100,height: 100},
		{x_pos: 1800,y_pos: floorPos_y,width: 100,height: 100},
	];

	//Clouds
	cloud =
	[
		{xpos:-170,ypos:100, width: 1.5, height: 1.0},
		{xpos:-470,ypos:100, width: 1.5, height: 1.0},
		{xpos:-770,ypos:100, width: 1.5, height: 1.0},
		{xpos:-1070,ypos:100, width: 1.5, height: 1.0},
		{xpos:-1370,ypos:100, width: 1.5, height: 1.0},
		{xpos:170,ypos:100, width: 1.5, height: 1.0},
		{xpos:470,ypos:100, width: 1.5, height: 1.0},
		{xpos:770,ypos:100, width: 1.5, height: 1.0},
		{xpos:1070,ypos:100, width: 1.5, height: 1.0},
		{xpos:1370,ypos:100, width: 1.5, height: 1.0},
		{xpos:1570,ypos:100, width: 1.5, height: 1.0},
		{xpos:1870,ypos:100, width: 1.5, height: 1.0}
	];

	//Mountains
	mountain =
	[
		{xpos:-80,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:-380,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:-680,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:-980,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:-1280,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:80,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:380,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:680,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:980,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:1280,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:1580,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:1880,ypos: floorPos_y - 160, width: 1.0, height: 1.0},
		{xpos:2200,ypos: floorPos_y - 160, width: 1.0, height: 1.0}
	];

	game_score = 0;

	flagpole = {isReached: false,x_pos: 2400};

	token = 
	[
		{xpos:20},
		{xpos:50},
		{xpos:80},
	];

	platforms = [];

	platforms.push(createPlatforms(130,floorPos_y - 100,100));
	platforms.push(createPlatforms(800,floorPos_y - 100,100));
	platforms.push(createPlatforms(-830,floorPos_y - 100,100));
	platforms.push(createPlatforms(-1100,floorPos_y - 100,100));
	platforms.push(createPlatforms(-350,floorPos_y - 100,100));



	enemies = [];
	enemies.push(new Enemy(680,floorPos_y - 10,100));
	enemies.push(new Enemy(780,floorPos_y - 100,100));
	enemies.push(new Enemy(1100,floorPos_y - 10,100));
	enemies.push(new Enemy(1500,floorPos_y - 10,100));
	enemies.push(new Enemy(-580,floorPos_y - 10,100));
	enemies.push(new Enemy(-900,floorPos_y - 10,100));
	enemies.push(new Enemy(-1400,floorPos_y - 10,100));
}

function draw()
{
	background(100, 155, 255); // fill the sky blue
	noStroke();
	fill(209,178,52); // Different color background
	rect(0, floorPos_y, width, height/4); // draw some green ground
	
	push();
	translate(scrollPos,0);

	// Draw clouds.
	drawClouds()

	// Draw mountains.
	drawMountain(); 

	// Draw trees.
	drawTrees();

	// Draw canyons.
	for(var j = 0;j < canyon.length;j++)
	{
		drawCanyon(canyon[j]);
		if(isPlummeting == false)
		{
			checkCanyon(canyon[j]);
		}
	}

	renderFlagpole();

	//Draw platforms
	for(var i=0;i<platforms.length;i++)
	{
		platforms[i].draw();
	}

	// Draw collectable items.
	for(var i =0;i<collectable.length;i++)
	{
		if(collectable[i].isFound == false)
		{
			drawCollectable(collectable[i]);
			checkCollectable(collectable[i]);
		}
	}

	for(var i=0;i<enemies.length; i++)
	{
		enemies[i].draw();
		var isContact = enemies[i].checkContact(gameChar_world_x,gameChar_y)
		if(isContact == true)
		{
			if(lives > 0)
			{
				enemySound.play();
				lives -=1
				startGame();
				break;
			}
		}
	}
	pop();

	// Draw game character.
	
	drawGameChar();

	fill(255);
	noStroke();
	textSize(15)
	text("Score : " + game_score,20,20);
	textSize(1)

	lifeToken();

	if (lives<abs(token.length))
	{
		token.length -=1
	}

	if(lives < 1)
	{
		push();
		fill(0);
		textSize(30);
		text("Game Over.  Press space to continue.",width/2 - 100,height/4);
		pop();
		if(keyCode == 32)
		{
			startGame();
			lives = 3;
		}
		return;	
	}

	else if (flagpole.isReached)
	{
		push();
		fill(0);
		textSize(30);
		text("Level complete. Press space to continue.", width/2 - 100,height/4);
		pop();
		if(keyCode == 32)
		{
			startGame();
			lives = 3;
		}
		else
		{
			//
		}	
		return;		
	}
	
	if(flagpole.isReached == false)
	{
		checkFlagpole();
	}
	
	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
	if(gameChar_y < floorPos_y)
	{
		var isContact = false;
		for(var i=0;i<platforms.length;i++)
		{
			if(platforms[i].checkContact(gameChar_world_x,gameChar_y) == true)
			{
				isContact = true;
				break;
			}
		}
		if(isContact == false)
		{
			gameChar_y += 8;
			isFalling = true;
		}
	}

	else
	{
		isFalling = false;
	}

	//Character is Plummeting
	if(isPlummeting == true)
	{
		gameChar_y += 15;
	}

	checkPlayerDie();

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

}

// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
    //Goes Left after pressing "LEFT KEY"
	if (keyCode == 37)
	{
		isLeft = true;
	}

	//Goes Right after pressing "RIGHT KEY"
	else if(keyCode == 39)
	{

		isRight = true;
	}

	// Jumps when pressed "SPACEBAR"
	else if (keyCode == 32)
	{
		//Character will Jump
		if(gameChar_y == floorPos_y)
		{

            gameChar_y -= 100;
            jumpSound.play();
		}
	}
}

function keyReleased()
{
	//after releasing "LEFT KEY"
	if (keyCode == 37)
	{

		isLeft = false;
	}

	//after releasing "RIGHT KEY"
	else if(keyCode == 39)
	{
		isRight = false;
	}

	//after releasing "SPACEBAR"
	else if (keyCode == 32)
	{
		//
	}
}

function drawGameChar()
{
	if(isLeft && isFalling)
	{
		fill(0,0,0);
		stroke(0,0,0);
		gameChar_y -=4;

		// Arms
		fill(139,0,0);
		rect(gameChar_x - 20,gameChar_y - 32,20,5,10); // Left Hand
		fill(0,0,0);
		rect(gameChar_x - 16,gameChar_y - 32,4,4,10); // Black Band - Left	
		
		// Legs
		fill(0,0,0);
		rect(gameChar_x - 9,gameChar_y - 14,4,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x - 7,gameChar_y - 3,8,8,100); // Left Wheel
		fill(0,0,0);
		rect(gameChar_x + 2,gameChar_y - 14,4,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x + 5,gameChar_y - 3,8,8,100); // Left Wheel

		// Body of the Character
		fill(255,127,80);
		rect(gameChar_x - 10,gameChar_y - 40,18,30,20,10); // Main Body
		fill(0,0,0,90);
		rect(gameChar_x - 10,gameChar_y - 40,10,15,15,10); // Black suit color shade
		fill(255,0,0);
		rect(gameChar_x - 10,gameChar_y - 19,18,3); // Belt of the Character

		//Jetpack
		fill(119,136,153);
		ellipse(gameChar_x + 10,gameChar_y - 16,8); // Rocket Right
		fill(184,134,11);
		rect(gameChar_x + 4,gameChar_y - 33,10,15); // jetpack
		fill(0,255,0);
		rect(gameChar_x + 4,gameChar_y - 26,10,3);
		stroke(255,0,0);
		line(gameChar_x + 20,gameChar_y -1,gameChar_x + 13,gameChar_y -14); // fly action 1
		line(gameChar_x + 15,gameChar_y -1,gameChar_x + 11,gameChar_y -13); // fly action 2 	
		line(gameChar_x + 11,gameChar_y -1,gameChar_x + 9,gameChar_y -12); // fly action 1 left
		stroke(0,0,0);

		//Arms 
		fill(139,0,0);
		rect(gameChar_x - 20,gameChar_y - 29,20,5,10); // Right Hand
		fill(0,0,0);
		rect(gameChar_x - 16,gameChar_y - 29,4,4,10); // Black Band - Right

		// Head of the Character
		fill(255,165,0);
		ellipse(gameChar_x,gameChar_y - 50,25,35); // Main Head
		fill(255,140,0);
		ellipse(gameChar_x + 7,gameChar_y - 50,11,20); // Left Earphone
		fill(139,0,0);
		rect(gameChar_x + 7,gameChar_y - 70,2,19); // Left Antenna
		fill(211,25,25);
		ellipse(gameChar_x + 8,gameChar_y - 68,5); // Left Antenna Top
		fill(0,0,0);
		ellipse(gameChar_x - 7,gameChar_y - 50,15,30); // Glass
		fill(220,220,255,90);
		ellipse(gameChar_x - 10,gameChar_y - 50,6,9); // Helmet Shade
		noStroke();
	}

	else if(isRight && isFalling)
	{
		fill(0,0,0);
		stroke(0,0,0);
		gameChar_y -=4;

		// Arms
		fill(139,0,0);
		rect(gameChar_x - 3,gameChar_y - 32,20,5,10); // Left Hand
		fill(0,0,0);
		rect(gameChar_x + 8,gameChar_y - 32,4,4,10); // Black Band - Left	
		
		// Legs
		fill(0,0,0);
		rect(gameChar_x - 9,gameChar_y - 14,4,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x - 7,gameChar_y - 3,8,8,100); // Left Wheel
		fill(0,0,0);
		rect(gameChar_x + 2,gameChar_y - 14,4,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x + 5,gameChar_y - 3,8,8,100); // Left Wheel

		// Body of the Character
		fill(255,127,80);
		rect(gameChar_x - 10,gameChar_y - 40,18,30,20,10); // Main Body
		fill(0,0,0,90);
		rect(gameChar_x - 3,gameChar_y - 40,10,15,15,10); // Black suit color shade
		fill(255,0,0);
		rect(gameChar_x - 10,gameChar_y - 19,18,3); // Belt of the Character

		//Jetpack
		fill(119,136,153);
		ellipse(gameChar_x - 12,gameChar_y - 17,8); // Rocket Right
		fill(184,134,11);
		rect(gameChar_x - 18,gameChar_y - 34,10,16); // jetpack
		fill(0,255,0);
		rect(gameChar_x - 18,gameChar_y - 27,10,3);
		stroke(255,0,0);
		line(gameChar_x - 24,gameChar_y - 1,gameChar_x - 17,gameChar_y -14); // fly action 1
		line(gameChar_x - 19,gameChar_y,gameChar_x - 15,gameChar_y -13); // fly action 2 	
		line(gameChar_x - 15,gameChar_y - 1,gameChar_x - 13,gameChar_y -12); // fly action 1 left
		stroke(0,0,0);

		//Arms 
		fill(139,0,0);
		rect(gameChar_x - 3,gameChar_y - 29,20,5,10); // Right Hand
		fill(0,0,0);
		rect(gameChar_x + 8,gameChar_y - 29,4,4,10); // Black Band - Right

		// Head of the Character
		fill(255,165,0);
		ellipse(gameChar_x,gameChar_y - 50,25,35); // Main Head
		fill(255,140,0);
		ellipse(gameChar_x - 7,gameChar_y - 50,11,20); // Right Earphone
		fill(139,0,0);
		rect(gameChar_x - 9,gameChar_y - 70,2,19); // Right Antenna
		fill(211,25,25);
		ellipse(gameChar_x - 7.5,gameChar_y - 68,5); // Right Antenna Top
		fill(0,0,0);
		ellipse(gameChar_x + 7,gameChar_y - 50,15,30); // Glass
		fill(220,220,255,90);
		ellipse(gameChar_x + 10,gameChar_y - 50,6,9); // Helmet Shade
		noStroke();
	}

	else if(isLeft)
	{
		fill(0,0,0);
		stroke(0,0,0);

		// Arms
		fill(139,0,0);
		rect(gameChar_x - 20,gameChar_y - 32,20,5,10); // Left Hand
		fill(0,0,0);
		rect(gameChar_x - 16,gameChar_y - 32,4,4,10); // Black Band - Left	
		
		// Legs
		fill(0,0,0);
		rect(gameChar_x - 9,gameChar_y - 14,4,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x - 7,gameChar_y - 3,8,8,100); // Left Wheel
		fill(0,0,0);
		rect(gameChar_x + 2,gameChar_y - 14,4,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x + 5,gameChar_y - 3,8,8,100); // Left Wheel

		// Body of the Character
		fill(255,127,80);
		rect(gameChar_x - 10,gameChar_y - 40,18,30,20,10); // Main Body
		fill(0,0,0,90);
		rect(gameChar_x - 10,gameChar_y - 40,10,15,15,10); // Black suit color shade
		fill(255,0,0);
		rect(gameChar_x - 10,gameChar_y - 19,18,3); // Belt of the Character

		//Jetpack
		fill(119,136,153);
		ellipse(gameChar_x + 10,gameChar_y - 16,8); // Rocket Right
		fill(184,134,11);
		rect(gameChar_x + 4,gameChar_y - 33,10,15); // jetpack
		fill(0,255,0);
		rect(gameChar_x + 4,gameChar_y - 26,10,3);

		//Arms 
		fill(139,0,0);
		rect(gameChar_x - 20,gameChar_y - 29,20,5,10); // Right Hand
		fill(0,0,0);
		rect(gameChar_x - 16,gameChar_y - 29,4,4,10); // Black Band - Right

		// Head of the Character
		fill(255,165,0);
		ellipse(gameChar_x,gameChar_y - 50,25,35); // Main Head
		fill(255,140,0);
		ellipse(gameChar_x + 7,gameChar_y - 50,11,20); // Left Earphone
		fill(139,0,0);
		rect(gameChar_x + 7,gameChar_y - 70,2,19); // Left Antenna
		fill(211,25,25);
		ellipse(gameChar_x + 8,gameChar_y - 68,5); // Left Antenna Top
		fill(0,0,0);
		ellipse(gameChar_x - 7,gameChar_y - 50,15,30); // Glass
		fill(220,220,255,90);
		ellipse(gameChar_x - 10,gameChar_y - 50,6,9); // Helmet Shade
		noStroke();
	}

	else if(isRight)
	{
		fill(0,0,0);
		stroke(0,0,0);

		// Arms
		fill(139,0,0);
		rect(gameChar_x - 3,gameChar_y - 32,20,5,10); // Left Hand
		fill(0,0,0);
		rect(gameChar_x + 8,gameChar_y - 32,4,4,10); // Black Band - Left	
		
		// Legs
		fill(0,0,0);
		rect(gameChar_x - 9,gameChar_y - 14,4,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x - 7,gameChar_y - 3,8,8,100); // Left Wheel
		fill(0,0,0);
		rect(gameChar_x + 2,gameChar_y - 14,4,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x + 5,gameChar_y - 3,8,8,100); // Left Wheel

		// Body of the Character
		fill(255,127,80);
		rect(gameChar_x - 10,gameChar_y - 40,18,30,20,10); // Main Body
		fill(0,0,0,90);
		rect(gameChar_x - 3,gameChar_y - 40,10,15,15,10); // Black suit color shade
		fill(255,0,0);
		rect(gameChar_x - 10,gameChar_y - 19,18,3); // Belt of the Character

		//Jetpack
		fill(119,136,153);
		ellipse(gameChar_x - 12,gameChar_y - 17,8); // Rocket Right
		fill(184,134,11);
		rect(gameChar_x - 18,gameChar_y - 34,10,16); // jetpack
		fill(0,255,0);
		rect(gameChar_x - 18,gameChar_y - 27,10,3);

		//Arms 
		fill(139,0,0);
		rect(gameChar_x - 3,gameChar_y - 29,20,5,10); // Right Hand
		fill(0,0,0);
		rect(gameChar_x + 8,gameChar_y - 29,4,4,10); // Black Band - Right

		// Head of the Character
		fill(255,165,0);
		ellipse(gameChar_x,gameChar_y - 50,25,35); // Main Head
		fill(255,140,0);
		ellipse(gameChar_x - 7,gameChar_y - 50,11,20); // Right Earphone
		fill(139,0,0);
		rect(gameChar_x - 9,gameChar_y - 70,2,19); // Right Antenna
		fill(211,25,25);
		ellipse(gameChar_x - 7.5,gameChar_y - 68,5); // Right Antenna Top
		fill(0,0,0);
		ellipse(gameChar_x + 7,gameChar_y - 50,15,30); // Glass
		fill(220,220,255,90);
		ellipse(gameChar_x + 10,gameChar_y - 50,6,9); // Helmet Shade
		noStroke();
	}

	else if(isFalling || isPlummeting)
	{
		fill(0,0,0);
		gameChar_y -=3;

		//Jetpack
		stroke(0,0,0);
		fill(119,136,153);
		ellipse(gameChar_x - 12,gameChar_y - 12,8); // Rocket Left
		fill(119,136,153);
		ellipse(gameChar_x + 13,gameChar_y - 12,8); // Rocket Right
		stroke(255,0,0);
		line(gameChar_x - 19,gameChar_y - 1,gameChar_x - 15,gameChar_y -9); // fly action 1 left
		line(gameChar_x - 16,gameChar_y,gameChar_x - 10,gameChar_y -9); // fly action 2 left	
		line(gameChar_x + 19,gameChar_y - 1,gameChar_x + 15,gameChar_y -9); // fly action right
		line(gameChar_x + 16,gameChar_y,gameChar_x + 10,gameChar_y -9); // fly action 2 Right
		stroke(0,0,0);
		fill(184,134,11);
		rect(gameChar_x - 17,gameChar_y - 33,35,20); // jetpack

		// Legs
		fill(0,0,0);
		rect(gameChar_x - 9,gameChar_y - 12,7,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x - 5,gameChar_y - 1,6,8,100); // Left Wheel
		fill(0,0,0);
		rect(gameChar_x + 3,gameChar_y - 12,7,10,100);// Right Leg
		fill(255,140,0);
		ellipse(gameChar_x + 7,gameChar_y - 1,6,8,100); // Right Wheel

		// Body of the Character
		fill(255,127,80);
		rect(gameChar_x - 12,gameChar_y - 40,25,30,20,10); // Main Body
		fill(0,0,0,90);
		rect(gameChar_x - 9.5,gameChar_y - 40,20,20,20,10); // Black suit color shade
		fill(255,0,0);
		rect(gameChar_x - 12,gameChar_y - 19,25,3); // Belt of the Character

		
		// Head of the Character
		fill(255,165,0);
		ellipse(gameChar_x,gameChar_y - 50,40); // Main Head
		fill(139,0,0);
		rect(gameChar_x - 18,gameChar_y - 70,2,19); // Right Antenna
		fill(211,25,25);
		ellipse(gameChar_x - 17,gameChar_y - 70,5); // Right  Antenna Top
		fill(255,140,0);
		ellipse(gameChar_x - 15,gameChar_y - 50,11,25); // Right Earphone
		fill(139,0,0);
		rect(gameChar_x + 16,gameChar_y - 70,2,19); // Left Antenna
		fill(211,25,25);
		ellipse(gameChar_x + 18,gameChar_y - 70,5); // Left Antenna Top
		fill(255,140,0);
		ellipse(gameChar_x + 15,gameChar_y - 50,11,25); // Left Earphone
		fill(0,0,0);
		ellipse(gameChar_x,gameChar_y - 50,30); // Glass
		fill(220,220,255,90);
		ellipse(gameChar_x + 7,gameChar_y - 50,6,9); // Helmet Shade

		// Arms
		fill(139,0,0);
		rect(gameChar_x - 16,gameChar_y - 42,5,20,10); // Left Hand
		fill(0,0,0);
		rect(gameChar_x - 16,gameChar_y - 33,5,6,10); // Black Band - Left
		fill(139,0,0);
		rect(gameChar_x + 12,gameChar_y - 42,5,20,10); // Right Hand
		fill(0,0,0);
		rect(gameChar_x + 12,gameChar_y - 33,5,6,10); // Black Band - Right
		noStroke();
	}

	else

	{
		fill(0,0,0);

		//Jetpack

		stroke(0,0,0);
		fill(119,136,153);
		ellipse(gameChar_x - 12,gameChar_y - 12,8); // Rocket Left
		fill(119,136,153);
		ellipse(gameChar_x + 13,gameChar_y - 12,8); // Rocket Right
		fill(184,134,11);
		rect(gameChar_x - 17,gameChar_y - 33,35,20); // jetpack
		

		// Arms
		fill(139,0,0);
		rect(gameChar_x - 16,gameChar_y - 32,5,20,10); // Left Hand
		fill(0,0,0);
		rect(gameChar_x - 16,gameChar_y - 23,5,6,10); // Black Band - Left
		fill(139,0,0);
		rect(gameChar_x + 12,gameChar_y - 32,5,20,10); // Right Hand
		fill(0,0,0);
		rect(gameChar_x + 12,gameChar_y - 23,5,6,10); // Black Band - Right

		// Legs
		fill(0,0,0);
		rect(gameChar_x - 9,gameChar_y - 12,7,10,100);// Left Leg
		fill(255,140,0);
		ellipse(gameChar_x - 5,gameChar_y - 1,6,8,100); // Left Wheel
		fill(0,0,0);
		rect(gameChar_x + 3,gameChar_y - 12,7,10,100);// Right Leg
		fill(255,140,0);
		ellipse(gameChar_x + 7,gameChar_y - 1,6,8,100); // Right Wheel

		// Body of the Character
		fill(255,127,80);
		rect(gameChar_x - 12,gameChar_y - 40,25,30,20,10); // Main Body
		fill(0,0,0,90);
		rect(gameChar_x - 9.5,gameChar_y - 40,20,20,20,10); // Black suit color shade
		fill(255,0,0);
		rect(gameChar_x - 12,gameChar_y - 19,25,3); // Belt of the Character
		
		// Head of the Character
		fill(255,165,0);
		ellipse(gameChar_x,gameChar_y - 50,40); // Main Head
		fill(139,0,0);
		rect(gameChar_x - 18,gameChar_y - 70,2,19); // Right Antenna
		fill(211,25,25);
		ellipse(gameChar_x - 17,gameChar_y - 70,5); // Right  Antenna Top
		fill(255,140,0);
		ellipse(gameChar_x - 15,gameChar_y - 50,11,25); // Right Earphone
		fill(139,0,0);
		rect(gameChar_x + 16,gameChar_y - 70,2,19); // Left Antenna
		fill(211,25,25);
		ellipse(gameChar_x + 18,gameChar_y - 70,5); // Left Antenna Top
		fill(255,140,0);
		ellipse(gameChar_x + 15,gameChar_y - 50,11,25); // Left Earphone
		fill(0,0,0);
		ellipse(gameChar_x,gameChar_y - 50,30); // Glass
		fill(220,220,255,90);
		ellipse(gameChar_x + 7,gameChar_y - 50,6,9); // Helmet Shade
		noStroke();
	}

}

// ---------------------------
// Background render functions
// ---------------------------

function drawClouds()
{
	for(var c = 0 ;c < cloud.length;c++)
	{
		fill(255,255,255);
		ellipse(
			cloud[c].xpos,
			cloud[c].ypos,
			60*cloud[c].width,
			50*cloud[c].height);
		ellipse(
			cloud[c].xpos + 10 * cloud[c].width,
			cloud[c].ypos + 20,
			60*cloud[c].width,
			50*cloud[c].height);
		ellipse(
			cloud[c].xpos + 30 * cloud[c].width,
			cloud[c].ypos,
			60*cloud[c].width,
			50*cloud[c].height);
		ellipse(
			cloud[c].xpos + 40 * cloud[c].width,
			cloud[c].ypos + 10,
			60*cloud[c].width,
			50*cloud[c].height);
		ellipse(
			cloud[c].xpos + 70 * cloud[c].width,
			cloud[c].ypos + 30,
			80*cloud[c].width,
			50*cloud[c].height);
		ellipse(
			cloud[c].xpos + 75 * cloud[c].width,
			cloud[c].ypos,
			60*cloud[c].width,
			50*cloud[c].height);
		ellipse(
			cloud[c].xpos + 70 * cloud[c].width,
			cloud[c].ypos + 20,
			60*cloud[c].width,
			50*cloud[c].height);
	}
}

function drawMountain()
{
	for (var m = 0;m<mountain.length;m++)
	{
		fill(150,150,150);
		triangle(
			mountain[m].xpos + 190,mountain[m].ypos + 160, // right bottom
			mountain[m].xpos + 190 - 70*mountain[m].width,mountain[m].ypos + 160 - 120*mountain[m].height, // Top
			mountain[m].xpos + 20,mountain[m].ypos + 160); //left bottom
		triangle(
			mountain[m].xpos + 190,mountain[m].ypos + 160, // right bottom
			mountain[m].xpos + 190 + 60*mountain[m].width,mountain[m].ypos + 160 - 120*mountain[m].height, // Top
			mountain[m].xpos + 320,mountain[m].ypos + 160); //left bottom
		triangle(
			mountain[m].xpos + 100,mountain[m].ypos + 160, //right bottom
			mountain[m].xpos + 190 - 10*mountain[m].width,mountain[m].ypos - 160 +100*mountain[m].height, // Top
			mountain[m].xpos + 270,mountain[m].ypos + 160); // Left Bottom
	}
}

function drawTrees()
{
	for(var i = 0;i < trees.length;i++)
	{
		noStroke();
		fill(100,0,0);
		rect(trees[i].xpos,trees[i].ypos,trees[i].width - 60,trees[i].width + 68); // trunk
		fill(25,160,10);
		ellipse(trees[i].xpos + 34,trees[i].ypos,trees[i].width,trees[i].height);
		fill(25,160,10);
		ellipse(trees[i].xpos - 10,trees[i].ypos,trees[i].width,trees[i].height);
		fill(25,160,10);
		ellipse(trees[i].xpos + 10,trees[i].ypos - 38,trees[i].width,trees[i].height);
		stroke(0,255,0);
		fill(255,255,10,60);
		ellipse(trees[i].xpos + 10,trees[i].ypos - 29,trees[i].width + 100,trees[i].height + 100);
		noStroke();
	}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

function drawCanyon(t_canyon)
{
	fill(233,116,81);
	rect(
		t_canyon.x_pos+ 90,
		t_canyon.y_pos,
		t_canyon.width - 30,
		t_canyon.height + 55);
	fill(255,200,200);
	rect(
		t_canyon.x_pos+ 85,
		t_canyon.y_pos,
		t_canyon.width - 95,
		t_canyon.height + 55);
	fill(255,200,200);
	rect(
		t_canyon.x_pos+ 160,
		t_canyon.y_pos,
		t_canyon.width - 95,
		t_canyon.height + 55);
	fill(100,0,0);
	triangle(
		t_canyon.x_pos+ 90,
		t_canyon.y_pos + 90,
		t_canyon.x_pos+ 90,
		t_canyon.y_pos + 150,
		t_canyon.x_pos+ 140,
		t_canyon.y_pos + 140);
	triangle(
		t_canyon.x_pos+ 160,
		t_canyon.y_pos + 70,
		t_canyon.x_pos+ 90,
		t_canyon.y_pos + 140,
		t_canyon.x_pos+ 160,
		t_canyon.y_pos + 150);
	fill(255,0,0,100);
	triangle(
		t_canyon.x_pos+ 120,
		t_canyon.y_pos + 80,
		t_canyon.x_pos+ 90,
		t_canyon.y_pos + 145,
		t_canyon.x_pos+ 150,
		t_canyon.y_pos + 145);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
	if (gameChar_world_x > t_canyon.x_pos + 84 + 10
		&& gameChar_world_x < t_canyon.x_pos + 74 + t_canyon.width - 20
		&& gameChar_y >= floorPos_y)
	{
		isPlummeting = true;
		plummetSound.play();
	}
	else
	{
		isPlummeting = false;
	}
	
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

function drawCollectable(t_collectable)
{
	fill(200,100,10);
	stroke(0);
	rect(
		t_collectable.x_pos + 190,
		t_collectable.y_pos + 320,
		t_collectable.size*0.6,
		t_collectable.size*0.38);
	fill(250,150,1);
	ellipse(
		t_collectable.x_pos + 190 + 15*t_collectable.size/50,
		t_collectable.y_pos + 322,
		t_collectable.size*0.6,
		t_collectable.size*0.38);
	fill(255,0,0);
	ellipse(
		t_collectable.x_pos + 190 + 15*t_collectable.size/50,
		t_collectable.y_pos + 320,
		t_collectable.size*0.2,
		t_collectable.size*0.2);
	noStroke();
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
	if(dist(gameChar_world_x,gameChar_y,t_collectable.x_pos+180,t_collectable.y_pos+305) <= 28)
    {
		t_collectable.isFound = true;
		game_score +=1;
    }
}

function renderFlagpole()
{
	push();
	strokeWeight(5);
	stroke(180,100,255);
    line(flagpole.x_pos,floorPos_y,flagpole.x_pos,floorPos_y - 250);
    pop();
	fill(175,125,55);
	noStroke();
	if(flagpole.isReached)
	{
		rect(flagpole.x_pos,floorPos_y - 250,50,50);
	}
	else
	{
		rect(flagpole.x_pos,floorPos_y - 50,50,50);
	}
}

function checkFlagpole()
{
	var d = abs(gameChar_world_x - flagpole.x_pos);

	if (d < 15)
	{
		flagpole.isReached = true;
    }  
}

function checkPlayerDie()
{
	if(lives > 1)
	{
		if(gameChar_y > height)
		{
			lives -=1
			startGame();
		};
	}
	else if(lives = 1)
	{
		if(gameChar_y > height)
		{
			lives -=1
			game_score = 0
		}
	}	
}


function lifeToken()
{
	for (var t = 0;t<token.length;t++)
	{
		stroke(0)
		fill(139,0,0);
		rect(token[t].xpos,36,2,11); // Left Antenna
		fill(211,25,25);
		ellipse(token[t].xpos + 1,35,5); // Left Antenna Top
		fill(139,0,0);
		rect(token[t].xpos + 18,36,2,11); // Left Antenna
		fill(211,25,25);
		ellipse(token[t].xpos + 20,35,5); // Left Antenna Top
		fill(255,165,0);
		ellipse(token[t].xpos + 10,50,24,24); // Main Head
		fill(255,140,0);
		ellipse(token[t].xpos,50,5,14); // Left Earphone
		fill(255,140,0);
		ellipse(token[t].xpos + 20,50,5,14); // Right Earphone
		fill(0,0,0);
		ellipse(token[t].xpos + 10,50,18,18); // Glass
		fill(220,220,255,90);
		ellipse(token[t].xpos + 15,50,4,9); // Helmet Shade
		noStroke();
	}
}

function createPlatforms(x,y,length)
{
	var p = {
		x: x,
		y: y,
		length:length,
		draw: function()
		{
			fill(255);
			rect(this.x,this.y,this.length,20,20);
			fill(180,20,100)
			ellipse(this.x + 20, this.y + 10,19)
			ellipse(this.x + 40, this.y + 10,19)
			ellipse(this.x + 60, this.y + 10,19)
			ellipse(this.x + 80, this.y + 10,19)
		},
		checkContact: function(gc_x,gc_y)
		{
			if(gc_x > this.x && gc_x < this.x + this.length)
			{
				var d = this.y - gc_y;
				if(d >= 0 && d < 5)
				{
					return true;
				}
			}
			return false;
		}
	}
	return p;
}

function Enemy(x,y,range)
{
	this.x = x;
	this.y = y;
	this.range = range;


	this.currentX = x;
	this.inc = 1;

	this.update = function()
	{
		this.currentX += this.inc;

		if(this.currentX >= this.x + this.range)
		{
			this.inc = -1;
		}
		else if(this.currentX < this.x)
		{
			this.inc = 1;
		}
	};

	this.draw = function()
	{
		this.update();
		stroke(0)
		strokeWeight(1);
		fill(60,12,150);
		ellipse(this.currentX,this.y - 10,35,35);//Head
		fill(0)
		ellipse(this.currentX - 8,this.y - 10,10,12);//left eye
		fill(0)
		ellipse(this.currentX + 8,this.y - 10,10,12);//right eye
		noStroke();
	}
	this.checkContact = function(gc_x,gc_y)
	{
		var d = dist(gc_x,gc_y,this.currentX,this.y)
		if(d < 20)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}