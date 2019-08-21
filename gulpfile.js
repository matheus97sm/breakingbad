const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglifycss');
const autoprefixer = require('gulp-autoprefixer');
 
sass.compiler = require('node-sass');
 
async function sassToCss () {
  gulp.src('./src/Style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(uglify())
    .pipe(gulp.dest('./src'));
}

async function transform () {
  gulp.watch('./src/**/*.scss', sassToCss)
}
 
gulp.task('sassWatch', transform)
