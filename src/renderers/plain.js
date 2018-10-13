import _ from 'lodash';

const modifyValue = value => (_.isPlainObject(value) ? '[complex value]' : value);

const propertyValueActions = [
  {
    key: 'nested',
    makeStr: (property, content, func) => func(content, `${property}.`),
  },
  {
    key: 'changed',
    makeStr: (property, values) => {
      const [oldValue, newValue] = values;
      return `Property ${property} was updated. From ${modifyValue(oldValue)} to ${modifyValue(newValue)}\n`;
    },
  },
  {
    key: 'added',
    makeStr: (property, values) => {
      const [, newValue] = values;
      return `Property ${property} was added with value ${modifyValue(newValue)}\n`;
    },
  },
  {
    key: 'deleted',
    makeStr: property => `Property ${property} was removed\n`,
  },
];

const render = (data, propertyName = '') => data.filter(({ type }) => type !== 'unchanged')
  .map((elem) => {
    const { type, name, content } = elem;
    const fullPropertyName = `${propertyName}${name}`;

    const { makeStr } = _.find(propertyValueActions, ({ key }) => key === type);
    return makeStr(fullPropertyName, content, render);
  }).join('');

export default render;
