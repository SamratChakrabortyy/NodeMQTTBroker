const RestUtils = require('../utils/restUtils');

class DaoLoopback {

    async readSensorMetaDataForDiag(sensorId) {
        const restOptions = [
            {
                conf: "diagInputMetadataForSensor",
                sensorId: `${sensorId}`
            }
        ];
        let response = await RestUtils.getGenericWOLoop(restOptions);
        return response;
    }

}

module.exports = new DaoLoopback();