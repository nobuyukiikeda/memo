var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var minify = require("gulp-minify-css");
var imgmin = require('gulp-imagemin');
var concat = require('gulp-concat');

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
	.pipe(gulp.dest("js/min"));
})

// 画像圧縮
gulp.task('img',function() {
	var imgpath = 'imgsrc/*.+(png|jpeg|jpg|svg)';
	gulp.src(imgpath)
	.pipe(imgmin())
	.pipe(gulp.dest('img/'));
}); 

gulp.task("default",function(){
	gulp.watch("scss/**/*scss",["sass"]);
	gulp.watch(["js/**/*js","!js/min/**/*.js"],["js"]);
})