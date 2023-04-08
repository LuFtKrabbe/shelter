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

window.onclick = function(event) {
    if (event.target.matches('.header-overlay') && window.innerWidth <= 750) {
        dropHamburgerMenu();
    }
    if (event.target.matches('.header-navigation ul li a') && window.innerWidth <= 750) {
        dropHamburgerMenu();
    }
}

let proba = document.getElementsByClassName("header-hamburger")[0];
console.log(proba);
