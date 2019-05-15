const axios = require('axios')
const inquirer = require('inquirer')
const chalk = require('chalk')
const figures = require('figures')

const addToInbox = async function(token) {
	try {
		const answers = await inquirer.prompt([
			{type: 'input', name: 'content', message: 'Capture into my inbox:'}
        ])
        
		const res = await apiAddToInbox(token, answers.content)

		if (res.data._code.toUpperCase() === 'OK') {
			console.log(chalk.green(figures('✔︎ done')))
		} else {
			handleErrors(res)
		}
	} catch (error) {
		console.error(chalk.red('ERROR:' + error.message))
	}
}

async function apiAddToInbox(token, content) {
    return await axios.post('https://dynalist.io/api/v1/inbox/add', {
        token,
        content
    });
}

function handleErrors(res) {
	console.error(
		chalk.red(`failed. code=${res.data._code} msg=${res.data._msg}`)
	)
}

module.exports = {addToInbox, apiAddToInbox}
