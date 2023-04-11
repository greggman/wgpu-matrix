/* a simple copy file because all the ones on npm have 1000+ dependencies. */

/* global require, process */

const fs = require('fs');

const src = process.argv[2];
const dst = process.argv[3];

console.log(src, dst);
fs.copyFileSync(src, dst);
