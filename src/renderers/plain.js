import _ from 'lodash';

const modifyValue = value => (_.isPlainObject(value) ? '[complex value]' : value);

const propertyValueActions = {
  nested: (property, content, func) => func(content, `${property}.`),

  changed: (property, values) => {
    const { oldValue, newValue } = values;
    return `Property ${property} was updated. From ${modifyValue(oldValue)} to ${modifyValue(newValue)}`;
  },

  added: (property, values) => {
    const { newValue } = values;
    return `Property ${property} was added with value ${modifyValue(newValue)}`;
  },

  deleted: property => `Property ${property} was removed`,
};

const render = (data, propertyName = '') => data.filter(({ type }) => type !== 'unchanged')
  .map((elem) => {
    const { type, name, content } = elem;
    const fullPropertyName = `${propertyName}${name}`;

    return propertyValueActions[type](fullPropertyName, content, render);
  }).join('\n');

export default render;
