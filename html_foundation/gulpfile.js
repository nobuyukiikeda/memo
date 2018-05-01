var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var imgmin = require('gulp-imagemin');
var pug = require('gulp-pug');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('pug',function(){
	gulp.src(['./pug/*.pug', '!./pug/_*.pug'])
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./html/'));
});

gulp.task('sass',function(){
	gulp.src('./scss/style.scss')
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4']
	}))
	// .pipe(cleanCss())
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./css/'))
});

gulp.task('watch',function(){
	gulp.watch('./scss/**/*.scss',['sass']);
});

gulp.task('js',function(){
	gulp.src(['./js/src/*.js', './js/src/**/*.js'])
	.pipe(plumber())
	// .pipe(uglify())
	.pipe(gulp.dest('./js/min/'));
})

// Babel
gulp.task('babel', function(){
	browserify('./js/src/app.js', { debug: true })
	.transform(babelify, {presets: ['es2015']})
	.bundle()
	.on('error', function(err){ console.log('Error : ' + err.message); })
	.pipe(source('app.js'))
	.pipe(gulp.dest('js/dist'))
});

// 画像圧縮
gulp.task('img',function() {
	gulp.src('./img_src/**/**')
	.pipe(imgmin())
	.pipe(gulp.dest('./img/'));
}); 

gulp.task('default',function(){
	gulp.watch(['./pug/*.pug', './pug/**/*.pug'],['pug']);
	gulp.watch('./scss/**/*.scss',['sass']);
	// gulp.watch('./img_src/**/**',['img']);
	// gulp.watch(['./js/**/*js','!./js/min/**/*.js'],['js']);
})