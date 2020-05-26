$(document).ready(function () {
  // Getting references to our form and inputs
  let loginForm = $("form.login");
  let emailInput = $("input#email-input");
  let passwordInput = $("input#password-input");
  let errorMessage = $("#error-message");
  let modal = document.getElementById("error-modal");
  let span = document.getElementById("close-modal");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    let guideData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!guideData.email || !guideData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(guideData.email, guideData.password);
    emailInput.val("");
    passwordInput.val("");

  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  loginUser = (email, password) => {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function () {
        window.location.replace("/view-my-profile");
        // If there's an error, log the error
      })
      .catch(handleLoginErr);
    
  }
  handleLoginErr = err => {
    console.log(err);
    errorMessage.text("Your Username or Password was incorrect.");
    modal.style.display = "block";
    span.onclick = function () {
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      };
    };
  };
});
