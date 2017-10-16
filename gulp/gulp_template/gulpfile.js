var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var minify = require("gulp-minify-css");
var imgmin = require('gulp-imagemin');
var concat = require('gulp-concat');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');

gulp.task("pug",function(){
	gulp.src(["./pug/*.pug", "!./pug/_*.pug"])
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest("./html/"));
});

gulp.task("sass",function(){
	gulp.src("./scss/style.scss")
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(minify())
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest("./css/"))
});

gulp.task("watch",function(){
	gulp.watch("./scss/**/*.scss",["sass"]);
});

gulp.task("js",function(){
	gulp.src(["./js/src/*.js", "./js/src/**/*.js"])
	.pipe(plumber())
	// .pipe(concat("all.js"))
	.pipe(gulp.dest("./js/min/"));
})

// 画像圧縮
gulp.task('img',function() {
	gulp.src("./img_src/**/**")
	.pipe(imgmin())
	.pipe(gulp.dest('./img/'));
}); 

gulp.task("default",function(){
	gulp.watch("./pug/**/*.pug",["pug"]);
	gulp.watch("./scss/**/*.scss",["sass"]);
	// gulp.watch("./img_src/**/**",["img"]);
	gulp.watch(["./js/**/*js","!./js/min/**/*.js"],["js"]);
})