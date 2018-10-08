import fs from 'fs';
import genDiff from '../src';

const pathToFileJson1 = '__tests__/__fixtures__/before.json';
const pathToFileJson2 = '__tests__/__fixtures__/after.json';

const pathToFileYaml1 = '__tests__/__fixtures__/before.yaml';
const pathToFileYaml2 = '__tests__/__fixtures__/after.yaml';

const pathToFileIni1 = '__tests__/__fixtures__/before.ini';
const pathToFileIni2 = '__tests__/__fixtures__/after.ini';
const filePathsAndTypes = [
  [pathToFileJson1, pathToFileJson2, '.JSON'],
  [pathToFileYaml1, pathToFileYaml2, '.yaml'],
  [pathToFileIni1, pathToFileIni2, '.ini'],
];

const pathToResult = '__tests__/__fixtures__/difference.txt';

describe.each(filePathsAndTypes)('Parse two files, find diff and compare with correct difference output',
  (path1, path2, fileType) => {
    const resultContent = fs.readFileSync(pathToResult, 'utf-8');
    it(`make it for two ${fileType} files`, () => {
      expect(genDiff(path1, path2)).toEqual(resultContent);
    });
  });
