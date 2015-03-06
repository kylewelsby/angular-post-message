(function() {
  module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      banner: "/*!\n* <%= pkg.name %> v<%= pkg.version %>\n* Copyright <%= grunt.template.today(\"yyyy\") %> <%= pkg.author %>\n* Licensed under The MIT License\n*/\n",
      clean: {
        dist: ['dist']
      },
      concat: {
        options: {
          banner: '<%= banner %>'
        },
        dist: {
          src: ['src/*.js'],
          dest: 'dist/angular-post-message.js'
        }
      },
      uglify: {
        options: {
          banner: '<%= banner %>'
        },
        dist: {
          files: {
            'dist/angular-post-message.min.js': ['dist/angular-post-message.js']
          }
        }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    return grunt.registerTask('default', ['clean:dist', 'concat:dist', 'uglify:dist']);
  };

}).call(this);
