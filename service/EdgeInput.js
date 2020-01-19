const jp = require('jsonpath');

const DaoCassandra = require('../model/DaoCassandra');

class EdgeInput {

   async processEdgeInputForCassandra(topic, message) {
        try {
            const data1 = jp.query(JSON.parse(message), "$..subassemblies")[0],
                machineId = jp.query(JSON.parse(message), "$..machineId")[0],
                companyId = jp.query(JSON.parse(message), "$..companyId")[0];
            const subassemblies = Object.keys(data1);
            for (let sa in subassemblies) {
                const data2 = data1[subassemblies[sa]].collectors, collectors = Object.keys(data2);
                for (let col in collectors) {
                    let data3 = data2[collectors[col]];
                    if (JSON.stringify(data3) != "null" && JSON.stringify(data3) != "No sensor assignment found") {
                        const csvs = Object.keys(data3);
                        for (let csv in csvs) {
                            let data4 = data3[csvs[csv]];
                            if (collectors[col] != 'pf1') {
                                let data5 = [[]];
                                Object.keys(data4).forEach((key) => {
                                    data5[0].push(data4[key]);
                                });
                                data4 = data5;
                            }
                            if (JSON.stringify(data4).length > 10) {
                                await DaoCassandra.writeIntoMachineRawData([data4, companyId, machineId, subassemblies[sa], collectors[col], csvs[csv]]);
                            }
                        }
                    }
                }
            }
        }
        catch (err) {
            logger.error(`error in parsing... ${err.stack}`);
        }
    }

}

module.exports = new EdgeInput();