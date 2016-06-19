<template>

        <input id="busca-endereco" class="controls" type="text" placeholder="Digite o cep ou endereço">
        <button id="localize" class="circle-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
            <i class="material-icons">add</i>
        </button>

        <div id="map" v-el:map="map"></div>


</template>
<style scoped>
    #map {
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
        margin-left: 17px;
        margin-top: 10px;
        outline: none;
        padding: 0 11px 0 13px;
        text-overflow: ellipsis;
        width: 400px;
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
    import Mapa, {Supermercado} from '../service/Mapas'
    import loadGoogleMapsAPI from 'load-google-maps-api';
    export default{
        data(){
            return{

            }
        },
        created(){
            if(!this.map) {

                loadGoogleMapsAPI({libraries: ['places']}).then((mappp) => {

                    this.map = new google.maps.Map(this.$els.map, {
                        center: {lat: -19.9166813, lng: -43.996094899999996},
                        zoom: 13
                    });
                    let mapa = new Mapa(this.map);
                    let input = document.getElementById('busca-endereco');
                    let localizar = document.getElementById('localize');

                    localizar.addEventListener('click', function () {
                        mapa.localize();
                    });

                    let autocomplete = new google.maps.places.Autocomplete(input);
                    autocomplete.bindTo('bounds', this.map);

                    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//                    map.controls[google.maps.ControlPosition.TOP_LEFT].push(localize);

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
                        }

                         setTimeout(()=> {
                             mapa.buscaSupermercados(place.geometry.location).then(lojas => console.table(lojas));

                             google.maps.event.trigger(this.map, 'resize');
                         }, 1000);
                    });
                });
            } else {
                google.maps.event.trigger(this.map, 'resize');
            }

        },
        methods:{

        }
    }
</script>
