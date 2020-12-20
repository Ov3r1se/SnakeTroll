let field = document.createElement('div');

document.body.appendChild(field);

field.classList.add('field');




for(let i = 0;i<=100;i++){
	let excel = document.createElement('div');
	field.appendChild(excel);
	excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1, y = 10;


for(let i = 0; i < excel.length; i++){
	if(x>10){
		x = 1;
		y--;
	}
	excel[i].setAttribute('posX', x);
	excel[i].setAttribute('posY', y);
	x++;
}


function generateSnake() {
	let posX = Math.round(Math.random() * (10 - 3) + 3);
	let posY = Math.round(Math.random() * (10 - 1) + 1);
	return[posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
   				 document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'), 
   				 document.querySelector('[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]') ];

for(let i = 0; i<snakeBody.length; i++) {
	snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');



//появление "яблока"

let fruit;

function createFruit () {
	function generateFruit() {
		let posX = Math.round(Math.random() * (10 - 3) + 3);
		let posY = Math.round(Math.random() * (10 - 1) + 1);
		return [posX, posY];
	}

	let fruitCoordinates = generateFruit();
	console.log(fruitCoordinates);
	fruit = document.querySelector('[posX = "' + fruitCoordinates[0] + '"][posY = "' + fruitCoordinates[1] + '"]');
	

	while(fruit.classList.contains('snakeBody')) {
		let fruitCoordinates = generateFruit();
		fruit = document.querySelector('[posX = "' + fruitCoordinates[0] + '"][posY = "' + fruitCoordinates[1] + '"]');
	}
	fruit.classList.add('fruit');
}

createFruit();

let direction = 'right';
let steps = false;   // <--- переменная для фикса быстрого нажатия кнопки поворота

let input = document.createElement('input');
document.body.appendChild(input);


let score = 0;
input.value = `Очки: ${score}`;



//отрисовка

function move() {
	let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
	snakeBody[0].classList.remove('head');
	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
	snakeBody.pop();


	if(direction == 'right') {
	    if(snakeCoordinates[0] < 10) {

		snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));

		}	else {

			snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
		}

	}    else if(direction == 'left') {

			if(snakeCoordinates[0] > 1) {

			snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));

		}	else {

			snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
		}
	}	 else if(direction == 'up') {

			if(snakeCoordinates[1] < 10) {

			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' +(+snakeCoordinates[1]+1) + '"]'));

		}	else {
			
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] +'"][posY = "1"]'));
		}
	}
		 else if(direction == 'down') {

			if(snakeCoordinates[1] > 1) {

			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1]-1) + '"]'));

		}	else {
			
			snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
		}
	} 


	//процесс хавки и роста
	if(snakeBody[0].getAttribute('posX') == fruit.getAttribute('posX') && snakeBody[0].getAttribute('posY') == fruit.getAttribute('posY')){
		//10:40
		fruit.classList.remove('fruit');
		let a = snakeBody[snakeBody.length - 1].getAttribute("posX"); //  <--
																		// координаты последнего элемента
		let b = snakeBody[snakeBody.length - 1].getAttribute("posY"); //  <--

		snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));   
		createFruit();
		score++;
		input.value = `Очки: ${score}`;
}

	
	if(snakeBody[0].classList.contains('snakeBody')) {
		setTimeout(() => {
			alert('Чувак, это гамовер');
		}, 200);
		
		clearInterval(interval);
		 
	}

	
	//движение 
	snakeBody[0].classList.add('head');
	for(let i = 0; i < snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}

	steps = true;
 }



let interval = setInterval(move, 300);

//управление
window.addEventListener('keydown', function (e) {
	if(steps == true){ // <---фикс упора змеи в саму себя
		if(e.keyCode == 65 && direction != 'right') {
		// console.log("left"); 
		
			direction = 'left';
				steps = false;
		}	else if(e.keyCode == 87 && direction != 'down') {
			// console.log("up"); 
			
			direction = 'up';
				steps = false;
		}	else if(e.keyCode == 68 && direction != 'left') {
			// console.log("right"); 
			
			direction = 'right';
				steps = false;
		}	else if(e.keyCode == 83 && direction != 'up') {
			// console.log("down"); 
			
			direction = 'down';
				steps = false;
			}
		}
	
});