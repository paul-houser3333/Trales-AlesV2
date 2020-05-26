$(document).ready(function () {

    $.get("/api/guide_data").then(function (data) {

        //grabs state from data location by selecting all characters after comma and space
        const state = data.location.match(/[^,\s]+$/g);
        selectElement('#state-input', state)

        //selects option from input list
        function selectElement(id, optionVal) {
            $(id).val(optionVal);
        }

        //page forms are populated with database information
        $("#first-name-input").val(data.firstName);
        $("#last-name-input").val(data.lastName);
        $("#get-image").attr("src", data.guide_icon);
        $("#get-bio").val(data.bio);
        $("#get-credentials").val(data.credentials);
        $("#get-services").val(data.services);
        $("#get-email").val(data.email);
        $("#city-input").val(data.location.match(/[a-zA-Z0-9\s]+/));


        // click event on edit button that will make a second ajax call to update all user data based on changes in the form
    });
});