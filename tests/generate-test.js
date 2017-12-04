'use strict';
const maojian = require('../node_modules/maojian');
const crypto = require('crypto');

const NUMBER_OF_DATASETS = 100000;

const generateHash = (text) => {
  const createHash = crypto.createHash('sha256');
  return createHash.update(text.toString()).digest('hex').substr(0, 2);
};

const datasets = new Array(NUMBER_OF_DATASETS);
const generateObjects = () => {
  let i;
  for (i = 0; i < NUMBER_OF_DATASETS; i++) {
    datasets[i] = new Buffer.from(
      JSON.stringify({
        number: i,
        hashOfNumber: generateHash(i),
        isEvenNumber: !(i % 2)
      }));
  }
  maojian.speed('Performance tests', 100, [
    inMap,
    inArray,
    inObject,
    inSet
  ]);
};

function inObject() {
  const obj = {};
  let i;
  for (i = 0; i < NUMBER_OF_DATASETS; i++) {
    obj[i] = datasets[i];
  }
  return obj;
}

function inArray() {
  const array = [];
  let i;
  for (i = 0; i < NUMBER_OF_DATASETS; i++) {
    array[i] = datasets[i];
  }
  return array;
}

function inMap() {
  const map = new Map();
  let i;
  for (i = 0; i < NUMBER_OF_DATASETS; i++) {
    map.set(i, datasets[i]);
  }
  return map;
}

function inSet() {
  const set = new Set();
  let i;
  for (i = 0; i < NUMBER_OF_DATASETS; i++) {
    set.add(datasets[i]);
  }
  return set;
}

generateObjects();

module.exports = {
  inMap,
  inArray,
  inObject,
  inSet
};
