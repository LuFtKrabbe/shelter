console.log (
	`
	Self-estimation of work:\n
	Score: 100 / 100\n
	- [x] The Main's page layout is completely according to the sketch (42/42);
	- [x] The Pets' page layout is completely according to the sketch (18/18);
	- [x] There is no deformation of the sketch and horizontal scroll-line (20/20);
	- [x] The design of the pages is responsive (8/8);
	- [x] The hambueger menu button is implemented (4/4);
	- [x] Valid Layout: document's checking is completed (8/8).
	`
);

function dropHamburgerMenu() {
	document.querySelector(".header-hamburger").classList.toggle("rotate-header-hamburger");
	document.querySelector(".header-navigation").classList.toggle("header-navigation-show");
	document.querySelector(".header-overlay").classList.toggle("header-overlay-show");
	document.querySelector(".scroll").classList.toggle("no-scroll");
}

const ARROW_LEFT = document.querySelector("#arrow-left");
const BARABAN = document.querySelector("#karusel");
const ARROW_RIGHT = document.querySelector("#arrow-right");

let petsKeys = [];
let leftPetSlide = document.querySelector("#left-pet-slide");
let centerPetSlide = document.querySelector("#center-pet-slide");
let rightPetSlide = document.querySelector("#right-pet-slide");

function generatePetsKeys() {
	for (let i = 0; i < 8; i++) {
		let key = Math.floor(Math.random()*8);
		while (petsKeys.includes(key)) {
			key = Math.floor(Math.random()*8);
		}
		petsKeys.push(key);
	}
	petsKeys.push(petsKeys[Math.floor(Math.random()*2) + 1]);
}

function refreshRightPetsKeys() {
	let addRightKeys = [];
	addRightKeys.push(petsKeys[Math.floor(Math.random()*2) + 4]);
	petsKeys.splice(0, 3);
	for (let i = 0; i < 2; i++) {
		let key = Math.floor(Math.random()*8);
		while (petsKeys.includes(key) || addRightKeys.includes(key)) {
			key = Math.floor(Math.random()*8);
		}
		addRightKeys.push(key);
	}
	petsKeys = petsKeys.concat(addRightKeys);
}

function refreshLeftPetsKeys() {
	let addLeftKeys = [];
	addLeftKeys.push(petsKeys[Math.floor(Math.random()*2) + 4]);
	petsKeys.splice(6, 3);
	for (let i = 0; i < 2; i++) {
		let key = Math.floor(Math.random()*8);
		while (petsKeys.includes(key) || addLeftKeys.includes(key)) {
			key = Math.floor(Math.random()*8);
		}
		petsKeys.unshift(key);
	}
	petsKeys = addLeftKeys.concat(petsKeys);
}

generatePetsKeys();
console.log(petsKeys)

async function getPets() {
	let response = await fetch('src/js/pets.json');
	data = await response.json();
	createLeftPetSlide(data);
	createCenterPetSlide(data);
	createRightPetSlide(data);
	createPopUp(data);
}

getPets();

function createPetCard(data, petsKey) {
	let petCard = document.createElement("div");
	let img = document.createElement("img");
	let p = document.createElement("p");
	let button = document.createElement("button");

	petCard.appendChild(img);
	petCard.appendChild(p);
	petCard.appendChild(button);

	petCard.classList.add("pet-card");
	button.classList.add("button-type-2");

	petCard.setAttribute("id", `${petsKey}`);
	img.setAttribute("id", `${petsKey}`);
	p.setAttribute("id", `${petsKey}`);
	button.setAttribute("id", `${petsKey}`);

	img.src = data[petsKey].img;
	img.alt = data[petsKey].name;
	p.innerText = data[petsKey].name;
	button.innerText = "Learn more";
	
	return petCard;
}

function createLeftPetSlide(data) {
	let leftPetSlide = document.createElement("div");

	leftPetSlide.classList.add("pet-slide");
	leftPetSlide.setAttribute("id", "left-pet-slide");

	BARABAN.appendChild(leftPetSlide);

	leftPetSlide.appendChild(createPetCard(data, petsKeys[0]));
	leftPetSlide.appendChild(createPetCard(data, petsKeys[1]));
	leftPetSlide.appendChild(createPetCard(data, petsKeys[2]));
}

