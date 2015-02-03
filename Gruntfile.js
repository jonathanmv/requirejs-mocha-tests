'use strict';

module.exports = function (grunt) {


  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '{,*/}*.html',
          'spec/{,*/}*.js',
          'src/{,*/}*.js'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static('.')
            ];
          }
        }
      }
    }
  });

  grunt.registerTask('default', [
    'connect:livereload',
    'watch'
  ]);
};
