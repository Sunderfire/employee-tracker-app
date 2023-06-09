const db = require("./connection.js");
const inquirer = require("inquirer");

async function mainMenu() {
    const {choice} = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What are you like to view?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
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
            return addADepartment();
    }
}







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

async function addADepartment() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you want to add?'
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

mainMenu()