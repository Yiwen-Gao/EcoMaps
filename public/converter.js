//From the EPA
function convertAuto(jsonObject) {
	double carbonEmittedKg = jsonObject.distance * 19.6 / jsonObject.mpg * 0.453592;
	double cost = carbonEmitted * 0.001 * 10;
	return cost;
}

function convertWalk(jsonObject) {
	return 0;
}

//Diesel hybrid electric buses have good gas mileage
function convertBus(jsonObject) {
	double carbonEmittedKg = 0.2 * convertAuto(jsonObject);
	double cost = carbonEmittedKg * 0.001 * 10;
	return cost;
}