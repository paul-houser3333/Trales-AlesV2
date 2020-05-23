module.exports = function (sequelize, DataTypes) {
    const Trail = sequelize.define("Trail",
        {
            api_id: {
                type: DataTypes.STRING,
                allowNull: false
            },
            trail_name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });

    Trail.associate = function (models) {
        Trail.belongsToMany(models.User, {
            through: "trail_user"
        });
    };
    return Trail;
}