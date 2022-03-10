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

  // MongoDB automatically creates INDEX over the _id field for fast data access

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

  //await importDocuments();
  let t = process.hrtime.bigint();
  for (i=0;i<=100000; i++) {
    document._id = i;
    document.nonIndexedField = i;
    collection.insertOne({document});
  }
  t = process.hrtime.bigint(t);
  await console.log('Insert finished in %d nanoseconds (%s seconds)', t, parseInt(t)/1_000_000_000_000_000);

  console.log('item:',await collection.findOne({_id: '1'}));
  console.log('item:',await collection.findOne({_id: '100000'}));
  //await fetchAllById(); // Search using _id (indexed field)
  //await fetchAllByNonindexedfield(); // Search using name (non-indexed field)
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    client.close()
  });