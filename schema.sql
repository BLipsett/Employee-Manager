DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,4) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  deartment_name VARCHAR (30) NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ("brian", "lipsett", 7, 3);
INSERT INTO roles (title, salary, department_id) VALUE ("Airplane Mechanic", 500000, 2);