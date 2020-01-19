const DaoCassandra = require('../model/DaoCassandra'),
    DaoLoopback = require('../model/DaoLoopback'),
    Utilities = require('../utils/utilities'),
    logger = require('../utils/logger');

class DiagInputService {

    async processDiagInputForCassandra(topic, message) {
        try {
            logger.info(`Processing Diag Input data for Cassandra : ${topic}`);
            let batchData = JSON.parse(message);
            let sensors = batchData.sensors;
	    logger.debug(`Sensors : ${JSON.stringify(sensors)}`);
            let sensorMetadata = {};
            for(let i in sensors){
                try{
                    let tmp  = await DaoLoopback.readSensorMetaDataForDiag(sensors[i]);
                    if(tmp && tmp.length > 0){
			sensorMetadata[sensors[i]] = tmp[0];
		    logger.debug(`Successfully Fetched MetaData for : ${sensors[i]} \n ${sensorMetadata[sensors[i]]}`);
			}
			else{
				throw new Error(`Sensor Metadata not available for sensor : ${sensors[i]}`);
			}
                }
                catch(err){
                    logger.error(`Error while fetching metadata for sensor: ${sensors[i]}: ${err.stack}`);
                }
            }
            delete batchData.sensors;
            logger.debug(`Batch data before processing: ${JSON.stringify(batchData)}`);
            let processeedBatchData = {};
            for (let key in batchData) {
                let internetConn = batchData[key].internetConnectivity;
                delete batchData[key].internetConnectivity;
                for(let sensor in batchData[key]){
                    try {
                        let temp = {};
                        temp.key = `${sensorMetadata[sensor].sensor.company.id}_${sensorMetadata[sensor].machine.id}_${sensorMetadata[sensor].sensorId}`;
                        temp.insertTime = parseInt(key);
                        temp.companyId = sensorMetadata[sensor].sensor.company.id;
                        temp.machineId = sensorMetadata[sensor].machine.id;
                        temp.machineName = sensorMetadata[sensor].machine.name;
                        temp.sensorId = sensorMetadata[sensor].sensorId;
                        temp.sensorType = sensorMetadata[sensor].sensorId.split('_')[1];
                        temp.internetConnectivity = typeof internetConn !== 'undefined' && internetConn !== null? internetConn : 0;
                        temp.sensorUp = typeof batchData[key][sensor].data  !== 'undefined' && batchData[key][sensor].data !== null ? batchData[key][sensor].data : 0;
                        temp.sensorConnectivity = typeof batchData[key][sensor].conn !== 'undefined' && batchData[key][sensor].conn !== null ? batchData[key][sensor].conn : 1;	
                        processeedBatchData[`${key}_${sensor}`] = temp;
                    }
                    catch(err){
                        logger.error(`Error while processing BatchData for sensor :\n ${err.stack}`);
                    }
                }
            }
            logger.debug(`Batch data after processing: ${JSON.stringify(processeedBatchData)} for sensors ${JSON.stringify[sensors]}`);
            let result = await DaoCassandra.insertSensorDiagData(processeedBatchData);
            logger.info(`Result of insert call: ${result}  for sensorId ${JSON.stringify[sensors]}`);
            
        } catch (err) {
            logger.error(`Error while Processing Sensor Diagnostic data for cassandra insertion:\n ${err.stack}`);
        }
    }

}

module.exports = new DiagInputService();
