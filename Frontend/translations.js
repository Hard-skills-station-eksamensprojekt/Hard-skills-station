// Funktion til at hente oversættelsesobjektet for det angivne sprog og filnavn
async function getTranslations(language, filename) {
    const response = await fetch(`/i18n/${language}/${filename}.json`);
    const translations = await response.json();
    return translations;
}
// Eksporter funktionen, så den kan bruges af andre scripts
export { getTranslations };