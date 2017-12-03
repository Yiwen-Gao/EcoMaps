/*-------------------------------------------------*
                      Team 1
/*-------------------------------------------------*/

/*var sampleJSONString = '{"mode" : "flight", "characteristics": {"origin_airport": "LAX", "destination_airport": "JFK"}}';
var sampleJSONObj = JSON.parse(sampleJSONString);
sendTravelData(sampleJSONObj);

function sendTravelData(jsonObject) {
	var modeOfTransport = jsonObject.mode;

	if (modeOfTransport == "automobile") {
		
	}
	else if (modeOfTransport == "walk") {
		
	}
	else if (modeOfTransport == "bus") {
		
	} else {
		console.log("ERROR: Wrong mode of transportation specified");
		return;
	}
}

function getCost() {
	return getCarbonEmitted() * 1;
}*/
