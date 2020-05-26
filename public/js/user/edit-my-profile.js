$(document).ready(function () {

    $.get("/api/guide_data").then(function (data) {

        //grabs state from data location by selecting all characters after comma and space
        const state = data.location.match(/[^,\s]+$/g);
        selectElement("#state-input", state)

        //selects option from input list
        function selectElement(id, optionVal) {
            $(id).val(optionVal);
        }

        //page forms are populated with database information
        $("#first-name-input").val(data.firstName);
        $("#last-name-input").val(data.lastName);
        $("#username-input").val(data.username);
        $("#get-image").attr("src", data.guide_icon);
        console.log(data.guideIcon);
        $("#get-bio").val(data.bio);
        $("#get-credentials").val(data.credentials);
        $("#get-services").val(data.services);
        $("#get-email").val(data.email);
        $("#city-input").val(data.location.match(/[a-zA-Z0-9\s]+/));


        // click event on edit button that will make a second ajax call to update all user data based on changes in the form
        // });
    });

    $("button#edit-button").on("click", event => {
        event.preventDefault();
        console.log($("#get-image").attr("src"));

        let data = {
            firstName: $("#first-name-input").val(),
            lastName: $("#last-name-input").val(),
            username: $("#username-input").val(),
            email: $("#get-email").val(),
            location: $("#city-input").val(),
            guide_icon: $("#get-image").attr("src"),
            bio: $("#get-bio").val(),
            credentials: $("#get-credentials").val(),
            services: $("#get-services").val()
        }

        $.ajax({
            type: 'PUT',
            url: "/api/updateprofile",
            contentType: 'application/json',
            data: JSON.stringify(data), // access in body
        }).done(function () {
            console.log('SUCCESS');
            console.log($("#get-image").attr("src"));
            window.location.replace("/view-my-profile");
        }).fail(function (msg) {
            console.log('FAIL');
        }).always(function (msg) {
            console.log('ALWAYS');
        });
    });

    $("button#delete-button").on("click", event => {
        event.preventDefault();
        if (window.confirm("Uh oh! It looks you're about to take this one off the map. Is this really what you want to do?")) {

            // $.delete = function(url, data, callback, type){

            //     if ( $.isFunction(data) ){
            //       type = type || callback,
            //           callback = data,
            //           data = {}
            //     }

            //     return $.ajax({
            //       url: url,
            //       type: 'DELETE',
            //       success: callback,
            //       data: data,
            //       contentType: type
            //     });
            //   }

            $.ajax({
                url: "/api/deleteprofile",
                type: "DELETE"
            })
                .then(function () {
                    $.get("/logout")
                        .then(function () {
                            location.reload();
                        });
                });
        };

    });
});