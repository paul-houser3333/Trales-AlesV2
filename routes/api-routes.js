// Requiring our models and passport as we've configured it
let db = require("../models");
let passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.guide_id
    });
  });
  
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    // console.log(req.body);
    db.Guide.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      guide_icon: req.body.imgURL,
      bio: req.body.bio,
      credentials: req.body.credentials,
      services: req.body.services,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/add-trail", async (req, res, next) => {
    try {
      const loggedGuide = await db.Guide.findByPk(req.user.guide_id);
      const addTrail = await db.Trail.findOrCreate({
        where: {
          api_trail_id: req.body.apiTrailId,
          trail_name: req.body.trailName,
          latitude: req.body.latitude,
          longitude: req.body.longitude
        }
      });
      await loggedGuide.addTrail(addTrail[0]);
      res.json(addTrail[0]);
      // }
    } catch (error) {
      next(error);
    }
  });

  // THIS ROUTE CAN BE DELETED IF NOT USED ANYWHERE
  // Route for getting some data about our user to be used client side
  app.get("/api/guide_data", function (req, res) {
    if (!req.user) {
      // The guide is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the guides's info
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        guideId: req.user.guide_id,
        firstName: req.user.first_name,
        lastName: req.user.last_name,
        username: req.user.username,
        email: req.user.email,
        location: req.user.location,
        imgURL: req.user.guide_icon,
        bio: req.user.bio,
        credentials: req.user.credentials,
        services: req.user.services
      });
    }
  });

  app.get("/api/my-trails", async (req, res, next) => {
    try {
      const myTrails = await db.Guide.findOne({
        where: { guide_id: req.user.guide_id },
        include: {
          model: db.Trail, as: 'trails'
        }
      })
        .then(data => {
          res.send(data);
        })
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/available-guides/:id", async (req, res, next) => {
    try {
      const availableGuides = await db.Trail.findOne({
        where: { api_trail_id:  req.params.id},
        include: {
          model: db.Guide, as: 'guides'
        }
      })
      .then(data => {
        res.send(data);
      })
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/guides", async (req, res, next) => {
    try {
      const allGuides = await db.Guide.findAll({
        include: {
          model: db.Trail, as: 'trails'
        }
      })
        .then(data => {
          res.send(data);
        })
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/guides/:id", async (req, res, next) => {
    try {
      const guideTrails = await db.Guide.findOne({
        where: { guide_id: req.params.id },
        include: {
          model: db.Trail, as: 'trails'
        }
      })
        .then(data => {
          res.send(data);
        })
    } catch (error) {
      next(error);
    }
  });

  // app.get("/api/guides", function (req, res) {
  // sequelize method for selecting all in users table
  // get back basic data for each (no password)
  // order alphabetically (by first name? username?)
  // });

  // app.get("/api/guides/:id", function (req, res) {
  // // sequelize findOne where user_id = req.params.user_id and get all user data in the user tbale row (except password)
  // });

};
