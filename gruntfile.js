module.exports = function (grunt) {

  //CONFIG
  grunt.initConfig({
    jshint: {
      dist:{
        src: ['js/**/*.js']
      }
    },
    concat: {
      scripts:{
        src: [
          'js/**/*.js',
          'lib/serialGenerator/serialGenerator.js',
          'lib/ui/ui.js'
        ],
        dest: 'dist/js/scripts.js'
      },
      libs: {
        src: [
          'lib/angular/angular.min.js',
          'lib/angular-route/angular-route.min.js',
          'lib/angular-locale-pt-br/angular-locale_pt-br.min.js',
          'lib/angular-messages/angular-messages.min.js'
        ],
        dest: 'dist/js/libs.js'
      }
    },
    uglify: {
      scripts:{
        src:['dist/js/scripts.js'],
        dest: 'dist/js/scripts.min.js'
      }
    },
    cssmin: {
      all: {
        src: [
          'css/app.css',
          'css/ui.css',
          'lib/bootstrap/dist/css/bootstrap.min.css'
        ],
        dest: 'dist/css/styles.min.css'
      }
    }
  });

  //LOAD PLUGINS
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  //TASK REGISTER
  grunt.registerTask('default',['jshint','concat:scripts', 'concat:libs', 'uglify:scripts','cssmin:all']);

};
