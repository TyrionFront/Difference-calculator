import yaml from 'js-yaml';
import ini from 'ini';

const parserSource = {
  '.json': JSON.parse,

  '.yaml': yaml.safeLoad,

  '.ini': ini.decode,
};

export default type => parserSource[type];
