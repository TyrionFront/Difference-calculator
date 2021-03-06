import _ from 'lodash';


const nodeTypesActions = [
  {
    type: 'nested',
    check: (oldFile, newFile, key) => (_.has(oldFile, key) && _.has(newFile, key))
      && (_.isPlainObject(oldFile[key]) && _.isPlainObject(newFile[key])),
    process: (value1, value2, fun) => fun(value1, value2),
  },
  {
    type: 'changed',
    check: (oldFile, newFile, key) => (_.has(oldFile, key) && _.has(newFile, key))
      && oldFile[key] !== newFile[key],
    process: (value1, value2) => ({ oldValue: value1, newValue: value2 }),
  },
  {
    type: 'unchanged',
    check: (oldFile, newFile, key) => oldFile[key] === newFile[key],
    process: value => ({ oldValue: value }),
  },
  {
    type: 'added',
    check: (oldFile, newFile, key) => !_.has(oldFile, key) && _.has(newFile, key),
    process: (value1, value2) => ({ newValue: value2 }),
  },
  {
    type: 'deleted',
    check: (oldFile, newFile, key) => _.has(oldFile, key) && !_.has(newFile, key),
    process: value => ({ oldValue: value }),
  },
];

const makeAst = (oldFile, newFile) => {
  const unitedKeys = _.union(_.keys(oldFile), _.keys(newFile));
  return unitedKeys.map((key) => {
    const { type, process } = _.find(nodeTypesActions, elem => elem.check(oldFile, newFile, key));
    const content = process(oldFile[key], newFile[key], makeAst);

    return { type, name: key, content };
  });
};

export default makeAst;
