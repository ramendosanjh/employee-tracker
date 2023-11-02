const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require("asciiart-logo");

// Call the init function to start the application
init();

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 'PORT;8889',
  password: 'Harjinder97',
  database: 'ecommerce_db',
});
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ' + err.message);
      return;
    }
    console.log('Connected to the database');
    init();
  })


// Display logo text and start the main prompts
function init() {

  const logoText = logo({ name: "Employee Tracker" }).render();
  console.log(logoText);
  promptMainMenu(); // Call the main menu prompt function
}

// Define the main menu prompt function
function promptMainMenu() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Delete an employee',
        'Department utilized budget',
        'Quit',
      ],
    },
  ])
    .then(response => {
      console.log(response);
      switch (response.start) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole(); 
          break;
        case 'Delete an employee':
          deleteEmployee();
          break;
        case 'Department utilized budget':
          departmentBudget();
          break;
        case 'Quit':
          console.log('Have a great day!');
          process.exit();
          break;
      }
    });
}


// View all departments
function ViewDepartments() {
    const sq1 = 'SELECT id, name FROM department';
    db.query(sq1, (err, rows) => {   
    if (err) {
        console.error('ERROR ABORT', err);
        return;
    }
    console.table(rows);
    init();
    });

  }

// View all roles
function viewAllRoles() {
  const sql = 'SELECT id, title, salary, department_id FROM role';
  
    db.query(sql, (err, rows) => {
      if (err) {
          console.error('ERROR ABORT', err);
          return;
      }
      console.table(rows);
      init(); 
  });

}
      

// View all employees that belong to a department
function viewEmployeesByDepartment(departmentId) {
  const sql = 'SELECT e.id, e.first_name, e.last_name, d.name AS department_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE d.id = ?';
  
  db.query(sql, [departmentId], (err, rows) => {
      if (err) {
          console.error('ERROR ABORT', err);
          return;
      }
      console.table(rows);
      init(); 
  });
}


// View all employees that report to specific manager
function viewEmployeesByManager() {
    db.findAllEmployees()
        .then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
        
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "managerId",
                    message: "Which employee do you want to see direct reports for?",
                    choices: managerChoices
                }
                ])
                .then(res => db.findAllEmployeesByManager(res.managerId))
                .then(([rows]) => {
                    let employees = rows;
                    console.log("\n");
                    if (employees.length === 0) {
                        console.log("The selected employee has no direct reports");
                    } else {    
                      console.table(employees);
                    }

                })
                .then(() => loadMainPrompts());

    });
}

