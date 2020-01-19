const mosca = require('mosca');

const EdgeInput = require('./service/EdgeInput');
const EdgeOutput = require('./service/EdgeOutput');
const DiagInput = require('./service/DiagInputService');
const DaoCassandra = require('./model/DaoCassandra');

const pubsubsettings = {
        type: 'mqtt',
        json: false,
        mqtt: require('mqtt'),
        host: '127.0.0.1',
        port: 1883
    },
    moscaSettings = {
        port: 8883,
        backend: pubsubsettings
    };

//const cassandra = new DaoCassandra();
const server = new mosca.Server(moscaSettings);
const logger = require('./utils/logger');

const checkTopic = (topic, message) => {

    logger.info(`Received message on topic: ${topic}`);
    logger.debug(`Message for ${topic} : \n ${message}  `);
    if (topic.indexOf('edgeip') !== -1) {
        EdgeInput.processEdgeInputForCassandra(topic, message);
    }

    if (topic.indexOf('edgeop') !== -1) {
        EdgeOutput.parseData(topic, message);
    }

    if (topic.indexOf('info/diag/') !== -1) {
        DiagInput.processDiagInputForCassandra(topic, message);
    }
};

server.on('published', (packet, client) => {

    let message = packet.payload.toString(),
        topic = packet.topic;

    if (topic.indexOf("$SYS") === -1 && client) {

        try {
            checkTopic(topic, message);
        } catch (e) {
            logger.error(e);
        }
    }

});

server.on('clientConnected', (client) => {
    logger.info(`Client Connected: ${client.id}`);
});

server.on('clientDisconnected', (client) => {
    logger.info(`Client Disconnected: ${client.id}`);
});

server.on('ready', async () => {
    try {
        logger.debug(`try file`);
        logger.info(`Mosco MQTT Server is on.`);

        if (!await DaoCassandra.checkConnection()) {
            logger.fatal(" ############## Failed To connect to cassandra. Closing Broker!! ##############");
            process.exit(1);
        }
    }
    catch(err){
        logger.fatal(`Failed to start server!!`);
    }
});