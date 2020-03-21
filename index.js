const inquirer = require("inquirer");
const mysql = require("mysql");
const EmployeeBuilder = require("./func");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Do4frnt57",
  database: "employee_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  listHouse();
  
});

function listEmps() {
  connection.query("SELECT * FROM employee;", function (err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
    console.log("first")
  });
}

function listRoles() {
  connection.query("SELECT * FROM roles;", function (err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
  });
}

function listHouse() {
  connection.query("SELECT first_name, last_name, salary, title FROM employee JOIN roles ON employee.id = roles.id;", function (err, data) {
    if (err) {
      throw err;
    }
    console.table(data);
  });
}



function runSearch() {

  return inquirer

    .prompt([
      {
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "Find all artists who appear more than once",
          "Find data within a specific range",
          "Search for a specific song",
          "Find artists with a top song and top album in the same year"
        ]
      }
    ]).then(answers => {
      console.log(answers.action);
      let newPass = new EmployeeBuilder(answers)


      console.log(`Your new password is ${newPass.value}`)

    });
}


// function artistSearch() {
//   connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function (err, result) {
//     if (err) {
//       throw err;
//     }
//   });
// }
