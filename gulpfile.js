/*
* Dependencias
*/
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const templateCache = require('gulp-angular-templatecache');
const htmlmin = require('gulp-htmlmin');
const header = require('gulp-header');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('templates', function () {
    return gulp.src('src/**/*.html')    
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache('md-crud-templates.js', { root:'/', module:'mdCrudTemplates', standalone:true }))
    .pipe(gulp.dest('temp/'));
});

gulp.task('scripts', ['templates'], function () {
    return gulp.src(['temp/md-crud-templates.js', 'src/**/*.js'])
    .pipe(concat('md-crud.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('dist/'));
})

gulp.task('scripts.min', ['scripts'], function () {
    return gulp.src(['dist/md-crud.js'])
    .pipe(concat('md-crud.min.js'))  
    .pipe(uglify())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('dist/'));
})

// Rerun the task when a file changes
gulp.task('watch', function() {
    var watcher = gulp.watch(['src/**/*.js', 'src/**/*.html'], ['scripts.min']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// The default task (called when you run `gulp` from cli)
//gulp.task('default', ['watch', 'scripts']);
gulp.task('default', ['scripts.min']);