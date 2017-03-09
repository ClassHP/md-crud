/*
* Dependencias
*/
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  templateCache = require('gulp-angular-templatecache'),
  htmlmin = require('gulp-htmlmin');

gulp.task('templates', function () {
    return gulp.src('src/**/*.html')    
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache('md-crud-templates.js', { root:'/', module:'mdCrudTemplates', standalone:true }))
    .pipe(gulp.dest('temp/'));
});

gulp.task('scripts', ['templates'], function () {
    return gulp.src(['temp/md-crud-templates.js', 'src/**/*.js'])
    .pipe(concat('md-crud.js'))  
    .pipe(gulp.dest('dist/'));
})

gulp.task('scripts.min', ['scripts'], function () {
    return gulp.src(['dist/md-crud.js'])
    .pipe(concat('md-crud.min.js'))  
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
})

// Rerun the task when a file changes
gulp.task('watch', function() {
    var watcher = gulp.watch(['src/**/*.js', 'src/**/*.html'], ['templates', 'scripts', 'scripts.min']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

// The default task (called when you run `gulp` from cli)
//gulp.task('default', ['watch', 'scripts']);
gulp.task('default', ['scripts.min']);