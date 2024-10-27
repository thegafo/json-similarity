// Example usage:

const {
  jsonSimilarity,
  jsonSimilarityPerKey,
  batchJsonSimilarity,
  batchJsonSimilarityPerKey
} = require(".");

const obj1 = {
  name: "John",
  age: 30,
  hobbies: {
    reading: true,
    swimming: false
  }
};

const obj2 = {
  name: "john",
  age: 31,
  hobbies: {
    reading: false,
    swimming: false,
  }
};

const similarityScore = jsonSimilarity(obj1, obj2);
console.log(`Similarity Score: ${similarityScore}`);

// Similarity Score Per Key
const similarityPerKey = jsonSimilarityPerKey(obj1, obj2);
console.log('Similarity Per Key:', similarityPerKey);
// Output:
// Similarity Per Key: { name: 1, age: 0, hobbies: 0.6666666666666666 }

// Method 2: Batch Similarity Score Per Key
const targetList = [
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "London" },
];

const testList = [
  { name: "alice", age: 25, city: "new york" },
  { name: "bob", age: 31, city: "london" },
];

const batchSimilarityPerKey = batchJsonSimilarityPerKey(targetList, testList);
console.log('Batch Similarity Per Key:', batchSimilarityPerKey);
// Output:
// Batch Similarity Per Key: { name: 1, age: 0.75, city: 1 }


// Method 3: Batch JSON Similarity
const batchSimilarity = batchJsonSimilarity(targetList, testList);
console.log('Batch Similarity:', batchSimilarity);
// Output:
// Batch Similarity: 0.9166666666666666
