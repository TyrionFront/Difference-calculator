import yaml from 'js-yaml';
import ini from 'ini';
import DataErrors from './DataErrors';

const parserSource = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.decode,
};

export default (type) => {
  if (!parserSource[type]) {
    throw new DataErrors(type);
  }
  return parserSource[type];
};
