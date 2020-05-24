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

    // MAKE API CALL TO GET A USER WITH ID PASSED IN QUERY PARAMETER
    // testing with guide ID=1
    // how to pass in the a chaning id? variable that stores id of guide preview card that was clicked? store in local storage the changing number of each guide who is searched?
    
    $.get("/api/guide/1").then(function (data) {
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

    // or here?

});