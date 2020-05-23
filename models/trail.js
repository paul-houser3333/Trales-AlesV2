module.exports = function (sequelize, DataTypes) {
    const Trail = sequelize.define("Trail",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            api_trail_id: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            trail_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            latitude: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                defaultValue: null
            },
            longitude: {
                type: DataTypes.DECIMAL,
                allowNull: true,
                defaultValue: null
            }
        });

    Trail.associate = function (models) {
        Trail.belongsToMany(models.User, {
            through: "trail_user",
            as: "users",
            foreignKey: "api_trail_id"
        });
    };
    return Trail;
}