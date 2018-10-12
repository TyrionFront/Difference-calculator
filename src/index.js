import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import makeAst from './ast';
import getRender from './renderers';

export default (data1, data2, outputType) => {
  const dataType1 = path.extname(data1);
  const dataType2 = path.extname(data2);

  const content1 = fs.readFileSync(data1, 'utf-8');
  const content2 = fs.readFileSync(data2, 'utf-8');

  const parsedData1 = getParser(dataType1)(content1);
  const parsedData2 = getParser(dataType2)(content2);

  const ast = makeAst(parsedData1, parsedData2);
  const render = getRender(outputType);

  return render(ast);
};

// const f1 = '__tests__/__fixtures__/json.txt';
// const f2 = '__tests__/__fixtures__/after.yaml';

// console.log(make(f1, f2));
