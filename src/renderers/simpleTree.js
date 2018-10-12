import _ from 'lodash';

const makeCorrectValue = value => (_.isPlainObject(value) ? _.keys(value)
  .map(k => [`  ${k}`, value[k]]) : value);

const keyValuesActions = [
  {
    check: nodeType => nodeType === 'children',
    process: (key, content, func) => [[`  ${key}`, func(content)]],
  },
  {
    check: nodeType => nodeType === 'unchanged',
    process: (key, values) => {
      const [oldValue] = values;
      return [[`  ${key}`, makeCorrectValue(oldValue)]];
    },
  },
  {
    check: nodeType => nodeType === 'changed',
    process: (key, values) => {
      const [oldValue, newValue] = values;
      return [[`- ${key}`, makeCorrectValue(oldValue)],
        [`+ ${key}`, makeCorrectValue(newValue)]];
    },
  },
  {
    check: nodeType => nodeType === 'added',
    process: (key, values) => {
      const [, newValue] = values;
      return [[`+ ${key}`, makeCorrectValue(newValue)]];
    },
  },
  {
    check: nodeType => nodeType === 'deleted',
    process: (key, values) => {
      const [oldValue] = values;
      return [[`- ${key}`, makeCorrectValue(oldValue)]];
    },
  },
];

const makeArrTree = tree => _.flatten(tree.map((node) => {
  const { type, name, content } = node;
  const { process } = _.find(keyValuesActions, ({ check }) => check(type));
  return process(name, content, makeArrTree);
}));

const stringify = (tree, depth = 0) => tree
  .map((node) => {
    const space = '    '.repeat(depth);
    const [key, value] = node;
    return _.isArray(value) ? `${space}${key}:\n${stringify(value, depth + 1).join('\n')}`
      : `${space}${key}: ${value}`;
  });

const render = (data) => {
  const arrTree = makeArrTree(data);
  return stringify(arrTree).join('\n');
};
export default render;
