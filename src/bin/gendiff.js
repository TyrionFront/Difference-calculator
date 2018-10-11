#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';
import { description, version } from '../../package.json';

const defineFormatType = (type) => {
  if (['simpleTree', 'plain', 'json'].includes(type)) { return type; }

  console.log('\nDefault format "simpleTree" is used. Enter correct format name, please\n');
  return 'simpleTree';
};

program
  .version(`${version}`, '-V, --version')
  .arguments('<firstConfig> <secondConfig>')
  .description(`${description}`)
  .option('-f, --format [type]', `Output format:
  "simpleTree" - shows diff as a tree;
  "plain" - shows diff as a list;
  "json" - shows diff as a JSON string`, defineFormatType, 'simpleTree')
  .action((firstConfig, secondConfig) => {
    console.log(genDiff(firstConfig, secondConfig, program.format));
  });

program.parse(process.argv);
