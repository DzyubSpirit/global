'use strict';

const { mainMap, bufferMap, createIndex, generateHash } = require('./generate');

const searchObject = {
  number: 2,
  hashOfNumber: generateHash(2),
  isEvenNumber: true
};

const findObjectByIndex = (searchObject) => {
  let resultBuffer;
  const index = createIndex(searchObject);
  mainMap.forEach((obj, key) => {
    if (key === index) resultBuffer = bufferMap.get(obj);
  });
  return resultBuffer;
};

const findObjectByObjectFields = (searchObject) => {
  let resultBuffer;
  let foundAll = true;

  mainMap.forEach((obj) => {
    for (const key in searchObject) {
      if (obj[key] !== searchObject[key]) {
        foundAll = false;
        break;
      }
      if (foundAll) resultBuffer = bufferMap.get(obj);
      foundAll = true;
    }
  });
  return resultBuffer;
};

