import fs from 'fs';
import path from 'path';
import showdown  from 'showdown';
import * as url from 'url';
const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const converter = new showdown.Converter({
  openLinksInNewWindow: true,
  ghCodeBlocks: true,
  simplifiedAutoLink: true,
});

const pkg = JSON.parse(fs.readFileSync(path.join(dirname, '..', '..', 'package.json'), {encoding: 'utf8'}));

function getLicense(pkg) {
  return `@license wgpu-matrix ${pkg.version} Copyright (c) 2023, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/wgpu-matrix for details`;
}

/**
 * Replace %(id)s in strings with values in objects(s)
 *
 * Given a string like `"Hello %(name)s from %(user.country)s"`
 * and an object like `{name:"Joe",user:{country:"USA"}}` would
 * return `"Hello Joe from USA"`.
 *
 * @param {string} str string to do replacements in
 * @param {Object|Object[]} params one or more objects.
 * @returns {string} string with replaced parts
 */
const replaceParams = (function () {
  const replaceParamsRE = /%\(([^)]+)\)s/g;

  return function (str, params) {
    if (!params.length) {
      params = [params];
    }

    return str.replace(replaceParamsRE, function (match, key) {
      const colonNdx = key.indexOf(':');
      if (colonNdx >= 0) {
        /*
        try {
          const args = hanson.parse("{" + key + "}");
          const handlerName = Object.keys(args)[0];
          const handler = replaceHandlers[handlerName];
          if (handler) {
            return handler(args[handlerName]);
          }
          console.error("unknown substitution handler: " + handlerName);
        } catch (e) {
          console.error(e);
          console.error("bad substitution: %(" + key + ")s");
        }
        */
        throw new Error('unsupported');
      } else {
        // handle normal substitutions.
        const keys = key.split('.');
        for (let ii = 0; ii < params.length; ++ii) {
          let obj = params[ii];
          for (let jj = 0; jj < keys.length; ++jj) {
            const key = keys[jj];
            obj = obj[key];
            if (obj === undefined) {
              break;
            }
          }
          if (obj !== undefined) {
            return obj;
          }
        }
      }
      console.error('unknown key: ' + key);
      return '%(' + key + ')s';
    });
  };
}());

const html = converter.makeHtml(fs.readFileSync('README.md', {encoding: 'utf8'}));
const template = fs.readFileSync('build/templates/index.template', {encoding: 'utf8'});
let content = replaceParams(template, {
  content: html,
  license: getLicense(pkg),
  srcFileName: 'README.md',
  title: 'wgpu-matrix, a fast WebGPU math library',
  version: pkg.version,
});
content = content.replace(/href="https:\/\/greggman\.github\.io\/wgpu-matrix\//g, 'href="./');
fs.writeFileSync('index.html', content);


