const db = require("./connection.js");
const inquirer = require("inquirer");

async function mainMenu() {
    const {choice} = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do today?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    switch(choice) {
        case "View all departments":
            return viewAllDepartments();
        case "View all roles":
            return viewAllRoles();
        case "View all employees":
            return viewAllEmployees();
        case "Add a department":
            return addDepartment();
        case "Add a role":
            return addRole();
        case "Add an employee":
            return addEmployee();
        case "Update an employee role":
            return updateEmployeeRole();
        case "Exit":
            return quitApp();
    }
};

function viewAllDepartments() {
    const query = "SELECT * FROM department"
    db.query(query, (err, res) => {
        if (err) return err;
        console.table(res);
    })
    mainMenu()
}

function viewAllRoles() {
    const query = "SELECT * FROM role"
    db.query(query, (err, res) => {
        if (err) return err;
        console.table(res);
    })
    mainMenu()
}
function viewAllEmployees() {
    const query = "SELECT * FROM employee"
    db.query(query, (err, res) => {
        if (err) return err;
        console.table(res);
    })
    mainMenu()
}

async function addDepartment() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you are adding?'
        }
    ])
    const query = "INSERT INTO department (name) VALUES (?)";
    const values = answer.name;

    db.query(query, values, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Department added successfully");
        }
        mainMenu();
    })
}

async function addRole() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role you are adding?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'How much does this role make?'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What department ID does this role belong to?'
        }
    ])
    const query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    const values = [answers.title, answers.salary, answers.departmentId];
    db.query(query, values, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Role added successfully");
        }
        mainMenu();
});
};

async function addEmployee() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee you are adding?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee you are adding?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the role ID this employee is being asigned?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is this employees managers ID if applicable'
        }
    ])
    const managerId = answers.managerId ? answers.managerId : null;
    const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    const values = [answers.firstName, answers.lastName, answers.roleId, managerId];
    db.query(query, values, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Employee added successfully");
        }
        mainMenu();
    });
}

async function updateEmployeeRole() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee you would like to update'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the new role ID for this employee'
        },
    ]);
    const query = "UPDATE employee SET role_id = ? WHERE id = ?";
    const values = [answers.roleId, answers.employeeId];
    db.query(query, values, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Employee updated successfully");
        }
        mainMenu();
    });
}

function quitApp() {
    console.log('Quitting the application...');
    process.exit(0); 
  }

mainMenu()