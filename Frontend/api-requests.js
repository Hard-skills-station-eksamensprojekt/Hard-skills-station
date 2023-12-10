//Definer uri til endpoints plus en baseurl
//Dette er en dynamisk måde at stille request urls op på ved at lave en base url og så tilføje en uri
const baseUrl = 'http://13.48.26.100:9999/';
const allEventsUri = `events`;
const specificEventUri = 'event/';
const typeOfEvent = 'eventsType/';
const upcomingEvents = 'upcomingEvents';
//request all data from the server
async function fetchAllEvents(){
    // Lav en GET-forespørgsel til API'en ved hjælp af fetch()
    const getAllEvents = baseUrl + allEventsUri;
    const response = await fetch(getAllEvents);
    if (!response.ok) {
      throw new Error('Netværkssvaret var ikke i orden');
    }

    const data = await response.json();
    return data;
}
//request et specifikt event hvor der søges efter id
async function fetchSpecificEvent(id){
    // Lav en GET-forespørgsel til API'en ved hjælp af fetch()
    const getSpecificEvent = baseUrl + specificEventUri + id;
    const response = await fetch(getSpecificEvent);

    if (!response.ok) {
        throw new Error('Netværkssvaret var ikke i orden');
    }
    const data = await response.json();
    return data;
}
async function fetchSpecificTypeOfEvent(type, page = 1, limit = 10){
    // Lav en GET-forespørgsel til API'en ved hjælp af fetch()
    const getEventsOfSpecificType = baseUrl + typeOfEvent + type + '?page=' + page + '&limit=' + limit;
    const response = await fetch(getEventsOfSpecificType);

    if (!response.ok) {
        throw new Error('Netværkssvaret var ikke i orden');
    }
    const data = await response.json();
    return data;
}
async function fetchUpcomingEvents(){
    // Lav en GET-forespørgsel til API'en ved hjælp af fetch()
    const getUpcomingEvents = baseUrl + upcomingEvents;
    const response = await fetch(getUpcomingEvents);

    if (!response.ok) {
        throw new Error('Netværkssvaret var ikke i orden');
    }
    const data = await response.json();
    return data;
}
export { fetchAllEvents, fetchSpecificEvent, fetchSpecificTypeOfEvent, fetchUpcomingEvents }