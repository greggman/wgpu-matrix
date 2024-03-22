import fs from 'fs';
import path from 'path';
import * as url from 'url';
const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const ignoreFilename = path.join(dirname, '..', '..', '.gitignore');
const ignore = fs.readFileSync(ignoreFilename, {encoding: 'utf8'});
const newIgnore = ignore.replace(/# -- clip-for-deploy-start --[\s\S]*?# -- clip-for-deploy-end --/, '');
fs.writeFileSync(ignoreFilename, newIgnore);
