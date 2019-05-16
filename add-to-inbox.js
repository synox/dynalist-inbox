const axios = require('axios')
const inquirer = require('inquirer')
const ora = require('ora');

const addToInbox = async function(token) {
    const spinner = ora()

	try {
		const answers = await inquirer.prompt([
			{type: 'input', name: 'content', message: 'Capture into my inbox:'}
        ])
        
        spinner.start('sending');
		const res = await apiAddToInbox(token, answers.content)

		handleResult(res, spinner);
	} catch (error) {
		spinner.fail('ERROR: ' + error.message)
	}
}

function handleResult(res, spinner) {
	if (res.data._code.toUpperCase() === 'OK') {
		spinner.succeed('done');
	}
	else {
		spinner.stop();
		handleErrors(res);
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
