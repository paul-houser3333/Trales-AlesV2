const bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {
    const Guide = sequelize.define("Guide", {
        guide_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
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
        guide_icon: {
            type: DataTypes.STRING,
            allowNull: true
//             validate: {
//                 isUrl: true
//             }
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        credentials: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        services: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Creating a custom method for our guide model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    Guide.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the guide Model lifecycle
    // In this case, before a guide is created, we will automatically hash their password
    Guide.addHook("beforeCreate", function (guide) {
        guide.password = bcrypt.hashSync(guide.password, bcrypt.genSaltSync(10), null);
    });

    Guide.associate = function(models) {
        Guide.belongsToMany(models.Trail, {
            through: "trail_guide",
            as: "trails",
            foreignKey: "guide_id",
            // defaultValue: 1
        });
    };

    return Guide;
};