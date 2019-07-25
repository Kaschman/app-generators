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
        this.name = answers.name
      },
    }
  }

  // Configuring Priority
  get configuring() {
    return {
      async checkDir() {
        const exists = await fs.pathExists(this.destinationPath(this.name))
        if (exists) {
          this.env.error(`The path ${this.name} already exists.`)
        }
      },
    }
  }

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
