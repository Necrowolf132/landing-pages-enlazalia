// VARIABLES
const concat        = require('gulp-concat');
//const sass          = require('gulp-sass');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const flexboxfixer  = require('postcss-flexboxfixer');
const uglify        = require('gulp-uglify');
const minifycss     = require('gulp-minify-css');
const browserSync   = require('browser-sync').create();
const gulp          = require('gulp');
const zip           = require('gulp-zip');

// FILES
gulp.task('files', function() {
    var fonts = gulp.src('assets/css/fonts/*-*')
    .pipe(gulp.dest('assetbuild/fonts'));
    var img = gulp.src('assets/css/img/*.*')
        .pipe(gulp.dest('assetbuild/img'));
    var webfonts = gulp.src('assets/css/webfonts/*.*')
        .pipe(gulp.dest('assetbuild/webfonts'));
    return (fonts, img, webfonts);
});

// CSS
gulp.task('css', function() {
    return gulp.src([
        'assets/css/slick.css',
        'assets/css/bootstrap.css',
        'assets/css/style.css',
        'assets/css/all.min.css',
        'assets/css/animate.css'
    ]).pipe(concat('todo.min.css'))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(postcss([ flexboxfixer() ]))
        .pipe(minifycss())
        .pipe(gulp.dest('assetbuild'))
        .pipe(browserSync.stream());
});

// JS
gulp.task('js', function() {
    return gulp.src([
        'assets/js/jquery.min.js',
        'assets/js/migrate.min.js',
        'assets/js/popper.js',
        'bootstrap/js/bootstrap.min.js',
        'assets/js/bootstrap-notify.min.js',
        'assets/slick/velocity.min.js',
        'assets/slick/slider3d.js',
        'assets/js/mi_script.js'
        ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assetbuild'))
        .pipe(browserSync.stream());
});

// SERVE
gulp.task('serve', function() {
    exports.browserSync = browserSync.init({
        // server: './'' // default server
        // proxy: 'http://localhost:8888/' // mamp
        // la localhost de la instalacion de jommla
        proxy: 'http://localhost/archivos%20de%20maquetado%20/Lainding%20Page%20español'
        // usualy
    });
    gulp.watch(['**/*.css','!assetbuild/todo.min.css'], gulp.series(['css','zip'])).on('change', browserSync.reload);
    gulp.watch(['**/*.js', '!assetbuild/app.js'], gulp.series(['js','zip'])).on('change', browserSync.reload);
    gulp.watch('**/*.html', gulp.series('zip')).on('change', browserSync.reload);
});
// Observador
gulp.task('observador', function () {
    gulp.watch(['**/*.css','!assetbuild/todo.min.css'], gulp.series('css'));
    gulp.watch(['**/*.js', '!assetbuild/app.js'], gulp.series('js'));
});

// ZIP
gulp.task('zip', function() {
    return gulp.src([
        '**/*.*',
        '!_pgbackup/**',
        '!bootstrap/**',
        '!assets/**',
        '!./LaindingFinal.zip',
        '!.git/**',
        '!js/**',
        '!Landing page_ES (1).PDF',
        '!pinegrow.json',
        '!style.css',
        '!gulpfile.js'
    ])
        .pipe(zip('LaindingFinal.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', gulp.series('files','css','js','zip','serve'));
gulp.task('transpilar', gulp.series('files','css','js','zip'));
gulp.task('sin_navegador', gulp.series('files','css','js','observador'));
