// CREATE TABLE guide (
//     guide_id int NOT NULL AUTO_INCREMENT,
//     guide_user_account_id int NOT NULL,
// 	registration_date date NOT NULL,
//     location varchar(255) NOT NULL,
//     CONSTRAINT guide_pk PRIMARY KEY (guide_id),
// 	FOREIGN KEY (guide_user_account_id)
//         REFERENCES user_account(user_account_id)
// );