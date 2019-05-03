const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  plumber = require('gulp-plumber'),
	  uglify = require('gulp-uglify'),
	  imagemin = require('gulp-imagemin'),
	  pngquant = require('imagemin-pngquant'),
	  mozjpeg = require('imagemin-mozjpeg'),
	  pug = require('gulp-pug'),
	  sourcemaps = require('gulp-sourcemaps'),
	  notify = require('gulp-notify'),
	  babel = require('gulp-babel'),
	  babelify = require('babelify'),
	  browserify = require('browserify'),
	  glsl = require('glslify'),
	  merge = require('merge-stream'),
	  source = require('vinyl-source-stream'),
	  streamify = require('gulp-streamify'),
      changed = require('gulp-changed');

const handleErrors = require('./handleErrors');

gulp.task('log', done => {
	console.log('gulp done!')
	done()
})

/********* task *********/
gulp.task('sass', done => {
	gulp.src('scss/style.scss')
    .pipe(changed('scss'))
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write('cssmap'))
	.pipe(gulp.dest('css'))
	done()
});
// base babel(browserify)
const bOpts = {
	entries: 'js/src/main.js',
	debug: true,
	transform: [
	['babelify',{
		presets: ['env']
	}],
	'glslify'
	]
}
gulp.task('babel', done => {
	browserify(bOpts)
	.bundle()
	.on('error', handleErrors)
	.pipe(source('main.js'))
	.pipe(streamify(uglify()))
	.on('error', function(e) {
		console.log(e);
	})
	.pipe(gulp.dest('js/dist'))
	done()
});
// 画像圧縮
const targetImg = ['_img/*.{png,jpg,jpeg,gif,svg}', '_img/**/*.{png,jpg,jpeg,gif,svg}'];
gulp.task('img', done =>  {
    gulp.src(targetImg)
    .pipe(changed('img'))
    .pipe(imagemin([
        pngquant({
            quality: '65-80',  // 画質
            speed: 1,  // 最低のスピード
            floyd: 0,  // ディザリングなし
        }),
        mozjpeg({
            quality: 86, // 画質
            progressive: false
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle()
    ]))
    .pipe(gulp.dest('img'))
    done()
});

// base task
gulp.task('base', () => {
	gulp.watch(['scss/**/*.scss'], gulp.series('sass', 'log'));
	gulp.watch(['js/src/*.js'], gulp.series('babel', 'log'));
    gulp.watch(targetImg, gulp.series('img', 'log'));
});
/********* base end *********/