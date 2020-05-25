// after a button is clicked with trail-id data on trail search page
// store that id in local storage (will get overwritten if a diff button gets clicked, only one trail id stored in local storage at a time)

// ON THIS JS FILE
// grab that id from local storage to make an api call to display all users that service that trail
// for each user in that data object, use template literals and push to body of available
let cardEl = $("#guide-cards");
let apiId = parseInt(sessionStorage.getItem("trail-id"));
console.log(apiId);

$(document).ready(function () {

    $.get(`/api/trailguides/${apiId}`)
        .then(function (data) {
            console.log(data);

            for (let i = 0; i < data.users.length; i++) {
                let guideCard = `                
                    <div class="column">
                        <div class="card" id="guide-card">
                            <div class="card-image">
                                <figure class="image is-256x256" id="image-wrapper">
                                    <img class="is-rounded prof-image" src="${data.users[i].guide_icon}">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content has-text-centered" id="basic-info">
                                    <h1 class="white-color logo-text-prof">
                                        ${data.users[i].first_name}
                                    </h1>
                                    <p class="text-location">${data.users[i].location}</p>
                                    <button data-guideid="${data.users[i].user_id}" class="button is-success is-small card-button" id="${data.users[i].user_id}">Visit Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    $("body").off().on("click", "button.card-button", event => {
                        event.preventDefault();
                        let userId = parseInt(event.target.id);
                        console.log(userId);
                        window.sessionStorage.setItem("guideid", userId);
                        console.log(window.sessionStorage.getItem("guideid"));
                        window.location.replace("/profile-view");
                    });
                cardEl.append(guideCard);
                
            };
            
        });
        
});

// TO DO: make href route of "Visit Profile" button 
