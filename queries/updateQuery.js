const inquirer = require("inquirer");
const db = require("../db/connection");


function updateEmployee() {
  db.query("SELECT DISTINCT id, title FROM role", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const roleOptions = results.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      db.query(
        'SELECT id, CONCAT(first_name, " " , last_name) AS employee_name FROM employee',
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            const empOptions = results.map((employee) => ({
              name: employee.employee_name,
              value: employee.id,
            }));
            if (empOptions.length === 0) {
              console.log("No employees were found.");
              return;
            }
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "employee",
                  message: "What employee would you like to update?",
                  choices: empOptions,
                },
                {
                  type: "list",
                  name: "role",
                  message: "What role do you need to change the employee to?",
                  choices: roleOptions,
                },
              ])

              .then((data) => {
                const empName = data.employee;
                const empRole = data.role;

                db.query(
                  "UPDATE employee SET role_id = ? WHERE id = ?",
                  [empRole, empName],
                  (err, results) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log(`The employee's role has been updated.`);
                  }
                );
              });
          }
        }
      );
    }
  });
}

module.exports = { updateEmployee };
