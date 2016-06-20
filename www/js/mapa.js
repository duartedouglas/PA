// var geocoder;
// var map;
// var marker;

// var infowindow;

var firebaseRef = new Firebase("https://menorpreco.firebaseio.com/");

'use strict';
class Supermercado {
	constructor(props) {
		this.placeId = props.place_id;
		this.nome = props.name;
		this.endereco = props.vicinity;
		this.location = props.geometry.location;
	}
}

class Mapa {
	constructor(map){
		this.mapsInstance = map;

	}

	buscaSupermercados(posicao) {
		let mercados = [];
		let service = new google.maps.places.PlacesService(this.mapsInstance);
		return new Promise((resolve, reject) => {
			service.nearbySearch({
				location: posicao,
				radius: 2000,//raio em metros
				types: ['grocery_or_supermarket']
			}, (results, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					for (let i = 0; i < results.length; i++) {
						let mercado = new Supermercado(results[i]);
						this.createMarker(mercado);
						mercados.push(mercado);
					}
					this.mapsInstance.setCenter(posicao);
					resolve(mercados);
				}
			});
		});
	}

	createMarker(mercado) {
		var info = new google.maps.InfoWindow();

		var marker = new google.maps.Marker({
			map: this.mapsInstance,
			position: mercado.location,
			infowindow:info
		});

		//marker.infowindow.open(this.mapsInstance, marker);

		google.maps.event.addListener(marker, 'click',() =>{

			marker.infowindow.setContent( '<b>'+mercado.nome+'</b><br>'+mercado.endereco  );
			marker.infowindow.open(this.mapsInstance, marker);
		});
	}

	localize() {
        return new Promise((resolve, reject) => {
			if (navigator.geolocation) {
				let timeoutVal = 10 * 1000 * 1000;
				navigator.geolocation.getCurrentPosition(
					(geoposition) => {
						console.log(geoposition);
						this.buscaSupermercados({
							lat: geoposition.coords.latitude,
							lng: geoposition.coords.longitude
						}).then(lojas=>{
							console.table(lojas)
							resolve(lojas);
						});
					},
					this.displayError.bind(this),
					{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
				);
			}
			else {
				alert("Geolocalização não  e suportada pelo seu browser.");
				reject("Geolocalização não  e suportada pelo seu browser.");
			}
		});

	}

	displayError(error) {
		var errors = {
			1: 'Permission denied',
			2: 'Position unavailable',
			3: 'Request timeout'
		};
		alert("Error: " + errors[error.code]);
	}
}

function initMap() {

	let map = new google.maps.Map(document.getElementById('mapa'), {
		center: {lat: -19.9166813, lng: -43.996094899999996},
		zoom: 13,
		disableDefaultUI: true,
	});

	let mapa = new Mapa(map);
	let input = document.getElementById('txtEndereco');
	let localize = document.getElementById('localizar');

	localize.addEventListener('click',function (e) {
		e.preventDefault();
		mapa.localize()
			.then(salvaSupermercados);
	});

	let autocomplete = new google.maps.places.Autocomplete(input);
	autocomplete.bindTo('bounds', map);


	//carrega supermercados
	let lojas = JSON.parse(localStorage.getItem('supermercados') );
	if(lojas !== null){

		lojas.forEach(loja => {
			mapa.createMarker(loja);
		});
		map.setCenter(lojas[0].location)
	}

	// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	// map.controls[google.maps.ControlPosition.TOP_LEFT].push(localize);

	autocomplete.addListener('place_changed', function() {

		let place = autocomplete.getPlace();
		if (!place.geometry) {
			return;
		}

		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(17);
		}

		setTimeout(()=>{
			mapa.buscaSupermercados(place.geometry.location)
				.then(salvaSupermercados);
		}, 1000);
	});
}

function salvaSupermercados(lojas){
	//console.table(lojas);

	lojas.forEach(loja => {
		console.log(loja)
		firebaseRef.child('estabelecimentos/'+ loja.placeId).update({
			place_id:loja.placeId,
			location: {
				lat:loja.location.lat(),
				lng:loja.location.lat()
			},
			nome:loja.nome,
			endereco:loja.endereco,
		});
	});
	console.log('salvo no firebase');
	localStorage.setItem('supermercados', JSON.stringify(lojas));
	console.log('salvo no localStorage');
	return lojas;
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

	//initialize();

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
	});
	
	// $("#txtEndereco").blur(function() {
	// 	$(this).addClass('fixed');
	// 	$('#mapa').height($(window).height());
	// 	if($(this).val() != "")
	// 		carregarNoMapa($(this).val());
	// })
	
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