/*jshint esversion: 8 */
const rp = require('request-promise'),
	PromiseBlue = require('bluebird'),
	jp = require('jsonpath'),
	njt = require('node-json-transform').DataTransform,
	logger = require('./logger');

class RestUtils {

	constructor() {
		this.conf = require('../restConfigs/default.config');
	}

	// getCompanyNames() {

	// 	const deferred = PromiseBlue.defer(),
	// 		getCompaniesUrl = this.conf.getCompanyNames.api,
	// 		mode = this.conf.getCompanyNames.mode,
	// 		map = this.conf.getCompanyNames.accessMap;

	// 	rp({
	// 		method: 'GET',
	// 		uri: getCompaniesUrl,
	// 		resolveWithFullResponse: true

	// 	}).then((response) => {
	// 		let compJson;
	// 		if (mode == "accesspath") {
	// 			compJson = JSON.parse(response.body);
	// 			deferred.resolve(jp.query(compJson, this.conf.getCompanyNames.accessPath));
	// 		} else {
	// 			compJson = JSON.parse(response.body);
	// 			let dataTransform = njt(compJson, map);
	// 			deferred.resolve(dataTransform.transform());
	// 		}

	// 	}).catch((error) => {

	// 		deferred.reject();
	// 		logger.error(error);
	// 	});
	// 	return deferred.promise;
	// }

	// async getMachines(midJson) {

	// 	let machines = [],
	// 		getMachinesUrl = this.conf.getMachines.api;

	// 	const apiVars = this.conf.getMachines.apiVars,
	// 		getMachinesAccessPath = this.conf.getMachines.accessPath,
	// 		mode = this.conf.getMachines.mode,
	// 		map = this.conf.getMachines.accessMap;

	// 	for (let index in midJson) {
	// 		await new Promise((resolve, reject) => {
	// 			for (let indexVars in apiVars) {
	// 				getMachinesUrl = getMachinesUrl.replace(indexVars, jp.query(midJson, apiVars[indexVars].replace("#index", index)));
	// 			}

	// 			rp({
	// 				method: 'GET',
	// 				uri: getMachinesUrl,
	// 				resolveWithFullResponse: true
	// 			}).then((response) => {
	// 				let machineJson;
	// 				if (mode == "accesspath") {
	// 					machineJson = JSON.parse(response.body);
	// 					machines.push(jp.query(machineJson, getMachinesAccessPath)[0]);
	// 					resolve(machines);
	// 				} else {
	// 					machineJson = JSON.parse(response.body);
	// 					let dataTransform = njt(machineJson, map);
	// 					machines.push(dataTransform.transform());
	// 					resolve(machines);
	// 				}
	// 			}).catch((error) => {
	// 				logger.error(error);
	// 				reject(machines);
	// 			});
	// 		});
	// 	}
	// 	return machines;
	// }

	// getCompanyDetails(companyName) {

	// 	const getCompanyUrl = 'http://137.117.93.67:5000/api/company?filter={"where":{"name":"' + companyName + '"}}',
	// 		deferred = PromiseBlue.defer();
	// 	rp({
	// 		method: 'GET',
	// 		uri: getCompanyUrl,
	// 		resolveWithFullResponse: true

	// 	}).then((response) => {

	// 		let compJson = JSON.parse(response.body);
	// 		deferred.resolve(compJson);
	// 	}).catch((error) => {

	// 		deferred.reject();
	// 		logger.error(error);
	// 	});

	// 	return deferred.promise;
	// }

	// getSensorQCInfo(sensorIdJson) {

	// 	const apiVars = this.conf.getSensorDetails.apiVars,
	// 		map = this.conf.getSensorDetails.accessMap,
	// 		deferred = PromiseBlue.defer(),
	// 		mode = this.conf.getSensorDetails.mode;

	// 	let getSensorDetailsUrl = this.conf.getSensorDetails.api;
	// 	for (let indexVars in apiVars) {
	// 		getSensorDetailsUrl = getSensorDetailsUrl.replace(indexVars, jp.query(sensorIdJson, apiVars[indexVars]));
	// 	}
	// 	rp({
	// 		method: 'GET',
	// 		uri: getSensorDetailsUrl,
	// 		resolveWithFullResponse: true

	// 	}).then((response) => {
	// 		let midJson;
	// 		if (mode == "accesspath") {
	// 			midJson = JSON.parse(response.body);
	// 			deferred.resolve(jp.query(midJson, this.conf.getSensorDetails.accessPath));

