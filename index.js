const inquirer = require("inquirer");
const db = require("./db/connection");
const { allDeptartments, allRoles, allEmployees } = require("./queries/viewQuery");
const { addDeptartments, addRoles, addEmployees } = require("./queries/addQuery");
const { updateEmployees } = require("./queries/updateQuery");

// Ends the connection to the database and exits the application
function done() {
  console.log("Have a nice day!");
  db.end();
  process.exit();
}

// Prompts the user to select an action to perform
function promptUser() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Choose an action.",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee's Role",
          "Exit",
        ],
      },
    ])

    .then((response) => {
      switch (response.choices) {
        case "View All Departments":
          allDeptartments();
          break;

        case "View All Roles":
          allRoles();
          break;

        case "View All Employees":
          allEmployees();
          break;

        case "Add a Department":
          addDeptartments();
          break;

        case "Add a Role":
          addRoles();
          break;

        case "Add an Employee":
          addEmployees();
          break;

        case "Update an Employee's Role":
          updateEmployees();
          break;

        case "Exit":
          console.log("Exiting...");
          done();

        default:
          console.log("Invalid, please select a valid option.");
      }
      setTimeout(() => {
        promptUser();
      }, 10000);
    })
    .catch((err) => {
      console.error(err);
    });
}

promptUser();
