import { displayData, displaySpecificEvent, displaySpecificTypeOfEvents, displayUpcomingEvents } from "./api-service.js";
import { changeLanguage } from "./language.js";

document.addEventListener('DOMContentLoaded', function() {
    displaySpecificTypeOfEvents('workshops');
});
// Lyt efter klik på knappen for at skifte til dansk
document.getElementById('changeToDanish').addEventListener('click', function() {
    changeLanguage('da', 'events');
    changeLanguage('da', 'index');
});
  // Lyt efter klik på knappen for at skifte til engelsk
document.getElementById('changeToEnglish').addEventListener('click', function() {
    changeLanguage('en', 'index');
    changeLanguage('en', 'events');
});