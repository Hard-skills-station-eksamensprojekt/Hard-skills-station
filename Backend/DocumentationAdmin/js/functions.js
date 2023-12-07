endpoint = "http://13.48.26.100:9999/"
function sendEventData() {
    let allInputs = document.getElementsByClassName("create-event-textinput input")
    const body = JSON.stringify({
        "name": allInputs[0].value,
        "description": allInputs[1].value,
        "type": allInputs[2].value,
        "dateAndTime": allInputs[3].value,
        "company": "IBA",
        "location": allInputs[4].value,
        "price": allInputs[5].value,
        "image": allInputs[6].value,
        "eventBrinkLink": allInputs[7].value,
        "views": 0
    })
    fetch(endpoint+"createEvent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body
    })
    .then(response => response.json())
    .then(data => console.log(data));
    
}

function requestAll() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', endpoint+"events", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Opdater textarea med den modtagne tekst
            document.getElementById('outputTextarea').value = xhr.responseText;
        }
    };

    xhr.send();

}