var gulp = require('gulp'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    inquirer = require('inquirer'),
    _ = require('underscore.string');

module.exports = (taskName, input) => {
  gulp.task(taskName, done => {
    inquirer.prompt(input, answers => {
      answers.nameDashed = _.slugify(answers.name);
      answers.camelCasedName = _.camelize(answers.name, true);

      return gulp.src([__dirname + '/templates/' + taskName + '/**'])
        .pipe(template(answers))
        .pipe(rename(file => {
          if (file.basename[0] === '_') {
            file.basename = '.' + file.basename.slice(1);
          }
          
          file.dirname = file.dirname.replace('%name%', answers.name);
          file.basename = file.basename.replace('%name%', answers.name);
        }))
        .pipe(conflict('./'))
        .pipe(gulp.dest('./'))
        .on('finish', () => done());
    });
  });
}