const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const rename = require("gulp-rename")
const watch = require('gulp-watch')
const gcmq = require('gulp-group-css-media-queries')
const browserSync = require('browser-sync').create()
const sourcemaps = require('gulp-sourcemaps')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin');



//style
function style() {
    return gulp.src('./src/precss/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(gulp.dest('./src/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.stream())


}


//watch
gulp.task('watch', function () {
    watch('./src/precss/style.scss', style)
    watch('./src/index.html', browserSync.reload)
    watch('./src/css', browserSync.reload)
})


// LIVE SERVER
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    })
})


//imagemin
gulp.task('imagemin', function () {
    gulp.src('./src/sourceimages/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./src/img/'))
})

gulp.task('style', style)


// DEFAULT
gulp.task('default', gulp.parallel('style', 'watch', 'server', 'imagemin'))