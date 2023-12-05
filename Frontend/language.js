// Importer funktionen fra translations.js
import { getTranslations } from './translations.js';
// Funktion til at anvende oversættelser fra en bestemt fil
async function applyTranslations(language, filename) {
  const translations = await getTranslations(language, filename); // Henter oversættelsesobjektet

  const allKeys = Object.keys(translations);

  allKeys.forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      element.innerText = translations[key];
    }
  });
  // Gem sprogvalget et sted (f.eks. i localStorage)
  localStorage.setItem('language', language);
}
// Funktion til at skifte sprog for en bestemt fil
function changeLanguage(language, filename) {
  applyTranslations(language, filename);
}
// Hent gemt sprogvalg og anvend oversættelser fra de forskellige filer
const savedLanguage = localStorage.getItem('language') || 'da'; // Standard til dansk, hvis der ikke er gemt noget
applyTranslations(savedLanguage, 'index'); // Anvendelse af oversættelser for 'index' filen
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