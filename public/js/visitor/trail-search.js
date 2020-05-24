$(document).ready(function () {
    // Global Variables
    let searchbox;
    let theMap;
    let trailArray = [];
    let results;
    let trailIcon;

    //Setting default center point on map
    theMap = L.map("map-content", {
        center: [37.54, -77.43],
        zoom: 8,
    });

    // Setting map aesthetics (???)
    L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey={apikey}', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: '2c1769c0bc874cc39e5e9cdf3c845267',
        maxZoom: 22
    }).addTo(theMap);

    //Click event on user input box
    $("#map-button").on("click", function (event) {
        event.preventDefault();
        //Reset placeholder attribute value
        $(".input").attr("placeholder", "City, State");
        searchbox = $(this).prev().val();
        getLatLon();
        // clearing out input field
        $(this).prev().val("");
    });

    //Taking user input, Nominatim ajax call will return lat/long and city/state info
    getLatLon = () => {
        let apiUrl = "https://nominatim.openstreetmap.org/search/" + searchbox + "?format=json&addressdetails=1";
        $.ajax({
            url: apiUrl,
            method: "GET"
        }).then(function (response) {
            results = response;
            //Parameters to be passed into brewery & trail search functions
            let city;
            let state;
            let searchLat;
            let searchLon;
            if (results[0] !== undefined && results[0].address.city !== undefined) {
                city = results[0].address.city.replace(" City", "");
                state = results[0].address.state;
                searchLat = results[0].lat;
                searchLon = results[0].lon;
            }
            else if (results[1] !== undefined && results[1].address.city !== undefined) {
                city = results[1].address.city.replace(" City", "");
                state = results[1].address.state;
                searchLat = results[1].lat;
                searchLon = results[1].lon;
            }
            else {
                // alert("enter valid city")
                $(".input").attr("placeholder", "Enter Valid City");
            }

            //if trail array is not empty remove each previous icon
            if (trailArray !== []) {
                trailArray.forEach(t => {
                    theMap.removeLayer(t)
                });
            }
            //set mapview to searched location
            theMap.panTo(new L.LatLng(searchLat, searchLon));
            trailSearch(searchLat, searchLon);
        });

        //Call to REI hiking trails api
        trailSearch = (searchLat, searchLon) => {
            let reiURL = "https://www.hikingproject.com/data/get-trails?lat=" + searchLat + "&lon=" + searchLon + "&maxDistance=40&maxResults=500&key=200708264-a5ce732ab3823333a148cde68ddfa0ce";
            $.ajax({
                url: reiURL,
                method: "GET"
            }).then(function (response) {
                trailIcon = L.icon({
                    iconUrl: "assets/hiker-pin-green.png",
                    iconSize: [20, 39.7],
                    iconAnchor: [10, 39.7],
                    popupAnchor: [-9, -39.7]
                });
                console.log(response.trails);
                for (let i = 0; i < response.trails.length; i++) {
                    let selectedTrail = response.trails[i];
                    let image;
                    let trailSummary;
                    //puts in default image if api doesnt contain an image
                    if (selectedTrail.imgSmall !== "") {
                        image = selectedTrail.imgSmall;
                    }
                    else {
                        image = "https://via.placeholder.com/150"
                    }
                    //sets description to empty string if api summary is "needs summary" or "needs adoption"
                    if (selectedTrail.summary.trim() !== "Needs Summary" && selectedTrail.summary !== "Needs Adoption!" && selectedTrail.summary !== "This trail could use a short summary!" && selectedTrail.summary !== "Needs Adoption") {
                        trailSummary = selectedTrail.summary;
                    }
                    else {
                        trailSummary = ""
                    }
                    let trailTemplate =
                        `
                        <b class="trail-name">${selectedTrail.name}</b>
                        <h4>Difficulty: ${selectedTrail.difficulty} | Rating: ${selectedTrail.stars}</h4>
                        <img src="${image}">
                        <p>${trailSummary}</p>
                        <button data-id="${selectedTrail.id}" class="button is-success is-small popup-button" id="find-guide">Find a Guide for this Trail</button>
                        `;
                    let marker = L.marker([response.trails[i].latitude, response.trails[i].longitude], { icon: trailIcon }).addTo(theMap);
                    marker.bindPopup(trailTemplate).openPopup();
                    trailArray.push(marker);

                    // guide count
                    $("body").off().on("click", "button#find-guide", event => {
                        event.preventDefault();
                        let apiId = $("button").data("id");
                        sessionStorage.setItem("trail-id", apiId);
                        console.log(apiId);
                        // findGuide(apiId);
                    });

                }
            });
        };

    };
});
