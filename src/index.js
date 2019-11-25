const {Command, flags} = require('@oclif/command')
const cli = require('inquirer')

class ProjectideasCommand extends Command {
  async run() {
    const {flags} = this.parse(ProjectideasCommand)
    const name = flags.name || (await cli.prompt({type: 'input', message: 'What is your name?', default: 'world', name: 'name'})).name
    this.log(`hello ${name} from ./src/index.js`)
  }
}

ProjectideasCommand.description = `Describe the command here
...
Extra documentation goes here
`

ProjectideasCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = ProjectideasCommand
