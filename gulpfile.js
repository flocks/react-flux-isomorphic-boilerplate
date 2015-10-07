var gulp = require("gulp"),
    browserify = require("browserify"),
    reactify = require("reactify"),
    watchify = require("watchify"),
    sourceStream = require("vinyl-source-stream"),
    runSequence = require("run-sequence"),
    del = require("del"),
    argv = require("yargs").argv,
    $ = require("load-plugins")("gulp-*");

var exec = require('child_process').exec;


var path = {
    SRC: "./app/",
    DIST: "./dist/",
    IMG: "./app/images/**/*",
    FONT: "./app/fonts/**/*",
    CONFIG: "./config/",
    CONFIGS: "./configs/",
    TRANSLATIONS: "./translations/"
};


// HTML

gulp.task("html", function() {
    return gulp.src(path.SRC + "index.ejs")
        .pipe(gulp.dest(path.DIST))
        .pipe(browserSync.stream());
});


// STYLES

gulp.task("scsslint", function() {
    return gulp.src([path.SRC + "scss/**/*.scss"])
        .pipe($.changed(path.DIST))
        .pipe($.scssLint());
});

gulp.task("scss", function() {
    return gulp.src(path.SRC + "scss/main.scss")
        .pipe($.plumber({errorHandler: function(err) {
            $.util.beep();
            $.util.log($.util.colors.red(err.message));
            this.emit("end");
        }}))
        .pipe($.sass())
        .pipe($.autoprefixer({
            browsers: ["last 2 versions", "ie >= 8"]
        }))
        .pipe(gulp.dest(path.DIST))
});

gulp.task("minifycss", function() {
    return gulp.src(path.DIST + "main.css")
        .pipe($.minifyCss())
        .pipe(gulp.dest(path.DIST));
});

gulp.task("css", ["scsslint", "scss"]);

gulp.task("cssprod", ["scss"]);

gulp.task("cssProd", function() {
    return runSequence("cssprod", "minifycss");
});


// JS

gulp.task("eslint", $.shell.task("eslint . --color", {ignoreErrors: true}));

gulp.task("watchify", ["serve"], function() {
    var watcher = watchify(browserify({
        entries: [path.SRC + "js/main.js"],
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    }));

    return watcher.on("update", function () {
        var updateStart = Date.now();
        $.util.log($.util.colors.green("Updating main.js ..."));
        watcher.bundle()
            .on("error", function (err) {
                $.util.log($.util.colors.red(err.message));
                $.util.beep();
                this.emit("end");
            })
            .pipe(sourceStream("main.js"))
            .pipe(gulp.dest(path.DIST))
        $.util.log($.util.colors.green("Updated!", (Date.now() - updateStart) + "ms"));
    })
    .bundle()
    .on("error", function (err) {
        $.util.log($.util.colors.red(err.message));
        $.util.beep();
        this.emit("end");
    })
    .pipe(sourceStream("main.js"))
    .pipe(gulp.dest(path.DIST));
});

gulp.task("browserify", function() {
    return browserify({
        entries: path.SRC + "js/main.js",
        transform: [reactify],
        debug: true
    })
    .bundle()
    .pipe(sourceStream("main.js"))
    .pipe(gulp.dest(path.DIST));
});


gulp.task("uglify", function() {
    return gulp.src(path.DIST + "*.js")
    .pipe($.uglify())
    .pipe(gulp.dest(path.DIST));
});

gulp.task("js", ["eslint", "watchify"]);

gulp.task("jsProd", function() {
    return runSequence("browserify", "uglify");
});


// ASSETS

// TODO: improve assets workflow for prod
gulp.task("assets", function() {
    gulp.src([path.IMG, path.FONT], {base: "./app"})
        .pipe($.changed(path.DIST))
        .pipe(gulp.dest(path.DIST));
});

gulp.task("assetsProd", function() {
    gulp.src([path.IMG, path.FONT], {base: "./app"})
        .pipe($.imagemin())
        .pipe(gulp.dest(path.DIST));
});


// UTILS

gulp.task("cleanDist", function(done) {
    del([path.DIST], done);
});

gulp.task("serve", function () {
    exec("node server/app.js");
});

gulp.task("gzip", function() {
    return gulp.src(path.DIST + "**/*.{html,xml,json,css,js}")
        .pipe($.gzip())
        .pipe(gulp.dest(path.DIST));
});


// RUN

gulp.task("default", function() {
    runSequence("cleanDist", ["html", "css", "js", "assets"], "serve");

    gulp.watch([path.SRC + "index.ejs"], ["html"]);

});


gulp.task("deploy", function() {
    if (process.env.NODE_ENV !== "production") {
        return callback()
   }
   else {
        runSequence("production")
   }
});

gulp.task("production", function() {
    runSequence("cleanDist", ["html", "cssProd", "jsProd", "assetsProd"]);
});

