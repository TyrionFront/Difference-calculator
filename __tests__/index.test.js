import fs from 'fs';
import genDiff from '../src';

const pathToFileJson1 = '__tests__/__fixtures__/beforeNested.json';
const pathToFileJson2 = '__tests__/__fixtures__/afterNested.json';

const pathToFileYaml1 = '__tests__/__fixtures__/beforeNested.yaml';
const pathToFileYaml2 = '__tests__/__fixtures__/afterNested.yaml';

const pathToFileIni1 = '__tests__/__fixtures__/beforeNested.ini';
const pathToFileIni2 = '__tests__/__fixtures__/afterNested.ini';
const filePathsAndTypes = [
  [pathToFileJson1, pathToFileJson2, '.JSON'],
  [pathToFileYaml1, pathToFileYaml2, '.yaml'],
  [pathToFileIni1, pathToFileIni2, '.ini'],
];

const pathToResultSimpleTree = '__tests__/__fixtures__/simpleTree.txt';
const simpleTreeContent = fs.readFileSync(pathToResultSimpleTree, 'utf-8');

const pathToResultPlain = '__tests__/__fixtures__/plain.txt';
const resultContentPlain = fs.readFileSync(pathToResultPlain, 'utf-8');

const pathToResultJson = '__tests__/__fixtures__/json.txt';
const resultContentJson = fs.readFileSync(pathToResultJson, 'utf-8');
const results = [
  [simpleTreeContent, 'simpleTree'],
  [resultContentPlain, 'plain'],
  [resultContentJson, 'json'],
];

describe.each(results)('genDiff app test', (result, format) => {
  describe.each(filePathsAndTypes)(`Parse two files, find diff and compare with "${format}" output`,
    (path1, path2, fileType) => {
      it(`make it for two ${fileType} files`, () => {
        expect(genDiff(path1, path2, format)).toEqual(result);
      });
    });
});
