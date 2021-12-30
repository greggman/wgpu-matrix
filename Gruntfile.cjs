/* eslint-env node */
/* eslint no-console: "off" */
/* eslint quotes: ["error", "single"] */

const path   = require('path');
const fs     = require('fs');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), {encoding: 'utf8'}));
const verDir  = /^(\d+\.)/.exec(pkg.version)[1] + 'x';

function getLicense(pkg) {
  return `@license wgpu-matrix.js ${pkg.version} Copyright (c) 2022, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/wgpu-matrix.js for details`;
}

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  const srcFiles = [
    'src/mat3.js',
    'src/mat4.js',
    'src/utils.js',
    'src/vec2.js',
    'src/vec3.js',
    'src/vec4.js',
    'src/wgpu-matrix.js',
  ];

  const docsFiles = srcFiles.concat('README.md');

  grunt.initConfig({
    jsdoc: {
      docs: {
        src: docsFiles,
        options: {
          destination: 'docs',
          configure: 'build/jsdoc.conf.json',
          template: './build/jsdoc-template',
          outputSourceFiles: false,
        },
      },
      ts: {
        src: srcFiles,
        options: {
          destination: `dist/${verDir}`,
          configure: 'build/jsdoc.conf.json',
          template: './node_modules/tsd-jsdoc/dist',
          outputSourceFiles: false,
        },
      },
    },
    rollup: {
      options: {
        plugins: [
        ],
        format: 'es',
        indent: '  ',
        banner: () => `/* ${getLicense(pkg)} */`,
      },
      files: {
        src: 'src/wgpu-matrix.js',
        dest: `dist/${verDir}/wgpu-matrix.module.js`,
      },
    },
    eslint: {
      lib: {
        src: [
          'src/*',
          'test/**/*.js',
          '!test/mocha.js',
          '!test/src/ts/**',
        ],
        options: {
          //configFile: 'build/conf/eslint.json',
          //rulesdir: ['build/rules'],
        },
      },
      examples: {
        src: [
          'examples/*.html',
          'examples/js',
        ],
        options: {
          //configFile: 'build/conf/eslint-docs.json',
          //rulesdir: ['build/rules'],
        },
      },
    },
    clean: {
      dist: [ `dist/${verDir}` ],
      docs: [ 'docs' ],
    },
    ts: {
      example: {
        src: ['examples/*.ts'],
        options: {
          module: 'umd',
        },
      },
    },
  });

  grunt.registerTask('docs', [
      'eslint:examples',
      'clean:docs',
      'jsdoc:docs',
  ]);
  grunt.registerTask('buildts', [
      'jsdoc:ts',
  ]);
  grunt.registerTask('build', [
      'eslint:lib',
      'clean:dist',
      'rollup',
      'buildts',
      //'ts',
      'docs',
  ]);
  grunt.registerTask('default', 'build');
};

