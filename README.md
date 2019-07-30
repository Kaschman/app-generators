# generator-react-app
Yeoman generator for creating React applications

## Getting started:
### Running the Generator
1. `$ yarn global add yo` if you haven't installed Yeoman yet.
2. `$ yarn install`
3. `$ yarn build`
4. `$ yarn link` from this project's root directory to make the generator discoverable by Yeoman
5. `$ yo react-app` to run the generator - note: the generator does not work if you have uncommitted git files in the directory where the command is run.

### Development
Create React App takes awhile to run. When developing the generator, you can use a cached version of the Create React App boilerplate to speed up generation time.
1. `$ yarn global add yo` if you haven't installed Yeoman yet.
2. `$ yarn install`
3. `$ yarn build`
4. `$ yarn link` from this project's root directory to make the generator discoverable by Yeoman
5. `$ yarn update:cra-cache` to load the CRA cache. Run again to update it if needed. Note: you cannot have uncommitted git files to run this script.
6. `$ yarn generate` to run the generator with the CRA cache targeting the `/sample-react-app` directory

Some notes on [working with Yeoman in ES6](http://mammal.io/articles/yeoman-generators-es6/).

## Performance
Even using the `--cra-cache` flag can be a bit slow. The project uses [recursive-copy](https://github.com/timkendrick/recursive-copy). fs-extra had perforance issues. [cpy](https://github.com/sindresorhus/cpy), while more performant that recurive-copy, [does not support recursion](https://github.com/sindresorhus/cpy/issues/61).

## Babel Config
`babel-plugin-add-module-exports` is needed for the old `module.exports` functionality (see this [issue](https://github.com/yeoman/yo/issues/391)).
