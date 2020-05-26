$(document).ready(function () {

    $.get("/api/guide_data").then(function (data) {

        //grabs state from data location by selecting all characters after comma and space
        const state = data.location.match(/[^,\s]+$/g);
        selectElement("#state-input", state);

        //selects option from input list
        function selectElement(id, optionVal) {
            $(id).val(optionVal);
        }

        //page forms are populated with database information
        $("#first-name-input").val(data.firstName);
        $("#last-name-input").val(data.lastName);
        $("#username-input").val(data.username);
        $("#get-currentImage").attr("src", data.guideIcon);
        console.log(data.guideIcon);
        $("#get-bio").val(data.bio);
        $("#get-credentials").val(data.credentials);
        $("#get-services").val(data.services);
        $("#get-email").val(data.email);
        $("#city-input").val(data.location.match(/[a-zA-Z0-9\s]+/));


        // click event on edit button that will make a second ajax call to update all user data based on changes in the form
        // });
    });

    $("button#save-button").on("click", event => {
        event.preventDefault();
        console.log($("#get-currentImage").attr("src"));
        let newState = $("#state-input").val();

        let guideData = {
            first_name: $("#first-name-input").val(),
            last_name: $("#last-name-input").val(),
            username: $("#username-input").val(),
            email: $("#get-email").val(),
            location: $("#city-input").val() + ", " + newState,
            guide_icon: $("#get-currentImage").attr("src"),
            bio: $("#get-bio").val(),
            credentials: $("#get-credentials").val(),
            services: $("#get-services").val()
        }

        $.ajax({
            type: 'PUT',
            url: "/api/update-profile",
            contentType: 'application/json',
            data: JSON.stringify(guideData), // access in body
        }).done(function () {
            console.log('SUCCESS');
            console.log($("#get-currentImage").attr("src"));
            window.location.replace("/view-my-profile");
        }).fail(function (msg) {
            console.log('FAIL');
        }).always(function (msg) {
            console.log('ALWAYS');
        });
    });

    let deleteModal = document.getElementById("confirm-delete-modal");
    $(".delete-profile").on("click", event => {
        event.preventDefault();
        // confirm delete modal
        deleteModal.style.display = "block";

        // When the user clicks anywhere outside of the modal or on the "x" button
        $("body").on("click", event => {
            event.preventDefault();
            if (event.target == deleteModal || event.target.id === "close-modal" || event.target.id === "closeToo") {
                deleteModal.style.display = "none";
            } else if (event.target.id === "deleteBtn") {
                $.ajax({
                    url: "/api/delete-profile",
                    type: "DELETE"
                })
                    .then(function () {
                        $.get("/logout")
                            .then(function () {
                                location.reload();
                    });
                });
            }
        })

    });

});