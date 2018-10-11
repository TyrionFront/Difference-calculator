import _ from 'lodash';

const makeCorrectValue = value => (_.isPlainObject(value) ? '[complex value]' : value);

const propertyValueActions = [
  {
    check: nodeType => nodeType === 'changed',
    process: (property, value2, value1) => `Property ${property} was updated. From ${makeCorrectValue(value1)} to ${makeCorrectValue(value2)}\n`,
  },
  {
    check: nodeType => nodeType === 'added',
    process: (property, value) => `Property ${property} was added with value ${makeCorrectValue(value)}\n`,
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
    if (type === 'children') { return render(content, `${fullPropertyName}.`); }

    const { process } = _.find(propertyValueActions, ({ check }) => check(type));
    if (type === 'changed') {
      const [oldValue, newValue] = content;
      return process(fullPropertyName, newValue, oldValue);
    }
    return process(fullPropertyName, content);
  }).join('');

export default render;

// const propertyValueActions = [
//   {
//     check: nodeType => nodeType === 'children',
//     process: (property, content, func) => func(content, `${property}.`),
//   },
//   {
//     check: nodeType => nodeType === 'changed',
//     process: (property, values) => {
//       const [oldValue, newValue] = values;
//       return `Property ${property} was updated.`
//         ` From ${makeCorrectValue(oldValue)} to ${makeCorrectValue(newValue)}\n`;
//     },
//   },
//   {
//     check: nodeType => nodeType === 'added',
//     process: (property, values) => {
//       const [, newValue] = values;
//       return `Property ${property} was added with value ${makeCorrectValue(newValue)}\n`;
//     },
//   },
//   {
//     check: nodeType => nodeType === 'deleted',
//     process: property => `Property ${property} was removed\n`,
//   },
// ];

// const render = (data, propertyName = '') => data.filter(({ type }) => type !== 'unchanged')
//   .map((elem) => {
//     const { type, name, content } = elem;
//     const fullPropertyName = `${propertyName}${name}`;

//     const { process } = _.find(propertyValueActions, ({ check }) => check(type));
//     return process(fullPropertyName, content, render);
//   }).join('');
