// Example usage:

const jsonSimilarity = require(".").default;

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
