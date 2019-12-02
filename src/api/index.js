const Generator = require('yeoman-generator')
const chalk = require('chalk')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    // this.log(chalk.green('Initializing...'))
    this.option('quiet')

    this.quiet = this.options.quiet
  }

  async initializing() {
    this.composeWith(require.resolve('@cmbirk/generator-es6/generators/all'), {
      quiet: true,
      skipPackage: true,
    })
  }

  async prompting() {
    if (this.quiet) {
      this.answers = {
        name: 'combine-graphql-api',
        description: 'New GraphQL API',
        devDependencies: true,
      }
    } else {
      this.answers = await this.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Project Name',
          default: this.appname, // Default to current folder name
        },
        {
          type: 'input',
          name: 'description',
          message: 'Project Description',
          default: '',
        },
        {
          type: 'confirm',
          name: 'devDependencies',
          message: 'Install dev devDependencies?',
          default: true,
        },
      ])
    }
  }

  async configuring() {
    const name = this.answers.name
      .trim()
      .toLowerCase()
      .replace(/ /g, '-')

    const { description } = this.answers

    this.fs.copyTpl(this.templatePath('_config/package.json'), this.destinationPath('package.json'), {
      name,
      description,
    })
  }

  async writing() {
    await this.fs.copy(this.templatePath('_src'), this.destinationPath('src'))
  }

  async install() {
    this.log(chalk.green('Installing...'))

    // List of package dependencies
    const dependencies = ['apollo-server', 'graphql', 'portfinder']

    // // List of dev package dependencies
    // const devDependencies = []

    // Install core dependencies
    await this.yarnInstall(dependencies, { silent: true })

    // // Only install dev dependencies if prompted to do so
    // if (this.answers.devDependencies) {
    //   await this.yarnInstall(devDependencies, { dev: true, silent: true })
    // }
  }
}
