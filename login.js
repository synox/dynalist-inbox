const axios = require('axios')
const inquirer = require('inquirer')
const chalk = require('chalk')

const login = async function() {
	console.log(
		chalk.blue(
			'Create an API Key at https://dynalist.io/developer and paste it here.'
		)
	)
	const answers = await inquirer.prompt({type: 'input', name: 'API key'})
	const token = answers['API key']
	await verifyToken(token)
	return token
}

async function verifyToken(token) {
	const res = await axios.post('https://dynalist.io/api/v1/file/list', {token})
	if (res.data._code.toUpperCase() !== 'OK') {
		throw new Error(`Login failed. code=${res.data._code} msg=${res.data._msg}`)
	}
}

module.exports = {login}
