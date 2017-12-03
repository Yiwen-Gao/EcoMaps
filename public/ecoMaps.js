/*-------------------------------------------------
                      Team 2
/*-------------------------------------------------*/
function initMap() {
	var directionDisplayArray = [];

	// Instantiate a directions service.
	var directionsService = new google.maps.DirectionsService;

	// Create a map and center it on Manhattan.
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: -34.397, lng: 150.644},
	  zoom: 5
	});

	// Try HTML5 geolocation.
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
		  lat: position.coords.latitude,
		  lng: position.coords.longitude
		};

		map.setCenter(pos);
		map.setZoom(13);
	  }, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	  });
	} else {
	  // Browser doesn't support Geolocation
	  handleLocationError(false, infoWindow, map.getCenter());
	}

	// Instantiate an info window to hold step text.
	var stepDisplay = new google.maps.InfoWindow;

	// Display the route between the initial start and end selections.
	calculateAndDisplayRoutes(
		directionsService, directionDisplayArray, stepDisplay, map);
	// Listen to change events from the start and end lists.
	var onChangeHandler = function() {
	  calculateAndDisplayRoutes(
		  directionsService, directionDisplayArray, stepDisplay, map);
	};
	document.getElementById('start').addEventListener('change', onChangeHandler);
	document.getElementById('end').addEventListener('change', onChangeHandler);
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
	infoWindow.open(map);
  }

  function calculateAndDisplayRoutes(directionsService,
	  directionDisplayArray, stepDisplay, map) {
	  if(document.getElementById('start').value == ""){
		return;
	  }
	  if(document.getElementById('end').value == ""){
		return;
	  }
	// First, remove any existing markers from the map.
	for (var i = 0; i < directionDisplayArray.length; i++) {
	  directionDisplayArray[i].setMap(null);
	}
	document.getElementById("sidebar_route_lists").innerHTML = "";
	var drivingCost = [];
	var transitCost = [];
	// Retrieve the start and end locations and create a DirectionsRequest using
	// TRANSIT directions.
	directionsService.route({
	  origin: document.getElementById('start').value,
	  destination: document.getElementById('end').value,
	  travelMode: 'TRANSIT',//user input
	  provideRouteAlternatives: true
	}, function(response, status) {

	  // Route the directions and pass the response to a function to create
	  // markers for each step.
	  var polylineColors = ["blue", "green", "red", "yellow"];
	  if (status === 'OK') {
		var numRoutes = response.routes.length;
		for(var i = 0; i < numRoutes; i++){
			var totalDistance = 0;
			var distancesByMode = [0, 0, 0];	//car, rail, bus
			// Create a renderer for directions and bind it to the map.
			var directionsDisplay = new google.maps.DirectionsRenderer({map: map, polylineOptions: polylineOptionsActual});
			directionDisplayArray.push(directionsDisplay);
			var polylineOptionsActual = {
			  strokeColor: polylineColors[i],
			  strokeOpacity: 1.0,
			  strokeWeight: 10
			 };
			 document.getElementById('warnings-panel').innerHTML =
			'<b>' + response.routes[i].warnings + '</b>';
			directionsDisplay.setDirections(response);
			directionsDisplay.setRouteIndex(i);
			for(var j = 0; j < response.routes[i].legs.length; j++){
				for(var k = 0; k < response.routes[i].legs[j].steps.length; k++){
					if(response.routes[i].legs[j].steps[k].travel_mode == 'TRANSIT'){
						var vehicleType = response.routes[i].legs[j].steps[k].transit.line.vehicle.type;
						if(vehicleType == 'BUS' || vehicleType == 'INTERCITY_BUS' || vehicleType == 'TROLLEYBUS'){
							distancesByMode[2] += response.routes[i].legs[j].steps[k].distance.value;
							totalDistance += response.routes[i].legs[j].steps[k].distance.value;
						}
						else{
							distancesByMode[1] += response.routes[i].legs[j].steps[k].distance.value;
							totalDistance += response.routes[i].legs[j].steps[k].distance.value;
						}
					}
					else {
						totalDistance += response.routes[i].legs[j].steps[k].distance.value;
					}
				}

			}
			transitCost.push(convertRail(distancesByMode[1]) + convertBus(distancesByMode[2]));

		}

		//showSteps(response, directionDisplayArray, stepDisplay, map);
	  } else {
		window.alert('Directions request failed due to ' + status);
	  }
	  addRoute("TRANSIT", response, transitCost);
	});
	directionsService.route({
	  origin: document.getElementById('start').value,
	  destination: document.getElementById('end').value,
	  travelMode: 'DRIVING',//user input
	  provideRouteAlternatives: true
	}, function(response, status) {
	  // Route the directions and pass the response to a function to create
	  // markers for each step.
	  var polylineColors = ["purple", "orange", "yellow", 'black'];
	  if (status === 'OK') {
		var numRoutes = response.routes.length;
		for(var i = 0; i < numRoutes; i++){
			var totalDistance = 0;
			var distancesByMode = [0, 0, 0];	//car, rail, bus
			// Create a renderer for directions and bind it to the map.
			var directionsDisplay = new google.maps.DirectionsRenderer({map: map, polylineOptions: polylineOptionsActual});
			directionDisplayArray.push(directionsDisplay);
			var polylineOptionsActual = {
			  strokeColor: polylineColors[i],
			  strokeOpacity: 1.0,
			  strokeWeight: 10
			 };
			 document.getElementById('warnings-panel').innerHTML =
			'<b>' + response.routes[i].warnings + '</b>';
			directionsDisplay.setDirections(response);
			directionsDisplay.setRouteIndex(i);
			for(var j = 0; j < response.routes[i].legs.length; j++){
				for(var k = 0; k < response.routes[i].legs[j].steps.length; k++){
					if(response.routes[i].legs[j].steps[k].travel_mode == 'DRIVING'){
						distancesByMode[0] += response.routes[i].legs[j].steps[k].distance.value;
						totalDistance += response.routes[i].legs[j].steps[k].distance.value;
					}
					else {
						totalDistance += response.routes[i].legs[j].steps[k].distance.value;
					}
				}


			}
			drivingCost.push(convertAuto(distancesByMode[0]));

		}

		//showSteps(response, directionDisplayArray, stepDisplay, map);
	  } else {
		window.alert('Directions request failed due to ' + status);
	  }
	  addRoute("DRIVING", response, drivingCost);
	});
  }
