import _ from 'lodash';

const render = data => data.map((node) => {
  const { type, name, content } = node;
  if (type === 'nested') { return { type, name, content: render(content) }; }
  if (type === 'added') {
    const [, newValue] = content;
    return { type, name, content: [newValue] };
  }
  return { type, name, content };
});

export default ast => JSON.stringify(render(ast), null, 2);
