import { fetchAllEvents, fetchSpecificTypeOfEvent, fetchSpecificEvent, fetchUpcomingEvents } from './api-requests.js';
//Funktion til at vise data i HTML
async function displayData() {
  try {
    const data = await fetchSpecificTypeOfEvent('kurser'); // Hent data fra API-modulet

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = ''; // Ryd tidligere vist data
    // Generer dynamisk HTML baseret på dataene og vis det i containeren
    data.forEach(item => {
      const listItem = document.createElement('div');
      listItem.classList.add('data-item'); // Tilføj passende klasse eller id
      listItem.innerHTML = `
        <h2 class="dataTitle">${item.name}</h2>
        <span class="dataType">${item.type}</span>
        <span class="dataDate">${item.dateAndTime.split('T')[0]}</span>
        <span class="dataTime">${item.dateAndTime.split('T')[1]}</span>
        <span class="dataPrice">${item.price}</span>
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
    dataContainer.innerHTML = ''; // Ryd tidligere vist data
    // Generer dynamisk HTML baseret på dataene og vis det i containeren
    data.forEach(item => {
      const listItem = document.createElement('div');
      listItem.classList.add('data-item'); // Tilføj passende klasse eller id
      listItem.innerHTML = `
        <h2 class="dataTitle">${item.name}</h2>
        <span class="dataType">${item.type}</span>
        <span class="dataDate">${item.dateAndTime.split('T')[0]}</span>
        <span class="dataTime">${item.dateAndTime.split('T')[1]}</span>
        <span class="dataPrice">${item.price}</span>
      `;
      dataContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error('Der opstod et problem med forbindelsen:', error);
  }
}
async function displaySpecificTypeOfEvents(type, page = 1, limit = 4) {
  try {
    const data = await fetchSpecificTypeOfEvent(type); // Hent data fra API-modulet

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = ''; // Ryd tidligere vist data

    // Beregn start- og slutindeks for den aktuelle side
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = data.slice(startIndex, endIndex); // Vælg data til den aktuelle side
    // Generer dynamisk HTML baseret på dataene og vis det i containeren
    paginatedData.forEach(item => {
      const listItem = document.createElement('div');
      listItem.classList.add('data-item'); // Tilføj passende klasse eller id
      listItem.innerHTML = `
        <h2 class="dataTitle">${item.name}</h2>
        <span class="dataType">${item.type}</span>
        <span class="dataDate">${item.dateAndTime.split('T')[0]}</span>
        <span class="dataTime">${item.dateAndTime.split('T')[1]}</span>
        <span class="dataPrice">${item.price}</span>
      `;
      dataContainer.appendChild(listItem);
    });

    // Tilføj enkel paginering (forrige og næste knapper)
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Forrige';
    prevButton.addEventListener('click', () => {
      if (page > 1) {
        displaySpecificTypeOfEvents(type, page - 1, limit);
      }
    });
    paginationContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Næste';
    nextButton.addEventListener('click', () => {
      if (endIndex < data.length) {
        displaySpecificTypeOfEvents(type, page + 1, limit);
      }
    });
    paginationContainer.appendChild(nextButton);

    const totalPages = Math.ceil(data.length / limit);

    const currentPageInfo = document.createElement('span');
    currentPageInfo.textContent = `Side ${page} af ${totalPages}`;
    paginationContainer.appendChild(currentPageInfo);
  } catch (error) {
    console.error('Der opstod et problem med forbindelsen:', error);
  }
}
async function displayUpcomingEvents(type) {
  try {
    const data = await fetchUpcomingEvents(type); // Hent data fra API-modulet

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = ''; // Ryd tidligere vist data
    // Generer dynamisk HTML baseret på dataene og vis det i containeren
    data.forEach(item => {
      const listItem = document.createElement('div');
      listItem.classList.add('data-item'); // Tilføj passende klasse eller id
      listItem.innerHTML = `
        <h2 class="dataTitle">${item.name}</h2>
        <span class="dataType">${item.type}</span>
        <span class="dataDate">${item.dateAndTime.split('T')[0]}</span>
        <span class="dataTime">${item.dateAndTime.split('T')[1]}</span>
        <span class="dataPrice">${item.price}</span>
      `;
      dataContainer.appendChild(listItem);
    });
  } catch (error) {
    console.error('Der opstod et problem med forbindelsen:', error);
  }
}
export { displayData, displaySpecificEvent, displaySpecificTypeOfEvents, displayUpcomingEvents }