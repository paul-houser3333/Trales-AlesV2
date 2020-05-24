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
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    // console.log(req.body);
    db.User.create({
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

  // app.post("/api/trail-search", function (req, res) {
  //   console.log(req.body.userId);
  //   db.Trail.create({
  //     user_id: req.body.userId,
  //     api_trail_id: req.body.apiTrailId,
  //     trail_name: req.body.trailName,
  //     latitude: req.body.latitude,
  //     longitude: req.body.longitude
  //   })
  //     .catch(function (err) {
  //       res.status(401).json(err);
  //     });
  // });

  // app.post("/api/trailadd", async (req, res, next) => {
  //   try {
  //     const trailids = await db.Trail.findOrCreate({
  //       where: {
  //         api_trail_id: req.body.apiTrailId,
  //         trail_name: req.body.trailName,
  //         latitude: req.body.latitude,
  //         longitude: req.body.longitude
  //       }
  //     });
  //     const currentUser = await db.User.findByPk(req.user.user_id);
  //     await currentUser.addTrail(trailids[0]);
  //     res.json(trailids[0]);
  //   } catch (error) {
  //     next(error);
  //   }
  // });

  app.post("/api/trailadd", async (req, res, next) => {
    try {
      const trailids = await db.Trail.findAll({
        where: {
          api_trail_id: req.body.apiTrailId,
        }
      });
      const currentUser = await db.User.findByPk(req.user.user_id);

      if (res.apiTrailId) {
        const trailUserAdd = await db.Trail.findOrCreate({
          where: {
            api_trail_id: req.body.apiTrailId
          }
        });
        await currentUser.addTrail(trailUserAdd[0]);
        res.json(trailUserAdd[0]);
      } else {
        const trailAdd = await db.Trail.findOrCreate({
          where: {
            api_trail_id: req.body.apiTrailId,
            trail_name: req.body.trailName,
            latitude: req.body.latitude,
            longitude: req.body.longitude
          }
        });
        await currentUser.addTrail(trailAdd[0]);
        res.json(trailAdd[0]);
      }
    } catch (error) {
      next(error);
    }
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The guide is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the guides's info
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
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

  // app.get("/api/guides", function (req, res) {
  // sequelize method for selecting all in users table
  // get back basic data for each (no password)
  // order alphabetically (by first name? username?)
  // });

  // app.get("/api/guides/:username", function (req, res) {
  // sequelize findOne where username = req.params.username and get all user data in the user tbale row (except password)
  // });

};
