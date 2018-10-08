import yaml from 'js-yaml';
import ini from 'ini';

const parserSource = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.decode,
};

export default (type) => {
  if (parserSource[type]) {
    return parserSource[type];
  }
  console.log('Wrong file type. The following result is incorrect\n');
  return () => {};
};
