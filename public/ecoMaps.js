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

	// Retrieve the start and end locations and create a DirectionsRequest using
	// WALKING directions.
	directionsService.route({
	  origin: document.getElementById('start').value,
	  destination: document.getElementById('end').value,
	  travelMode: 'TRANSIT',//user input
	  provideRouteAlternatives: true
	}, function(response, status) {
	  // Route the directions and pass the response to a function to create
	  // markers for each step.
	  var polylineColors = ["blue", "green", "red", "yellow", "purple", "orange", "gray", "black"];
	  if (status === 'OK') {
		var numRoutes = response.routes.length;
		for(var i = 0; i < numRoutes; i++){
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
		}
		
		//showSteps(response, directionDisplayArray, stepDisplay, map);
	  } else {
		window.alert('Directions request failed due to ' + status);
	  }
	});
  }