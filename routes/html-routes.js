// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // TO DO: after adding more HTML files, update these routes as needed
    
    // If the user already has an account send them to the members page
    // send logged in guides to their members page (account page, with menu for creating/updating profile information, adding trails they are availbale to guide, and log out option)
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/trail-search", function(req, res) {
    // If the user already has an account send them to the members page
    // TO DO: make html file for guides to search trails that they are availbale to guide on, for not, redirect to members account page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/trail-search.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    // if user is in guide table, direct to member.html
    // else direct to create-guide.html
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // TO DO: *authenticate* profile route that checkes if user has a guide profile
  // If guide profile, send html file that has options for viewing and updating profile
  // If not guide profile, send html file that has 'create profile' form

  // TO DO: *authenticate* my-trails html file and route that makes api call in js to REI, 
  // HTML page will prompt guide to "add" trails they've hiked
  // Map pin pop-ups have button (see what progress Andrew's made with this) to "add" a trail to the Trails model table. 
  // When a trail is added, a second button appears/become interactable for adding trail to guide's availability (adds it to trail-guide model table)
  

};
