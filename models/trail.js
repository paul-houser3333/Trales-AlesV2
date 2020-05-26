module.exports = function (sequelize, DataTypes) {
    const Trail = sequelize.define("Trail", {
        // guide_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
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
            type: DataTypes.DECIMAL(10,6),
            allowNull: true,
            defaultValue: null
        },
        longitude: {
            type: DataTypes.DECIMAL(10,6),
            allowNull: true,
            defaultValue: null
        }
    });

    Trail.associate = function (models) {
        Trail.belongsToMany(models.Guide, {
            through: "trail_guide",
            as: "guides",
            foreignKey: "api_trail_id",
            // defaultValue: 1
        });
    };
    return Trail;
}