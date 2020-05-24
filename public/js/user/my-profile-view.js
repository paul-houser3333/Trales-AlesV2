$(document).ready(function () {
    let firstNameEl = $(".get-firstName");
    let lastNameEl = $(".get-lastName");
    let imgEl = $("#get-image");
    let usernameEl = $("#get-username");
    let locationEl = $("#get-location");
    let bioEl = $("#get-bio");
    let credentialsEl = $("#get-credentials");
    let servicesEl = $("#get-services");
    let emailEl = $("#get-email");
    let theMap;
    let trailArray
    let marker

    $.get("/api/user_data").then(function (data) {
        firstNameEl.text(data.firstName);
        lastNameEl.text(data.lastName);
        imgEl.attr("src", data.imgURL);
        usernameEl.text(data.username);
        locationEl.text(data.location);
        bioEl.text(data.bio);
        credentialsEl.text(data.credentials);
        servicesEl.text(data.services);
        emailEl.text(data.email);

        // add JS for making map on profiles to render
        // here (nested api calls)
    });

    // leaflet map
    theMap = L.map("map-content", {
        center: [37.54, -77.43],
        zoom: 8,
    });
    //map tiles
    L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: '2c1769c0bc874cc39e5e9cdf3c845267',
        maxZoom: 22
    }).addTo(theMap);
    // map icon 
    trailIcon = L.icon({
        iconUrl: "assets/hiker-pin-green.png",
        iconSize: [20, 39.7],
        iconAnchor: [10, 39.7],
        popupAnchor: [-9, -39.7]
    });
    
    // PUT SERVER CALL HERE
    let databaseResponse;
    if (databaseResponse) {
        for (let i = 0; i < databaseResponse; i++) {

            let trailTemplate = "hi";
            // `
            // <b class="trail-name">${selectedTrail.name}</b>
            // <h4>Difficulty: ${selectedTrail.difficulty} | Rating: ${selectedTrail.stars}</h4>
            // <img src="${image}">
            // <p>${trailSummary}</p>
            // <button data-id="${selectedTrail.id}" data-name="${selectedTrail.name}" data-lat="${selectedTrail.latitude}" data-lon="${selectedTrail.longitude}" class="button is-success is-small popup-button" id="add-trail">Add Trail</button>
            // `;
            let marker = L.marker([databaseResponse.latitude, databaseResponse.longitude], { icon: trailIcon }).addTo(theMap);
            marker.bindPopup(trailTemplate).openPopup();
            trailArray.push(marker);
        }
    };
})
