//From the EPA
function convertAuto(distance) {
	double carbonEmittedKg = distance * 0.000621371 * 19.6 / jsonObject.mpg * 0.453592;
	double cost = carbonEmitted * 0.001 * 10;
	return cost;
}

function convertWalk(distance) {
	return 0;
}

//Diesel hybrid electric buses have good gas mileage
function convertBus(distance) {
	double carbonEmittedKg = 0.2 * convertAuto(distance);
	double cost = carbonEmittedKg * 0.001 * 10;
	return cost;
}

//From Carbon Footprint
function convertRail(distance) {
	double carbonEmittedKg = distance * 0.000047;
	double cost = carbonEmittedKg * 0.001 * 10; 
	return cost
}
