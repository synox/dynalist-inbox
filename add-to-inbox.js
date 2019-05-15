const axios = require('axios')
const inquirer = require('inquirer')
const chalk = require('chalk')
const figures = require('figures')
const ora = require('ora');

const addToInbox = async function(token) {
    const spinner = ora()

	try {
		const answers = await inquirer.prompt([
			{type: 'input', name: 'content', message: 'Capture into my inbox:'}
        ])
        
        spinner.start('sending');
		const res = await apiAddToInbox(token, answers.content)

		if (res.data._code.toUpperCase() === 'OK') {
            spinner.succeed('done')
		} else {
            spinner.stop()
			handleErrors(res)
		}
	} catch (error) {
		spinner.fail('ERROR: ' + error.message)
	}
}

async function apiAddToInbox(token, content) {
    return await axios.post('https://dynalist.io/api/v1/inbox/add', {
        token,
        content
    });
}

function handleErrors(res, spinner) {
	spinner.fail( `failed. code=${res.data._code} msg=${res.data._msg}`)
}

module.exports = {addToInbox, apiAddToInbox}
