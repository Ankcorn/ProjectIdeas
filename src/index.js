const {Command, flags} = require('@oclif/command')

const api = require('./publicapi')
const climateChangeReminder = require('climate-change-reminder')
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}
class ProjectideasCommand extends Command {
  async run() {
    const {flags} = this.parse(ProjectideasCommand)
    this.log(climateChangeReminder())
    await delay(1000)
    this.log('\n\n\n')
    const category = flags.name || await api.categories()

    this.log('You selected', category || 'everything', ', Awesome Choice!')
    const wow = await api.random({category})
    this.log(wow)
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
  name: flags.string({char: 'c', description: 'a category to work with'}),
}

module.exports = ProjectideasCommand
