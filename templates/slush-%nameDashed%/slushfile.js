const path = require('path'),
      globby = require('globby');

globby.sync('tasks/**.js', { cwd: __dirname })
 	  .forEach(file => require(path.join(__dirname, file))());
