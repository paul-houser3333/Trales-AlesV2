$(document).ready(function () {
    let firstNameEl = $("#get-firstName");
    let imgEl = $("#get-image");
    let usernameEl = $("#get-username");
    let locationEl = $("#get-location");
    let bioEl = $("#get-gio");
    let credentialsEl = $("#get-credentials");
    let servicesEl = $("#get-services");

    $.get("/api/user_data").then(function(data) {
        firstNameEl.text(data.firstName);
        imgEl.attr("src", data.imgURL);
        usernameEl.text(data.username);
        locationEl.text(data.location);
        bioEl.text(data.bio);
        credentialsEl.text(data.credentials);
        servicesEl.text(data.services);
    });
});
