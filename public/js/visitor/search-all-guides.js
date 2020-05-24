// api call to get all guide's picture, name, and location
// Store those data objects in an array and for each, create a card with template literals to push to a body section


// TO DO: make href route of "Visit Profile" button 
let guideCard = `                
<div class="column">
    <div class="card" id="guide-card">
        <div class="card-image">
            <figure class="image is-256x256" id="image-wrapper">
                <img class="is-rounded prof-img" src="${imageURL}">
            </figure>
        </div>
        <div class="card-content">
            <div class="content has-text-centered" id="basic-info">
                <h1 class="white-color logo-text-prof">
                    ${firstName}
                </h1>
                <p class="text-location">${location}</p>
                <a class="green-color logo-text-smaller" href="">
                    Visit Profile
                </a>
            </div>
        </div>
    </div>
</div>
`;