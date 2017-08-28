var path = require("path");
var fs = require("fs");
// -------------------------------------
var autoprefixer = require("gulp-autoprefixer");
var clean = require("gulp-clean");
var purify = require("gulp-purifycss");
var rename = require("gulp-rename");
var replace = require("gulp-replace");
var shorthand = require("gulp-shorthand");
var concat = require("gulp-concat");
var minify_html = require("gulp-minify-html");
var clean_css = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var beautify = require("gulp-jsbeautifier");
// // Uncomment for uglify-es
// var composer = require("gulp-uglify/composer");
// var uglify = composer(require("uglify-es"), console);
// var beautify = require("gulp-jsbeautifier");
// -------------------------------------
var del = require("del");
var bs = require("browser-sync");
var bs_autoclose = require("browser-sync-close-hook");
var cleanup = require("node-cleanup");
var git = require("git-state");
var find_free_port = require("find-free-port");
var gulpif = require("gulp-if");
var fail = require("gulp-fail");
var print = require("gulp-print");
var mds = require("markdown-styles");
var open = require("opn");
var sequence = require("run-sequence");
var pump = require("pump");
var args = require("yargs");
var cli = args.argv;
// -------------------------------------
var config = require("./gulp/config.json");
var paths = config.paths;
var options = config.options;
var beautify_options = options.beautify;
var autoprefixer_options = options.autoprefixer;
var regexp = config.regexp;
var __type__ = config.__type__;
var __path__ = __dirname;
var branch_name = undefined;
// -------------------------------------
var utils = require("./gulp/utils.js");
var log = utils.log;
var time = utils.time;
var notify = utils.notify;
var gulp = utils.gulp;
var uri = utils.uri;
// -------------------------------------
// create the browser-sync servers
var bs1 = bs.create("localhost"),
    bs2 = bs.create("readme"),
    ports = {
        bs1: {
            app: null,
            ui: null
        },
        bs2: {
            app: null,
            ui: null
        }
    };
