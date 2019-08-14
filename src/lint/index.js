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

        // Add dev dependencies
        this.yarnInstall(
          [
            'eslint',
            'eslint-config-airbnb',
            'eslint-config-prettier',
            'eslint-loader',
            'eslint-plugin-import',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-prettier',
            'eslint-plugin-react',
            'eslint-plugin-react-hooks',
            'prettier',
          ],
          { dev: true }
        )

        // Update package.json
        const pkg = await fs.readJson(this.destinationPath('package.json'))
        extend(pkg, {
          scripts: {
            fix: 'yarn lint --fix',
            lint: 'npx eslint . --ext .js,.jsx',
          },
        })

        // Remove dependencies from CRA that should be dev dependencies
        delete pkg.dependencies.eslint
        delete pkg.dependencies['eslint-config-react-app']
        delete pkg.dependencies['eslint-loader']
        delete pkg.dependencies['eslint-plugin-import']
        delete pkg.dependencies['eslint-plugin-jsx-a11y']
        delete pkg.dependencies['eslint-plugin-react']
        delete pkg.dependencies['eslint-plugin-react-hooks']
        await fs.writeJSON(this.destinationPath('package.json'), pkg, { spaces: 2 })
        this.log('Updated package.json with linting additions')
      },

      async writeConfig() {
        await fs.copy(this.templatePath('template.eslintignore'), this.destinationPath('.eslintignore'))
        await fs.copy(this.templatePath('template.eslintrc.json'), this.destinationPath('.eslintrc.json'))
        await fs.copy(this.templatePath('template.prettierrc.json'), this.destinationPath('.prettierrc.json'))
        this.log('Copied ESLint template files')
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
