const db = require("./connection.js");
const inquirer = require("inquirer");

async function mainMenu() {
    const {choice} = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What are you choosing',
            choices: [
                'View all departments',
                'View all roles'
            ]
        }
    ])
    switch(choice) {
        case "View all departments":
            return viewAllDepartments();
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

viewAllDepartments()
mainMenu()