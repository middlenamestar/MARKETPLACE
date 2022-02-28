const inquirer = require('inquirer');
const main = require('../umm');

// Back to Main Menu
const backToMain = () => {
    inquirer
        .prompt([
            { type: 'list', name: 'back_home', message: ' ', choices: ['Back to Main Menu'] }
        ])
        .then(() => {
            main.mainMenu()
        });
};

module.exports = {backToMain};