const { watch, dest, series } = require("gulp");
const livereload = require("gulp-livereload");
const uglifyes = require("uglify-es");
const composer = require("gulp-uglify/composer");
const uglify = composer(uglifyes, console);

const babelify = require("babelify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

function js() {
  return browserify(["src/contentScript/inpage.js"])
    .transform(babelify, { presets: ["@babel/preset-env"] })
    .bundle()
    .pipe(source("inpage.js"))
    .pipe(dest("dev/"))
    .pipe(livereload());
}

function jsBuild() {
  return browserify(["src/contentScript/inpage.js"])
    .transform(babelify, { presets: ["@babel/preset-env"] })
    .bundle()
    .pipe(source("inpage.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(dest("build/"));
}

exports.watch = function () {
  livereload.listen();
  watch("src/contentScript/inpage.js", js);
};

exports.build_dev = series(js);
exports.build_production = series(jsBuild);
