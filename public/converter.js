//From the EPA
function convertAuto(distance) {
	var carbonEmittedKg = distance * 0.000621371 * 19.6 / 23.6 * 0.453592;
	var cost = carbonEmittedKg * 0.001 * 10;
	return cost;
}

function convertWalk(distance) {
	return 0;
}

//Diesel hybrid electric buses have good gas mileage
function convertBus(distance) {
	var carbonEmittedKg = 0.2 * convertAuto(distance);
	var cost = carbonEmittedKg * 0.001 * 10;
	return cost;
}

//From Carbon Footprint
function convertRail(distance) {
	var carbonEmittedKg = distance * 0.000047;
	var cost = carbonEmittedKg * 0.001 * 10;
	return cost;
}
