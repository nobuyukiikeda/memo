const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const imgmin = require('gulp-imagemin');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

gulp.task('pug',function(){
	gulp.src(['./pug/*.pug', '!./pug/_*.pug', './pug/**/*.pug', '!./pug/**/_*.pug'])
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./'));
});

gulp.task('sass',function(){
	gulp.src('./scss/style.scss')
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(autoprefixer({
		browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4']
	}))
	// .pipe(cleanCss())
	.pipe(sourcemaps.write('./css/cssmaps'))
	.pipe(gulp.dest('./css'))
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