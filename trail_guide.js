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