module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Empty build directory
    clean: ['build'],

    // Compile styles form SCSS to CSS
    sass: {
      build: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**/*.scss',
          dest: 'build',
          ext: '.css'
        }]
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
        files: [{
          expand: true,
          cwd: 'build',
          src: '**/*.css',
          dest: 'build',
          ext: '.min.css'
        }]
      }
    },

    // Watche files for changes
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
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Compile
  grunt.registerTask('compile', [
    'clean',
    'sass',
    'autoprefixer',
    'cssmin'
  ]);

  // Default task
  grunt.registerTask('default', ['compile']);
};
