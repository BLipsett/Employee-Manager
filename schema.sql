DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR (30) NOT NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE roles (
  roles_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(10,4) NULL,
  department_id INT,
  PRIMARY KEY (roles_id),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INT,
  manager_id INT,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (roles_id) REFERENCES roles (roles_id)


INSERT INTO employee (first_name, last_name) VALUES ("Ricky", "Bobby");
INSERT INTO roles (title, salary) VALUE ("Driver", 50000);
INSERT INTO departments (department_name) VALUE ("Race Team");