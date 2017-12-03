var leafHTML = '<div class="leaf_rating" style="width: 3%;"> <image width="10" height="10" src="EcoLeaf.png"> </div>'
var carHTML = '<i class="material-icons prefix">directions_car</i>';
var railHTML = '<i class="material-icons prefix">directions_railway</i>';

var route_list_element = document.getElementById("sidebar_route_lists");
var styling;

function addRoute(mode, route, cost) {

	var iconHTML;
	if (mode == 'DRIVING') iconHTML = carHTML;
	else if (mode == 'TRANSIT') iconHTML = railHTML;

	styling += "<div>";
	for (var i = 0 ; i < route.length; i++) {
		styling += iconHTML;
		styling += '<div class="route_name"> <h3>' + route[i] + 'm </h3> </div>';
		
		var costString = cost[i] + "";
		var size = costString.substring(0,".");
		if (size == 1) styling += leafHTML + leafHTML + leafHTML;
		else if (size == 2) styling += leafHTML + leafHTML;
		else if (size ==3) styling += leafHTML;
		else styling += "";

		styling += '</div>';
	}

route_list_element.innnerHtml = styling;
}
