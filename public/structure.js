var leafHTML = '<div class="leaf_rating" style="width: 3%;"> <image width="10" height="10" src="EcoLeaf.png"> </div> ';
var carHTML = '<i class="material-icons prefix">directions_car</i> ';
var railHTML = '<i class="material-icons prefix">directions_railway</i> ';

var styling = "";

function route_chosen(carbonMoney) {
	var isDonating = confirm("Would you like to make a donation?\nThe Carbon footprint "+
	"generated from your trip will need $"+carbonMoney+" to offset.");
	if(!isDonating){
		window.location.href = "https://maps.google.com/";
		return;
	}
	
}

function addRoute(mode, response, cost) {

	var iconHTML;
	if (mode == 'DRIVING') iconHTML = carHTML;
	else if (mode == 'TRANSIT') iconHTML = railHTML;

	
	for (var i = 0 ; i < response.routes.length; i++) {
		styling += '<div style="width: 100%;" onclick="route_chosen('+cost[i].toFixed(2)+')">';
		var duration = 0;
		styling += iconHTML;
		if(mode == 'DRIVING'){
			styling += '<div class="route_name"> <h3>' + "via " + response.routes[i].summary + '</h3> </div> ';
		}
		else if (mode == 'TRANSIT'){
			var depTime = response.routes[i].legs[0].departure_time;
			var arrTime = response.routes[i].legs[response.routes[i].legs.length - 1].arrival_time;
			styling += '<div class="route_name"> <h3>' + depTime.text + " - " + arrTime.text + '</h3> </div> ';
		}
		console.log(cost);
		var maxCost = Math.max.apply(null, cost);
		console.log(maxCost);
		var numLeaves = 4 - Math.floor(cost[i] * 4 / maxCost);
		console.log(numLeaves);
		
		for(var j = 0; j < response.routes[i].legs.length; j++){
			duration += response.routes[i].legs[j].duration.value;
		}
		duration /= 60;
		styling += '<div class="route_duration"> <h3>' + duration.toFixed(0) + ' min</h3> </div> '; 
		styling += leafHTML.repeat(numLeaves);
		styling += '</div>';
	}
	
	document.getElementById("sidebar_route_lists").innerHTML = styling;
	console.log(styling);
}
