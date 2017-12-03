var leafHTML = '<div class="leaf_rating_container"> <div class="leaf_rating" style="width: 3%;"> <image width="10" height="10" src="EcoLeaf.png"> </div> </div>';
var carHTML = '<i class="material-icons prefix">directions_car</i> ';
var railHTML = '<i class="material-icons prefix">directions_railway</i> ';

var styling;

function route_chosen(carbonMoney) {
	var isDonating = confirm("Would you like to make a donation?\nThe Carbon footprint "+
	"generated from your trip will need $"+carbonMoney+" to offset.");
	if(!isDonating){
		var start = document.getElementById("start").value;
		var end = document.getElementById("end").value;
		start = start.split(' ').join('+');
		end = end.split(' ').join('+');
		window.location.href = "https://www.google.com/maps/dir/"+start+"/"+end;
		return;
	}
	if(isDonating){
		window.location.href = "https://www.paypal.com/fundraiser/108133408063901813/charity/1438793";
	}
}

function addRoute(mode, response, cost) {
	styling = "";
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
		var maxCost = Math.max.apply(null, cost);
		var numLeaves = 4 - Math.floor(cost[i] * 4 / maxCost);
		for(var j = 0; j < response.routes[i].legs.length; j++){
			duration += response.routes[i].legs[j].duration.value;
		}
		
		function durationToString(seconds){
			var days = Math.floor(seconds / 86400);
			seconds %= 86400;
			var hours = Math.floor(seconds / 3600);
			seconds %= 3600;
			var minutes = Math.round(seconds / 60);
			var string = "";
			if(days > 0){
				string += days + " day";
				if(days > 1)
					string += "s";
			}
			if(minutes == 60){
				hours++;
				minutes = 0;
				
			}
			if(hours > 0){
				string += " " + hours + " hr";
				if(hours > 1)
					string += "s";
			}
			if(minutes > 0){
				string += " " + minutes + " min";
			}
			return string;
		}
		styling += '<div class="route_duration"> <h3>' + durationToString(duration) + '</h3> </div> '; 
		styling += leafHTML.repeat(numLeaves);
		styling += '</div>';
	}

	document.getElementById("sidebar_route_lists").innerHTML += styling;
}
