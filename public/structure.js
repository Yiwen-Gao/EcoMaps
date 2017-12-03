var leafHTML = '<div class="leaf_rating" style="width: 3%;"> <image width="10" height="10" src="EcoLeaf.png"> </div>'
var carHTML = '<i class="material-icons prefix">directions_car</i>';
var railHTML = '<i class="material-icons prefix">directions_railway</i>';

var route_list_element = document.getElementById("sidebar_route_lists");
var styling = "";

function addRoute(mode, response, cost) {

	var iconHTML;
	if (mode == 'DRIVING') iconHTML = carHTML;
	else if (mode == 'TRANSIT') iconHTML = railHTML;
	console.log(iconHTML);

	styling += "<div>";
	for (var i = 0 ; i < response.routes.length; i++) {
		styling += iconHTML;
		styling += '<div class="response_name"> <h3>' + i + 'm </h3> </div>';
		
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
