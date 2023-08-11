const inquirer = require("inquirer");
const db = require("../db/connection");


function addDeptartments() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What department would you like to be be added?",
      },
    ])

    .then((data) => {
      const deptInput = data.department;

      db.query(
        "INSERT INTO department (dept_name) VALUES (?)",
        [deptInput],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(`${data.department} has been added`);
        }
      );
    });
}

function addRoles() {
  db.query("SELECT DISTINCT id, dept_name FROM department", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const deptOptions = results.map((department) => ({
        name: department.dept_name,
        value: department.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "role_title",
            message: "What role would you like to add to the database?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary for this role?",
          },
          {
            type: "list",
            name: "role_dept",
            message: "Where does this role belong to?",
            choices: deptOptions,
          },
        ])

        .then((data) => {
          const roleInput = data.role_title;
          const roleSalary = data.salary;
          const roleDept = data.role_dept;

          db.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [roleInput, roleSalary, roleDept],
            (err, results) => {
              if (err) {
                console.log(err);
              }
              console.log(`${data.role_title} has been added.`);
            }
          );
        });
    }
  });
}

function addEmployees() {
  db.query("SELECT DISTINCT id, title FROM role", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const roleOptions = results.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      db.query(
        'SELECT e1.id, CONCAT(e1.first_name, " ", e1.last_name) AS manager_name FROM employee e1 JOIN employee e2 ON e1.id = e2.manager_id GROUP BY e1.id',
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            const mgrOptions = results.map((manager) => ({
              name: manager.manager_name,
              value: manager.id,
            }));
            mgrOptions.push({ name: "None", value: null });

            inquirer
              .prompt([
                {
                  type: "input",
                  name: "first_name",
                  message: "Employee's first name?",
                },
                {
                  type: "input",
                  name: "last_name",
                  message: "Employee's last name?",
                },
                {
                  type: "list",
                  name: "role",
                  message: "Employee's position?",
                  choices: roleOptions,
                },
                {
                  type: "list",
                  name: "manager",
                  message: "Employee reports to?",
                  choices: mgrOptions,
                },
              ])

              .then((data) => {
                const empFirstName = data.first_name;
                const empLastName = data.last_name;
                const empRole = data.role;
                const empMgr = data.manager;

                db.query(
                  "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                  [empFirstName, empLastName, empRole, empMgr],
                  (err, results) => {
                    if (err) {
                      console.log(err);
                    }
                    console.log(
                      `${data.first_name} ${data.last_name} has been added.`
                    );
                  }
                );
              });
          }
        }
      );
    }
  });
}

module.exports = { addDeptartments, addRoles, addEmployees };
