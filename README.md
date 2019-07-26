# generator-react-app
Yeoman generator for creating React applications

Getting started:
1. `$ yarn global add yo` if you haven't installed Yeoman yet.
2. `$ yarn link` from this project's root directory to make the generator discoverable by Yeoman
3. `$ yarn generate` to run the generator

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

## Linting
- https://prettier.io/docs/en/integrating-with-linters.html
- https://github.com/prettier/prettier-eslint/issues/101
- https://stackoverflow.com/questions/46201647/prettier-airbnbs-eslint-config

# Babel Config
`babel-plugin-add-module-exports` is needed for the old `module.exports` functionality (see this [issue](https://github.com/yeoman/yo/issues/391)).
