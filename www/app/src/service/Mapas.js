'use strict';

import Firebase from '../store/fb';

const firebaseRef = Firebase.database().ref();

export default class Mapa {
    constructor(map){
        this.mapsInstance = map;
        this.markers = [];
    }

    buscaSupermercados(posicao) {
        this.removeMarkers();
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
        this.markers.push(marker);
        //marker.infowindow.open(this.mapsInstance, marker);

        google.maps.event.addListener(marker, 'click',() =>{

            marker.infowindow.setContent( '<b>'+mercado.nome+'</b><br>'+mercado.endereco  );
            marker.infowindow.open(this.mapsInstance, marker);
        });
    }
    removeMarkers() {
        this.markers.forEach(m=>m.setMap(null));
        this.markers = [];
    }

    carregaMarkers(lojas){

      if(lojas !== null){
          lojas.forEach(loja => {
              this.createMarker(loja);
          });
          this.mapsInstance.setCenter(lojas[0].location);
      }
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

export class Supermercado {
    constructor(props) {
        this.placeId = props.place_id;
        this.nome = props.name;
        this.endereco = props.vicinity;
        this.location = props.geometry.location;
    }
}

export function salvaSupermercados(lojas) {
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