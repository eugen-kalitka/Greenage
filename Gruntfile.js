module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {
            target: {
                src: ["src/layouts/main.jade"]
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: {
                    "build/index.html": ["src/layouts/main.jade"]
                }
            }
        },
        useminPrepare: {
            html: ["build/index.html"]
        },
        less: {
            compile: {
                options: {
                    compress: true,
                    sourceMap: true,
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
                    ]
                },
                files: {
                    "build/css/styles.css": [
                        "bower_components/bootstrap/bootstrap.less",
                        "bower_components/font-awesome/less/font-awesome.less",
                        "src/less/main.less"
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
                src: [
                    "bower_components/jquery/dist/jquery.js",
                    "bower_components/bootstrap/dist/js/bootstrap.js",
                    "bower_components/jcf/js/jcf.js",
                    "bower_components/jcf/js/jcf.select.js",
                    "bower_components/jcf/js/jcf.radio.js",
                    "bower_components/jcf/js/jcf.checkbox.js",
                    "bower_components/jcf/js/jcf.file.js",
                    "src/js/carouselEqHeight.js",
                    "src/js/customForm.js",
                    "src/js/slowTop.js"
                ],
                dest: "build/js/compilated.js"
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            dest: {
                files: {
                    "build/js/compilated.js": "build/js/compilated.js"
                }
            }
        },
        usemin: {
            html: ["build/index.html"]
        },
        copy: {
            iecss: {
                expand: true,
                cwd: "src/css/",
                src: ["ie8.css"],
                dest: "build/css/"
            },
            image: {
                expand: true,
                cwd: "src/img/",
                src: ["*.png"],
                dest: "build/img/"
            },
            fonts: {
                expand: true,
                cwd: "src/fonts/",
                src: ["*"],
                dest: "build/fonts/"
            },
            pie: {
                expand: true,
                cwd: "src/pie/",
                src: ["*"],
                dest: "build/pie/"
            }
        },
        sprite: {
            default: {
                src: ["src/img/raw/fileArrow*.png", "src/img/raw/selectArrow*.png"],
                retinaSrcFilter: ['src/img/raw/*@2x.png'],
                dest: 'src/img/spritesheet.png',
                retinaDest: 'src/img/spritesheet@2x.png',
                destCss: 'src/css/spritesheet.css'
            }
        },
        clean: {
            build: ["build/"]
        },
        watch: {
            options: {
                livereload: true
            },
            jade: {
                files: 'src/layouts/*.jade',
                tasks: ['jade', 'useminPrepare', 'concat', 'uglify', 'usemin']
            },
            scripts: {
                files: 'src/js/*.js',
                tasks: ['concat', 'uglify']
            },
            styles: {
                files: 'src/less/*.less',
                tasks: ['less']
            },
            iestyles: {
                files: 'src/css/*.css',
                tasks: ['copy:iecss']
            }
        }

    });
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-spritesmith');

    grunt.registerTask('server', 'Start a custom web server.', function() {
        require('./server.js');
    });

    grunt.registerTask('default', [
        'clean',
        'wiredep',
        'jade',
        'useminPrepare',
        'less',
        'concat',
        'uglify',
        'usemin',
        'sprite',
        'copy',
        'server',
        'watch'
    ]);

    grunt.registerTask('heroku:production', [
        'clean',
        'wiredep',
        'jade',
        'useminPrepare',
        'less',
        'concat',
        'uglify',
        'usemin',
        'sprite',
        'copy',
        'server'
    ]);
};