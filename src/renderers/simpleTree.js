import _ from 'lodash';

const space = '    ';
const stringify = (name, data, depth = 0) => {
  const modifiedData = (_.isPlainObject(data) ? _.keys(data)
    .map(key => `\n${space.repeat(depth + 1)}  ${key}: ${data[key]}`)
    : ` ${data}`);
  return `${space.repeat(depth)}${name}:${modifiedData}`;
};

const keyValuesActions = [
  {
    key: 'nested',
    makeStr: (name, content, depth, func) => [`${space.repeat(depth)}  ${name}:`,
      `${func(content, depth + 1)}`],
  },
  {
    key: 'changed',
    makeStr: (name, values, depth) => {
      const [oldValue, newValue] = values;
      return [stringify(`- ${name}`, oldValue, depth),
        stringify(`+ ${name}`, newValue, depth)];
    },
  },
  {
    key: 'unchanged',
    makeStr: (name, values, depth) => {
      const [oldValue] = values;
      return stringify(`  ${name}`, oldValue, depth);
    },
  },
  {
    key: 'added',
    makeStr: (name, values, depth) => {
      const [, newValue] = values;
      return stringify(`+ ${name}`, newValue, depth);
    },
  },
  {
    key: 'deleted',
    makeStr: (name, values, depth) => {
      const [oldValue] = values;
      return stringify(`- ${name}`, oldValue, depth);
    },
  },
];

const render = (data, depth = 0) => _.flatten(data.map((node) => {
  const { type, name, content } = node;
  const { makeStr } = _.find(keyValuesActions, ({ key }) => key === type);
  return makeStr(name, content, depth, render);
})).join('\n');

export default render;
