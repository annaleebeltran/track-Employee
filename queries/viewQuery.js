const db = require("../db/connection");

// These functions selects all departments from the database and displays them in a table.
function allDept() {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log("\nDepartments");
    console.table(results);
    console.log("\n");
  });
}

//Th
function allRoles() {
  db.query(
    "SELECT role.id, role.title, role.salary, department.dept_name AS department_name FROM role JOIN department ON role.department_id = department.id",
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("\nRoles");
      console.table(results);
      console.log("\n");
    }
  );
}

function allEmployees() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title AS job_title, department.dept_name AS department_name, role.salary as salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id",
    (err, results) => {
      if (err) {
        console.log(err);
      }
      console.log("\nEmployees");
      console.table(results);
      console.log("\n");
    }
  );
}

module.exports = { allDept, allRoles, allEmployees };
