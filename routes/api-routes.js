// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  //Route for getting all trailes for per guide will service. trail table to (popuplate on map: trail, cords., image)
  // app.get("/api/guideTrail_data", function (req, res) {
  //   if (!req.user) {
      // The user is not logged in, redirect
    //   res.redirect("/");
    // } else {
      // ???? Figure out what kind of query we want and then add to a custom ORM or find best Sequelize method
      
      
      // Otherwise send back: SELECT trail.name, trail.coordinates, guide.id from trail table JOIN with trailGuide table ON trailGuide.guide_id = guide.id????
      // find sequelize method for this^
  //   }
  // });

  //route for getting trails for all guides to service
  // app.get("/api/guideTrail_data", function (req, res) {
  //   if (!req.user) {
      // The user is not logged in, redirect
    //   res.redirect("/");
    // } else {
      
  //   }
  // });






};
