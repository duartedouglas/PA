'use strict';
export class Supermercado {
    constructor(props) {
        this.placeId = props.place_id;
        this.nome = props.name;
        this.endereco = props.vicinity;
        this.location = props.geometry.location;
    }
}

export default class Mapa {
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

        if (navigator.geolocation) {
            let timeoutVal = 10 * 1000 * 1000;
            navigator.geolocation.getCurrentPosition(
                (geoposition) => {
                    console.log(geoposition);
                    this.buscaSupermercados({
                        lat: geoposition.coords.latitude,
                        lng: geoposition.coords.longitude
                    }).then(lojas=>console.table(lojas));
                },
                this.displayError.bind(this),
                { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
            );
        }
        else {
            alert("Geolocalização não  e suportada pelo seu browser.");
        }
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