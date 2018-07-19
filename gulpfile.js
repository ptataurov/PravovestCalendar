const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const sass = require('gulp-sass');
const browserSync  = require('browser-sync').create();
const concat = require('gulp-concat');
const del = require('del');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');

gulp.task('serve', ['style', 'scripts'], () => {

    browserSync.init({
        server: "./app",
        notify: false
    });

    gulp.watch("app/sass/**/*.scss", ['style']);
    gulp.watch("app/js/*.js", ['scripts']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('style', () => {
    return gulp.src("app/sass/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        // .pipe(postcss([
        //     autoprefixer({browsers: ['last 1 version']}),
        //     cssnano()
        // ]))
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
    return gulp.src('./app/js/app.js')

        .pipe(webpackStream({
            output: {
                filename: 'app.js',
            },
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['env']
                        }
                    }
                ]
            }
        }))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('./app/js/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);