import { fetchAllEvents, fetchSpecificTypeOfEvent, fetchSpecificEvent, fetchUpcomingEvents } from './api-requests.js';

function createPaginationButtons(type, page, totalPages, displayFunction, limit) {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = '';

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Forrige';
  prevButton.addEventListener('click', () => {
    if (page > 1) {
      displayFunction(type, page - 1, limit);
    }
  });
  paginationContainer.appendChild(prevButton);

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Næste';
  nextButton.addEventListener('click', () => {
    if (page < totalPages) {
      displayFunction(type, page + 1, limit);
    }
  });
  paginationContainer.appendChild(nextButton);

  const currentPageInfo = document.createElement('span');
  currentPageInfo.textContent = `Side ${page} af ${totalPages}`;
  paginationContainer.appendChild(currentPageInfo);
}
//Funktion til at vise data i HTML
async function displayData() {
  try {
    const data = await fetchAllEvents(); // Hent data fra API-modulet

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

      listItem.style.backgroundImage = `url(${item.image})`; // Anvend billedlinket som baggrund

      const dataElements = document.createElement('div');
      dataElements.innerHTML = `
        <h2 class="dataTitle">${item.name}</h2>
        <span class="dataType">${item.type}</span>
        <span class="dataDate">${item.dateAndTime.split('T')[0]}</span>
        <span class="dataTime">${item.dateAndTime.split('T')[1]}</span>
        <span class="dataPrice">${item.price}</span>
      `;

      listItem.appendChild(dataElements);
      dataContainer.appendChild(listItem);
    });

    const totalPages = Math.ceil(data.length / limit);

    createPaginationButtons(page, totalPages, displayData, limit);
  } catch (error) {
    console.error('Der opstod et problem med forbindelsen:', error);
  }
}
async function displaySpecificEvent(id) {
  try {
    const data = await fetchSpecificEvent(id); // Hent data fra API-modulet

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

      listItem.style.backgroundImage = `url(${item.image})`; // Anvend billedlinket som baggrund

      const dataElements = document.createElement('div');
      dataElements.innerHTML = `
        <h2 class="dataTitle">${item.name}</h2>
        <span class="dataType">${item.type}</span>
        <span class="dataDate">${item.dateAndTime.split('T')[0]}</span>
        <span class="dataTime">${item.dateAndTime.split('T')[1]}</span>
        <span class="dataPrice">${item.price}</span>
      `;

      listItem.appendChild(dataElements);
      dataContainer.appendChild(listItem);
    });

    const totalPages = Math.ceil(data.length / limit);

    createPaginationButtons(page, totalPages, displaySpecificEvent, limit);
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

      listItem.style.backgroundImage = `url(${item.image})`; // Anvend billedlinket som baggrund

      const dataElements = document.createElement('div');
      dataElements.innerHTML = `
        <h2 class="dataTitle">${item.name}</h2>
        <span class="dataType">${item.type}</span>
        <span class="dataDate">${item.dateAndTime.split('T')[0]}</span>
        <span class="dataTime">${item.dateAndTime.split('T')[1]}</span>
        <span class="dataPrice">${item.price}</span>
      `;

      listItem.appendChild(dataElements);
      dataContainer.appendChild(listItem);
    });

    const totalPages = Math.ceil(data.length / limit);

    createPaginationButtons(type, page, totalPages, displaySpecificTypeOfEvents, limit);
  } catch (error) {
    console.error('Der opstod et problem med forbindelsen:', error);
  }
}
async function displayUpcomingEvents(page = 1, limit = 6) {
  try {
    const data = await fetchUpcomingEvents(); // Hent data fra API-modulet

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

      listItem.style.backgroundImage = `url(${item.image})`; // Anvend billedlinket som baggrund

      const dataElements = document.createElement('div');
      dataElements.innerHTML = `
        <h2 class="dataTitle">${item.name}</h2>
        <span class="dataType">${item.type}</span>
        <span class="dataDate">${item.dateAndTime.split('T')[0]}</span>
        <span class="dataTime">${item.dateAndTime.split('T')[1]}</span>
        <span class="dataPrice">${item.price}</span>
      `;

      listItem.appendChild(dataElements);
      dataContainer.appendChild(listItem);
    });

    const totalPages = Math.ceil(data.length / limit);

    createPaginationButtons(page, totalPages, displayUpcomingEvents, limit);
  } catch (error) {
    console.error('Der opstod et problem med forbindelsen:', error);
  }
}
export { displayData, displaySpecificEvent, displaySpecificTypeOfEvents, displayUpcomingEvents }