// init HTML files + minify
gulp.task("html", function(done) {
    // regexp used for pre and post HTML variable injection
    // get regexp info
    var r = regexp.html;
    var r_pre = r.pre;
    var r_post = r.post;
    var r_func = function(match) {
        var filename = "html/source/regexp/" + match.replace(/\$\:(pre|post)\{|\}$/g, "") + ".text";
        // check that file exists before opening/reading...
        // return undefined when file does not exist...else return its contents
        return (!fs.existsSync(filename)) ? "undefined" : fs.readFileSync(filename)
            .toString();
    };
    pump([gulp.src(paths.tasks.html, {
            cwd: "html/source/"
        }),
        concat("index.html"),
        replace(new RegExp(r_pre.p, r_pre.f), r_func),
        beautify(beautify_options),
        replace(new RegExp(r_post.p, r_post.f), r_func),
        gulp.dest("./"),
        minify_html(),
        gulp.dest("dist/"),
        bs1.stream()
    ], done);
});
gulp.task("precssapp-clean-styles", function(done) {
    // regexp used for custom CSS code modifications
    // get regexp info
    var r = regexp.css;
    var pf = r.prefixes;
    var lz = r.lead_zeros;
    var ez = r.empty_zero;
    var lh = r.lowercase_hex;
    pump([gulp.src(["styles.css"], {
            cwd: "css/source/"
        }),
        // [https://www.mikestreety.co.uk/blog/find-and-remove-vendor-prefixes-in-your-css-using-regex]
        replace(new RegExp(pf.p, pf.f), pf.r),
        replace(new RegExp(lz.p, lz.f), lz.r),
        replace(new RegExp(ez.p, ez.f), ez.r),
        replace(new RegExp(lh.p, lh.f), function(match) {
            return match.toLowerCase();
        }),
        gulp.dest("css/source/"),
        bs1.stream()
    ], done);
});
// build app.css + autoprefix + minify
gulp.task("cssapp", ["precssapp-clean-styles"], function(done) {
    pump([gulp.src(paths.tasks.cssapp, {
            cwd: "css/source/"
        }),
        concat("app.css"),
        autoprefixer(autoprefixer_options),
        shorthand(),
        beautify(beautify_options),
        gulp.dest("css/"),
        clean_css(),
        gulp.dest("dist/css/"),
        bs1.stream()
    ], done);
});
// build libs.css + minify + beautify
gulp.task("csslibs", function(done) {
    pump([gulp.src(paths.tasks.csslibs, {
            cwd: "css/libs/"
        }),
        concat("libs.css"),
        autoprefixer(autoprefixer_options),
        shorthand(),
        beautify(beautify_options),
        gulp.dest("css/"),
        clean_css(),
        gulp.dest("dist/css/"),
        bs1.stream()
    ], done);
});
// check for any unused CSS
gulp.task("purify", function(done) {
    // run yargs
    args.usage("Usage: $0 --remove [boolean]")
        .option("remove", {
            alias: "r",
            default: false,
            describe: "Removes `pure.css`.",
            type: "boolean"
        })
        .option("delete", {
            alias: "D",
            default: false,
            describe: "Removes `pure.css` and removed unused CSS.",
            type: "boolean"
        })
        .help("?")
        .alias("?", "help")
        .example("$0 --remove", "Deletes `pure.css` and removes unused CSS.")
        .example("$0 --delete", "Deletes `pure.css`")
        .argv;
    // get the command line arguments from yargs
    var remove = cli.r || cli.remove;
    var delete_file = cli.D || cli.delete;
    // remove pure.css
    if (remove || delete_file) del(["./css/pure.css"]);
    // don't run gulp just delete the file.
    if (delete_file) return done();
    pump([gulp.src("./css/source/styles.css"),
        purify(["./js/app.js", "./index.html"], {
            info: true,
            rejected: true
        }),
        gulpif(!remove, rename("pure.css")),
        gulp.dest("./css/" + (remove ? "source/" : ""))
    ], done);
});
// build app.js + minify + beautify
gulp.task("jsapp", function(done) {
    pump([gulp.src(paths.flavor.jsapp, {
            cwd: "js/source/"
        }),
        concat("app.js"),
        beautify(beautify_options),
        gulp.dest("js/"),
        uglify(),
        gulp.dest("dist/js/"),
        bs1.stream()
    ], done);
});
// build lib/lib.js + lib/lib.min.js
gulp.task("jslibsource", function(done) {
    // check if application is a library
    var is_library = __type__ === "library";
    if (!is_library) return done(); // return on apps of type "webapp"
    // remove test files from files
    var files_array = paths.flavor.jsapp.filter(function(filename) {
        return !(/^test/i)
            .test(filename);
    });
    pump([gulp.src(files_array, {
            cwd: "js/source/"
        }),
        concat("app.js"),
        beautify(beautify_options),
        gulpif(is_library, rename("lib.js")),
        gulpif(is_library, gulp.dest("lib/")),
        gulpif(is_library, gulp.dest("dist/lib/")), // <-- also add to dist/ directory
        uglify(),
        gulpif(is_library, rename("lib.min.js")),
        gulpif(is_library, gulp.dest("lib/")),
        gulpif(is_library, gulp.dest("dist/lib/")), // <-- also add to dist/ directory
        bs1.stream()
    ], done);
});
// build libs.js + minify + beautify
gulp.task("jslibs", function(done) {
    pump([gulp.src(paths.flavor.jslibs, {
            cwd: "js/libs/"
        }),
        concat("libs.js"),
        beautify(beautify_options),
        gulp.dest("js/"),
        uglify(),
        gulp.dest("dist/js/"),
        bs1.stream()
    ], done);
});
// copy css libraries folder
gulp.task("csslibsfolder", ["clean-csslibs"], function(done) {
    pump([gulp.src(["css/libs/**"]),
        gulp.dest("dist/css/libs/"),
        bs1.stream()
    ], done);
});
// copy js libraries folder
gulp.task("jslibsfolder", ["clean-jslibs"], function(done) {
    pump([gulp.src(["js/libs/**"]),
        gulp.dest("dist/js/libs/"),
        bs1.stream()
    ], done);
});
// copy img/ to dist/img/
gulp.task("img", function(done) {
    // deed to copy hidden files/folders?
    // [https://github.com/klaascuvelier/gulp-copy/issues/5]
    pump([gulp.src("img/**/*"),
        gulp.dest("dist/img/"),
        bs1.stream()
    ], done);
});
// markdown to html (with github style/layout)
gulp.task("readme", function(done) {
    mds.render(mds.resolveArgs({
        input: path.normalize(process.cwd() + "/README.md"),
        output: path.normalize(process.cwd() + "/markdown/preview"),
        layout: path.normalize(process.cwd() + "/markdown/source")
    }), function() {
        // cleanup README.html
        pump([gulp.src("README.html", {
                cwd: "markdown/preview/"
            }),
            beautify(beautify_options),
            gulp.dest("./markdown/preview/"),
            bs1.stream()
        ], done);
    });
});
// watch changes to files
gulp.task("watch", function(done) {
    // add auto tab closing capability to browser-sync. this will
    // auto close the used bs tabs when gulp closes.
    bs1.use({
        plugin() {},
        hooks: {
            "client:js": bs_autoclose
        },
    });
    bs2.use({
        plugin() {},
        hooks: {
            "client:js": bs_autoclose
        },
    });
    // start browser-syncs
    bs1.init({
        browser: options.browsers.list,
        proxy: uri(),
        port: ports.bs1.app,
        ui: {
            port: ports.bs1.ui
        },
        notify: false
    });
    bs2.init({
        browser: options.browsers.list,
        proxy: uri("markdown/preview/README.html"),
        port: ports.bs2.app,
        ui: {
            port: ports.bs2.ui
        },
        notify: false,
        open: false
    });
    // get the watch path
    var path = paths.watch;
    gulp.watch(path.html, {
        cwd: "html/source/"
    }, function() {
        return sequence("html");
    });
    gulp.watch(path.css, {
        cwd: "css/"
    }, function() {
        return sequence("cssapp", "csslibs", "csslibsfolder");
    });
    gulp.watch(path.js, {
        cwd: "js/"
    }, function() {
        return sequence("jsapp", "jslibsource", "jslibs", "jslibsfolder");
    });
    gulp.watch(path.img, {
        cwd: "./"
    }, function() {
        return sequence("img");
    });
    gulp.watch(["README.md"], {
        cwd: "./"
    }, function() {
        return sequence("readme", function() {
            bs2.reload();
        });
    });
    done();
});
// open index.html in browser
gulp.task("open", function(done) {
    // run yargs
    var _args = args.usage("Usage: $0 --file [string] --port [number]")
        .option("file", {
            alias: "f",
            demandOption: true,
            describe: "The file to open.",
            type: "string"
        })
        .option("port", {
            alias: "p",
            demandOption: true,
            describe: "The port to open browser in.",
            type: "number"
        })
        .coerce("file", function(value) {
            // reset file value
            if (value === "index.html") value = null;
            if (value === "readme.md") {
                value = "markdown/preview/README.html";
            }
            return value;
        })
        .help("?")
        .alias("?", "help")
        .example("$0 --file index.html --port 3000", "Open index.html in port 3000.")
        .example("$0 --file readme.md --port 3002", "Open readme.md in port 3002.")
        .argv;
    // open file in the browser
    open(uri(_args.f || _args.file, _args.p || _args.port), {
            app: options.browsers.list
        })
        .then(function() {
            notify("File opened!");
            done();
        });
});
// update the status of gulp to active
gulp.task("status", function(done) {
    var path = "./gulp/.__status__";
    fs.readFile(path, "utf8", function(err, data) {
        if (err) throw err;
        fs.writeFile(path, "✔", "utf-8", function(err) {
            if (err) throw err;
            done();
        });
    });
});
// watch for branch changes:
// branch name checks are done to check whether the branch was changed after
// the gulp command was used. this is done as when switching branches files
// and file structure might be different. this can cause some problems with
// the watch tasks and could perform gulp tasks when not necessarily wanted.
// to resume gulp simply restart with the gulp command.
gulp.task("git-branch", ["status"], function(done) {
    git.isGit(__path__, function(exists) {
        // if no .git exists simply ignore and return done
        if (!exists) return done();
        git.check(__path__, function(err, result) {
            if (err) throw err;
            // record branch name
            branch_name = result.branch;
            log(("(pid:" + process.pid + ")")
                .yellow + " Gulp monitoring " + branch_name.green + " branch.");
            // set the gulp watcher as .git exists
            gulp.watch([".git/HEAD"], {
                cwd: "./",
                dot: true
            }, function() {
                var brn_current = git.checkSync(__path__)
                    .branch;
                if (brn_current !== branch_name) {
                    // message + exit
                    log(("[warning]")
                        .yellow + " Gulp stopped due to branch switch. (" + branch_name.green + " => " + brn_current.yellow + ")");
                    log(("[warning]")
                        .yellow + " Restart Gulp to monitor " + brn_current.yellow + " branch.");
                    process.exit();
                }
            });
            // when gulp is closed do a quick cleanup
            cleanup(function(exit_code, signal) {
                // clear the status of gulp to off
                fs.writeFileSync("./gulp/.__status__", "");
                branch_name = undefined;
                if (bs1) bs1.exit();
                if (bs2) bs2.exit();
                if (process) process.exit();
            });
            done();
        });
    });
});
// remove options
var opts = {
    read: false,
    cwd: "./"
};
// remove the dist/ folder
gulp.task("clean-dist", ["git-branch"], function(done) {
    pump([gulp.src("dist/", opts),
        clean()
    ], done);
});
// remove the css/libs/ folder
gulp.task("clean-csslibs", function(done) {
    pump([gulp.src("dist/css/libs/", opts),
        clean()
    ], done);
});
// remove the js/libs/ folder
gulp.task("clean-jslibs", function(done) {
    pump([gulp.src("dist/js/libs/", opts),
        clean()
    ], done);
});
// build the dist/ folder
gulp.task("build", ["clean-dist"], function(done) {
    var build_order = config.paths.order;
    build_order.push(function() {
        notify("Build complete");
        done();
    });
    return sequence.apply(this, build_order);
});
// gulps default task is set to rum the build + watch + browser-sync
gulp.task("default", function(done) {
    return find_free_port(3000, 3100, "127.0.0.1", 4, function(err, p1, p2, p3, p4) {
        // set the ports
        ports.bs1.app = p1;
        ports.bs1.ui = p2;
        ports.bs2.app = p3;
        ports.bs2.ui = p4;
        // after getting the free ports, finally run the build task
        return sequence("build", function() {
            sequence("watch");
            done();
        });
    });
});
//
// **************************************************************************
// * The following tasks are helper tasks and should be modified as needed. *
// **************************************************************************
//
// run gulp-jsbeautifier on html, js, css, & json files to clean them
gulp.task("clean-files", function(done) {
    // this task can only run when gulp is not running as gulps watchers
    // can run too many times as many files are potentially being beautified
    var path = "./gulp/.__status__";
    fs.readFile(path, "utf8", function(err, data) {
        if (err) throw err;
        // if file is empty gulp is not active
        if (data.length) {
            log(("[warning]")
                .yellow + " Files cannot be cleaned while Gulp is running. Close Gulp then try again.");
            return done();
        }
        var condition = function(file) {
            var filepath = file.path;
            var parts = filepath.split(".");
            var ext = parts.pop()
                .toLowerCase();
            var path = parts.join(".");
            // this array may be populated with files needed to be ignored
            // just add the file's path to the array.
            var exclude = ["index.html"];
            // file ext must be of one of the following types
            if (!-~["html", "js", "css", "json"].indexOf(ext)) return false;
            // cannot be in the exclude array
            if (-~exclude.indexOf(filepath.replace(__path__ + "/", ""))) return false;
            // check if file is a min
            var path_parts = path.split("/");
            var last = path_parts[path_parts.length - 1].toLowerCase();
            // cannot be a minimized file
            if (-~last.indexOf(".min")) return false;
            return true;
        };
        // get all files
        pump([gulp.src(["**/*.*", "!node_modules/**"], {
                cwd: "./",
                dot: true
            }),
            gulpif(condition, print(function(filepath) {
                return "file: " + filepath;
            })),
            gulpif(condition, beautify(beautify_options)),
            gulp.dest("./"),
        ], done);
    });
});
// finds all the files that contain .min in the name and prints them
gulp.task("findmin", function(done) {
    var condition = function(file) {
        var filepath = file.path;
        var parts = filepath.split(".");
        var ext = parts.pop()
            .toLowerCase();
        var path = parts.join(".");
        // file ext must be of one of the following types
        if (!-~["html", "js", "css", "json"].indexOf(ext)) return false;
        // check if file is a min
        var path_parts = path.split("/");
        var last = path_parts[path_parts.length - 1].toLowerCase();
        // must be a minimized file
        if (!-~last.indexOf(".min")) return false;
        return true;
    };
    // get all files
    pump([gulp.src(["**/*.*", "!node_modules/**"], {
            cwd: "./",
            dot: true
        }),
        gulpif(condition, print(function(filepath) {
            return "file: " + filepath;
        })),
    ], done);
});
