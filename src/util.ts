// util.ts
import { pool } from './connection.js';
import inquirer from 'inquirer';

async function viewAllDepartments() {
    try {
      const result = await pool.query(`SELECT * FROM department_tb`);
      console.log(`Departments`);
      result.rows.forEach((row) => {
        console.log(`Department Name: ${row.name} | ID: ${row.id}`);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function viewAllRoles() {
    try {
      const result = await pool.query(`SELECT * FROM role_tb JOIN department_tb ON role_tb.department = department_tb.id`);
      console.log(`Roles`);
      result.rows.forEach((row) => {
        console.log(`Job Title: ${row.title} | Role ID: ${row.id} | Salary: ${row.salary} | Department Name: ${row.name}`);
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  async function viewAllEmployees() {
    try {
      const result = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department_name, 
        m.first_name AS manager_first_name, m.last_name AS manager_last_name
        FROM employee_tb e
        JOIN role_tb r ON e.role_id = r.id
        JOIN department_tb d ON r.department = d.id
        LEFT JOIN employee_tb m ON e.manager_id = m.id
      `);
      console.log(`Employees:`);
      result.rows.forEach((row) => {
        const managerName = row.manager_first_name ? `${row.manager_first_name} ${row.manager_last_name}` : 'None';
        console.log(
          `Employee ID: ${row.id} | First Name: ${row.first_name} | Last Name: ${row.last_name} | Title: ${row.title} | Salary: ${row.salary} | Department: ${row.department_name} | Manager: ${managerName}`
        );
      });
    } catch (err) {
      console.error(err);
    }
  }
  
  async function addDepartment(newName: string) {
    try {
      await pool.query(`INSERT INTO department_tb (name) VALUES ($1)`, [newName]);
      console.log(`Department added successfully`);
    } catch (err) {
      console.error(err);
    }
  }
  
  async function addRole(newTitle: string, newSalary: string) {
    try {
      const departments = await pool.query(`SELECT id, name FROM department_tb`);

      const departmentChoices = departments.rows.map((dept) => ({
        name: dept.name,
        value: dept.id
      }));
  
      const { departmentId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'departmentId',
          message: 'Which department does this role belong to?',
          choices: departmentChoices
        }
      ]);
      await pool.query(`INSERT INTO role_tb (title, salary, department) VALUES ($1, $2, $3)`, [newTitle, newSalary, departmentId]);
      console.log(`Role added successfully`);
    } catch (err) {
      console.error(err);
    }
  }
  async function addEmployee(newFirstName: string, newLastName: string) {
    try {
      const roles = await pool.query(`SELECT id, title FROM role_tb`);
      const roleChoices = roles.rows.map((role) => ({
        name: role.title,
        value: role.id
      }));
      const employees = await pool.query(`SELECT id, first_name, last_name FROM employee_tb`);
      const managerChoices = employees.rows.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));
      managerChoices.unshift({ name: 'None', value: null });
      const { roleId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'roleId',
          message: 'What is the role of the employee?',
          choices: roleChoices
        }
      ]);
      const { managerId } = await inquirer.prompt([
        {
          type: 'list',
          name: 'managerId',
          message: 'Who is the manager of the employee?',
          choices: managerChoices
        }
      ]);
      await pool.query(
        `INSERT INTO employee_tb (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,
        [newFirstName, newLastName, roleId, managerId]
      );
      console.log(`Employee added successfully`);
    } catch (err) {
      console.error(err);
    }
  }
  async function updateEmployee() {
    try {
      console.log(`Updating employee role`);
        const employees = await pool.query(`SELECT id, first_name, last_name FROM employee_tb`);
        const employeeChoices = employees.rows.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }));
        const roles = await pool.query(`SELECT id, title FROM role_tb`);
        const roleChoices = roles.rows.map((role) => ({
          name: role.title,
          value: role.id
        }));
        const { employeeId } = await inquirer.prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to update?',
            choices: employeeChoices
          }
        ]);
        const { roleId } = await inquirer.prompt([
          {
            type: 'list',
            name: 'roleId',
            message: 'What is the new role of the employee?',
            choices: roleChoices
          }
        ]);
        await pool.query(`UPDATE employee_tb SET role_id = $1 WHERE id = $2`, [roleId, employeeId]);
    } catch (err) {
      console.error(err);
    }
  }

export { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployee };