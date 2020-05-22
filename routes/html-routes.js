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
    res.sendFile(path.join(__dirname, "../public/visitor-views/home.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/visitor-views/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/visitor-views/signup.html"));
  });

  app.get("/trail-search", function(req, res) {
    // If the user already has an account send them to the members page
    // TO DO: make html file for guides to search trails that they are availbale to guide on, for not, redirect to members account page
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/user-views/trail-search.html"));
    } else {
      res.sendFile(path.join(__dirname, "../public/visitor-views/trail-search.html"));
    }
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    // if user is in guide table, direct to member.html
    // else direct to create-guide.html
    res.sendFile(path.join(__dirname, "../public/user-views/members.html"));
  });

  // app.get("/search-guides/:username", function(req, res) {
  //   if (req.user.username === req.params.username) {
  //     res.redirect("/view-my-profile");
  //   } 
  //   // else if (req.user) {
  //   //   res.sendFile(path.join(__dirname, "../public/profile-view.html"));
  //   // }
  //   res.sendFile(path.join(__dirname, "../public/profile-view.html"));
  // });  

  app.get("/view-my-profile", function(req, res) {
    if (!req.user) {
      res.redirect("/signup");
    }
    res.sendFile(path.join(__dirname, "../public/user-views/profile-view.html"));
  });  

};
