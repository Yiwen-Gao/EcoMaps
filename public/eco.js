/*-------------------------------------------------*
                      Team 1
/*-------------------------------------------------*/

var sampleJSONString = "{}";
var sampleJSONObj = JSON.parse(sampleJSONString);
sendTravelData(sampleJSONObj);

function sendTravelData(jsonObject) {
	var jsonString = JSON.stringify(jsonObject);
	var modeOfTransport = jsonString.name;

	var url;

	if (modeOfTransport == "flight") {
		url = "http://impact.brighterplanet.com/flights.json";
	}
	else if (modeOfTransport == "automobile") {
		url = "http://impact.brighterplanet.com/automobiles.json";
	}
	else if (modeOfTransport == "rail") {
		url = "http://impact.brighterplanet.com/rails.json";
	}
	else if (modeOfTransport == "bus") {
		url = "http://impact.brighterplanet.com/bus.json";
	}

	var carbonEmitted;

	$.post(url, function(error, response, body) { 
		var jsonResponse = JSON.parse(body);
		carbonEmitted = jsonResponse.decisions.carbon.value;
	});
 
	return carbonEmitted;
}

function getCost() {
	return getCarbonEmitted() * 1;
} 
