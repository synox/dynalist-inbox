#!/usr/bin/env node

const Configstore = require('configstore')
const {login} = require('./login')
const {addToInbox} = require('./add-to-inbox')

async function run() {
	const conf = new Configstore('dynalist-inbox', {DYNALIST_TOKEN: null})

	// With only two flags, no args parse framework is required.
	if (process.argv.indexOf('-h') !== -1) {
		console.log(`usage: dynalist-inbox [-h] [--login]
  Options:
      --login
          change or set API key
      -h 
          display this message`)
		process.exit(-1)
	}

	if (process.argv.indexOf('--login') !== -1 || !conf.get('DYNALIST_TOKEN')) {
		const token = await login(conf)
		conf.set('DYNALIST_TOKEN', token)
	} else {
		await addToInbox(conf.get('DYNALIST_TOKEN'))
	}
}

run().catch(error => console.error(error))
