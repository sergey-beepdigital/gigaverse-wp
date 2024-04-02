const gulp = require("gulp");
const { parallel, series } = require("gulp");

const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass')(require('sass'));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create(); //https://browsersync.io/docs/gulp#page-top
const nunjucksRender = require("gulp-nunjucks-render");
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

// /*
// TOP LEVEL FUNCTIONS
//     gulp.task = Define tasks
//     gulp.src = Point to files to use
//     gulp.dest = Points to the folder to output
//     gulp.watch = Watch files and folders for changes
// */

// Optimise Images
function imageMin(cb) {
    gulp.src("src/assets/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("public/images"));
    cb();
}

// Copy all HTML files to public
function copyHTML(cb) {
    gulp.src("src/*.html").pipe(gulp.dest("public"));
    cb();
}

// Copy all HTML files to public
function copyPHP (cb) {
    gulp.src("src/pages/*.php").pipe(gulp.dest("public"));
    cb();
}

// Copy all HTML files to public
function copyImages(cb) {
        gulp.src(['src/assets/images/*'])
            .pipe(gulp.dest('public/images'));
    cb();
}
// Copy all HTML files to public
function copyVideos(cb) {
    gulp.src(['src/assets/video/*'])
        .pipe(gulp.dest('public/video'));
    cb();
}


// Copy all HTML files to public
function copyPDF(cb) {
    gulp.src(['src/assets/downloads/*'])
        .pipe(gulp.dest('public/downloads'));
    cb();
}

// Copy all HTML files to public
function copyFonts(cb) {
    gulp.src(['src/assets/fonts/*'])
        .pipe(gulp.dest('public/fonts'));
    cb();
}

// Minify HTML
function minifyHTML(cb) {
    gulp.src("src/*.html")
        .pipe(gulp.dest("public"))
        .pipe(
            htmlmin({
                collapseWhitespace: true
            })
        )
        .pipe(gulp.dest("public"));
    cb();
}

// Scripts
function js(cb) {
    gulp.src("src/assets/js/*js")
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest("public/js"));
    cb();
}

// Compile Sass
function css(cb) {
    gulp.src("src/assets/sass/*.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({
            browserlist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("public/css"))
        // Stream changes to all browsers
        .pipe(browserSync.stream());
    cb();
}

// Process Nunjucks
function nunjucks(cb) {
    gulp.src("src/pages/*.html")
        .pipe(
            nunjucksRender({
                path: ["src/templates/"] // String or Array
            })
        )
        .pipe(gulp.dest("public"));
    cb();
}

function nunjucksMinify(cb) {
    gulp.src("src/pages/*.html")
        .pipe(
            nunjucksRender({
                path: ["src/templates/"] // String or Array
            })
        )
        .pipe(
            htmlmin({
                collapseWhitespace: true
            })
        )
        .pipe(gulp.dest("public"));
    cb();
}

// Watch Files
function watch_files() {
    browserSync.init({
        proxy: "https://gigaverse.local"
    });
    gulp.watch("src/assets/sass/**/*.scss", css);
    gulp.watch("src/assets/js/*.js", js).on("change", browserSync.reload);
    //gulp.watch("src/pages/*.html", nunjucks).on("change", browserSync.reload);
    /*gulp.watch("src/templates/!*.html", nunjucks).on(
        "change",
        browserSync.reload
    );*/
}

// Default 'gulp' command with start local server and watch files for changes.
exports.default = series(/*nunjucks, */css, js, imageMin, watch_files, copyVideos,copyFonts, copyImages/*, copyPHP, copyPDF*/);

// 'gulp build' will build all assets but not run on a local server.
exports.build = parallel(/*nunjucksMinify, */css, js, imageMin, copyVideos,copyFonts, copyImages/*, copyPHP, copyPDF*/);
