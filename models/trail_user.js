 
// Creating our trailGuide model
module.exports = function (sequelize, DataTypes) {
    const Trail_User = sequelize.define("Trail_User", {
        // The email cannot be null, and must be a proper email before creation
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        trail_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Trail_User;
};