import _ from 'lodash';

const makeCorrectValue = value => (_.isPlainObject(value) ? '[complex value]' : value);

const propertyValueActions = [
  {
    check: nodeType => nodeType === 'children',
    process: (property, content, func) => func(content, `${property}.`),
  },
  {
    check: nodeType => nodeType === 'changed',
    process: (property, values) => {
      const [oldValue, newValue] = values;
      return `Property ${property} was updated. From ${makeCorrectValue(oldValue)} to ${makeCorrectValue(newValue)}\n`;
    },
  },
  {
    check: nodeType => nodeType === 'added',
    process: (property, values) => {
      const [, newValue] = values;
      return `Property ${property} was added with value ${makeCorrectValue(newValue)}\n`;
    },
  },
  {
    check: nodeType => nodeType === 'deleted',
    process: property => `Property ${property} was removed\n`,
  },
];

const render = (data, propertyName = '') => data.filter(({ type }) => type !== 'unchanged')
  .map((elem) => {
    const { type, name, content } = elem;
    const fullPropertyName = `${propertyName}${name}`;

    const { process } = _.find(propertyValueActions, ({ check }) => check(type));
    return process(fullPropertyName, content, render);
  }).join('');

export default render;
