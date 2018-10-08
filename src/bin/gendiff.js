#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((path1, path2) => console.log(genDiff(path1, path2)));

program.parse(process.argv);
