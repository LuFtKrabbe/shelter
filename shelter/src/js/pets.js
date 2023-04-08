function dropHamburgerMenuPets() {
	document.querySelector(".header-pets-hamburger").classList.toggle("rotate-header-pets-hamburger");
	document.querySelector(".header-pets-navigation").classList.toggle("header-pets-navigation-show");
	document.querySelector(".header-pets-overlay").classList.toggle("header-pets-overlay-show");
	document.querySelector(".scroll-pets").classList.toggle("no-scroll");
}

window.onclick = function(event) {
	if (event.target.matches('.header-pets-overlay') && window.innerWidth <= 750) {
        dropHamburgerMenuPets();
    }
    if (event.target.matches('.header-pets-navigation ul li a') && window.innerWidth <= 750) {
        dropHamburgerMenuPets();
    }
}