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

export { changeLanguage }