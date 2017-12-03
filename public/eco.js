/*-------------------------------------------------*
                      Team 1
/*-------------------------------------------------*/

var sampleJSONString = '{"mode" : "flight", "characteristics": {"origin_airport": "LAX", "destination_airport": "JFK"}}';
var sampleJSONObj = JSON.parse(sampleJSONString);
sendTravelData(sampleJSONObj);

function sendTravelData(jsonObject) {
	var modeOfTransport = jsonObject.mode;

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
	} else {
		console.log("ERROR: Wrong mode of transportation specified");
		return;
	}

	var carbonEmitted;

	$.post(url, JSON.stringify(jsonObject.characteristics), function(data) {
		console.log("data: ");
		console.log(data);
		carbonEmitted = data.decisions.carbon;
		console.log("carbonEmitted2: "+carbonEmitted.description);
		//Suggested $10 Donation per MT Ton of Carbon Emitted
		console.log("suggested donations: "+carbonEmitted.object.value/100);
	});
	return carbonEmitted;
}

function getCost() {
	return getCarbonEmitted() * 1;
}
