import { displayData, displaySpecificEvent, displaySpecificTypeOfEvents } from "./api-service.js";
import { changeLanguage } from "./language.js";

document.addEventListener('DOMContentLoaded', function() {
    displaySpecificTypeOfEvents('kurser');
});

//Ændrer temaet på hjemmesiden når der klikkes på slider knappen:
const themeSwitch = document.getElementById('themeSwitch');
themeSwitch.addEventListener('click', function() {
    if(themeSwitch.checked) {
        localStorage.setItem('theme', 'darkMode');
        document.documentElement.className = 'darkMode';
    } else {
        localStorage.setItem('theme', 'default');
        document.documentElement.className = 'default';
    }
});
//Checker om et tema er gemt i localstorage, og displayer det hvis der er:
const savedTheme = localStorage.getItem('theme'); 
if (savedTheme) {
    document.documentElement.className = savedTheme;
    if (savedTheme === 'darkMode') {
        themeSwitch.checked;
    }
}
//Skjuler eller viser indstillinger når der trykkes på tandhjul-ikonet
const cog = document.getElementById('settingsCog');
const settings = document.getElementById('mobileMenu');
let isOpen = false;
cog.addEventListener('click', function() {
    isOpen = !isOpen;
    if (isOpen) {
        settings.style.top = '2.2em';
    } else {
        settings.style.top = '-10em';
    }
});

//Vis eller skjul mobil menuen
const burgerMenu = document.getElementById('mobileMenuIcon');
const darken = document.getElementById('darken');
const closeBurger = document.getElementById('closeMobileMenu');
burgerMenu.addEventListener('click', function() {
    settings.style.left = "0";
    darken.style.display = "block";
});
closeBurger.addEventListener('click', function() {
    settings.style.left = "-100%";
    darken.style.display = "none";
});

//Vis eller skjul mobil søgefelt
const searchIcon = document.getElementById('searchIcon');
const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
let isShown = false;
searchIcon.addEventListener('click', function() {
    isShown = !isShown;
    if (isShown) {
        searchBar.style.display = "flex";
        searchBtn.style.display = "block";
    } else {
        searchBar.style.display = 'none';
        searchBtn.style.display = 'none';
    }
});

const danishButton = document.getElementById('changeToDanish');
const englishButton = document.getElementById('changeToEnglish');

danishButton.addEventListener('click', function() {
    changeLanguage('da', 'index');
});
  // Lyt efter klik på knappen for at skifte til engelsk
englishButton.addEventListener('click', function() {
    changeLanguage('en', 'index');
});