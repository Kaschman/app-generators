# generator-react-app
Yeoman generator for creating React applications

## Getting started:
### Running the Generator
1. `$ yarn global add yo` if you haven't installed Yeoman yet.
2. `$ yarn install`
3. `$ yarn build`
4. `$ yarn link` from this project's root directory to make the generator discoverable by Yeoman
5. `$ yo react-app` to run the generator - note: the generator does not work if you have uncommitted git files in the directory where the command is run.

### Developing the Generator
Create React App takes awhile to run. When developing the generator, you can use a cached version of the Create React App boilerplate to speed up generation time.
1. `$ yarn global add yo` if you haven't installed Yeoman yet.
2. `$ yarn install`
3. `$ yarn build`
4. `$ yarn link` from this project's root directory to make the generator discoverable by Yeoman
5. `$ yarn update:cra-cache` to load the CRA cache. Run again to update it if needed. Note: you cannot have uncommitted git files to run this script.
6. `$ yarn generate` to run the generator with the CRA cache targeting the `/sample-react-app` directory

Some notes on [working with Yeoman in ES6](http://mammal.io/articles/yeoman-generators-es6/).

# TODOs
- Create a Production build script for React https://reactjs.org/docs/optimizing-performance.html#use-the-production-build
- Istanbul Code Coverage https://github.com/istanbuljs/babel-plugin-istanbul/
- Bundler = Webpack
- Compiler = Babel
- Flow for type checking
- ESLint - AirBnB + Prettier
- Testing (the generator) - https://yeoman.io/authoring/testing.html
- Testing (the react app)
- CI - run tests and lint
- Styling
- manifest.json - https://developers.google.com/web/fundamentals/web-app-manifest/ (see CRA /public directory)
- shortcut icon (see CRA /public directory)
- Template README
- cache or CRA

## Performance
Even using the `--cra-cache` flag can be a bit slow. The project using the [cpy](https://github.com/sindresorhus/cpy) library at the moment to copy the cache to the destination directory. [recursive-copy](https://github.com/timkendrick/recursive-copy) was tried as well but it was about 75% slower.

## Linting
- https://prettier.io/docs/en/integrating-with-linters.html
- https://github.com/prettier/prettier-eslint/issues/101
- https://stackoverflow.com/questions/46201647/prettier-airbnbs-eslint-config

## Babel Config
`babel-plugin-add-module-exports` is needed for the old `module.exports` functionality (see this [issue](https://github.com/yeoman/yo/issues/391)).
