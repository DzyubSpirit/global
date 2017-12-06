'use strict';

const { mainMap, bufferMap, createIndex, generateHash } = require('./generate');

const searchObject = {
  number: 2,
  hashOfNumber: generateHash(2),
  isEvenNumber: true
};

const findObjectByIndex = (searchObject) => {
  const index = createIndex(searchObject);
  const resultBuffer = mainMap.get(index);
  return resultBuffer;
};

const findObjectByObjectFields = (searchObject) => {
  for (let [_, obj] of mainMap) {
    let foundAll = true;
    for (const key in searchObject) {
      if (obj[key] !== searchObject[key]) {
        foundAll = false;
        break;
      }
      if (foundAll) return bufferMap.get(obj);
    }
  }
  return null;
};

