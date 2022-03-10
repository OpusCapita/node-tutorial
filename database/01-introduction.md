# Purpose of a database

Store data
Keep relations between data
Track data changes

# Types of databases
Plain
- test
  - difficult to use
  - slow to parse
- csv
  - difficult to update
  - slow with large datasets
- tabular
  - data kept in a table (fixed columns, variable rows)

Structured
- RDBMS
  - Focused on relations
  - Data must fit into structure defined
  - Multiple mechanisms used to improve performance
    - indexing allows fast data access by known key
    - indexing could be used to quickly search for data (search through the index as full dataset is larger)
  - constraints (PK, FK)
- document
  - flexible data format
  - needs structure to allow data searching
  - usually much faster if document ID is known
- graph

- NewSQL

# ACID

Atomicity, Consistency, Isolation and Durability

Transactions must be **a**tomic.
Transaction is performed as a set of operations (add, modify, delete data).
Either whole transaction is completed or nothing is done.

Data must be **c**onsistent.
Transaction can change database from one well known state into another well known state.
Primary key and foreign key constaints are guaranteed. You cannot insert data not meeting the data constraints defined.

Transaction **i**solation.
Transactions must be executed as if done sequentially.
If someone modified data used by you during your transaction - only one transaction can succeed.

Data are **d**urable.
Once data were committed, they would remain even in case of a failure (ex. crash).

# CAP

Consistency, Availability, Partition tolerance
You can pick only 2 at once.

Consistency:
Every read receives the most recent write or an error.
With 2 nodes you can write data to node1 and read them from node2 immediately (and vice versa).

Availability:
Every request receives a (non-error) response, without the guarantee that it contains the most recent write.
You can always read the data (but it might be not the most recent version).

Partition tolerance:
The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.
With 2 nodes you can still work with DB even if one of the nodes is down.

## Most common database types

CP
RDBMS (Oracle, MySQL, MariaDB, Postgres, Microsoft SQL Server), Hadoop
Central DB (at least for consistent writes), returns most recent data

AP
MongoDB, HBase, Redis, Memcache, Google BigTable
Can be distributes, High availability

CA
CouchDB, Cassandra, Amazon DynamoDB, Riak
Can be distributed, returns most recent data

# Some databases

- Oracle
  - CP
  - Relational DataBase Managemenet System designed for CIA long time ago
  - Version 2 released for public
  - Goal: to find relations between the data and allow data analytics
  - Data stored on heap or in index (index organized tables)
  - Partitioned tables could be used to drop old partitions (data retention)
  - Pros:
    - Almost 100% SQL compatible (Structured Query Language is an open standard)
    - Very mature
    - Very good documentation
  - Cons:
    - Scalability issues
    - High cost
- MySQL
  - CP
  - Poor man's RDBMS
  - Owned by Oracle, not developed much
  - Data stored on heap (clustered indexes supported but limited)
  - Partitioned tables could be used to drop old partitions (data retention)
  - Pros:
    - Free
    - Mature
  - Cons:
    - Not scalable
    - Documentation is complex
- MariaDB
  - CP
  - Open fork of MySQL
- CouchDB
- CouchBase
  - CP (if a node dies its data are not available until fail-over)
  - Data organized in buckets → scopes → collections → documents
  - Supports document TTL
  - Append-only: old versions are kept until compaction is executed
  - Fast for frequent document update (but disk space consumption is high until compaction)
  - Bad to check if document exists (write might be pending - app must rely on CAS)
  - Max 20MiB per document
- Cassandra
- ElasticSearch
  - P, Consistency is prefered over Availability
- Redis
  - P, neither C nor A

# Goals

- simple way to run several databases (the less reading, the better)
  - username:password always root:password (if possible)
- consistent approach
- out-of-the-box experience
- no fancy stuff, just simple showcase
- introduction to ACID, CAP and other topics

# Assumptions

- team is already using ocker-compose →  it will be used here
- simple script `run.sh` to start docker-compose and any initialization scripts
- development environment
  `docker run -v $PWD:/home/node -u 1000 -it node:14 npx nodemon /home/node/index.js`
