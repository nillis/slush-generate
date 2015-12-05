const gulp = require('gulp'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer'),
    _ = require('underscore.string');

const input = [
  {type: 'input', name: 'name', message: 'What do you want to name your generator?'},
  {type: 'confirm', name: 'includeTask', message: 'Do you want to include sample task?', default: true},
];

gulp.task('default', done => {
    inquirer.prompt(input, answers => {
  		answers.nameDashed = _.slugify(answers.name);

      	var files = [__dirname + '/templates/**'];

	  	if (!answers.includeTask) {
        	files.push('!' + __dirname + '/templates/**/tasks/**');
	        files.push('!' + __dirname + '/templates/**/templates/**')
      	}

      	return gulp.src(files)
        	.pipe(template(answers))
	        .pipe(rename(file => {
          		file.dirname = file.dirname.replace('%nameDashed%', answers.nameDashed);
          		file.basename = file.basename.replace('%nameDashed%', answers.nameDashed);
	        }))
	        .pipe(conflict('./'))
	        .pipe(gulp.dest('./'))
	        .on('finish', () => done());
    });
});