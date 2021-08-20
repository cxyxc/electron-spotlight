import Path from 'path';
import fs from 'fs';
import setupDefaultPaths from './historyPaths';

const CHROME = 'Google Chrome';
const FIREFOX = 'Mozilla Firefox';
const TORCH = 'Torch';
const OPERA = 'Opera';
const SEAMONKEY = 'SeaMonkey';
const VIVALDI = 'Vivaldi';
const SAFARI = 'Safari';
const MAXTHON = 'Maxthon';
const EDGE = 'Microsoft Edge';
const BRAVE = 'Brave';
const AVAST = 'AVAST Browser';

const browserDbLocations = {
  chrome: '',
  firefox: '',
  opera: '',
  edge: '',
  torch: '',
  seamonkey: '',
  vivaldi: '',
  maxthon: '',
  safari: '',
  brave: '',
  avast: '',
};

const defaultPaths = {
  chrome: '',
  firefox: '',
  opera: '',
  edge: '',
  torch: '',
  seamonkey: '',
  vivaldi: '',
  maxthon: '',
  safari: '',
  brave: '',
  avast: '',
};

setupDefaultPaths(defaultPaths);

/**
 * Find all files recursively in specific folder with specific extension, e.g:
 * findFilesInDir('./project/src', '.html') ==> ['./project/src/a.html','./project/src/build/index.html']
 * @param  {String} startPath    Path relative to this file or other file which requires this files
 * @param  {String} filter       Extension name, e.g: '.html'
 * @param targetFile
 * @param depth
 * @return {Array}               Result files with path string in an array
 */
function findFilesInDir(
  startPath: string,
  filter: string,
  targetFile: string,
  depth = 0
): Array<any> {
  if (depth === 4) {
    return [];
  }
  let results: Array<any> = [];
  if (!fs.existsSync(startPath)) {
    return results;
  }
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i += 1) {
    const filename = Path.join(startPath, files[i]);
    if (fs.existsSync(filename)) {
      const stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        results = results.concat(
          findFilesInDir(filename, filter, targetFile, depth + 1)
        );
      } else if (filename.endsWith(targetFile) === true) {
        results.push(filename);
      }
    }
  }
  return results;
}

/**
 * Finds the path to the browsers DB file.
 * Returns an array of strings, paths, or an empty array
 * @param path
 * @param browserName
 * @returns {Array}
 */
function findPaths(path: string, browserName: string): Array<any> {
  switch (browserName) {
    case FIREFOX:
    case SEAMONKEY:
      return findFilesInDir(path, '.sqlite', `${Path.sep}places.sqlite`);
    case CHROME:
    case TORCH:
    case OPERA:
    case BRAVE:
    case VIVALDI:
    case EDGE:
    case AVAST:
      return findFilesInDir(path, 'History', `${Path.sep}History`);
    case SAFARI:
      return findFilesInDir(path, '.db', `${Path.sep}History.db`);
    case MAXTHON:
      return findFilesInDir(path, '.dat', `${Path.sep}History.dat`);
    default:
      return [];
  }
}

export default {
  findPaths,
  browserDbLocations,
  defaultPaths,
  CHROME,
  FIREFOX,
  TORCH,
  OPERA,
  SEAMONKEY,
  VIVALDI,
  SAFARI,
  MAXTHON,
  BRAVE,
  EDGE,
  AVAST,
};
