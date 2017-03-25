var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var minify = require("gulp-minify-css");

gulp.task("sass",function(){
	gulp.src("scss/style.scss")
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(minify())
	.pipe(gulp.dest("css"))
});

gulp.task("watch",function(){
	gulp.watch("scss/**/*scss",["sass"]);
});

gulp.task("js",function(){
	gulp.src(["js/**/*.js","!js/min/**/*.js"])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest("./js/min"));
})

gulp.task("default",function(){
	gulp.watch("scss/**/*scss",["sass"]);
	gulp.watch(["js/**/*js","!js/min/**/*.js"],["js"]);
})