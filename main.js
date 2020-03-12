let tiles = [];

let main = {selected:'none', money:10, battery:100, power:0};

let gui;
let buttons = [];

function setup(){
	createCanvas(800, 600);
	frameRate(60);
	
	gui = createGui();
	
	buttons.push(new GuiButton('Sell Power', 650, 40, 40, 20));
}

function draw(){
	background(80);
	
	if (tiles.length > 0){
		push();
		//noStroke();
		for (let h = 0; h < tiles.length; h++){
			for (let w = 0; w < tiles[h].length; w++){
				switch (tiles[h][w].type){
					case 'water':
						fill(0,0,150);
						break;
					case 'ground':
						fill(0,150,0);
						break;
					case 'mountain':
						fill(60,60,60)
						break;
					case 'sand':
						fill(150,150,0);
						break;
					default:
						noFill();
						break;
				}
				if (collidePointRect(mouseX, mouseY, tiles[h][w].x, tiles[h][w].y, 20,20)){
					stroke('red');
				} else {
					noStroke();
				}
				square(tiles[h][w].x, tiles[h][w].y, 20);
				
				if (tiles[h][w].placed.id !== 'none' && tiles[h][w].placed.id !== 'research'){
					tiles[h][w].placed.dur--;
					main.power+=tiles[h][w].powGen;
				}
			}
		}
		pop();
	} else {
		push();
		textSize(20);
		text('Map not chosen', 20,20);
		pop();
	}
	
	push();
	if (frameRate() < 20){
		fill('red');
		stroke('red');
	}
	text(floor(frameRate()), width-20, height);
	pop();
	
	push();
	// Battery %
	let a = main.pow/main.battery;
	if (isNaN(a)){
		text('0%', 610, 15)
	} else {
		text(floor(a*100)+'%', 610, 15);
	}
	noStroke();
	fill(60,60,60);
	rect(645, 5, 150, 10);
	
	if (a*100 < 75){
		fill(0,255,0);
	} else if (a*100 < 90){
		fill(255,255,0);
	} else {
		fill(255,0,0);
	}
	rect(648, 8, a*145, 5);
	pop();
	
	// Display Money
	text('$'+main.money, 605,30);
	
	// Rendering of On Screen Buttons
	if (buttons.length > 0){
		for (let i = 0; i < buttons.length; i++){
			buttons[i].draw();
		}
	}
}

function mousePressed(){
	if (mouseX >= 0 && mouseX <= 600 && mouseY >= 0 && mouseY <= 600){
		let collide = false;
		for (let h = 0; h < tiles.length; h++){
			for (let w = 0; w < tiles.length; w++){
				let obj = tiles[h][w];
				collide = collidePointRect(mouseX, mouseY, obj.x, obj.y, 20, 20);
				if (collide){
					placeStruct(h,w);
					break;
				}
			}
		}
	}
	
	if (mouseX >= 600 && mouseX <= 800 && mouseY >= 0 && mouseY <= 600){
		
	}
}

function changeMap(){
	let change = window.confirm('Are you sure you want to do this? All your buildings will be erased.');
	if (change){
		let choice = Number(document.getElementById('choice').value);
		tiles = maps[choice];
	}
}

function placeStruct(h,w){
	let structure = {id:'none'};
	for (let i = 0; i < struct; i++){
		if (struct[i].id == main.selected){
			structure = struct[i];
			break;
		}
	}
	
	if (structure.monCost <= main.money){
		
	}
}