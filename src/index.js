import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parsers';
import DataErrors from './DataErrors';


export default (data1, data2) => {
  const dataType1 = path.extname(data1);
  const dataType2 = path.extname(data2);

  const content1 = fs.readFileSync(data1, 'utf-8');
  const content2 = fs.readFileSync(data2, 'utf-8');

  try {
    const parsedData1 = getParser(dataType1)(content1);
    const parsedData2 = getParser(dataType2)(content2);

    const unitedKeys = _.union(_.keys(parsedData1), _.keys(parsedData2));
    const dataDifference = unitedKeys.map((key) => {
      if (_.has(parsedData1, key) && _.has(parsedData2, key)) {
        if (parsedData1[key] === parsedData2[key]) {
          return `${[`  ${key}`]}: ${parsedData2[key]}`;
        }
        return `${[`+ ${key}`]}: ${parsedData2[key]}\n${[`- ${key}`]}: ${parsedData1[key]}`;
      }

      if (_.has(parsedData2, key)) {
        return `${[`+ ${key}`]}: ${parsedData2[key]}`;
      }
      return `${[`- ${key}`]}: ${parsedData1[key]}`;
    }, {});

    return dataDifference.join('\n');
  } catch (err) {
    if (err instanceof DataErrors) {
      console.log(err.message);
    }
    throw err;
  }
};

// const f1 = '__tests__/__fixtures__/json.txt';
// const f2 = '__tests__/__fixtures__/after.yaml';

// console.log(make(f1, f2));
