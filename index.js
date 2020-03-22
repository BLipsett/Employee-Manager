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
  //listHouse();
  runSearch();

});





function runSearch() {

  return inquirer

    .prompt([
      {
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View employees by manager",
          "View employees by department",
          "Add employee",
          "Remove employee",
          "Update employee role",
          "Update employee manager",
          "View all roles"

        ]
      }
    ]).then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          listHouse();
          break;

        case "View employees by manager":
          employeeManager();
          break;

        case "View employees by department":
          employeeDepartment();
          break;

        case "Add employee":
          employeeAdd();
          break;

        case "Find artists with a top song and top album in the same year":
          songAndAlbumSearch();
          break;
      }
    });
}

function employeeManager() {
  connection.query("SELECT first_name, last_name FROM employee;", function (err, data) {
    if (err) {
      throw err;
    }
    var resultArray = Object.values(JSON.parse(JSON.stringify(data)));

    for (key in resultArray) {
      if (resultArray.hasOwnProperty(key)) {
        var value = resultArray[key];
        //do something with value;

        let fullName = `${value.first_name} ${value.last_name}`
        console.log(fullName)

        return inquirer

          .prompt({
            name: "manager",
            type: "rawlist",
            message: "Whomst management team are you looking for?",
            choices: "cheese"
          })
          .then(function (answer) {
            console.log(answer)

          });
      }
    }
  });
}
function employeeDepartment() {

  return inquirer

    .prompt({
      name: "manager",
      type: "rawlist",
      message: "Whomst management team are you looking for?",
      choices: "cheese"
    })
    .then(function (answer) {
      console.log(answer)

      runSearch();
    });
}

function artistSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function (answer) {
      var query = "SELECT position, song, year FROM top5000 WHERE ?";
      connection.query(query, { artist: answer.artist }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        }
        runSearch();
      });
    });
}

function listEmps() {
  connection.query("SELECT first_name, last_name FROM employee;", function (err, data) {
    if (err) {
      throw err;
    }
    var resultArray = Object.values(JSON.parse(JSON.stringify(data)));

    for (key in resultArray) {
      if (resultArray.hasOwnProperty(key)) {
        var value = resultArray[key];
        //do something with value;

        let fullName = `${value.first_name} ${value.last_name}`
        console.log(fullName)
      }
    }
    runSearch();
  });
}

function employeeAdd() {

  return inquirer

    .prompt([
      {
        name: "first",
        type: "input",
        message: "What is the employees first name?"
      },
      {
        name: "last",
        type: "input",
        message: "Last name?"
      },
      {
        name: "salary",
        type: "input",
        message: "Salary?",
        // validate: (function (value) {

        // })
      },
      {
        name: "title",
        type: "input",
        message: "Job title?"
      },
      {
        name: "department",
        type: "input",
        message: "Department?"
      }
    ]).then(answers => {
      console.log(answers);
      createEmployee(answers)

    })
    .catch(error => {
      if (error.isTtyError) {

      } else {

      }
    });

}

function createEmployee(answers) {
  console.log("Inserting a new employee...\n");
  let query = connection.query(
      "INSERT INTO employee SET ?",
      {
          first_name: `${answers.first}`,
          last_name: `${answers.last}`,
          // salary: `${answers.salary}`,
          // title: `${answers.title}`,
          // deartment: `${answers.department}`
      },
      function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " product inserted!\n");
          // Call updateProduct AFTER the INSERT completes

      }
  );

  // logs the actual query being run
  console.log(query.sql);
}



function listHouse() {
  connection.query("SELECT first_name, last_name, salary, title FROM employee JOIN roles ON employee.id = roles.id;", function (err, data) {
    if (err) {
      throw err;
    }
    console.table(data);
    runSearch();
  });
}

// function artistSearch() {
//   connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function (err, result) {
//     if (err) {
//       throw err;
//     }
//   });
// }
