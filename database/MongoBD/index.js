const { MongoClient } = require('mongodb');
const url = 'mongodb://root:password@mongodb:27017';
const client = new MongoClient(url);
const dbName = 'db-name';

async function main() {
  await client.connect(); // You should connect once and keep the connection until app exits
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const document = {
    _id: '1234567890abcdef',
    name: 'Example mongodb transaction document'
  };

  /*
  // You can perform actions on mongodb-client events:

  client.on('close', async function () {
    await console.log('Error...close');
  });
  client.on('error', async function (err) {
      await console.log('Error...error', err);
  });
  client.on('disconnect', async function (err) {
      await console.log('Error...disconnect', err);
  });
  client.on('disconnected', async function (err) {
      await console.log('Error...disconnected', err);
  });
  client.on('parseError', async function (err) {
      await console.log('Error...parse', err);
  });
  client.on('timeout', async function (err) {
      await console.log('Error...timeout', err);
  });
  console.log(client.eventNames());
  */

  await collection.insertOne(document);
  console.log('Insert --> ', await collection.findOne({ _id: document._id }));
  // {_id:..., document:{
  //   name:...}
  // }

  // If _id is not specified then it is generated usig ObjectId(object) (resulting in 12bytes long value)

  // MongoDB automatically creates INDEX over the _id field for fast data access
  const indexes = await collection.listIndexes();
  await console.log('Indexes: ', await indexes.toArray());
  //[ { v: 2, key: { _id: 1 }, name: '_id_' } ]

  try {
    await collection.insertOne({ _id: document._id });
    // E11000 duplicate key error 
  } catch(e) { }

  await collection.replaceOne({ _id: document._id }, document);
  console.log('Replace --> ', await collection.findOne({ _id: document._id }));
  // {_id:..., name:...}

  await collection.updateOne({ _id: document._id }, {$set: {comment: 'This is an extra field being added'}});
  console.log('Update --> ', await collection.findOne({ _id: document._id }));
  // {_id:..., name:..., comment:...}

  await collection.deleteOne({ _id: document._id })
  console.log('Delete --> ', await collection.findOne({ _id: document._id }));
  // null

  await collection.replaceOne({ _id: document._id }, document, { upsert: false }); // 3rd parameter holds options
  console.log('Replace when not existing (upsert=false) --> ', await collection.findOne({ _id: document._id }));
  // null

  await collection.replaceOne({ _id: document._id }, document, { upsert:true });
  console.log('Replace when not existing (upsert=true) --> ', await collection.findOne({ _id: document._id }));
  // {_id:..., name:...}

  console.log('Get without _id --> ', await collection.findOne(
    { _id: document._id },
    { projection:{_id:0 }}));
  // {name:...}

  /////////////////////////////
  // SEARCHING
  // WARNING: Searching can be slow!

  collection.insertMany(
    {_id:1, age:1},
    {_id:2, age:5},
    {_id:3, age:10});

  collection.findOne({ _id: 1, age:5 });
  collection.findOne({ age: {'$gt':4 }});



  //console.log(await collection.find({nonIndexedField: 'tx1'}).explain());
  // Would use COLLSCAN for a collection scan

  //console.log(await collection.find({_id: 'tx1'}).explain());
  // Would use IDHACK to quickly return the value

  /* LIMITS
  max BSON document size 16MB
  Max 100 levels of depth
  Database name max 64 characters
  Collection names without $, nul, system. prefix
  _id must be unique for a collection
  No limit on number of databases but must be less than max allowed OS open file handlers

  https://docs.mongodb.com/manual/reference/limits/
  */

  /* SCALABILITY
  MongoDB divides data into shards (subsets of data).
  It is a good idea to create initially sharded collections - adding a new shard is easier than sharding an existing non-sharded collection.
  Sharding must ba based on some shard key (ex. unique _id indexed field)
  */

  /* TODO's:
  - Example where access by _id is faster than by non indexed field
  - Sharded collecition
  - Sharding existing non-sharded collection
  - Adding a new sharded collection - what happend to existing data?
  - Mongoose - ODM for MongoDB
  */
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    client.close()
  });