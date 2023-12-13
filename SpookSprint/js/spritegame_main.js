/***********************************
 * INIT
 * **********************************/
let playerId = sessionStorage.getItem('playermodel');
let layer = sessionStorage.getItem('layer');
let mapId = sessionStorage.getItem('id');

let player = document.getElementById('player');
let spriteImg = document.getElementById('spriteImg');
let surface = document.getElementById('surface');

let youCanMoveOn = true;
let deathInterval;

// Scale the surface to 95% of the screen width
let surface_scale = 0.80 * (window.innerWidth / surface.clientWidth);
surface.style.transform = `scale(${surface_scale})`;


/***********************************
 * GAME CONFIG
 * **********************************/
let spriteImgNumber = 0; // current animation part of sprite image
let gameSpeed = 30; // game loop refresh rate (pictures per second)
let characterSpeed = 5; // move offset in PX
let distance = 0;


/***********************************
 * MAP AND CHARACTER HANDLING
 * **********************************/

let layerCount;

function loadLayers(layerCountMap, mapId) {
	layerCount = layerCountMap;
	let curLastEl = surface;
	for (let i = 1; i <= layerCountMap; ++i) {
		curLastEl = loadLayer(i, curLastEl, mapId);
	}

	/*let obstacleLayer = document.createElement('div');
	obstacleLayer.setAttribute('id', 'obstacleDiv');
	surface.appendChild(obstacleLayer);*/
}

if (layer == null) {
	layer = 7;
}

if (mapId == null) {
	mapId = 1;
}

if (playerId == null) {
	playerId = 2;
}
loadLayers(layer, mapId);

function loadLayer(i, curLastEl, mapId) {
	let newDiv = document.createElement('div');
	console.log(i + ' ' + layerCount);
	if (i == layer) {
		console.log('funkt');
		newDiv.setAttribute(`style`, `background-image : url('./pics/Maps/${mapId}_game_background/${i}.png');position : relative; background-size: cover; height: 11%; width: 100%; top: 405px; z-index : ${i};`);

	} else {
		newDiv.setAttribute(`style`, `background-image : url('./pics/Maps/${mapId}_game_background/${i}.png');position : relative; background-size  : 100% 100%; height: 100%; width: 100%; z-index : ${i};`);

	}

	newDiv.setAttribute('id', `background-layer${i}`);
	curLastEl.appendChild(newDiv);

	return newDiv;
}

/***********************************
 * MAKING SOME GRAVITY
 * **********************************/

/*work in progress (if I have time to make a better game ;))*/

/***********************************
 * EVENT LISTENER
 * **********************************/
document.onkeydown = keydown_detected;
document.onkeyup = keyup_detected;

let sKey = false;
let rightArrow = false;
let upArrow = false;
let qAttack = false;


function keydown_detected(e) {
	console.log(e);
	if (!e) {
		e = window.event; //Internet Explorer
	}
	if (e.keyCode === 83) { // sKey
		sKey = true;
	}
	if (e.keyCode === 68) { // rightArrow
		rightArrow = true;
	}
	if (e.keyCode === 81) {
		qAttack = true;
	}
	if (e.keyCode === 87) {
		upArrow = true;
	}
}

function keyup_detected(e) {
	console.log(e);
	if (!e) {
		e = window.event; //Internet Explorer
	}
	if (e.keyCode === 83) { // sKey
		sKey = false;
	}
	if (e.keyCode === 68) { // rightArrow
		rightArrow = false;
	}
	if (e.keyCode === 81) {
		qAttack = false;
	}
	if (e.keyCode === 87) {
		upArrow = false;
	}
}


/***********************************
 * GAME LOOP
 * **********************************/

function gameLoop() {

	if (enableCollision) {
		let collision;
		for (let i = 0; i < document.getElementsByClassName('obstacle').length; ++i) {
			collision = checkCollision(player, document.getElementsByClassName('obstacle')[i], -60);
			if (collision) break;
		}
		console.log(collision);
		if (collision) {
			spriteImgNumber = 0;
			deathInterval = setInterval(() => {
				animatePlayerDying();
			}, 40);
			youCanMoveOn = false;
			sKey = false;
			rightArrow = false;
			upArrow = false;
			qAttack = false;
		}


	}

	if (upArrow) {
		jump();
		if (isRunning) {
			moveBackground();
			animatePlayerJump();
		}
	} else if (qAttack) {
		if (isRunning) {
			moveBackground();
		}
		animatePlayerSlashing();
	} else if (sKey) {
		moveBackground();
		animatePlayerSliding();
		distance += 3;
		randomlyGenerateObstacles();

	}else if (rightArrow) {
		moveBackground();
		animatePlayer();
		isRunning = true;
		++distance;
		randomlyGenerateObstacles();
	}
	else {
		animatePlayerIdling();
	}

	if(youCanMoveOn) {
		setTimeout(gameLoop, 1000 / gameSpeed); // async recursion
	}


}


/***********************************
 * MOVE (BACKGROUND AND JUMPING)
 * **********************************/