function createCenterPetSlide(data) {
	let centerPetSlide = document.createElement("div");

	centerPetSlide.classList.add("pet-slide");
	centerPetSlide.setAttribute("id", "center-pet-slide");

	BARABAN.appendChild(centerPetSlide);

	centerPetSlide.appendChild(createPetCard(data, petsKeys[3]));
	centerPetSlide.appendChild(createPetCard(data, petsKeys[4]));
	centerPetSlide.appendChild(createPetCard(data, petsKeys[5]));
}

function createRightPetSlide(data) {
	let rightPetSlide = document.createElement("div");

	rightPetSlide.classList.add("pet-slide");
	rightPetSlide.setAttribute("id", "right-pet-slide");

	BARABAN.appendChild(rightPetSlide);

	rightPetSlide.appendChild(createPetCard(data, petsKeys[6]));
	rightPetSlide.appendChild(createPetCard(data, petsKeys[7]));
	rightPetSlide.appendChild(createPetCard(data, petsKeys[8]));
}

let moveLeft = () => {
	BARABAN.classList.add("transition-left");
	ARROW_LEFT.removeEventListener("click", moveLeft);
	ARROW_RIGHT.removeEventListener("click", moveRight);
}
let moveRight = () => {
	BARABAN.classList.add("transition-right");
	ARROW_LEFT.removeEventListener("click", moveLeft);
	ARROW_RIGHT.removeEventListener("click", moveRight);
}

BARABAN.addEventListener("animationend", (animationEvent) => {
	if (animationEvent.animationName === "move-left") {
		BARABAN.classList.remove("transition-left");

		document.querySelector("#left-pet-slide").remove();
		document.querySelector("#center-pet-slide").remove();
		document.querySelector("#right-pet-slide").remove();

		refreshLeftPetsKeys();

		console.log(petsKeys);

		createLeftPetSlide(data);
		createCenterPetSlide(data);
		createRightPetSlide(data);
	};

	if (animationEvent.animationName === "move-right") {
		BARABAN.classList.remove("transition-right");

		document.querySelector("#left-pet-slide").remove();
		document.querySelector("#center-pet-slide").remove();
		document.querySelector("#right-pet-slide").remove();

		refreshRightPetsKeys();

		console.log(petsKeys);

		createLeftPetSlide(data);
		createCenterPetSlide(data);
		createRightPetSlide(data);
	};
	
	ARROW_LEFT.addEventListener("click", moveLeft);
	ARROW_RIGHT.addEventListener("click", moveRight);
})

ARROW_LEFT.addEventListener("click", moveLeft);
ARROW_RIGHT.addEventListener("click", moveRight);

function showPopUpModal() {
	document.querySelector(".scroll").classList.toggle("no-scroll");
	document.querySelector(".pop-up-overlay").classList.toggle("pop-up-overlay-show");
	document.querySelector(".pop-up-modal").classList.toggle("pop-up-modal-show");
}

const POP_UP = document.querySelector("#pop-up-modal");
let petsKeyPop = 0;

function createPopUp(data) {
	while (POP_UP.firstChild) {POP_UP.firstChild.remove()};
	POP_UP.innerHTML = 
	`
	<button class="button-type-3" id="pop-up-close"></button>
	<img src="${data[petsKeyPop].imgpopup}" alt="${data[petsKeyPop].name}">
	<div class="pop-up-content" id="pop-up-content">
		<h2>${data[petsKeyPop].name}</h2>
		<h3>${data[petsKeyPop].type} - ${data[petsKeyPop].breed}</h3>
		<p>
			${data[petsKeyPop].description}
		</p>
		<ul>
			<li><span>Age:</span> ${data[petsKeyPop].age}</li>
			<li><span>Inoculations:</span> ${data[petsKeyPop].inoculations.join(", ")}</li>
			<li><span>Diseases:</span> ${data[petsKeyPop].diseases.join(", ")}</li>
			<li><span>Parasites:</span> ${data[petsKeyPop].parasites.join(", ")}</li>
		</ul>
	</div>
	`
};

BARABAN.addEventListener('click', (event) => {
	if (event.target.matches('.pet-card') || event.target.matches('button') ||
	 	event.target.matches('img') || event.target.matches('p')) {
		petsKeyPop = event.target.id;
		createPopUp(data);
		showPopUpModal();
	}
})

window.onclick = function(event) {
	if (event.target.matches('.header-overlay') && window.innerWidth <= 750) {
        dropHamburgerMenu();
    }
    if (event.target.matches('.header-navigation ul li a') && window.innerWidth <= 750) {
        dropHamburgerMenu();
    }
	if (event.target.matches(".pop-up-overlay-show") || event.target.matches("#pop-up-close")) {
        showPopUpModal();
    }
}