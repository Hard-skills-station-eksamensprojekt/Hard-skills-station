import { displayData, displaySpecificEvent, displaySpecificTypeOfEvents } from "./api-service.js";
import { changeLanguage } from "./language.js";

//Henter data fra databasen gennem API:
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
const settings = document.getElementById('settings');
let isOpen = false;
cog.addEventListener('click', function() {
    isOpen = !isOpen;
    if (isOpen) {
        settings.style.top = '5em';
    } else {
        settings.style.top = '-10em';
    }
});



changeLanguage('da', 'index');