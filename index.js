#!/usr/bin/env node

const Configstore = require('configstore')
const chalk = require('chalk')
const {login} = require('./login')
const {addToInbox} = require('./add-to-inbox')


async function run() {
	const conf = new Configstore('dynalist-inbox', {DYNALIST_TOKEN: null})
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

	if (argv.login || !conf.get('DYNALIST_TOKEN')) {
		const token = await login(conf)
		conf.set('DYNALIST_TOKEN', token)
	} else {
		await addToInbox(conf.get('DYNALIST_TOKEN'))
	}
}

run().catch(error => console.error(chalk.red('ERROR: ' , error.message)))
