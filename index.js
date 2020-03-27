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
          "Add department",
          "Remove employee",
          "Update employee role",
          "Update employee manager",
          "View all departments"

        ]
      }
    ]).then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          listHouse();
          break;

        case "View employees by manager":
          listEmps();
          break;

        case "View employees by department":
          getRoles();
          break;

        case "Add employee":
          employeeAdd();
          break;

        case "Add department":
          departmentAdd();
          break;

        case "View all departments":
          viewDepartments();
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

function viewDepartments() {
  connection.query("SELECT department_name FROM department;", function (err, data) {
    if (err) {
      throw err;
    }
    console.table(data);
    runSearch();
  });
  runSearch();
}

function listEmps() {
  connection.query("SELECT first_name, last_name FROM employee;", function (err, data) {
    if (err) {
      throw err;
    }
    var resultArray = Object.values(JSON.parse(JSON.stringify(data)));
    console.log(resultArray);
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

let emptList = []

function getRoles() {
  connection.query("SELECT roles_id, title FROM roles;", function (err, data) {
    if (err) {
      throw err;
    }
    emptList = Object.values(JSON.parse(JSON.stringify(data)));
    console.log(emptList);

  })
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
        name: "role",
        type: "list",
        message: "What is the title",
        choices: ["Sales", "Customer Service", "Intern", "Manager",
        ],
      }
    ]).then(answers => {
      connection.query("SELECT roles_id FROM roles WHERE title = ?;", [`${answers.role}`], function (err, data) {
        if (err) {
          throw err;
        }
        console.log(answers);
        console.log(data);

        roleId = Object.values(JSON.parse(JSON.stringify(data)))[0].roles_id;
        createEmployee(answers, roleId);

        runSearch();
      })
    })
    .catch(error => {
      if (error.isTtyError) {

      } else {

      }
    });

}

function createEmployee(answers, role_id) {
  console.log("Inserting a new employee...\n");
  let query = connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: `${answers.first}`,
      last_name: `${answers.last}`,
      roles_id: parseInt(role_id),

    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee inserted!\n");
      // Call updateProduct AFTER the INSERT completes

    }
  );

  // logs the actual query being run
  console.log(query.sql);
}
function departmentAdd() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department called?"
      },

    ]).then(function (answer) {
      createDepartment(answer);
      runSearch();
    })
}

function createDepartment(answer) {
  connection.query("INSERT INTO department SET ?",
    {
      department_name: `${answer.department}`
    },
    function (err, res) {
      if (err) throw err;


    }

  )
}


function listHouse() {
  connection.query("SELECT first_name, last_name, salary, title FROM employee JOIN roles ON employee.roles_id = roles.roles_id;", function (err, data) {
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
