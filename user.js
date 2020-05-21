var bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        //first name
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //last name. can be null
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        //profile picture. can be null
        guide_icon: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        //guide bio 
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        credentials: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        services: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Creating a custom method for our guide model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the guide Model lifecycle
    // In this case, before a guide is created, we will automatically hash their password
    User.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};