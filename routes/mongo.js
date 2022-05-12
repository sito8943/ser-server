const express = require("express");
const basicAuth = require("express-basic-auth");

const { docs } = require("../users/users");
const { unauthorizedResponse } = require("../users/functions");

const dbo = require("../db/conn");

dbo.connectToServer((err) => {
  console.log(err);
});

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

recordRoutes.use(basicAuth({ users: docs, unauthorizedResponse }));

// This section will help you get a list of all the documents.
recordRoutes.get("/get", async (req, res) => {
  const dbConnect = dbo.getDb();
  const { collection } = req.query;
  dbConnect
    .collection(collection)
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send(`Error fetching ${collection}!`);
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new document.
recordRoutes.post("/insert", (req, res) => {
  const dbConnect = dbo.getDb();
  const { collection, many } = req.body;

  if (many) {
    const { list } = req.body;
    dbConnect
      .collection(collection)
      .insertMany([...list], function (err, result) {
        if (err) {
          res.status(400).send("Error inserting!");
        } else {
          console.log(`Added ${list.length} elements`);
          res.status(200).send("Ok");
        }
      });
  } else {
    const { name, type, id, age, gender, region } = req.body;
    dbConnect
      .collection(collection)
      .insertOne(
        { name, type, id, age, gender, region },
        function (err, result) {
          if (err) {
            res.status(400).send("Error inserting!");
          } else {
            console.log(`Added a new match with id ${result.insertedId}`);
            res.status(200).send("Ok");
          }
        }
      );
  }
});

// This section will help you update a document by id.
recordRoutes.post("/update", (req, res) => {
  const dbConnect = dbo.getDb();
  const { name, type, id, _id, age, gender, region } = req.body;
  const { collection } = req.body;
  const listingQuery = { _id };
  const updates = {
    $set: { name, type, id, age, gender, region },
  };

  dbConnect
    .collection(collection)
    .updateOne(listingQuery, updates, function (err, _result) {
      if (err) {
        res
          .status(400)
          .send(`Error updating on listing with id ${listingQuery.id}!`);
      } else {
        console.log("1 document updated");
        res.status(200).send("Ok");
      }
    });
});

module.exports = recordRoutes;
