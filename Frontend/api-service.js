// Definer URL'en til den API, du ønsker at forbinde til
const apiUrl = 'http://13.48.26.100:9999/events'; // Erstat med den faktiske API-endepunkt

// Lav en GET-forespørgsel til API'en ved hjælp af fetch()
fetch(apiUrl)
  .then(response => {
    // Tjek, om svaret er OK (statuskode 200-299)
    if (!response.ok) {
      throw new Error('Netværkssvaret var ikke i orden');
    }
    // Hvis svaret er OK, konverter det til JSON-format
    return response.json();
  })
  .then(data => {
    // Håndter den data, der returneres fra API'en
    console.log(data); // Her kan du gøre, hvad du vil med dataen
  })
  .catch(error => {
    // Håndter fejl, hvis der opstår nogen under forbindelsen til API'en
    console.error('Der opstod et problem med forbindelsen:', error);
  });
