<template>
    <div style="width: 100%;height: 100%">

        <input id="busca-endereco" class="controls" type="text" placeholder="Digite o cep ou endereço">
        <mdl-button id="localize" class="circle-button mdl-button mdl-js-button mdl-button--fab mdl-color--grey-100">
            <i class="material-icons">gps_fixed</i>
        </mdl-button>
        <mdl-spinner :active="loading"></mdl-spinner>
        <div id="map" v-el:map="map"></div>
    </div>
</template>
<style scoped>
    html, body, #map {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    .controls {
        background-color: #fff;
        border-radius: 2px;
        border: 1px solid transparent;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        box-sizing: border-box;
        font-family: Roboto;
        font-size: 15px;
        font-weight: 300;
        height: 29px;
        margin-top: 10px;
        outline: none;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 95%;
        margin: 9px;
    }

    .controls:focus {
        border-color: #4d90fe;
    }
    button.controls{
        width: 150px;
        cursor: pointer;
        font-weight:bold;
    }
</style>
<script>
    import Mapa, {Supermercado, salvaSupermercados} from '../service/Mapas'
    import loadGoogleMapsAPI from 'load-google-maps-api';

    const mapsApi = loadGoogleMapsAPI({libraries: ['places']});

    export default{
        data(){
            return{
                loading:true
            }
        },
        created(){
            
            mapsApi.then((mappp) => {

                this.map = new google.maps.Map(this.$els.map, {
                    center: {lat: -19.9166813, lng: -43.996094899999996},
                    zoom: 13,
                    disableDefaultUI: true,
                });

                let mapa = new Mapa(this.map);
                let input = document.getElementById('busca-endereco');
                let localizar = document.getElementById('localize');

                localizar.addEventListener('click', function () {
                    mapa.localize().then(lojas => {
                        salvaSupermercados(lojas);
                    });
                });

                let autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo('bounds', this.map);
                //carrega supermercados
                let lojas = JSON.parse(localStorage.getItem('supermercados') );
                mapa.carregaMarkers(lojas);

                this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                autocomplete.addListener('place_changed', ()=> {

                    let place = autocomplete.getPlace();
                    if (!place.geometry) {
                        return;
                    }

                    if (place.geometry.viewport) {
                        this.map.fitBounds(place.geometry.viewport);
                    } else {
                        this.map.setCenter(place.geometry.location);
                        this.map.setZoom(17);
                        google.maps.event.trigger(this.map, 'resize');
                    }

                     setTimeout(()=> {
                        mapa.buscaSupermercados(place.geometry.location).then(lojas =>{ 
                            salvaSupermercados(lojas);
                        });

                         google.maps.event.trigger(this.map, 'resize');
                     }, 1000);
                });
                setTimeout(()=> {
                    this.loading  = false;
                    google.maps.event.trigger(this.map, 'resize');
                }, 2000);
            });
            
        },
        methods:{
          init(){

          }
        }
    }
</script>
