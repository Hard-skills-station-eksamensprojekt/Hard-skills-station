import { displayData, displaySpecificEvent, displaySpecificTypeOfEvents } from "./api-service.js";
import { changeLanguage } from "./language.js";

document.addEventListener('DOMContentLoaded', function() {
    displaySpecificTypeOfEvents('kurser');
});

function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
setTheme('darkMode');

changeLanguage('da', 'index');