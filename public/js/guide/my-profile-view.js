$(document).ready(function () {
    let firstNameEl = $(".get-firstName");
    let firstNameUpEl = $(".get-firstNameUp");
    let lastNameEl = $(".get-lastName");
    let usernameEl = $("#get-username");
    let iconEl = $("#get-image");
    let locationEl = $("#get-location");
    let bioEl = $("#get-bio");
    let credentialsEl = $("#get-credentials");
    let servicesEl = $("#get-services");
    let emailEl = $("#get-email");

    let theMap;
    let trailArray;

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
        iconUrl: "assets/greenhiker.png",
        iconSize: [20, 39.7],
        iconAnchor: [10, 39.7],
        popupAnchor: [-9, -39.7]
    });
    
    // PUT SERVER CALL HERE
    $.get("/api/my-trails").then(function (data) {

        let firstName = data.first_name;
        
        trailArray = data.trails;
        firstNameEl.text(firstName);
        firstNameUpEl.text(firstName.toUpperCase());
        lastNameEl.text(data.last_name);
        usernameEl.text(data.username);
        iconEl.attr("src", data.guide_icon);
        locationEl.text(data.location);
        bioEl.text(data.bio);
        credentialsEl.text(data.credentials);
        servicesEl.text(data.services);
        emailEl.text(data.email);

        for (let i = 0; i < data.trails.length; i++) {

            let trailTemplate =
            `
            <b class="trail-name">${data.trails[i].trail_name}</b>
            `;
            let marker = L.marker([data.trails[i].latitude, data.trails[i].longitude], { icon: trailIcon }).addTo(theMap);
            marker.bindPopup(trailTemplate);
            trailArray.push(marker);
        };
    }); 

    
});
