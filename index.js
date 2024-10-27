function jsonSimilarity(obj1, obj2) {
  const type1 = getType(obj1);
  const type2 = getType(obj2);

  if (type1 !== type2) {
    return 0;
  }

  switch (type1) {
    case 'string':
      return obj1.toLowerCase() === obj2.toLowerCase() ? 1 : 0;
    case 'number':
    case 'boolean':
      return obj1 === obj2 ? 1 : 0;
    case 'null':
      return 1;
    case 'array':
      return arraySimilarity(obj1, obj2);
    case 'object':
      return objectSimilarity(obj1, obj2);
    default:
      return 0;
  }
}

function getType(obj) {
  if (obj === null) return 'null';
  if (Array.isArray(obj)) return 'array';
  return typeof obj;
}

function arraySimilarity(arr1, arr2) {
  let len1 = arr1.length;
  let len2 = arr2.length;
  let maxLength = Math.max(len1, len2);

  let totalSimilarity = 0;
  let arr2Copy = arr2.slice();

  for (let el1 of arr1) {
    let maxSim = 0;
    let maxSimIndex = -1;

    for (let i = 0; i < arr2Copy.length; i++) {
      let sim = jsonSimilarity(el1, arr2Copy[i]);
      if (sim > maxSim) {
        maxSim = sim;
        maxSimIndex = i;
      }
    }

    if (maxSimIndex !== -1) {
      arr2Copy.splice(maxSimIndex, 1);
    }

    totalSimilarity += maxSim;
  }

  return maxLength === 0 ? 1 : totalSimilarity / maxLength;
}

function objectSimilarity(obj1, obj2) {
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  let allKeys = new Set([...keys1, ...keys2]);
  let totalSimilarity = 0;

  for (let key of allKeys) {
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      let sim = jsonSimilarity(obj1[key], obj2[key]);
      totalSimilarity += sim;
    } else {
      totalSimilarity += 0;
    }
  }

  return allKeys.size === 0 ? 1 : totalSimilarity / allKeys.size;
}

/**
* Calculates similarity score per key between two objects.
* @param {Object} targetObj - The target object.
* @param {Object} testObj - The test object to compare with the target.
* @returns {Object} An object mapping each key to its similarity score.
*/
function jsonSimilarityPerKey(targetObj, testObj) {
  const keys = new Set([...Object.keys(targetObj), ...Object.keys(testObj)]);
  const similarityPerKey = {};

  keys.forEach(key => {
    if (targetObj.hasOwnProperty(key) && testObj.hasOwnProperty(key)) {
      similarityPerKey[key] = jsonSimilarity(targetObj[key], testObj[key]);
    } else {
      similarityPerKey[key] = 0;
    }
  });

  return similarityPerKey;
}

/**
* Computes similarity scores per key for lists of target and test objects.
* @param {Array<Object>} targetList - List of target objects.
* @param {Array<Object>} testList - List of test objects.
* @returns {Object} An object mapping each key to its average similarity score.
*/
function batchJsonSimilarityPerKey(targetList, testList) {
  const allKeys = new Set();
  targetList.forEach(obj => Object.keys(obj).forEach(key => allKeys.add(key)));
  testList.forEach(obj => Object.keys(obj).forEach(key => allKeys.add(key)));

  const similaritySums = {};
  const counts = {};

  allKeys.forEach(key => {
    similaritySums[key] = 0;
    counts[key] = 0;
  });

  targetList.forEach(targetObj => {
    testList.forEach(testObj => {
      if (targetObj && testObj) {
        const perKeySimilarity = jsonSimilarityPerKey(targetObj, testObj);
        Object.keys(perKeySimilarity).forEach(key => {
          similaritySums[key] += perKeySimilarity[key];
          counts[key] += 1;
        });
      }
    });
  });

  const averageSimilarityPerKey = {};
  Object.keys(similaritySums).forEach(key => {
    averageSimilarityPerKey[key] = counts[key] ? similaritySums[key] / counts[key] : 0;
  });

  return averageSimilarityPerKey;
}

/**
* Computes the average similarity score between two lists of JSON objects.
* @param {Array<Object>} targetList - List of target JSON objects.
* @param {Array<Object>} testList - List of test JSON objects.
* @returns {Number} The average similarity score between the lists.
*/
function batchJsonSimilarity(targetList, testList) {
  let totalSimilarity = 0;
  let count = 0;

  targetList.forEach(targetObj => {
    testList.forEach(testObj => {
      const sim = jsonSimilarity(targetObj, testObj);
      totalSimilarity += sim;
      count += 1;
    });
  });

  return count > 0 ? totalSimilarity / count : 0;
}

module.exports = {
  jsonSimilarity,
  jsonSimilarityPerKey,
  batchJsonSimilarity,
  batchJsonSimilarityPerKey,
};