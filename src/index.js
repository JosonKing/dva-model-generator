'use strict';

const fsJet = require('fs-jetpack');
fsJet.copy(
  '../../data/source.js',
  '../../data/target.js',
  { overwrite: true }
);