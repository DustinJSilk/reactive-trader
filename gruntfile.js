module.exports = function(grunt){
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ['babelify', {presets: ['latest']}]
          ]
        },
        files: {
          './frontend/static/js/app.js': [
            './frontend/js/app.js'
          ],
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          './frontend/static/css/main.css': './frontend/sass/base.scss'
        },
      }
    },

    watch: {
      scripts: {
        files: './frontend/js/**/*.js',
        tasks: ['browserify', 'notify:js'],
        options: {
          interrupt: true,
          spawn: false
        },
      },
      sass: {
        files: './frontend/sass/**/*.scss',
        tasks: ['sass', 'notify:sass'],
        options: {
          interrupt: true,
          spawn: false
        },
      },
    },

    notify: {
      all: {
        options: {
          title: 'Build finished',  // optional
          message: 'All', //required
        }
      },
      sass: {
        options: {
          title: 'Build finished',  // optional
          message: 'SASS', //required
        }
      },
      js: {
        options: {
          title: 'Build finished',  // optional
          message: 'JS', //required
        }
      },
    }
  });

  grunt.registerTask("lint", ["eslint"]);
  grunt.registerTask("default", [
    "browserify",
    "sass",
    "notify:all"
  ]);
};
