// after a button is clicked with trail-id data on trail search page
// store that id in local storage (will get overwritten if a diff button gets clicked, only one trail id stored in local storage at a time)

// ON THIS JS FILE
// grab that id from local storage to make an api call to display all users that service that trail
// for each user in that data object, use template literals and push to body of available
let cardEl = $("#guide-cards1");
let apiTrailId = parseInt(sessionStorage.getItem("trail-id"));
console.log(apiTrailId);

$(document).ready(function () {

    $.get(`/api/available-guides/${apiTrailId}`)
        .then(function (data) {
            if (data == "") {
                console.log("Uh oh! No guides currently service this route.");
            }

            for (let i = 0; i < data.guides.length; i++) {
                let guideCard = `                
                    <div class="column">
                        <div class="card" id="guide-card">
                            <div class="card-image">
                                <figure class="image" id="image-wrapper">
                                    <img class="is-rounded prof-img" src="${data.guides[i].guide_icon}">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content has-text-centered" id="basic-info">
                                    <h1 class="purple-color logo-text-prof card-name">
                                        ${data.guides[i].first_name}
                                    </h1>
                                    <p class="text-location logo-text-prof green-color" id="card-username">-${data.guides[i].username}-</p>
                                    <p class="text-location">${data.guides[i].location}</p>
                                    <button data-guideid="${data.guides[i].guide_id}" class="button is-success green-back app-button card-button" id="${data.guides[i].guide_id}">View Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    $("body").off().on("click", "button.card-button", event => {
                        event.preventDefault();
                        let guideId = parseInt(event.target.id);
                        console.log(guideId);
                        window.sessionStorage.setItem("guide-id", guideId);
                        console.log(window.sessionStorage.getItem("guide-id"));
                        window.location.replace("/profile-view");
                    });
                    
                cardEl.append(guideCard);
                
            };
            
        });
        
});

// TO DO: make href route of "Visit Profile" button 
