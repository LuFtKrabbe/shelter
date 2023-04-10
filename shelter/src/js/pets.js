function dropHamburgerMenuPets() {
	document.querySelector(".header-pets-hamburger").classList.toggle("rotate-header-pets-hamburger");
	document.querySelector(".header-pets-navigation").classList.toggle("header-pets-navigation-show");
	document.querySelector(".header-pets-overlay").classList.toggle("header-pets-overlay-show");
	document.querySelector(".scroll-pets").classList.toggle("no-scroll");
}

const PET_BLOCK = document.querySelector("#pet-block");

const DOUBLE_ARROW_LEFT = document.querySelector("#double-arrow-left");
const ARROW_LEFT = document.querySelector("#arrow-left");
const PAGE_CIRCLE = document.querySelector("#page");
const ARROW_RIGHT = document.querySelector("#arrow-right");
const DOUBLE_ARROW_RIGHT = document.querySelector("#double-arrow-right");

let currentPage = 1;
let petsKeys = [];
let currentPetsKeys = [];

generatePetsKeys();
generatePetsKeys();
getCurrentPetsKeys();
setButtonsActivity();
getPets();

function generatePetsKeys() {
    let available = [];
    let partOne8 = [];
    let partTwo4 = [];
    let partTree4 = [];
    let partFour2 = [];
    let partFive6 = [];

    let genKey = () => Math.floor(Math.random()*8);

    for (let i = 0; i < 8; i++) {
        let key = genKey();
        while (partOne8.includes(key)) {key = genKey()}
        partOne8.push(key);
    }

    available = partOne8.slice(0, 6);

    for (let i = 0; i < 4; i++) {
        let key = genKey();
        while (!available.includes(key) || partTwo4.includes(key)) {key = genKey()}
        partTwo4.push(key);
    }
    for (let i = 0; i < 4; i++) {
        let key = genKey();
        while (partTwo4.includes(key) || partTree4.includes(key)) {key = genKey()}
        partTree4.push(key);
    }

    available = partTwo4;

    for (let i = 0; i < 2; i++) {
        let key = genKey();
        while (!available.includes(key) || partFour2.includes(key)) {key = genKey()}
        partFour2.push(key);
    }

    for (let i = 0; i < 6; i++) {
        let key = genKey();
        while (partFour2.includes(key) || partFive6.includes(key)) {key = genKey()}
        partFive6.push(key);
    }

    return petsKeys = petsKeys.concat(partOne8, partTwo4, partTree4, partFour2, partFive6);
}

function getCurrentPetsKeys() {
    if (getMaxPage() == 6) {currentPetsKeys = petsKeys.slice((currentPage - 1) * 8, (currentPage) * 8)}
    if (getMaxPage() == 8) {currentPetsKeys = petsKeys.slice((currentPage - 1) * 6, (currentPage) * 6)}
    if (getMaxPage() == 16) {currentPetsKeys = petsKeys.slice((currentPage - 1) * 3, (currentPage) * 3)}
}

function getMaxPage() {
    if ((window.innerWidth >= 320) && (window.innerWidth < 768)) {return 16};
    if ((window.innerWidth >= 768) && (window.innerWidth < 1000)) {return 8};
    if (window.innerWidth >= 1000) {return 6};
}

async function getPets() {
	let response = await fetch('src/js/pets.json');
	data = await response.json();
	createCards(data);
    createPopUp(data);
}

function createCards(data) {
    while (PET_BLOCK.firstChild) {PET_BLOCK.firstChild.remove()};
    if (currentPage > getMaxPage()) {currentPage = getMaxPage()};
    PAGE_CIRCLE.innerHTML = currentPage;
    getCurrentPetsKeys();
    setButtonsActivity();
    for (let i = 0; i < currentPetsKeys.length; i++) {
        let petCard = createPetCard(data, currentPetsKeys[i]);
        PET_BLOCK.appendChild(petCard);
    }
};

function createPetCard(data, petsKey) {
	let petCard = document.createElement("div");
	let img = document.createElement("img");
	let p = document.createElement("p");
	let button = document.createElement("button");

	petCard.appendChild(img);
	petCard.appendChild(p);
	petCard.appendChild(button);

	petCard.classList.add("pet-card-pets");
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

function setButtonsActivity() {
    if (currentPage == 1) {
        ARROW_LEFT.classList.add("not-active");
        DOUBLE_ARROW_LEFT.classList.add("not-active");
    }
    if (currentPage == getMaxPage()) {
        ARROW_RIGHT.classList.add("not-active");
        DOUBLE_ARROW_RIGHT.classList.add("not-active");
    }
    if (currentPage > 1) {
        ARROW_LEFT.classList.remove("not-active");
        DOUBLE_ARROW_LEFT.classList.remove("not-active");
    }
    if (currentPage < getMaxPage()) {
        ARROW_RIGHT.classList.remove("not-active");
        DOUBLE_ARROW_RIGHT.classList.remove("not-active");
    }
}

function moveCards(event) {
    if (event.target.id == "double-arrow-left") {currentPage = 1};
    if (event.target.id == "arrow-left") {currentPage -= 1};
    if (event.target.id == "arrow-right") {currentPage += 1};
    if (event.target.id == "double-arrow-right") {currentPage = getMaxPage()};
    createCards(data);
}

DOUBLE_ARROW_LEFT.addEventListener("click", moveCards);
ARROW_LEFT.addEventListener("click", moveCards);
ARROW_RIGHT.addEventListener("click", moveCards);
DOUBLE_ARROW_RIGHT.addEventListener("click", moveCards);

console.log(petsKeys);

window.addEventListener('resize', getPets);





function showPopUpModal() {
	document.querySelector(".scroll-pets").classList.toggle("no-scroll");
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
	<img src="${data[petsKeyPop].img}" alt="${data[petsKeyPop].name}">
	<div class="pop-up-content" id="pop-up-content">
		<h2>${data[petsKeyPop].name}</h2>
		<h3>${data[petsKeyPop].type} - ${data[petsKeyPop].breed}</h3>
		<p>
			${data[petsKeyPop].description}
		</p>
		<ul>
			<li><span>Age:</span> ${data[petsKeyPop].age}</li>
			<li><span>Inoculations:</span> ${data[petsKeyPop].inoculations}</li>
			<li><span>Diseases:</span> ${data[petsKeyPop].diseases}</li>
			<li><span>Parasites:</span> ${data[petsKeyPop].parasites}</li>
		</ul>
	</div>
	`
};

PET_BLOCK.addEventListener('click', (event) => {
	if (event.target.matches('.pet-card-pets') || event.target.matches('button') ||
	 	event.target.matches('img') || event.target.matches('p')) {
		petsKeyPop = event.target.id;
		createPopUp(data);
		showPopUpModal();
	}
})

window.onclick = function(event) {
	if (event.target.matches('.header-pets-overlay') && window.innerWidth <= 750) {
        dropHamburgerMenuPets();
    }
    if (event.target.matches('.header-pets-navigation ul li a') && window.innerWidth <= 750) {
        dropHamburgerMenuPets();
    }
    if (event.target.matches(".pop-up-overlay-show") || event.target.matches("#pop-up-close")) {
        showPopUpModal();
    }
}