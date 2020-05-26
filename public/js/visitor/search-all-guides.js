// api call to get all guide's picture, name, and location
// Store those data objects in an array and for each, create a card with template literals to push to a body section
// let 
let cardEl = $("#guide-cards2");
console.log("hello");
$(document).ready(function () {
    $.get("/api/guides")
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                let guideCard = `                
                    <div class="column">
                        <div class="card" id="guide-card">
                            <div class="card-image">
                                <figure class="image" id="image-wrapper">
                                    <img class="is-rounded prof-img" src="${data[i].guide_icon}">
                                </figure>
                            </div>
                            <div class="card-content">
                                <div class="content has-text-centered" id="basic-info">
                                    <h1 class="purple-color logo-text-prof card-name">
                                        ${data[i].first_name}
                                    </h1>
                                    <p class="text-location">${data[i].location}</p>
                                    <button data-guideid="${data[i].guide_id}" class="button is-success green-back app-button card-button" id="${data[i].guide_id}">Visit Profile</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    // console.log(`${data[i].user_id}`)
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
