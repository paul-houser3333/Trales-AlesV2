drop database test_guides;

CREATE DATABASE hike_hire;
use hike_hire;

CREATE TABLE user_account (
    user_account_id int NOT NULL AUTO_INCREMENT,
    user_name varchar(128) NOT NULL,
    password varchar(32) NOT NULL,
    email varchar(128) NOT NULL,
    first_name varchar(128) NOT NULL,
    last_name varchar(128) NOT NULL,
	CONSTRAINT user_account_pk PRIMARY KEY (user_account_id)
);


CREATE TABLE hiker (
    hiker_id int NOT NULL AUTO_INCREMENT,
    hiker_user_account_id int NOT NULL,
    registration_date date NOT NULL,
    location varchar(255) ,
	CONSTRAINT hiker_pk PRIMARY KEY (hiker_id),
	FOREIGN KEY (hiker_user_account_id)
        REFERENCES user_account(user_account_id)
);


CREATE TABLE guide (
    guide_id int NOT NULL AUTO_INCREMENT,
    guide_user_account_id int NOT NULL,
	registration_date date NOT NULL,
    location varchar(255) NOT NULL,
    CONSTRAINT guide_pk PRIMARY KEY (guide_id),
	FOREIGN KEY (guide_user_account_id)
        REFERENCES user_account(user_account_id)
);

CREATE TABLE trail (
    trail_id int NOT NULL AUTO_INCREMENT,
    api_trail_id varchar(128),
	coordinate POINT NOT NULL,
    trail_name varchar(128) ,
	CONSTRAINT trail_id_pk PRIMARY KEY (trail_id)
) ;


CREATE TABLE Hiker_trail_guide (
    hiker_trail_guide_id int NOT NULL AUTO_INCREMENT,
    hiker_id int ,
    trail_id int ,
    guide_id int ,
	guide_rating int,
    trail_rating int,
    CONSTRAINT hiker_trail_guide_id_pk PRIMARY KEY (hiker_trail_guide_id),
        FOREIGN KEY (hiker_id)
        REFERENCES hiker(hiker_id),
        FOREIGN KEY (trail_id)
        REFERENCES trail(trail_id),
        FOREIGN KEY (guide_id)
        REFERENCES guide(guide_id)
   );

CREATE TABLE proposal_status(
    proposal_status_id int NOT NULL AUTO_INCREMENT,
    status_name varchar(128) NOT NULL,
	CONSTRAINT proposal_status_catalog_pk PRIMARY KEY (proposal_status_id)
) ;

CREATE TABLE proposal (
    proposal_id int NOT NULL AUTO_INCREMENT,
    trail_id int NOT NULL,
    guide_id int NOT NULL,
    hiker_id int NOT NULL,
    proposal_time timestamp NOT NULL,
	proposal_submitted_time timestamp NOT NULL,
    payment_type_id int ,
    payment_amount decimal(8,2) ,
    current_proposal_status int ,
	CONSTRAINT proposal_pk PRIMARY KEY (proposal_id),
            FOREIGN KEY (hiker_id)
        REFERENCES hiker(hiker_id),
        FOREIGN KEY (trail_id)
        REFERENCES trail(trail_id),
        FOREIGN KEY (guide_id)
        REFERENCES guide(guide_id),
          FOREIGN KEY (current_proposal_status)
        REFERENCES proposal_status(proposal_status_id)
);

CREATE TABLE message (
    message_id int NOT NULL AUTO_INCREMENT,
    hiker_id int NULL,
    guide_id int NULL,
    message_time timestamp NOT NULL,
    message_text text NOT NULL,
    proposal_id int NOT NULL,
	CONSTRAINT message_pk PRIMARY KEY (message_id),
            FOREIGN KEY (hiker_id)
        REFERENCES hiker(hiker_id),
		FOREIGN KEY (guide_id)
        REFERENCES guide(guide_id)
) ;


CREATE TABLE contract (
    contract_id int NOT NULL AUTO_INCREMENT,
    proposal_id int NOT NULL,
	start_time timestamp NOT NULL,
    end_time timestamp NULL,
	CONSTRAINT contract_pk PRIMARY KEY (contract_id),
    FOREIGN KEY (proposal_id)
        REFERENCES proposal(proposal_id)
);

