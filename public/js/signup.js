$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var firstNameInput = $("input#first-name-input");
  var lastNameInput = $("input#last-name-input");
  var usernameInput = $("input#username-input");
  var emailInput = $("input#email-input");
  let cityInput = $("input#city-input");
  let stateSelect = $("select#state-input");
  let imageUrlInput = $("input#image-input");
  let bioInput = $("textarea#bio-input");
  let credentialsInput = $("textarea#credentials-input");
  let servicesInput = $("textarea#services-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      location: cityInput.val().trim() + ", " + stateSelect.val(),
      imgURL: imageUrlInput.val().trim(),
      bio: bioInput.val().trim(),
      credentials: credentialsInput.val().trim(),
      services: servicesInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.firstName || !userData.username || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstName, userData.lastName, userData.username, userData.email, userData.location, userData.imgURL, userData.bio, userData.credentials, userData.services, userData.password);
    firstNameInput.val("");
    lastNameInput.val("");
    usernameInput.val("");
    emailInput.val("");
    cityInput.val("");
    stateSelect.val("AL");
    imageUrlInput.val("");
    bioInput.val("");
    credentialsInput.val("");
    servicesInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, username, email, location, imgURL, bio, credentials, services, password) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      location: location,
      imgURL: imgURL,
      bio: bio,
      credentials: credentials,
      services: services,
      password: password
    })
      .then(function (data) {
        window.location.replace("/members");

      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(JSON.stringify(err));
  }
});
