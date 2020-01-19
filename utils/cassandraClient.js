const cassandra = require('cassandra-driver');
const distance = cassandra.types.distance,
  timestamp = cassandra.types.LocalTime,
  env = require('../env.json');

const options = {
  contactPoints: env.cassandra.contactPoints,
  localDataCenter: env.cassandra.localDataCenter,
  keyspace: env.cassandra.keyspace,
  pooling: {
    coreConnectionsPerHost: {
      [distance.local]: 2,
      [distance.remote]: 1
    }
  }
};

const cassClient = new cassandra.Client(options);

module.exports = cassClient;
