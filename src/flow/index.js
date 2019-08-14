// React Application Flow Generator
import Generator from 'yeoman-generator'
import chalk from 'chalk'
import extend from 'deep-extend'
import fs from 'fs-extra'

class FlowGenerator extends Generator {
  // Writing Priority
  get writing() {
    return {
      async updatePackage() {
        this.log(chalk.cyanBright('\nAdding Flow'))
        const pkg = await fs.readJson(this.destinationPath('package.json'))
        extend(pkg, {
          scripts: {
            flow: 'npx flow',
            'flow:update-types': 'npx flow-typed install',
          },
        })
        await fs.writeJSON(this.destinationPath('package.json'), pkg, { spaces: 2 })
        this.log('Updated package.json with flow additions')
      },

      async updateEslintConfig() {
        const config = await fs.readJson(this.destinationPath('.eslintrc.json'))
        config.extends.push('plugin:flowtype/recommended')
        config.plugins.push('flowtype')
        config.parser = 'babel-eslint'
        await fs.writeJSON(this.destinationPath('.eslintrc.json'), config, { spaces: 2 })
        this.log('Updated eslint config to recognize flow annotations')
      },

      updateDependencies() {
        this.yarnInstall(['babel-eslint', 'eslint-plugin-flowtype', 'flow-bin', 'flow-typed'], { dev: true })
        this.log('Added flow dependencies')
      },

      async writeConfig() {
        await fs.copy(this.templatePath('template.flowconfig'), this.destinationPath('.flowconfig'))
        this.log('Copied Flow configuration files')
      },

      async copyTemplates() {
        await fs.copy(this.templatePath('template.index'), this.destinationPath('src/index.js'))
        this.log('Fixed flow errors in index.js')
        await fs.copy(this.templatePath('template.serviceWorker'), this.destinationPath('src/serviceWorker.js'))
        this.log('Fixed flow erros in serviceWorker.js')
      },
    }
  }

  // End Priority
  get end() {
    return {
      installFlowTypes() {
        this.log(chalk.cyanBright('\nInstalling flow-typed definitions'))
        this.spawnCommandSync('yarn', ['flow:update-types'])
      },
    }
  }
}

export default FlowGenerator
