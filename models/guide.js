// CREATE TABLE guide (
//     guide_id int NOT NULL AUTO_INCREMENT,
//     guide_user_account_id int NOT NULL,
// 	registration_date date NOT NULL,
//     location varchar(255) NOT NULL,
//     CONSTRAINT guide_pk PRIMARY KEY (guide_id),
// 	FOREIGN KEY (guide_user_account_id)
//         REFERENCES user_account(user_account_id)
// );
module.exports = function (sequelize, DataTypes) {
    const Guide = sequelize.define("Guide", {

        guide_id: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        //profile picture. can be null
        guide_icon: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
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
        //guide bio 
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        //
        location: {
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
        // The password cannot be null
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
    return Guide;
};