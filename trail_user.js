 // Creating our trailUser model
module.exports = function (sequelize, DataTypes) {
    const Trail_User = sequelize.define("Trail_User", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        trail_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Trail_User;
};