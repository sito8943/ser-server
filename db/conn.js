const { MongoClient } = require("mongodb");

const config = require("../config");
const { log, good } = require("../utils/chalk");

const connectionString = config.DB;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("hospital");
      log(good("Successfully connected to MongoDB."));

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
