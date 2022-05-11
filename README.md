# mern-server
MongoDB Express React Node

Servidor Express js - Mongo DB using warehouse.js

## To Do:
- Routes
  - Insert (POST)
  - Update (POST)
  - Select (GET)
- Optional: Basic Auth (base64)
  

## CRUD

The API is similar to IndexedDB API ( add, get, put, delete ). It is based on asynchronous promises (using Q library).

```
var jack = {id: 15, firstname: 'Jack', lastname: 'Hammer', age: 35};

// Create
store.add(jack)
     .then(function(result) { /* success */ })
     .fail(function(error) { /* error */ });

// Read
store.get(15)
     .then(function(result) { console.log(result.name) }); // outputs: Jack

// Update
jack.age = 40;
store.put(jack).then(callback);
```

## Querying

Queries are implemented using RQL.

```
// get items with id=15
store.query('id=15')
     .then(function(result) {}); // result is an Array

// get items with age >= 21
store.query('age=ge=21').then(callback);

// get items with price < 100, sort by acending price and descending rating
store.query('price=lt=100&sort(+price,-rating)').then(callback);
```

@See more on [warehouse.js](https://github.com/dundalek/warehous)
