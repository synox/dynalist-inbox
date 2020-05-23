#!/usr/bin/env node

const Conf = require('conf');
const chalk = require('chalk')
const {login} = require('./login')
const {addToInbox} = require('./add-to-inbox')

const argv = require('minimist')(process.argv.slice(2));
if ( argv.h){
	console.log(`usage: dynalist-inbox [-h] [--login]
Options:
  --login
	  change or set API key
  -h 
	  display this message`)
	process.exit(-1)
}


async function run(argv) {

	const schema = {
		DYNALIST_TOKEN: {
			type: 'string',
			default: ""
		},
	};

	const projectName = 'dynalist-inbox';
	
	const config = new Conf({projectName,schema});
	// force login if the token is not set
	if (argv.login || !config.get('DYNALIST_TOKEN')) {
		const token = await login(config)
		config.set('DYNALIST_TOKEN', token)
	} else {
		await addToInbox(config.get('DYNALIST_TOKEN'))
	}
}

run(argv).catch(error => console.error(chalk.red('ERROR: ' , error.message)))
