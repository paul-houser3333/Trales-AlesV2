// CREATE TABLE guide_trail (
//     guide_trail_id int NOT NULL AUTO_INCREMENT,
//     guide_id int ,
//     trail_id int ,
//     CONSTRAINT guide_trail_id_pk PRIMARY KEY (hiker_trail_guide_id),
//         FOREIGN KEY (trail_id)
//         REFERENCES trail(trail_id),
//         FOREIGN KEY (guide_id)
//         REFERENCES guide(guide_id)
//    );

// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines

// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var Trail_Guide = sequelize.define("Trail_Guide", {
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
