import _ from 'lodash';


const nodeTypesActions = [
  {
    type: 'children',
    check: (oldFile, newFile, key) => (_.has(oldFile, key) && _.has(newFile, key))
      && (_.isPlainObject(oldFile[key]) && _.isPlainObject(newFile[key])),
    process: (value1, value2, fun) => fun(value1, value2),
  },
  {
    type: 'unchanged',
    check: (oldFile, newFile, key) => oldFile[key] === newFile[key],
    process: value => [value],
  },
  {
    type: 'changed',
    check: (oldFile, newFile, key) => (_.has(oldFile, key) && _.has(newFile, key))
      && oldFile[key] !== newFile[key],
    process: (value1, value2) => [value1, value2],
  },
  {
    type: 'added',
    check: (oldFile, newFile, key) => !_.has(oldFile, key) && _.has(newFile, key),
    process: (value1, value2) => [value1, value2],
  },
  {
    type: 'deleted',
    check: (oldFile, newFile, key) => _.has(oldFile, key) && !_.has(newFile, key),
    process: value => [value],
  },
];

const makeAst = (oldFile, newFile) => {
  const unitedKeys = _.union(_.keys(oldFile), _.keys(newFile));
  return unitedKeys.map((key) => {
    const { type, process } = _.find(nodeTypesActions, elem => elem.check(oldFile, newFile, key));
    const content = process(oldFile[key], newFile[key], makeAst);

    return { name: key, content, type };
  });
};

export default makeAst;
