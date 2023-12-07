import { fetchAllEvents, fetchSpecificTypeOfEvent, fetchSpecificEvent } from './api-requests.js';
//Funktion til at vise data i HTML
async function displayData() {
  try {
    const data = await fetchSpecificTypeOfEvent('kurser'); // Hent data fra API-modulet

    const dataContainer = document.getElementById('data-container');
    // Generer dynamisk HTML baseret på dataene og vis det i containeren
    data.forEach(item => {
      const listItem = document.createElement('div');
      listItem.classList.add('data-item'); // Tilføj passende klasse eller id
      listItem.innerHTML = `
        <p>${item.name}</p>
        <p>${item.description}</p>
        <p>${item.type}</p>
        <p>${item.dateAndTime}</p>
        <p>${item.company}</p>
        <p>${item.location}</p>
        <p>${item.price}</p>
      `;
      dataContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error('Der opstod et problem med forbindelsen:', error);
  }
}
async function displaySpecificEvent(id) {
  try {
    const data = await fetchSpecificEvent(id); // Hent data fra API-modulet

    const dataContainer = document.getElementById('data-container');
    // Generer dynamisk HTML baseret på dataene og vis det i containeren
    data.forEach(item => {
      const listItem = document.createElement('div');
      listItem.classList.add('data-item'); // Tilføj passende klasse eller id
      listItem.innerHTML = `
        <p>${item.name}</p>
        <p>${item.description}</p>
        <p>${item.type}</p>
        <p>${item.dateAndTime}</p>
        <p>${item.company}</p>
        <p>${item.location}</p>
        <p>${item.price}</p>
      `;
      dataContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error('Der opstod et problem med forbindelsen:', error);
  }
}
async function displaySpecificTypeOfEvents(type) {
  try {
    const data = await fetchSpecificTypeOfEvent(type); // Hent data fra API-modulet

    const dataContainer = document.getElementById('data-container');
    // Generer dynamisk HTML baseret på dataene og vis det i containeren
    data.forEach(item => {
      const listItem = document.createElement('div');
      listItem.classList.add('data-item'); // Tilføj passende klasse eller id
      listItem.innerHTML = `
        <p>${item.name}</p>
        <p>${item.type}</p>
        <p>${item.dateAndTime.split('T')[0]}</p>
        <p>${item.dateAndTime.split('T')[1]}</p>
        <p>${item.price}</p>
      `;
      dataContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error('Der opstod et problem med forbindelsen:', error);
  }
}
export { displayData, displaySpecificEvent, displaySpecificTypeOfEvents }