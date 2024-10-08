CREATE TABLE users(
   id INT,
   email VARCHAR(255) NOT NULL,
   password VARCHAR(255) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(email)
);

CREATE TABLE general_informations(
   id INT,
   first_name VARCHAR(100) NOT NULL,
   name VARCHAR(100) NOT NULL,
   age INT NOT NULL,
   genre VARCHAR(150) NOT NULL,
   situation VARCHAR(255) NOT NULL,
   status VARCHAR(100) NOT NULL,
   id_1 INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(id_1),
   FOREIGN KEY(id_1) REFERENCES users(id)
);

CREATE TABLE emotions(
   id INT,
   states VARCHAR(255) NOT NULL,
   id_1 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_1) REFERENCES users(id)
);

CREATE TABLE motivations(
   id INT,
   states VARCHAR(255) NOT NULL,
   support LOGICAL NOT NULL,
   consult LOGICAL NOT NULL,
   id_1 INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(id_1),
   FOREIGN KEY(id_1) REFERENCES users(id)
);

CREATE TABLE objectives(
   id INT,
   description_objectifs VARCHAR(255),
   evolution INT,
   PRIMARY KEY(id)
);

CREATE TABLE mental_healths(
   id INT,
   symptoms LOGICAL NOT NULL,
   stress INT NOT NULL,
   id_1 INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(id_1),
   FOREIGN KEY(id_1) REFERENCES users(id)
);

CREATE TABLE addictions(
   id INT,
   type VARCHAR(200) NOT NULL,
   frequency VARCHAR(255) NOT NULL,
   duration VARCHAR(100) NOT NULL,
   consequences VARCHAR(255),
   weaning VARCHAR(255),
   id_1 INT NOT NULL,
   id_2 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_1) REFERENCES objectives(id),
   FOREIGN KEY(id_2) REFERENCES users(id)
);
