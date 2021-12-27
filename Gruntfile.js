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

const replaceHandlers = {};
function registerReplaceHandler(keyword, handler) {  // eslint-disable-line
  replaceHandlers[keyword] = handler;
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

  grunt.registerTask('tsmunge', function() {
    // Fix up syntax and content issues with the auto-generated
    // TypeScript definitions.
    let content = fs.readFileSync(`dist/${verDir}/types.d.ts`, {encoding: 'utf8'});
    // Remove docstrings (Declarations do not by convention include these)
    content = content.replace(/\/\*\*[\s\S]*?\*\/\s*/g, '');
    // Docs use "?" to represent an arbitrary type; TS uses "any"
    content = content.replace(/\]: \?/g, ']: any');
    // Docs use "constructor"; TS expects something more like "Function"
    content = content.replace(/: constructor/g, ': Function');
    // What docs call an "augmentedTypedArray" is technically an "ArrayBufferView"
    // albeit with a patched-in "push" method.
    content = content.replace(/\bAugmentedTypedArray\b/g, 'ArrayBufferView');
    // Remove every instance of "module:twgl" and "module:twgl/whatever"
    // Except for "module:twgl.(m4|v3|primitives)" which become just "m4.", etc.
    content = content.replace(/module:twgl(\/(m4|v3|primitives))\./g, '$2.');
    content = content.replace(/module:twgl(\/\w+)?\./g, '');
    // Replace "function", "type" declarations with "export function", "export type"
    content = content.replace(/^(\s*)(function|type) /mg, '$1export $2 ');

    // hack for AttachmentOptions. Should really try to fix tsd-jsdoc to handle @mixins
    content = content.replace('export type AttachmentOptions = {', 'export type AttachmentOptions = TextureOptions & {');

    // Break the file down into a list of modules
    const modules = content.match(/^declare module twgl(\/(\w+))? \{[\s\S]*?^\}/mg);
    // Split into core modules and extra (only in twgl-full) modules
    const coreModules = modules.filter(
      (code) => !code.match(/^declare module twgl\/(m4|v3|primitives)/)
    );
    const extraModules = modules.filter(
      (code) => code.match(/^declare module twgl\/(m4|v3|primitives)/)
    );
    // Build code for the core twgl.js output
    const coreContent = coreModules.map((code) => {
      // Get rid of "declare module twgl/whatever" scope
      code = code.replace(/^declare module twgl(\/\w+)? \{([\s\S]*?)^\}/mg, '$2');
      // De-indent the contents of that scope
      code = code.replace(/^ {4}/mg, '');
      // All done
      return code;
    }).join('\n');
    // Build additional code for the extended twgl-full.js output
    const extraContent = extraModules.map((code) => {
      // Fix "declare module twgl/whatever" statements
      return code.replace(/^declare module twgl(\/(\w+))? \{/m,
        'declare module $2 {'
      );
    }).join('\n');
    // Write twgl-full declarations to destination file
    const fullContent = [coreContent, extraContent].join('\n');
    fs.writeFileSync(`dist/${verDir}/twgl-full.d.ts`, fullContent);
    // Write core declarations to destination file
    fs.writeFileSync(`dist/${verDir}/twgl.d.ts`, coreContent);
    // Remove the auto-generated input file
    fs.unlinkSync(`dist/${verDir}/types.d.ts`);
  });

  grunt.registerTask('docs', [
      'eslint:examples',
      'clean:docs',
      'jsdoc:docs',
      //'makeindex',
  ]);
  grunt.registerTask('buildts', [
      'jsdoc:ts',
      'tsmunge',
  ]);
  grunt.registerTask('build', [
      'eslint:lib',
      'clean:dist',
      'rollup',
      //'buildts',
      //'ts',
      'docs',
  ]);
  grunt.registerTask('default', 'build');
};

