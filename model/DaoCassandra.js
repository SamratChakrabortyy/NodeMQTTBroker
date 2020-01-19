const moment = require('moment'),
    logger = require('../utils/logger'),
    cassClient = require('../utils/cassandraClient'),
    cassandra = require('cassandra-driver'),
    TimeUuid = cassandra.types.TimeUuid;

const insertSensorDiagQuery = `insert into iotapp_novatec_ks.sensor_diagnostic_data (key, company_id, machine_id, machine_name, sensor_id, sensor_type, internet_conn, sensor_conn, sensor_status, insert_datetime) values (?, ?, ?, ?, ?, ?, ?, ?, ?, unixTimestampOf(?))`,
    insertMachineRawDataQuery = 'INSERT INTO machine_raw_data_cf (key, insert_datetime, raw_data) values(?, toUnixTimestamp(now()), ?)';

class DaoCassandra {

    readData() {

    }

    checkConnection() {
        logger.info("$$$$$$$$ Trying to connect to Cassandra ########");
        logger.info("####### Trying to connect to Cassandra ########");
        const promise = new Promise((resolve, reject) => {
            cassClient.connect((err) => {
                if (err) {
                    logger.error(` ######### Failed to Connect Cassandra #########  ${err}`);
                    reject(err);
                } else {
                    logger.info('Connected to cluster with %d host(s): %j', cassClient.hosts.length, cassClient.hosts.keys());
                    resolve(true);
                }
            });
        });

        return promise;
    }

    insertSensorDiagData(batchData) {
        logger.debug(`Writing data in cassandra ${JSON.stringify(batchData)}`);
        const promise = new Promise((resolve, reject) => {
            try {
                logger.info(`Preparing quieries to insert in Sensor_diagnostic_data`);
                let quieries = [];
                for (let i in batchData) {
                    let query = {
                        query: insertSensorDiagQuery,
                        params: [batchData[i].key, batchData[i].companyId, batchData[i].machineId, batchData[i].machineName, batchData[i].sensorId, batchData[i].sensorType, batchData[i].internetConnectivity, batchData[i].sensorUp, batchData[i].sensorConnectivity, new TimeUuid(new Date(batchData[i].insertTime))]
                    };
                    quieries.push(query);
                }
                logger.debug(`Queries to insert in Cassandra : \n ${JSON.stringify(quieries)}`);
                cassClient.batch(quieries, { prepare: true })
                    .then((result) => {
                        logger.info(`Successfully saved ${quieries.length} rows in cassandra.\n Result : ${result}`);
                        resolve(result);
                    })
                    .catch((err) => {
                        logger.error(`Failed to save ${quieries.length} rows in cassandra.\n Error : ${err}`);
                        reject(err);
                    });
            } catch (err) {
                logger.error(`Error while saving ${batchData.length} rows in sensor_diagnostic_data :\n ${err.stack}`);
                reject(err);
            }
        });

        return promise;
    }

    writeIntoMachineRawData(inputData) {
        const [data, company, machine, subass, coll, csv] = inputData;
        const key = company + '_' + machine + '_' + subass + '_' + coll + '_' + csv;
        const time = moment().format('YYYY-MM-DD HH:mm:ss Z');

        logger.info("key -> " + key + '\n' + "time -> " + time + '\n');
        const promise = new Promise((resolve, reject) => {
            cassClient.execute(insertMachineRawDataQuery, [key, JSON.stringify(data[0])])
            .then(result => {
                logger.info(JSON.stringify(result));
                resolve(result);
            })
            .catch(error => {
                logger.error(error.stack);
                reject(error);
            });
        });

        return promise;
    }

}

module.exports = new DaoCassandra();