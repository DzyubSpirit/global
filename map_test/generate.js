'use strict';

const crypto = require('crypto');

const NUMBER_OF_DATASETS = 100000;

const mainMap = new Map();
const bufferMap = new WeakMap();

const generateHash = (text) => {
  const createHash = crypto.createHash('sha256');
  return createHash.update(text.toString()).digest('hex').substr(0, 2);
};

const createIndex = obj => (
  [obj.number, obj.hashOfNumber, obj.isEvenNumber].join('|')
);

const generateMaps = () => {
  let i;
  for (i = 0; i < NUMBER_OF_DATASETS; i++) {
    const obj = {
      number: i,
      hashOfNumber: generateHash(i),
      isEvenNumber: !(i % 2)
    };
    const index = createIndex(obj);
    const buffer = new Buffer.from(JSON.stringify(obj));

    mainMap.set(index, obj);
    bufferMap.set(mainMap.get(index), buffer);
  }
};
generateMaps();

module.exports = {
  mainMap,
  bufferMap,
  generateHash,
  createIndex
};
