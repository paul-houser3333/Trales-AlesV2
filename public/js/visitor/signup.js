$(document).ready(function () {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let firstNameInput = $("input#first-name-input");
  let lastNameInput = $("input#last-name-input");
  let usernameInput = $("input#username-input");
  let emailInput = $("input#email-input");
  let cityInput = $("input#city-input");
  let stateSelect = $("select#state-input");
  // let imageUrlInput = $("input#image-input");
  // let bioInput = $("textarea#bio-input");
  // let credentialsInput = $("textarea#credentials-input");
  // let servicesInput = $("textarea#services-input");
  let passwordInput = $("input#password-input");
 
  

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    let guideData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      location: cityInput.val().trim() + ", " + stateSelect.val(),
      // imgURL: imageUrlInput.val().trim(),
      // bio: bioInput.val().trim(),
      // credentials: credentialsInput.val().trim(),
      // services: servicesInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!guideData.firstName || !guideData.email || !guideData.password) {
      handleLoginErr();
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(guideData.firstName, guideData.lastName, guideData.username, guideData.email, guideData.location, "http://res.cloudinary.com/dcyyaezfa/image/upload/v1590475579/dnugropu1lgxlb9xfh3k.png", "", "", "", guideData.password);
    firstNameInput.val("");
    lastNameInput.val("");
    usernameInput.val("");
    emailInput.val("");
    cityInput.val("");
    stateSelect.val("AL");
    // imageUrlInput.val("");
    // bioInput.val("");
    // credentialsInput.val("");
    // servicesInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  signUpUser = (firstName, lastName, username, email, location, iconURL, bio, credentials, services, password) => {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      location: location,
      iconURL: iconURL,
      bio: bio,
      credentials: credentials,
      services: services,
      password: password
    })
      .then(function (data) {
        window.location.replace("/view-my-profile");

      })
      .catch(handleLoginErr);
  }

  let modal = document.getElementById("error-modal");
  let span = document.getElementById("close-modal");
  let errorMessage = $("#error-message");
  
  handleLoginErr = err => {
    console.log(err);
    errorMessage.text("It looks like something went wrong. Please try again! (Hints: You may not have filled out all the required fields. Your email address may not be unique.");
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    };
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      };
    };
  };
});
