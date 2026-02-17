import { BaseCommand,args, flags } from '@adonisjs/core/ace'

export default class Greet extends BaseCommand {
  static commandName = 'greet'
  static description = 'Greet someone'

  @flags.string({ description: 'Name to greet' })
  declare name: string

  @flags.boolean({ description: 'Uppercase greeting' })
  declare yell: boolean

  @args.string()
  declare occupation: string

  prepare() {
    this.logger.info('preparing')
  }

  async interact() {
    this.logger.info('interacting')
    this.name = await this.prompt.secure('Please enter your name:');
  }

  async run() {
    let message = `Hello ${this.name ?? ''}. I think you are ${this.occupation}`

    if (this.yell) {
      message = message.toUpperCase()
    }

    this.logger.info(message)
    console.log('Args: ' +this.parsed.args);
  }

  completed() {
    this.logger.info('completed')
  }
}