let baseBackgroundSpeed = 1;
let calculateBackgroundSpeed = (n) => {
	return baseBackgroundSpeed + (n * 0.1);
};

let totalScrolled = 0;

function moveBackground() {

	totalScrolled += characterSpeed;


	let backgroundLayers = [];

	for (let i = 1; i <= layerCount; ++i) {
		let element = document.getElementById(`background-layer${i}`);
		backgroundLayers.push(element);
	}

	for (let i = 0; i < backgroundLayers.length; i++) {
		backgroundLayers[i].style.backgroundPositionX = -(totalScrolled * calculateBackgroundSpeed(i)) + 'px';
		if (totalScrolled > backgroundLayers[i].width) {
			totalScrolled = 0;
		}
	}

	let objectList = document.getElementsByClassName('obstacle');

	for (let i = 0; i < objectList.length; ++i) {
		objectList[i].style.left = parseInt(objectList[i].style.left) - (calculateBackgroundSpeed(layerCount - 1) * 5.5) + 'px';


		if (parseInt(objectList[i].style.left) > window.innerWidth + 500) { // changed the condition here
			objectList[i].remove();
		}
	}
}

/*jumping*/

let isJumping = false;

function jump() {
	if (isJumping) return;

	let upTimerId = setInterval(function () {
		// jump down
		if (top1 < 200) {
			clearInterval(upTimerId);
			let downTimerId = setInterval(function () {
				if(top1%29 === 0) {
					animatePlayerJump();
				}
				if (top1 > 280) {
					clearInterval(downTimerId);
					isJumping = false;
				}
				top1 += 5;
				player.style.top = top1 + 'px';
			}, 50);
		}
		// jump up
		if(top1%29 === 0) {
			animatePlayerJump();
		}
		isJumping = true;
		top1 -= 10;
		player.style.top = top1 + 'px';
	}, 20);

}

/***********************************
 * ANIMATE PLAYER
 * **********************************/

let playerImg = document.getElementById('spriteImg');
let isRunning = false;

function animatePlayer() {
	characterSpeed = 5;

	const frameCountRun = 12;

	if (spriteImgNumber < frameCountRun - 1) {
		spriteImgNumber++;

		playerImg.setAttribute('src', `./pics/Player/Halloween${playerId}/Running/${spriteImgNumber}.png`);

	} else {
		spriteImgNumber = 0;
	}
}

function animatePlayerIdling() {
	isRunning = false;
	characterSpeed = 3;
	const frameCountRun = 18;

	if (spriteImgNumber < frameCountRun - 1) {
		spriteImgNumber++;
		playerImg.setAttribute('src', `pics/Player/Halloween${playerId}/Idle/${spriteImgNumber}.png`);

	} else {
		spriteImgNumber = 0;
	}
}


function animatePlayerSliding() {
	characterSpeed = 9;
	const frameCountSlide = 6;

	if (spriteImgNumber < frameCountSlide - 1) {
		spriteImgNumber++;


		playerImg.setAttribute('src', `pics/Player/Halloween${playerId}/Sliding/${spriteImgNumber}.png`);

	} else {
		spriteImgNumber = 0;
	}
}

function animatePlayerDying() {
	characterSpeed = 9;
	const frameCountSlide = 15;

	if (spriteImgNumber < frameCountSlide - 1) {
		spriteImgNumber++;


		playerImg.setAttribute('src', `pics/Player/Halloween${playerId}/Dying/${spriteImgNumber}.png`);

	} else {
		clearInterval(deathInterval);
	}
}

function animatePlayerSlashing() {
	characterSpeed = 5;
	const frameCountRun = 12;

	if (isJumping === true) {
		if (spriteImgNumber < frameCountRun - 1) {
			spriteImgNumber++;
			console.log(spriteImgNumber);
			playerImg.setAttribute('src', `pics/Player/Halloween${playerId}/Air_Slashing/${spriteImgNumber}.png`);
		} else {
			spriteImgNumber = 0;
		}
	} else if (isRunning) {
		if (spriteImgNumber < frameCountRun - 1) {
			spriteImgNumber++;
			console.log(spriteImgNumber);
			playerImg.setAttribute('src', `pics/Player/Halloween${playerId}/Run_Slashing/${spriteImgNumber}.png`);

		} else {
			spriteImgNumber = 0;
		}
	} else {
		if (spriteImgNumber < frameCountRun - 1) {
			spriteImgNumber++;
			console.log(spriteImgNumber);
			playerImg.setAttribute('src', `pics/Player/Halloween${playerId}/Slashing/${spriteImgNumber}.png`);

		} else {
			spriteImgNumber = 0;
		}
	}
}


function animatePlayerJump() {
	characterSpeed = 5;
	const frameCountRun = 6;

	if (isRunning) {
		if (spriteImgNumber < frameCountRun - 1) {
			spriteImgNumber++;
			console.log(spriteImgNumber);
			playerImg.setAttribute('src', `pics/Player/Halloween${playerId}/Jump_Loop/${spriteImgNumber}.png`);

		} else {
			spriteImgNumber = 0;
		}
	} else {
		if (spriteImgNumber < frameCountRun - 1) {
			spriteImgNumber++;
			console.log(spriteImgNumber);
			playerImg.setAttribute('src', `pics/Player/Halloween${playerId}/Jump_Start/${spriteImgNumber}.png`);

		} else {
			spriteImgNumber = 0;
		}
	}

}

