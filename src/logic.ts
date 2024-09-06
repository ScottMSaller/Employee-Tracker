// logic.ts

import inquirer from 'inquirer';
import { viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployee } from './util.js';

async function init() {
    
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                { name: 'view all departments', value: 'view all departments' },
                { name: 'view all roles', value: 'view all roles' },
                { name: 'view all employees', value: 'view all employees' },
                { name: 'add a department', value: 'add a department' },
                { name: 'add a role', value: 'add a role' },
                { name: 'add an employee', value: 'add an employee' },
                { name: 'update an employee role', value: 'update an employee role' }
            ]
        }
    ]);
    if (answers.choice === 'view all departments') {
        await viewAllDepartments();
        return init();
    } else if (answers.choice === 'view all roles') {
        await viewAllRoles();
        return init();
    } else if (answers.choice === 'view all employees') {
        await viewAllEmployees();
        return init();
    } else if (answers.choice === 'add a department') {
        const deptAnswer = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            }
        ]);
        await addDepartment(deptAnswer.name);
        return init();
    } else if (answers.choice === 'add a role') {
        const roleAnswer = await inquirer.prompt([
            { type: 'input', name: 'title', message: 'What is the title of the role?' },
            { type: 'input', name: 'salary', message: 'What is the salary of the role?' },
        ]);
        await addRole(roleAnswer.title, roleAnswer.salary);
        return init();
    } else if (answers.choice === 'add an employee') {
        const empAnswer = await inquirer.prompt([
            { type: 'input', name: 'firstName', message: 'What is the first name of the employee?' },
            { type: 'input', name: 'lastName', message: 'What is the last name of the employee?' }
        ]);
        await addEmployee(empAnswer.firstName, empAnswer.lastName);
        return init();
    } else if (answers.choice === 'update an employee role') {
        console.log('whoops! this feature is not available yet');
        await updateEmployee();
        return init();
    }
}

export default init;