	// 		} else {
	// 			midJson = JSON.parse(response.body);
	// 			let dataTransform = njt(midJson, map);
	// 			deferred.resolve(dataTransform.transform());
	// 		}
	// 	}).catch((error) => {

	// 		deferred.reject();
	// 		logger.error(error);
	// 	});

	// 	return deferred.promise;

	// }

	// getMachineIds(companyIdJson) {

	// 	const apiVars = this.conf.getMachineIds.apiVars,
	// 		map = this.conf.getMachineIds.accessMap,
	// 		deferred = PromiseBlue.defer(),
	// 		mode = this.conf.getMachineIds.mode;
	// 	let getMachineIdUrl = this.conf.getMachineIds.api;

	// 	for (let indexVars in apiVars) {
	// 		getMachineIdUrl = getMachineIdUrl.replace(indexVars, jp.query(companyIdJson, apiVars[indexVars]));
	// 	}

	// 	rp({
	// 		method: 'GET',
	// 		uri: getMachineIdUrl,
	// 		resolveWithFullResponse: true
	// 	}).then((response) => {
	// 		let midJson;
	// 		if (mode == "accesspath") {
	// 			midJson = JSON.parse(response.body);
	// 			deferred.resolve(jp.query(midJson, this.conf.getMachineIds.accessPath));

	// 		} else {
	// 			midJson = JSON.parse(response.body);
	// 			let dataTransform = njt(midJson, map);
	// 			deferred.resolve(dataTransform.transform());
	// 		}
	// 	}).catch((error) => {
	// 		deferred.reject();
	// 		logger.error(error);
	// 	});

	// 	return deferred.promise;
	// }

	// async getSensorNames(machines) {

	// 	let compactMachines = [],
	// 		getSensorsUrl = this.conf.getSensorNames.api;
	// 	const apiVars = this.conf.getSensorNames.apiVars,
	// 		getSensorsAccessPath = this.conf.getSensorNames.accessPath,
	// 		mode = this.conf.getSensorNames.mode,
	// 		map = this.conf.getSensorNames.accessMap;

	// 	for (let index in machines) {
	// 		if (machines[index] != null) {
	// 			await new Promise((resolve, reject) => {

	// 				for (let indexVars in apiVars) {
	// 					getSensorsUrl = getSensorsUrl.replace(indexVars, jp.query(machines, apiVars[indexVars].replace("#index", index)));
	// 				}

	// 				rp({
	// 					method: 'GET',
	// 					uri: getSensorsUrl,
	// 					resolveWithFullResponse: true
	// 				}).then((response) => {
	// 					let sensorsJson;
	// 					if (mode == "accesspath") {
	// 						sensorsJson = JSON.parse(response.body);
	// 						machines[index].sensors = jp.query(sensorsJson, getSensorsAccessPath);
	// 						compactMachines.push(machines[index]);
	// 						resolve(machines);
	// 					} else {
	// 						sensorsJson = JSON.parse(response.body);
	// 						let dataTransform = njt(sensorsJson, map);
	// 						machines[index].sensors = dataTransform.transform();
	// 						compactMachines.push(machines[index]);
	// 						resolve(machines);
	// 					}
	// 				}).catch((error) => {
	// 					logger.error(error);
	// 					reject(machines);
	// 				});
	// 			});
	// 		}
	// 	}
	// 	return compactMachines;
	// }

	// async getSensorStatus(machines, start, end) {

	// 	machines.time = {
	// 		"start": start,
	// 		"end": end
	// 	};

	// 	let getSensorStatusUrl = this.conf.getSensorStatus.api;
	// 	const apiVars = this.conf.getSensorStatus.apiVars,
	// 		getSensorStatusesAccessPath = this.conf.getSensorStatus.accessPath,
	// 		mode = this.conf.getSensorStatus.mode,
	// 		map = this.conf.getSensorStatus.accessMap;

	// 	for (let index in machines) {
	// 		if (machines[index] != null && index != "time") {

	// 			for (let sindex in machines[index].sensors) {
	// 				if (machines[index].sensors != null) {
	// 					await new Promise((resolve, reject) => {

	// 						for (let indexVars in apiVars) {
	// 							getSensorStatusUrl = getSensorStatusUrl.replace(indexVars, jp.query(machines, (apiVars[indexVars].replace("#index", index)).replace("#sindex", sindex)));
	// 						}