/***********************************
 * OBSTACLE GENERATION
 * **********************************/


let obstaclePics = [`pics/Maps/obstacles/${mapId}/1.png`, `pics/Maps/obstacles/${mapId}/2.png`];
let fuObstacle;
let enableCollision = false;

function placeObstacleOnRightBorder() {
/*
*/
	let obstacle = document.createElement('img');
	fuObstacle = obstacle;
	console.log(obstacle);
	obstacle.setAttribute('class', 'obstacle');
	obstacle.setAttribute('style', 'left: 1000px');
	obstacle.setAttribute('src', obstaclePics[Math.floor(Math.random() * obstaclePics.length)]);
	surface.appendChild(obstacle);

	enableCollision = true;
}

let aboveBound = 0;
let lastAboveBoundDistance = 0;

/* DIFFICULTY MODIFIERS */

// changes the min distance between obstacles
let aboveBoundLimit = 50;
// changes how likely an obstacle is to appear, currently calculated automatically in startGame(), ~line 446
let boundValue;
// changes how much more likely obstacle spawns become when their probability gets increased
let boundDecreaseValue = 2.6;
// changes how often the probability of spawning an obstacle increases
let boundDecreaseSpeed = 1000;
// changes the max height of the sin waves that are used for generation, avoid changing this one
let amplitude = 35;
// changes how far the player has to move for obstacles to start spawning
let minDistance = 10;

let randomSinOne = [
	(Math.random() - 0.4) * 40,
	(Math.random() - 0.4),
	(x) => Math.sin(x * randomSinOne[1] + randomSinOne[0]) * amplitude
];

let randomSinTwo = [
	(Math.random() - 0.5) * 50,
	(Math.random() - 0.3),
	(x) => Math.sin(x * randomSinTwo[1] + randomSinTwo[0]) * amplitude
];

let randomCosOne = [
	(Math.random() - 0.3) * 40,
	(Math.random() - 0.4),
	(x) => Math.cos(x * randomCosOne[1] + randomCosOne[0]) * amplitude
];

let randomCosTwo = [
	(Math.random() - 0.1) * 25,
	(Math.random() - 0.2),
	(x) => Math.cos(x * randomCosTwo[1] + randomCosTwo[0]) * amplitude
];

let sum = (x) => Math.round(randomSinOne[2](x) + randomSinTwo[2](x) + randomCosOne[2](x) + randomCosTwo[2](x));

function randomlyGenerateObstacles() {
	if (distance < minDistance) {
		return;
	}
	let rngValue = sum(distance);
	if (rngValue > boundValue) {
		if (!aboveBound && distance - lastAboveBoundDistance > aboveBoundLimit) {
			lastAboveBoundDistance = distance;
			placeObstacleOnRightBorder();
		}
		++aboveBound;
		if (aboveBound > aboveBoundLimit) {
			aboveBound = 0;
		}
	} else {
		aboveBound = 0;
	}
	if (distance % boundDecreaseSpeed === 0) {
		boundValue -= boundDecreaseValue;
	}
}

/***********************************
 * COLLISION HANDLING
 * **********************************/



function checkCollision(div1, div2, tolerance = 0) {
	
    let d1OffsetTop = div1.offsetTop;
    let d1OffsetLeft = div1.offsetLeft;
    let d1Height = div1.clientHeight;
    let d1Width = div1.clientWidth;
    let d1Top = d1OffsetTop + d1Height;
    let d1Left = d1OffsetLeft + d1Width;

    let d2OffsetTop = div2.offsetTop;
    let d2OffsetLeft = div2.offsetLeft;
    let d2Height = div2.clientHeight;
    let d2Width = div2.clientWidth;
    let d2Top = d2OffsetTop + d2Height;
    let d2Left = d2OffsetLeft + d2Width;

    let distanceTop = d2OffsetTop - d1Top;
    let distanceBottom = d1OffsetTop - d2Top;
    let distanceLeft = d2OffsetLeft - d1Left;
    let distanceRight = d1OffsetLeft - d2Left;

    return !(tolerance < distanceTop || tolerance < distanceBottom || tolerance < distanceLeft || tolerance < distanceRight);

}



/***********************************
 * START THE GAMEEE
 * **********************************/
function startGame() {
	player.style.left = '10%'; // starting position
	player.style.top = '287px'; // starting position
	player.style.opacity = '100'; // show player


	let waveSum = 0;
	for (let i = 0; i < 60; ++i) {
		waveSum +=sum(i);
	}
	let waveAverage = waveSum / 60;
	boundValue= waveAverage * 1.5; // lower for harder difficulty, increase for lower difficulty

	top1 = parseInt(player.style.top.replace('p', ''));

	gameLoop();
}
let top1;


startGame();
