#!/usr/bin/env node

const { Command } = require('commander')
const totp = require('../lib/totp')

const program = new Command();

program.version(require('../package').version);

program.name('steam totp');

program.option('<secret>', 'Secret code')

program.parse(process.argv)

if (program.args.length > 0) {
    const code = totp.GetCode(program.args[0])
    console.log(code);
} else {
    program.help()
}