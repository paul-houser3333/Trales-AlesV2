 
// Creating our trailGuide model
module.exports = function (sequelize, DataTypes) {
    const Trail_Guide = sequelize.define("Trail_Guide", {
        // The email cannot be null, and must be a proper email before creation
        guide_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        trail_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return Trail_Guide;
};