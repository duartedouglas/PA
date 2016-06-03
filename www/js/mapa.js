var geocoder;
var map;
var marker;

var infowindow;

function buscaSupermercados(map, posicao) {

  // var posicao = {lat: -19.981394, lng: -44.003248};

    //map.setCenter(posicao);

    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
       location: posicao,
       radius: 5000,
       types: ['grocery_or_supermarket']
    }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
      console.log(results[i]);

    }
  }
}

function createMarker(place) {
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location,

	});
	infowindow.open(map, marker);

	$('#enviar').on('click', function (e) {
		e.preventDefault();
		var email = $(".modal-body").find("#email").val();
		var lat = $('#txtLatitude').val();
		var long = $('#txtLongitude').val();
		$('#myModal').modal('hide');
		console.log(email, lat, long);
	})

	google.maps.event.addListener(marker, 'mouseover', function() {

		console.log(place)
		//$('#myModal').modal('show');

		infowindow.setContent(place.name+'<br>'+place.vicinity);
		infowindow.open(map, this);
	});
}

function initialize() {
	var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
	var options = {
		zoom: 5,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		scrollwheel: false,
		draggable: false,
	};
	
	map = new google.maps.Map(document.getElementById("mapa"), options);
	
	geocoder = new google.maps.Geocoder();
	
	marker = new google.maps.Marker({
		map: map,
		draggable: true,
	});
	
	marker.setPosition(latlng);
}

$(document).ready(function () {

	initialize();

	function carregarNoMapa(endereco) {
		geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();

					$('#txtEndereco').val(results[0].formatted_address);
					$('#txtLatitude').val(latitude);
					$('#txtLongitude').val(longitude);

					var location = new google.maps.LatLng(latitude, longitude);
					marker.setPosition(location);
					map.setCenter(location);
					//buscaSupermercados(map, location);
					map.setZoom(14);
				}
			}
		})
	}
	
	$("#btnEndereco").click(function() {
		if($(this).val() != "")
			carregarNoMapa($("#txtEndereco").val());
	})
	
	$("#txtEndereco").blur(function() {
		
		$('#mapa').height($(window).height());
		if($(this).val() != "")
			carregarNoMapa($(this).val());
	})
	
	// google.maps.event.addListener(marker, 'drag', function () {
	// 	geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
	// 		if (status == google.maps.GeocoderStatus.OK) {
	// 			if (results[0]) {  
	// 				$('#txtEndereco').val(results[0].formatted_address);
	// 				$('#txtLatitude').val(marker.getPosition().lat());
	// 				$('#txtLongitude').val(marker.getPosition().lng());
	// 			}
	// 		}
	// 	});
	// });
	
	$("#txtEndereco").autocomplete({
		source: function (request, response) {
			geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
				response($.map(results, function (item) {
					return {
						label: item.formatted_address,
						value: item.formatted_address,
						latitude: item.geometry.location.lat(),
          				longitude: item.geometry.location.lng()
					}
				}));
			})
		},
		select: function (event, ui) {
			$("#txtLatitude").val(ui.item.latitude);
    		$("#txtLongitude").val(ui.item.longitude);
			var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
			marker.setPosition(location);
			map.setCenter(location);
			buscaSupermercados(map, location);
			map.setZoom(14);
			$(this).blur();
		}
	});
	
	$("form").submit(function(event) {
		event.preventDefault();
		
		var endereco = $("#txtEndereco").val();
		var latitude = $("#txtLatitude").val();
		var longitude = $("#txtLongitude").val();
		
		alert("Endereço: " + endereco + "\nLatitude: " + latitude + "\nLongitude: " + longitude);
	});

});