	// 						rp({
	// 							method: 'GET',
	// 							uri: getSensorStatusUrl,
	// 							resolveWithFullResponse: true
	// 						}).then((response) => {
	// 							let sensorStatusJson;
	// 							if (mode == "accesspath") {
	// 								sensorStatusJson = JSON.parse(response.body);
	// 								machines[index].sensors[sindex].status = jp.query(sensorStatusJson, getSensorStatusesAccessPath);
	// 							} else {
	// 								sensorStatusJson = JSON.parse(response.body);
	// 								let dataTransform = njt(sensorStatusJson, map);
	// 								machines[index].sensors[sindex].status = dataTransform.transform();
	// 							}

	// 							resolve(machines);
	// 						}).catch((error) => {
	// 							logger.error(error);
	// 							reject(machines);
	// 						});
	// 					});
	// 				}

	// 			}
	// 		}
	// 	}
	// 	return machines;
	// }

	getGenericWOLoop(inputJson) {

		let apiVars, getGenericWOLoopUrl, map, mode;
		const deferred = PromiseBlue.defer();
		try {

			apiVars = this.conf[inputJson[0].conf].apiVars;
			getGenericWOLoopUrl = this.conf[inputJson[0].conf].api;
			map = this.conf[inputJson[0].conf].accessMap;
		} catch (e) {

			logger.error("Config issue in getGenericWOLoop: " + e);
			deferred.reject(e);
		}

		for (let indexVars in apiVars) {
			getGenericWOLoopUrl = getGenericWOLoopUrl.replace(indexVars, jp.query(inputJson, apiVars[indexVars]));
		}

		mode = this.conf[inputJson[0].conf].mode;
		rp({
			method: 'GET',
			uri: getGenericWOLoopUrl,
			resolveWithFullResponse: true

		}).then((response) => {
			let midJson;
			if (mode == "accesspath") {
				midJson = JSON.parse(response.body);
				deferred.resolve(jp.query(midJson, this.conf[inputJson[0].conf].accessPath));

			} else {
				midJson = JSON.parse(response.body);
				let dataTransform = njt(midJson, map);
				deferred.resolve(dataTransform.transform());
			}
		}).catch((error) => {

			logger.error(error);
			deferred.reject(error);
		});

		return deferred.promise;
	}

	async getGenericWithLoop(inputJson) {

		let apiVars, getGenericWithLoopUrl, map, mode,
			dataTransformArray = [];
		const deferred = PromiseBlue.defer(),
			conf = inputJson[0].conf;
		inputJson.splice(0, 1);
		inputJson = Array.isArray(JSON.parse(JSON.stringify(inputJson))) ? JSON.parse(JSON.stringify(inputJson)) : [JSON.parse(JSON.stringify(inputJson))];

		try {

			apiVars = this.conf[conf].apiVars;
			getGenericWithLoopUrl = this.conf[conf].api;
			map = this.conf[conf].accessMap;
		} catch (e) {

			logger.error("Config issue in getGenericWithLoop: " + e);
			deferred.reject(e);
		}

		for (let index in inputJson) {
			await new Promise((resolve, reject) => {

				for (var indexVars in apiVars) {
					getGenericWithLoopUrl = getGenericWithLoopUrl.replace(indexVars, jp.query(inputJson, apiVars[indexVars].replace("#index", index)));
				}

				rp({
					method: 'GET',
					uri: getGenericWithLoopUrl,
					resolveWithFullResponse: true

				}).then((response) => {
					let midJson;
					if (mode == "accesspath") {
						midJson = JSON.parse(response.body);
						dataTransformArray.push(jp.query(midJson[0], this.conf[conf].accessPath));
						resolve(dataTransformArray);
					} else {
						midJson = JSON.parse(response.body);
						let dataTransform = njt(midJson[0], map);
						dataTransformArray.push(dataTransform.transform());
						resolve(dataTransformArray);
					}
				}).catch((error) => {

					logger.error(error);
					reject(error);
				});
			});
		}

		return dataTransformArray;
	}

