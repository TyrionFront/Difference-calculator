import simpleTree from './simpleTree';
import plain from './plain';
import json from './json';

const renders = {
  simpleTree,
  plain,
  json,
};

export default type => renders[type];
