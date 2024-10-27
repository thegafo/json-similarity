# JSON Sim

A Node.js module to compute the similarity score between two JSON objects, outputting a score between 0 and 1. The comparison is recursive, case-insensitive for strings, and order-insensitive for arrays.

## Features

- **Recursive Comparison**: Deeply compares nested JSON objects and arrays.
- **Case-Insensitive Strings**: Strings are converted to lowercase before comparison.
- **Order-Insensitive Arrays**: Arrays are treated as sets; the order of elements doesn't affect the similarity score.
- **No dependencies**: No additional dependencies needed.

## Installation

Install the package via npm:

```bash
npm install json-sim
```

## Usage

```javascript
const {
  jsonSimilarity,
  jsonSimilarityPerKey,
  batchJsonSimilarityPerKey,
  batchJsonSimilarity,
} = require("json-sim");
```

### Compute Similarity Between Two Objects

```javascript
const obj1 = {
  name: "John",
  age: 30,
  hobbies: ["Reading", "Swimming"],
};

const obj2 = {
  name: "john",
  age: 30,
  hobbies: ["swimming", "reading"],
};

const similarityScore = jsonSimilarity(obj1, obj2);
console.log(`Similarity Score: ${similarityScore}`); // Output: Similarity Score: 1
```

### Compute Similarity Score Per Key

```javascript
const targetObj = { name: "Alice", age: 25 };
const testObj = { name: "alice", age: 24 };

const similarityPerKey = jsonSimilarityPerKey(targetObj, testObj);
console.log("Similarity Per Key:", similarityPerKey);
// Output: { name: 1, age: 0 }
```

### Compute Batch Similarity Score Per Key

```javascript
const targetList = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];
const testList = [
  { name: "alice", age: 25 },
  { name: "bob", age: 31 },
];

const batchSimilarityPerKey = batchJsonSimilarityPerKey(targetList, testList);
console.log("Batch Similarity Per Key:", batchSimilarityPerKey);
// Output: { name: 1, age: 0.75 }
```

### Compute Batch Similarity

```javascript
const targetList = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];
const testList = [
  { name: "alice", age: 25 },
  { name: "bob", age: 31 },
];

const batchSimilarity = batchJsonSimilarity(targetList, testList);
console.log("Batch Similarity:", batchSimilarity);
// Output: 0.916...
```

## Command-Line Usage

After installing the package globally, you can use the `json-sim` command:

```bash
npm install -g json-sim

json-sim file1.json file2.json
```

## Using `npx`

Alternatively, you can use npx to run the command without installing it globally:

```bash
npx json-sim file1.json file2.json
```

## API

### `jsonSimilarity(obj1, obj2)`

Computes the similarity score between two JSON objects.

- **Parameters:**

  - `obj1` _(Object)_: The first JSON object.
  - `obj2` _(Object)_: The second JSON object.

- **Returns:**
  - _(Number)_: A similarity score between 0 and 1.

## How It Works

- **Primitive Types:** Compares numbers and booleans directly. For strings, it compares them in lowercase to ensure case insensitivity.
- **Arrays:** Finds the best match for each element in one array with the elements in the other array, summing up the maximum similarities.
- **Objects:** Collects all keys from both objects and recursively computes the similarity for each key that exists in both objects.

### `jsonSimilarityPerKey(targetObj, testObj)`

Calculates the similarity score for each key between a target object and its test pair.

- **Parameters:**

  - `targetObj` _(Object)_: The target JSON object.
  - `testObj` _(Object)_: The test JSON object to compare with the target.

- **Returns:**
  - _(Object)_: An object mapping each key to its similarity score.

### `batchJsonSimilarityPerKey(targetList, testList)`

Computes the average similarity score per key over lists of target and test objects.

- **Parameters:**

  - `targetList` _(Array\<Object\>)_: List of target JSON objects.
  - `testList` _(Array\<Object\>)_: List of test JSON objects.

- **Returns:**
  - _(Object)_: An object mapping each key to its average similarity score.

### `batchJsonSimilarity(targetList, testList)`

Computes the average similarity score between two lists of JSON objects.

- **Parameters:**

  - `targetList` _(Array\<Object\>)_: List of target JSON objects.
  - `testList` _(Array\<Object\>)_: List of test JSON objects.

- **Returns:**
  - _(Number)_: The average similarity score between the lists.

## Examples

### Comparing Nested Objects

```javascript
const obj1 = {
  user: {
    name: "Alice",
    details: {
      email: "alice@example.com",
      preferences: ["News", "Updates"],
    },
  },
};

const obj2 = {
  user: {
    name: "alice",
    details: {
      email: "ALICE@EXAMPLE.COM",
      preferences: ["updates", "news"],
    },
  },
};

const similarityScore = jsonSimilarity(obj1, obj2);
console.log(`Similarity Score: ${similarityScore}`); // Output: Similarity Score: 1
```

### Comparing Arrays with Different Lengths

```javascript
const arr1 = ["Apple", "Banana", "Cherry"];
const arr2 = ["banana", "apple"];

const similarityScore = jsonSimilarity(arr1, arr2);
console.log(`Similarity Score: ${similarityScore}`); // Output: Similarity Score: 0.666...
```

## Contributing

Contributions are welcome! Please submit an issue or pull request on the GitHub repository.

---

Feel free to integrate this package into your project. For any issues or feature requests, please open an issue on [GitHub](https://github.com/thegafo/json-sim).