	requestPost(inputJson) {

		let req = inputJson.body,
			apiVars, postSensorStatsUrl, map, reqBody, finalReq, reqMode;
		const deferred = PromiseBlue.defer();
		try {

			apiVars = this.conf[inputJson.conf].apiVars;
			postSensorStatsUrl = this.conf[inputJson.conf].api;
			map = this.conf[inputJson.conf].accessMap;
			reqBody = this.conf[inputJson.conf].reqBody;
			finalReq = this.conf[inputJson.conf].finalReq;
		} catch (e) {

			logger.error("Config issue in Post Call: " + e);
			deferred.reject(e);
		}

		for (let indexVars in apiVars) {
			postSensorStatsUrl = postSensorStatsUrl.replace(indexVars, jp.query(req, apiVars[indexVars]));
		}
		reqMode = this.conf[inputJson.conf].reqMode;
		if ("map" == reqMode) {

			let temp = Array.isArray(JSON.parse(JSON.stringify(req))) ? JSON.parse(JSON.stringify(req)) : [JSON.parse(JSON.stringify(req))];

			if (Array.isArray(finalReq)) {

				temp = njt(temp, map);
				finalReq = temp.transform();
			} else {

				temp = njt(temp, map);
				finalReq = temp.transform()[0];
			}
		} else {
			for (let key in reqBody) {

				if (!Array.isArray(finalReq)) {

					finalReq[key] = jp.query(req, reqBody[key])[0];
				} else {

					finalReq[key] = jp.query(req, reqBody[key])[0];
				}
			}
			finalReq = [finalReq];
		}

		rp({
			method: 'POST',
			uri: postSensorStatsUrl,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(finalReq),
			resolveWithFullResponse: true

		}).then((response) => {

			response = JSON.parse(response.body);
			deferred.resolve(response);

		}).catch((error) => {

			logger.error(error);
			deferred.reject(error);
		});

		return deferred.promise;
	}

	putcall(inputJson) {

		let req = inputJson.body,
			apiVars, putSensorStatsUrl, map, reqBody, finalReq, reqMode;
		const deferred = PromiseBlue.defer();
		try {

			apiVars = this.conf[inputJson.conf].apiVars;
			putSensorStatsUrl = this.conf[inputJson.conf].api;
			map = this.conf[inputJson.conf].accessMap;
			reqBody = this.conf[inputJson.conf].reqBody;
			finalReq = this.conf[inputJson.conf].finalReq;
		} catch (e) {

			logger.error("Config issue in Put Call: " + e);
			deferred.reject(e);
		}

		for (let indexVars in apiVars) {
			putSensorStatsUrl = putSensorStatsUrl.replace(indexVars, jp.query(req, apiVars[indexVars]));
		}
		reqMode = this.conf[inputJson.conf].reqMode;
		if ("map" == reqMode) {

			let temp = Array.isArray(JSON.parse(JSON.stringify(req))) ? JSON.parse(JSON.stringify(req)) : [JSON.parse(JSON.stringify(req))];

			if (Array.isArray(finalReq)) {

				temp = njt(temp, map);
				finalReq = temp.transform();
			} else {

				temp = njt(temp, map);
				finalReq = temp.transform()[0];
			}
		} else {
			for (let key in reqBody) {
				if (!Array.isArray(finalReq)) {

					finalReq[key] = jp.query(req, reqBody[key])[0];
				} else {

					finalReq[key] = jp.query(req, reqBody[key])[0];
				}
			}
			finalReq = [finalReq];
		}

		rp({
			method: 'PUT',
			uri: putSensorStatsUrl,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(finalReq),
			resolveWithFullResponse: true
		}).then((response) => {

			response = JSON.parse(response.body);
			deferred.resolve(response);
		}).catch((error) => {

			logger.error(error);
			deferred.reject(error);
		});

		return deferred.promise;
	}

	deletecall(inputJson) {

		let apiVars, deleteSensorStatsUrl;
		const deferred = PromiseBlue.defer();
		try {

			apiVars = this.conf[inputJson.conf].apiVars;
			deleteSensorStatsUrl = this.conf[inputJson.conf].api;
			for (let indexVars in apiVars) {
				deleteSensorStatsUrl = deleteSensorStatsUrl.replace(indexVars, jp.query(inputJson, apiVars[indexVars]));
			}
		} catch (e) {

			logger.error("Config issue in Delete Call: " + e);
			deferred.reject(e);
		}

		rp({
			method: 'DELETE',
			uri: deleteSensorStatsUrl,
			headers: {
				'Content-Type': 'application/json'
			},
			resolveWithFullResponse: true
		}).then((response) => {

			response = JSON.parse(response.body);
			deferred.resolve(response);
		}).catch((error) => {

			logger.error(error);
			deferred.reject();
		});

		return deferred.promise;
	}

}

module.exports = new RestUtils();