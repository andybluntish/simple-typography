module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    name: 'typography',

    // Empty build directory
    clean: ['build'],

    // Compile styles form SCSS to CSS
    sass: {
      build: {
        files: {
          'build/<%= name %>.css': ['src/<%= name %>.scss']
        }
      }
    },

    // Create a version that includes Normalize.css
    concat: {
      devVendor: {
        files: {
          'build/<%= name %>.pkg.css': [
            'bower_components/normalize-css/normalize.css',
            'build/<%= name %>.css'
          ],
        }
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      build: {
        files: [{
          expand: true,
          cwd: 'build',
          src: '**/*.css',
          dest: 'build'
        }]
      }
    },

    // Minify CSS
    cssmin: {
      build: {
        files: {
          'build/<%= name %>.min.css': ['build/<%= name %>.css'],
          'build/<%= name %>.pkg.min.css': ['build/<%= name %>.pkg.css']
        }
      }
    },

    // Development server
    connect: {
      options: {
        livereload: 35729,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect().use('/bower_components', connect.static('./bower_components')),
              connect().use('/build', connect.static('./build')),
              connect.static('example')
            ];
          }
        }
      }
    },

    // Watch files for changes
    watch: {
      build: {
        files: ['src/**/*.scss'],
        tasks: ['compile'],
        options: {
          livereload: true
        }
      }
    }

  });

  // Load plugins.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Compile
  grunt.registerTask('compile', [
    'clean',
    'sass',
    'concat',
    'autoprefixer',
    'cssmin'
  ]);

  // Livereload server
  grunt.registerTask('serve', [
    'compile',
    'connect',
    'watch'
  ]);

  // Default task
  grunt.registerTask('default', ['compile']);
};
