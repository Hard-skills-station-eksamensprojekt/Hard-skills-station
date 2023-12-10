import { displayData, displaySpecificEvent, displaySpecificTypeOfEvents } from "./api-service.js";
import { changeLanguage } from "./language.js";

document.addEventListener('DOMContentLoaded', function() {
    displaySpecificTypeOfEvents('kurser');
});

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

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.className = savedTheme;
    if (savedTheme === 'darkMode') {
        themeSwitch.checked;
    }
}


changeLanguage('da', 'index');