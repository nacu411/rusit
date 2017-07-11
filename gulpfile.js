var gulp = require('gulp'), 
	sass = require('gulp-sass'), 
    csso = require('gulp-csso'),
	watch = require('gulp-watch'), 
	imagemin = require('gulp-imagemin'), 
	sourcemaps = require('gulp-sourcemaps'), 
	autoprefixer = require('gulp-autoprefixer'), 
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
    build: { 
        html: './',
        js: 'build/scripts/',
        style: 'build/style/',
        media: 'build/media/',
        fonts: 'build/fonts/',
        libs: 'build/libs/'
    },
    src: { 
        html: './*.html', 
        js: 'src/scripts/main.js',
        style: 'src/style/main.scss',
        media: 'src/media/**/*.*', 
        fonts: 'src/fonts/**/*.*',
        libs: 'src/libs/**/*.*'
    },
    watch: { 
        html: './*.html',
        js: 'src/scripts/**/*.js',
        style: 'src/style/**/*.scss',
        media: 'src/media/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
};

var config = {
    server: {
        baseDir: "../rusit/"
    },
    host: 'localhost',
    port: 1337,
};

// TASKS
gulp.task('html:build', function() {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});
 
gulp.task('scripts:build', function() {
	gulp.src(path.src.js)
	    .pipe(gulp.dest(path.build.js)) 
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function() {
	gulp.src(path.src.style)
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
        .pipe(csso({
            restructure: true,
            souceMap: true,
            debug: true
        }))
		.pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});

gulp.task('media:build', function() {
   gulp.src(path.src.media)
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.media)) 
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('libs:build', function() {
    gulp.src(path.src.libs)
        .pipe(gulp.dest(path.build.libs))
        .pipe(reload({stream: true}));
})

gulp.task('watch', function(){
    watch([path.watch.html], function() {
        gulp.start('html:build');
    });
    watch([path.watch.js], function() {
        gulp.start('scripts:build');
    });
  	watch([path.watch.style], function() {
  	    gulp.start('style:build');
  	});
    watch([path.watch.media], function() {
        gulp.start('media:build');
    });
    watch([path.watch.fonts], function() {
        gulp.start('fonts:build');
    });
});

gulp.task('server', function () {
    browserSync(config);
});

gulp.task('default', ['build', 'server', 'watch']);

gulp.task('build', ['html:build', 'scripts:build', 'style:build', 'media:build', 'fonts:build', 'libs:build']);