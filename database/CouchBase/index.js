const couchbase = require('couchbase')

const upsertDocument = async (collection, doc) => {
  // UPSERT is used to insert a new record or update an existing one.
  // If the document doesn’t exist it will be created.
  // UPSERT is a combination of INSERT and UPDATE
  // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/upsert.html
  try {
    const documentId = `tx${doc.id}`;
    const result = await collection.upsert(documentId, doc);
    console.log('Upsert Result: ', result);
    // MutatioResult{ cas:Cas<1234567890>, token: MutationToken<bucketname:123:1234567890:1>}
    // CAS stands for Compare and Swap
    // https://docs.couchbase.com/java-sdk/2.7/concurrent-mutations-cluster.html
  } catch (error) {
    console.error(error)
  }
}

const getTransactionById = async (collection, id) => {
  try {
    const result = await collection.get(id)
    console.log('Get Result: ', result)
  } catch (error) {
    console.error(error)
  }
}

async function main() {
  console.info('Starting...');

  // A Couchbase cluster consists of one or more instances of Couchbase Server,
  // each running on an independent node. Data and services are shared across the cluster.
  const cluster = await couchbase.connect('couchbase://couchbase', {
    username: 'root',
    password: 'password',
  });
  console.info('Connected to the cluster');

  // Couchbase Server uses buckets to group collections of keys and values logically.
  // A maximum of 30 buckets can be created in a cluster.
  const bucket = cluster.bucket('test-bucket');

  // Before CouchBase 7.0 documents were kept directly in the buckets.
  // Since 7.0 data are grouped together into scopes and then collections
  // {cluster:{ bucket1:{ scope1:{ collection:[document1, document2, ...]}}}}
  const collection = bucket.scope('_default').collection('_default');
  // defaults: scope=_default, collection=_default

  const document = {
    id: '1234567890abcdef',
    // custom data comes here
    name: 'Couchbase transaction document example',
  };

  await upsertDocument(collection, document);
  // Warning: write is asynchronous by default - see 
  // https://docs.couchbase.com/server/current/learn/data/durability.html
  // Without this your mutation is not durable (could be gone on crash)

  await getTransactionById(collection, `tx${document.id}`);
  // GetResult{
  //   content: <MY DOCUMENT>,
  //   cas: <CAS>,
  //   expiryTime: undefined 
  // }
  // expiryTime (or TTL=Time To Live) can be set per document
  // Expired documents are removed after exipation during any(access|expiryPager|compaction)
};
main()
  .catch((err) => {
    console.log('ERR:', err)
    process.exit(1)
  })
  .then(process.exit);
