<h1>Configs difference calculator (gendiff)</h1>

**Project is made during studying web-dev on [Hexlet](https://ru.hexlet.io/?ref=50614).**

[![Maintainability](https://api.codeclimate.com/v1/badges/7fdf8101f14ac642b01e/maintainability)](https://codeclimate.com/github/TyrionFront/Difference-calculator/maintainability)
[![Build Status](https://travis-ci.org/TyrionFront/Difference-calculator.svg?branch=master)](https://travis-ci.org/TyrionFront/Difference-calculator)
[![codecov](https://codecov.io/gh/TyrionFront/Difference-calculator/branch/master/graph/badge.svg)](https://codecov.io/gh/TyrionFront/Difference-calculator)

**gendiff** is a command-line cli-util that allows You to compare two config-files (.ini, .yaml or .JSON) and display the calculated difference between them in "simpleTree", "plain" or "JSON" format. "Simple-tree" output format is a default one for those cases when You input an incorrect displaying format which **gendiff** doesn't support.  

<h2>Usage</h2>  

In your command-line just type _gendiff -f(--format)[prefered output format] path_to_file1 path_to_file2_.  

<h2>Options</h2>  

    -h, --help           output usage information
    -V, --version        output the version number
    -f, --format [type]  Output format

<h2>Prerequisites</h2>

To be able to install & run **gendiff** the [npm](https://www.npmjs.com/get-npm) must be installed on your computer.

<h2>Installation</h2>

```$ npm install -g calcconfigdiff```

To see how it all works You can watch the short video below:

**Demo**
[![asciicast](https://asciinema.org/a/DtwITymREBy6kOOsr1SRi9cNs.png)](https://asciinema.org/a/DtwITymREBy6kOOsr1SRi9cNs)
