let tiles = [];

let main = {selected:'none', money:10, battery:100, power:0};

//let gui;
let buttons = [];
let sprites = [];

function setup(){
	sprites[1] = loadImage('assets/solarPanel.png');
	sprites[2] = loadImage('assets/heatGene.png');
	
	createCanvas(800, 600);
	frameRate(60);
	
	buttons.push(new button('Sell Power', 605, 35, 60, 20));
	buttons.push(new button('Wind Turbine', 605, 60, 65, 20));
	buttons.push(new button('Solar Panel', 605, 90, 65, 20));
	buttons.push(new button('Heat Generator', 605, 120, 65, 20));
	//alert(JSON.stringify(buttons));
	
	for (let i = 0; i < buttons.length; i++){
		buttons[i].style.backgroundColor='#707070';
		buttons[i].style.borderColor='#909090';
	}
}

function draw(){
	background(80);
	
	if (frameCount > sprites.length){
		frameCount = 0;
	}
	image(sprites[frameCount],50,50);
	
	if (tiles.length > 0){	
		push();
		
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
				
				if (tiles[h][w].placed.id !== 'none'){
					tiles[h][w].placed.dur--;
					main.power+=tiles[h][w].powGen;
					image(sprites[tiles[h][w].placed.num], tiles[h][w].x, tiles[h][w].y);
				}
			}
		}
		pop();
	} else {
		push();
		textSize(30);
		text('Map not chosen', width/3,height/2);
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
	
	
	//drawGui();
	// On Screen Buttons
	for (let i = 0; i < buttons.length; i++){
		buttons[i].draw();
	}
	
	push();
	line(mouseX, 0, mouseX, height);
	line(0, mouseY, width, mouseY);
	text(mouseX + ',' + mouseY, mouseX, mouseY);
	pop();
}

function mousePressed(){
	if (mouseX > 0 && mouseX < 600 && mouseY > 0 && mouseY < 600){
		let collide = false;
		for (let h = 0; h < tiles.length; h++){
			for (let w = 0; w < tiles.length; w++){
				let obj = tiles[h][w];
				collide = collidePointRect(mouseX, mouseY, obj.x, obj.y, 19, 19);
				if (collide){
					placeStruct(h,w);
					break;
				}
			}
		}
	}
	
	if (mouseX >= 600 && mouseX <= 800 && mouseY >= 0 && mouseY <= 600){
		let collide = false;
		for (let i = 0; i < buttons.length; i++){
			let o = buttons[i];
			collide = collidePointRect(mouseX, mouseY, o.x, o.y, o.w, o.h);
			if (collide){
				o.event();
				break
			}
		}
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

function button (label = 'unnamed', x, y, w, h, style, event=undefined) {
	if (style == undefined){
		style = {
			textSize:10, 
			textColor:'#000', 
			backgroundColor:'#fff', 
			borderColor:'#fff', 
			textXoff:3, 
			textYoff:h/2, 
			hoverBgColor:'#707070', 
			hoverBorderColor:'#f00'
		};
	}
	
	if (event == undefined){
		event = function(){
			alert(JSON.stringify(this));
		}
	}
	
	let styleParsed = style;
	if (styleParsed.textSize == undefined){
		styleParsed.textSize = 10;
	}
	if (styleParsed.textColor == undefined){
		styleParsed.textColor = '#000';
	}
	if (styleParsed.backgroundColor == undefined){
		styleParsed.backgroundColor = '#0f0';
	}
	if (styleParsed.borderColor == undefined){
		styleParsed.borderColor = '#f00';
	}
	if (styleParsed.textXoff == undefined){
		styleParsed.textXoff = 3;
	}
	if (styleParsed.textYoff == undefined){
		styleParsed.textYoff = h/2;
	}
	if (styleParsed.hoverBgColor == undefined){
		styleParsed.hoverBgColor = '#fff';
	}
	if (styleParsed.hoverBorderColor == undefined){
		styleParsed.hoverBorderColor = '#fff';
	}
	
	let obj = {label:label, x:x, y:y, w:w, h:h, event:event, style:styleParsed}
	obj.draw = function(){
		push();
		if (collidePointRect(mouseX, mouseY, this.x,this.y,this.w,this.h)){
			fill(this.style.hoverBgColor);
			stroke(this.style.hoverBorderColor);
		} else {
			fill(this.style.backgroundColor);
			stroke(this.style.borderColor);
		}
		rect(this.x,this.y,this.w,this.h);
		
		fill(this.style.textColor);
		stroke(this.style.textColor);
		textSize(this.style.textSize);
		text(this.label, this.x+this.style.textXoff, this.y+this.style.textYoff);
		pop();
	}
	//alert(JSON.stringify(obj));
	return obj;
}
