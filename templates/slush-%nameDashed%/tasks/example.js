const generate = require('../generate.js');

const input = [
  {type: 'input', name: 'name', message: 'Sample name?'},
];

module.exports = () => generate('example', input);