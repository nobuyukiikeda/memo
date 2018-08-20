const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  plumber = require('gulp-plumber'),
	  uglify = require('gulp-uglify'),
	  cleanCss = require('gulp-clean-css'),
	  imagemin = require('gulp-imagemin'),
	  pngquant = require('imagemin-pngquant'),
	  mozjpeg = require('imagemin-mozjpeg'),
	  pug = require('gulp-pug'),
	  sourcemaps = require('gulp-sourcemaps'),
	  notify = require('gulp-notify');

gulp.task('log', done => {
	console.log('gulp done!')
	done()
})

gulp.task('pug', done => {
	gulp.src(['./pug/*.pug', '!./pug/_*.pug'])
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./html/'))
	done()
});

gulp.task('sass', done => {
	gulp.src('./scss/style.scss')
	.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.4']
	}))
	.pipe(cleanCss())
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./css/'))
	done()
});

gulp.task('js', done => {
	gulp.src(['./js/src/*.js', './js/src/**/*.js'])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('./js/min/'))
	done()
})


// 画像圧縮
gulp.task('img', done =>  {
	gulp.src(['./_img/**/**', './_img/**'])
	.pipe(imagemin([
		pngquant({
			quality: '65-80',  // 画質
			speed: 1,  // 最低のスピード
			floyd: 0,  // ディザリングなし
		}),
		mozjpeg({
			quality: 85, // 画質
			progressive: false
		}),
		imagemin.svgo(),
		imagemin.optipng(),
		imagemin.gifsicle()
	]))
	.pipe(gulp.dest('./img/'))
	done()
}); 

gulp.task('default', () => {
	gulp.watch('./pug/**/*.pug', gulp.series('pug', 'log'));
	gulp.watch('./scss/**/*.scss', gulp.series('sass', 'log'));
	gulp.watch('./img_src/**/**', gulp.series('img', 'log'));
	gulp.watch(['./js/**/*js','!./js/min/**/*.js'], gulp.series('js', 'log'));
})