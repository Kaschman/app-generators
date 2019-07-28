import Generator from 'yeoman-generator'
import chalk from 'chalk'
import cliProgress from 'cli-progress'
import cpy from 'cpy'
import fs from 'fs-extra'
import _ from 'lodash'
import { execSync } from 'child_process'

const makeGeneratorName = name => {
  return _.kebabCase(name)
}

const getGitStatus = () => {
  try {
    const stdout = execSync(`git status --porcelain`, {
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString()
    return stdout.trim()
  } catch (e) {
    return ''
  }
}

class ReactAppGenerator extends Generator {
  // arguments and options are defined in the constructor
  constructor(args, opts) {
    super(args, opts)

    // use Create React App cache, set by `--cra-cache`
    this.option('cra-cache')
  }

  // Prompting Priority
  get prompting() {
    return {
      async askName() {
        const answers = await this.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Enter your project name:',
            filter: makeGeneratorName,
            default: 'sample-react-app',
          },
        ])
        const { name } = answers

        // Check if directory already exists
        const exists = await fs.pathExists(this.destinationPath(name))
        if (exists) {
          // Overwrite check
          const overwriteAnswers = await this.prompt([
            {
              type: 'confirm',
              name: 'overwrite',
              message: `A directory named '${name}' already exists. Would you like to overwrite?`,
            },
          ])
          if (overwriteAnswers.overwrite) {
            await fs.remove(this.destinationPath(name))
          } else {
            this.log(chalk.cyanBright('\nExiting...\n'))
            process.exit(0)
          }
        }
        this.name = name
      },
    }
  }

  // Configuring Priority
  get configuring() {
    return {
      // If there are untracked changes, Create React App eject will fail
      // Catch the error now before running create-react-app
      checkGitStatus() {
        const { craCache } = this.options
        if (craCache) return

        const gitStatus = getGitStatus()
        if (gitStatus) {
          this.log(
            `${chalk.red('This git repository has untracked files or uncommitted changes:')}\n\n${gitStatus
              .split('\n')
              .map(line => line.match(/ .*/g)[0].trim())
              .join('\n')}\n\n${chalk.red('Remove untracked files, stash or commit any changes, and try again.')}`
          )
          process.exit(1)
        }
      },

      // If --cra-cache option is used, make sure we have a cra-cache
      async checkForCraCache() {
        const { craCache } = this.options
        if (!craCache) return
        const exists = await fs.pathExists(this.destinationPath('cra-cache'))
        if (!exists) {
          this.env.error("No CRA cache exists. Please run 'yarn update:cra-cache' to generate one.")
        }
      },
    }
  }

  // Default Priority
  get default() {
    return {
      initWithCreateReactApp() {
        const { craCache } = this.options
        if (craCache) return

        this.log(chalk.cyanBright('\nGenerating intial application using Create React App...\n'))
        this.spawnCommandSync('npx', ['create-react-app', this.name])
      },

      ejectCreateReactApp() {
        const { craCache } = this.options
        if (craCache) return

        this.destinationRoot(this.destinationPath(this.name))
        this.log(chalk.cyanBright('\nEjecting Create React App\n'))
        const done = this.async() // spawnCommandSync doesn't like to pipe so use this strategy to handle async
        const yes = this.spawnCommand('echo', ['y'], {
          stdio: [process.stdin, 'pipe', process.stderr],
        })
        const eject = this.spawnCommand('yarn', ['eject'], { stdio: [yes.stdout, process.stdout, process.stderr] })
        eject.on('exit', code => {
          if (code !== 0) {
            this.env.error('Failed to eject Create React App')
          } else {
            this.log(chalk.cyanBright('\nCreate React App Ejected Successfully\n'))
          }
          done()
        })
      },

      async useCreateReactAppCache() {
        const { craCache } = this.options
        if (!craCache) return

        this.log(chalk.cyanBright('\nCopying CRA cache'))
        const bar = new cliProgress.Bar({ etaBuffer: 100 }, cliProgress.Presets.legacy)

        let start = false
        await cpy(this.destinationPath('cra-cache'), this.destinationPath(this.name)).on('progress', progress => {
          if (!start) {
            bar.start(progress.totalFiles, 0)
            start = true
          }
          bar.update(progress.completedFiles)
        })
        bar.stop()
        this.log(chalk.cyanBright('Copying Complete'))
        this.destinationRoot(this.destinationPath(this.name))
      },
    }
  }

  // Writing Priority
  get writing() {
    return {
      // async writePackage() {
      //   this.log('WRITE PACKAGE')
      //   const packageSettings = {
      //     name: this.name,
      //     private: true,
      //     version: '0.0.1',
      //     description: `${this.name} - Generated by @combine-labs/generator-react-app`,
      //     respository: '',
      //     author: 'Your name here',
      //   }
      //   await fs.writeJSON(this.destinationPath('package.json'), packageSettings)
      // },

      async writeConfig() {
        await fs.copy(this.templatePath('template.editorconfig'), this.destinationPath('.editorconfig'))
      },

      // async writePublicAssets() {
      //   await fs.copy(this.templatePath('index.html'), this.destinationPath('public/index.html'))
      // },
    }
  }
}

export default ReactAppGenerator
