module.exports = (grunt) ->
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    banner: """/*!
    * <%= pkg.name %> v<%= pkg.version %>
    * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>
    * Licensed under The MIT License
    */

    """
    clean:
      dist: ['dist']
    testem:
      options:
        launch_in_ci: null
      dist:
        options:
          serve_files: [
            'bower_components/angular-1.2.0-rc.3/angular.js'
            'dist/angular-post-message.min.js'
            'bower_components/angular-mocks-1.2.0-rc.3/angular-mocks.js'
            '.tmp/tests/*.js'
          ]
          fail_on_zero_tests: true
          launch_in_dev: ['PhantomJS']
          launch_in_ci: ['PhantomJS']
    coffee:
      dist:
        files:
          'dist/angular-post-message.js': ['src/*.coffee']
    concat:
      options:
        banner: '<%= banner %>'
      dist:
        src: ['dist/angular-post-message.js']
        dest: 'dist/angular-post-message.js'
    uglify:
      options:
        banner: '<%= banner %>'
      dist:
        files:
          'dist/angular-post-message.min.js': ['dist/angular-post-message.js']
  )

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-testem')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.registerTask('default', ['clean:dist', 'coffee:dist', 'concat:dist', 'uglify:dist', 'testem:ci:dist'])
