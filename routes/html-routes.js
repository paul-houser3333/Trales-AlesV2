// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/view-my-profile");
    }
    res.sendFile(path.join(__dirname, "../public/visitor-views/home.html"));
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/view-my-profile");
    }
    res.sendFile(path.join(__dirname, "../public/visitor-views/login.html"));
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/view-my-profile");
    }
    res.sendFile(path.join(__dirname, "../public/visitor-views/signup.html"));
  });

  app.get("/add-trails", function(req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/guide-views/add-trails.html"));
    } else {
      res.sendFile(path.join(__dirname, "../public/visitor-views/search-trails.html"));
    }
  });

  app.get("/search-trails", function(req, res) {
    if (req.user) {
      res.sendFile(path.join(__dirname, "../public/guide-views/add-trails.html"));
    }
    res.sendFile(path.join(__dirname, "../public/visitor-views/search-trails.html"));
  });

  app.get("/profile-view", function(req, res) {
    if (req.user) {
      res.redirect("/view-my-profile");
    }
    res.sendFile(path.join(__dirname, "../public/visitor-views/profile-view.html"));
  });

  app.get("/search-all-guides", function(req, res) {
    if (req.user) {
      res.redirect("/view-my-profile");
    }
    res.sendFile(path.join(__dirname, "../public/visitor-views/search-all-guides.html"));
  });

  app.get("/available-guides", function(req, res) {
    if (req.user) {
      res.redirect("/view-my-profile");
    }
    res.sendFile(path.join(__dirname, "../public/visitor-views/available-guides.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/view-my-profile", isAuthenticated, function(req, res) {
    if (!req.user) {
      res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/guide-views/profile-view.html"));
  });
 
  app.get("/edit-profile", function(req, res) {
    if (!req.user) {
      res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/guide-views/edit-profile.html"));
  });
};
