import Generator from 'yeoman-generator'
import fs from 'fs-extra'
import _ from 'lodash'

const makeGeneratorName = name => {
  return _.kebabCase(name)
}

class ReactAppGenerator extends Generator {
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
        this.name = name

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
            this.log('Exiting...')
            process.exit(0)
          }
        }
      },
    }
  }

  // Configuring Priority
  // get configuring() {
  //   return {
  //
  //   }
  // }

  // Writing Priority
  get writing() {
    return {
      async makeDir() {
        await fs.ensureDir(this.destinationPath(this.name))
      },
    }
  }
}

export default ReactAppGenerator
