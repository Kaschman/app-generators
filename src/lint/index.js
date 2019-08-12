// React Application Lint Generator

import Generator from 'yeoman-generator'
import chalk from 'chalk'
import extend from 'deep-extend'
import fs from 'fs-extra'

class LintGenerator extends Generator {
  // Writing Priority
  get writing() {
    return {
      async updatePackage() {
        this.log(chalk.cyanBright('\nAdding ESLint and Prettier'))
        const pkg = await fs.readJson(this.destinationPath('package.json'))
        extend(pkg, {
          devDependencies: {
            'eslint-config-airbnb': '^17.1.1',
            'eslint-config-prettier': '^6.0.0',
            'eslint-plugin-import': '^2.18.2',
            'eslint-plugin-jsx-a11y': '^6.2.3',
            'eslint-plugin-prettier': '^3.1.0',
            'eslint-plugin-react': '^7.14.3',
            prettier: '^1.18.2',
          },
          scripts: {
            fix: 'yarn lint --fix',
            lint: 'npx eslint . --ext .js,.jsx',
          },
        })
        delete pkg.dependencies['eslint-plugin-import']
        delete pkg.dependencies['eslint-plugin-jsx-a11y']
        delete pkg.dependencies['eslint-plugin-react']
        await fs.writeJSON(this.destinationPath('package.json'), pkg, { spaces: 2 })
      },

      async writeConfig() {
        await fs.copy(this.templatePath('template.eslintignore'), this.destinationPath('.eslintignore'))
        await fs.copy(this.templatePath('template.eslintrc.json'), this.destinationPath('.eslintrc.json'))
        await fs.copy(this.templatePath('template.prettierrc.json'), this.destinationPath('.prettierrc.json'))
        this.log('Copied ESLint template files\n')
      },

      async updateJSXFiles() {
        await fs.remove(this.destinationPath('src/App.js'))
        await fs.copy(this.templatePath('template.App'), this.destinationPath('src/App.jsx'))
        this.log('Copied App.jsx template')
        fs.renameSync(this.destinationPath('src/App.test.js'), this.destinationPath('src/App.test.jsx'))
        this.log('Renamed App.test.js -> App.test.jsx')
      },
    }
  }

  // Conflict Priority
  get conflicts() {
    return {
      updateDependencies() {
        this.log(chalk.cyanBright('\nUpdating Dependencies'))
        this.spawnCommandSync('yarn', ['remove', 'eslint-config-react-app'])
      },
    }
  }

  // End Priority
  get end() {
    return {
      runLintFix() {
        this.log(chalk.cyanBright('\nFixing Lint Issues'))
        this.spawnCommandSync('yarn', ['lint', '--fix'])
      },
    }
  }
}

export default LintGenerator
