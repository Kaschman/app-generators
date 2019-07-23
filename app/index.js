// import Generator from 'yeoman-generator'
//
// class ReactAppGenerator extends Generator {
//   helloWorld() {
//     this.log('Hello World!')
//   }
// }
//
// export default ReactAppGenerator

var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  helloWorld() {
    this.log('Hello World!')
  }
}
